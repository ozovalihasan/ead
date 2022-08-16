import useStore from 'zustandStore/store';
import { Handle, Position } from 'react-flow-renderer';

export const HasOneHandle = ({id} : {id: string}) => {
  const {
    onChangeAssociationType,
  } = useStore()

  return (
    <div className="w-6 h-6 absolute -bottom-3 left-1/4 bg-slate-700 rounded-full -translate-x-1/2" >
      <svg className="w-6 h-6" viewBox="0 0 200 200" >
        <path d="m 90,0 v 200 h 20 V 0" className="fill-slate-50" />
      </svg>

      <Handle
        onMouseDown={() => onChangeAssociationType("has_one", id)}
        className="opacity-50 justify-center items-center border-none w-6 h-6 bottom-0 left-1/2"
        type="source"
        position={Position.Bottom}
        id="bottom1"
      />

    </div>
  )
}


