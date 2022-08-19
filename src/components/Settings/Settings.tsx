import useCustomizationStore from '@/zustandStore/customizationStore';

export const Settings = () => {
  
  const {
    locationSidebar,
    showTextOnEdges,
    toggleLocationSidebar,
    toggleTextMode,
  } = useCustomizationStore()
  
  return (
    <details open className='mt-8 [&>summary>span:nth-child(1)]:open:hidden [&>summary>span:nth-child(2)]:open:inline '>
      <summary className='btn-third'>
        <span>Show </span>
        <span className='hidden'>Hide </span> 
        menu
      </summary>
      <div className='mt-8 flex-col flex'>
        <label className='flex mb-5 cursor-pointer'>
          <input className='mr-6 accent-first-600' type="checkbox" checked={ showTextOnEdges === true} onChange={toggleTextMode}/>
          Show Association Names
        </label>
        <label className='flex mb-5 cursor-pointer'>
          <input className='mr-6 ' type="checkbox" checked={ locationSidebar === "right"} onChange={toggleLocationSidebar}/>
          Show the sidebar at the right of the window
        </label>
      </div>
    </details>
  )
}