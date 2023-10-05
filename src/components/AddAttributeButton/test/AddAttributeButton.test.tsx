import {  AddAttributeButton } from '../AddAttributeButton';
import { render, screen, renderHook, fireEvent } from "@testing-library/react";
import { useStore } from '@/zustandStore';

let renderReadyComponent: JSX.Element;

beforeEach(() => {
    
  useStore.setState({ 
    addAttribute: jest.fn(),
  })
    
  renderReadyComponent = (
    <AddAttributeButton tableId={"111"} />
  );
});

describe('<AddAttributeButton />', () => {
  it('renders a button to add an attribute to the table', () => {

    render(renderReadyComponent );
    const { result } = renderHook(() => useStore());

    const addAttributeButton = screen.getByTitle(/Add an attribute/i)
    expect(addAttributeButton).toBeInTheDocument();
    fireEvent.click(addAttributeButton)
    expect(result.current.addAttribute).toHaveBeenCalledTimes(1);
    expect(result.current.addAttribute).toHaveBeenCalledWith("111");
  });

  it('renders correctly', () => {
    const renderedContainer = render(renderReadyComponent );
    expect(renderedContainer).toMatchSnapshot();
  });

})  
