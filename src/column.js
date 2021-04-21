import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import Task from './task';

const InnerList = memo(({ tasks }) => tasks.map((task, index) => (
  <Task key={task.id} task={task} index={index} />
)));

InnerList.displayName = 'InnerList';
InnerList.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

const Column = ({
  column, tasks, isDropDisabled, index,
}) => (
  <Draggable draggableId={column.id} index={index}>
    {(provided) => (
      <Container
        {...provided.draggableProps}
        ref={provided.innerRef}
      >
        <Title {...provided.dragHandleProps}>
          {column.title}
        </Title>
        <Droppable
          droppableId={column.id}
          type="task"
          isDropDisabled={isDropDisabled}
        >
          {(provided, snapshot) => (
            <TaskList
              {...provided.droppableProps}
              isDraggingOver={snapshot.isDraggingOver}
              ref={provided.innerRef}
            >
              <InnerList tasks={tasks} />
              { provided.placeholder }
            </TaskList>
          )}
        </Droppable>
      </Container>
    )}

  </Draggable>
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
  background-color: ${(props) => (props.isDraggingOver ? 'lightgrey' : 'inherit')};
  flex-grow: 1;
  min-height: 100px;
 
`;

Column.propTypes = {
  column: PropTypes.shape().isRequired,
  tasks: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  isDropDisabled: PropTypes.bool.isRequired,
  index: PropTypes.number.isRequired,
};
export default Column;
