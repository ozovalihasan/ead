import { memo } from 'react';
import { 
  getBezierPath, 
  Node
} from 'reactflow';

import {
  RemoveEdgeButton,
  ShowEdgeText,
  CrossMarker,
  CrowsFootMarker,
  CircleLineMarker,
  StraightLineMarker,
  ToggleOptionalButton,
  HasManyEdgePropsType,
  HasOneEdgePropsType
} from "@/components"

import { getEdgeParams, positionToOrient } from '@/utils';
import useStore from '@/zustandStore/store';
import useCustomizationStore from '@/zustandStore/customizationStore';
import { hasManyEdgePartial, hasOneEdgePartial } from '@/zustandStore/edgePartials';

export type HasAnyEdgePropsType = ((HasManyEdgePropsType & ({type: typeof hasManyEdgePartial.type})) | (HasOneEdgePropsType & {type: typeof hasOneEdgePartial.type }))

export const HasAnyEdge = memo(({ 
    id, 
    source, 
    target, 
    label, 
    selected,
    data,
    type
  }: HasAnyEdgePropsType) => {
  const showTextOnEdges = useCustomizationStore(store => store.showTextOnEdges)
  const mouseOnEdge = useStore(store => store.mouseOnEdgeId === id )
  
  const nodes = useStore(store => store.nodes)

  const sourceNode: Node | undefined = nodes.find( node => node.id === source)
  const targetNode: Node | undefined = nodes.find( node => node.id === target)

  if (!sourceNode || !targetNode) { return <div></div> }

  const { targetPosition, sourcePosition, ...rest } = getEdgeParams(sourceNode, targetNode);

  const [edgePath, labelX, labelY] = getBezierPath({...rest, sourcePosition, targetPosition})
  
  const endOrient = positionToOrient[targetPosition]
  const startOrient = positionToOrient[sourcePosition]
  
  return (
    <>
      {
        (type === hasManyEdgePartial.type) ? 
          <CrowsFootMarker orient={endOrient} edgeId={`end-${id}`} /> : 
          <CrossMarker orient={endOrient} edgeId={`end-${id}`} />
      }

      {
        ((type === hasOneEdgePartial.type || type === hasManyEdgePartial.type) && data?.optional) ? 
          <CircleLineMarker orient={startOrient} edgeId={`start-${id}`} /> : 
          <StraightLineMarker orient={startOrient} edgeId={`start-${id}`} />
      }
      
      <path
        id={id}
        style={(selected || mouseOnEdge) ? {stroke: "black", strokeWidth: 3, strokeDasharray: 0} : {}}
        className="stroke-first-500 fill-[none] stroke-[2] "
        d={edgePath}
        markerStart={`url(#marker-def-start-${id})`}
        markerEnd={`url(#marker-def-end-${id})`}
      />

      <path
        id={`${id}-wider`}
        className="fill-[none] stroke-[15] stroke-transparent"
        d={edgePath}
      />
      { selected && 
        <foreignObject
          className='h-8 w-16 '
          x={labelX}
          y={labelY + 10 / 2}
        >
          <div className='gap-2 p-1 w-full h-full flex flex-row' >
            <ToggleOptionalButton edgeId={id}/>
            <RemoveEdgeButton edgeId={id}/>
          </div>
        </foreignObject> 
      }

      {
        showTextOnEdges && 
        <ShowEdgeText label={label} centerX={labelX} centerY={labelY} />
      }
      
    </>
  );
})
