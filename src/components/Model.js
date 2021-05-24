import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  changeContent,
  changeType,
  checkDirection,
  cloneItem,
  expandItem,
  idCountIncrease,
  updateRestrictedDropId,
} from '../redux';
import colors from './colors';

const Model = ({
  parentId,
  item,
  allItems,
  checkDragDropCategory,
}) => {
  const {
    restrictedDropId, draggedItemId, restrictedParentIds,
    disabledChildIds, expandAll, idCount, compactMode,
  } = useSelector((state) => state.block);

  const dispatch = useDispatch();

  const existRestrictedDrop = (restrictedDropId !== -1);

  const isRestrictedDrag = (id) => (
    existRestrictedDrop
    && (
      !checkDragDropCategory(id, restrictedDropId)
      || restrictedDropId === id
      || restrictedParentIds.includes(id)
    )
  );

  const handleClone = (id, index) => {
    dispatch(cloneItem(id, parentId, index + 1, idCount));
    dispatch(idCountIncrease());
  };

  return (
    <SubContainer
      subdirection={item.subdirection}
      factory={item.factory}
      data-testid="subContainer"
    >

      {item.subItemIds.map((id, index) => (
        <Container key={id}>
          <Draggable
            draggableId={id.toString()}
            index={index}
            isDragDisabled={allItems[id].isDragDisabled || isRestrictedDrag(id)}

          >
            {(providedDrag, snapshot) => (
              <DragContainer
                {...providedDrag.draggableProps}
                {...providedDrag.dragHandleProps}
                ref={providedDrag.innerRef}
                isDragging={snapshot.isDragging}
                isDraggingOver={snapshot.draggingOver}
                backgroundColor={colors[allItems[id].category]}
                isRestrictedDrag={isRestrictedDrag(id)}
                isRestrictedDrop={restrictedDropId === id}
                name="isRestrictedDrop"
              >
                <TitleCheck>

                  {
                    allItems[id].isDragDisabled || (
                      <HandleDrag
                        {...providedDrag.dragHandleProps}
                        title="Drag to move this item"
                        isRestrictedDrag={isRestrictedDrag(id)}
                      >
                        <FontAwesomeIcon icon="arrows-alt" size="lg" />
                      </HandleDrag>
                    )
                  }

                  {
                    !allItems[id].isDragDisabled
                    && allItems[id].entity
                    && !allItems[id].factory
                    && (
                      <CloneButton
                        title="Clone this entity"
                        type="button"
                        onClick={() => handleClone(id, index)}
                        isRestrictedDrag={isRestrictedDrag(id)}
                      >

                        <FontAwesomeIcon icon="clone" size="lg" />
                      </CloneButton>
                    )
                  }

                  {
                    allItems[id].factory
                    || allItems[id].attribute
                    || allItems[id].isDragDisabled
                    || compactMode
                    || (
                      <ExpandButton
                        name="expand"
                        type="button"
                        title="Expand or shrink this item"
                        onClick={() => dispatch(expandItem(id))}
                        expand={allItems[id].expand}
                        expandAll={expandAll}
                      >
                        <FontAwesomeIcon icon={allItems[id].expand ? 'compress-alt' : 'expand-alt'} size="lg" />
                      </ExpandButton>
                    )
                  }

                  {
                    !(allItems[id].factory
                      || allItems[id].attribute
                      || compactMode
                    )
                    && (
                      <DirectionButton
                        name="direction"
                        type="button"
                        title="Align items vertically or horizontally"
                        onClick={() => dispatch(checkDirection(id, allItems))}
                      >
                        <FontAwesomeIcon icon={allItems[id].order === 'vertical' ? 'ellipsis-h' : 'ellipsis-v'} size="lg" />
                      </DirectionButton>
                    )
                  }

                  {
                    (
                      ((allItems[id].entity || allItems[id].attribute || allItems[id].entityClone)
                      && !allItems[id].factory) ? (
                        <ModelInput
                          type="text"
                          onChange={
                            (e) => (!allItems[id].factory) && dispatch(changeContent(e, id))
                          }
                          value={allItems[id].content}
                        />
                        ) : (
                          <Title>
                            {allItems[id].content}
                          </Title>
                        )
                    )
                  }
                  { allItems[id].entityClone
                     && (allItems[(allItems[id].cloneParent)].content)}
                  {
                    (allItems[id].attribute) && (
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
                    )
                  }

                  {
                    (allItems[id].factory || allItems[id].attribute) || (
                      <RestrictedDrop
                        type="button"
                        title="Click to drop any item into this element"
                        restricted={restrictedDropId === id}
                        onClick={() => dispatch(updateRestrictedDropId(id, restrictedDropId))}
                      >
                        <FontAwesomeIcon icon="flag" />
                      </RestrictedDrop>
                    )
                  }
                </TitleCheck>

                {allItems[id].attribute || (
                  <Droppable
                    droppableId={id.toString()}
                    direction={allItems[id].order}
                    isDropDisabled={
                      disabledChildIds.includes(id)
                      || allItems[id].isDropDisabled
                      || allItems[id].factory
                      || (
                        existRestrictedDrop && restrictedDropId !== id
                      )
                      || (
                        draggedItemId !== -1
                        && !checkDragDropCategory(draggedItemId, id)
                      )
                    }
                  >
                    {(providedDrop, snapshot) => (
                      <DropContainer
                        {...providedDrop.droppableProps}
                        ref={providedDrop.innerRef}
                        factory={allItems[id].factory}
                        isDraggingOver={snapshot.isDraggingOver}
                        isDropDisabled={
                          disabledChildIds.includes(id)
                          || allItems[id].isDropDisabled
                          || allItems[id].factory
                          || (existRestrictedDrop && restrictedDropId !== id)
                          || (draggedItemId !== -1
                            && !checkDragDropCategory(draggedItemId, id)
                          )
                        }
                      >
                        {(expandAll || allItems[id].expand)
                          ? (
                            <Model
                              parentId={id}
                              item={allItems[id]}
                              allItems={allItems}
                              index={index}
                              checkDragDropCategory={checkDragDropCategory}
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
  width: 125px;
  margin: 0 3px;  
`;

const ActionButton = styled.button`
  background-color: white; 
  outline: none;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 3px;
`;

const DirectionButton = styled(ActionButton)`
  border: 1px solid #1982C4;

  &:hover {
    cursor: pointer;
  }
`;

const CloneButton = styled(ActionButton)`
  border: 1px solid #1982C4;

  &:hover {
    cursor: pointer;
  }
`;

const RestrictedDrop = styled(ActionButton)`
  color: ${(props) => (props.restricted ? 'inherit' : 'transparent')};
  border-radius: 10px;
  border: #CCC5B9 solid 4px;
  margin: 0 4px;

  &:hover{
    cursor: pointer;
  }
`;

const ExpandButton = styled(ActionButton)`
  border: 1px solid #FFCA3A;
  background-color: ${(props) => (props.expandAll && colors.association)};

  &:hover {
    cursor: pointer;
  }
`;

const HandleDrag = styled(ActionButton)`
  border: 1px solid #8AC926;
  border-radius: 5px;
  background-color: ${(props) => (props.isRestrictedDrag && colors.disabled)};
`;

const DropContainer = styled.div`
  margin: 10px;
  border-radius: 5px;
  background-color: ${(props) => (props.isDraggingOver ? colors.suitable : colors.EAD)};
  background-color: ${(props) => (props.isDropDisabled && colors.disabled)};

`;
const DragContainer = styled.div`
  padding: 2px;
  border-radius: 5px;
  background-color: ${(props) => (props.backgroundColor)};
  background-color: ${(props) => (props.isDragging && colors.suitable)};
  background-color: ${(props) => (!props.isDraggingOver && props.isDragging && colors.warning)};
  background-color: ${(props) => (props.isRestrictedDrag && colors.disabled)};
  background-color: ${(props) => (props.isRestrictedDrop && colors.chosen)};
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

Model.propTypes = {
  parentId: PropTypes.number.isRequired,
  item: PropTypes.shape().isRequired,
  allItems: PropTypes.shape().isRequired,
  checkDragDropCategory: PropTypes.func.isRequired,
};

export default Model;
