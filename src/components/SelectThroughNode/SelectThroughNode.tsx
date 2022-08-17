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
        text-tiny text-center text-first-100 bg-first-500  w-16 h-full 
        absolute right-full bottom-0 rounded-l-md px-1 content-center flex items-center 
        ${visibleThroughSelectArea ? "visible" : "hidden"}
      `} 
      
      onMouseEnter={(event) => onMouseEnterThrough(event, nodeId)}
    >
      <div className='text-center w-full'>
        through
      </div>
    </div>
  )
}