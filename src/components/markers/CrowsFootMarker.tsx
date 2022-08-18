export type CrowsFootMarkerType = {
  orient: string,
  edgeId: string
}

export const CrowsFootMarker = ({orient, edgeId}: CrowsFootMarkerType) => {
  
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
            d="M 100,0 0,144.9335 V 200 H 17.807516 L 84.697214,66.2206 V 200 H 111.26569 L 110.92704,63.87718 173.53021,200 H 200 v -46.14664 z" 
            className="fill-first-500"
        />

        </marker>
    </defs>

  )
}

export default CrowsFootMarker;