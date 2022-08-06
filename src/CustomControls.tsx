import { Controls, ControlButton } from 'react-flow-renderer';
import useCustomizationStore from './zustand/customizationStore';


const CustomControls = () => {
  const {sidebarVisible, toggleSidebarVisibility} = useCustomizationStore()
  
  return (
    <Controls>
      <ControlButton title="Show/Hide sidebar" onClick={toggleSidebarVisibility}>
        {sidebarVisible ? "<" : ">"}
      </ControlButton>
    </Controls>
  )
}

export default CustomControls;