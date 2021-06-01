/* eslint-disable global-require */
// import { configureStore } from '@reduxjs/toolkit';
import { screen, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';

import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import {
  faArrowsAlt, faExpandAlt, faCompressAlt, faEllipsisH, faEllipsisV, faFlag, faClone,
  faPlus, faPlaneDeparture, faPlaneArrival, faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';

import userEvent from '@testing-library/user-event';
import configureStore from 'redux-mock-store';
import Model from '../Model';
import testInitialState from '../../redux/block/testInitialState';

library.add(faArrowsAlt, faExpandAlt, faCompressAlt, faEllipsisH,
  faEllipsisV, faFlag, faClone, faGithub, faPlus, faPlaneDeparture, faPlaneArrival, faTimes);

const mockStore = configureStore();
let store;
let { items } = testInitialState;
const { dragDropCategory } = testInitialState;
const checkDragDropCategory = (dragId, dropId) => (
  dragDropCategory[items[dragId].category].includes(items[dropId].category)
);

const startingId = 0;

let renderReadyComponent;
let initStoreReducer;

const createStore = (initValues) => {
  initStoreReducer = { block: initValues };
  store = mockStore(initStoreReducer);
  items = store.getState().block.items;

  renderReadyComponent = (
    <Provider store={store}>

      <DragDropContext>
        <Droppable
          droppableId="OuterDrop"
        >
          { (provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              <Model
                parentId={startingId}
                item={items[startingId]}
                allItems={items}
                index={startingId}
                checkDragDropCategory={checkDragDropCategory}
              />
              {provided.placeholder}
            </div>
          )}

        </Droppable>
      </DragDropContext>
    </Provider>
  );

  store.dispatch = jest.fn();
};

describe('<Model  />', () => {
  beforeEach(() => {
    createStore(testInitialState);
  });

  it('renders all sub-containers correctly', () => {
    render(renderReadyComponent);
    expect(screen.getAllByTestId(/subContainer/).length).toBe(22);
  });

  it('renders a button to dispatch with block/checkDirection', () => {
    render(renderReadyComponent);

    expect(store.dispatch).toHaveBeenCalledTimes(0);
    expect(screen.getAllByTitle(/Align items vertically or horizontally/i).length).toBe(14);

    userEvent.click(screen.getAllByTitle(/Align items vertically or horizontally/i)[0]);

    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch.mock.calls[0][0].type).toBe('block/checkDirection');
  });

  it('renders a button to dispatch with block/addItem and block/idCountIncrease', () => {
    render(renderReadyComponent);

    expect(store.dispatch).toHaveBeenCalledTimes(0);
    expect(screen.getAllByTitle(/Add an allowed block/i).length).toBe(5);

    userEvent.click(screen.getAllByTitle(/Add an allowed block/i)[0]);

    expect(store.dispatch).toHaveBeenCalledTimes(2);
    expect(store.dispatch.mock.calls[0][0].type).toBe('block/addItem');
    expect(store.dispatch.mock.calls[0][0].payload).toStrictEqual({
      containerId: 9, containerIndex: 0, itemId: 5, newId: 26,
    });
    expect(store.dispatch.mock.calls[1][0].type).toBe('block/idCountIncrease');

    userEvent.click(screen.getAllByTitle(/Add an allowed block/i)[1]);

    expect(store.dispatch.mock.calls[2][0].payload).toStrictEqual({
      containerId: 10, containerIndex: 0, itemId: 7, newId: 26,
    });

    userEvent.click(screen.getAllByTitle(/Add an allowed block/i)[4]);

    expect(store.dispatch.mock.calls[4][0].payload).toStrictEqual({
      containerId: 12, containerIndex: 0, itemId: 6, newId: 26,
    });
  });

  it('renders a button to dispatch with block/addItem and block/idCountIncrease in "attribute" factory block', () => {
    testInitialState.restrictedDropId = 16;
    createStore(testInitialState);
    render(renderReadyComponent);

    expect(store.dispatch).toHaveBeenCalledTimes(0);

    userEvent.click(screen.getAllByTitle(/Add this item into restricted container/i)[0]);

    expect(store.dispatch).toHaveBeenCalledTimes(2);
    expect(store.dispatch.mock.calls[0][0].type).toBe('block/addItem');
    expect(store.dispatch.mock.calls[0][0].payload).toStrictEqual({
      containerId: 16, containerIndex: 0, itemId: 6, newId: 26,
    });
    expect(store.dispatch.mock.calls[1][0].type).toBe('block/idCountIncrease');
  });

  it('renders a button to dispatch with block/addItem and block/idCountIncrease in "entity" factory block', () => {
    testInitialState.restrictedDropId = 10;
    createStore(testInitialState);
    render(renderReadyComponent);

    expect(store.dispatch).toHaveBeenCalledTimes(0);

    userEvent.click(screen.getAllByTitle(/Add this item into restricted container/i)[0]);

    expect(store.dispatch).toHaveBeenCalledTimes(2);
    expect(store.dispatch.mock.calls[0][0].type).toBe('block/addItem');
    expect(store.dispatch.mock.calls[0][0].payload).toStrictEqual({
      containerId: 10, containerIndex: 0, itemId: 7, newId: 26,
    });
    expect(store.dispatch.mock.calls[1][0].type).toBe('block/idCountIncrease');
  });

  it('renders a button to dispatch with block/addItem and block/idCountIncrease in "entities & associations" factory block', () => {
    testInitialState.restrictedDropId = 9;
    createStore(testInitialState);
    render(renderReadyComponent);

    expect(store.dispatch).toHaveBeenCalledTimes(0);

    userEvent.click(screen.getAllByTitle(/Add this item into restricted container/i)[0]);

    expect(store.dispatch).toHaveBeenCalledTimes(2);
    expect(store.dispatch.mock.calls[0][0].type).toBe('block/addItem');
    expect(store.dispatch.mock.calls[0][0].payload).toStrictEqual({
      containerId: 9, containerIndex: 0, itemId: 5, newId: 26,
    });
    expect(store.dispatch.mock.calls[1][0].type).toBe('block/idCountIncrease');
  });

  it('renders a button to dispatch with block/addItem, block/updateRestrictedDropId and block/idCountIncrease in factory blocks of associations', () => {
    testInitialState.restrictedDropId = 24;
    createStore(testInitialState);
    render(renderReadyComponent);

    expect(store.dispatch).toHaveBeenCalledTimes(0);

    userEvent.click(screen.getAllByTitle(/Add this item into restricted container/i)[0]);

    expect(store.dispatch).toHaveBeenCalledTimes(3);
    expect(store.dispatch.mock.calls[0][0].type).toBe('block/addItem');
    expect(store.dispatch.mock.calls[1][0].type).toBe('block/updateRestrictedDropId');
    expect(store.dispatch.mock.calls[2][0].type).toBe('block/idCountIncrease');

    expect(store.dispatch.mock.calls[0][0].payload).toStrictEqual({
      containerId: 24, containerIndex: 0, itemId: 2, newId: 26,
    });

    userEvent.click(screen.getAllByTitle(/Add this item into restricted container/i)[1]);

    expect(store.dispatch.mock.calls[3][0].payload).toStrictEqual({
      containerId: 24, containerIndex: 0, itemId: 3, newId: 26,
    });

    userEvent.click(screen.getAllByTitle(/Add this item into restricted container/i)[2]);

    expect(store.dispatch.mock.calls[6][0].payload).toStrictEqual({
      containerId: 24, containerIndex: 0, itemId: 4, newId: 26,
    });
  });

  it('renders a handler to move any block', () => {
    render(renderReadyComponent);

    expect(screen.getAllByTitle(/Drag to move this item/i).length).toBe(22);
  });

  it('renders a button to dispatch with block/expandItem', () => {
    render(renderReadyComponent);

    expect(store.dispatch).toHaveBeenCalledTimes(0);
    expect(screen.getAllByTitle(/Expand or shrink this item/i).length).toBe(13);

    userEvent.click(screen.getAllByTitle(/Expand or shrink this item/i)[0]);

    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch.mock.calls[0][0].type).toBe('block/expandItem');
  });

  it('renders a button to dispatch with block/updateRestrictedDropId', () => {
    render(renderReadyComponent);
    expect(store.dispatch).toHaveBeenCalledTimes(0);

    expect(screen.getAllByTitle(/Click to drop any item into this element/i).length).toBe(14);

    userEvent.click(screen.getAllByTitle(/Click to drop any item into this element/i)[0]);

    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch.mock.calls[0][0].type).toBe('block/updateRestrictedDropId');
  });

  it('renders a button to dispatch with block/removeItem', () => {
    render(renderReadyComponent);
    expect(store.dispatch).toHaveBeenCalledTimes(0);

    expect(screen.getAllByTitle(/Remove this block/i).length).toBe(15);

    userEvent.click(screen.getAllByTitle(/Remove this block/i)[0]);
    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch.mock.calls[0][0].type).toBe('block/removeItem');
    expect(store.dispatch.mock.calls[0][0].payload).toStrictEqual({
      itemId: 10, itemIndexInSource: 0, parentId: 9, updateParent: true,
    });
  });

  it('renders a button to dispatch with block/cloneItem, block/updateRestrictedDropId and block/idCountIncrease', () => {
    testInitialState.restrictedDropId = 25;
    createStore(testInitialState);
    render(renderReadyComponent);

    expect(store.dispatch).toHaveBeenCalledTimes(0);
    expect(screen.getAllByTitle(/Clone this entity/i).length).toBe(6);

    userEvent.click(screen.getAllByTitle(/Clone this entity/i)[0]);

    expect(store.dispatch).toHaveBeenCalledTimes(3);
    expect(store.dispatch.mock.calls[0][0].type).toBe('block/cloneItem');
    expect(store.dispatch.mock.calls[1][0].type).toBe('block/updateRestrictedDropId');
    expect(store.dispatch.mock.calls[2][0].type).toBe('block/idCountIncrease');
  });

  it("doesn't render the rest part of any item if item.expand is false", () => {
    testInitialState.items['17'].expand = false;
    createStore(testInitialState);
    render(renderReadyComponent);

    expect(screen.getByText('1 item(s) collided')).toBeInTheDocument();
  });

  it('renders correctly', () => {
    const renderedContainer = render(renderReadyComponent);
    expect(renderedContainer).toMatchSnapshot();
  });
});
