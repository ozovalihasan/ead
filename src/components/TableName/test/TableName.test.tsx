import {TableName} from '../TableName';
import { render } from '@testing-library/react';
// import create from 'zustand';

let renderReadyComponent: JSX.Element;

beforeEach(() => {
  renderReadyComponent = (
    <TableName tableId={"1"}></TableName>
  );
});

describe('<TableName />', () => {
  it('renders correctly', () => {
    const renderedContainer = render(renderReadyComponent );
    expect(renderedContainer).toMatchSnapshot();
  });
  
});