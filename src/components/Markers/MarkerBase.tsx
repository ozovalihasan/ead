import { ReactElement } from "react"
export type MarkerType = {
  orient: string,
  edgeId: string,
}

export type MarkerBaseType = MarkerType & {
  children: ReactElement
}

export const MarkerBase = ({orient, edgeId, children}: MarkerBaseType) => {
  
  return (
    <defs>
      <marker
        orient={orient}
        id={`marker-def-${edgeId}` }
        viewBox="0 0 200 200"
        refX="100" 
        refY="0" 
        markerUnits="strokeWidth" 
        markerWidth="5" 
        markerHeight="5"
      >
        {children}
      </marker>
    </defs>

  )
}
