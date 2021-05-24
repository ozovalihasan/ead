/* eslint-disable global-require */
// import { configureStore } from '@reduxjs/toolkit';
import { screen, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';

import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import {
  faArrowsAlt, faExpandAlt, faCompressAlt, faEllipsisH, faEllipsisV, faFlag, faClone,
} from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';

import userEvent from '@testing-library/user-event';
import configureStore from 'redux-mock-store';
import Model from '../Model';
import testInitialState from '../../redux/block/testInitialState';

library.add(faArrowsAlt, faExpandAlt, faCompressAlt, faEllipsisH, faEllipsisV, faFlag, faClone);

const initStoreReducer = { block: testInitialState };
const mockStore = configureStore();
const store = mockStore(initStoreReducer);
store.dispatch = jest.fn();

const checkDragDropCategory = jest.fn();

const startingId = 0;

let renderReadyComponent;
let items;
describe('blockReducer', () => {
  beforeEach(() => {
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
  });

  describe('<Model  />', () => {
    it('renders all sub-containers correctly', () => {
      render(renderReadyComponent);
      expect(screen.getAllByTestId('subContainer').length).toBe(10);
    });

    it('renders a button to dispatch with block/checkDirection', () => {
      render(renderReadyComponent);

      expect(store.dispatch).toHaveBeenCalledTimes(0);

      userEvent.click(screen.getAllByTitle(/Align items vertically or horizontally/i)[0]);

      expect(store.dispatch).toHaveBeenCalledTimes(1);
      expect(store.dispatch.mock.calls[0][0].type).toBe('block/checkDirection');
    });

    it('renders a button to dispatch with block/checkDirection', () => {
      render(renderReadyComponent);
      expect(store.dispatch).toHaveBeenCalledTimes(0);

      userEvent.click(screen.getAllByTitle(/Expand or shrink this item/i)[0]);

      expect(store.dispatch).toHaveBeenCalledTimes(1);
      expect(store.dispatch.mock.calls[0][0].type).toBe('block/expandItem');
    });

    it('renders a button to dispatch with block/updateRestrictedDropId', () => {
      render(renderReadyComponent);
      expect(store.dispatch).toHaveBeenCalledTimes(0);

      userEvent.click(screen.getAllByTitle(/Click to drop any item into this element/i)[0]);

      expect(store.dispatch).toHaveBeenCalledTimes(1);
      expect(store.dispatch.mock.calls[0][0].type).toBe('block/updateRestrictedDropId');
    });

    it('renders a button to dispatch with block/cloneItem and block/idCountIncrease', () => {
      render(renderReadyComponent);
      expect(store.dispatch).toHaveBeenCalledTimes(0);

      userEvent.click(screen.getAllByTitle(/Click to clone this entity/i)[0]);

      expect(store.dispatch).toHaveBeenCalledTimes(2);
      expect(store.dispatch.mock.calls[0][0].type).toBe('block/cloneItem');
      expect(store.dispatch.mock.calls[1][0].type).toBe('block/idCountIncrease');
    });

    it("doesn't render the rest part of any item if item.expand is false", () => {
      items['10'].expand = false;
      render(
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
        </Provider>,
      );

      expect(screen.getByText('0 item(s) collided')).toBeInTheDocument();
      items['10'].expand = true;
    });

    it('renders correctly', () => {
      const renderedContainer = render(renderReadyComponent);
      expect(renderedContainer).toMatchSnapshot();
    });
  });
});
