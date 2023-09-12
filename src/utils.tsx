import { Position, Node } from 'reactflow';

interface NodeIntersectionType {
  x: number,
  y: number
}
// this helper function returns the intersection point
// of the line between the center of the intersectionNode and the target node
function getNodeIntersection(intersectionNode: Node, targetNode: Node, isThrough = false ) {
  // https://math.stackexchange.com/questions/1724792/an-algorithm-for-finding-the-intersection-point-between-a-center-of-vision-and-a
  const {
    width: intersectionNodeWidth,
    height: intersectionNodeHeight,
    position: intersectionNodePosition,
  } = intersectionNode;
  const targetPosition = targetNode.position;

  const w = (intersectionNodeWidth!) / 2;
  const h = (intersectionNodeHeight!) / 2;

  const x2 = intersectionNodePosition.x + w;
  const y2 = intersectionNodePosition.y + h;
  const x1 = targetPosition.x + w;
  const y1 = targetPosition.y + h;

  const xx1 = (x1 - x2) / (2 * w) - (y1 - y2) / (2 * h) + (isThrough ? 1 : 0);
  const yy1 = (x1 - x2) / (2 * w) + (y1 - y2) / (2 * h) + (isThrough ? 1 : 0);
  const a = 1 / (Math.abs(xx1) + Math.abs(yy1));
  const xx3 = a * xx1;
  const yy3 = a * yy1;
  const x = w * (xx3 + yy3) + x2;
  const y = h * (-xx3 + yy3) + y2;

  return { x, y };
}

// returns the position (top,right,bottom or right) passed node compared to the intersection point
function getEdgePosition(node: Node, intersectionPoint: NodeIntersectionType) {
  const n = { ...node.position, ...node };
  const nx = Math.round(n.x);
  const ny = Math.round(n.y);
  const px = Math.round(intersectionPoint.x);
  const py = Math.round(intersectionPoint.y);

  if (px <= nx + 1) {
    return Position.Left;
  }
  if (px >= nx + (n.width!) - 1) {
    return Position.Right;
  }
  if (py <= ny + 1) {
    return Position.Top;
  }
  if (py >= n.y + (n.height!) - 1) {
    return Position.Bottom;
  }

  return Position.Top;
}

// returns the parameters (sx, sy, tx, ty, sourcePos, targetPos) you need to create an edge
export function getEdgeParams(source: Node, target: Node, isThrough = false, sourceBeginningNode: null | Node = null) {

  let sourceIntersectionPoint = null
  const targetIntersectionPoint = getNodeIntersection(target, source, isThrough);

  if (isThrough && sourceBeginningNode){
    sourceIntersectionPoint = getNodeIntersection(source, sourceBeginningNode);
  } else {
    sourceIntersectionPoint = getNodeIntersection(source, target);
  }
  
  const sourcePos = getEdgePosition(source, sourceIntersectionPoint);
  const targetPos = getEdgePosition(target, targetIntersectionPoint);

   
  if ( sourcePos === Position.Bottom ){
    sourceIntersectionPoint.y += 10 
  } else if ( sourcePos === Position.Top ) {
    sourceIntersectionPoint.y -= 10 
  } else if ( sourcePos === Position.Left ){
    sourceIntersectionPoint.x -= 10 
  } else if ( sourcePos === Position.Right ) {
    sourceIntersectionPoint.x += 10 
  }
  
  if ( targetPos === Position.Bottom ){
    targetIntersectionPoint.y += 10 
  } else if ( targetPos === Position.Top ) {
    targetIntersectionPoint.y -= 10 
  } else if ( targetPos === Position.Left ){
    targetIntersectionPoint.x -= 10 
  } else if ( targetPos === Position.Right ) {
    targetIntersectionPoint.x += 10 
  }

  return {
    sourceX: sourceIntersectionPoint.x,
    sourceY: sourceIntersectionPoint.y,
    targetX: targetIntersectionPoint.x,
    targetY: targetIntersectionPoint.y,
    sourcePosition: sourcePos,
    targetPosition: targetPos,
  };
}

export const positionToOrient = {
  [Position.Bottom]: "180deg",
  [Position.Left]: "-90deg",
  [Position.Right]: "90deg",
  [Position.Top]: "0deg",
};