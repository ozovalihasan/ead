import create from 'zustand';
import {
  Connection,
  Edge,
  EdgeChange,
  Node,
  NodeChange,
  OnNodesChange,
  OnEdgesChange,
  OnConnect,
  applyNodeChanges,
  applyEdgeChanges,
  NodeRemoveChange,
} from 'react-flow-renderer';

import { devtools } from 'zustand/middleware'
import produce from "immer"
import initialTables, { TablesType } from './tables';
import initialNodes from './nodes';
import initialEdges from './edges';
import { EntityNodeType } from '@/components';
import transform_0_4_x_to_0_4_5 from './helpers/transform_0_4_x_to_0_4_5';

export const initialIdCounter = (initialTables: TablesType, initialNodes: Node[], initialEdges: Edge[]): number => {
  
  const tableIds = Object.keys(initialTables).map(( tableId )=> parseInt(tableId ))
  const nodeIds = initialNodes.map((node)=> parseInt(node.id) )
  const edgeIds = initialEdges.map((edge)=> parseInt(edge.id) )

  const max = Math.max( ...tableIds.concat(nodeIds).concat(edgeIds).concat([0]) ) 
  
  return (max + 1)
}

export interface ThroughEdgeDataType {
  throughNodeId: string
}

export type HasAnyEdgeType = Omit<Edge, "data"> & {
  type: "hasMany" | "hasOne"
};

export type ThroughEdgeType = Omit<Edge, "data"> &{
  data: ThroughEdgeDataType,
  type: "through"
}

export type CustomEdgeType = HasAnyEdgeType | ThroughEdgeType;

export interface State {
  version: string;
  idCounter: number;
  nodes: EntityNodeType[];
  edges: CustomEdgeType[];
  tables: TablesType;
  connectionStartNodeId: string | null;
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
  onMouseEnterThrough: (nodeId: string) => void;
  onChangeAssociationType: (associationType: string, id: string) => void;
  onTableNameChange: (event: React.ChangeEvent<HTMLInputElement>, tableId: string) => void;
  onAttributeNameChange: (event: React.ChangeEvent<HTMLInputElement>, tableId: string, attributeId: string) => void;
  onAttributeTypeChange: (event: React.ChangeEvent<HTMLSelectElement>, tableId: string, attributeId: string) => void;
  addNode: (node: EntityNodeType) => void;
  changeTableSuperClass : (event: React.ChangeEvent<HTMLSelectElement>, tableId: string) => void;
  addTable: () => void;
  addAttribute: (tableId: string ) => void;
  removeAttribute: (tableId: string, attributeId: string ) => void;
  removeTable: (tableId: string ) => void;
  increaseIdCounter: () => void;
  onConnectStart: () => void;
  onConnectEnd: () => void;
  onNodeMouseLeave: () => void;
  onEdgeMouseLeave: () => void;
  onNodeTableChange: (event: React.ChangeEvent<HTMLSelectElement>, nodeId: string) => void;
  onNodeInputChange: (event: React.ChangeEvent<HTMLInputElement>, nodeId: string) => void;
  resetStore: () => void;
  uploadStore: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const useStore = create(devtools<State>((set, get) => ({
    version: "0.4.5",  
    idCounter: initialIdCounter(initialTables, initialNodes, initialEdges) ,
    associationType: "has_one",
    nodes: initialNodes,
    edges: initialEdges,
    tables: initialTables,
    connectionStartNodeId: null,
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
      if (!get().isConnectContinue){
        set({
          isMouseOnEdge: true,
          mouseOnEdgeId: edge.id
        })
      }
    }),
    onEdgeMouseLeave: (() => {
      if (!get().isConnectContinue){
        set({
          isMouseOnEdge: false,
          mouseOnEdgeId: null
        })
      }
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
    addTable: (() => {
      set(produce((state: State) => {
        state.tables[get().idCounter.toString()] = {name: "", attributes: {}, superclassId: ""},
        state.idCounter ++
      }))
    }),
    changeTableSuperClass : ((event: React.ChangeEvent<HTMLSelectElement>, tableId: string) => {
      set(
        produce((state: State) => {
          state.tables[tableId].superclassId = event.target.value
        })
      )
    }),
    addAttribute: ((tableId: string ) => {
      set(produce((state: State) => {
        state.tables[tableId].attributes[get().idCounter.toString()] = {name: "", type: "string"},
        state.idCounter ++
      }))
    }),
    removeAttribute: ((tableId: string, attributeId: string ) => {
      set(produce((state: State) => {
        delete state.tables[tableId].attributes[attributeId]
      }))
    }),
    removeTable: ((tableId: string ) => {
      set(produce((state: State) => {
        delete state.tables[tableId]
        state.nodes = state.nodes.filter((node) => {
          state.edges = state.edges.filter((edge: CustomEdgeType) => (

            node.data.tableId !== tableId || 
            (
              (edge.source !== node.id) && 
              (edge.target !== node.id) && 
              (edge.type !== "through" || edge.data.throughNodeId !== node.id)
            )
            
          ))
          return (node.data.tableId !== tableId)
        })
        
        Object.values(state.tables).forEach(table => {
          if (table.superclassId === tableId){
            table.superclassId = ""
          }
        })
      }))
    }),
    onNodeTableChange: (
      (event: React.ChangeEvent<HTMLSelectElement>, nodeId: string) => {
        set(produce((state: State) => {
          const node: EntityNodeType = (state.nodes.find(node => node.id === nodeId))!
          node.data.tableId = event.target.value
        }))
      }

    ),
    increaseIdCounter: (() =>{
      set({
          idCounter: get().idCounter + 1
      })
    }),
    onNodeInputChange: (event: React.ChangeEvent<HTMLInputElement>, nodeId: string) =>{
      
      set(produce((state: State) => {
        const node: EntityNodeType = (state.nodes.find(node => node.id === nodeId))!
        node.data.name = event.target.value
      }))
    },
    addNode: (node: EntityNodeType) =>{
      set({
          nodes: get().nodes.concat(node),
      })
    },
    onNodesChange: (changes: NodeChange[]) => {
      let edges = get().edges
      if (changes[0].type === "remove"){
        edges = get().edges.filter((edge) => edge.type !== 'through' || edge.data.throughNodeId !== (changes[0] as NodeRemoveChange).id)
      }
      
      set({
        nodes: applyNodeChanges(changes, get().nodes) as EntityNodeType[],
        edges: edges,
      });
    },
    onEdgesChange: (changes: EdgeChange[]) => {
      
      set({
        edges: applyEdgeChanges(changes, get().edges) as CustomEdgeType[],
      });
    },
    onMouseEnterThrough: (nodeId: string) => {
      set({
        selectedNodeIdForThrough: nodeId
      })
    }, 
    onConnect: (connection: Connection) => {
      const id = get().idCounter
      const edgeBase: Omit<CustomEdgeType, "label" | "type"> = {       
        id: id.toString(), 
        source: connection.source!, 
        target: connection.target!, 
        sourceHandle: connection.sourceHandle,
        targetHandle: connection.targetHandle,
      }
   
      let edge: CustomEdgeType;
      
      if (get().associationType === "has_one"){
        
        edge = { 
          ...edgeBase,
          label: 'has one', 
          type: "hasOne",
        }
       } else if (get().associationType === "has_many") {
        edge = { 
          ...edgeBase,
          label: 'has many',
          type: "hasMany",
        }
      } else {
        const selectedNodeIdForThrough = get().selectedNodeIdForThrough
        if (selectedNodeIdForThrough === null){
          alert("It is necessary to select a node to define through association.");
          return 
        }
        
        edge = { 
          ...edgeBase,
          label: 'through',
          type: "through",
          data: {throughNodeId: get().selectedNodeIdForThrough! },
        }
      }

      set({
        edges: get().edges.concat(edge),
        idCounter: get().idCounter + 1,
        selectedNodeIdForThrough: null,
      })
    },
   
    onChangeAssociationType: (associationType: string, id: string) =>{
      set({
        associationType: associationType,
        connectionStartNodeId: id
      });
    },
    resetStore: () => {
      if (window.confirm("EAD will be reset permanently?")){

        set({
          idCounter: 1,
          tables: {},
          nodes: [],
          edges: [],
        })
      }

    },
    uploadStore: (event: React.ChangeEvent<HTMLInputElement>) => {
      const fileReader = new FileReader();
      fileReader.onload = (event) => {
        let data: State;
        if (event.target && (typeof event.target.result === 'string')){
          data = JSON.parse(event.target.result) as State;
          
          if (["0.4.0", "0.4.1", "0.4.2", "0.4.3", "0.4.4", "0.4.5"].includes(data.version)) {
            
            set(
              transform_0_4_x_to_0_4_5(data)
            ) 
          
          } else {
            alert(`The version of your file is v${data.version}. It is not compatible with the version used(v0.4.5).`);  
          }
          
        }else{
          alert("An invalid file is installed. Please check your file.");
        }
        
      
      };
  
      fileReader.readAsText((event.target.files!)[0], 'UTF-8');
    }
    
  })
));

export default useStore;
