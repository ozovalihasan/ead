import { 
  EdgeProps,
  getBezierPath, 
  Node, 
  Position 
} from 'reactflow';

import {
  RemoveEdgeButton,
  ShowEdgeText,
  CrossMarker,
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

const positionToOrient = {
  [Position.Bottom]: "180deg",
  [Position.Left]: "-90deg",
  [Position.Right]: "90deg",
  [Position.Top]: "0deg",
};

export const HasAnyEdge = memo(({
  id,
  source,
  target,
  label,
  selected,
}: HasAnyEdgePropsType) => {

  const showTextOnEdges = useCustomizationStore((store: CustomizationStoreState) => (store.showTextOnEdges))

  const sourceNode: Node | undefined = useStore(store => store.nodes.find( node => node.id === source))
  const targetNode: Node | undefined = useStore(store => store.nodes.find( node => node.id === target))
  const mouseOnEdge = useStore(store => store.mouseOnEdgeId === id )

  if (!sourceNode || !targetNode) { return <div></div> }

  const { targetPosition, sourcePosition, ...rest } = getEdgeParams(sourceNode, targetNode);

  const [edgePath, labelX, labelY] = getBezierPath({...rest, sourcePosition, targetPosition})
  
  let endOrient = positionToOrient[targetPosition]
  
  return (
    <>
      {
        (label === HasAnyEdgeLabel.HasMany) ? 
          <CrowsFootMarker orient={endOrient} edgeId={`end-${id}`} /> : 
          <CrossMarker orient={endOrient} edgeId={`end-${id}`} />
      }
      
      <path
        id={id}
        style={(selected || mouseOnEdge) ? {stroke: "black", strokeWidth: 3, strokeDasharray: 0} : {}}
        className="stroke-first-500 fill-[none] stroke-[2] "
        d={edgePath}
        markerEnd={`url(#marker-def-end-${id})`}
      />

      <path
        id={`${id}-wider`}
        className="fill-[none] stroke-[15] stroke-transparent"
        d={edgePath}
      />
      { selected && 
        <foreignObject
          className='h-10 w-10'
          x={labelX - 20 / 2}
          y={labelY + 10 / 2}
        >
          <RemoveEdgeButton edgeId={id}/>
        </foreignObject> 
      }

      {
        showTextOnEdges && 
        <ShowEdgeText label={label} centerX={labelX} centerY={labelY} />
      }
      
    </>
  );
})
