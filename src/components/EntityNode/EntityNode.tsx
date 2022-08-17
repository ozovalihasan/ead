import { Handle, Position } from 'react-flow-renderer';
import {
  TableName,
  AllHandlers,
  SelectThroughNode
} from "@/components"
import useStore from '@/zustandStore/store';


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
  const {
    isConnectContinue,
    associationType,
    connectionStartNodeId,
    selectedNodeIdForThrough,
    onNodeInputChange, 
  } = useStore();

  const visibleTargetHandle = (
    isConnectContinue && 
    connectionStartNodeId !== id && 
    (
      associationType !== "through" || 
      (
        selectedNodeIdForThrough && 
        selectedNodeIdForThrough !== id
      )
    )
  )

  return (
    <div className={`border-black border border-solid p-1 rounded-sm ${ (selectedNodeIdForThrough === id) ?  "bg-second-400" : "bg-first-50"} ${ selected ?  "bg-first-200" : ""}`} >
      
      <Handle 
        id="top"
        className={`border-none w-6 h-6 ${(visibleTargetHandle) ? "visible" : "hidden"}`} 
        type="target" 
        position={Position.Top} 
      />
      
      <div>
        <label htmlFor="text"></label>
        <input 
          placeholder='Entity' 
          value={data.name} 
          className="w-32 p-1 rounded-md" 
          id="text" 
          name="text" 
          onChange={(event) => onNodeInputChange(event, id)} 
        />
      </div>

      <TableName tableId={data.tableId} />
      
      <AllHandlers nodeId={id} />

      <SelectThroughNode nodeId={id}/>

    </div>
  );
}

      