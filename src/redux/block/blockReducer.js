/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const blockSlice = createSlice({
  name: 'block',
  initialState: {
    items: {
      0: {
        content: 'Initialize your project from ERD',
        subItemIds: [1, 8],
        order: 'vertical',
        subdirection: 'row',
        isDropDisabled: true,
        isDragDisabled: true,
      },
      1: {
        content: 'Elements',
        subItemIds: [2, 3, 4, 5, 6, 7],
        order: 'vertical',
        subdirection: 'column',
        isDropDisabled: true,
        isDragDisabled: true,
      },
      2: {
        content: 'has_many',
        subItemIds: [],
        order: 'vertical',
        subdirection: 'column',
        isDropDisabled: true,
        factory: true,
        association: true,
      },
      3: {
        content: 'has_one',
        subItemIds: [],
        order: 'vertical',
        subdirection: 'column',
        isDropDisabled: true,
        factory: true,
        association: true,
      },
      4: {
        content: 'belongs_to',
        subItemIds: [],
        order: 'vertical',
        subdirection: 'column',
        isDropDisabled: true,
        factory: true,
        association: true,
      },
      5: {
        content: 'has_and_belongs_to_many',
        subItemIds: [],
        order: 'vertical',
        subdirection: 'column',
        isDropDisabled: true,
        factory: true,
        association: true,
      },
      6: {
        content: 'attribute',
        subItemIds: [],
        attribute: true,
        order: 'vertical',
        subdirection: 'column',
        isDropDisabled: true,
        factory: true,
        type: 'string',
      },
      7: {
        content: 'entity',
        subItemIds: [],
        order: 'vertical',
        subdirection: 'column',
        factory: true,
        entity: true,
      },
      8: {
        content: 'ERD',
        subItemIds: [9],
        order: 'vertical',
        subdirection: 'column',
        isDragDisabled: true,
      },
      9: {
        content: 'entity',
        subItemIds: [],
        order: 'vertical',
        subdirection: 'column',
        factory: false,
        entity: true,
        isDropDisabled: false,
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
          payload.newId, 0, payload.newId,
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
} = actions;

export default reducer;
