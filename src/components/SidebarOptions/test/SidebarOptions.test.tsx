import {  SidebarOptions } from '../SidebarOptions';
import { render, screen, renderHook, fireEvent } from "@testing-library/react";
import useStore from '@/zustandStore/store';
import { handleMouseLeaveForSelect, handleMouseUpForSelect } from '@/helpers';

jest.mock('@/helpers',  () => ({
  handleMouseUpForSelect: jest.fn(),
  handleMouseLeaveForSelect: jest.fn()
}))

let renderReadyComponent: JSX.Element;

beforeEach(() => {
  useStore.setState({
    tables: {
      "1": {name: "Mock Name", attributes: {}, superclassId: ""},
      "2": {name: "Mock Second Name", attributes: {}, superclassId: "1"},
      "3": {name: "Mock Third Name", attributes: {}, superclassId: "1"}
    },
    changeTableSuperClass: jest.fn()
  })
  
  renderReadyComponent = (
    <SidebarOptions tableId={"2"}></SidebarOptions>
  );
});


describe('<Sidebar />', () => {

  it('renders "Base" if it doesn"t exist', () => {

    render(<SidebarOptions tableId={"1"}></SidebarOptions> );

    expect(screen.getByText(/^Base$/i)).toBeInTheDocument();
  });

  it('renders the name of super class if it exists', () => {

    render(renderReadyComponent );

    expect(screen.getByText(/< Mock Name/)).toBeInTheDocument();
  });
  
  
  it('renders all necessary options', () => {

    render(renderReadyComponent );

    expect(screen.getByText(/^ActiveRecord::Base$/)).toBeInTheDocument();
    expect(screen.getByText(/^Mock Name$/)).toBeInTheDocument();
    expect(screen.getByText(/^Mock Second Name$/)).toBeInTheDocument();
    expect(screen.getByText(/^Mock Third Name$/)).toBeInTheDocument();
  });
  
  it('calls changeTableSuperClass function of the store when the selected option is changed', () => {

    render(renderReadyComponent );
    const { result } = renderHook(() => useStore());

    const selectEl = screen.getByTitle(/Select a superclass to inherit/)
    fireEvent.change( selectEl, {target: {value: '3'}})
    expect(result.current.changeTableSuperClass).toHaveBeenCalledTimes(1);
  });
  
  it('calls the handleMouseUpForSelect function', () => {

    render( renderReadyComponent );

    const buttonEl = screen.getByText(/< Mock Name/);

    fireEvent.mouseUp( buttonEl );
    
    expect(handleMouseUpForSelect).toHaveBeenCalledTimes(1)

  });
  
  it('calls the handleMouseLeaveForSelect function', () => {

    render( renderReadyComponent );

    const selectEl = screen.getByTitle(/Select a superclass to inherit/);

    fireEvent.mouseLeave( selectEl );

    expect(handleMouseLeaveForSelect).toHaveBeenCalledTimes(1)

  });


  it('renders correctly', () => {
    const renderedContainer = render(renderReadyComponent );
    expect(renderedContainer).toMatchSnapshot();
  });

});