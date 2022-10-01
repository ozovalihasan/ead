import {  AttributeTypeOptions } from '../AttributeTypeOptions';
import { fireEvent, render, renderHook, screen } from "@testing-library/react";
import useStore from '@/zustandStore/store';


let renderReadyComponent: JSX.Element;

beforeEach(() => {
    
  useStore.setState({ 
    tables: {
      "1": {
        "name": "MockFirstTable",
        "attributes": {
          "13": {
            "name": "mockFirstAttribute",
            "type": "string",
            
          },
          "14": {
            "name": "mockSecondAttribute",
            "type": "string",
          }
        },
        "superclassId": ""
      },
    },
    resetStore: jest.fn(),
    uploadStore: jest.fn(),
    addAttribute: jest.fn(),
    removeAttribute: jest.fn(),
    removeTable: jest.fn(),
    addTable: jest.fn(),
    onAttributeTypeChange: jest.fn(),
    onAttributeNameChange: jest.fn(),
  })
    
  renderReadyComponent = (
    <AttributeTypeOptions tableId="1" attributeId="13" />
  );
});

describe('<AttributeTypeOptions />', () => {


  it('renders a drop-down list for each attribute', () => {

    render(renderReadyComponent );
    const { result } = renderHook(() => useStore());

    const stringType = screen.getByText(/string/i)
    
    fireEvent.change(stringType.parentNode as Element, screen.getByText(/integer/i))

    expect(result.current.onAttributeTypeChange).toHaveBeenCalledTimes(1);
  });

  it('renders all types', () => {

    render(renderReadyComponent );

    ['primary_key', 'string', 'text', 'integer', 'float', 'decimal', 'datetime', 'timestamp',
    'time', 'date', 'binary', 'boolean', 'references'].forEach((item) => {
      expect(screen.getByText(item)).toBeInTheDocument()
    })
    
  });
  
  it('renders correctly', () => {
    const renderedContainer = render(renderReadyComponent );
    expect(renderedContainer).toMatchSnapshot();
  });

});