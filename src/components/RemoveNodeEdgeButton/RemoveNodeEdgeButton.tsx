import useStore from "@/zustandStore/store";
import { Trash } from "@/icons";
import { EdgeChange, NodeChange } from "reactflow";

export const RemoveNodeEdgeButton = () => {
  const nodes = useStore(store => store.nodes)
  const edges = useStore(store => store.edges)
  const onNodesChange = useStore(store => store.onNodesChange)
  const onEdgesChange = useStore(store => store.onEdgesChange)

  const handleClick = () => {
    const nodeChanges: NodeChange[] = nodes.filter(node => node.selected).map(node => ({id: node.id, type: "remove"}));
    if (nodeChanges.length > 0) {
      onNodesChange(nodeChanges)
    }

    const edgeChanges: EdgeChange[] = edges.filter(edge => edge.selected).map(edge => ({id: edge.id, type: "remove"}));
    if (edgeChanges.length > 0) {
      onEdgesChange(edgeChanges)
    }
  }

  if (nodes.every((node) => !node.selected) && edges.some((edge) => !edge.selected)) {
    return <></>
  }

  return (
      <button className='dark:hover:bg-zinc-300 hover:bg-zinc-700 rounded-lg p-2' onClick={handleClick} >
        <div className="stroke-[40] w-10 h-10">
          <Trash />
        </div>
      </button>      

  )
}