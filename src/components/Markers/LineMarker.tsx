import { MarkerBase, MarkerType } from "@/components"


export const LineMarker = (props: MarkerType) => {
  
  return (
    <MarkerBase {...props}>
      <path 
        d="m 0,0 v 40 h 80 v 160 h 40 V 40 h 80 V 0"
        className="fill-first-500"  
      />
    </MarkerBase>
  )
}
