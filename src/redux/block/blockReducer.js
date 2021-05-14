/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import initialState from './initialState';

const blockSlice = createSlice({
  name: 'block',
  initialState,
  reducers: {
    changeType: {
      reducer: (state, { payload }) => {
        state.items[payload.id].type = payload.value;
      },
      prepare: (e, id) => {
        const { value } = e.target;
        return { payload: { value, id } };
      },
    },

    changeContent: {
      reducer: (state, { payload }) => {
        state.items[payload.id].content = payload.value;
      },
      prepare: (e, id) => {
        const { value } = e.target;
        return { payload: { value, id } };
      },
    },

    checkDirection: {
      reducer: (state, { payload }) => {
        state.items[payload.id].subdirection = payload.subdirection;
        state.items[payload.id].order = payload.order;
      },
      prepare: (id, allItems) => {
        const subdirection = (allItems[id].subdirection === 'column' ? 'row' : 'column');
        const order = (allItems[id].order === 'vertical' ? 'horizontal' : 'vertical');
        return ({
          payload: { id, subdirection, order },
        });
      },
    },

    removeItem: {
      reducer: (state, { payload }) => {
        const removeConnectedItems = (state, payload) => {
          if (state.items[payload.itemId].entity) {
            state.items[payload.itemId].cloneChildren.forEach((id) => {
              if (state.items[id.toString()]) {
                const payloadCloneChild = {
                  itemId: id,
                  parentId: state.items[id].parentId,
                  itemIndexInSource: state.items[id].parentIndex,
                  updateParent: true,
                };

                removeConnectedItems(state, payloadCloneChild);
              }
            });
          }

          state.items[payload.itemId].subItemIds.forEach((id) => {
            const payloadSubItem = {
              itemId: id,
            };
            removeConnectedItems(state, payloadSubItem);
          });

          if (payload.updateParent) {
            const index = state.items[payload.parentId.toString()]
              .subItemIds.findIndex((id) => payload.itemId.toString() === id.toString());
            state.items[payload.parentId.toString()]
              .subItemIds.splice(index, 1);
          }

          if (payload.itemId === state.restrictedDropId) {
            state.restrictedDropId = -1;
          }

          delete state.items[payload.itemId.toString()];
        };
        removeConnectedItems(state, payload);
      },
      prepare: (parentId, itemIndexInSource, itemId) => (
        {
          payload: {
            parentId, itemIndexInSource, itemId, updateParent: true,
          },
        }
      ),
    },

    addItem: {
      reducer: (state, { payload }) => {
        const newItem = {
          ...state.items[payload.itemId],
          subItemIds: [],
          factory: false,
          isDropDisabled: false,
        };
        state.items[payload.newId] = newItem;
        state.items[payload.containerId].subItemIds.splice(
          payload.containerIndex, 0, payload.newId,
        );
      },
      prepare: (itemId, containerId, containerIndex, newId) => (
        {
          payload: {
            itemId, containerId, containerIndex, newId,
          },
        }
      ),
    },

    moveItem: {
      reducer: (state, { payload }) => {
        state.items[payload.prevContainerId].subItemIds.splice(payload.prevContainerIndex, 1);
        state.items[payload.containerId].subItemIds.splice(
          payload.containerIndex, 0, parseInt(payload.itemId, 10),
        );
        if (state.items[payload.itemId].entityClone) {
          state.items[payload.itemId].parentId = payload.containerId;
          state.items[payload.itemId].parentIndex = payload.containerIndex;
        }
      },
      prepare: (itemId, containerId, containerIndex, prevContainerId, prevContainerIndex) => (
        {
          payload: {
            itemId, containerId, containerIndex, prevContainerId, prevContainerIndex,
          },
        }
      ),
    },

    updateRestrictedDropId: {
      reducer: (state, { payload }) => {
        const findParentIds = (state, id, parentIds, childId) => {
          if ((id.toString() === childId.toString())) {
            return parentIds;
          }
          let result = [];
          state.items[id].subItemIds.forEach((subItemId) => {
            if (result.length !== 0) {
              return [];
            }
            const updatedParentIds = [...parentIds, id];
            result = findParentIds(state, subItemId, updatedParentIds, childId);
            return [];
          });
          return result;
        };
        state.restrictedDropId = payload.itemId;
        if (payload.itemId === -1) {
          state.restrictedParentIds = [];
        } else {
          const EADId = 8;
          state.restrictedParentIds = findParentIds(state, EADId, [], state.restrictedDropId);
        }
      },
      prepare: (itemId, restrictedDropId) => {
        const resultId = itemId === restrictedDropId ? -1 : itemId;

        return (
          {
            payload: {
              itemId: resultId,
            },
          }
        );
      },
    },

    expandItem: {
      reducer: (state, { payload }) => {
        state.items[payload.id].expand = !state.items[payload.id].expand;
      },
      prepare: (id) => ({ payload: { id } }),
    },

    updateDraggedItemId: {
      reducer: (state, { payload }) => {
        const findChildIds = (items, id, childIds) => {
          const idString = id.toString();
          items[idString].subItemIds.forEach((subItemId) => {
            childIds.push(subItemId);
            findChildIds(items, subItemId, childIds);
          });
          return childIds;
        };
        state.draggedItemId = payload.id;
        if (payload.id === -1) {
          state.disabledChildIds = [];
        } else {
          state.disabledChildIds = findChildIds(state.items, payload.id, []);
        }
      },
      prepare: (id) => ({ payload: { id } }),
    },

    resetState: () => initialState,

    installState: () => {
      if (localStorage.block) {
        return JSON.parse(localStorage.block);
      }
      return initialState;
    },

    changeDragHandleClone: {
      reducer: (state, { payload }) => {
        state.dragHandleClone = payload.isClone;
      },
      prepare: (isClone) => ({ payload: { isClone } }),
    },

    cloneItem: {
      reducer: (state, { payload }) => {
        const newItem = {
          ...state.items[payload.itemId],
          subItemIds: [],
          category: 'entityClone',
          entity: false,
          entityClone: true,
          cloneParent: parseInt(payload.itemId, 10),
          color: 'orange',
          cloneable: false,
          parentId: parseInt(payload.containerId, 10),
          parentIndex: payload.containerIndex,
        };
        delete newItem.cloneChildren;
        delete newItem.entity;
        delete newItem.cloneable;

        state.items[payload.newId] = newItem;
        state.items[payload.containerId].subItemIds.splice(
          payload.containerIndex, 0, payload.newId,
        );
        state.items[payload.itemId].cloneChildren.push(payload.newId);
      },
      prepare: (itemId, containerId,
        containerIndex, newId) => (
        {
          payload: {
            itemId, containerId, containerIndex, newId,
          },
        }
      ),
    },

    idCountIncrease: (state) => { state.idCount += 1; },

  },

});

const { actions, reducer } = blockSlice;

export const {
  changeType,
  changeContent,
  checkDirection,
  removeItem,
  addItem,
  moveItem,
  updateRestrictedDropId,
  expandItem,
  updateDraggedItemId,
  resetState,
  installState,
  changeDragHandleClone,
  cloneItem,
  idCountIncrease,
} = actions;

export default reducer;
