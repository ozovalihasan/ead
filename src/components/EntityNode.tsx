import { useCallback, useEffect } from 'react';
import { Handle, Position } from 'react-flow-renderer';
import {
  HasManyHandle,
  HasOneHandle,
  TableName,
  ThroughHandle 
} from "."
import useStore from '../zustand/store';


export type EntityNodeDataType = {
  tableId: string,
  name: string,
}

export const EntityNode = ({id, data, selected }: {id: string, data: EntityNodeDataType, selected: boolean}) => {
  const { onNodeInputChange, onMouseEnterThrough, onChangeAssociationType } = useStore();

  const isConnectContinue = useStore(state => state.isConnectContinue)
  const isMouseOnNode = useStore(state => state.isMouseOnNode)
  const mouseOnNodeId = useStore(state => state.mouseOnNodeId)
  const selectedNodeForThrough = useStore(state => state.selectedNodeIdForThrough) == id
  const associationType = useStore(state => state.associationType)
  const connectionStartId = useStore(state => state.connectionStartId)

  const visibleSourceHandles = ((!isConnectContinue && isMouseOnNode && mouseOnNodeId == id) ? "visible" : "hidden")
  
  return (
    <div className={`border-black border border-solid p-1 rounded-sm ${ selectedNodeForThrough ?  "bg-second-400" : "bg-first-50"} ${ selected ?  "bg-first-200" : ""}`} >
      
      <Handle className="border-none w-6 h-6" type="target" position={Position.Top} id="top" style={{visibility: isConnectContinue ? "visible" : "hidden"}}/>
      
      <div>
        <label htmlFor="text"></label>
        <input placeholder='Entity' value={data.name} className="w-32 p-1 rounded-md" id="text" name="text" onChange={(event) => onNodeInputChange(event, id)} />
      </div>
        {data && <TableName tableId={data.tableId}></TableName>}

      
      
      <div className='relative w-full'>
        <HasOneHandle visibility={visibleSourceHandles}/>
        <Handle
          onMouseDown={() => onChangeAssociationType("has_one", id)}
          className="opacity-50 absolute -bottom-3 justify-center items-center flex border-none w-6 h-6 left-1/4"
          style={{visibility: visibleSourceHandles}}
          type="source"
          position={Position.Bottom}
          id="bottom1"
        />

        <HasManyHandle visibility={visibleSourceHandles}/>
        <Handle
          onMouseDown={() => onChangeAssociationType("has_many", id)}
          className=" opacity-50 absolute -bottom-3 justify-center items-center flex border-none w-6 h-6 left-1/2"
          style={{visibility: visibleSourceHandles}}
          type="source"
          position={Position.Bottom}
          id="bottom2"
        />

        <ThroughHandle visibility={visibleSourceHandles}/>
        <Handle
            onMouseDown={() => onChangeAssociationType("through", id)}
            className=" opacity-50 absolute -bottom-3 justify-center items-center flex border-none w-6 h-6 left-3/4"
            style={{visibility: visibleSourceHandles}}
            type="source"
            position={Position.Bottom}
            id="bottom3"
        />
      </div>

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

      