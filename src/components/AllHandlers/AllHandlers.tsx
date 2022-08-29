import {
  HasManyHandle,
  HasOneHandle,
  ThroughHandle 
} from "@/components"

import useStore from '@/zustandStore/store';

export const AllHandlers = ({nodeId}: {nodeId: string}) => {
  

  const isConnectContinue = useStore(store => store.isConnectContinue)
  const isMouseOnNode = useStore(store => store.isMouseOnNode)
  const mouseOnNodeId = useStore(store => store.mouseOnNodeId)

  const visibleSourceHandles = ((!isConnectContinue && isMouseOnNode && mouseOnNodeId == nodeId) ? "opacity-100" : "opacity-0")
  
  return (
    <div className={`relative w-full ${visibleSourceHandles}`} style={{strokeLinecap:"round"}} >
      <HasOneHandle nodeId={nodeId} />

      <HasManyHandle nodeId={nodeId} />

      <ThroughHandle nodeId={nodeId} />

    </div>

  )
}
