const testInitialState = {
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
      content: ':through',
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
};

export default testInitialState;
