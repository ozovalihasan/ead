import { useStore } from '@/zustandStore';
import { AddAttributeButton, AttributeTypeOptions, RemoveAttributeButton } from '@/components';
import { memo } from 'react';

export const TableAttributes = memo(({tableId}: {tableId: string}) => {
  const tables = useStore((state) => state.tables);
  
  const onAttributeNameChange = useStore(store => store.onAttributeNameChange)

  if (tables[tableId].superclassId) {
    return <div className="my-6"></div>
  }

  return (
    <div>
      {Object.keys(tables[tableId].attributes).map((attributeId) => (
        <div className="flex items-center space-x-2 py-1 mx-2 my-1" key={attributeId} >
          <RemoveAttributeButton tableId={tableId} attributeId={attributeId}/>

          <div className='flex w-full'>
            <input
              className="p-2 w-2/3 rounded-l-md h-full z-10"
              placeholder="Attribute"
              type="text"
              value={tables[tableId].attributes[attributeId].name}
              onChange={(event) => onAttributeNameChange(event, tableId, attributeId)}
              tabIndex={4}
              title="Name of attribute"
            />
            
            <div className="w-1/3">
              <AttributeTypeOptions tableId={tableId} attributeId={attributeId} />
            </div>
          </div>
          
        </div>
      ))}

      <AddAttributeButton tableId={tableId}/>
    </div>
              
  );
});
