import useStore from "@/zustandStore/store";
import { XMark } from "@/icons";

export type RemoveEdgeButtonType = {
  edgeId: string
}

export const RemoveEdgeButton = ({edgeId}: RemoveEdgeButtonType) => {

  const { onEdgesChange } = useStore();
  
  
  return (
    <button className="btn-first w-6 h-6 border-none rounded-full" onClick={() => onEdgesChange(
      [
        {
          id: edgeId,
          type: 'remove',
        }
      ]
    )} >
      <div className="stroke-[40] w-3 h-3">
        <XMark></XMark>
      </div>
    </button>
  )
}