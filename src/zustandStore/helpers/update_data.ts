import { State, throughEdgePartial } from "@/zustandStore";
import { TableValueType } from "@/zustandStore/tables";

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

    data.nodes = data.nodes.map(
      (node) => ({
        ...node, style: {width: node.width, height: node.height}
      })
    ) 

  }
  data.version = "0.4.7";
  
  return data;
}

export default update_data;