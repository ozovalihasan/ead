import create from 'zustand';
import { devtools } from 'zustand/middleware'


type CustomizationStoreState = {
  locationSidebar: string | null;
  widthSidebar: number | null;
  showTextOnEdges: boolean;
  sidebarVisible: boolean;
  navbarVisible: boolean;
  toggleLocationSidebar: () => void;
  toggleSidebarVisibility: () => void;
  toggleNavbarVisibility: () => void;
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
  sidebarVisible: true,
  navbarVisible: true,
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
  toggleSidebarVisibility:() => {
    set({
      sidebarVisible: !get().sidebarVisible,
    })
  },
  toggleNavbarVisibility:() => {
    set({
      navbarVisible: !get().navbarVisible,
    })
  },
  handleSidebarWidthChange: (e: React.DragEvent<HTMLDivElement>) => {
    const widthSidebar = e.clientX;
    localStorage.setItem("widthSidebar", JSON.stringify(widthSidebar) );
    set({
      widthSidebar: widthSidebar,
      sidebarVisible: true,
    })
  },
  toggleTextMode: () => {
    set({
        showTextOnEdges: !get().showTextOnEdges
    })
  }
})))

export default useCustomizationStore;