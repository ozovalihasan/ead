import {
  HasManyHandle,
  HasOneHandle,
  ThroughHandle 
} from "@/components"

import useStore from '@/zustandStore/store';

export const AllHandlers = ({nodeId}: {nodeId: string}) => {
  
  const {
    isConnectContinue,
    isMouseOnNode,
    mouseOnNodeId,
  } = useStore()

  const visibleSourceHandles = ((!isConnectContinue && isMouseOnNode && mouseOnNodeId == nodeId) ? "opacity-100" : "opacity-0")
  
  return (
    <div className={`relative w-full ${visibleSourceHandles}`}>
      <HasOneHandle nodeId={nodeId} />

      <HasManyHandle nodeId={nodeId} />

      <ThroughHandle nodeId={nodeId} />

    </div>

  )
}
