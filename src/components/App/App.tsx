import useCustomizationStore from '@/zustandStore/customizationStore';

import {
  Sidebar, 
  Navbar,
  SidebarHandle,
  MainReactFlow
} from "@/components"

export const App = () => {
  
  const {
    locationSidebar,
  } = useCustomizationStore()
  
  return (

    <div className="text-first-500 font-default  bg-first-50 flex flex-col h-screen">
      <Navbar />
      <div  className={`h-[calc(100vh-5rem)] w-screen  flex flex-grow ${locationSidebar == "left" ? "flex-row" : "flex-row-reverse"}`}>
        <Sidebar />
        <SidebarHandle />
        <MainReactFlow />
      </div>
    </div>

  )
}