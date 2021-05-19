import React from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faArrowsAlt, faExpandAlt, faCompressAlt, faEllipsisH, faEllipsisV, faFlag, faClone,
} from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import Model from './Model';
import {
  removeItem,
  addItem,
  moveItem,
  updateDraggedItemId,
  resetState,
  installState,
  cloneItem,
  changeDragHandleClone,
  idCountIncrease,
  toggleExpandAll,
} from '../redux';
import saveJSON from './saveJSON';

library.add(faArrowsAlt, faExpandAlt, faCompressAlt, faEllipsisH, faEllipsisV, faFlag, faClone);

const App = () => {
  const {
    items, dragDropCategory, dragHandleClone, idCount, expandAll,
  } = useSelector((state) => state.block);

  const startingId = 0;
  const dispatch = useDispatch();

  const checkDragDropCategory = (dragId, dropId) => (
    dragDropCategory[items[dragId].category].includes(items[dropId].category)
  );

  const stateBlock = useSelector((state) => state.block);

  const saveBlocks = () => {
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
      if (!(items[draggableId].factory || dragHandleClone)) {
        dispatch(removeItem(source.droppableId, source.index, draggableId));
      }
      return;
    }

    if (!checkDragDropCategory(draggableId, destination.droppableId)) {
      return;
    }

    if (dragHandleClone) {
      dispatch(cloneItem(draggableId, destination.droppableId, destination.index, idCount));
      dispatch(changeDragHandleClone(false));
      dispatch(idCountIncrease());
      return;
    }

    if (items[draggableId].factory) {
      dispatch(addItem(draggableId, destination.droppableId, destination.index, idCount));
      if (items[draggableId].association) {
        const entityId = 7;
        dispatch(addItem(entityId, idCount, destination.index, idCount + 1));
        dispatch(idCountIncrease());
      }
      dispatch(idCountIncrease());
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
      <Button
        onClick={() => saveJSON(items, 'EAD.json')}
        type="button"
      >
        Download EAD
      </Button>
      <Button
        onClick={() => dispatch(resetState())}
        type="button"
      >
        Reset
      </Button>
      <Button
        onClick={() => saveBlocks()}
        type="button"
      >
        Save
      </Button>
      <Button
        onClick={() => dispatch(installState())}
        type="button"
      >
        Install Saved Data
      </Button>
      <ExpandAllButton
        onClick={() => dispatch(toggleExpandAll())}
        type="button"
        expandAll={expandAll}
      >
        Expand All
      </ExpandAllButton>
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

const Button = styled.button`
  border-radius: 5px;
  border: 1px solid gray;
  background-color: transparent;
  margin: 10px;
  padding: 10px;
  transition: background-color 0.2s;

  &:hover {
    cursor: pointer;
    background-color: #C7FDED;
  }
`;

const ExpandAllButton = styled(Button)`
  background-color: ${(props) => (props.expandAll && '#C7FDED')};
`;

export default App;
