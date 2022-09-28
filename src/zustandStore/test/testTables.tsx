import { TablesType } from "../tables"

const initialTables: TablesType =  {
  "1": {
    "name": "Physician",
    "attributes": {
        "13": {
            "name": "name",
            "type": "string"
        }
    },
    "superclassId": ""
  },
  "2": {
      "name": "Appointment",
      "attributes": {
          "12": {
              "name": "appointment_date",
              "type": "datetime"
          }
      },
      "superclassId": ""
  },
  "3": {
      "name": "Patient",
      "attributes": {
          "14": {
              "name": "name",
              "type": "string"
          }
      },
      "superclassId": ""
  }
}
    
export default initialTables