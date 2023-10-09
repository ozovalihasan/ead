import { DragDirection, useStore } from '@/zustandStore';
import { useCustomizationStore } from '@/zustandStore/customizationStore';
import { MinusSign } from '@/icons';
import { AddTableButton, SidebarOptions, TableAttributes } from '@/components';
import { useState } from 'react';

export const Sidebar = () => {
  const tables = useStore((state) => state.tables);
  const orderedTables = useStore((state) => state.orderedTables);
  const orderedTablesExtended = orderedTables.map((tableId) => ({ tableId, ...tables[tableId] }));

  const onTableNameChange = useStore((store) => store.onTableNameChange);
  const removeTable = useStore((store) => store.removeTable);
  const moveTable = useStore((store) => store.moveTable);

  const widthSidebar = useCustomizationStore((store) => store.widthSidebar);
  const sidebarVisible = useCustomizationStore((store) => store.sidebarVisible);

  const [draggedOverId, setDraggedOverId] = useState<null | string>(null);
  const [draggedId, setDraggedId] = useState<null | string>(null);
  const [draggedTableHeight, setDraggedTableHeight] = useState(0);
  const [sortTableMode, setSortTableMode] = useState(false);
  const [draggedDirection, setDraggedDirection] = useState(DragDirection.upper);

  const isDragged = (tableId: string) => draggedId === tableId;
  const isNotDragged = (tableId: string) => draggedId !== tableId;
  const isDraggedOver = (tableId: string) => draggedOverId === tableId;

  const disableSortTableMode = () => {  
    setDraggedOverId(null);
    setSortTableMode(false);
  }

  const endDragging = () => {  
    setDraggedId(null);
    disableSortTableMode();
  }

  const onDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    nodeType: string,
    tableId: string,
  ) => {
    

    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.setData('tableId', tableId);
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setDragImage(event.target as Element, 0, 0);

    setDraggedTableHeight(event.currentTarget.clientHeight)
    setDraggedId(tableId);
  };

  const onDragOver = (event: React.DragEvent<HTMLDivElement>, tableId: string) => {
    event.preventDefault();
     
    if (draggedId && (draggedId !== tableId)) {
      setSortTableMode(true);
      setDraggedOverId(tableId);
    }

  };

  const onDrop = (event: React.DragEvent<HTMLDivElement>, tableId: string) => {
    const type = event.dataTransfer.getData('application/reactflow');
    const draggedTableId = event.dataTransfer.getData('tableId');

    if (type !== 'default') { return; }
    
    endDragging()

    if (draggedTableId !== tableId) {
      moveTable(draggedTableId, tableId, draggedDirection);
    }
  };

  const DropArea = () =>  (
                            <div style={{height: draggedTableHeight}} className={`drop-area transition-all p-2}`}>
                              <div className="rounded bg-first-400 dark:bg-first-500 h-full w-full"></div>
                            </div>
                          )

  return (
    <aside
      className={`h-full relative py-4 px-2 overflow-y-scroll ${sidebarVisible ? '' : 'hidden'}`}
      style={{ width: widthSidebar }}
    >
      {orderedTablesExtended.map(({ tableId }) => {
        const isCurrentTableDragged = isDragged(tableId);
        const isCurrentTableDraggedOver = isDraggedOver(tableId);
        const isCurrentTableUpperDraggedOver = draggedDirection === DragDirection.upper && isCurrentTableDraggedOver;
        const isCurrentTableLowerDraggedOver = draggedDirection === DragDirection.lower && isCurrentTableDraggedOver;

        return (
          <div
            className={`transition-all py-2 ${sortTableMode && isCurrentTableDragged ? 'hidden' : ''}`}
            onDragStart={(event) => onDragStart(event, 'default', tableId)}
            onDrop={(event) => onDrop(event, tableId)}
            onDragOver={(event) => isNotDragged(tableId) && onDragOver(event, tableId)}
            onDragExit={disableSortTableMode}
            onDragEnd={endDragging}
            key={tableId}
            draggable
          >

            { isCurrentTableUpperDraggedOver && <DropArea /> }

            <div className={`w-full bg-transparent border-2 general-border rounded-md group pb-2 relative`}>
              {
                sortTableMode && 
                  <>
                    <div title='Drag over to locate above' className={`absolute top-0 left-0 w-full h-1/2 z-20`} onDragOver={() => setDraggedDirection(DragDirection.upper)} />
                    <div title='Drag over to locate below' className={`absolute top-1/2 left-0 w-full h-1/2 z-20`} onDragOver={() => setDraggedDirection(DragDirection.lower)} />
                  </>
              }
              <div>
                <div className="flex">
                  <input
                    className="p-2 rounded-tl-md w-1/2 z-10"
                    placeholder="Table name"
                    type="text"
                    value={tables[tableId].name}
                    onChange={(event) => onTableNameChange(event, tableId)}
                    tabIndex={4}
                  />
                  <SidebarOptions tableId={tableId} />
                </div>

                <TableAttributes tableId={tableId} />

                <button
                  className="right-0 absolute -translate-x-full -translate-y-3/4 btn-first rounded-full aspect-square h-6 hidden group-hover:flex"
                  title="Delete the table"
                  onClick={() => removeTable(tableId)}
                >
                  <div className="stroke-[40] w-3 h-3">
                    <MinusSign />
                  </div>
                </button>
              </div>
            </div>

            { isCurrentTableLowerDraggedOver && <DropArea /> }

          </div>
        );
      })}

      <AddTableButton />
    </aside>
  );
};

