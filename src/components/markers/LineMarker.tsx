export type LineMarker = {
  orient: string,
  edgeId: string
}

export const LineMarker = ({orient, edgeId}: LineMarker) => {
  
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
        <path 
          d="m 0,0 v 40 h 80 v 160 h 40 V 40 h 80 V 0"
          className="fill-first-500"  />
      </marker>
    </defs>

  )
}
