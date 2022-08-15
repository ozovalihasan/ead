import {TableName} from '../TableName';
import { render, screen, act, renderHook } from "@testing-library/react";
import useStore from 'zustandStore/store';

let renderReadyComponent: JSX.Element;

beforeEach(() => {
  renderReadyComponent = (
    <TableName tableId={"1"}></TableName>
  );
});

describe('<TableName />', () => {
  it('renders correctly', () => {
    const { result } = renderHook(() => useStore());
    act(() => {
      result.current.tables = {
        "1": {name: "Mock Name", attributes: {}}
      }
    });
  
    render(renderReadyComponent);
    expect(screen.getByText(/Mock Name/i)).toBeInTheDocument();
  });

  it('renders correctly', () => {
    const renderedContainer = render(renderReadyComponent );
    expect(renderedContainer).toMatchSnapshot();
  });
  
});