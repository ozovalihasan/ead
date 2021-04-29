/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
/* eslint-disable react/no-this-in-sfc */
import React, { useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import Model from './Model';
import {
  changeType,
  changeContent,
  checkDirection,
  removeItem,
  addItem,
  moveItem,
} from './redux';

const AppModel = () => {
  const items = useSelector((state) => state.block.items);
  const data = { items };

  // const [data, setData] = useState({ ...modelData });
  const [idCount, setIdCount] = useState(Object.keys(data.items).length);

  const [restrictedDropId, setRestrictedDropId] = useState(-1);

  const idCountIncrease = () => {
    setIdCount((prevIdCount) => prevIdCount + 1);
  };

  const startingId = 0;
  const dispatch = useDispatch();

  const handleCheck = (e, id) => {
    const { target } = e;
    if (target.checked) {
      setRestrictedDropId(id);
    } else {
      setRestrictedDropId(-1);
    }
  };
  const handleCheckDirection = (id) => {
    const subdirection = (data.items[id].subdirection === 'column' ? 'row' : 'column');
    const order = (data.items[id].order === 'vertical' ? 'horizontal' : 'vertical');
    dispatch(checkDirection(id, subdirection, order));
  };

  const handleChangeContent = (e, id) => {
    if (!data.items[id].factory) {
      dispatch(changeContent(e, id));
    }
  };

  const handleChangeType = (e, id) => {
    dispatch(changeType(e, id));
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
        dispatch(removeItem(source.droppableId, source.index, draggableId));
      }
      return;
    }

    if (data.items[draggableId].association && !data.items[destination.droppableId].entity) {
      return;
    }

    if (data.items[draggableId].entity && data.items[destination.droppableId].entity) {
      return;
    }

    if (data.items[draggableId].factory) {
      dispatch(addItem(draggableId, destination.droppableId, destination.index, idCount));
      if (data.items[draggableId].association) {
        const entityId = 7;
        dispatch(addItem(entityId, idCount, destination.index, idCount + 1));
        idCountIncrease();
      }
      idCountIncrease();
      return;
    }
    dispatch(moveItem(
      draggableId,
      destination.droppableId,
      destination.index,
      source.droppableId,
      source.index,
    ));
  };

  function saveJSON(data, filename) {
    if (!data) {
      console.error('No data');
      return;
    }

    if (!filename) { filename = 'console.json'; }

    if (typeof data === 'object') {
      data = JSON.stringify(data, undefined, 4);
    }

    const blob = new Blob([data], { type: 'text/json' });
    const e = document.createEvent('MouseEvents');
    const a = document.createElement('a');

    a.download = filename;
    a.href = window.URL.createObjectURL(blob);
    a.dataset.downloadurl = ['text/json', a.download, a.href].join(':');
    e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    a.dispatchEvent(e);
  }

  return (
    <div className="App">
      <button
        onClick={() => saveJSON(data.items, 'test.json')}
        type="button"
      >
        Download Json
      </button>
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
                  id={startingId}
                  item={data.items[startingId]}
                  allItems={data.items}
                  index={startingId}
                  restrictedDropId={restrictedDropId}
                  handleCheck={handleCheck}
                  handleCheckDirection={handleCheckDirection}
                  handleChangeContent={handleChangeContent}
                  handleChangeType={handleChangeType}
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
