const modelData = {

  // Facilitate reordering of the columns
  items: {
    0: {
      content: 'Initialize your project from ERD',
      subItemIds: [1, 6],
      order: 'vertical',
      subdirection: 'row',
      isDropDisabled: true,
      isDragDisabled: true,
    },
    1: {
      content: 'Associations',
      subItemIds: [2, 3, 4, 5],
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
    },
    3: {
      content: 'has_one',
      subItemIds: [],
      order: 'vertical',
      subdirection: 'column',
      isDropDisabled: true,
      factory: true,
    },
    4: {
      content: 'belongs_to',
      subItemIds: [],
      order: 'vertical',
      subdirection: 'column',
      isDropDisabled: true,
      factory: true,
    },
    5: {
      content: 'entity',
      subItemIds: [],
      order: 'vertical',
      subdirection: 'column',
      isDropDisabled: true,
      factory: true,
    },
    6: {
      content: 'ERD',
      subItemIds: [7, 8, 9, 13],
      order: 'vertical',
      subdirection: 'column',
      isDragDisabled: true,
    },
    7: {
      content: 'has_one',
      subItemIds: [10, 11, 12],
      order: 'horizontal',
      subdirection: 'row',
    },
    8: {
      content: 'entity',
      subItemIds: [],
      order: 'vertical',
      subdirection: 'column',
    },
    9: {
      content: 'belongs_to',
      subItemIds: [],
      order: 'vertical',
      subdirection: 'column',
    },
    10: {
      content: 'entity1',
      subItemIds: [],
      order: 'vertical',
      subdirection: 'column',
    },
    11: {
      content: 'entity2',
      subItemIds: [],
      order: 'vertical',
      subdirection: 'column',
    },
    12: {
      content: 'entity2',
      subItemIds: [],
      order: 'vertical',
      subdirection: 'column',
    },
    13: {
      content: 'has_one',
      subItemIds: [14],
      order: 'horizontal',
      subdirection: 'row',
    },
    14: {
      content: 'entity',
      subItemIds: [],
      order: 'vertical',
      subdirection: 'column',
    },
  },

};

export default modelData;
