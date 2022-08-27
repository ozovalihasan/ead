import { CustomHandle } from '@/components';

export const HasOneHandle = ({nodeId} : {nodeId: string}) => {

  return (
    <div className="w-6 h-6 absolute left-1/4 -translate-x-1/2 bg-slate-700 rounded-full flex justify-center items-center" >
      <svg 
        className="w-3 h-3 stroke-[40] stroke-slate-50" 
        viewBox="0 0 200 200" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path 
          d="M 100,20 V 180" 
        />
      </svg>

      <CustomHandle
        handleType='has_one'
        nodeId={nodeId}
        id="bottom1"
      />

    </div>
  )
}


