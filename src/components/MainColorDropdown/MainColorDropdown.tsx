import useCustomizationStore from '@/zustandStore/customizationStore';
import { memo, useRef } from 'react';
import { availableColors, availableColorsType} from '@/helpers';
export const MainColorDropdown = memo(() => {
  
  const selectedColor = useCustomizationStore(store => store.mainColor)
  const changeMainColor = useCustomizationStore(store => store.changeMainColor)

  const selectEl = useRef<HTMLSelectElement | null>(null);

  const handleMouseUp = () => {
    selectEl.current!.classList.toggle("hidden")
  }
  
  const handleMouseLeave = () => {
    selectEl.current!.classList.add("hidden")
  }
  
  return (
    <div 
      className='w-full relative bg-first-50 rounded-tr-md border border-first-500 whitespace-nowrap  box-border '
      onMouseLeave={handleMouseLeave}
    >
      <div 
        className='truncate p-2 bg-slate-100 rounded-md cursor-pointer capitalize'  
        onMouseUp={handleMouseUp} 
      >
        { selectedColor }
      </div>
      <select
        ref={selectEl}
        className="hidden cursor-pointer absolute left-0 bottom-full z-10 border border-first-500 w-11/12 rounded-md"
        value={selectedColor}
        onChange={(selectedOption) => {
          changeMainColor(selectedOption.target.value as availableColorsType)}
        } 
        title="Select a main color"
        size={availableColors.length }
      >
        {availableColors.map((color: string) => (
          <option
            key={color}
            value={color}
            className="p-2 truncate capitalize"
          >
            {color}
          </option>
        ))}

      </select>
    </div>

  )
})