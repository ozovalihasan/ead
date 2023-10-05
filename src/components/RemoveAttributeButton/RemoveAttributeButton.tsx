import { useStore } from '@/zustandStore';
import { MinusSign } from '@/icons';
import { memo } from 'react';

export const RemoveAttributeButton = memo(({tableId, attributeId}: {tableId: string, attributeId: string}) => {
  const removeAttribute = useStore(store => store.removeAttribute)
  
  return (
    <button
      className="btn-second rounded-full aspect-square h-6"
      title="Remove the attribute"
      onClick={() => removeAttribute(tableId, attributeId)}
    >
      <div className="stroke-[40] w-3 h-3">
        <MinusSign />
      </div>
    </button>
  );
});
