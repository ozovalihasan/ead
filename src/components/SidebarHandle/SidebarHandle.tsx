import { useCustomizationStore } from '@/zustandStore/customizationStore';

export const SidebarHandle = () => {

  const handleSidebarWidthChange = useCustomizationStore(store => store.handleSidebarWidthChange)
  const toggleSidebarVisibility = useCustomizationStore(store => store.toggleSidebarVisibility)

  return (
    <div
      title="Click to hide/show the sidebar. Drag to change the width of the sidebar."
      onClick={toggleSidebarVisibility}
      className="h-full border-y-0 border general-border hover:cursor-move hover:bg-first-300 w-2 flex flex-col justify-center"
      draggable
      onDragEnd={handleSidebarWidthChange}
    >
      .
      .
      .
    </div>
  )
}
