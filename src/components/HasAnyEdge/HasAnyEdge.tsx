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
import useCustomizationStore, { CustomizationStoreState } from '@/zustandStore/customizationStore';
import { memo } from 'react';

export enum HasAnyEdgeLabel {
  HasMany = "has many",
  HasOne = "has one",
}
export type HasAnyEdgePropsType = Omit<
  EdgeProps<null>, "sourcePosition" |"targetPosition" | "data"
>

export const HasAnyEdge = memo(({
  id,
  source,
  target,
  sourceX,
  sourceY,
  targetX,
  targetY,
  label,
  selected,
}: HasAnyEdgePropsType) => {

  const showTextOnEdges = useCustomizationStore((store: CustomizationStoreState) => (store.showTextOnEdges))

  const sourceNode: Node | undefined = useStore(store => store.nodes.find( node => node.id === source))
  const targetNode: Node | undefined = useStore(store => store.nodes.find( node => node.id === target))
  const mouseOnEdge = useStore(store => store.mouseOnEdgeId === id )

  if (!sourceNode || !targetNode) { return <div></div> }

  const { targetPosition, ...rest } = getEdgeParams(sourceNode, targetNode);

  const edgePath = getBezierPath({...rest, targetPosition})
  

  const [centerX, centerY] = getBezierEdgeCenter({
    sourceX,
    sourceY,
    targetX: targetX,
    targetY: targetY,
  });

  
  let orient = "0deg" 
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
      {
        (label === HasAnyEdgeLabel.HasMany) ? 
          <CrowsFootMarker orient={orient} edgeId={id} /> : 
          <LineMarker orient={orient} edgeId={id} />
      }
      
      <path
        id={id}
        style={(selected || mouseOnEdge) ? {stroke: "black", strokeWidth: 3, strokeDasharray: 0} : {}}
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

      {
        showTextOnEdges && 
        <ShowEdgeText label={label} centerX={centerX} centerY={centerY} />
      }
      
    </>
  );
})
