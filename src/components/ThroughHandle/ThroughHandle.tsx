import { CustomHandle } from '@/components';

export const ThroughHandle = ({nodeId} : {nodeId: string}) => {

  return (
    <div className="w-6 h-6 absolute left-3/4 bg-slate-700 rounded-full -translate-x-1/2 flex justify-center items-center" >
      <svg 
        className="stroke-[40] stroke-slate-50 w-3 h-3 "
        viewBox="0 0 200 200" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M 100,20 V 40"
        />
        <path
          d="m 100,160 v 20"
        />
        <path
          d="m 100,90 v 20"
        />
      
      </svg>

      <CustomHandle 
        handleType='through' 
        nodeId={nodeId} 
        id="bottom3"
      />
      
    </div>
  )
}