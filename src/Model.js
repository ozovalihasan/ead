/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  changeContent, changeType, checkDirection, expandItem, updateRestrictedDropId,
} from './redux';

const Model = ({
  item,
  allItems,
}) => {
  const restrictedDropId = useSelector((state) => state.block.restrictedDropId);
  const dispatch = useDispatch();

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

                  {allItems[id].isDragDisabled
                    || (
                      <HandleDrag
                        {...providedDrag.dragHandleProps}
                        title="Drag to move this item"
                      >
                        <FontAwesomeIcon icon="arrows-alt" size="lg" />
                      </HandleDrag>
                    )}

                  {allItems[id].factory || allItems[id].attribute || allItems[id].isDragDisabled
                    || (
                      <ExpandButton
                        name="expand"
                        type="button"
                        title="Expand or shrink this item"
                        onClick={() => dispatch(expandItem(id))}
                        expand={allItems[id].expand}
                      >
                        <FontAwesomeIcon icon={allItems[id].expand ? 'compress-alt' : 'expand-alt'} size="lg" />
                      </ExpandButton>
                    )}
                  {allItems[id].factory || (
                  <DirectionButton
                    name="direction"
                    type="button"
                    title="Align items vertically or horizontally"
                    onClick={() => dispatch(checkDirection(id, allItems))}
                  >
                    <FontAwesomeIcon icon={allItems[id].order === 'vertical' ? 'ellipsis-h' : 'ellipsis-v'} size="lg" />
                  </DirectionButton>
                  )}

                  {(allItems[id].entity || allItems[id].attribute) && !allItems[id].factory
                    ? (
                      <ModelInput
                        type="text"
                        onChange={(e) => (!allItems[id].factory) && dispatch(changeContent(e, id))}
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
                    onChange={(e) => dispatch(changeType(e, id))}
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
                  {(allItems[id].factory || allItems[id].attribute) || (
                    <RestrictedDrop
                      name="isRestrictedDrop"
                      type="button"
                      title="Click to drop any item into this element"
                      restricted={restrictedDropId === id}
                      onClick={() => dispatch(updateRestrictedDropId(id, restrictedDropId))}
                    >
                      <FontAwesomeIcon icon="flag" />
                    </RestrictedDrop>
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

                      {(allItems[id].expand)
                        ? (
                          <Model
                            id={id}
                            item={allItems[id]}
                            allItems={allItems}
                            index={index}
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
  padding: 0 3px;
`;

const ModelInput = styled.input`
  outline: none;
  border: none ;
  border-radius: 2px;
  color: black;
  font-size: 16px;
  font-weight: 700;
  width: 150px;
  margin: 0 3px;  
`;

const DirectionButton = styled.button`
  background-color: white;
  background-color: white; 
  border: 3px solid #1982C4;
  outline: none;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 3px;

  &:hover {
    cursor: pointer;
  }
`;

const RestrictedDrop = styled.button`
  color: ${(props) => (props.restricted ? 'inherit' : 'transparent')};
  background-color: white; 
  outline: none;
  border-radius: 10px;
  border: #CCC5B9 solid 4px;
  margin: 0 4px;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover{
    cursor: pointer;
  }
`;

const ExpandButton = styled.button`
  background-color: white; 
  border: 3px solid #FFCA3A;
  outline: none;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  margin: 0 3px;

  &:hover {
    cursor: pointer;
  }
`;

const HandleDrag = styled.button`
  background-color: white;
  border: 3px solid #8AC926;
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
  background-color: ${(props) => (props.isDraggingOver ? '#8AC926' : 'white')};

`;
const DragContainer = styled.div`
  padding: 2px;
  border-radius: 5px;
  background-color: ${(props) => (props.backgroundColor)};
  background-color: ${(props) => (props.isDragging && '#8AC926')};
  border: 1px solid gray;
`;

const SubContainer = styled.div`
  display: flex;
  flex-direction: ${(props) => props.subdirection};
  min-height: ${(props) => (props.factory ? '0' : '100px')};
  border-radius: 5px;
`;

const Title = styled.h3`
`;
export default Model;
