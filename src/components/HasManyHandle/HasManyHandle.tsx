import { CustomHandle } from '@/components';
import { memo } from 'react';

export const HasManyHandle = memo(({nodeId} : {nodeId: string}) => {

  return (
    <div className="left-1/2 association-handle" >
      <svg 
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
