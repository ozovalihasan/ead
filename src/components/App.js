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
  removeItem,
  addItem,
  moveItem,
  updateDraggedItemId,
} from '../redux';
import saveJSON from './saveJSON';

library.add(faArrowsAlt, faExpandAlt, faCompressAlt, faEllipsisH, faEllipsisV, faFlag);

const App = () => {
  const { items, dragDropCategory } = useSelector((state) => state.block);

  const [idCount, setIdCount] = useState(
    Math.max(...Object.keys(items).map((item) => parseInt(item, 10))) + 1,
  );

  const idCountIncrease = () => {
    setIdCount((prevIdCount) => prevIdCount + 1);
  };

  const startingId = 0;
  const dispatch = useDispatch();

  const checkDragDropCategory = (dragId, dropId) => (
    dragDropCategory[items[dragId].category].includes(items[dropId].category)
  );

  const stateBlock = useSelector((state) => state.block);

  const saveItems = () => {
    localStorage.block = JSON.stringify(stateBlock);
  };

  const onDragStart = (result) => {
    dispatch(updateDraggedItemId(result.draggableId));
  };

  const onDragEnd = (result) => {
    dispatch(updateDraggedItemId(-1));
    const {
      destination, draggableId, source,
    } = result;

    if (!destination) {
      if (!(items[draggableId].factory)) {
        dispatch(removeItem(source.droppableId, source.index, draggableId));
      }
      return;
    }

    if (!checkDragDropCategory(draggableId, destination.droppableId)) {
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
    <MainContainer className="App">
      <button
        onClick={() => saveJSON(items, 'EAD.json')}
        type="button"
      >
        Download EAD
      </button>
      <button
        onClick={() => saveItems()}
        type="button"
      >
        Save
      </button>
      <DragDropContext
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
      >
        <Droppable
          droppableId="OuterDrop"
          direction="vertical"
          isDropDisabled
        >

          { (provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              <Model
                item={items[startingId]}
                allItems={items}
                index={startingId}
                checkDragDropCategory={checkDragDropCategory}
              />
              {provided.placeholder}
            </div>
          )}

        </Droppable>
      </DragDropContext>
    </MainContainer>
  );
};

const MainContainer = styled.div`
  font-family: Arial, Helvetica, sans-serif;
`;

export default App;
