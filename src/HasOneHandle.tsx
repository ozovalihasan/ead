const HasOneHandle = ({visibility}: {visibility: string}) => (
  <svg className={`w-6 h-6 p-1 absolute -bottom-3 left-1/4 bg-slate-700 rounded-full -translate-x-1/2 ${visibility}`} viewBox="0 0 200 200">
    <path 
      d="m 90,0 v 200 h 20 V 0"
      className="fill-slate-50"
    />
  </svg>
)

export default HasOneHandle;

