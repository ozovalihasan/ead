import { EdgeText } from "react-flow-renderer";

export interface ShowEdgeTextType {
  centerX: number;
  centerY: number;
  label: string | React.ReactNode;
}

export const ShowEdgeText = ({centerX, centerY, label}: ShowEdgeTextType) => {

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