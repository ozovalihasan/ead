import { Settings } from '../Settings';
import { render, screen, renderHook, fireEvent } from "@testing-library/react";
import { LocationSidebar, useCustomizationStore } from '@/zustandStore/customizationStore';


let renderReadyComponent: JSX.Element;

beforeEach(() => {
    
useCustomizationStore.setState({ 
    locationSidebar: LocationSidebar.Right,
    showTextOnEdges: true,
    toggleLocationSidebar: jest.fn(),
    toggleTextMode: jest.fn(),
    toggleDarkMode: jest.fn(),
  })
    
  renderReadyComponent = (
    <Settings />
  );
});

describe('<Settings />', () => {

  describe("if the menu is not open",() => {
    it('renders a checkbox to change the location of sidebar', () => {

      render(renderReadyComponent );

      const buttonEl = screen.getByText(/Settings/i);
      let labelElement = screen.queryByText(/Show Association Names/i)
      
      expect(labelElement).toBeNull();
      expect(buttonEl).toBeInTheDocument();
      
      fireEvent.click(buttonEl)

      labelElement = screen.queryByText(/Show Association Names/i)

      expect(labelElement).toBeInTheDocument();
    });
    it('renders correctly', () => {
      const renderedContainer = render(renderReadyComponent );

      expect(renderedContainer).toMatchSnapshot();
    });
  })
  
  describe("if the menu is open",() => {
    beforeEach(() => {
      render(renderReadyComponent );
      const buttonEl = screen.getByText(/Settings/i);
      
      expect(buttonEl).toBeInTheDocument();

      fireEvent.click(buttonEl)
    });
    
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

    it('renders a button to change the dark mode', () => {

      render(renderReadyComponent );
      const { result } = renderHook(() => useCustomizationStore());
      const buttonEl = screen.getByText(/Dark Mode/i);
      
      expect(buttonEl).toBeInTheDocument();

      fireEvent.click(buttonEl)

      expect(result.current.toggleDarkMode).toHaveBeenCalledTimes(1);
    });

    it('renders the MainColorDropdown component', () => {
      render(renderReadyComponent );

      expect(screen.getByText(/MockMainColorDropdown/i)).toBeInTheDocument();
    });

    it('hides the menu when the mouse leaves the menu element', () => {
      render(renderReadyComponent );

      let labelElement = screen.queryByText(/Show Association Names/i)

      expect(labelElement).toBeInTheDocument();

      const menuEl = screen.getByText(/MockMainColorDropdown/i).parentNode as HTMLElement
      
      fireEvent.mouseLeave(menuEl)

      labelElement = screen.queryByText(/Show Association Names/i)

      expect(labelElement).toBeNull();
    });

    it('renders correctly', () => {
      const renderedContainer = render(renderReadyComponent );

      expect(renderedContainer).toMatchSnapshot();
    });
  });
});