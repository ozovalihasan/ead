import { 
  EdgeProps, 
  getBezierEdgeCenter, 
  getBezierPath, 
  Node, 
  Position 
} from 'react-flow-renderer';

import {
  RemoveEdgeButton,
  ShowEdgeText,
  LineMarker,
  CrowsFootMarker
} from "@/components"

import { getEdgeParams } from '@/utils';
import useStore from '@/zustandStore/store';

export enum HasAnyEdgeLabel {
  HasMany = "has many",
  HasOne = "has one",
}

export interface HasAnyEdgeType extends Omit<
  EdgeProps, "sourcePosition" |"targetPosition" | "data"
> {
}

export const HasAnyEdge = ({
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
}: HasAnyEdgeType) => {

  const sourceNode = useStore(store => store.nodes.find( node => node.id === source)) as Node
  const targetNode = useStore(store => store.nodes.find( node => node.id === target)) as Node
  const mouseOnEdge = useStore(store => store.mouseOnEdgeId ) === id

  if (!sourceNode || !targetNode) { return <div></div> }

  const { targetPosition, ...rest } = getEdgeParams(sourceNode, targetNode);

  const edgePath = getBezierPath({...rest, targetPosition})
  

  const [centerX, centerY] = getBezierEdgeCenter({
    sourceX,
    sourceY,
    targetX: targetX,
    targetY: targetY,
  });

  
  let orient: string = "0deg" 
  if (targetPosition === Position.Bottom) {
    orient = "180deg"
  } else if (targetPosition === Position.Left) {
    orient = "-90deg"
  } else if (targetPosition === Position.Right) {
    orient = "90deg"
  } else if (targetPosition === Position.Top) {
    orient = "0deg"
  }

  let MarkerDefs = null

  if (label === HasAnyEdgeLabel.HasMany){
    MarkerDefs = <CrowsFootMarker orient={orient} edgeId={id} />
  } else if (label === HasAnyEdgeLabel.HasOne) {
    MarkerDefs = <LineMarker orient={orient} edgeId={id} />
  }
  
  return (
    <>
      {MarkerDefs}
      
      <path
        id={id}
        style={(selected || mouseOnEdge) ? {stroke: "black", strokeWidth: 3, strokeDasharray: 0} : style}
        className="stroke-first-500 fill-[none] stroke-[2] "
        d={edgePath}
        markerEnd={`url(#marker-def-${id})`}
      />

      <path
        id={`${id}-wider`}
        className="fill-[none] stroke-[15] stroke-transparent"
        d={edgePath}
      />
      { selected && 
        <foreignObject
          className='h-10 w-10'
          x={centerX - 20 / 2}
          y={centerY + 10 / 2}
        >
          <RemoveEdgeButton edgeId={id}/>
        </foreignObject> 
      }

      <ShowEdgeText label={label} centerX={centerX} centerY={centerY} />
    </>
  );
}
