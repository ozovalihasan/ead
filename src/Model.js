/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import { Draggable, Droppable } from 'react-beautiful-dnd';
// import Factory from './Factory';

const Model = ({
  item, allItems, restrictedDropId, handleCheck, id,
}) => (

  <div>
    {item.isDropDisabled || (
      <input
        name="isRestrictedDrop"
        type="checkbox"
        checked={restrictedDropId === id}
        onChange={(e) => handleCheck(e, id)}
      />
    )}
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
              >
                {false && console.warn(snapshot)}
                <Title {...providedDrag.dragHandleProps}>
                  {allItems[id].content}
                </Title>
                <Droppable
                  droppableId={id.toString()}
                  direction={allItems[id].order}
                  isDropDisabled={allItems[id].isDropDisabled
                        || (restrictedDropId !== -1 && restrictedDropId !== id)}
                >
                  { (providedDrop) => (
                    <DropContainer
                      {...providedDrop.droppableProps}
                      ref={providedDrop.innerRef}
                      factory={allItems[id].factory}
                    >
                      <Model
                        id={id}
                        item={allItems[id]}
                        allItems={allItems}
                        index={index}
                        restrictedDropId={restrictedDropId}
                        handleCheck={handleCheck}
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
  border: 3px solid gray;
  margin: 10px;
  border-radius: 5px;

`;
const DropContainer = styled.div`
  margin: 10px;
  border-radius: 5px;
`;
const DragContainer = styled.div`
  margin: 10px;
  border-radius: 5px;
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
