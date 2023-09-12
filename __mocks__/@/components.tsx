import React from "react";
import { 
  CustomHandleType, 
  HasAnyEdgePropsType, 
  MarkerBaseType, 
  MarkerType, 
  RemoveEdgeButtonType, 
  ShowEdgeTextType, 
  SidebarOptionsType, 
  ToggleOptionalButtonType
} from "../../src/components"

export const AttributeTypeOptions = () => (
  <>
    MockAttributeTypeOptions
  </>
)

export const SidebarOptions = (props: SidebarOptionsType) => (
  <>
    MockSidebarOptions
    { 
      Object.keys(props)
        .map((key) => `${key}: ${props[key as keyof typeof props]}`) 
    }
  </>
)

export const Sidebar = (
  () => (
    <>
      MockSidebar
    </>
  )
)

export const Navbar = (
  () => (
    <>
      MockNavbar
    </>
  )
)

export const SidebarHandle = (
  () => (
    <>
      MockSidebarHandle
    </>
  )
)

export const MainReactFlow = (
  () => (
    <>
      MockMainReactFlow
    </>
  )
)

export const MarkerBase = ({children, ...rest}: MarkerBaseType ) => (
  <>
    MockMarkerBase
    { Object.keys(rest).map((key) => `${key}: ${rest[key as keyof typeof rest]}`) }
    {children}
  </>
)

export const EADLogo = (
  () => (
    <>
      MockEADLogo
    </>
  )
)

export const GithubLogo = (
  ( ) => (
    <>
      MockGithubLogo
    </>
  )
)

export const Settings = (
  ( ) => (
    <>
      MockSettings
    </>
  )
)

export const CrossMarker = (
  (props: MarkerType ) => (
    <>
      MockCrossMarker
      { Object.keys(props).map((key) => `${key}: ${props[key as keyof typeof props]}`) }
    </>
  )
)

export const CrowsFootMarker = (
  (props: MarkerType ) => (
    <>
      MockCrowsFootMarker
      { Object.keys(props).map((key) => `${key}: ${props[key as keyof typeof props]}`) }
    </>
  )
)

export const CircleLineMarker = (
  (props: MarkerType ) => (
    <>
      MockCircleLineMarker
      { Object.keys(props).map((key) => `${key}: ${props[key as keyof typeof props]}`) }
    </>
  )
)

export const StraightLineMarker = (
  (props: MarkerType ) => (
    <>
      MockStraightLineMarker
      { Object.keys(props).map((key) => `${key}: ${props[key as keyof typeof props]}`) }
    </>
  )
)

export const RemoveEdgeButton = (
  (props: RemoveEdgeButtonType ) => (
    <>
      MockRemoveEdgeButton
      { Object.keys(props).map((key) => `${key}: ${props[key as keyof typeof props]}`) }
    </>
  )
)

export const ToggleOptionalButton = (
  (props: ToggleOptionalButtonType ) => (
    <>
      MockToggleOptionalButton
      { Object.keys(props).map((key) => `${key}: ${props[key as keyof typeof props]}`) }
    </>
  )
)

export const ShowEdgeText = (
  ({label, ...rest}: ShowEdgeTextType ) => ( 
    <>
      MockShowEdgeText
      { Object.keys(rest).map((key) => `${key}: ${rest[key as keyof typeof rest]}`) }
      label: { label }
    </>
  )
)


export const CustomHandle = (props: CustomHandleType) => {
  
  return (
    <>
      MockCustomHandle
      { Object.keys(props).map((key) => `${key}: ${props[key as keyof typeof props]}`) }
    </>
  );
}

export const HasAnyEdge = (
  (
    props: HasAnyEdgePropsType 
  ) => (
    <>
      MockHasAnyEdge
      { Object.keys(props).map((key) => `${key}: ${props[key as keyof typeof props]}`) }
    </>
  )
)

export const MainColorDropdown = () => (
  <div>
    MockMainColorDropdown
  </div>
)

export const HasOneHandle = ({ nodeId }: {nodeId : string}) => (
  <div>
    MockHasOneHandle
    nodeId: {nodeId}
    has_one
  </div>
)

export const HasManyHandle = ({ nodeId }: {nodeId : string}) => (
  <div>
    MockHasManyHandle
    nodeId: {nodeId}
    has_many
  </div>
)

export const ThroughHandle = ({ nodeId }: {nodeId : string}) => (
  <div>
    MockThroughHandle
    nodeId: {nodeId}
    through
  </div>
)

export const TargetHandle =(
  ({ nodeId }: {nodeId: string} ) => (
    <>
      MockTargetHandle
      nodeId: {nodeId}
    </>
  )
)

export const TableName =(
  ({ nodeId, tableId }: {nodeId: string, tableId: string} ) => (
    <>
      MockTableName
      nodeId: {nodeId}
      tableId: {tableId}
    </>
  )
)

export const AllHandlers =(
  ({ nodeId }: {nodeId: string} ) => (
    <>
      MockAllHandlers
      nodeId: {nodeId}
    </>
  )
)

export const SelectThroughNode =(
  ({ nodeId }: {nodeId: string} ) => (
    <>
      MockSelectThroughNode
      nodeId: {nodeId}
    </>
  )
)

    