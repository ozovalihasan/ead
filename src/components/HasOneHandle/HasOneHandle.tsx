import { CustomHandle } from '@/components';
import { hasOneEdgePartial } from '@/zustandStore';
import { memo } from 'react';

export const HasOneHandle = memo(({nodeId} : {nodeId: string}) => {

  return (
    <div className="left-1/4 association-handle" >
      <svg 
        viewBox="0 0 200 200" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path 
          d="M 100,20 V 180" 
        />
      </svg>

      <CustomHandle
        handleType={hasOneEdgePartial.type}
        nodeId={nodeId}
        id="bottom1"
      />

    </div>
  )
})


