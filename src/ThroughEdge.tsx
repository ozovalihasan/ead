import { EdgeProps, getBezierPath, Node, Position } from 'react-flow-renderer';
import { getEdgeParams } from './utils';
import useCustomizationStore from './zustand/customizationStore';
import useStore from './zustand/store';

const ThroughEdge = ({
  id,
  source,
  target,
  style = {},
  label,
  data,
  selected,
}: EdgeProps ) => {
  const { removeEdge } = useStore();

  let sx, sy, tx, ty, sourcePos, targetPos = null
  
  const sourceNode = useStore(store => store.nodes.find( node => node.id === source)) as Node
  const throughNode = useStore(store => store.nodes.find( node => node.id === data.throughNodeId)) as Node
  const targetNode = useStore(store => store.nodes.find( node => node.id === target)) as Node
  const mouseOnEdge = useStore(store => store.mouseOnEdgeId ) === id
  
  const showTextOnEdges = useCustomizationStore(store => store.showTextOnEdges)
  
  if (!sourceNode || !throughNode || !targetNode) {
    return <div></div>
  }
  
  ({ sx, sy, tx, ty, sourcePos, targetPos } = getEdgeParams(sourceNode, throughNode))

  const throughEdgePath = getBezierPath({
    sourceX: sx,
    sourceY: sy,
    sourcePosition: sourcePos,
    targetPosition: targetPos,
    targetX: tx,
    targetY: ty,
  });


  ({ sx, sy, tx, ty, sourcePos, targetPos } = getEdgeParams(throughNode, targetNode, label === "through", sourceNode));

  const edgePath = getBezierPath({
    sourceX: sx,
    sourceY: sy,
    sourcePosition: sourcePos,
    targetPosition: targetPos,
    targetX: tx,
    targetY: ty,
  })
  
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
      
      <path
        id={`${id}-first`}
        style={(selected || mouseOnEdge) ? {stroke: "black", strokeWidth: 3, strokeDasharray: 0} : style}
        className="stroke-first-500 fill-[none] stroke-[1] "
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
        >
          <path 
            d="M 200,-0.34918858 100,199.65081 0,-0.34918858 Z"
            className="fill-first-500"  />
        </marker>
      </defs>
      
      <path
        id={`${id}-second`}
        style={(selected || mouseOnEdge) ? {stroke: "black", strokeWidth: 3, strokeDasharray: 0} : style}
        className="stroke-first-500 fill-[none] stroke-[1] "
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
          width={40}
          height={40}
          x={(targetPos === Position.Left) ? tx - 40 : tx }
          y={(targetPos === Position.Top) ? ty - 40 : ty }
        >
            <button className="bg-first-500 rounded-full p-2" onClick={() => removeEdge(id)} >
              ×
            </button>
        </foreignObject> 
      }
      {showTextOnEdges && 
        <text>
          <textPath href={`#${id}-first`} style={{ fontSize: '12px' }} startOffset="0" >
            {label}
          </textPath>
        </text>
      }
    </>
  );
}

export default ThroughEdge;