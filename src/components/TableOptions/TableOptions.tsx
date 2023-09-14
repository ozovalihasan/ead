import useStore from '@/zustandStore/store';

export type TableOptionsType = {nodeId: string, tableId: string};

export const TableOptions = ({nodeId, tableId}: TableOptionsType) => {

  const onNodeTableChange = useStore((state) => state.onNodeTableChange);
  
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onNodeTableChange(event.target.value, nodeId)
  }

  const handleClick = (event: React.MouseEvent<HTMLSelectElement>) => {
    if ((event.target as HTMLElement).tagName === "OPTION" ){
      onNodeTableChange((event.target as HTMLOptionElement).value, nodeId)
    }
  }
  
  const tables = useStore((state) => state.tables);
  const options = Object.entries(tables).map(([id, table]) => {return {id: id, name: table.name}});
  
  return (
    <select
      className="absolute bottom-full left-0  custom-select-options"
      value={tableId}
      onClick={handleClick} 
      onChange={handleChange}
      autoFocus
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
  )
}