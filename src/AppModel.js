/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
/* eslint-disable react/no-this-in-sfc */
import React, { useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faArrowsAlt, faExpandAlt, faCompressAlt, faEllipsisH, faEllipsisV, faFlag,
} from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import Model from './Model';
import {
  changeType,
  changeContent,
  checkDirection,
  removeItem,
  addItem,
  moveItem,
  updateRestrictedDropId,
  expandItem,
} from './redux';
import saveJSON from './saveJSON';

library.add(faArrowsAlt, faExpandAlt, faCompressAlt, faEllipsisH, faEllipsisV, faFlag);

const AppModel = () => {
  const items = useSelector((state) => state.block.items);
  const restrictedDropId = useSelector((state) => state.block.restrictedDropId);

  const [idCount, setIdCount] = useState(Object.keys(items).length);

  const idCountIncrease = () => {
    setIdCount((prevIdCount) => prevIdCount + 1);
  };

  const startingId = 0;
  const dispatch = useDispatch();

  const handleCheck = (id) => {
    if (id === restrictedDropId) {
      dispatch(updateRestrictedDropId(-1));
    } else {
      dispatch(updateRestrictedDropId(id));
    }
  };

  const handleCheckDirection = (id) => {
    const subdirection = (items[id].subdirection === 'column' ? 'row' : 'column');
    const order = (items[id].order === 'vertical' ? 'horizontal' : 'vertical');
    dispatch(checkDirection(id, subdirection, order));
  };

  const handleChangeContent = (e, id) => {
    if (!items[id].factory) {
      dispatch(changeContent(e, id));
    }
  };

  const handleChangeType = (e, id) => {
    dispatch(changeType(e, id));
  };

  const handleExpandItem = (id) => {
    dispatch(expandItem(id));
  };

  const onDragStart = (start) => {
    console.warn({ start });
  };

  const onDragEnd = (result) => {
    const {
      destination, draggableId, source,
    } = result;

    if (!destination) {
      if (!(items[draggableId].factory)) {
        dispatch(removeItem(source.droppableId, source.index, draggableId));
      }
      return;
    }

    if (items[draggableId].association && !items[destination.droppableId].entity) {
      return;
    }

    if (items[draggableId].entity && items[destination.droppableId].entity) {
      return;
    }

    if (items[draggableId].attributeContainer && !items[destination.droppableId].entity) {
      return;
    }

    if (!items[draggableId].attribute && items[destination.droppableId].attributeContainer) {
      return;
    }

    if (items[draggableId].factory) {
      dispatch(addItem(draggableId, destination.droppableId, destination.index, idCount));
      if (items[draggableId].association) {
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

  return (
    <App className="App">
      <button
        onClick={() => saveJSON(items, 'test.json')}
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
                  item={items[startingId]}
                  allItems={items}
                  index={startingId}
                  handleCheck={handleCheck}
                  handleCheckDirection={handleCheckDirection}
                  handleChangeContent={handleChangeContent}
                  handleChangeType={handleChangeType}
                  handleExpandItem={handleExpandItem}
                />

                {provided.placeholder}
              </div>
            </div>
          )}

        </Droppable>
      </DragDropContext>
    </App>
  );
};

const App = styled.div`
  font-family: Arial, Helvetica, sans-serif;
`;

export default AppModel;
