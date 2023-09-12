import { ToggleOptionalButton } from '../ToggleOptionalButton';
import { render, screen, renderHook, fireEvent } from "@testing-library/react";
import useStore from '@/zustandStore/store';

let renderReadyComponent: JSX.Element;

beforeEach(() => {
  renderReadyComponent = (
    <ToggleOptionalButton edgeId={"1"} />
  );
});

describe('<ToggleOptionalButton />', () => {
  

  it('run the toggleOptional function from the store when "x" is clicked', () => {
    
    useStore.setState({ 
      toggleOptional: jest.fn() 
    })

    render(renderReadyComponent );
    const { result } = renderHook(() => useStore());

    const resetButton = screen.getByRole("button");

    expect(resetButton).toBeInTheDocument();

    fireEvent.click(resetButton);
    
    expect(result.current.toggleOptional).toHaveBeenCalledTimes(1);
    expect(result.current.toggleOptional).toHaveBeenCalledWith("1" );
  });

  it('renders CircleAndLine', () => {
      
    render(renderReadyComponent );
    expect(screen.getByText(/MockCircleAndLine/i)).toBeInTheDocument();
  });
  
  it('renders correctly', () => {
    const renderedContainer = render(renderReadyComponent );
    expect(renderedContainer).toMatchSnapshot();
  });
  
});