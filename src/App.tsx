import React, { useState, useRef, useCallback } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  Controls,
  Node,
  ReactFlowInstance,
} from 'react-flow-renderer';

import Sidebar from './Sidebar';
import './index.css';
import EntityNode, { EntityNodeDataType } from './EntityNode';
import useStore from './zustand/store';
import HasManyEdge from './HasManyEdge';
import HasOneEdge from './HasOneEdge';
import ThroughEdge from './ThroughEdge';
import ConnectionLine from './ConnectionLine';



const nodeTypes = {
  entity: EntityNode,
};
const edgeTypes = {
  hasMany: HasManyEdge,
  hasOne: HasOneEdge,
  through: ThroughEdge,
};

const App = () => {
  
  const { 
    nodes, 
    edges, 
    onNodesChange, 
    onEdgesChange, 
    onConnect, 
    addNode, 
    onConnectStart, 
    onConnectEnd, 
    onNodeMouseEnter, 
    onNodeMouseLeave,
    onEdgeMouseEnter, 
    onEdgeMouseLeave,
  } = useStore();
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance<any, any> | null>(null);


  const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();

      let reactFlowBounds: DOMRect = (reactFlowWrapper.current as HTMLDivElement).getBoundingClientRect();
      
      const type = event.dataTransfer.getData('application/reactflow');
      const tableId = event.dataTransfer.getData('tableId');

      // check if the dropped element is valid
      if (typeof type === 'undefined' || !type) {
        return;
      }

      let position: {x: number, y: number} = (reactFlowInstance as ReactFlowInstance).project({
          x: event.clientX - reactFlowBounds.left,
          y: event.clientY - reactFlowBounds.top,
        });

      
      let name = useStore.getState().tables[tableId].name;

      const newNode: Node<EntityNodeDataType> = {
        id: useStore.getState().idCounter.toString(),
        type: "entity",
        position,
        data: { tableId, name },
      };
      

      addNode(newNode);
    },
    [reactFlowInstance]
  );


  return (
    <div  className="h-screen w-screen bg-first-100 flex flex-row flex-grow">
      <ReactFlowProvider>
        <div className="h-full flex-grow" ref={reactFlowWrapper}>

          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onConnectStart={onConnectStart}
            onConnectEnd={onConnectEnd}
            onNodeMouseEnter={onNodeMouseEnter}
            onNodeMouseLeave={onNodeMouseLeave}
            onEdgeMouseEnter={onEdgeMouseEnter}
            onEdgeMouseLeave={onEdgeMouseLeave}
            onDragOver={onDragOver}
            edgeTypes={edgeTypes}
            deleteKeyCode={"Delete"}
            connectionLineComponent={ConnectionLine }
            elevateEdgesOnSelect={true}
            fitView
            nodeTypes={nodeTypes}
            snapToGrid={true}
            
          >
            <Controls />

          </ReactFlow>
        </div>
        <Sidebar />
      </ReactFlowProvider>
    </div>

  )
}

export default App
