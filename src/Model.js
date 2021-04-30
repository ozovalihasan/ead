/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Model = ({
  item,
  allItems,
  handleCheck,
  handleCheckDirection,
  handleChangeContent,
  handleChangeType,
  handleExpandItem,
}) => {
  const restrictedDropId = useSelector((state) => state.block.restrictedDropId);

  return (
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
                backgroundColor={allItems[id].color}
              >

                <TitleCheck>

                  {allItems[id].isDragDisabled || (
                    <HandleDrag {...providedDrag.dragHandleProps}>
                      <FontAwesomeIcon icon="arrows-alt" size="lg" />
                    </HandleDrag>
                  )}

                  {(allItems[id].entity || allItems[id].attribute) && !allItems[id].factory
                    ? (
                      <ModelInput
                        type="text"
                        onChange={(e) => handleChangeContent(e, id)}
                        value={allItems[id].content}
                      />
                    )
                    : (
                      <Title>
                        {allItems[id].content}
                      </Title>
                    )}

                  {(allItems[id].attribute) && (
                  <select
                    value={allItems[id].type}
                    onChange={(e) => handleChangeType(e, id)}
                  >
                    {['primary_key', 'string', 'text', 'integer', 'float', 'decimal', 'datetime', 'timestamp',
                      'time', 'date', 'binary', 'boolean', 'references'].map((item) => (
                        <option
                          key={item}
                          value={item}
                        >
                          {item}
                        </option>
                    ))}

                  </select>
                  )}
                  {allItems[id].factory || allItems[id].attribute || allItems[id].isDragDisabled
                  || (
                    <ExpandButton
                      name="expand"
                      type="button"
                      onClick={() => handleExpandItem(id)}
                      expand={allItems[id].expand}
                    >
                      {allItems[id].expand
                        ? <FontAwesomeIcon icon="compress-alt" size="2x" />
                        : <FontAwesomeIcon icon="expand-alt" size="2x" />}
                    </ExpandButton>
                  )}
                  {allItems[id].factory || (
                  <DirectionButton
                    name="direction"
                    type="button"
                    onClick={() => handleCheckDirection(id)}
                  >
                    <FontAwesomeIcon icon={allItems[id].order === 'vertical' ? 'ellipsis-h' : 'ellipsis-v'} size="2x" />

                  </DirectionButton>
                  )}
                  {(allItems[id].factory || allItems[id].attribute) || (
                  <RestrictedDrop
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

                      {(allItems[id].expand) ? (
                        <Model
                          id={id}
                          item={allItems[id]}
                          allItems={allItems}
                          index={index}
                          handleCheck={handleCheck}
                          handleCheckDirection={handleCheckDirection}
                          handleChangeContent={handleChangeContent}
                          handleChangeType={handleChangeType}
                          handleExpandItem={handleExpandItem}

                        />
                      )
                        : (
                          <div>
                            {allItems[id].subItemIds.length}
                            {' '}
                            item(s) collided
                          </div>
                        )}
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
};

const Container = styled.div`
  margin: 1px;
  border-radius: 5px;
`;

const TitleCheck = styled.div`
  display: flex;
  align-items: center;
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
  background-color: #FF595E;
  outline: none;
  border: none;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    cursor: pointer;
  }
`;

const RestrictedDrop = styled.input`
  /* width: 30px; */
  /* height: 30px; */
  /* border-radius: 50%; */
  /* transform: scale(2); */
`;

const ExpandButton = styled.button`
  background-color: #FFCA3A; 
  outline: none;
  border: none;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  &:hover {
    cursor: pointer;
  }
`;

const HandleDrag = styled.div`
  background-color: #8AC926;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DropContainer = styled.div`
  margin: 10px;
  border-radius: 5px;
  background-color: ${(props) => (props.isDraggingOver ? '#9EF01A' : 'white')};

`;
const DragContainer = styled.div`
  padding: 2px;
  border-radius: 5px;
  background-color: ${(props) => (props.backgroundColor)};
  background-color: ${(props) => (props.isDragging && '#9EF01A')};
  border: 1px solid gray;
`;

const SubContainer = styled.div`
  display: flex;
  flex-direction: ${(props) => props.subdirection};
  min-height: ${(props) => (props.factory ? '0' : '100px')};
  /* background-color: ${(props) => (props.factory ? 'transparent' : 'pink')}; */
  border-radius: 5px;
`;

const Title = styled.h3`
`;
export default Model;
