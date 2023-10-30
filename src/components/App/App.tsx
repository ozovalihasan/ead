import {
  Sidebar, 
  Navbar,
  SidebarHandle,
  MainReactFlow
} from "@/components"
import { useCustomizationStore } from '@/zustandStore/customizationStore';

export const App = () => {
  
  const locationSidebar = useCustomizationStore((state) => state.locationSidebar)
  
  return (

    <div className="text-zinc-600 dark:text-zinc-100 font-default bg-zinc-50 dark:bg-zinc-700 flex flex-col h-screen">
      <Navbar />
      <div  className={`h-[calc(100vh-5rem)] w-screen  flex flex-grow ${locationSidebar === "left" ? "flex-row" : "flex-row-reverse"}`}>
        <Sidebar />
        <SidebarHandle />
        <MainReactFlow />
      </div>
    </div>

  )
}