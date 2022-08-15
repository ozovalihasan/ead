import useStore from "zustandStore/store";


export const RemoveEdgeButton = ({id}: {id: string}) => {

  const { removeEdge } = useStore();
  
  
  return (
    <button className="bg-transparent border border-solid border-first-500 rounded-full p-2" onClick={() => removeEdge(id)} >
      ×
    </button>
  )
}