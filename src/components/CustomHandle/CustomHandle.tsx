import { Handle, Position } from 'react-flow-renderer';
import useStore from '@/zustandStore/store';


export type CustomHandleType = {
  id: string, 
  nodeId: string, 
  handleType: string
}

export const CustomHandle = ({id, nodeId, handleType} : CustomHandleType) => {
  const {
      onChangeAssociationType,
    } = useStore()
  
  return (
    
  <Handle
    onMouseDown={() => onChangeAssociationType(handleType, nodeId)}
    className="opacity-50 justify-center items-center border-none w-6 h-6 bottom-0 left-1/2"
    type="source"
    position={Position.Bottom}
    id={id}
  />
  )
}
