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

  const visibleSourceHandles = ((!isConnectContinue && isMouseOnNode && mouseOnNodeId == id) ? "visible" : "hidden")
  
  return (
    <div className='relative w-full'>
    <HasOneHandle visibility={visibleSourceHandles}/>
    <Handle
        onMouseDown={() => onChangeAssociationType("has_one", id)}
        className="opacity-50 absolute -bottom-3 justify-center items-center flex border-none w-6 h-6 left-1/4"
        style={{visibility: visibleSourceHandles}}
        type="source"
        position={Position.Bottom}
        id="bottom1"
    />

    <HasManyHandle visibility={visibleSourceHandles}/>
    <Handle
        onMouseDown={() => onChangeAssociationType("has_many", id)}
        className=" opacity-50 absolute -bottom-3 justify-center items-center flex border-none w-6 h-6 left-1/2"
        style={{visibility: visibleSourceHandles}}
        type="source"
        position={Position.Bottom}
        id="bottom2"
    />

    <ThroughHandle visibility={visibleSourceHandles}/>
    <Handle
        onMouseDown={() => onChangeAssociationType("through", id)}
        className=" opacity-50 absolute -bottom-3 justify-center items-center flex border-none w-6 h-6 left-3/4"
        style={{visibility: visibleSourceHandles}}
        type="source"
        position={Position.Bottom}
        id="bottom3"
    />
    </div>

  )
}
