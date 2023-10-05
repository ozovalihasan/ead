import {  AddTableButton } from '../AddTableButton';
import { render, screen, renderHook, fireEvent } from "@testing-library/react";
import { useStore } from '@/zustandStore';

let renderReadyComponent: JSX.Element;

beforeEach(() => {
    
  useStore.setState({ 
    addTable: jest.fn(),
  })
    
  renderReadyComponent = (
    <AddTableButton />
  );
});

describe('<AddTableButton />', () => {
  it('renders a button to add a table', () => {

    render(renderReadyComponent );
    const { result } = renderHook(() => useStore());

    const addTableButton = screen.getByTitle(/Add a table/i)
    expect(addTableButton).toBeInTheDocument();
    fireEvent.click(addTableButton)
    expect(result.current.addTable).toHaveBeenCalledTimes(1);
  });

  it('renders correctly', () => {
    const renderedContainer = render(renderReadyComponent );
    expect(renderedContainer).toMatchSnapshot();
  });

})  
