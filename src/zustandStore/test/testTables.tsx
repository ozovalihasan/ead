export type AttributesType = Record<string, {
    name: string;
    type: string;
  }>;

export type TablesType = Record<string, {
    name: string;
    attributes: AttributesType
    
  }>;

const initialTables: TablesType =  {
  "1": {
      "name": "Physician",
      "attributes": {
          "13": {
              "name": "name",
              "type": "string"
          }
      }
  },
  "2": {
      "name": "Appointment",
      "attributes": {
          "12": {
              "name": "appointment_date",
              "type": "datetime"
          }
      }
  },
  "3": {
      "name": "Patient",
      "attributes": {
          "14": {
              "name": "name",
              "type": "string"
          }
      }
  }
}
    
export default initialTables