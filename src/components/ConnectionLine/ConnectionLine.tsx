import { ConnectionLineComponentProps, getBezierPath, Node } from "reactflow";
import { useStore } from '@/zustandStore';

export const ConnectionLine = ({
  fromX,
  fromY,
  fromPosition,
  toX,
  toY,
  toPosition
}: Omit<ConnectionLineComponentProps, 'connectionLineType' | 'connectionStatus' >) => {

  const associationType = useStore(state => state.associationType)

  let throughNode: null | Node = null
  let throughEdgePath: null | string = null

  if (associationType === 'through'){
    const selectedNodeIdForThrough = useStore(state => state.selectedNodeIdForThrough)

    throughNode = useStore(store => store.nodes.find( node => node.id === selectedNodeIdForThrough)) as Node
    
    if (throughNode){
      [throughEdgePath] = getBezierPath({
        sourceX: fromX,
        sourceY: fromY,
        sourcePosition: fromPosition,
        targetX: throughNode.position.x + (throughNode.width! / 2),
        targetY: throughNode.position.y + (throughNode.height! / 2),
        targetPosition: toPosition,
        curvature: 0.5
      })
    }
  }

  let sourceUpdatedX = null
  let sourceUpdatedY = null

  if (throughNode) {
    sourceUpdatedX = throughNode.position.x + (throughNode.width! / 2);
    sourceUpdatedY = throughNode.position.y + (throughNode.height! / 2);
  } else{
    sourceUpdatedX = fromX
    sourceUpdatedY = fromY
  }

  const [edgePath] = getBezierPath({
    sourceX: sourceUpdatedX,
    sourceY: sourceUpdatedY,
    sourcePosition: fromPosition,
    targetX: toX,
    targetY: toY,
    targetPosition: toPosition,
    curvature: 0.5
  })

  return (
    <>
      <g className="stroke-third-800 dark:stroke-third-200 ">
        {
          throughEdgePath &&
          <path
            fill="none" 
            strokeWidth={1.5}
            className="custom-animation"
            d={throughEdgePath}
          />
        }
      
        <path
          fill="none" 
          strokeWidth={1.5}
          className={associationType === 'through' ? "custom-animation" : ""}
          d={edgePath}
        />
      
        <circle cx={toX} cy={toY} fill="#fff" r={3} strokeWidth={1.5} />
      </g>
    </>
  );
};
