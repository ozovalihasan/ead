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

const findChildIds = (items, id, childIds) => {
  const idString = id.toString();
  items[idString].subItemIds.forEach((subItemId) => {
    childIds.push(subItemId);
    findChildIds(items, subItemId, childIds);
  });
  return childIds;
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
        color: '#FFF',
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
        color: '#FFF',
        category: 'factory',
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
        color: '#C7FDED',
        category: 'association',
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
        color: '#C7FDED',
        category: 'association',
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
        color: '#C7FDED',
        category: 'association',
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
        color: '#AAFAE9',
        category: 'attributeContainer',
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
        color: '#AAFAE9',
        category: 'attribute',
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
        color: '#94F6EA',
        category: 'entity',
      },
      8: {
        content: 'EAD',
        subItemIds: [9],
        order: 'vertical',
        subdirection: 'column',
        isDragDisabled: true,
        expand: true,
        color: '#FFF',
        category: 'EAD',
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
        color: '#94F6EA',
        category: 'entity',
      },
    },
    restrictedDropId: -1,
    draggedItemId: -1,
    dragDropCategory: {
      entity: ['EAD', 'association'],
      association: ['entity'],
      attribute: ['entity', 'attributeContainer'],
      attributeContainer: ['entity'],
      EAD: ['entity'],
      factory: [],
    },
    restrictedParentIds: [],
    disabledChildIds: [],
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
