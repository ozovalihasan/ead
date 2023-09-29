

import { handleMouseLeaveForSelect, handleMouseUpForSelect } from '@/helpers';
import { useStore } from '@/zustandStore';
import { memo, useRef } from 'react';

export const AttributeTypeOptions = memo(({tableId, attributeId}: {tableId: string, attributeId: string} ) =>  {

  const type = useStore((state) => state.tables[tableId].attributes[attributeId].type);
  const onAttributeTypeChange = useStore((state) => state.onAttributeTypeChange);
  const options = [
    'primary_key', 'string', 'text', 'integer', 'float', 'decimal', 'datetime',
    'time', 'date', 'binary', 'boolean'
  ]

  const selectEl = useRef<HTMLSelectElement | null>(null);

  return (
    <div 
      className='relative whitespace-nowrap w-full'
      onMouseLeave={() => handleMouseLeaveForSelect(selectEl)}
    >
      <div 
        className='truncate p-2 rounded-l-none  custom-select-button '   
        onMouseUp={() => handleMouseUpForSelect(selectEl)} 
        title={type}
      >
        {type}
      </div>
      <select
        ref={selectEl}
        className="hidden absolute right-0 top-full z-20 min-w-full custom-select-options"
        value={type}
        onChange={(event) => onAttributeTypeChange(event, tableId, attributeId)}
        title="Select attribute type"
        size={options.length}
      >

      {
        options.map((item) => (
          <option
            className="p-2 w-full"
            key={item}
            value={item}
            title={item}
          >
            {item}
          </option>
        ))
      }
      </select>
    </div>
  )
})
