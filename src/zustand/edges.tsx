import { Edge, MarkerType } from "react-flow-renderer";


const initialEdges: Edge[] = [
  {
    "id": "7",
    "source": "4",
    "target": "5",
    "sourceHandle": "bottom2",
    "targetHandle": "top",
    "type": "hasMany",
    "label": "has many"
  },
  {
    "id": "8",
    "source": "6",
    "target": "5",
    "sourceHandle": "bottom1",
    "targetHandle": "top",
    "label": "has one",
    "labelStyle": {
        "fill": "red",
        "fontWeight": 700
    },
    "type": "hasOne"
  },
  {
    "id": "9",
    "source": "4",
    "target": "6",
    "sourceHandle": "bottom3",
    "targetHandle": "top",
    "animated": true,
    "label": "through",
    "type": "through",
    "data": {
        "throughNodeId": "5"
    }
  }  
];

export default initialEdges
