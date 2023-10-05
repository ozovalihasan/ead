import { useStore } from '@/zustandStore';
import { useCustomizationStore } from '@/zustandStore/customizationStore';

import { MinusSign } from '@/icons';
import { AddTableButton, SidebarOptions, TableAttributes } from '@/components';

export const Sidebar = () => {

  const tables = useStore((state) => state.tables);
  const onTableNameChange = useStore(store => store.onTableNameChange)
  const removeTable = useStore(store => store.removeTable)

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
              className="my-4 w-full bg-transparent border-2 general-border rounded-md" 
              key={tableId} 
              onDragStart={(event) => onDragStart(event, 'default', tableId)} 
              draggable
            >
              <div className='flex'>
                <input
                  className="p-2 rounded-tl-md w-1/2 z-10"
                  placeholder='Table name'
                  type="text"
                  value={tables[tableId].name}
                  onChange={(event) => onTableNameChange(event, tableId)}
                  tabIndex={4}
                />
                <SidebarOptions tableId={tableId} />
              </div>
              
              <TableAttributes tableId={tableId} />

              <button 
                className="right-0 absolute -translate-x-full -translate-y-3/4 btn-first rounded-full aspect-square h-6 " 
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
      
      <AddTableButton />
      
    </aside>
  );
};
