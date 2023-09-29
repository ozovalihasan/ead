import {
  TableName,
  AllHandlers,
  SelectThroughNode,
  TargetHandle
} from "@/components"
import { useStore, EntityNodeDataType } from '@/zustandStore';
import { FC, memo, useRef } from "react";
import { NodeProps } from "reactflow";

export type EntityNodePropsType = FC<Pick<NodeProps<EntityNodeDataType>, "id" | "data" | "selected">> 

export const EntityNode: EntityNodePropsType = memo(
  ({id, data, selected }) => {
    
    const inputEl = useRef(null);
    
    const isSelectedNodeForThrough = useStore(store => store.selectedNodeIdForThrough === id)
    const onNodeInputChange = useStore(store => store.onNodeInputChange)

    let nodeBGClasses = "bg-first-500 dark:bg-first-600";
    if (selected) { nodeBGClasses = "bg-first-400 dark:bg-first-500" }
    if (isSelectedNodeForThrough) { nodeBGClasses = "bg-third-400 dark:bg-third-500" }

    return (
      <div 
        className={`
          p-1 rounded-md
          ${ nodeBGClasses}
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