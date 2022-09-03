import { EntityNodeType } from "@/components"

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
  }
];

export default initialNodes