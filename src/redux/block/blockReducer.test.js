/* eslint-disable global-require */
import { configureStore } from '@reduxjs/toolkit';

import blockReducer, {
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
  cloneItem,
  idCountIncrease,
  toggleExpandAll,
} from './blockReducer';

jest.mock('./initialState', () => {
  const testInitialState = require('./testInitialState');
  return testInitialState;
});

const localStorageMock = {
  block: JSON.stringify('mockBlock'),
};
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

const createTestStore = () => {
  const testStore = configureStore({
    reducer: { block: blockReducer },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    devTools: false,
  });
  return testStore;
};

let store;

describe('blockReducer', () => {
  beforeEach(() => {
    store = createTestStore();
  });

  describe('changeType', () => {
    it('changes type of block', () => {
      expect(store.getState().block.items['6'].type).toBe('string');

      store.dispatch(changeType({ target: { value: 'integer' } }, '6'));

      expect(store.getState().block.items['6'].type).toBe('integer');
    });
  });

  describe('changeContent', () => {
    it('changes type of block', () => {
      expect(store.getState().block.items['6'].content).toBe('attribute');

      store.dispatch(changeContent({ target: { value: 'mockAttribute' } }, '6'));

      expect(store.getState().block.items['6'].content).toBe('mockAttribute');
    });
  });

  describe('checkDirection', () => {
    it('toggles the order of items inside of any item ', () => {
      expect(store.getState().block.items['6'].order).toBe('vertical');
      expect(store.getState().block.items['6'].subdirection).toBe('column');
      const { items } = store.getState().block;
      store.dispatch(checkDirection('6', items));

      expect(store.getState().block.items['6'].order).toBe('horizontal');
      expect(store.getState().block.items['6'].subdirection).toBe('row');
    });
  });

  describe('removeItem', () => {
    it('removes any item from store and its id from its parent item', () => {
      expect(store.getState().block.items['1'].subItemIds).toStrictEqual([2, 3, 4, 5, 6, 7, 8]);

      store.dispatch(addItem('7', '9', 0, 11));
      store.dispatch(updateRestrictedDropId('11'));

      expect(store.getState().block.items['9'].subItemIds).toStrictEqual([11, 10]);
      expect(store.getState().block.restrictedDropId).toStrictEqual('11');

      store.dispatch(removeItem('9', '0', '11', true));

      expect(store.getState().block.items['11']).toBe(undefined);
      expect(store.getState().block.items['9'].subItemIds).toStrictEqual([10]);
      expect(store.getState().block.restrictedDropId).toStrictEqual(-1);
    });
  });

  describe('addItem', () => {
    it('adds any item from store and its id from its parent item', () => {
      expect(store.getState().block.items['10'].subItemIds).toStrictEqual([]);
      expect(store.getState().block.items['11']).toBe(undefined);

      store.dispatch(addItem('6', '10', 0, 11));

      expect(store.getState().block.items['10'].subItemIds).toStrictEqual([11]);
    });
  });

  describe('moveItem', () => {
    it('move any item from its parent item to another parent item ', () => {
      expect(store.getState().block.items['10'].subItemIds).toStrictEqual([]);
      expect(store.getState().block.items['11']).toBe(undefined);

      store.dispatch(addItem('6', '10', 0, 11));

      expect(store.getState().block.items['10'].subItemIds).toStrictEqual([11]);

      store.dispatch(addItem('7', '9', 0, 12));
      store.dispatch(moveItem('11', '12', 0, '10', 0));

      expect(store.getState().block.items['10'].subItemIds).toStrictEqual([]);
      expect(store.getState().block.items['11']).not.toBe(undefined);
      expect(store.getState().block.items['12'].subItemIds).toStrictEqual([11]);

      store.dispatch(addItem('8', '10', 0, 13));
      store.dispatch(cloneItem('12', '9', 0, 14));
      store.dispatch(moveItem('14', '13', 0, '9', 0));

      expect(store.getState().block.items['14'].parentId).toStrictEqual('13');
      expect(store.getState().block.items['14'].parentIndex).toStrictEqual(0);
    });
  });

  describe('updateRestrictedDropId', () => {
    it('updates restrictedDropId and restrictedParentIds', () => {
      store.dispatch(addItem('2', '10', 0, 11));
      store.dispatch(addItem('7', '11', 0, 12));

      expect(store.getState().block.restrictedDropId).toBe(-1);
      expect(store.getState().block.restrictedParentIds).toStrictEqual([]);

      store.dispatch(updateRestrictedDropId(11, -1));
      expect(store.getState().block.restrictedParentIds).toStrictEqual([9, 10]);
      expect(store.getState().block.restrictedDropId).toBe(11);

      store.dispatch(updateRestrictedDropId(11, 11));
      expect(store.getState().block.restrictedDropId).toBe(-1);
      expect(store.getState().block.restrictedParentIds).toStrictEqual([]);
    });
  });

  describe('expandItem', () => {
    it('toggles expanded and collided item', () => {
      store.dispatch(expandItem('10'));
      expect(store.getState().block.items['10'].expand).toBe(false);

      store.dispatch(expandItem('10'));
      expect(store.getState().block.items['10'].expand).toBe(true);
    });
  });

  describe('updateDraggedItemId', () => {
    it('updates draggedItemId and disabledChildIds', () => {
      store.dispatch(addItem('2', '10', 0, 11));
      store.dispatch(addItem(7, 11, 0, 12));
      store.dispatch(updateDraggedItemId('10'));

      expect(store.getState().block.draggedItemId).toBe('10');
      expect(store.getState().block.disabledChildIds).toStrictEqual([11, 12]);

      store.dispatch(updateDraggedItemId(-1));

      expect(store.getState().block.draggedItemId).toBe(-1);
      expect(store.getState().block.disabledChildIds).toStrictEqual([]);
    });
  });

  describe('resetState', () => {
    it('resets all data', () => {
      store.dispatch(addItem('2', '10', 0, 11));
      store.dispatch(addItem(7, 11, 0, 12));

      expect(Object.keys(store.getState().block.items).length).toBe(13);
      store.dispatch(resetState());
      expect(Object.keys(store.getState().block.items).length).toBe(11);
    });
  });

  describe('installState', () => {
    it('install saved state from localStorage', () => {
      store.dispatch(installState());
      expect(store.getState()).toStrictEqual({ block: 'mockBlock' });
    });
  });

  describe('cloneItem', () => {
    it('clones an item', () => {
      expect(store.getState().block.items['9'].subItemIds).toStrictEqual([10]);
      store.dispatch(cloneItem('10', '9', 0, 11));
      expect(store.getState().block.items['11']).toStrictEqual({
        category: 'entityClone',
        cloneParent: 10,
        content: 'entity',
        entityClone: true,
        expand: true,
        factory: false,
        isDropDisabled: false,
        order: 'horizontal',
        parentId: 9,
        parentIndex: 0,
        subItemIds: [],
        subdirection: 'row',
      });
      expect(store.getState().block.items['9'].subItemIds).toStrictEqual([11, 10]);
    });
  });

  describe('idCountIncrease', () => {
    it('increases idCount', () => {
      expect(store.getState().block.idCount).toBe(11);
      store.dispatch(idCountIncrease());
      expect(store.getState().block.idCount).toBe(12);
    });
  });

  describe('toggleExpandAll', () => {
    it('toggles expandAll', () => {
      expect(store.getState().block.expandAll).toBe(false);
      store.dispatch(toggleExpandAll());
      expect(store.getState().block.expandAll).toBe(true);
      store.dispatch(toggleExpandAll());
      expect(store.getState().block.expandAll).toBe(false);
    });
  });
});
