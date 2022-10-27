import {  AttributeTypeOptions } from '../AttributeTypeOptions';
import { fireEvent, render, renderHook, screen } from "@testing-library/react";
import useStore from '@/zustandStore/store';
import { handleMouseLeaveForSelect, handleMouseUpForSelect } from '@/helpers';

let renderReadyComponent: JSX.Element;

jest.mock('@/helpers',  () => ({
  handleMouseUpForSelect: jest.fn(),
  handleMouseLeaveForSelect: jest.fn()
}))


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

    const stringType = screen.getAllByText(/string/i)[1]
    
    fireEvent.change(stringType.parentNode as Element, screen.getByText(/integer/i))

    expect(result.current.onAttributeTypeChange).toHaveBeenCalledTimes(1);
  });

  it('renders all types', () => {

    render(renderReadyComponent );
    const selectEl = screen.getByTitle(/Select attribute type/);

    ['primary_key', 'string', 'text', 'integer', 'float', 'decimal', 'datetime',
    'time', 'date', 'binary', 'boolean'].forEach((item) => {
      expect(selectEl.innerHTML).toContain(item)
    })
    
  });

  it('calls the handleMouseUpForSelect function', () => {

    render( renderReadyComponent );

    const buttonEl = screen.getAllByText(/^string$/)[0];

    fireEvent.mouseUp( buttonEl );
    
    expect(handleMouseUpForSelect).toHaveBeenCalledTimes(1)

  });
  
  it('calls the handleMouseLeaveForSelect function', () => {

    render( renderReadyComponent );

    const selectEl = screen.getByTitle(/Select attribute type/);
    
    fireEvent.mouseLeave( selectEl );

    expect(handleMouseLeaveForSelect).toHaveBeenCalledTimes(1)

  });
  it('renders correctly', () => {
    const renderedContainer = render(renderReadyComponent );
    expect(renderedContainer).toMatchSnapshot();
  });

});