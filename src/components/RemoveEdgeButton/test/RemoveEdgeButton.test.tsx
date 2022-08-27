import { RemoveEdgeButton } from '../RemoveEdgeButton';
import { render, screen, renderHook, fireEvent } from "@testing-library/react";
import useStore from '@/zustandStore/store';

let renderReadyComponent: JSX.Element;

jest.mock("@/icons", () => ({
  XMark: () => (
    <>
      MockXMark
    </>
  ), 
}))

beforeEach(() => {
  renderReadyComponent = (
    <RemoveEdgeButton edgeId={"1"} />
  );
});

describe('<RemoveEdgeButton />', () => {
  

  it('run the onEdgesChange function from the store when "x" is clicked', () => {
    
    useStore.setState({ 
      onEdgesChange: jest.fn() 
    })

    render(renderReadyComponent );
    const { result } = renderHook(() => useStore());

    const resetButton = screen.getByRole("button");

    expect(resetButton).toBeInTheDocument();

    fireEvent.click(resetButton);
    
    expect(result.current.onEdgesChange).toHaveBeenCalledTimes(1);;
    expect(result.current.onEdgesChange).toHaveBeenCalledWith([{"id": "1", "type": "remove"}] );;
  });
  
  it('renders correctly', () => {
    const renderedContainer = render(renderReadyComponent );
    expect(renderedContainer).toMatchSnapshot();
  });
  
});