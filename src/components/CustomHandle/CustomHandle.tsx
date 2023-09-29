import { Handle, Position } from 'reactflow';
import { useStore } from '@/zustandStore';
import { memo } from 'react';


export interface CustomHandleType {
  id: string, 
  nodeId: string, 
  handleType: string
}

export const CustomHandle = memo(({id, nodeId, handleType} : CustomHandleType) => {
  const onChangeAssociationType = useStore(store => store.onChangeAssociationType)
  
  return (
    
  <Handle
    onMouseDown={() => onChangeAssociationType(handleType, nodeId)}
    className="opacity-50 justify-center items-center border-none w-6 h-6 bottom-0 left-1/2"
    type="source"
    position={Position.Bottom}
    id={id}
  />
  )
})
