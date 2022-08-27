import { MarkerBase, MarkerType } from "@/components"


export const LineMarker = (props: MarkerType) => {
  
  return (
    <MarkerBase {...props}>
      <path 
        className="stroke-[40] stroke-first-500"
        style={{strokeLinecap:"round"}} 
        d="M 20,20 H 180 M 100,0 V 180"
      />
    </MarkerBase>
  )
}
