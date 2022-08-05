import React from 'react';
import saveJSON from './components/saveJSON';
import useCustomizationStore from './zustand/customizationStore';
import useStore from './zustand/store';

const Sidebar = () => {

  const { onChangeAssociationType, 
    onTableNameChange, 
    addTable, 
    addAttribute, 
    removeAttribute,
    removeTable,
    onAttributeNameChange,
    onAttributeTypeChange,
    resetStore,
    uploadStore,
    toggleTextMode,
  } = useStore();

  const {
    locationSidebar,
    toggleLocationSidebar,
  } = useCustomizationStore()
  

  const onDragStart = (
    event: React.DragEvent<HTMLDivElement> , 
    nodeType: string,
    tableId: string,
  ) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.setData('tableId', tableId);
    event.dataTransfer.effectAllowed = 'move';
  };

  let tables = useStore((state) => state.tables);
  const showTextOnEdges = useStore(store => store.showTextOnEdges)

  return (
    <aside className='relative border-x-2 border-solid py-3 px-2  w-1/5 overflow-y-scroll resize-x' >
      {
        
        Object.keys(tables).map((tableId: string) => {
          return (
            <div className="my-4 w-full bg-transparent border border-first-900 border-solid rounded-md" key={tableId} onDragStart={(event) => onDragStart(event, 'default', tableId)} draggable>
              <input className="p-2 rounded-md w-full" placeholder='Table name' type="text" value={tables[tableId].name} onChange={(event) => onTableNameChange(event, tableId)} />
              {
                Object.keys(tables[tableId].attributes).map((attributeId) => {
                  return (
                    <div className="flex m-1" key={attributeId} >
                      <button className="p-1 bg-first-500 text-first-50 rounded-full aspect-square h-6" onClick={event => removeAttribute(event, tableId, attributeId)} >-</button>
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
              <button className="p-1 bg-first-500 text-first-50 rounded-full m-1 aspect-square h-6" onClick={event => addAttribute(event, tableId)}>+</button>
              <button className="right-0 absolute -translate-x-1/2 translate-y-1/2 p-1 bg-first-500 text-first-50 rounded-full aspect-square h-6" onClick={event => removeTable(event, tableId)}>-</button>
            </div>
          )
        })
      }
      <button className="p-1 bg-first-500 text-first-50 rounded-full aspect-square h-10" onClick={addTable}>+</button>

      
      <details open className='mt-8 [&>summary>span:nth-child(1)]:open:hidden [&>summary>span:nth-child(2)]:open:inline '>
        <summary>
          <span>Show </span>
          <span className='hidden'>Hide </span> 
          menu
        </summary>
        <div className='mt-8 flex-col flex'>
          <div className='flex mb-5'>
            Show Association Names
            <input className='ml-6' type="checkbox" onChange={toggleTextMode}/>
          </div>
          <div className='flex mb-5'>
            Show the sidebar at the right of the window
            <input className='ml-6' type="checkbox" checked={ locationSidebar === "right"} onChange={toggleLocationSidebar}/>
          </div>
          <button
            className="rounded-md p-3 bg-first-500 border-2 border-first-500 my-1 ml-0 text-first-100"
            onClick={() => saveJSON(useStore.getState(), 'EAD.json')}
            type="button"
            title="Download EAD"
          >
            Download EAD
          </button>
          
          <label className='text-center p-3 rounded-md border-2 border-solid border-first-500 w-full cursor-pointer'>
            Upload EAD
            <input
              className='hidden'
              onChange={uploadStore}
              type="file"
              accept=".json"
              data-testid="uploadInput"
              title="Select an uploaded EAD"
            />
          </label>
          
          <button
            className="mt-16 rounded-md p-3 border-2 border-first-500 my-1 mx-0 "
            onClick={resetStore}
            type="button"
            title="Reset"
          >
            Reset
          </button>
          

              
        </div>
      </details>
    </aside>
  );
};


export default Sidebar;