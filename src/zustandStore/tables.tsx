import { TablesType } from "./store"

const initialTables: TablesType =  {
  "1": {
    "name": "Physician",
    "attributes": {
      "10": {
        "name": "name",
        "type": "string"
      }
    },
    "superclassId": ""
  },
  "2": {
    "name": "Appointment",
    "attributes": {
      "11": {
        "name": "appointment_date",
        "type": "datetime"
      }
    },
    "superclassId": ""
  },
  "3": {
    "name": "Patient",
    "attributes": {
      "12": {
        "name": "name",
        "type": "string"
      }
    },
    "superclassId": ""
  }
}
    
export default initialTables