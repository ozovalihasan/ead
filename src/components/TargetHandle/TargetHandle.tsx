import { Handle, Position } from "react-flow-renderer"
import useStore from '@/zustandStore/store';

export const TargetHandle = ({nodeId} : {nodeId: string}) => {
  const isConnectContinue = useStore(store => store.isConnectContinue)
  const associationType = useStore(store => store.associationType)
  const connectionStartNodeId = useStore(store => store.connectionStartNodeId)
  const selectedNodeIdForThrough = useStore(store => store.selectedNodeIdForThrough)

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
      className={`border-none w-6 h-6 hover:bg-first-500 ${(visibleTargetHandle) ? "visible" : "invisible"}`} 
      type="target" 
      position={Position.Top} 
    />
  )
}
