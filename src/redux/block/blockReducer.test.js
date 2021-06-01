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
  toggleCompactMode,
} from './blockReducer';
import testInitialState from './testInitialState';

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
      expect(store.getState().block.items['14'].type).toBe('string');

      store.dispatch(changeType({ target: { value: 'integer' } }, '14'));

      expect(store.getState().block.items['14'].type).toBe('integer');
    });
  });

  describe('changeContent', () => {
    it('changes type of block', () => {
      expect(store.getState().block.items['14'].content).toBe('name');

      store.dispatch(changeContent({ target: { value: 'mockAttribute' } }, '14'));

      expect(store.getState().block.items['14'].content).toBe('mockAttribute');
    });
  });

  describe('checkDirection', () => {
    it('toggles the order of items inside of any item ', () => {
      expect(store.getState().block.items['11'].order).toBe('horizontal');
      expect(store.getState().block.items['11'].subdirection).toBe('row');

      const { items } = store.getState().block;
      store.dispatch(checkDirection('11', items));

      expect(store.getState().block.items['11'].order).toBe('vertical');
      expect(store.getState().block.items['11'].subdirection).toBe('column');
    });
  });

  describe('removeItem', () => {
    it('resets restrictedDropId if the id of deleted item is equal to restrictedDropId', () => {
      store.dispatch(updateRestrictedDropId('13'));
      store.dispatch(removeItem('10', 0, '13', true));

      expect(store.getState().block.restrictedDropId).toStrictEqual(-1);
    });

    it('removes any item and its clone children with their children from store if the removed item is real', () => {
      expect(store.getState().block.items['13'].cloneChildren.length).toBe(1);
      expect(store.getState().block.items['13']).not.toBe(undefined);
      expect(store.getState().block.items['17'].subItemIds.length).toBe(1);
      expect(store.getState().block.items['17']).not.toBe(undefined);
      expect(Object.keys(store.getState().block.items).length).toBe(25);

      store.dispatch(removeItem('10', 0, '13', true));

      expect(store.getState().block.items['13']).toBe(undefined);
      expect(store.getState().block.items['17']).toBe(undefined);
      expect(Object.keys(store.getState().block.items).length).toBe(18);
    });

    it('removes ids of any item and its clone children from their parents if the removed item is real', () => {
      expect(store.getState().block.items['10'].subItemIds).toStrictEqual([16, 13, 12]);
      expect(store.getState().block.items['11'].subItemIds).toStrictEqual([24, 23, 17]);

      store.dispatch(removeItem('10', 0, '13', true));

      expect(store.getState().block.items['10'].subItemIds).toStrictEqual([16, 12]);
      expect(store.getState().block.items['11'].subItemIds).toStrictEqual([24, 23]);
    });
  });

  describe('addItem', () => {
    it('adds any item from store and its id from its parent item', () => {
      expect(store.getState().block.items['9'].subItemIds).toStrictEqual([10, 11]);
      expect(store.getState().block.items[testInitialState.idCount.toString()]).toBe(undefined);

      store.dispatch(addItem(5, 9, 0, 26));

      expect(store.getState().block.items['9'].subItemIds).toStrictEqual([26, 10, 11]);
    });
  });

  describe('moveItem', () => {
    it('move any item from its parent item to another parent item ', () => {
      expect(store.getState().block.items['25'].subItemIds).toStrictEqual([]);
      expect(store.getState().block.items['18'].subItemIds).toStrictEqual([19]);

      store.dispatch(moveItem('19', '25', 0, '18', 0));

      expect(store.getState().block.items['25'].subItemIds).toStrictEqual([19]);
      expect(store.getState().block.items['18'].subItemIds).toStrictEqual([]);
    });
  });

  describe('updateRestrictedDropId', () => {
    it('updates restrictedDropId and restrictedParentIds', () => {
      expect(store.getState().block.restrictedDropId).toBe(-1);
      expect(store.getState().block.restrictedParentIds).toStrictEqual([]);

      store.dispatch(updateRestrictedDropId('19', -1));

      expect(store.getState().block.restrictedParentIds).toStrictEqual([9, 11, 17, 18]);
      expect(store.getState().block.restrictedDropId).toBe('19');

      store.dispatch(updateRestrictedDropId('19', '19'));

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
      expect(store.getState().block.draggedItemId).toBe(-1);
      expect(store.getState().block.disabledChildIds).toStrictEqual([]);

      store.dispatch(updateDraggedItemId('10'));

      expect(store.getState().block.draggedItemId).toBe('10');
      expect(store.getState().block.disabledChildIds).toStrictEqual([16, 13, 14, 12, 15]);

      store.dispatch(updateDraggedItemId(-1));

      expect(store.getState().block.draggedItemId).toBe(-1);
      expect(store.getState().block.disabledChildIds).toStrictEqual([]);
    });
  });

  describe('resetState', () => {
    it('resets all data', () => {
      expect(Object.keys(store.getState().block.items).length).toBe(25);

      store.dispatch(addItem(5, 9, 0, 26));

      expect(Object.keys(store.getState().block.items).length).toBe(26);

      store.dispatch(resetState());

      expect(Object.keys(store.getState().block.items).length).toBe(25);
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
      expect(store.getState().block.items['11'].subItemIds).toStrictEqual([24, 23, 17]);

      store.dispatch(cloneItem('16', '11', 0, 26));

      expect(store.getState().block.items['26']).toStrictEqual({
        category: 'entityClone',
        cloneParent: 16,
        content: 'patient',
        entityClone: true,
        expand: true,
        factory: false,
        isDropDisabled: false,
        order: 'horizontal',
        parentId: 11,
        parentIndex: 0,
        subItemIds: [],
        subdirection: 'row',
      });
      expect(store.getState().block.items['11'].subItemIds).toStrictEqual([26, 24, 23, 17]);
    });
  });

  describe('idCountIncrease', () => {
    it('increases idCount', () => {
      expect(store.getState().block.idCount).toBe(26);

      store.dispatch(idCountIncrease());

      expect(store.getState().block.idCount).toBe(27);
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

  describe('toggleCompactMode', () => {
    it('toggles compactMode', () => {
      expect(store.getState().block.compactMode).toBe(false);

      store.dispatch(toggleCompactMode());

      expect(store.getState().block.compactMode).toBe(true);

      store.dispatch(toggleCompactMode());

      expect(store.getState().block.compactMode).toBe(false);
    });
  });
});
