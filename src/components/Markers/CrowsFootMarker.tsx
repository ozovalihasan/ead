import { MarkerBase, MarkerType } from "@/components"

export const CrowsFootMarker = (props: MarkerType) => {
  
  return (
    <MarkerBase {...props}>
      <path 
        d="M 100,0 0,144.9335 V 200 H 17.807516 L 84.697214,66.2206 V 200 H 111.26569 L 110.92704,63.87718 173.53021,200 H 200 v -46.14664 z" 
        className="fill-first-500"
      />
    </MarkerBase>
  )
}