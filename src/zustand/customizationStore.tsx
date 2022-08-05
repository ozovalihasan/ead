import create from 'zustand';
import { devtools } from 'zustand/middleware'


type CustomizationStoreState = {
  locationSidebar: string;
  toggleLocationSidebar: () => void;
}

const useCustomizationStore = create(devtools<CustomizationStoreState>((set, get) => ({
  locationSidebar: JSON.parse(localStorage.getItem("locationSidebar")),
  toggleLocationSidebar: () => {
    let location = JSON.parse(localStorage.locationSidebar)
    console.log(location);
    
    if (location === "left"){
      location = "right"
    } else {
      location = "left"
    }
    localStorage.setItem("locationSidebar", JSON.stringify( location) )  
    set({
      locationSidebar: location
    })
  }
})))

export default useCustomizationStore;