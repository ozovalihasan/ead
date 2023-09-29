import { useStore } from '@/zustandStore';

export const SelectThroughNode = ({nodeId} : {nodeId: string}) => {

  const onMouseEnterThrough = useStore(store => store.onMouseEnterThrough)

  const visibleThroughSelectArea = useStore(store =>  (
    store.isConnectContinue && 
    store.associationType === "through" && 
    ( store.connectionStartNodeId !== nodeId )
  ))
  
  return (
    <div 
      className={`
        text-first-100 bg-first-500 w-16 h-full flex 
        absolute right-full bottom-0 rounded-l-md text-tiny  
        ${visibleThroughSelectArea ? "visible" : "hidden"}
      `} 
      
      onMouseEnter={() => onMouseEnterThrough(nodeId)}
    >
      <div className="m-auto">
        through
      </div>
    </div>
  )
}