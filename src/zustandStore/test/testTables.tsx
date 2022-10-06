import { TablesType } from "../tables"

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
    "superclassId": "1"
  },
  "3": {
    "name": "Patient",
    "attributes": {
      "12": {
        "name": "name",
        "type": "string"
      }
    },
    "superclassId": "1"
  }
}
    
export default initialTables