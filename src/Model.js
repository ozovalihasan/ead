/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import { Draggable, Droppable } from 'react-beautiful-dnd';

const Model = ({
  item,
  allItems,
  restrictedDropId,
  handleCheck,
  handleCheckDirection,
  handleChangeEntity,
}) => (
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
              <TitleCheck>
                {allItems[id].factory || (
                  <DirectionButton
                    name="direction"
                    type="button"
                    onClick={() => handleCheckDirection(id)}
                  />
                )}
                <HandleDrag {...providedDrag.dragHandleProps} />
                {allItems[id].entity || allItems[id].attribute
                  ? (
                    <ModelInput
                      type="text"
                      onChange={(e) => handleChangeEntity(e, id)}
                      value={allItems[id].content}
                    />
                  )
                  : (
                    <Title>
                      {allItems[id].content}
                    </Title>
                  )}
                {(item.isDropDisabled || allItems[id].attribute) || (
                  <input
                    name="isRestrictedDrop"
                    type="checkbox"
                    checked={restrictedDropId === id}
                    onChange={(e) => handleCheck(e, id)}
                  />
                )}
              </TitleCheck>

              {allItems[id].attribute || (
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
                        handleChangeEntity={handleChangeEntity}
                      />
                      {providedDrop.placeholder}
                    </DropContainer>
                  )}
                </Droppable>
              )}
            </DragContainer>
          )}
        </Draggable>
      </Container>
    ))}
  </SubContainer>
);
const Container = styled.div`
  margin: 10px;
  border-radius: 5px;
`;

const TitleCheck = styled.div`
  display: flex;
`;

const ModelInput = styled.input`
  outline: none;
  border: 3px red dotted ;
  color: black;
  font-size: 25px;
  font-weight: 700;
  width: 150px;
`;

const DirectionButton = styled.button`
  background-color: red;
  width: 20px;
  height: 20px;
`;

const HandleDrag = styled.div`
  background-color: green;
  width: 30px;
  height: 30px;
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
`;
export default Model;
