import { memo, useRef } from 'react';
import useStore from '@/zustandStore/store';

export const TableName =memo( ({ nodeId, tableId }: {nodeId: string, tableId: string}) => {

  const selectEl = useRef<HTMLSelectElement | null>(null);

  const onNodeTableChange = useStore((state) => state.onNodeTableChange);
  const tableName = useStore((state) => state.tables[tableId]?.name);
  
  const tables = useStore((state) => state.tables);
  const options = Object.entries(tables).map(([id, table]) => {return {id: id, name: table.name}});

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement> ) => {
    if (event.button === 1 && selectEl.current){
      selectEl.current.style.display = "block"
      selectEl.current.focus()
    }
  }
  
  const handleMouseLeave = () => {
    if (selectEl.current){
      selectEl.current.style.display = "none"
    }
  }
  return (
    <div className='text-xs flex relative' >
       <div onMouseDown={event => handleMouseDown(event)} onMouseLeave={handleMouseLeave}>
        {tableName}
        <select
          ref={selectEl}
          className="absolute bottom-full left-0 hidden"
          value={tableId}
          onChange={(event) => onNodeTableChange(event, nodeId)}
          size={options.length}
        >
          {options.map(({id, name} ) => (
            <option
              key={id}
              value={id}
            >
              {name}
            </option>
          ))}

        </select>
      </div>
      
     
    </div >
  )
})

  
