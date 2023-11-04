import { availableColors, availableColorsType, setColorVariants } from '@/helpers';
import create from 'zustand';
import { devtools } from 'zustand/middleware'


export enum LocationSidebar {
  Left = "left",
  Right = "right"
}

export interface CustomizationStoreState {
  locationSidebar: LocationSidebar;
  widthSidebar: number;
  showTextOnEdges: boolean;
  sidebarVisible: boolean;
  navbarVisible: boolean;
  mainColor: availableColorsType;
  darkModeActive: boolean;
  changeMainColor: (color: availableColorsType) => void;
  toggleLocationSidebar: () => void;
  toggleSidebarVisibility: () => void;
  toggleNavbarVisibility: () => void;
  handleSidebarWidthChange: (e: React.DragEvent<HTMLDivElement>) => void;
  toggleTextMode: () => void;
  toggleDarkMode: () => void;
}

export const checkLocalStorage = () => {

  if(!localStorage.locationSidebar){
    const locationSidebar = LocationSidebar.Left
    localStorage.setItem("locationSidebar", JSON.stringify(locationSidebar))
  }

  if(!localStorage.widthSidebar){
    const widthSidebar = Math.floor(window.innerWidth * 0.2)
    localStorage.setItem("widthSidebar", JSON.stringify(widthSidebar))
  }

  if(!localStorage.mainColor){
    localStorage.setItem("mainColor", JSON.stringify(availableColors[0]))
  }

  if(!localStorage.darkModeActive){
    localStorage.setItem("darkModeActive", JSON.stringify(false))
  }else{
    if (JSON.parse(localStorage.darkModeActive as string)){
      const rootElement = document.querySelector("div#root")!
      rootElement.classList.add("dark");
    }
  }
}

checkLocalStorage();

export const useCustomizationStore = create(devtools<CustomizationStoreState>((set, get) => ({
  locationSidebar: JSON.parse(localStorage.locationSidebar as string) as LocationSidebar,
  widthSidebar: JSON.parse(localStorage.widthSidebar as string) as number,
  showTextOnEdges: false,
  sidebarVisible: true,
  navbarVisible: true,
  mainColor: JSON.parse(localStorage.mainColor as string) as availableColorsType,
  darkModeActive: JSON.parse(localStorage.darkModeActive as string) as boolean, 
  changeMainColor: (color: availableColorsType) => {
    setColorVariants(color)

    set({
      mainColor: color,
    })
  },
  toggleLocationSidebar: () => {
    const location = get().locationSidebar === LocationSidebar.Left ? LocationSidebar.Right : LocationSidebar.Left;
  
    localStorage.setItem("locationSidebar", JSON.stringify( location) );

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

    if (get().locationSidebar === LocationSidebar.Left){
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
  },
  toggleDarkMode: () => {
    const rootElement = document.querySelector("div#root")!
    rootElement.classList.toggle("dark");

    localStorage.setItem("darkModeActive", JSON.stringify(!get().darkModeActive))

    set({
      darkModeActive: !get().darkModeActive
    })
  }
})));