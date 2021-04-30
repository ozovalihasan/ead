/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const removeConnectedItems = (state, payload) => {
  state.items[payload.itemId].subItemIds.forEach((id, index) => {
    const payloadSubItem = {
      parentId: payload.itemId,
      itemIndexInSource: index,
      itemId: id,
    };
    removeConnectedItems(state, payloadSubItem);
  });

  if (state.restrictedDropId === parseInt(payload.itemId, 10)) {
    state.restrictedDropId = -1;
  }

  if (payload.updateParent) {
    state.items[payload.parentId.toString()].subItemIds.splice(payload.itemIndexInSource, 1);
  }
  delete state.items[payload.itemId.toString()];
};

const blockSlice = createSlice({
  name: 'block',
  initialState: {
    items: {
      0: {
        content: 'Initialize your project from EAD',
        subItemIds: [1, 8],
        order: 'vertical',
        subdirection: 'row',
        isDropDisabled: true,
        isDragDisabled: true,
        expand: true,
        color: '##fff',
      },
      1: {
        content: 'Elements',
        subItemIds: [2, 3, 4, 5, 6, 7],
        order: 'vertical',
        subdirection: 'column',
        isDropDisabled: true,
        isDragDisabled: true,
        expand: true,
        factory: true,
        color: '##fff',
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
        color: '#CAF0F8',
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
        color: '#CAF0F8',
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
        color: '#CAF0F8',
      },
      5: {
        content: 'attribute container',
        subItemIds: [],
        order: 'horizontal',
        subdirection: 'row',
        isDropDisabled: true,
        factory: true,
        type: 'string',
        expand: true,
        attributeContainer: true,
        color: '#90E0EF',
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
        expand: true,
        color: '#90E0EF',
      },
      7: {
        content: 'entity',
        subItemIds: [],
        order: 'horizontal',
        subdirection: 'row',
        factory: true,
        entity: true,
        expand: true,
        isDropDisabled: true,
        color: '#00B4D8',
      },
      8: {
        content: 'EAD',
        subItemIds: [9],
        order: 'vertical',
        subdirection: 'column',
        isDragDisabled: true,
        expand: true,
        color: '##fff',
      },
      9: {
        content: 'entity',
        subItemIds: [],
        order: 'horizontal',
        subdirection: 'row',
        factory: false,
        entity: true,
        expand: true,
        isDropDisabled: false,
        color: '#00B4D8',
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
        state.restrictedDropId = payload.itemId;
      },
      prepare: (itemId, restrictedDropId) => {
        const resultId = (itemId === restrictedDropId) ? -1 : itemId;

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
