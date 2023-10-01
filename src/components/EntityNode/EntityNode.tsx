import {
  TableName,
  AllHandlers,
  SelectThroughNode,
  TargetHandle
} from "@/components"
import { ExpandToRight } from "@/icons";
import { useStore, EntityNodeDataType } from '@/zustandStore';
import { FC, memo, useRef } from "react";
import { NodeProps, NodeResizeControl, ResizeControlVariant } from "reactflow";

export type EntityNodePropsType = FC<Pick<NodeProps<EntityNodeDataType>, "id" | "data" | "selected">> 

export const EntityNode: EntityNodePropsType = memo(
  ({id, data, selected}) => {
    const inputEl = useRef(null);
    
    const isSelectedNodeForThrough = useStore(store => store.selectedNodeIdForThrough === id)
    const onNodeInputChange = useStore(store => store.onNodeInputChange)

    let nodeBGClasses = "bg-first-500 dark:bg-first-600";
    if (selected) { nodeBGClasses = "bg-first-400 dark:bg-first-500" }
    if (isSelectedNodeForThrough) { nodeBGClasses = "bg-third-400 dark:bg-third-500" }

    return (
      <div 
        className={`
          p-1 rounded-md w-full h-full
          ${ nodeBGClasses}
        `}
      >
        
        <TargetHandle nodeId={id} />
        
        <div className="w-auto p-1">
          <input 
            ref={inputEl}
            placeholder='Entity' 
            value={data.name} 
            className="p-1 rounded-md ring-0 ring-offset-0 w-full" 
            id="text" 
            name="text" 
            tabIndex={3}
            onChange={event => onNodeInputChange(event, id)} 
          />
        </div>  
        <TableName nodeId={id} tableId={data.tableId} />
        
        {selected && 
          <NodeResizeControl style={{border: "none"}} variant={ResizeControlVariant.Line} minWidth={114} >
              <div className="fill-first-400 dark:fill-first-500 w-3 h-3 absolute -right-4 top-1/2 -translate-y-1/2 ">
                <ExpandToRight/>
              </div>
          </NodeResizeControl>
        }
        
        <AllHandlers nodeId={id} />
  
        <SelectThroughNode nodeId={id}/>
      </div>
    );
  }
)