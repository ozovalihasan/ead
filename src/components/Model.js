import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  addItem,
  changeContent,
  changeType,
  checkDirection,
  cloneItem,
  expandItem,
  idCountIncrease,
  removeItem,
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
    disabledChildIds, expandAll, idCount, compactMode, moreText,
  } = useSelector((state) => state.block);

  const dispatch = useDispatch();

  const existRestrictedDrop = (restrictedDropId !== -1);

  const isRestrictedDrag = (id) => (
    (
      existRestrictedDrop
      && (
        !checkDragDropCategory(id, restrictedDropId)
        || restrictedDropId === id
        || restrictedParentIds.includes(id)
      )
    )
  );

  const handleClone = (id, index) => {
    const restrictedArea = (
      (
        restrictedDropId !== -1
        && (
          allItems[restrictedDropId].association
          || allItems[restrictedDropId].entityAssociation
        )
      )
    );
    dispatch(cloneItem(
      allItems[id].entityClone ? allItems[id].cloneParent : id,
      restrictedArea ? restrictedDropId
        : parentId,
      restrictedArea ? 0 : (index + 1),
      idCount,
    ));
    if (
      restrictedDropId !== -1
      && allItems[restrictedDropId].association
    ) {
      dispatch(updateRestrictedDropId(idCount, null));
    }
    dispatch(idCountIncrease());
  };

  const handleRemove = (id, index) => {
    dispatch(removeItem(parentId, index, id));
  };

  const handleAdd = (id) => {
    dispatch(addItem(id, restrictedDropId, 0, idCount));
    if (allItems[id].association) {
      dispatch(updateRestrictedDropId(idCount, null));
    }
    dispatch(idCountIncrease());
  };

  const handleAddToItem = (id) => {
    if (allItems[id].entity) {
      const attributeId = 6;
      dispatch(addItem(attributeId, id, 0, idCount));
    } else if (allItems[id].category === 'EAD') {
      const entityAssociationId = 5;
      dispatch(addItem(entityAssociationId, id, 0, idCount));
    } else if (allItems[id].entityContainer) {
      const entityId = 7;
      dispatch(addItem(entityId, id, 0, idCount));
    }
    dispatch(idCountIncrease());
  };

  const handleAddAssociation = (addItemId, containerId) => {
    dispatch(addItem(addItemId, containerId, 0, idCount));
    dispatch(updateRestrictedDropId(idCount, null));
    dispatch(idCountIncrease());
  };

  return (
    <SubContainer
      subdirection={item.subdirection}
      factory={item.factory}
      data-testid={`subContainer-${parentId}`}

    >
      {item.subItemIds.map((id, index) => (
        <Container
          ead={item.category === 'EAD'}
          association={item.association}
          subdirection={item.subdirection}
          key={id}
          entity={item.entity || item.entityClone}
        >

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

                <TitleCheck
                  association={allItems[id].association}
                  factory={allItems[id].factory}
                  entity={allItems[id].entity}
                >
                  {
                    restrictedDropId !== -1
                    && !isRestrictedDrag(id)
                    && !allItems[id].entityContainer
                    && allItems[id].factory
                    && (
                      <FastMove
                        onClick={() => handleAdd(id)}
                        title="Add this item into restricted container"
                      >
                        <FontAwesomeIcon icon="plane-departure" />
                      </FastMove>
                    )
                  }
                  {
                    !allItems[id].isDragDisabled
                    && !allItems[id].factory
                    && restrictedDropId !== -1
                    && (
                      allItems[id].entity
                      || allItems[id].entityClone
                    )
                    && (
                      (allItems[restrictedDropId].association
                        && (allItems[restrictedDropId].subItemIds.length === 0)
                      )
                      || allItems[restrictedDropId].entityAssociation
                    )
                    && (
                      <CloneButton
                        title="Clone this entity"
                        type="button"
                        onClick={() => handleClone(id, index)}
                      >

                        <FontAwesomeIcon icon="clone" size="lg" />
                      </CloneButton>
                    )
                  }

                  { !(allItems[id].category === 'factory') && !compactMode && (
                    <ButtonContainer>
                      <HoverIcon>
                        <FontAwesomeIcon icon="plus" />
                      </HoverIcon>

                      <HoverContainer>
                        <LeftButtons>
                          {
                            !allItems[id].factory
                            && !allItems[id].association
                            && !allItems[id].entityClone
                            && !allItems[id].attribute
                            && !allItems[id].entityAssociation
                            && (
                              <AddButton
                                title="Add an allowed block"
                                type="button"
                                onClick={() => handleAddToItem(id)}
                              >
                                <FontAwesomeIcon icon="plane-arrival" size="lg" />
                              </AddButton>
                            )
                          }

                          {
                            allItems[id].entityClone
                            && (
                              <AssociationButtons>
                                <AddAssociation onClick={() => handleAddAssociation(4, id)}>
                                  <svg height={20} viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                      d="m 9,0 -0,3.25 m 0,3.5 -0,3.75 m 0,4.25 L 9,18"
                                      stroke="black"
                                      fill="transparent"
                                    />
                                  </svg>
                                </AddAssociation>
                                <AddAssociation onClick={() => handleAddAssociation(3, id)}>
                                  <svg height={20} viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                      d="M 9,0 9,18"
                                      stroke="black"
                                      fill="transparent"
                                    />
                                  </svg>
                                </AddAssociation>
                                <AddAssociation onClick={() => handleAddAssociation(2, id)}>
                                  <svg height={20} viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                      d="M 0,18 9,9 M 18,18 9,9 M 9,0 v 18"
                                      stroke="black"
                                      fill="transparent"
                                    />
                                  </svg>
                                </AddAssociation>

                              </AssociationButtons>
                            )
                          }

                          {
                            !allItems[id].isDragDisabled
                            && (
                              allItems[id].entity
                              || allItems[id].entityClone
                            )
                            && !allItems[id].factory
                            && restrictedDropId !== -1
                            && (
                              (
                                allItems[restrictedDropId].association
                                && (allItems[restrictedDropId].subItemIds.length === 0)
                              )
                              || allItems[restrictedDropId].entityAssociation
                            )
                            && (
                              <HoverCloneButton
                                title="Clone this entity"
                                type="button"
                                onClick={() => handleClone(id, index)}
                              >

                                <FontAwesomeIcon icon="clone" size="lg" />
                              </HoverCloneButton>
                            )
                          }
                        </LeftButtons>
                        {
                          (allItems[id].factory || allItems[id].attribute)
                          || (
                            <RestrictedDrop
                              type="button"
                              title="Click to drop any item into this element"
                              restricted={restrictedDropId === id}
                              onClick={() => {
                                dispatch(updateRestrictedDropId(id, restrictedDropId));
                              }}
                            >
                              <FontAwesomeIcon icon="flag" />
                            </RestrictedDrop>
                          )
                        }

                        {
                          allItems[id].isDragDisabled
                          || (
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
                          allItems[id].factory
                          || allItems[id].attribute
                          || allItems[id].isDragDisabled
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
                          )
                          && allItems[id].expand
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
                          !allItems[id].factory
                          && allItems[id].category !== 'EAD'
                          && (
                            <RemoveButton
                              title="Remove this block"
                              type="button"
                              onClick={() => handleRemove(id, index)}
                            >
                              <FontAwesomeIcon icon="times" size="lg" />
                            </RemoveButton>
                          )
                        }

                      </HoverContainer>

                    </ButtonContainer>
                  )}

                  {
                    (
                      (
                        (
                          allItems[id].entity || allItems[id].attribute || allItems[id].entityClone
                        )
                        && !allItems[id].factory
                      ) ? (
                        <ModelInput
                          type="text"
                          disabled={allItems[id].isDragDisabled || isRestrictedDrag(id)}
                          onChange={
                            (e) => (!allItems[id].factory) && dispatch(changeContent(e, id))
                          }
                          value={allItems[id].content}
                        />
                        ) : (
                          <TitleContainer>
                            <Title>
                              {
                                allItems[id].association && !allItems[id].factory && !moreText
                                  ? (
                                    <Flex>

                                      <svg height={60} width="100%" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
                                        {(
                                          (
                                            allItems[id].content === 'has_one' && (
                                            <path
                                              d="M 9,0 9,18"
                                              stroke="black"
                                              fill="transparent"
                                            />
                                            )
                                          ) || (
                                            allItems[id].content === 'has_many' && (
                                            <path
                                              d="M 0,18 9,9 M 18,18 9,9 M 9,0 v 18"
                                              stroke="black"
                                              fill="transparent"
                                            />
                                            )
                                          ) || (
                                            allItems[id].content === ':through' && (
                                              <path
                                                d="m 9,0 -0,3.25 m 0,3.5 -0,3.75 m 0,4.25 L 9,18"
                                                stroke="black"
                                                fill="transparent"
                                              />
                                            )
                                          )

                                        )}

                                      </svg>

                                    </Flex>
                                  )

                                  : (
                                    allItems[id].content
                                  )
                              }

                            </Title>
                          </TitleContainer>
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
                        {
                          (
                            allItems[id].factory
                            || (expandAll || allItems[id].expand)
                          )
                            ? (
                              <Model
                                parentId={id}
                                item={allItems[id]}
                                allItems={allItems}
                                index={index}
                                checkDragDropCategory={checkDragDropCategory}
                              />
                            ) : (
                              <div>
                                {allItems[id].subItemIds.length}
                                {' '}
                                item(s) collided
                              </div>
                            )
}
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

const SubContainer = styled.div`
  display: flex;
  flex-direction: ${(props) => props.subdirection};
  min-height: ${(props) => (props.factory ? '0' : '100px')};
`;

const Container = styled.div`
  margin: 1px;
  margin: ${(props) => (props.ead ? '25px' : '0')};
  padding: 0 0 0 10px;
  border-left: ${(props) => (!props.ead && props.subdirection === 'column' && 'solid 1px gray')};
  
`;

const DragContainer = styled.div`
  margin-top: 10px;
  border-radius: 5px;
  background-color: ${(props) => (props.backgroundColor)};
  background-color: ${(props) => (props.isDragging && colors.suitable)};
  background-color: ${(props) => (!props.isDraggingOver && props.isDragging && colors.warning)};
  background-color: ${(props) => (props.isRestrictedDrag && colors.disabled)};
  background-color: ${(props) => (props.isRestrictedDrop && colors.chosen)};
`;

const TitleCheck = styled.div`
  display: flex;
  align-items: center;
  padding: 0 3px;
  border-bottom: 1px solid gray;
  border: ${((props) => props.association && 'none')};
  border: ${((props) => (props.factory || props.entity) && 'none')};
  position: relative;
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

  &:hover {
    cursor: pointer;
  }
`;

const FastMove = styled(ActionButton)`
  border: 1px solid #8AC926;
  right: 0;
  position: absolute;
`;

const HoverCloneButton = styled(ActionButton)`
  border: 1px solid #1982C4;
`;

const CloneButton = styled(HoverCloneButton)`
  transform: translateX(-140%);
  position: absolute;
`;

const HoverIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
`;

const HoverContainer = styled.div`
  display: none;
  position: absolute;
  transform: translateX(-3px);
  z-index: 1;
  background-color: ${colors.factory};
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  width: 30px;
  height: 30px;

  &:hover ${HoverContainer} {
    display: flex;
  }
`;

const LeftButtons = styled.div`
  background-color: white;
  margin-right: 3px;
  position: absolute;
  display: flex;
  justify-content: end;
  height: 30px;
  z-index: 1;
  transform: translateX(-100%)
`;

const AddButton = styled(ActionButton)`
  border: 1px solid #8AC926;
`;

const AssociationButtons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AddAssociation = styled.button`
  width: 30px;
  height: 30px;
  border: #CCC5B9 solid 1px;
  border-radius: 50%;
  background-color: white; 
  margin: 0 3px;
  padding: 0; 
  display: flex;
  align-items: center;
  justify-content: center;

  > svg {
  border-radius: 50%;
  }

  &:hover {
    cursor: pointer;
  }
`;

const RestrictedDrop = styled(ActionButton)`
  color: ${(props) => (props.restricted ? 'inherit' : 'transparent')};
  border-radius: 10px;
  border: #CCC5B9 solid 1px;
  margin: 0 4px;

  &:hover{
    cursor: pointer;
  }
`;

const HandleDrag = styled(ActionButton)`
  border: 1px solid #8AC926;
  border-radius: 5px;
  background-color: ${(props) => (props.isRestrictedDrag && colors.disabled)};

  &:hover {
    cursor: inherit;
  }
`;

const ExpandButton = styled(ActionButton)`
  border: 1px solid #FFCA3A;
  background-color: ${(props) => (props.expandAll && colors.entity)};

  &:hover {
    cursor: pointer;
  }
`;

const DirectionButton = styled(ActionButton)`
  border: 1px solid #1982C4;
`;

const RemoveButton = styled(ActionButton)`
  border: 1px solid red;
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

const TitleContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h3`
  width: 100%;
`;

const Flex = styled.div`
  width: 100%;
  display: flex;
  height: 0;
  justify-content: space-between; 
  transform: translateY(-30px);
`;

const DropContainer = styled.div`
  background-color: ${(props) => (props.isDraggingOver ? colors.suitable : colors.EAD)};
  background-color: ${(props) => (props.isDropDisabled && !props.factory && colors.disabled)};

`;

Model.propTypes = {
  parentId: PropTypes.number.isRequired,
  item: PropTypes.shape().isRequired,
  allItems: PropTypes.shape().isRequired,
  checkDragDropCategory: PropTypes.func.isRequired,
};

export default Model;
