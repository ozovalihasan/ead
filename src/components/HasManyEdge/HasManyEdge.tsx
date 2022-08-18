import { 
  EdgeProps, 
  getBezierEdgeCenter, 
  getBezierPath, 
  Node, 
  Position 
} from 'react-flow-renderer';

import {
  RemoveEdgeButton,
  ShowEdgeText
} from "@/components"

import { getEdgeParams } from '@/utils';
import useStore from '@/zustandStore/store';

export interface HasManyEdgeType extends Omit<
  EdgeProps, "sourcePosition" |"targetPosition" | "data"
> {
}


export const HasManyEdge = ({
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
}: HasManyEdgeType) => {

  const sourceNode = useStore(store => store.nodes.find( node => node.id === source)) as Node
  const targetNode = useStore(store => store.nodes.find( node => node.id === target)) as Node
  const mouseOnEdge = useStore(store => store.mouseOnEdgeId ) === id

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


  
  return (
    <>
      
      <defs>
        <marker   
          orient={orient}
          id={`crow-foot-${id}` }
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

      <path
        id={id}
        style={(selected || mouseOnEdge) ? {stroke: "black", strokeWidth: 3, strokeDasharray: 0} : style}
        className="stroke-first-500 fill-[none] stroke-[2] "
        d={edgePath}
        markerEnd={`url(#crow-foot-${id})`}
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
          <RemoveEdgeButton edgeId={id}/>
        </foreignObject> 
      }

      <ShowEdgeText label={label} centerX={centerX} centerY={centerY} />
    </>
  );
}
