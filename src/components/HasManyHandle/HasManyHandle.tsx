import { CustomHandle } from '@/components';

export const HasManyHandle = ({nodeId} : {nodeId: string}) => {

  return (
    <div className="w-6 h-6 absolute -bottom-3 left-1/2 bg-slate-700 rounded-full -translate-x-1/2" >
      <svg 
        className="stroke-[20] stroke-slate-50 w-6 h-6 "
        viewBox="0 0 200 200" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path 
          style={{strokeLinecap:"round"}} 
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
}
