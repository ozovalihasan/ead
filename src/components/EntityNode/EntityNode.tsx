import {
  TableName,
  AllHandlers,
  SelectThroughNode,
  TargetHandle
} from "@/components"
import useStore from '@/zustandStore/store';
import React, { memo, useCallback, useRef } from "react";


export type EntityNodeDataType = {
  tableId: string,
  name: string,
}

export type EntityNodeType = {
  id: string, 
  data: EntityNodeDataType, 
  selected: boolean
}

export const EntityNode = memo(({id, data, selected }: EntityNodeType) => {
  const inputEl = useRef(null);
  const buttonEl = useRef(null);
  
  const isSelectedNodeForThrough = useStore(store => store.selectedNodeIdForThrough === id)
  const onNodeInputChange = useStore(store => store.onNodeInputChange)

  const showInputElement = useCallback(
    (
      e: React.MouseEvent<HTMLButtonElement, MouseEvent> | 
        React.FocusEvent<HTMLButtonElement, Element> 
    ) => {
    if (inputEl.current) {
      (inputEl.current as HTMLInputElement).style.display = "block";
      (inputEl.current as HTMLInputElement).focus();
      (e.target as HTMLDivElement).style.display= "none"
    }
    
  },[])

  const handleBlur = useCallback((e: React.FocusEvent<HTMLInputElement, Element>) => {
    if (buttonEl.current){
      (buttonEl.current as HTMLDivElement).style.display = "block";
      (e.target as HTMLInputElement).style.display= "none"
    }
  }, [])

  return (
    <div 
      className={`
        border-black border border-solid p-1 rounded-sm 
        ${ (isSelectedNodeForThrough) ?  "bg-second-400" : "bg-first-50"} 
        ${ selected &&  "bg-first-200"}
      `} 
    >
      
      <TargetHandle nodeId={id} />
      
      <div>
        <label htmlFor="text"></label>
        <button 
          ref={buttonEl}
          onClick={showInputElement}
          className="bg-slate-50 cursor-move m-1 p-1 w-32 rounded-md text-left"
          onFocusCapture={showInputElement}
        >
          {data.name.length == 0 ? "No name" : data.name} 
        </button>
        <input 
          ref={inputEl}
          placeholder='Entity' 
          value={data.name} 
          className="w-32 m-1 p-1 rounded-md  ring-0 ring-offset-0" 
          id="text" 
          name="text" 
          onChange={event => onNodeInputChange(event, id)} 
          onBlur={handleBlur}
        />
      </div>

      <TableName tableId={data.tableId} />
      
      <AllHandlers nodeId={id} />

      <SelectThroughNode nodeId={id}/>

    </div>
  );
})

      