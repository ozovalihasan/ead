import create from 'zustand';
import { devtools } from 'zustand/middleware'


type CustomizationStoreState = {
  locationSidebar: string | null;
  widthSidebar: number | null;
  showTextOnEdges: boolean;
  toggleLocationSidebar: () => void;
  handleSidebarWidthChange: (e: React.DragEvent<HTMLDivElement>) => void;
  toggleTextMode: () => void;
}

if(!localStorage.locationSidebar){
  let locationSidebar = "left"
  localStorage.setItem("locationSidebar", JSON.stringify(locationSidebar))
}

if(!localStorage.widthSidebar){
  let widthSidebar = Math.floor(window.innerWidth * 0.2)
  localStorage.setItem("widthSidebar", JSON.stringify(widthSidebar))
}

const useCustomizationStore = create(devtools<CustomizationStoreState>((set, get) => ({
  locationSidebar: JSON.parse(localStorage.locationSidebar),
  widthSidebar: JSON.parse(localStorage.widthSidebar),
  showTextOnEdges: false,
  toggleLocationSidebar: () => {
    let location = JSON.parse(localStorage.locationSidebar)
    
    if (location === "left"){
      location = "right"
    } else {
      location = "left"
    }
    localStorage.setItem("locationSidebar", JSON.stringify( location) )  

    let widthSidebar = window.innerWidth - (get().widthSidebar as number); 
    localStorage.setItem("widthSidebar", JSON.stringify( widthSidebar) )  

    set({
      locationSidebar: location,
      widthSidebar: widthSidebar
    })
  },
  handleSidebarWidthChange: (e: React.DragEvent<HTMLDivElement>) => {
    const widthSidebar = e.clientX;
    localStorage.setItem("widthSidebar", JSON.stringify(widthSidebar) );
    set({
      widthSidebar: widthSidebar
    })
  },
  toggleTextMode: () => {
    set({
        showTextOnEdges: !get().showTextOnEdges
    })
  }
})))

export default useCustomizationStore;