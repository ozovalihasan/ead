import { useStore } from '@/zustandStore';
import { PlusSign } from '@/icons';
import { memo } from 'react';

export const AddAttributeButton = memo(({tableId}: {tableId: string}) => {
  const addAttribute = useStore(store => store.addAttribute)
  
  return (
    <button
      className="btn-second rounded-full mx-2 mb-1 mt-3 aspect-square h-6"
      title="Add an attribute"
      onClick={() => addAttribute(tableId)}
    >
    <div className="stroke-[40] w-3 h-3">
      <PlusSign />
    </div>
  </button>
  );
});
