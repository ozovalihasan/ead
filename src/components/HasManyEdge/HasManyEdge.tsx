import { HasAnyEdge } from "@/components"
import { hasManyEdgePartial, HasManyEdgeDataType } from "@/zustandStore"
import { EdgeProps } from "reactflow"

export type HasManyEdgePropsType = Required<Pick<EdgeProps<HasManyEdgeDataType>, "id" | "source" | "target" | "label" | "selected" | "data" >>

export const HasManyEdge = (props: HasManyEdgePropsType) => (
  <HasAnyEdge type={hasManyEdgePartial.type} {...props} />
)
