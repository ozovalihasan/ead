import { Handle, Position } from "react-flow-renderer"
import useStore from '@/zustandStore/store';

export const TargetHandle = ({nodeId} : {nodeId: string}) => {
  const {
    isConnectContinue,
    associationType,
    connectionStartNodeId,
    selectedNodeIdForThrough,
  } = useStore();

  const visibleTargetHandle = (
    isConnectContinue && 
    connectionStartNodeId !== nodeId && 
    (
      associationType !== "through" || 
      (
        selectedNodeIdForThrough && 
        selectedNodeIdForThrough !== nodeId
      )
    )
  )
  
  return (
    <Handle 
      id="top"
      className={`border-none w-6 h-6 ${(visibleTargetHandle) ? "visible" : "invisible"}`} 
      type="target" 
      position={Position.Top} 
    />
  )
}
