import { useRef, useCallback, memo, useEffect, useState } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  Controls,
  EdgeTypes,
  ReactFlowInstance,
} from 'reactflow';

import useStore from '@/zustandStore/store';

import {
  EntityNode,
  HasManyEdge,
  HasOneEdge,
  ThroughEdge,
  ConnectionLine,
  EntityNodeType
} from "@/components"

const nodeTypes = {
  entity: EntityNode,
};
const edgeTypes: EdgeTypes = {
  hasMany: HasManyEdge,
  hasOne: HasOneEdge,
  through: ThroughEdge,
};

export const FlowWithoutProvider = memo(() => {

  const nodes = useStore(store => store.nodes)
  const edges = useStore(store => store.edges)
  const onNodesChange = useStore(store => store.onNodesChange)
  const onEdgesChange = useStore(store => store.onEdgesChange)
  const onConnect = useStore(store => store.onConnect)
  const addNode = useStore(store => store.addNode)
  const onConnectStart = useStore(store => store.onConnectStart)
  const onConnectEnd = useStore(store => store.onConnectEnd)
  const onNodeMouseEnter = useStore(store => store.onNodeMouseEnter)
  const onNodeMouseLeave = useStore(store => store.onNodeMouseLeave)
  const onEdgeMouseEnter = useStore(store => store.onEdgeMouseEnter)
  const onEdgeMouseLeave = useStore(store => store.onEdgeMouseLeave)
  const toggleNeedFitView = useStore(store => store.toggleNeedFitView)
  const needFitView = useStore(store => store.needFitView)

  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);

  const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);
  
  const onDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();

      const reactFlowBounds: DOMRect = (reactFlowWrapper.current!).getBoundingClientRect();
      
      const type = event.dataTransfer.getData('application/reactflow');
      const tableId = event.dataTransfer.getData('tableId');

      if (typeof type === 'undefined' || !type) {
        return;
      }

      const position: {x: number, y: number} = (reactFlowInstance!).project({
          x: event.clientX - reactFlowBounds.left,
          y: event.clientY - reactFlowBounds.top,
        });

      
      const name = useStore.getState().tables[tableId].name;

      const newNode: EntityNodeType = {
        id: useStore.getState().idCounter.toString(),
        type: 'entity',
        position,
        data: { tableId, name },
        selected: false
      };
      
      useStore.getState().increaseIdCounter()
      
      addNode(newNode);
    },
    [reactFlowInstance]
  );
  
  useEffect(() => {
    if (needFitView){
      reactFlowInstance?.fitView()
      toggleNeedFitView()
    }
  }, [needFitView]) 
  
  return (
    <div className="h-full flex-grow relative" ref={reactFlowWrapper}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onInit={setReactFlowInstance}
          onConnect={onConnect}
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
          connectionRadius={0}
        >
          <Controls />
        </ReactFlow>
      
    </div>
  )
})

export const MainReactFlow = memo(() => (
  <ReactFlowProvider>
    <FlowWithoutProvider/>
  </ReactFlowProvider>
))
