import { Handle, Position } from 'react-flow-renderer';
import {
  HasManyHandle,
  HasOneHandle,
  ThroughHandle 
} from "components"

import useStore from 'zustandStore/store';

export const AllHandlers = ({id}: {id: string}) => {
  
  const {
    isConnectContinue,
    isMouseOnNode,
    mouseOnNodeId,
    onChangeAssociationType,
  } = useStore()

  const visibleSourceHandles = ((!isConnectContinue && isMouseOnNode && mouseOnNodeId == id) ? "opacity-100" : "opacity-0")
  
  return (
    <div className={`relative w-full ${visibleSourceHandles}`}>
      <HasOneHandle id={id} />

      <HasManyHandle id={id} />

      <ThroughHandle id={id} />

    </div>

  )
}
