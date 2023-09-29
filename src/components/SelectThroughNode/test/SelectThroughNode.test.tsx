import { SelectThroughNode } from '../SelectThroughNode';
import { fireEvent, render, renderHook, screen } from "@testing-library/react";
import { useStore } from '@/zustandStore';

let renderReadyComponent: JSX.Element;

beforeEach(() => {
  
  useStore.setState({ 
    isConnectContinue: false,
    associationType: "has_many",
    connectionStartNodeId: "111",
    onMouseEnterThrough: jest.fn(), 
  })
  
  renderReadyComponent = (
    <SelectThroughNode 
      nodeId="111"
    />
  );
});

describe('<SelectThroughNode />', () => {
  
  describe('if it is available to be visible', () => {
    beforeEach(() => {
  
      useStore.setState({ 
        isConnectContinue: true,
        associationType: "through",
        connectionStartNodeId: "112",
      })
  
    });

    it('has a "visible" class', () => {
      
      render(renderReadyComponent );

      const mainElement = screen.getByText(/through/i).parentNode as HTMLElement

      expect(mainElement.classList).toContain("visible");
  
    });
  
    it('calls a function when mouse enters', () => {
      render(renderReadyComponent );
      const { result } = renderHook(() => useStore());
      
      const mainElement = screen.getByText(/through/i)
  
      expect(result.current.onMouseEnterThrough).toHaveBeenCalledTimes(0);

      fireEvent.mouseEnter(mainElement);

      expect(result.current.onMouseEnterThrough).toHaveBeenCalledTimes(1);
  
    });
    
  
    it('renders correctly', () => {
      const renderedContainer = render(renderReadyComponent );
      expect(renderedContainer).toMatchSnapshot();
    });

  })
  
  describe('if it is not available to be visible', () => {

    it('has a "hidden" class', () => {
      render(renderReadyComponent );

      const mainElement = screen.getByText(/through/i).parentNode as HTMLElement

      expect(mainElement.classList).toContain("hidden");
  
    });
  
    it('renders correctly', () => {
      const renderedContainer = render(renderReadyComponent );
      expect(renderedContainer).toMatchSnapshot();
    });

  })
});