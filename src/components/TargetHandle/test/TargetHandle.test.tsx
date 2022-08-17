import { TargetHandle } from '../TargetHandle';
import { render, screen } from "@testing-library/react";
import useStore from '@/zustandStore/store';
import { HandleComponentProps } from 'react-flow-renderer/dist/esm/components/Handle';


jest.mock('react-flow-renderer',  () => ({
  Handle: (
    ({ id, className, type, position }: HandleComponentProps) => (
      <>
        MockHandle
        id: {id}
        className: {className}
        type: {type}
        position: {position}
      </>
    )
  ),
  Position: {
    Top: "positionTop"
  }
}))

let renderReadyComponent: JSX.Element;

beforeEach(() => {
  
  useStore.setState({ 
    isConnectContinue: false,
    connectionStartNodeId: "111",
    associationType: "has_many",
    selectedNodeIdForThrough: "111"
  })
  
  renderReadyComponent = (
    <TargetHandle 
      nodeId="111"
    />
  );
});

describe('<TargetHandle />', () => {
  
  describe('if it is available to be visible', () => {
    beforeEach(() => {
  
      useStore.setState({ 
        isConnectContinue: true,
        connectionStartNodeId: "112",
        associationType: "through",
        selectedNodeIdForThrough: "113",
      })
  
    });

    it('has a "visible" class', () => {
      
      render(renderReadyComponent );

      const mainElement = screen.getByText(/MockHandle/)
      
      expect(mainElement.innerHTML).toContain("visible");
      expect(mainElement.innerHTML).not.toContain("hidden");
  
    });
  
    it('renders correctly', () => {
      const renderedContainer = render(renderReadyComponent );
      expect(renderedContainer).toMatchSnapshot();
    });

  })
  
  describe('if it is not available to be visible', () => {

    it('has a "hidden" class', () => {
      render(renderReadyComponent );

      const mainElement = screen.getByText(/MockHandle/)

      expect(mainElement.innerHTML).toContain("hidden");
      expect(mainElement.innerHTML).not.toContain("visible");
  
    });
  
    it('renders correctly', () => {
      const renderedContainer = render(renderReadyComponent );
      expect(renderedContainer).toMatchSnapshot();
    });

  })
});