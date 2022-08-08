import { Controls, ControlButton } from 'react-flow-renderer';
import useCustomizationStore from './zustand/customizationStore';


const CustomControls = () => {
  const {
    sidebarVisible, 
    navbarVisible, 
    toggleSidebarVisibility,
    toggleNavbarVisibility
  } = useCustomizationStore()
  
  return (
    <Controls className=''>
      
    </Controls>
  )
}

export default CustomControls;