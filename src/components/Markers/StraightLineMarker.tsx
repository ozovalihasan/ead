import { MarkerBase, MarkerType } from "@/components"
import { memo } from "react"


export const StraightLineMarker = memo((props: MarkerType) => {
  
  return (
    <MarkerBase {...props}>
      <>
        <path
          className="stroke-[40] stroke-first-500"
          style={{strokeLinecap:"round"}} 
          d="M 100,180 V 0"
        />
      </>
    </MarkerBase>
  )
})
