import { useState, useRef, useCallback } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  Node,
  ReactFlowInstance,
  Controls
} from 'react-flow-renderer';

import useStore from '@/zustandStore/store';

import {
  EntityNode,
  EntityNodeDataType,
  HasManyEdge,
  HasOneEdge,
  ThroughEdge,
  ConnectionLine,

} from "@/components"

const nodeTypes = {
  entity: EntityNode,
};
const edgeTypes = {
  hasMany: HasManyEdge,
  hasOne: HasOneEdge,
  through: ThroughEdge,
};

export const MainReactFlow = () => {

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
    <div className="h-full flex-grow relative" ref={reactFlowWrapper}>
      <ReactFlowProvider>      
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
      </ReactFlowProvider>
      
    </div>
  )
}
