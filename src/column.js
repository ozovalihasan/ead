import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';
import Task from './task';

const Column = ({
  column, tasks, isDropDisabled,
}) => (
  <Container>
    <Title>{column.title}</Title>
    <Droppable
      droppableId={column.id}
      isDropDisabled={isDropDisabled}
    >
      {(provided, snapshot) => (
        <TaskList
          {...provided.droppableProps}
          isDraggingOver={snapshot.isDraggingOver}
          ref={provided.innerRef}
        >
          {tasks.map((task, index) => (
            <Task key={task.id} task={task} index={index} />
          ))}
          { provided.placeholder }
        </TaskList>
      )}
    </Droppable>
  </Container>

);

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  background-color: white;
  border-radius: 2px;
  width: 220px;
          
  display: flex;
  flex-direction: column;
`;

const Title = styled.h3`
  padding: 8px;
`;

const TaskList = styled.div`
  padding: 8px;
  transition: background-color 0.2s ease;
  background-color: ${(props) => (props.isDraggingOver ? 'skyblue' : 'inherit')};
  flex-grow: 1;
  min-height: 100px;
 
`;

Column.propTypes = {
  column: PropTypes.shape().isRequired,
  tasks: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  isDropDisabled: PropTypes.bool.isRequired,
};
export default Column;
