/* eslint-disable global-require */
import { configureStore } from '@reduxjs/toolkit';
import { screen, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';

import userEvent from '@testing-library/user-event';
import blockReducer from '../../redux/block/blockReducer';
import App from '../App';

jest.mock('../saveJSON', () => jest.fn());
const saveJSONClick = require('../saveJSON');

jest.mock('../../redux/block/initialState', () => {
  const testInitialState = {
    items: { 0: { content: 'mock content' } },
    dragDropCategory: { },
  };
  return testInitialState;
});

jest.mock('../Model', () => {
  const PropTypes = require('prop-types');
  const MockModel = ({
    item,
    allItems,
    checkDragDropCategory,
  }) => (
    <div>
      Mock Model
      {JSON.stringify(allItems)}
      hasan
      {JSON.stringify(item)}
      hasan
      {JSON.stringify(checkDragDropCategory)}
    </div>
  );

  MockModel.propTypes = {
    item: PropTypes.shape().isRequired,
    allItems: PropTypes.shape().isRequired,
    checkDragDropCategory: PropTypes.func.isRequired,
  };
  MockModel.displayName = 'MockModel';
  return MockModel;
});

const localStorageMock = {};
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
let renderReadyComponent;
describe('blockReducer', () => {
  beforeEach(() => {
    store = createTestStore();
    store.dispatch = jest.fn();

    renderReadyComponent = (
      <Provider store={store}>
        <App />
      </Provider>
    );
  });

  describe('<App />', () => {
    it('renders Model component', () => {
      render(renderReadyComponent);
      expect(screen.getByText(/Mock Model/i)).toBeInTheDocument();
      expect(screen.getByText(/{"0":{"content":"mock content"}}/i)).toBeInTheDocument();
      expect(screen.getByText(/{"content":"mock content"}/i)).toBeInTheDocument();
    });

    it('calls saveJSON function if \'Download EAD\' button is clicked', () => {
      render(renderReadyComponent);
      userEvent.click(screen.getByText(/Download EAD/i));
      expect(saveJSONClick.mock.calls.length).toBe(1);
    });

    it('save state to local storage if \'Save\' button is clicked', () => {
      render(renderReadyComponent);
      userEvent.click(screen.getByText('Save'));
      expect(localStorageMock.block === JSON.stringify(store.getState().block)).toBe(true);
    });

    it('dispatches installState action if \'Install Saved Data\' button is clicked', () => {
      render(renderReadyComponent);
      userEvent.click(screen.getByText('Install Saved Data'));
      expect(store.dispatch).toHaveBeenCalledTimes(1);
      expect(store.dispatch.mock.calls[0][0].type).toBe('block/installState');
    });

    it('dispatches resetState action if \'Install Saved Data\' button is clicked', () => {
      render(renderReadyComponent);
      userEvent.click(screen.getByText('Reset'));
      expect(store.dispatch).toHaveBeenCalledTimes(1);
      expect(store.dispatch.mock.calls[0][0].type).toBe('block/resetState');
    });

    it('renders correctly', () => {
      const renderedContainer = render(renderReadyComponent);
      expect(renderedContainer).toMatchSnapshot();
    });
  });
});
