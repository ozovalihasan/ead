import useCustomizationStore from '@/zustandStore/customizationStore';
import useStore from '@/zustandStore/store';
import { AttributeTypeOptions } from '@/components';
import { MinusSign, PlusSign } from '@/icons';
import { SidebarOptions } from '@/components';
export const Sidebar = () => {

  const tables = useStore((state) => state.tables);
  const onTableNameChange = useStore(store => store.onTableNameChange)
  const addTable = useStore(store => store.addTable)
  const addAttribute = useStore(store => store.addAttribute)
  const removeAttribute = useStore(store => store.removeAttribute)
  const removeTable = useStore(store => store.removeTable)
  const onAttributeNameChange = useStore(store => store.onAttributeNameChange)

  const widthSidebar = useCustomizationStore(store => store.widthSidebar)
  const sidebarVisible = useCustomizationStore(store => store.sidebarVisible)
  
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

  return (
    <aside 
      className={`h-full relative py-3 px-2 overflow-y-scroll ${sidebarVisible ? "" : 'hidden'}`} 
      style={{width: widthSidebar}} 
    >
      {
        Object.keys(tables).map((tableId: string) => {
          return (
            <div 
              className="my-4 w-full bg-transparent border-2 general-border rounded-md p-1" 
              key={tableId} 
              onDragStart={(event) => onDragStart(event, 'default', tableId)} 
              draggable
            >
              <div className='flex'>
                <input
                  className="p-2 rounded-md w-1/2 m-1"
                  placeholder='Table name'
                  type="text"
                  value={tables[tableId].name}
                  onChange={(event) => onTableNameChange(event, tableId)}
                  tabIndex={4}
                />
                <SidebarOptions tableId={tableId} />
              </div>
              {
                Object.keys(tables[tableId].attributes).map((attributeId) => {
                  return (
                    <div className="flex items-center space-x-2 p-0.5" key={attributeId} >
                      <button 
                        className="btn-first rounded-full aspect-square h-6" 
                        title="Remove the attribute" 
                        onClick={() => removeAttribute(tableId, attributeId)}
                      >
                        <div className="stroke-[40] w-3 h-3">
                          <MinusSign />
                        </div>
                      </button>
                      <input 
                        className="p-2 w-2/3 rounded-md h-full" 
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
                  )

                  
                })
              }
              <button 
                className="btn-first rounded-full m-1 mt-3 aspect-square h-6" 
                title="Add an attribute" 
                onClick={() => addAttribute(tableId)}
              >
                <div className="stroke-[40] w-3 h-3">
                  <PlusSign />
                </div>
              </button>
              <button 
                className="right-0 absolute -translate-x-full -translate-y-1/2 btn-first rounded-full aspect-square h-6 " 
                title="Delete the table" 
                onClick={() => removeTable(tableId)}
              >
                <div className="stroke-[40] w-3 h-3">
                  <MinusSign />
                </div>
              </button>
            </div>
          )
        })
      }
      <button 
        className="p-1 mt-4 btn-first rounded-full aspect-square h-10" 
        title="Add a table" 
        onClick={addTable}
      >
        <div className="stroke-[40] w-5 h-5">
          <PlusSign />
        </div>
      </button>
    </aside>
  );
};
