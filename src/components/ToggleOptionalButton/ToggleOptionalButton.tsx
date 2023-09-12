import useStore from "@/zustandStore/store";
import { CircleAndLine } from "@/icons";

export interface ToggleOptionalButtonType {
  edgeId: string
}

export const ToggleOptionalButton = ({edgeId}: ToggleOptionalButtonType) => {
  const toggleOptional = useStore(store => store.toggleOptional);
  
  return (
    <button className="btn-first w-6 h-6 border-none rounded-full" onClick={() => toggleOptional(edgeId)} >
      <div className="stroke-[40] w-3 h-3">
        <CircleAndLine />
      </div>
    </button>
  )
}