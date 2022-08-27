import useStore from "@/zustandStore/store";
import { XMarkIcon } from "@/components";

export type RemoveEdgeButtonType = {
  edgeId: string
}

export const RemoveEdgeButton = ({edgeId}: RemoveEdgeButtonType) => {

  const { onEdgesChange } = useStore();
  
  
  return (
    <button className="btn-first border-none w-full aspect-square absolute top-0 left-0 rounded-full" onClick={() => onEdgesChange(
      [
        {
          id: edgeId,
          type: 'remove',
        }
      ]
    )} >
      <XMarkIcon></XMarkIcon>
    </button>
  )
}