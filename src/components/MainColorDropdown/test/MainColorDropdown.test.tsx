import { MainColorDropdown } from '../MainColorDropdown';
import { render, screen, renderHook, fireEvent } from "@testing-library/react";
import { handleMouseLeaveForSelect, handleMouseUpForSelect } from '@/helpers';
import { LocationSidebar, useCustomizationStore } from '@/zustandStore/customizationStore';

let renderReadyComponent: JSX.Element;



jest.mock('@/helpers',  () => ({
  handleMouseUpForSelect: jest.fn(),
  handleMouseLeaveForSelect: jest.fn(),
  availableColors: ["sky"]
}))

beforeEach(() => {
    
  useCustomizationStore.setState({ 
    locationSidebar: LocationSidebar.Right,
    showTextOnEdges: true,
    mainColor: "sky",
    changeMainColor: jest.fn(),
    toggleLocationSidebar: jest.fn(),
    toggleTextMode: jest.fn(),
  })
    
  renderReadyComponent = (
    <MainColorDropdown />
  );
});

describe('<MainColorDropdown />', () => {

  it('calls changeTableSuperClass function of the store when the selected option is changed', () => {

    render(renderReadyComponent );
    const { result } = renderHook(() => useCustomizationStore());

    const selectEl = screen.getByTitle(/Select a main color/)
    fireEvent.change( selectEl, {target: {value: 'sky'}})
    expect(result.current.changeMainColor).toHaveBeenCalledTimes(1);
  });
  
  it('calls the handleMouseUpForSelect function', () => {

    render( renderReadyComponent );

    const buttonEl = screen.getAllByText(/^Main Color: sky$/i)[0];

    fireEvent.mouseUp( buttonEl );
    
    expect(handleMouseUpForSelect).toHaveBeenCalledTimes(1)

  });
  
  it('calls the handleMouseLeaveForSelect function', () => {

    render( renderReadyComponent );

    const selectEl = screen.getByTitle(/Select a main color/);
    
    fireEvent.mouseLeave( selectEl );

    expect(handleMouseLeaveForSelect).toHaveBeenCalledTimes(1)

  });

  it('renders correctly', () => {
    const renderedContainer = render(renderReadyComponent );
    expect(renderedContainer).toMatchSnapshot();
  });

});