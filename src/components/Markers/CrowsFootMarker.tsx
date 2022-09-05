import { MarkerBase, MarkerType } from "@/components"
import { memo } from "react"

export const CrowsFootMarker = memo((props: MarkerType) => {
  
  return (
    <MarkerBase {...props}>
      
      <path 
        className="stroke-[40] stroke-first-500"
        style={{strokeLinecap:"round"}} 
        d="M 100,20 20,180 m 80,-160 80,160 m -80,0 V 20 0"
      />
      
    </MarkerBase>
  )
})