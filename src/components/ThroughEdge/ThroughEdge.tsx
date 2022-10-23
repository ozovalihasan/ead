import { EdgeProps, getBezierPath, Node, Position } from 'react-flow-renderer';
import { RemoveEdgeButton } from '@/components';
import { getEdgeParams } from '@/utils';
import useCustomizationStore from '@/zustandStore/customizationStore';
import useStore, { ThroughEdgeDataType } from '@/zustandStore/store';

export type ThroughEdgePropsType = Omit<
  EdgeProps<ThroughEdgeDataType>, "sourcePosition" |"targetPosition" | "sourceX" | "sourceY" | "targetX" | "targetY" | "targetYts"
> 

export const ThroughEdge = ({
  id,
  source,
  target,
  label,
  data,
  selected,
}: ThroughEdgePropsType ) => {
  

  const sourceNode: Node | undefined = useStore(store => store.nodes.find( node => node.id === source))
  const throughNode: Node | undefined = useStore(store => store.nodes.find( node => node.id === data!.throughNodeId))
  const targetNode: Node | undefined = useStore(store => store.nodes.find( node => node.id === target))
  const mouseOnEdge = useStore(store => store.mouseOnEdgeId === id) 
  
  const showTextOnEdges = useCustomizationStore(store => store.showTextOnEdges);
  const darkModeActive = useCustomizationStore(store => store.darkModeActive);

  if (!sourceNode || !throughNode || !targetNode) {
    return <div></div>
  }

  const throughEdgePath = getBezierPath(
    getEdgeParams(sourceNode, throughNode)
  );


  const { targetX, targetY, targetPosition, ...rest } = getEdgeParams(throughNode, targetNode, label === "through", sourceNode);

  const edgePath = getBezierPath({ targetX, targetY, targetPosition, ...rest })
  
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
      
      <path
        id={`${id}-first`}
        style={(selected || mouseOnEdge) ? {stroke: "black", strokeWidth: 3, strokeDasharray: 0} : {}}
        className="stroke-first-500 fill-[none] stroke-[1] custom-animation"
        d={throughEdgePath}
      />

      
      <defs>
        <marker   
          orient={orient}
          id={`through-arrow-${id}` }
          viewBox="0 0 200 200"
          refX="100" 
          refY="0" 
          markerUnits="strokeWidth" 
          markerWidth="10px" 
          markerHeight="10px"
          strokeLinecap="round"
        >
          <path 
            className="stroke-[15] stroke-first-500 fill-transparent"
            style={{strokeLinecap:"round", strokeLinejoin: "round"}} 
            d="M 20,20 100,180 180,20 M 20,20 H 180"
          />
        </marker>
      </defs>
      
      <path
        id={`${id}-second`}
        style={(selected || mouseOnEdge) ? {stroke: "black", strokeWidth: 3, strokeDasharray: 0} : {}}
        className="stroke-first-500 fill-[none] stroke-[1] custom-animation"
        d={edgePath}
        markerEnd={`url(#through-arrow-${id})`}
      />
      
      <path
        id={`${id}-second-wider`}
        className="fill-[none] stroke-[15] stroke-transparent"
        d={edgePath}
      />
      
      { selected && 
        <foreignObject
          className='h-10 w-10'
          x={(targetPosition === Position.Left) ? targetX - 40 : targetX }
          y={(targetPosition === Position.Top) ? targetY - 40 : targetY }
        >
            <RemoveEdgeButton edgeId={id}/>
        </foreignObject> 
      }
      {showTextOnEdges &&
        <text>
          <textPath href={`#${id}-first`} style={{ fontSize: '12px', fill: (darkModeActive ? "#fff" : "#000") }} startOffset="0" >
            {label}
          </textPath>
        </text>
      }
    </>
  );
}