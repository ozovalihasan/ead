const modelData = {

  // Facilitate reordering of the columns
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
      attribute: true,
      subItemIds: [],
      order: 'vertical',
      subdirection: 'column',
      isDropDisabled: true,
      factory: true,
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
      subItemIds: [],
      order: 'vertical',
      subdirection: 'column',
      isDragDisabled: true,
    },

  },

};

export default modelData;
