import { CustomHandle } from '@/components';
import { memo } from 'react';

export const HasManyHandle = memo(({nodeId} : {nodeId: string}) => {

  return (
    <div className="w-6 h-6 absolute left-1/2 bg-slate-700 rounded-full -translate-x-1/2 flex justify-center items-center" >
      <svg 
        className="stroke-[40] stroke-slate-50 w-3 h-3 "
        viewBox="0 0 200 200" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path 
          d="M100 20v160 M100 20 20 180 m80-160 80 160"
        />
      </svg>

      <CustomHandle
        handleType='has_many'
        nodeId={nodeId}
        id="bottom2"
      />
    </div>
  )
})
