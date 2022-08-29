import useStore from '@/zustandStore/store';

export const SelectThroughNode = ({nodeId} : {nodeId: string}) => {

  
  const isConnectContinue = useStore(store => store.isConnectContinue)
  const associationType = useStore(store => store.associationType)
  const connectionStartNodeId = useStore(store => store.connectionStartNodeId)
  const onMouseEnterThrough = useStore(store => store.onMouseEnterThrough)

  const visibleThroughSelectArea = (
    isConnectContinue && 
    associationType === "through" && 
    ( connectionStartNodeId !== nodeId )
  )
  
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