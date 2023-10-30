import { DragDirection, useStore } from '@/zustandStore';
import { memo, useRef } from 'react';
import { handleMouseLeaveForSelect, handleMouseUpForSelect } from '@/helpers';
import { AlignItems, UpArrow } from '@/icons';

export interface SidebarOptionsType {
  tableId: string
}

export const SidebarOptions = memo(({tableId}: {tableId: string} ) => {

  const tables = useStore((state) => state.tables);
  const selectEl = useRef<HTMLSelectElement | null>(null);
  const changeTableSuperclass = useStore(store => store.changeTableSuperClass)
  const moveTable = useStore(store => store.moveTable)
  
  return (
    <div 
      className='relative w-1/2 whitespace-nowrap'
      onMouseLeave={() => handleMouseLeaveForSelect(selectEl)}
    >
      <div 
        className='truncate p-2 custom-select-button rounded-none rounded-tr-md'
        onMouseUp={() => handleMouseUpForSelect(selectEl)} 
        title="Click to select a superclass to inherit"
      >
        {tables[tableId].superclassId === "" ? "Base" : `< ${tables[(tables[tableId].superclassId)].name}`}
      </div>
      <select
        ref={selectEl}
        className="
          hidden absolute left-0 top-full z-20 w-11/12 custom-select-options
          [&>option]:p-2 [&>option]:truncate
        "
        value={tables[tableId].superclassId}
        onChange={(event) => changeTableSuperclass(event, tableId)}
        title="Select a class to inherit"
        size={Object.keys(tables).length + 1 }
      >
        <option title={"ActiveRecord::Base"} value="" >ActiveRecord::Base</option>

        {Object.keys(tables).map((superTableId: string) => (
          <option
            key={superTableId}
            value={superTableId}
            disabled={superTableId === tableId}
            title={tables[superTableId].name + (superTableId === tableId ? "(Disabled)" : "")}
          >
            {tables[superTableId].name}
          </option>
        ))}

      </select>
      
      { tables[tableId].superclassId && 
          <div className='absolute top-1/2 right-2 -translate-y-1/2 hidden group-hover:block'>
            <button
              type="button"
              title="Locate below the inherited class"
              className=' btn-second rounded-full aspect-square h-6 z-30 appearance-none'
              onClick={() => { moveTable(tableId, tables[tableId].superclassId, DragDirection.lower) }}
            >
              <div className="stroke-[40] w-3 h-3">
                <AlignItems />
              </div>
            </button>
          </div>
      }
      
    </div>
  )
})
