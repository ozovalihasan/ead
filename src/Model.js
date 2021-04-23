/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import { Draggable, Droppable } from 'react-beautiful-dnd';
// import Factory from './Factory';

const Model = ({
  item, allItems, restrictedDropId, handleCheck,
}) => (
  <SubContainer
    subdirection={item.subdirection}
  >

    {item.subItemIds.map((id, index) => (

      <Draggable
        key={id}
        draggableId={id.toString()}
        index={index}
        isDragDisabled={allItems[id].isDragDisabled}
      >
        {(providedDrag, snapshot) => (
          <div>

            <Container
              {...providedDrag.draggableProps}
              {...providedDrag.dragHandleProps}
              ref={providedDrag.innerRef}
            >

              {false && console.warn(snapshot)}
              drag
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
                  <div>

                    <Container
                      {...providedDrop.droppableProps}
                      ref={providedDrop.innerRef}
                    >
                      drop
                      {allItems[id].isDropDisabled || (
                      <input
                        name="isRestrictedDrop"
                        type="checkbox"
                        checked={restrictedDropId === id}
                        onChange={(e) => handleCheck(e, id)}
                      />
                      )}

                      <Model
                        item={allItems[id]}
                        allItems={allItems}
                        index={index}
                        restrictedDropId={restrictedDropId}
                        handleCheck={handleCheck}
                      />

                      {providedDrop.placeholder}
                    </Container>
                  </div>
                )}

              </Droppable>

            </Container>
          </div>
        )}
      </Draggable>

    ))}
  </SubContainer>
);

const Container = styled.div`
  /* display: flex;
  flex-direction: ${(props) => props.direction}; */
  /* width: 100px;
  height: 100px; */
  border: 3px solid red;
  background-color: yellow;
  margin: 10px;
  min-height: 100px;

`;

const SubContainer = styled.div`
  display: flex;
  flex-direction: ${(props) => props.subdirection};

  /* width: 100px;
  height: 100px; */
  border: 3px solid green;
  min-height: 100px;

`;

const Title = styled.h3`
  /* padding: 8px; */
  /* width: 200px;
  height: 200px; */
  /* background-color: red; */
  border: 10px solid blue;
`;
export default Model;
