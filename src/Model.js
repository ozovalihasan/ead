/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import { Draggable, Droppable } from 'react-beautiful-dnd';
// import Factory from './Factory';

const Model = ({
  item, allItems, restrictedDropId, handleCheck, handleCheckDirection,
}) => (

  <div>

    <SubContainer
      subdirection={item.subdirection}
      factory={item.factory}
    >
      {item.subItemIds.map((id, index) => (
        <Container key={id}>
          <Draggable
            draggableId={id.toString()}
            index={index}
            isDragDisabled={allItems[id].isDragDisabled}
          >
            {(providedDrag, snapshot) => (
              <DragContainer
                {...providedDrag.draggableProps}
                {...providedDrag.dragHandleProps}
                ref={providedDrag.innerRef}
                isDragging={snapshot.isDragging}
              >
                {false && console.warn(snapshot)}

                <TitleCheck>
                  <DirectionButton
                    name="direction"
                    type="button"
                    onClick={() => handleCheckDirection(id)}
                  />
                  <Title {...providedDrag.dragHandleProps}>
                    {allItems[id].content}
                  </Title>
                  {item.isDropDisabled || (
                  <input
                    name="isRestrictedDrop"
                    type="checkbox"
                    checked={restrictedDropId === id}
                    onChange={(e) => handleCheck(e, id)}
                  />
                  )}
                </TitleCheck>

                <Droppable
                  droppableId={id.toString()}
                  direction={allItems[id].order}
                  isDropDisabled={allItems[id].isDropDisabled
                        || (restrictedDropId !== -1 && restrictedDropId !== id)}
                >
                  { (providedDrop, snapshot) => (
                    <DropContainer
                      {...providedDrop.droppableProps}
                      ref={providedDrop.innerRef}
                      factory={allItems[id].factory}
                      isDraggingOver={snapshot.isDraggingOver}

                    >
                      <Model
                        id={id}
                        item={allItems[id]}
                        allItems={allItems}
                        index={index}
                        restrictedDropId={restrictedDropId}
                        handleCheck={handleCheck}
                        handleCheckDirection={handleCheckDirection}
                      />
                      {providedDrop.placeholder}
                    </DropContainer>
                  )}
                </Droppable>
              </DragContainer>
            )}
          </Draggable>
        </Container>
      ))}
    </SubContainer>
  </div>
);
const Container = styled.div`
  
  margin: 10px;
  border-radius: 5px;

`;

const TitleCheck = styled.div`
  display: flex;
`;
const DirectionButton = styled.button`
  background-color: red;
  width: 20px;
  height: 20px;
`;

const DropContainer = styled.div`
  margin: 10px;
  border-radius: 5px;
  background-color: ${(props) => (props.isDraggingOver ? 'skyblue' : 'white')};

`;
const DragContainer = styled.div`
  padding: 10px;
  border-radius: 5px;
  background-color: ${(props) => (props.isDragging ? 'green' : 'white')};
  border: 3px solid gray;
`;

const SubContainer = styled.div`
  display: flex;
  flex-direction: ${(props) => props.subdirection};
  min-height: ${(props) => (props.factory ? '0' : '100px')};
  border-radius: 5px;
`;

const Title = styled.h3`
  /* padding: 8px; */
  /* width: 200px;
  height: 200px; */
  /* background-color: red; */
`;
export default Model;
