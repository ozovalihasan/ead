import {  RemoveAttributeButton } from '../RemoveAttributeButton';
import { render, screen, renderHook, fireEvent } from "@testing-library/react";
import { useStore } from '@/zustandStore';

let renderReadyComponent: JSX.Element;

beforeEach(() => {
    
  useStore.setState({ 
    removeAttribute: jest.fn(),
  })
    
  renderReadyComponent = (
    <RemoveAttributeButton tableId={"111"} attributeId={"222"}/>
  );
});

describe('<RemoveAttributeButton />', () => {
  it('renders a button to remove the attribute from the table', () => {

    render(renderReadyComponent );
    const { result } = renderHook(() => useStore());

    const removeAttributeButton = screen.getByTitle(/Remove the attribute/i)
    expect(removeAttributeButton).toBeInTheDocument();
    fireEvent.click(removeAttributeButton)
    expect(result.current.removeAttribute).toHaveBeenCalledTimes(1);
    expect(result.current.removeAttribute).toHaveBeenCalledWith("111", "222");
  });

  it('renders correctly', () => {
    const renderedContainer = render(renderReadyComponent );
    expect(renderedContainer).toMatchSnapshot();
  });

})  
