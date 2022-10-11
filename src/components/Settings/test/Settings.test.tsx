import { Settings } from '../Settings';
import { render, screen, renderHook, fireEvent } from "@testing-library/react";
import useCustomizationStore from '@/zustandStore/customizationStore';

let renderReadyComponent: JSX.Element;

jest.mock('@/components',  () => ({
  MainColorDropdown: () => (
    <>
      MockMainColorDropdown
    </>
  )
}));

beforeEach(() => {
    
useCustomizationStore.setState({ 
    locationSidebar: "right",
    showTextOnEdges: true,
    toggleLocationSidebar: jest.fn(),
    toggleTextMode: jest.fn(),
  })
    
  renderReadyComponent = (
    <Settings />
  );
});

describe('<Settings />', () => {

  it('renders a checkbox to change the location of sidebar', () => {

    render(renderReadyComponent );
    const { result } = renderHook(() => useCustomizationStore());

    const labelElement = screen.getByText(/Show the sidebar at the right of the window/i)
    const checkboxElement = labelElement.getElementsByTagName("input")[0]

    expect(checkboxElement.checked).toBe(true)
    
    fireEvent.click(checkboxElement)

    expect(result.current.toggleLocationSidebar).toHaveBeenCalledTimes(1);
  });

  it('renders a checkbox to change the visibility of edge names', () => {

    render(renderReadyComponent );
    const { result } = renderHook(() => useCustomizationStore());

    const labelElement = screen.getByText(/Show Association Names/i)
    const checkboxElement = labelElement.getElementsByTagName("input")[0]

    expect(checkboxElement.checked).toBe(true)
    
    fireEvent.click(checkboxElement)

    expect(result.current.toggleTextMode).toHaveBeenCalledTimes(1);
  });

  it('renders the MainColorDropdown component', () => {

    render(renderReadyComponent );

    expect(screen.getByText(/MockMainColorDropdown/i)).toBeInTheDocument();
  });

  it('renders correctly', () => {
    const renderedContainer = render(renderReadyComponent );
    expect(renderedContainer).toMatchSnapshot();
  });

});