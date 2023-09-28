import { CustomEdgeType } from "@/zustandStore/store";
import { hasManyEdgePartial, hasOneEdgePartial, throughEdgePartial } from "@/zustandStore/edgePartials";

const initialEdges: CustomEdgeType[] = [
  {
    "id": "7",
    "source": "4",
    "target": "5",
    "sourceHandle": "bottom2",
    "targetHandle": "top",
    "selected": false,
    ...hasManyEdgePartial,
    data: {
      optional: true
    }
  },
  {
    "id": "8",
    "source": "6",
    "target": "5",
    "sourceHandle": "bottom1",
    "targetHandle": "top",
    "selected": false,
    ...hasOneEdgePartial,
    data: {
      optional: false
    }
  },
  {
    "id": "9",
    "source": "4",
    "target": "6",
    "sourceHandle": "bottom3",
    "targetHandle": "top",
    "selected": false,
    ...throughEdgePartial,
    "data": {
        "throughNodeId": "5"
    }
  }  
];

export default initialEdges
