import {
  TableName,
  AllHandlers,
  SelectThroughNode,
  TargetHandle
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
    selectedNodeIdForThrough,
    onNodeInputChange, 
  } = useStore();

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

      