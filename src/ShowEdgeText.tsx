import { EdgeText } from "react-flow-renderer";
import useCustomizationStore from "./zustand/customizationStore";

type ShowEdgeTextType = {
  centerX: number;
  centerY: number;
  label: React.ReactNode;
}

const ShowEdgeText = ({centerX, centerY, label}: ShowEdgeTextType) => {
  const showTextOnEdges = useCustomizationStore(store => store.showTextOnEdges)

  if (!showTextOnEdges ){
    return (<></> )
  }
  
  return (
    <EdgeText
          x={centerX}
          y={centerY}
          label={label}
          labelStyle={{ fill: 'black' }}
          labelShowBg
          labelBgStyle={{ fill: 'transparent' }}
          labelBgPadding={[2, 4]}
          labelBgBorderRadius={2}
      /> 
  )
}

export default ShowEdgeText;