import { HasAnyEdge } from "@/components"
import { hasManyEdgePartial } from "@/zustandStore/edgePartials"
import { HasManyEdgeDataType } from "@/zustandStore/store"
import { EdgeProps } from "reactflow"

export type HasManyEdgePropsType = Required<Pick<EdgeProps<HasManyEdgeDataType>, "id" | "source" | "target" | "label" | "selected" | "data" >>

export const HasManyEdge = (props: HasManyEdgePropsType) => (
  <HasAnyEdge type={hasManyEdgePartial.type} {...props} />
)
