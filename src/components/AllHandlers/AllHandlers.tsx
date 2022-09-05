import {
  HasManyHandle,
  HasOneHandle,
  ThroughHandle 
} from "@/components"

import useStore from '@/zustandStore/store';
import { memo } from "react";

export const AllHandlers = memo(({nodeId}: {nodeId: string}) => {

  const visibleSourceHandles =  (
    useStore(store =>(
      !store.isConnectContinue && 
      store.isMouseOnNode && 
      store.mouseOnNodeId == nodeId
    ))
  ) ? "opacity-100" : "opacity-0"

  
  
  return (
    <div className={`relative w-full ${visibleSourceHandles}`} style={{strokeLinecap:"round"}} >
      <HasOneHandle nodeId={nodeId} />

      <HasManyHandle nodeId={nodeId} />

      <ThroughHandle nodeId={nodeId} />

    </div>

  )
})
