import { EntityNodeType, entityNodePartial } from "@/zustandStore";

const initialNodes: EntityNodeType[] = [
  {
    "id": "4",
    ...entityNodePartial,
    "position": {
        "x": 465,
        "y": 150
    },
    "data": {
        "tableId": "1",
        "name": "Physician"
    },
  },
  {
    "id": "5",
    ...entityNodePartial,
    "position": {
        "x": 585,
        "y": 255
    },
    "data": {
        "tableId": "2",
        "name": "Appointment"
    },
  },
  {
    "id": "6",
    ...entityNodePartial,
    "position": {
        "x": 720,
        "y": 150
    },
    "data": {
        "tableId": "3",
        "name": "Patient"
    },
  }
];

export default initialNodes