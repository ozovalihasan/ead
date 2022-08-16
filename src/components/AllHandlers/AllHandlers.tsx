import {
  HasManyHandle,
  HasOneHandle,
  ThroughHandle 
} from "@/components"

import useStore from '@/zustandStore/store';

export const AllHandlers = ({id}: {id: string}) => {
  
  const {
    isConnectContinue,
    isMouseOnNode,
    mouseOnNodeId,
  } = useStore()

  const visibleSourceHandles = ((!isConnectContinue && isMouseOnNode && mouseOnNodeId == id) ? "opacity-100" : "opacity-0")
  
  return (
    <div className={`relative w-full ${visibleSourceHandles}`}>
      <HasOneHandle nodeId={id} />

      <HasManyHandle nodeId={id} />

      <ThroughHandle nodeId={id} />

    </div>

  )
}
