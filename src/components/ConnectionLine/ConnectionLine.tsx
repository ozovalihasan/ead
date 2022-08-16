import { ConnectionLineComponentProps, ConnectionLineType, getBezierPath, Node } from "react-flow-renderer";
import useStore from "@/zustandStore/store";

export const ConnectionLine = ({
  sourceX,
  sourceY,
  sourcePosition,
  targetX,
  targetY,
  targetPosition,
}: ConnectionLineComponentProps) => {

  const associationType = useStore(state => state.associationType)
  const selectedNodeIdForThrough = useStore(state => state.selectedNodeIdForThrough)

  let throughNode: null | Node = null
  let throughEdgePath: null | string = null
  if (associationType === 'through'){
    throughNode = useStore(store => store.nodes.find( node => node.id === selectedNodeIdForThrough)) as Node
    
    if (throughNode){
      throughEdgePath = getBezierPath({
        sourceX,
        sourceY,
        sourcePosition,
        targetX: throughNode.position.x + (throughNode.width as number / 2),
        targetY: throughNode.position.y + (throughNode.height as number / 2),
        targetPosition,
        curvature: 0.5
      })
    }
  }

  let sourceUpdatedX = null
  let sourceUpdatedY = null

  if (throughNode) {
    sourceUpdatedX = throughNode.position.x + (throughNode.width as number / 2);
    sourceUpdatedY = throughNode.position.y + (throughNode.height as number / 2);
  } else{
  sourceUpdatedX = sourceX
    sourceUpdatedY = sourceY
  }

  const edgePath = getBezierPath({
    sourceX: sourceUpdatedX,
    sourceY: sourceUpdatedY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
    curvature: 0.5
  })

  
  
  return (
    <g>
      {
        throughEdgePath && 
        <path
          fill="none"
          stroke="#222"
          strokeWidth={1.5}
          className="animated"
          d={throughEdgePath}

        />
      }
      
      <path
        fill="none"
        stroke="#222"
        strokeWidth={1.5}
        className={associationType === 'through' ? "animated" : ""}
        d={edgePath}

      />
      
      <circle cx={targetX} cy={targetY} fill="#fff" r={3} stroke="#222" strokeWidth={1.5} />
    </g>
  );
};
