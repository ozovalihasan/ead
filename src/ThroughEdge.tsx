import { EdgeProps, getBezierPath, Node, Position } from 'react-flow-renderer';
import { getEdgeParams } from './utils';
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
  const showTextOnEdges = useStore(store => store.showTextOnEdges)
  const mouseOnEdge = useStore(store => store.mouseOnEdgeId ) === id
  
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
  
  
  return (
    <>
      
      <path
        id={`${id}-first`}
        
        style={(selected || mouseOnEdge) ? {stroke: "black", strokeWidth: 3, strokeDasharray: 0} : style}
        className="stroke-first-500 fill-[none] stroke-[1] "
        d={throughEdgePath}
      />

      
      <path
        id={`${id}-second`}
        style={(selected || mouseOnEdge) ? {stroke: "black", strokeWidth: 3, strokeDasharray: 0} : style}
        className="stroke-first-500 fill-[none] stroke-[1] "
        d={edgePath}
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