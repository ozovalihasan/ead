/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import { Draggable, Droppable } from 'react-beautiful-dnd';

const Model = ({ item, allItems, index }) => (

  <Droppable
    droppableId={item.id}
  >
    { (provided) => (
      <Container
        {...provided.droppableProps}
        ref={provided.innerRef}
      >

        <Draggable draggableId={item.id} index={index}>
          {(provided) => (
            <Container
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              <Title {...provided.dragHandleProps}>
                {item.content}
              </Title>
              {item.subItemIds.map((id, index) => (
                <Model item={allItems[id]} key={id} allItems={allItems} index={index} />
              ))}

            </Container>
          )}

        </Draggable>
        {provided.placeholder}
      </Container>
    )}

  </Droppable>
);

const Container = styled.div`
  display: flex;
  width: 100px;
  height: 100px;

`;

const Title = styled.h3`
  padding: 8px;
  width: 50px;
  height: 50px;
  background-color: red;
`;
export default Model;

// const Column = ({
//     column, tasks, isDropDisabled, index,
//   }) => (

//   );
