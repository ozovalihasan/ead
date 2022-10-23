import { EdgeText } from "react-flow-renderer";
import useCustomizationStore, { CustomizationStoreState } from '@/zustandStore/customizationStore';

export interface ShowEdgeTextType {
  centerX: number;
  centerY: number;
  label: string | React.ReactNode;
}

export const ShowEdgeText = ({centerX, centerY, label}: ShowEdgeTextType) => {

  const darkModeActive = useCustomizationStore((store: CustomizationStoreState) => (store.darkModeActive))
  
  return (
    <EdgeText
          x={centerX}
          y={centerY}
          label={label}
          labelStyle={darkModeActive ? { fill: '#fff' } : { fill: '#000' }}
          labelShowBg
          labelBgStyle={{ fill: 'transparent' }}
          labelBgPadding={[2, 4]}
          labelBgBorderRadius={2}
      /> 
  )
}