/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import { Draggable, Droppable } from 'react-beautiful-dnd';
// import Factory from './Factory';

const Model = ({ item, allItems, index }) => (

  <Droppable
    droppableId={item.id}
    direction={item.order}
    isDropDisabled={item.isDropDisabled}
  >
    { (provided, snapshot) => (
      <div>
        <Container
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          {console.warn(snapshot)}
          drop
          <Draggable
            draggableId={item.id}
            index={index}
            isDragDisabled={item.isDragDisabled}
          >
            {(provided) => (
              <div>
                <Container
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  ref={provided.innerRef}
                >
                  drag
                  <Title {...provided.dragHandleProps}>
                    {item.content}
                  </Title>
                  <SubContainer
                    subdirection={item.subdirection}
                  >
                    {provided.placeholder}
                    {item.subItemIds.map((id, index) => (
                      <Model item={allItems[id]} key={id} allItems={allItems} index={index} />
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
  padding: 8px;
  /* width: 200px;
  height: 200px; */
  /* background-color: red; */
  border: 10px solid blue;
`;
export default Model;
