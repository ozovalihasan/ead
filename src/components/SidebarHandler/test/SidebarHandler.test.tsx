import {  SidebarHandler } from '../SidebarHandler';
import { render, screen, renderHook, fireEvent } from "@testing-library/react";
import useCustomizationStore from '@/zustandStore/customizationStore';

let renderReadyComponent: JSX.Element;

beforeEach(() => {
    
  useCustomizationStore.setState({ 
    handleSidebarWidthChange: jest.fn(),
    toggleSidebarVisibility: jest.fn(),
  })
    
  renderReadyComponent = (
    <SidebarHandler />
  );
});

describe('<SidebarHandler />', () => {
  
  it('calls toggleSidebarVisibility function if the element is clicked', () => {

    render(renderReadyComponent );
    const { result } = renderHook(() => useCustomizationStore());

    const handler = screen.getByTitle(/Click to hide\/show the sidebar/i)

    expect(handler).toBeInTheDocument();

    fireEvent.click(handler)
    expect(result.current.toggleSidebarVisibility).toHaveBeenCalledTimes(1);;

    fireEvent.dragEnd(handler)
    expect(result.current.handleSidebarWidthChange).toHaveBeenCalledTimes(1);;

  });

  it('renders correctly', () => {
    const renderedContainer = render(renderReadyComponent );
    expect(renderedContainer).toMatchSnapshot();
  });

});