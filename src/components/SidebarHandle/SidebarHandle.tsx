import useCustomizationStore from '@/zustandStore/customizationStore';

export const SidebarHandle = () => {

  const {
    handleSidebarWidthChange,
    toggleSidebarVisibility,
  } = useCustomizationStore()
  
  return (
    <div
      title="Click to hide/show the sidebar. Drag to change the width of the sidebar."
      onClick={toggleSidebarVisibility}
      className="h-full border border-y-0 border-solid border-first-500 hover:cursor-move hover:bg-first-300 w-2 flex flex-col justify-center"
      draggable
      onDragEnd={handleSidebarWidthChange}
    >
      .
      .
      .
    </div>
  )
}
