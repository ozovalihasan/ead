import { CustomHandle } from '@/components';

export const HasOneHandle = ({nodeId} : {nodeId: string}) => {

  return (
    <div className="w-6 h-6 absolute -bottom-3 left-1/4 bg-slate-700 rounded-full -translate-x-1/2" >
      <svg className="w-6 h-6" viewBox="0 0 200 200" >
        <path d="m 90,0 v 200 h 20 V 0" className="fill-slate-50" />
      </svg>

      <CustomHandle
        handleType='has_one'
        nodeId={nodeId}
        id="bottom1"
      />

    </div>
  )
}


