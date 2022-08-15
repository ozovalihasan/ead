import { EdgeProps, EdgeText, getBezierEdgeCenter, getBezierPath, Position } from 'react-flow-renderer';
import {
  RemoveEdgeButton,
  ShowEdgeText
} from "components"

import { getEdgeParams } from 'utils';
import useStore from 'zustandStore/store';

export const HasOneEdge = ({
  id,
  source,
  target,
  sourceX,
  sourceY,
  targetX,
  targetY,
  style = {},
  label,
  selected,
}: EdgeProps) => {
  const { removeEdge } = useStore();

  const sourceNode = useStore(store => store.nodes.find( node => node.id === source))
  const targetNode = useStore(store => store.nodes.find( node => node.id === target))
  const mouseOnEdge = useStore(store => store.mouseOnEdgeId ) === id
  
  if (!sourceNode || !targetNode) { return <div></div> }

  const { sx, sy, tx, ty, sourcePos, targetPos } = getEdgeParams(sourceNode, targetNode);

  const edgePath = getBezierPath({
    sourceX: sx,
    sourceY: sy,
    sourcePosition: sourcePos,
    targetPosition: targetPos,
    targetX: tx,
    targetY: ty,
  })
  

  const [centerX, centerY] = getBezierEdgeCenter({
    sourceX,
    sourceY,
    targetX: targetX,
    targetY: targetY,
  });

  let orient: string = "0deg" 
  if (targetPos === Position.Bottom) {
    orient = "180deg"
  } else if (targetPos === Position.Left) {
    orient = "-90deg"
  } else if (targetPos === Position.Right) {
    orient = "90deg"
  } else if (targetPos === Position.Top) {
    orient = "0deg"
  }

  

  
  return (
    <>
      <defs>
        <marker   
          orient={orient}
          id={`has-one-line-${id}` }
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
    
      <path
        id={id}
        style={(selected || mouseOnEdge) ? {stroke: "black", strokeWidth: 3, strokeDasharray: 0} : style}
        className="stroke-first-500 fill-[none] stroke-[2] "
        d={edgePath}
        markerEnd={`url(#has-one-line-${id})`}
      />

      <path
        id={`${id}-wider`}
        className="fill-[none] stroke-[15] stroke-transparent"
        d={edgePath}
      />

      { selected && 
        <foreignObject
          width={40}
          height={40}
          x={centerX - 20 / 2}
          y={centerY + 10 / 2}
        >
          <RemoveEdgeButton id={id}/>
        </foreignObject> 
      }

      <ShowEdgeText label={label} centerX={centerX} centerY={centerY} />
    </>
  );
}