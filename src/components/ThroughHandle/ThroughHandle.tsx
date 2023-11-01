import { CustomHandle } from '@/components';
import { throughEdgePartial } from '@/zustandStore';
import { memo } from 'react';

export const ThroughHandle = memo(({nodeId} : {nodeId: string}) => {

  return (
    <div className="left-3/4 association-handle" >
      <svg 
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
        handleType={throughEdgePartial.type}
        nodeId={nodeId} 
        id="bottom3"
      />
      
    </div>
  )
})