import { RemoveEdgeButton } from '../RemoveEdgeButton';
import { render, screen, act, renderHook, fireEvent } from "@testing-library/react";
import useStore from 'zustandStore/store';
import userEvent  from "@testing-library/user-event";
import zustand from 'zustand';

let renderReadyComponent: JSX.Element;

beforeEach(() => {
  renderReadyComponent = (
    <RemoveEdgeButton id={"1"} />
  );
});

describe('<RemoveEdgeButton />', () => {
  

  it('run the removeEdge function from the store when "x" is clicked', () => {
    
    useStore.setState({ 
      removeEdge: jest.fn() 
    })

    render(renderReadyComponent );
    const { result } = renderHook(() => useStore());

    const resetButton = screen.getByRole("button", { name: "×" });

    expect(resetButton).toBeInTheDocument();

    fireEvent.click(resetButton);
    
    expect(result.current.removeEdge).toHaveBeenCalledTimes(1);;
    expect(result.current.removeEdge).toHaveBeenCalledWith("1");;
  });
  
  it('renders correctly', () => {
    const renderedContainer = render(renderReadyComponent );
    expect(renderedContainer).toMatchSnapshot();
  });
  
});