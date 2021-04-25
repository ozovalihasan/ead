/* eslint-disable no-console */
/* eslint-disable react/no-this-in-sfc */
import React, { useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import modelData from './modelData';
import Model from './Model';

const AppModel = () => {
  const [data, setData] = useState({ ...modelData });
  const [idCount, setIdCount] = useState(Object.keys(data.items).length);

  const [restrictedDropId, setRestrictedDropId] = useState(-1);

  const idCountIncrease = () => {
    setIdCount((prevIdCount) => prevIdCount + 1);
  };

  const id = 0;
  const handleCheck = (e, id) => {
    const { target } = e;
    if (target.checked) {
      setRestrictedDropId(id);
    } else {
      setRestrictedDropId(-1);
    }
  };
  const handleCheckDirection = (id) => {
    const newData = {
      ...data,

      items: {
        ...data.items,
        [id]: {
          ...data.items[id],
          subdirection: (data.items[id].subdirection === 'column' ? 'row' : 'column'),
          order: (data.items[id].order === 'vertical' ? 'horizontal' : 'vertical'),
        },
      },
    };
    setData(newData);
  };

  const handleChangeEntity = (e, id) => {
    if (!data.items[id].factory) {
      const newData = {
        ...data,

        items: {
          ...data.items,
          [id]: {
            ...data.items[id],
            content: e.target.value,
          },
        },
      };
      setData(newData);
    }
  };

  const onDragStart = (start) => {
    console.warn({ start });
  };

  const onDragEnd = (result) => {
    const {
      destination, draggableId, source,
    } = result;
    console.warn({ result, source });

    if (!destination) {
      if (!(data.items[draggableId].factory)) {
        const newData = data;
        newData.items[source.droppableId].subItemIds.splice(source.index, 1);
        delete newData[draggableId];
        setData(newData);
      }
      return;
    }
    if (source.droppableId === destination.droppableId) {
      return;
    }

    if (data.items[draggableId].association && !data.items[destination.droppableId].entity) {
      return;
    }

    if (data.items[draggableId].entity && data.items[destination.droppableId].entity) {
      return;
    }

    if (data.items[draggableId].factory) {
      const newData = { ...data };
      const newItem = {
        ...newData.items[draggableId],
        subItemIds: [],
        factory: false,
        isDropDisabled: false,
      };
      newData.items[destination.droppableId].subItemIds.splice(
        destination.index, 0, idCount,
      );
      newData.items[idCount] = newItem;
      if (data.items[draggableId].association) {
        const entityId = 7;
        const newSubitem = {
          ...newData.items[entityId],
          subItemIds: [],
          factory: false,
          isDropDisabled: false,
        };
        newItem.subItemIds.push(idCount + 1);
        newData.items[idCount + 1] = newSubitem;
        idCountIncrease();
      }
      idCountIncrease();
      setData(newData);
      return;
    }

    const newData = { ...data };
    newData.items[source.droppableId].subItemIds.splice(source.index, 1);
    newData.items[destination.droppableId].subItemIds.splice(
      destination.index, 0, parseInt(draggableId, 10),
    );
  };

  return (
    <div className="App">
      <DragDropContext
        onDragStart={onDragStart}
        // onDragUpdate={onDragUpdate}
        onDragEnd={onDragEnd}
      >
        <Droppable
          droppableId="OuterDrop"
          direction="vertical"
          isDropDisabled
        >

          { (provided) => (
            <div>

              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
              >

                <Model
                  id={id}
                  item={data.items[id]}
                  allItems={data.items}
                  index={id}
                  restrictedDropId={restrictedDropId}
                  handleCheck={handleCheck}
                  handleCheckDirection={handleCheckDirection}
                  handleChangeEntity={handleChangeEntity}
                />

                {provided.placeholder}
              </div>
            </div>
          )}

        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default AppModel;
