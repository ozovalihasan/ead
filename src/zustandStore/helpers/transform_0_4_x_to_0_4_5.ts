import { State } from "@/zustandStore/store";
import { TableValueType } from "@/zustandStore/tables";

export const transform_0_4_x_to_0_4_5 = (data: State) => {
  if (data.version == "0.4.5") {return data}
  
  data.version = "0.4.5";
  
  Object.values(data.tables).forEach((table: TableValueType) => {
    table.superclassId = ""
  })
  
  return data
}

export default transform_0_4_x_to_0_4_5;