const ThroughHandle = ({visibility}: {visibility: string}) => (
  <svg className={`w-6 h-6 p-1 absolute -bottom-3 left-3/4 bg-slate-700 rounded-full -translate-x-1/2 ${visibility}`} viewBox="0 0 200 200">
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
)

export default ThroughHandle;

