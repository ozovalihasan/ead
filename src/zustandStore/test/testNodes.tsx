import { EntityNodeType } from "@/zustandStore"

const initialNodes: EntityNodeType[] = [
  {
    "id": "4",
    "type": "entity",
    "position": {
        "x": 465,
        "y": 150
    },
    "data": {
        "tableId": "1",
        "name": "Physician"
    },
    "width": 136,
    "height": 71,
  },
  {
    "id": "5",
    "type": "entity",
    "position": {
        "x": 585,
        "y": 255
    },
    "data": {
        "tableId": "2",
        "name": "Appointment"
    },
    "width": 136,
    "height": 71,
  },
  {
    "id": "6",
    "type": "entity",
    "position": {
        "x": 720,
        "y": 150
    },
    "data": {
        "tableId": "3",
        "name": "Patient"
    },
    "width": 136,
    "height": 71,
  }
];

export default initialNodes