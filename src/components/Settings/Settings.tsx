import useCustomizationStore from '@/zustandStore/customizationStore';
import { memo, useState } from 'react';
import { MainColorDropdown } from '@/components';
export const Settings = memo(() => {
  
  const locationSidebar = useCustomizationStore(store => store.locationSidebar)
  const showTextOnEdges = useCustomizationStore(store => store.showTextOnEdges)
  const toggleLocationSidebar = useCustomizationStore(store => store.toggleLocationSidebar)
  const toggleTextMode = useCustomizationStore(store => store.toggleTextMode)
  const toggleDarkMode = useCustomizationStore(store => store.toggleDarkMode)
  const [isOpen, setIsOpen] = useState(false)

  return (

    <div className='relative'>
      <button className='btn-third' onClick={() => setIsOpen(!isOpen)} >
        Settings
      </button>
      { isOpen && (
        <div
          className='absolute right-0 top-0 flex-col flex bg-zinc-50 dark:bg-zinc-700 border border-solid general-border p-2 z-50 rounded-md '
          onMouseLeave={() => setIsOpen(false)}
        >
          <div className='text-center my-4'>Settings</div>
          <label className='flex mb-5 cursor-pointer'>
            <input className='mr-6 bg-first-100' type="checkbox" checked={ showTextOnEdges} onChange={toggleTextMode}/>
            Show Association Names
          </label>
          <label className='flex mb-5 cursor-pointer'>
            <input className='mr-6' type="checkbox" checked={ locationSidebar === "right"} onChange={toggleLocationSidebar}/>
            Show the sidebar at the right of the window
          </label>
          <button className="btn-second rounded-md my-2 p-2 w-full" onClick={toggleDarkMode}>
            Dark Mode
          </button>
          <MainColorDropdown />
        </div>
      ) }
    </div>
  )
})