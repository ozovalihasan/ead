import { memo } from 'react';
import useStore from '@/zustandStore/store';


export const AttributeTypeOptions = memo(({tableId, attributeId}: {tableId: string, attributeId: string} ) =>  {
  
  let tables = useStore((state) => state.tables);
  let onAttributeTypeChange = useStore((state) => state.onAttributeTypeChange);

  
  return <select
    className="w-1/3"
    value={tables[tableId].attributes[attributeId].type}
    onChange={(event) => onAttributeTypeChange(event, tableId, attributeId)}
  >
    {['primary_key', 'string', 'text', 'integer', 'float', 'decimal', 'datetime', 'timestamp',
      'time', 'date', 'binary', 'boolean', 'references'].map((item) => (
        <option
          key={item}
          value={item}
        >
          {item}
        </option>
      ))}

  </select>;
})
