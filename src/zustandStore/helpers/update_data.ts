import { State } from "@/zustandStore/store";
import { TableValueType } from "@/zustandStore/tables";
import { throughEdgePartial } from "../edgePartials";

export const update_data = (data: State) => {

  if ( !(["0.4.5", "0.4.6", "0.4.7"].includes( data.version )) ) {
    Object.values(data.tables).forEach((table: TableValueType) => {
      table.superclassId = ""
    })
  }

  if ( !(["0.4.7"].includes( data.version )) ) {
    
    data.edges = data.edges.map(
      edge => edge.type === throughEdgePartial.type ? edge : {...edge, data: {optional: false}} 
    )
  }
  
  data.version = "0.4.7";
  
  return data;
}

export default update_data;