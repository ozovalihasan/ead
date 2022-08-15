import { Node } from "react-flow-renderer";

const initialNodes: Node[] = [
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
    "width": 138,
    "height": 45
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
      "width": 138,
      "height": 45,
      "selected": false,
      "positionAbsolute": {
          "x": 585,
          "y": 255
      },
      "dragging": false
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
      "width": 138,
      "height": 45,
      "selected": false,
      "positionAbsolute": {
          "x": 720,
          "y": 150
      },
      "dragging": false
  }
];

export default initialNodes