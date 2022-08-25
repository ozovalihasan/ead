import useStore from '@/zustandStore/store';

export const SelectThroughNode = ({nodeId} : {nodeId: string}) => {

  const {
    isConnectContinue,
    associationType,
    connectionStartNodeId,
    onMouseEnterThrough, 
  } = useStore();

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