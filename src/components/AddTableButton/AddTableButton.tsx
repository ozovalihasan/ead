import { useStore } from '@/zustandStore';
import { PlusSign } from '@/icons';
import { memo } from 'react';

export const AddTableButton = memo(() => {
  const addTable = useStore(store => store.addTable)
  
  return (
    <button 
      className="p-1 mt-2 btn-first rounded-full aspect-square h-10" 
      title="Add a table" 
      onClick={addTable}
    >
      <div className="stroke-[40] w-5 h-5">
        <PlusSign />
      </div>
    </button>
  );
});
