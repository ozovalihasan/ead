import { useCallback, useEffect } from 'react';
import { Handle, Position } from 'react-flow-renderer';
import {
  TableName,
  AllHandlers
} from "components"
import useStore from 'zustandStore/store';


export type EntityNodeDataType = {
  tableId: string,
  name: string,
}

export const EntityNode = ({id, data, selected }: {id: string, data: EntityNodeDataType, selected: boolean}) => {
  const {
    isConnectContinue,
    associationType,
    connectionStartId,
    selectedNodeIdForThrough,
    onNodeInputChange, 
    onMouseEnterThrough, 
  } = useStore();

  return (
    <div className={`border-black border border-solid p-1 rounded-sm ${ (selectedNodeIdForThrough == id) ?  "bg-second-400" : "bg-first-50"} ${ selected ?  "bg-first-200" : ""}`} >
      
      <Handle className="border-none w-6 h-6" type="target" position={Position.Top} id="top" style={{visibility: isConnectContinue ? "visible" : "hidden"}}/>
      
      <div>
        <label htmlFor="text"></label>
        <input placeholder='Entity' value={data.name} className="w-32 p-1 rounded-md" id="text" name="text" onChange={(event) => onNodeInputChange(event, id)} />
      </div>

      {data && <TableName tableId={data.tableId}></TableName>}
      
      <AllHandlers id={id} />

      {
        isConnectContinue && associationType === "through" && (connectionStartId !== id) && 
        <div className="text-tiny text-center text-first-100 bg-first-500  w-16 h-full absolute right-full bottom-0 rounded-l-md px-1 content-center flex items-center " onMouseEnter={(event) => onMouseEnterThrough(event, id)}>
          <div className='text-center w-full'>
            through
          </div>
        </div>
      }
    </div>
  );
}

      