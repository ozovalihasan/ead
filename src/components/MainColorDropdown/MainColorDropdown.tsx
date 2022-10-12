import useCustomizationStore from '@/zustandStore/customizationStore';
import { memo, useRef } from 'react';
import { availableColors, availableColorsType} from '@/helpers';
import { handleMouseLeaveForSelect, handleMouseUpForSelect } from '@/helpers';

export const MainColorDropdown = memo(() => {
  
  const selectedColor = useCustomizationStore(store => store.mainColor)
  const changeMainColor = useCustomizationStore(store => store.changeMainColor)

  const selectEl = useRef<HTMLSelectElement | null>(null);

  
  return (
    <div 
      className='w-full relative  whitespace-nowrap'
      onMouseLeave={() => handleMouseLeaveForSelect(selectEl)}
    >
      <div 
        className='btn-select truncate p-2 btn-select rounded-md capitalize'  
        onMouseUp={() => handleMouseUpForSelect(selectEl)} 
      >
        Main Color: { selectedColor }
      </div>
      <select
        ref={selectEl}
        className="hidden cursor-pointer absolute left-0 bottom-full z-10 border border-first-500 w-full rounded-md"
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