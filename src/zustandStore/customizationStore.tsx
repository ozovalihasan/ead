import create from 'zustand';
import { devtools } from 'zustand/middleware'


interface CustomizationStoreState {
  locationSidebar: "left" | "right";
  widthSidebar: number;
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
  const locationSidebar = "left"
  localStorage.setItem("locationSidebar", JSON.stringify(locationSidebar))
}

if(!localStorage.widthSidebar){
  const widthSidebar = Math.floor(window.innerWidth * 0.2)
  localStorage.setItem("widthSidebar", JSON.stringify(widthSidebar))
}

const useCustomizationStore = create(devtools<CustomizationStoreState>((set, get) => ({
  locationSidebar: JSON.parse(localStorage.locationSidebar as string) as ("left" | "right"),
  widthSidebar: JSON.parse(localStorage.widthSidebar as string) as number,
  showTextOnEdges: false,
  sidebarVisible: true,
  navbarVisible: true,
  toggleLocationSidebar: () => {
    let location = get().locationSidebar
    
    if (location === "left"){
      location = "right"
    } else {
      location = "left"
    }

    localStorage.setItem("locationSidebar", JSON.stringify( location) )  

    set({
      locationSidebar: location,
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
    let widthSidebar

    if (get().locationSidebar == "left"){
      widthSidebar = e.clientX; 
    } else {
      widthSidebar = window.innerWidth - e.clientX; 
    }

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