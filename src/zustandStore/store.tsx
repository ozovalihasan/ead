import create from 'zustand';
import {
  Connection,
  Edge,
  EdgeChange,
  Node,
  NodeChange,
  addEdge,
  OnNodesChange,
  OnEdgesChange,
  OnConnect,
  applyNodeChanges,
  applyEdgeChanges,
  Instance,
  MarkerType,
  NodeRemoveChange,
} from 'react-flow-renderer';

import initialNodes from './nodes';
import initialEdges from './edges';
import { devtools } from 'zustand/middleware'
import produce from "immer"
import { ButtonHTMLAttributes } from 'react';
import initialTables, { TablesType } from './tables';
import { EntityNodeDataType } from 'components/EntityNode/EntityNode';

export type State = {
  version: string;
  idCounter: number;
  nodes: Node<EntityNodeDataType>[];
  edges: Edge[];
  tables: TablesType;
  connectionStartId: string | null;
  isConnectContinue: boolean;
  isMouseOnNode: boolean;
  isMouseOnEdge: boolean;
  selectedNodeIdForThrough: string | null;
  mouseOnEdgeId: string | null;
  mouseOnNodeId: string | null;
  associationType: string;
  onNodeMouseEnter: (_: React.MouseEvent, node: Node) => void; 
  onEdgeMouseEnter: (_: React.MouseEvent, edge: Edge) => void; 
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  onMouseEnterThrough: (event: React.MouseEvent<HTMLDivElement, MouseEvent>, nodeId: string) => void;
  onChangeAssociationType: (associationType: string, id: string) => void;
  onTableNameChange: (event: React.ChangeEvent<HTMLInputElement>, tableId: string) => void;
  onAttributeNameChange: (event: React.ChangeEvent<HTMLInputElement>, tableId: string, attributeId: string) => void;
  onAttributeTypeChange: (event: React.ChangeEvent<HTMLSelectElement>, tableId: string, attributeId: string) => void;
  addNode: (node: Node) => void;
  addTable: (event: React.MouseEvent<HTMLButtonElement, MouseEvent> ) => void;
  addAttribute: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, tableId: string ) => void;
  removeAttribute: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, tableId: string, attributeId: string ) => void;
  removeTable: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, tableId: string ) => void;
  increaseIdCounter: () => void;
  onConnectStart: () => void;
  onConnectEnd: () => void;
  onNodeMouseLeave: () => void;
  onEdgeMouseLeave: () => void;
  onNodeInputChange: (event: React.ChangeEvent<HTMLInputElement>, nodeId: string) => void;
  removeEdge: (edgeId: string) => void;
  resetStore: () => void;
  uploadStore: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

// this is our useStore hook that we can use in our components to get parts of the store and call actions
const useStore = create(devtools<State>((set, get) => ({
    version: "0.4.0",  
    idCounter: Object.keys(initialTables).length + initialNodes.length + initialEdges.length + 1 ,
    associationType: "has_one",
    nodes: initialNodes,
    edges: initialEdges,
    tables: initialTables,
    connectionStartId: null,
    isConnectContinue: false,
    isMouseOnNode: false,
    isMouseOnEdge: false,
    mouseOnNodeId: null,
    mouseOnEdgeId: null,
    selectedNodeIdForThrough: null,
    onConnectStart: (() => {
      set({
        isConnectContinue: true
      })
    }),
    onConnectEnd: (() => {
      set({
        isConnectContinue: false,
        selectedNodeIdForThrough: null
      })
    }),
    onEdgeMouseEnter: ((_: React.MouseEvent, edge: Edge) => {
      set({
        isMouseOnEdge: true,
        mouseOnEdgeId: edge.id
      })
    }),
    onEdgeMouseLeave: (() => {
      set({
        isMouseOnEdge: false,
        mouseOnEdgeId: null
      })
    }),
    onNodeMouseEnter: ((_: React.MouseEvent, node: Node) => {
      set({
        isMouseOnNode: true,
        mouseOnNodeId: node.id
      })
    }),
    onNodeMouseLeave: (() => {
      set({
        isMouseOnNode: false,
        mouseOnNodeId: null
      })
    }),
    onTableNameChange: ((event: React.ChangeEvent<HTMLInputElement>, tableId: string) => {
      set(
        produce((state: State) => {
          state.tables[tableId].name = event.target.value
        })
      );
    }),
    onAttributeNameChange: ((event: React.ChangeEvent<HTMLInputElement>, tableId: string, attributeId: string) => {
      set(
        produce((state: State) => {
          state.tables[tableId].attributes[attributeId].name = event.target.value
        })
      );
    }),
    onAttributeTypeChange: ((event: React.ChangeEvent<HTMLSelectElement>, tableId: string, attributeId: string) => {
      set(
        produce((state: State) => {
          state.tables[tableId].attributes[attributeId].type = event.target.value
        })
      );
    }),
    addTable: ((event: React.MouseEvent<HTMLButtonElement, MouseEvent> ) => {
      set(produce((state: State) => {
        state.tables[get().idCounter.toString()] = {name: "", attributes: {}},
        state.idCounter ++
      }))
    }),
    addAttribute: ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>, tableId: string ) => {
      set(produce((state: State) => {
        state.tables[tableId].attributes[get().idCounter.toString()] = {name: "", type: "string"},
        state.idCounter ++
      }))
    }),
    removeAttribute: ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>, tableId: string, attributeId: string ) => {
      set(produce((state: State) => {
        delete state.tables[tableId].attributes[attributeId]
      }))
    }),
    removeTable: ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>, tableId: string ) => {
      set(produce((state: State) => {
        delete state.tables[tableId]
        state.nodes = state.nodes.filter((node) => {
          state.edges = state.edges.filter((edge) => (
            (edge.source !== node.id) && 
            (edge.target !== node.id) && 
            (edge.data?.throughNodeId !== node.id)
          ))
          return (node.data.tableId !== tableId)
        })
      }))
    }),
    increaseIdCounter: (() =>{
      set({
          idCounter: get().idCounter + 1
      })
    }),
    onNodeInputChange: (event: React.ChangeEvent<HTMLInputElement>, nodeId: string) =>{
      
      set(produce((state: State) => {
        let node: Node = (state.nodes.find(node => node.id === nodeId)) as Node
        node.data.name = event.target.value
      }))
    },
    addNode: (node: Node) =>{
      set({
          idCounter: get().idCounter + 1,
          nodes: get().nodes.concat(node),
      })
    },
    onNodesChange: (changes: NodeChange[]) => {
      let edges = get().edges
      if (changes[0].type === "remove"){
        edges = get().edges.filter((edge) => edge.type !== 'through' || edge.data.throughNodeId !== (changes[0] as NodeRemoveChange).id)
      }
      
      set({
        nodes: applyNodeChanges(changes, get().nodes),
        edges: edges,
      });
    },
    onEdgesChange: (changes: EdgeChange[]) => {
      
      set({
        edges: applyEdgeChanges(changes, get().edges),
      });
    },
    onMouseEnterThrough: (event: React.MouseEvent<HTMLDivElement, MouseEvent>, nodeId: string) => {
      set({
        selectedNodeIdForThrough: nodeId
      })
    }, 
    onConnect: (connection: Connection) => {
      let id = get().idCounter
      let edge: Edge = {       
        id: id.toString(), 
        source: connection.source as string, 
        target: connection.target as string, 
        sourceHandle: connection.sourceHandle,
        targetHandle: connection.targetHandle,
      }
   
      if (get().associationType === "has_one"){
        
        edge = { 
          ...edge,
          label: 'has one', 
          type: "hasOne",
        }
       } else if (get().associationType === "has_many") {
        edge = { 
          ...edge,
          type: "hasMany",
          label: 'has many',
        }
      } else {
        const selectedNodeIdForThrough = get().selectedNodeIdForThrough
        if (selectedNodeIdForThrough === null){
          alert("It is necessary to select a node to define through association.");
          return 
        }
        
        edge = { 
          ...edge,
          animated: true,  
          label: 'through',
          type: "through",
          data: {throughNodeId: get().selectedNodeIdForThrough },
        }
      }

      set({
        edges: get().edges.concat(edge),
        idCounter: get().idCounter + 1,
        selectedNodeIdForThrough: null,
      })
    },
    removeEdge: (edgeId: string) => {
      set({
        edges: get().edges.filter((e) => e.id !==  edgeId) 
      })
    },
    onChangeAssociationType: (associationType: string, id: string) =>{
      set({
        associationType: associationType,
        connectionStartId: id
      });
    },
    resetStore: () => {
      set({
        idCounter: 1,
        tables: {},
        nodes: [],
        edges: [],
      })
    },
    uploadStore: (event) => {
      const fileReader = new FileReader();
      fileReader.onload = (event) => {
        let data
        if (event.target && (typeof event.target.result === 'string')){
          data = JSON.parse(event.target.result);
          set(
            data
          )
          
        }else{
          console.error("An invalid file is installed. Please check your file.")
        }
        
      
      };
  
      fileReader.readAsText((event.target.files as FileList)[0], 'UTF-8');
    }
    
  })
  ));

export default useStore;