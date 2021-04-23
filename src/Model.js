/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import { Draggable, Droppable } from 'react-beautiful-dnd';
// import Factory from './Factory';

const Model = ({
  item, allItems, index, restrictedDropId, handleCheck,
}) => (

  <Droppable
    droppableId={item.id}
    direction={item.order}
    isDropDisabled={item.isDropDisabled
      || (restrictedDropId !== -1 && restrictedDropId !== item.id)}
  >

    { (provided) => (
      <div>

        <Container
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          drop
          {item.isDropDisabled || (
          <input
            name="isGoing"
            type="checkbox"
            checked={restrictedDropId === item.id}
            onChange={(e) => handleCheck(e, item.id)}
          />
          )}
          <Draggable
            draggableId={item.id}
            index={index}
            isDragDisabled={item.isDragDisabled}
          >
            {(provided, snapshot) => (
              <div>

                <Container
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  ref={provided.innerRef}
                >
                  {false && console.warn(snapshot)}
                  drag
                  <Title {...provided.dragHandleProps}>
                    {item.content}
                  </Title>
                  <SubContainer
                    subdirection={item.subdirection}
                  >
                    {provided.placeholder}
                    {item.subItemIds.map((id, index) => (
                      <Model
                        item={allItems[id]}
                        key={id}
                        allItems={allItems}
                        index={index}
                        restrictedDropId={restrictedDropId}
                        handleCheck={handleCheck}
                      />
                    ))}
                  </SubContainer>
                </Container>
              </div>
            )}
          </Draggable>
          {provided.placeholder}
        </Container>
      </div>
    )}

  </Droppable>
);

const Container = styled.div`
  /* display: flex;
  flex-direction: ${(props) => props.direction}; */
  /* width: 100px;
  height: 100px; */
  border: 3px solid red;
  background-color: yellow;
  margin: 10px;

`;

const SubContainer = styled.div`
  display: flex;
  flex-direction: ${(props) => props.subdirection};

  /* width: 100px;
  height: 100px; */
  border: 3px solid green;

`;

const Title = styled.h3`
  /* padding: 8px; */
  /* width: 200px;
  height: 200px; */
  /* background-color: red; */
  border: 10px solid blue;
`;
export default Model;
