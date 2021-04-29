/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const blockSlice = createSlice({
  name: 'block',
  initialState: {
    items: {
      0: {
        content: 'Initialize your project from ERD',
        subItemIds: [1, 7],
        order: 'vertical',
        subdirection: 'row',
        isDropDisabled: true,
        isDragDisabled: true,
        expand: true,
      },
      1: {
        content: 'Elements',
        subItemIds: [2, 3, 4, 5, 6],
        order: 'vertical',
        subdirection: 'column',
        isDropDisabled: true,
        isDragDisabled: true,
        expand: true,
      },
      2: {
        content: 'has_many',
        subItemIds: [],
        order: 'vertical',
        subdirection: 'column',
        isDropDisabled: true,
        factory: true,
        association: true,
        expand: true,
      },
      3: {
        content: 'has_one',
        subItemIds: [],
        order: 'vertical',
        subdirection: 'column',
        isDropDisabled: true,
        factory: true,
        association: true,
        expand: true,
      },
      4: {
        content: 'belongs_to',
        subItemIds: [],
        order: 'vertical',
        subdirection: 'column',
        isDropDisabled: true,
        factory: true,
        association: true,
        expand: true,
      },
      5: {
        content: 'attribute',
        subItemIds: [],
        attribute: true,
        order: 'vertical',
        subdirection: 'column',
        isDropDisabled: true,
        factory: true,
        type: 'string',
        expand: true,
      },
      6: {
        content: 'entity',
        subItemIds: [],
        order: 'vertical',
        subdirection: 'column',
        factory: true,
        entity: true,
        expand: true,
      },
      7: {
        content: 'ERD',
        subItemIds: [8],
        order: 'vertical',
        subdirection: 'column',
        isDragDisabled: true,
        expand: true,
      },
      8: {
        content: 'entity',
        subItemIds: [],
        order: 'vertical',
        subdirection: 'column',
        factory: false,
        entity: true,
        isDropDisabled: false,
        expand: true,
      },
    },
    restrictedDropId: -1,
  },
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
      prepare: (id, subdirection, order) => ({
        payload: { id, subdirection, order },
      }),
    },

    removeItem: {
      reducer: (state, { payload }) => {
        state.items[payload.parentId].subItemIds.splice(payload.itemIndexInSource, 1);
        delete state.items[payload.itemId];
      },
      prepare: (parentId, itemIndexInSource, itemId) => (
        {
          payload: {
            parentId, itemIndexInSource, itemId,
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
        state.restrictedDropId = payload.itemId;
      },
      prepare: (itemId) => (
        {
          payload: {
            itemId,
          },
        }
      ),
    },

    expandItem: {
      reducer: (state, { payload }) => {
        state.items[payload.id].expand = !state.items[payload.id].expand;
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
} = actions;

export default reducer;
