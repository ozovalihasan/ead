/* eslint-disable no-nested-ternary */
import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';
import PropTypes from 'prop-types';

const Task = ({ task, index }) => {
  const isDragDisabled = task.id === 'task-1';
  return (
    <Draggable
      draggableId={task.id}
      index={index}
      isDragDisabled={isDragDisabled}
    >

      {(provided, snapshot) => (
        <Container
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          isDragging={snapshot.isDragging}
          isDragDisabled={isDragDisabled}
          ref={provided.innerRef}
        >
          {/* <Handle {...provided.dragHandleProps} /> */}
          {task.content}
        </Container>
      )}
    </Draggable>
  );
};

const Container = styled.div`
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
  background-color: ${(props) => (
    props.isDragDisabled
      ? 'lightgrey'
      : (props.isDragging
        ? 'lightgreen'
        : 'white')
  )};
  

`;

// const Handle = styled.div`
//     width: 20px;
//     height: 20px;
//     background-color: orange;
//     border-radius: 4px;
//     margin-right: 8px;
// `;

Task.propTypes = {
  task: PropTypes.shape().isRequired,
  index: PropTypes.number.isRequired,
};

export default Task;
