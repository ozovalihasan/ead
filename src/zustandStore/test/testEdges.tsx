import { CustomEdgeType,  } from "@/zustandStore/store";
import { hasManyEdgePartial, hasOneEdgePartial, throughEdgePartial } from "@/zustandStore/edgePartials";

const initialEdges: CustomEdgeType[] = [
  {
    "id": "7",
    "source": "4",
    "target": "5",
    "sourceHandle": "bottom2",
    "targetHandle": "top",
    ...hasManyEdgePartial,
    "data": {
      "optional": false
    }
  },
  {
    "id": "8",
    "source": "6",
    "target": "5",
    "sourceHandle": "bottom1",
    "targetHandle": "top",
    ...hasOneEdgePartial,
    "data": {
      "optional": false
    }
  },
  {
    "id": "9",
    "source": "4",
    "target": "6",
    "sourceHandle": "bottom3",
    "targetHandle": "top",
    ...throughEdgePartial,
    "data": {
        "throughNodeId": "5"
    }
  }  
];

export default initialEdges
