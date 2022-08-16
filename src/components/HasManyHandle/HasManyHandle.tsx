import { CustomHandle } from 'components';

export const HasManyHandle = ({nodeId} : {nodeId: string}) => {

  return (
    <div className="w-6 h-6 absolute -bottom-3 left-1/2 bg-slate-700 rounded-full -translate-x-1/2" >
      <svg className="w-6 h-6" viewBox="0 0 200 200" >
        <path
          d="M 100,0 0,144.9335 V 200 H 17.807516 L 84.697214,66.2206 V 200 H 111.26569 L 110.92704,63.87718 173.53021,200 H 200 v -46.14664 z"
          className="fill-slate-50"
        />
      </svg>

      <CustomHandle handleType='has_many' nodeId={nodeId} id="bottom2"></CustomHandle>
    </div>
  )
}
