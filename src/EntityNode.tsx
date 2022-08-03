import { useCallback, useEffect } from 'react';
import { Handle, Position } from 'react-flow-renderer';
import TableName from './TableName';
import useStore from './zustand/store';


export type EntityNodeDataType = {
  tableId: string,
  name: string,
}

const EntityNode = ({id, data }: {id: string, data: EntityNodeDataType}) => {
  const { onNodeInputChange, onMouseEnterThrough, onChangeAssociationType } = useStore();

  const isConnectContinue = useStore(state => state.isConnectContinue)
  const isMouseOnNode = useStore(state => state.isMouseOnNode)
  const mouseOnNodeId = useStore(state => state.mouseOnNodeId)
  const selectedNodeForThrough = useStore(state => state.selectedNodeIdForThrough) == id
  const associationType = useStore(state => state.associationType)
  const connectionStartId = useStore(state => state.connectionStartId)

  const visibleSourceHandles = ((!isConnectContinue && isMouseOnNode && mouseOnNodeId == id) ? "visible" : "hidden")
  
  return (
    <div className={`border-black border border-solid p-1 rounded-sm ${ selectedNodeForThrough ?  "bg-second-400" : "bg-first-100"}`}>
      
      <Handle className="border-none w-6 h-6" type="target" position={Position.Top} id="top" style={{visibility: isConnectContinue ? "visible" : "hidden"}}/>
      
      <div>
        <label htmlFor="text"></label>
        <input value={data.name} className="bg-slate-200 w-32 p-1 rounded-md" id="text" name="text" onChange={(event) => onNodeInputChange(event, id)} />
      </div>
      <sub>
        {data && <TableName tableId={data.tableId}></TableName>}
      </sub>

      
      <Handle onMouseDown={() => onChangeAssociationType("has_one", id)} className="border-none w-6 h-6 left-1/4" style={{visibility: visibleSourceHandles}} type="source" position={Position.Bottom} id="bottom1" />
      <Handle onMouseDown={() => onChangeAssociationType("has_many", id)} className="border-none w-6 h-6" style={{visibility: visibleSourceHandles}} type="source" position={Position.Bottom} id="bottom2" />
      <Handle onMouseDown={() => onChangeAssociationType("through", id)} className="border-none w-6 h-6 left-3/4" style={{visibility: visibleSourceHandles}} type="source" position={Position.Bottom} id="bottom3" />

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

export default EntityNode;

      