import {  Sidebar } from '../Sidebar';
import { render, screen, renderHook, fireEvent, cleanup } from "@testing-library/react";
import { useStore } from '@/zustandStore';
import { useCustomizationStore } from '@/zustandStore/customizationStore';

let renderReadyComponent: JSX.Element;

beforeEach(() => {
    
  useStore.setState({ 
    tables: {
      "1": {
        "name": "MockFirstTable",
        "attributes": {
        }, 
        "superclassId": ""
      },
      "2": {
        "name": "MockSecondTable",
        "attributes": {
        },
        "superclassId": ""
      },
    },
    removeTable: jest.fn(),
    onTableNameChange: jest.fn(),
  })
    
  renderReadyComponent = (
    <Sidebar />
  );
});

describe('<Sidebar />', () => {
  
  describe('if the sidebar is visible', () => {

    beforeEach(() => {
      useCustomizationStore.setState({ 
        sidebarVisible: true
      })
    });

    it('renders all tables', () => {
      render(renderReadyComponent );

      expect(screen.getByDisplayValue(/MockFirstTable/i)).toBeInTheDocument();
      expect(screen.getByDisplayValue(/MockSecondTable/i)).toBeInTheDocument();
    });

    it('renders a button to call removeTable function', () => {
      render(renderReadyComponent );
      const { result } = renderHook(() => useStore());

      const deleteTableButtons = screen.getAllByTitle(/Delete the table/i)
      expect(deleteTableButtons.length).toBe(2);
      fireEvent.click(deleteTableButtons[0])
      expect(result.current.removeTable).toHaveBeenCalledTimes(1);

    });

    it('renders an input and it calls removeTable function when the input is changed', () => {
      render(renderReadyComponent );
      const { result } = renderHook(() => useStore());

      const inputElement = screen.getByDisplayValue(/MockFirstTable/i) as HTMLInputElement
      expect(result.current.onTableNameChange).toHaveBeenCalledTimes(0);

      fireEvent.change(inputElement, {target: {value: "MockNewTable"}})

      expect(result.current.onTableNameChange).toHaveBeenCalledTimes(1);

    });

    it('renders another components', () => {
      render(renderReadyComponent );
      
      expect(screen.getAllByText(/MockTableAttributes/i).length).toBe(2);
      expect(screen.getAllByText(/MockSidebarOptions/i).length).toBe(2);
      expect(screen.getAllByText(/MockAddTableButton/i).length).toBe(1);
    });
    
    it('renders correctly', () => {
      const renderedContainer = render(renderReadyComponent );
      expect(renderedContainer).toMatchSnapshot();
    });


  })  

  describe('if the sidebar is invisible', () => {


    beforeEach(() => {
      useCustomizationStore.setState({ 
        sidebarVisible: false
      })
    });

    it('has a "hidden" class', () => {
      render(renderReadyComponent );

      const asideElement = screen.getAllByText("")[0].getElementsByTagName("aside")[0]
      
      expect(asideElement.classList).toContain("hidden");
    });


    it('renders correctly', () => {
      const renderedContainer = render(renderReadyComponent );
      expect(renderedContainer).toMatchSnapshot();
    });
  })

});