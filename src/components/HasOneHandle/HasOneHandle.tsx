import { CustomHandle } from '@/components';

export const HasOneHandle = ({nodeId} : {nodeId: string}) => {

  return (
    <div className="w-6 h-6 absolute -bottom-3 left-1/4 bg-slate-700 rounded-full -translate-x-1/2" >
      <svg className="w-6 h-6 stroke-[20] stroke-slate-50" viewBox="0 0 200 200" >
        <path 
          style={{strokeLinecap:"round"}} 
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


