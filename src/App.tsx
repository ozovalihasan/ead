import React, { useState, useRef, useCallback, useEffect } from 'react';
import ReactFlow, {
  ReactFlowProvider,
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
import useCustomizationStore from './zustand/customizationStore';
import CustomControls from './CustomControls';
import GithubLogo from './GithubLogo';
import EADLogo from './EADLogo';
import Navbar from './Navbar';
import UpArrow from './UpArrow';
import AngleDown from './AngleDown';



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

  const {
    locationSidebar,
    sidebarVisible,
    navbarVisible,
    handleSidebarWidthChange,
    toggleSidebarVisibility,
    toggleNavbarVisibility,
  } = useCustomizationStore()
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

    <div className="font-default  bg-first-100 flex flex-col h-screen">
      <Navbar />
      <div  className={`h-[calc(100vh-5rem)] w-screen  flex flex-grow ${locationSidebar == "left" ? "flex-row" : "flex-row-reverse"}`}>
        <ReactFlowProvider>
          
          <Sidebar />
          <div
              title="Click to hide/show the sidebar. Drag to change the width of the sidebar."
              onClick={toggleSidebarVisibility}
              className="h-full border border-solid border-first-500 hover:cursor-move hover:bg-first-300 w-2 flex flex-col justify-center"
              draggable
              onDragEnd={handleSidebarWidthChange}
          >
            .
            .
            .
          </div>
          <div className="h-full flex-grow relative" ref={reactFlowWrapper}>
         
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
              <CustomControls />
              <button title="Click to show/hide the navbar" className="absolute left-0 top-0 h-3 w-3 z-50 m-2" onClick={toggleNavbarVisibility} >
                {
                  navbarVisible ? <UpArrow /> : <AngleDown />
                }
              </button>
            </ReactFlow>
          </div>
      
        </ReactFlowProvider>
      </div>
    </div>

  )
}

export default App
