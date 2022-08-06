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
  } = useStore();

  const {
    locationSidebar,
    widthSidebar,
    toggleLocationSidebar,
    toggleTextMode,
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
  const showTextOnEdges = useCustomizationStore(store => store.showTextOnEdges)

  return (
    <div className='flex'>
      {/* <button onClick={fitView} ></button> */}
      <aside className='relative py-3 px-2 overflow-y-scroll' style={{width: (locationSidebar === "left" ? widthSidebar : (window.innerWidth - (widthSidebar as number))) as number}} >
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

        
        <details open className='mt-8 [&>summary>span:nth-child(1)]:open:hidden [&>summary>span:nth-child(2)]:open:inline '>
          <summary className='btn-third'>
            <span>Show </span>
            <span className='hidden'>Hide </span> 
            menu
          </summary>
          <div className='mt-8 flex-col flex'>
            <div className='flex mb-5'>
              <input className='mr-6' type="checkbox" onChange={toggleTextMode}/>
              Show Association Names
            </div>
            <div className='flex mb-5'>
              <input className='mr-6 ' type="checkbox" checked={ locationSidebar === "right"} onChange={toggleLocationSidebar}/>
              Show the sidebar at the right of the window
            </div>
            <button
              // className="rounded-md p-3 bg-first-500 border-2 border-first-500 my-1 ml-0 text-first-100"
              className="rounded-md p-3 my-1 ml-0 btn-first"
              onClick={() => saveJSON(useStore.getState(), 'EAD.json')}
              type="button"
              title="Download EAD"
            >
              Download EAD
            </button>
            
            <label className='text-center p-3 rounded-md w-full cursor-pointer btn-second' title="Upload an EAD file">
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
              className="mt-16 rounded-md p-3 my-1 mx-0 btn-second "
              onClick={resetStore}
              type="button"
              title="Reset"
            >
              Reset
            </button>
            

                
          </div>
        </details>
      </aside>
    </div>
  );
};


export default Sidebar;