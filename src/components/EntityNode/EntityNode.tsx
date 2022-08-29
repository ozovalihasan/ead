import {
  TableName,
  AllHandlers,
  SelectThroughNode,
  TargetHandle
} from "@/components"
import useStore from '@/zustandStore/store';
import React, { ReactElement, useRef } from "react";


export type EntityNodeDataType = {
  tableId: string,
  name: string,
}

export type EntityNodeType = {
  id: string, 
  data: EntityNodeDataType, 
  selected: boolean
}

export const EntityNode = ({id, data, selected }: EntityNodeType) => {
  const inputEl = useRef(null);
  const buttonEl = useRef(null);
  
  const selectedNodeIdForThrough = useStore(store => store.selectedNodeIdForThrough)
  const onNodeInputChange = useStore(store => store.onNodeInputChange)

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (inputEl.current) {
      (inputEl.current as HTMLInputElement).style.display = "block";
      (inputEl.current as HTMLInputElement).focus();
      (e.target as HTMLDivElement).style.display= "none"
    }
    
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    if (buttonEl.current){
      (buttonEl.current as HTMLDivElement).style.display = "block";
      (e.target as HTMLInputElement).style.display= "none"
    }
  }

  return (
    <div 
      className={`
        border-black border border-solid p-1 rounded-sm 
        ${ (selectedNodeIdForThrough === id) ?  "bg-second-400" : "bg-first-50"} 
        ${ selected &&  "bg-first-200"}
      `} 
    >
      
      <TargetHandle nodeId={id} />
      
      <div>
        <label htmlFor="text"></label>
        <button 
          ref={buttonEl}
          onClick={event => handleClick(event)}
          className="bg-slate-50 cursor-move m-1 p-1 w-32 rounded-md text-left"
        >
          {data.name.length == 0 ? "No name" : data.name} 
        </button>
        <input 
          ref={inputEl}
          placeholder='Entity' 
          value={data.name} 
          className="w-32 m-1 p-1 rounded-md hidden ring-0 ring-offset-0" 
          id="text" 
          name="text" 
          onChange={event => onNodeInputChange(event, id)} 
          onBlur={event => handleBlur(event)}
        />
      </div>

      <TableName tableId={data.tableId} />
      
      <AllHandlers nodeId={id} />

      <SelectThroughNode nodeId={id}/>

    </div>
  );
}

      