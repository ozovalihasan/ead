import { TableAttributes } from '../TableAttributes';
import { fireEvent, render, renderHook, screen } from "@testing-library/react";
import { useStore } from '@/zustandStore';

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
    },
    onAttributeNameChange: jest.fn(),
  })
    
  renderReadyComponent = (
    <TableAttributes tableId={"1"} />
  );
});

describe('<TableAttributes />', () => {
  describe('if superclass is empty', () => {
    beforeEach(() => {
      useStore.getState().tables["1"].superclassId = ""
    })
    
    it('renders all attributes of the given table', () => {

      render(renderReadyComponent );

      expect(screen.getByDisplayValue(/mockFirstAttribute/i)).toBeInTheDocument();
      expect(screen.getByDisplayValue(/mockSecondAttribute/i)).toBeInTheDocument();
    });

    it('renders an input element for each attribute', () => {
      render(renderReadyComponent );
      const { result } = renderHook(() => useStore());

      const inputElement = screen.getByDisplayValue(/mockFirstAttribute/i) as HTMLInputElement
      
      expect(result.current.onAttributeNameChange).toHaveBeenCalledTimes(0);

      fireEvent.change(inputElement, {target: {value: "mockAttributeName"}})

      expect(result.current.onAttributeNameChange).toHaveBeenCalledTimes(1);
    });
    
    it('renders another components', () => {
      render(renderReadyComponent );
      
      expect(screen.getAllByText(/MockRemoveAttributeButton/i).length).toBe(2);
      expect(screen.getAllByText(/MockAttributeTypeOptions/i).length).toBe(2);
      expect(screen.getAllByText(/MockAddAttributeButton/i).length).toBe(1);
    });

    it('renders correctly', () => {
      const renderedContainer = render(renderReadyComponent );
      expect(renderedContainer).toMatchSnapshot();
    });
  });

  describe('if superclass is not empty', () => {
    beforeEach(() => {
      useStore.getState().tables["1"].superclassId = "2"
    })
    
    it('renders only one element not containing any element', () => {
      render(renderReadyComponent );

      expect(document.body.firstElementChild?.firstElementChild).toBeEmptyDOMElement();
    });

    it('renders correctly', () => {
      const renderedContainer = render(renderReadyComponent );
      expect(renderedContainer).toMatchSnapshot();
    });
  });
});