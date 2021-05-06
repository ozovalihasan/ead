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
          state.items[payload.itemId].subItemIds.forEach((id, index) => {
            const payloadSubItem = {
              parentId: payload.itemId,
              itemIndexInSource: index,
              itemId: id,
            };
            removeConnectedItems(state, payloadSubItem);
          });

          if (payload.updateParent) {
            state.items[payload.parentId.toString()]
              .subItemIds.splice(payload.itemIndexInSource, 1);
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
} = actions;

export default reducer;
