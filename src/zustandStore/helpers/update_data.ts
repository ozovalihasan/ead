import { State } from "@/zustandStore/store";
import { TableValueType } from "@/zustandStore/tables";

export const update_data = (data: State) => {

  if ( !(["0.4.5", "0.4.6"].includes( data.version )) ) {
    Object.values(data.tables).forEach((table: TableValueType) => {
      table.superclassId = ""
    })
  }
  
  data.version = "0.4.6";
  
  return data
}

export default update_data;