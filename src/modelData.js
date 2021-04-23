const modelData = {

  // Facilitate reordering of the columns
  items: {
    0: {
      id: '0',
      content: 'Initialize your project from ERD',
      subItemIds: [1, 6],
      order: 'vertical',
      subdirection: 'row',
      isDropDisabled: true,
      isDragDisabled: true,
    },
    1: {
      id: '1',
      content: 'Associations',
      subItemIds: [2, 3, 4, 5],
      order: 'vertical',
      subdirection: 'column',
      isDropDisabled: true,
      isDragDisabled: true,
    },
    2: {
      id: '2',
      content: 'has_many',
      subItemIds: [],
      order: 'vertical',
      subdirection: 'column',
    },
    3: {
      id: '3',
      content: 'has_one',
      subItemIds: [],
      order: 'vertical',
      subdirection: 'column',
    },
    4: {
      id: '4',
      content: 'belongs_to',
      subItemIds: [],
      order: 'vertical',
      subdirection: 'column',
    },
    5: {
      id: '5',
      content: 'entity',
      subItemIds: [],
      order: 'vertical',
      subdirection: 'column',
    },
    6: {
      id: '6',
      content: 'ERD',
      subItemIds: [7, 8, 9],
      order: 'vertical',
      subdirection: 'column',
      isDropDisabled: true,
      isDragDisabled: true,
    },
    7: {
      id: '7',
      content: 'has_one',
      subItemIds: [10, 11],
      order: 'vertical',
      subdirection: 'column',
    },
    8: {
      id: '8',
      content: 'entity',
      subItemIds: [],
      order: 'vertical',
      subdirection: 'column',
    },
    9: {
      id: '9',
      content: 'belongs_to',
      subItemIds: [],
      order: 'vertical',
      subdirection: 'column',
    },
    10: {
      id: '10',
      content: 'entity1',
      subItemIds: [],
      order: 'vertical',
      subdirection: 'column',
    },
    11: {
      id: '11',
      content: 'entity2',
      subItemIds: [],
      order: 'vertical',
      subdirection: 'column',
    },
  },

};

export default modelData;
