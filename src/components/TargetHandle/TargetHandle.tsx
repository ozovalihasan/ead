import { Handle, Position } from "react-flow-renderer"
import useStore from '@/zustandStore/store';

export const TargetHandle = ({nodeId} : {nodeId: string}) => {
  
  const visibleTargetHandle = useStore(store => (
    store.isConnectContinue && 
    store.connectionStartNodeId !== nodeId && 
    (
      store.associationType !== "through" || 
      (
        store.selectedNodeIdForThrough && 
        store.selectedNodeIdForThrough !== nodeId
      )
    )
  ))

  return (
    <Handle 
      id="top"
      className={`border-none w-6 h-6 hover:bg-first-500 ${(visibleTargetHandle) ? "visible" : "invisible"}`} 
      type="target" 
      position={Position.Top} 
    />
  )
}
