import {
  TableName,
  AllHandlers,
  SelectThroughNode,
  TargetHandle
} from "@/components"
import useStore from '@/zustandStore/store';
import { memo, useRef } from "react";
import { Node } from "react-flow-renderer";


export interface EntityNodeDataType {
  tableId: string,
  name: string,
}

export interface EntityNodePropsType {
  id: string; 
  data: EntityNodeDataType; 
  selected: boolean;
}

export type EntityNodeType = Node<EntityNodeDataType> & {
  type: "entity",
}

export const EntityNode = memo(
  ({id, data, selected }: EntityNodePropsType) => {
    const inputEl = useRef(null);
    
    const isSelectedNodeForThrough = useStore(store => store.selectedNodeIdForThrough === id)
    const onNodeInputChange = useStore(store => store.onNodeInputChange)
  
    return (
      <div 
        className={`
          p-1 rounded-md
          ${ (isSelectedNodeForThrough) ?  "bg-second-400 dark:bg-second-700" : "bg-first-500 dark:bg-first-600"} 
          ${ selected ? "bg-first-400 dark:bg-first-500": ""}
        `} 
      >
        
        <TargetHandle nodeId={id} />
        
        <input 
          ref={inputEl}
          placeholder='Entity' 
          value={data.name} 
          className="w-32 m-1 p-1 rounded-md ring-0 ring-offset-0" 
          id="text" 
          name="text" 
          tabIndex={3}
          onChange={event => onNodeInputChange(event, id)} 
        />
  
        <TableName nodeId={id} tableId={data.tableId} />
        
        <AllHandlers nodeId={id} />
  
        <SelectThroughNode nodeId={id}/>
  
      </div>
    );
  }
)

      