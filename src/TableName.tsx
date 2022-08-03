import { memo } from 'react';
import useStore from './zustand/store';

const TableName =memo( ({ tableId }: {tableId: string}) => {

  const name = useStore((state) => state.tables[tableId]?.name);
  return (
    <div className='text-xs'>
      {name}      
    </div >
  )
})

export default TableName;