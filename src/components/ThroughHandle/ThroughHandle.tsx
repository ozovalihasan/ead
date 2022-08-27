import { CustomHandle } from '@/components';

export const ThroughHandle = ({nodeId} : {nodeId: string}) => {

  return (
    <div className="w-6 h-6 absolute -bottom-3 left-3/4 bg-slate-700 rounded-full -translate-x-1/2" >
      <svg className="w-6 h-6 stroke-[20] stroke-slate-50" viewBox="0 0 200 200" >

        <path
          style={{strokeLinecap:"round"}} 
          d="M 100,20 V 40"
        />
        <path
          style={{strokeLinecap:"round"}} 
          d="m 100,160 v 20"
        />
        <path
          style={{strokeLinecap:"round"}} 
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