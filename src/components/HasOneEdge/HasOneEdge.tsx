import { HasAnyEdge } from "@/components"
import { hasOneEdgePartial, HasOneEdgeDataType } from "@/zustandStore"
import { EdgeProps } from "reactflow"

export type HasOneEdgePropsType = Required<Pick<EdgeProps<HasOneEdgeDataType>, "id" | "source" | "target" | "label" | "selected" | "data" >>

export const HasOneEdge = (props: HasOneEdgePropsType) => (
  <HasAnyEdge type={hasOneEdgePartial.type} {...props} />
)
