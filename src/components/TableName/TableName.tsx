import { memo, useState } from 'react';
import useStore from '@/zustandStore/store';
import { TableOptions } from '@/components';

export const TableName =memo( ({ nodeId, tableId }: {nodeId: string, tableId: string}) => {
  const tableName = useStore((state) => state.tables[tableId]?.name);
  
  const [isTableOptionsVisible, setTableOptionsVisible] = useState(false)
  
  const handleMouseUp = (event: React.MouseEvent<HTMLDivElement> ) => {
    event.preventDefault()
    
    setTableOptionsVisible(true)
  }
  
  const handleMouseLeave = () => {
    setTableOptionsVisible(false)
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
      {isTableOptionsVisible && 
        <TableOptions nodeId={nodeId} tableId={tableId}/>
      }
    </div>
  )
})

  
