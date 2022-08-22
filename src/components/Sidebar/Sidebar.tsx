import useCustomizationStore from '@/zustandStore/customizationStore';
import useStore from '@/zustandStore/store';
import { Settings } from '@/components';

export const Sidebar = () => {

  const { 
    onTableNameChange, 
    addTable, 
    addAttribute, 
    removeAttribute,
    removeTable,
    onAttributeNameChange,
    onAttributeTypeChange,
  } = useStore();

  const {
    widthSidebar,
  } = useCustomizationStore()
  

  const onDragStart = (
    event: React.DragEvent<HTMLDivElement> , 
    nodeType: string,
    tableId: string,
  ) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.setData('tableId', tableId);
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setDragImage(event.target as Element, 0, 0);
  };

  let tables = useStore((state) => state.tables);
  const sidebarVisible = useCustomizationStore(store => store.sidebarVisible)

  return (
    <aside className={`h-full relative py-3 px-2 overflow-y-scroll ${sidebarVisible || 'hidden'}`} style={{width: widthSidebar as number}} >
      
      {
        
        Object.keys(tables).map((tableId: string) => {
          return (
            <div className="my-4 w-full bg-transparent border border-first-500 border-solid rounded-md" key={tableId} onDragStart={(event) => onDragStart(event, 'default', tableId)} draggable>
              <input className="p-2 rounded-md w-full" placeholder='Table name' type="text" value={tables[tableId].name} onChange={(event) => onTableNameChange(event, tableId)} />
              {
                Object.keys(tables[tableId].attributes).map((attributeId) => {
                  return (
                    <div className="flex m-1" key={attributeId} >
                      <button className="btn-first rounded-full aspect-square h-6" title="Remove the attribute" onClick={event => removeAttribute(event, tableId, attributeId)} >-</button>
                      <input className="p-1 w-2/3 rounded-md" placeholder="Attribute" type="text" value={tables[tableId].attributes[attributeId].name} onChange={(event) => onAttributeNameChange(event, tableId, attributeId)} />
                      <select
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

                      </select>
                    </div>
                  )
                })
              }
              <button className="btn-first rounded-full m-1 aspect-square h-6" title="Add an attribute" onClick={event => addAttribute(event, tableId)}>+</button>
              <button className="right-0 absolute -translate-x-1/2 translate-y-1/2 btn-first rounded-full aspect-square h-6" title="Delete the table" onClick={event => removeTable(event, tableId)}>-</button>
            </div>
          )
        })
      }
      <button className="p-1 btn-first rounded-full aspect-square h-10" title="Add a table" onClick={addTable}>+</button>

      <Settings />
      
    </aside>
  );
};
