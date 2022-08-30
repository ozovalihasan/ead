import {
  TableName,
  AllHandlers,
  SelectThroughNode,
  TargetHandle
} from "@/components"
import useStore from '@/zustandStore/store';
import { memo, useRef } from "react";


export type EntityNodeDataType = {
  tableId: string,
  name: string,
}

export type EntityNodeType = {
  id: string, 
  data: EntityNodeDataType, 
  selected: boolean,
  yPos: number
}

export const EntityNode = memo(({id, data, selected, yPos }: EntityNodeType) => {
  const inputEl = useRef(null);
  
  const isSelectedNodeForThrough = useStore(store => store.selectedNodeIdForThrough === id)
  const onNodeInputChange = useStore(store => store.onNodeInputChange)

  return (
    <div 
      className={`
        border-black border border-solid p-1 rounded-sm 
        ${ (isSelectedNodeForThrough) ?  "bg-second-400" : "bg-first-50"} 
        ${ selected &&  "bg-first-200"}
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
        tabIndex={yPos}
        onChange={event => onNodeInputChange(event, id)} 
      />

      <TableName tableId={data.tableId} />
      
      <AllHandlers nodeId={id} />

      <SelectThroughNode nodeId={id}/>

    </div>
  );
})

      