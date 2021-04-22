import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import Task from './task';

const InnerList = memo(({ rows }) => rows.map((row, index) => (
  <Task key={row.id} task={row} index={index} />
)));

InnerList.displayName = 'InnerList';
InnerList.propTypes = {
  rows: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

const Factory = () => {
  const isDropDisabled = false;
  const column = {

    id: 20,
    content: 'Associations',
  };

  const rows = [
    { id: 'has_many', content: 'has_many' },
    { id: 'has_one', content: 'has_one' },
    { id: 'belongs_to', content: 'belongs_to' },
    { id: 'entity', content: 'entity' },
  ];
  return (
    <Draggable draggableId={column.id} type="persistent" isDragDisabled>
      {(provided) => (
        <Container
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <Title {...provided.dragHandleProps}>
            {column.content}
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
                <InnerList rows={rows} />
                { provided.placeholder }
              </TaskList>
            )}
          </Droppable>
        </Container>
      )}

    </Draggable>
  );
};

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

export default Factory;
