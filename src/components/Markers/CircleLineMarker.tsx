import { MarkerBase, MarkerType } from "@/components"
import { memo } from "react"


export const CircleLineMarker = memo((props: MarkerType) => {
  
  return (
    <MarkerBase {...props}>
      <>
        <circle
          className="stroke-[40] stroke-first-500 fill-transparent"
          cx="100"
          cy="87.5"
          r="50"  
        />
        <path
          className="stroke-[40] stroke-first-500"
          style={{strokeLinecap:"round"}} 
          d="M 100,37.5 V 0"
        />
        <path
          className="stroke-[40] stroke-first-500"
          style={{strokeLinecap:"round"}} 
          d="M 100,137.5 V 180"
        />
      </>
    </MarkerBase>
  )
})