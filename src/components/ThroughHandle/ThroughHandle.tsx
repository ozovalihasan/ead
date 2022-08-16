import useStore from 'zustandStore/store';
import { Handle, Position } from 'react-flow-renderer';

export const ThroughHandle = ({id} : {id: string}) => {

  const {
    onChangeAssociationType,
  } = useStore()

  return (
    <div className="w-6 h-6 absolute -bottom-3 left-3/4 bg-slate-700 rounded-full -translate-x-1/2" >
      <svg className="w-6 h-6" viewBox="0 0 200 200" >

        <path
          d="m 95,0 v 50 h 10 V 0"
          className="fill-slate-50"
        />
        <path
          d="m 95,75 v 50 H 105 v -50"
          className="fill-slate-50"
        />
        <path
          d="m 95,150 v 50 h 10 v -50"
          className="fill-slate-50"
        />
      
      </svg>
      
      <Handle
          onMouseDown={() => onChangeAssociationType("through", id)}
          className="opacity-50 justify-center items-center border-none w-6 h-6 bottom-0 left-1/2"
          type="source"
          position={Position.Bottom}
          id="bottom3"
      />
    </div>
  )
}