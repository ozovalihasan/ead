import { MainColorDropdown } from '../MainColorDropdown';
import { render, screen, renderHook, fireEvent } from "@testing-library/react";
import useCustomizationStore from '@/zustandStore/customizationStore';

let renderReadyComponent: JSX.Element;

beforeEach(() => {
    
useCustomizationStore.setState({ 
    locationSidebar: "right",
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
  
  it('toggles the "hidden" class when mouseUp is fired', () => {

    render( renderReadyComponent );

    const selectEl = screen.getByTitle(/Select a main color/);
    const buttonEl = screen.getAllByText(/^Main Color: sky$/i)[0];

    fireEvent.mouseUp( buttonEl );
    
    expect(selectEl.classList).not.toContain("hidden");

    fireEvent.mouseUp( buttonEl );
    
    expect(selectEl.classList).toContain("hidden");

  });
  
  it('adds the "hidden" class when the mouse leaves a defined element ', () => {

    render( renderReadyComponent );

    const selectEl = screen.getByTitle(/Select a main color/);
    selectEl.classList.remove("hidden")

    expect(selectEl.classList).not.toContain("hidden");

    fireEvent.mouseLeave( selectEl );

    expect(selectEl.classList).toContain("hidden");

  });

  it('renders correctly', () => {
    const renderedContainer = render(renderReadyComponent );
    expect(renderedContainer).toMatchSnapshot();
  });

});