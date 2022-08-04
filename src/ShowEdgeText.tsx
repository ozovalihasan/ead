import { EdgeText } from "react-flow-renderer";
import useStore from "./zustand/store";

type ShowEdgeTextType = {
  centerX: number;
  centerY: number;
  label: React.ReactNode;
}

const ShowEdgeText = ({centerX, centerY, label}: ShowEdgeTextType) => {
  const showTextOnEdges = useStore(store => store.showTextOnEdges)

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