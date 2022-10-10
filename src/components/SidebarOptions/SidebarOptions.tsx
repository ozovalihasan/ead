import useStore from '@/zustandStore/store';
import { useRef } from 'react';

export interface SidebarOptionsType {
  tableId: string
}

export const SidebarOptions = ({tableId}: {tableId: string} ) => {

  const tables = useStore((state) => state.tables);
  const selectEl = useRef<HTMLSelectElement | null>(null);
  const changeTableSuperclass = useStore(store => store.changeTableSuperClass)

  const handleMouseDown = () => {
    selectEl.current!.classList.toggle("hidden")
  }
  
  const handleMouseLeave = () => {
    selectEl.current!.classList.add("hidden")
  }
  
  return (
    <div 
      className='relative w-1/2 bg-first-50 rounded-tr-md border border-first-500 whitespace-nowrap  box-border '
      onMouseLeave={handleMouseLeave}
    >
      <div 
        className='truncate p-2 bg-slate-100 rounded-md cursor-pointer'  
        onMouseDown={handleMouseDown} 
      >
        {tables[tableId].superclassId === "" ? "Base" : `< ${tables[(tables[tableId].superclassId)].name}`}
      </div>
      <select
        ref={selectEl}
        className="hidden cursor-pointer absolute left-0 top-full z-10 border border-first-500 w-11/12 rounded-md"
        value={tables[tableId].superclassId}
        onChange={(event) => changeTableSuperclass(event, tableId)}
        tabIndex={4}
        title="Select a superclass to inherit. If it is empty, it inherits from ActiveRecord::Base"
        size={Object.keys(tables).length + 1 }
      >
        <option value="" className='p-2 truncate'>{"ActiveRecord::Base"}</option>

        {Object.keys(tables).map((superTableId: string) => (
          <option
            key={superTableId}
            value={superTableId}
            disabled={superTableId == tableId}
            className="p-2 truncate"
          >
            {tables[superTableId].name}
          </option>
        ))}

      </select>
    </div>
  )
}
