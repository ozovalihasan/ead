import React from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faArrowsAlt, faExpandAlt, faCompressAlt, faEllipsisH, faEllipsisV, faFlag, faClone,
  faPlus, faPlaneDeparture, faPlaneArrival, faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Model from './Model';
import {
  removeItem,
  addItem,
  moveItem,
  updateDraggedItemId,
  resetState,
  installState,
  idCountIncrease,
  toggleExpandAll,
  toggleCompactMode,
  updateRestrictedDropId,
  uploadAllData,
  toggleMoreText,
} from '../redux';
import saveJSON from './saveJSON';
import colors from './colors';

library.add(faArrowsAlt, faExpandAlt, faCompressAlt, faEllipsisH,
  faEllipsisV, faFlag, faClone, faGithub, faPlus, faPlaneDeparture, faPlaneArrival, faTimes);

const App = () => {
  const {
    items, dragDropCategory, idCount, expandAll, compactMode, moreText,
  } = useSelector((state) => state.block);

  const blocks = useSelector((state) => state.block);

  const startingId = compactMode ? 9 : 0;
  const dispatch = useDispatch();

  const checkDragDropCategory = (dragId, dropId) => (
    dragDropCategory[items[dragId].category].includes(items[dropId].category)
  );

  const stateBlock = useSelector((state) => state.block);

  const saveBlocks = () => {
    localStorage.block = JSON.stringify(stateBlock);
  };

  const handleUpload = (e) => {
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      dispatch(uploadAllData(JSON.parse(e.target.result)));
    };

    fileReader.readAsText(e.target.files[0], 'UTF-8');
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
        dispatch(updateRestrictedDropId(idCount, null));
      }
      dispatch(idCountIncrease());
      return;
    }

    if (items[destination.droppableId].entityContainer
      && items[destination.droppableId].subItemIds.length > 0
      && (items[items[destination.droppableId].subItemIds[0]].category
        !== items[draggableId].category
      )) {
      return;
    }

    if (
      items[destination.droppableId].association
      && items[destination.droppableId].subItemIds.length > 0
    ) {
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
      <LogoButtons>
        <LogoVersion>
          <Logo src={`${process.env.PUBLIC_URL}/images/ead-logo.svg`} alt="EAD logo" />
          <Version>
            0.3.1
          </Version>
        </LogoVersion>
        <Button
          onClick={() => saveJSON(blocks, 'EAD.json')}
          type="button"
          title="Download EAD"
        >
          Download EAD
        </Button>
        <UploadButton title="Upload EAD">
          Upload EAD
          <input
            onChange={handleUpload}
            type="file"
            accept=".json"
            data-testid="uploadInput"
            title="Select an uploaded EAD"
          />
        </UploadButton>

        <CompactMode
          onClick={() => dispatch(toggleCompactMode())}
          type="button"
          compactMode={compactMode}
          title="Toggle 'Compact Mode'"
        >
          Compact Mode
        </CompactMode>

        <MoreText
          onClick={() => dispatch(toggleMoreText())}
          type="button"
          title="Toggle 'More Text'"
          moreText={moreText}
        >
          More Text
        </MoreText>

        {compactMode
        || (
          <>
            <Button
              onClick={() => dispatch(resetState())}
              type="button"
              title="Reset"
            >
              Reset
            </Button>
            <Button
              onClick={() => saveBlocks()}
              type="button"
              title="Save to localStorage"
            >
              Save
            </Button>
            <Button
              onClick={() => dispatch(installState())}
              type="button"
              title="Install saved data from localStorage"
            >
              Install Saved Data
            </Button>

            <ExpandAllButton
              onClick={() => dispatch(toggleExpandAll())}
              type="button"
              expandAll={expandAll}
              title="Expand all blocks"
            >
              Expand All
            </ExpandAllButton>

            <GithubLink href="https://github.com/ozovalihasan/ead" title="Click to see the repository of the project">
              <FontAwesomeIcon icon={faGithub} size="2x" />
            </GithubLink>
          </>
        )}
      </LogoButtons>
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
                parentId={startingId}
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

const LogoButtons = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
`;

const LogoVersion = styled.div`
  display: flex;
  padding-right: 40px;
`;

const Logo = styled.img`
  width: 60px;
  padding-right: 5px;
`;

const Version = styled.div`
  height: 100%;
  text-align: end;
  font-size: 9px;
  padding-top: 35%;
`;

const Button = styled.button`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: block;
  border-radius: 5px;
  border: 1px solid ${colors.disabled};
  background-color: transparent;
  margin: 10px;
  padding: 10px;
  transition: background-color 0.4s;

  &:hover {
    cursor: pointer;
    background-color: ${colors.entity};
  }
`;

const UploadButton = styled(Button)`
  position: relative;

  > input {
    display:  none;
  }
  
  &:hover {
    background-color: ${colors.entity};

    > input {
      border-radius: 5px;
      padding: 100px;
      z-index: 2;
      position: absolute;
      display:  block;
      left: 0;
      top: 0;

      &:hover {
        cursor: pointer;
      }
    }
  }
`;

const ExpandAllButton = styled(Button)`
  background-color: ${(props) => (props.expandAll && colors.entity)};
`;

const CompactMode = styled(Button)`
  background-color: ${(props) => (props.compactMode && colors.entity)};
`;

const MoreText = styled(Button)`
  background-color: ${(props) => (props.moreText && colors.entity)};
`;

const GithubLink = styled.a`
  margin: 0 10px;
  color: #000;

  &:hover {
    color: ${colors.chosen};
  }
`;
export default App;
