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
          "13": {
            "name": "mockFirstAttribute",
            "type": "string"
          },
          "14": {
            "name": "mockSecondAttribute",
            "type": "string"
          }
        }, 
        "superclassId": ""
      },
      "2": {
        "name": "MockSecondTable",
        "attributes": {
          "15": {
            "name": "mockThirdAttribute",
            "type": "string"
          },
          "16": {
            "name": "mockFourthAttribute",
            "type": "string"
          }
        },
        "superclassId": ""
      },
      "3": {
        "name": "MockThirdTable",
        "attributes": {
          "15": {
            "name": "mockFifthAttribute",
            "type": "string"
          },
          "16": {
            "name": "mockSixthAttribute",
            "type": "string"
          }
        },
        "superclassId": "1"
      },
    },
    resetStore: jest.fn(),
    uploadStore: jest.fn(),
    addAttribute: jest.fn(),
    removeAttribute: jest.fn(),
    removeTable: jest.fn(),
    addTable: jest.fn(),
    changeTableSuperClass: jest.fn(),
    onAttributeNameChange: jest.fn(),
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

    it('renders all attributes of all tables', () => {

      render(renderReadyComponent );

      expect(screen.getByDisplayValue(/mockFirstAttribute/i)).toBeInTheDocument();
      expect(screen.getByDisplayValue(/mockSecondAttribute/i)).toBeInTheDocument();
      expect(screen.getByDisplayValue(/mockThirdAttribute/i)).toBeInTheDocument();
      expect(screen.getByDisplayValue(/mockFourthAttribute/i)).toBeInTheDocument();
      
    });

    

    it('renders the necessary buttons', () => {

      render(renderReadyComponent );
      const { result } = renderHook(() => useStore());


      const addAttributeButtons = screen.getAllByTitle(/Add an attribute/i)
      expect(addAttributeButtons.length).toBe(2);
      fireEvent.click(addAttributeButtons[0])
      expect(result.current.addAttribute).toHaveBeenCalledTimes(1);
      
      const removeAttributeButtons = screen.getAllByTitle(/Remove the attribute/i)
      expect(removeAttributeButtons.length).toBe(4);
      fireEvent.click(removeAttributeButtons[0])
      expect(result.current.removeAttribute).toHaveBeenCalledTimes(1);
      
      const deleteTableButtons = screen.getAllByTitle(/Delete the table/i)
      expect(deleteTableButtons.length).toBe(3);
      fireEvent.click(deleteTableButtons[0])
      expect(result.current.removeAttribute).toHaveBeenCalledTimes(1);

      const addTableButton = screen.getByTitle(/Add a table/i)
      expect(addTableButton).toBeInTheDocument();
      fireEvent.click(addTableButton)
      expect(result.current.addTable).toHaveBeenCalledTimes(1);
    });

    it('doesn"t render attributes and a button used to add an attribute if the table has a superclass', () => {

      useStore.getState().tables["3"].superclassId = "1"
      render(renderReadyComponent );

      expect(screen.queryByDisplayValue(/mockFifthAttribute/i)).not.toBeInTheDocument();
      expect(screen.queryByDisplayValue(/mocksixthAttribute/i)).not.toBeInTheDocument();
      
      let removeAttributeButtons = screen.getAllByTitle(/Remove the attribute/i)
      expect(removeAttributeButtons.length).toBe(4);

      let addAttributeButtons = screen.getAllByTitle(/Add an attribute/i)
      expect(addAttributeButtons.length).toBe(2);

      cleanup()
      
      useStore.getState().tables["3"].superclassId = ""
      render(renderReadyComponent );

      expect(screen.queryByDisplayValue(/mockFifthAttribute/i)).toBeInTheDocument();
      expect(screen.queryByDisplayValue(/mocksixthAttribute/i)).toBeInTheDocument();
      
      removeAttributeButtons = screen.getAllByTitle(/Remove the attribute/i)
      expect(removeAttributeButtons.length).toBe(6);

      addAttributeButtons = screen.getAllByTitle(/Add an attribute/i)
      expect(addAttributeButtons.length).toBe(3);
    });

    it('renders another component', () => {

      render(renderReadyComponent );
      
      expect(screen.getAllByText(/MockAttributeTypeOptions/i).length).toBe(4);
    });

    it('renders a dropdown to select a superclass for each table', () => {

      render(renderReadyComponent);
      
      expect(screen.getAllByText(/MockSidebarOptions/i).length).toBe(3);
    });
    
    it('renders an input element for each attribute', () => {

      render(renderReadyComponent );
      const { result } = renderHook(() => useStore());

      const inputElement = screen.getByDisplayValue(/mockFirstAttribute/i)
      
      fireEvent.change(inputElement, {target: {value: 'mockAttributeName'}})

      expect(result.current.onAttributeNameChange).toHaveBeenCalledTimes(1);
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