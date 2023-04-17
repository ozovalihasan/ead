import { memo, useRef } from 'react';
import useStore from '@/zustandStore/store';
import { handleMouseLeaveForSelect, handleMouseUpForSelect } from '@/helpers';

export const TableName =memo( ({ nodeId, tableId }: {nodeId: string, tableId: string}) => {

  const selectEl = useRef<HTMLSelectElement | null>(null);

  const onNodeTableChange = useStore((state) => state.onNodeTableChange);
  const tableName = useStore((state) => state.tables[tableId]?.name);
  
  const tables = useStore((state) => state.tables);
  const options = Object.entries(tables).map(([id, table]) => {return {id: id, name: table.name}});

  const handleMouseUp = (event: React.MouseEvent<HTMLDivElement> ) => {
    event.preventDefault()
    
    handleMouseUpForSelect(selectEl);
    selectEl.current!.focus();
  }
  
  const handleMouseLeave = () => {
    handleMouseLeaveForSelect(selectEl)
  }

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onNodeTableChange(event.target.value, nodeId)
  }

  const handleClick = (event: React.MouseEvent<HTMLSelectElement>) => {
    if ((event.target as HTMLElement).tagName === "OPTION" ){
      onNodeTableChange((event.target as HTMLOptionElement).value, nodeId)
    }
  }

  return (
    <div 
      className='text-xs flex relative nopan'
      onMouseLeave={handleMouseLeave} 
      title="Right button click to change the table"
    >
      <div onContextMenu={event => handleMouseUp(event)} className="font-bold custom-select-button p-1 rounded-md">
        {tableName}
      </div>
      <select
        ref={selectEl}
        className="absolute bottom-full left-0 hidden custom-select-options"
        value={tableId}
        onClick={handleClick} 
        onChange={handleChange}
        size={options.length}
      >
        {options.map(({id, name} ) => (
          <option
            key={id}
            value={id}
            title={name}
          >
            {name}
          </option>
        ))}

      </select>
    </div>
  )
})

  
