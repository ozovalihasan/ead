import { RemoveNodeEdgeButton } from '../RemoveNodeEdgeButton';
import { render, screen, renderHook, fireEvent } from "@testing-library/react";
import { useStore } from '@/zustandStore';
import testNodes from '@/zustandStore/nodes';
import testEdges from '@/zustandStore/edges';
import produce from 'immer';

let renderReadyComponent: JSX.Element;

beforeEach(() => {
  renderReadyComponent = (
    <RemoveNodeEdgeButton />
  );
});

let testNode;
let testEdge;

describe('<RemoveNodeEdgeButton />', () => {
  
  describe('<RemoveNodeEdgeButton />', () => {
    beforeEach(() => {
      const nodes = produce(testNodes, nodes => {
                      nodes[0].selected = true
                    })
                    
      const edges = produce(testEdges, edges => {
                      edges[0].selected = true
                    })

      useStore.setState({ 
      nodes: nodes,
      edges: edges,
      onEdgesChange: jest.fn(),
      onNodesChange: jest.fn(),
      })
    });

    it('run the onEdgesChange and onNodesChange functions from the store when the button is clicked', () => {
      render(renderReadyComponent );
      const { result } = renderHook(() => useStore());

      const removeButton = screen.getByRole("button");

      expect(removeButton).toBeInTheDocument();

      fireEvent.click(removeButton);
      
      expect(result.current.onNodesChange).toHaveBeenCalledTimes(1);
      expect(result.current.onNodesChange).toHaveBeenCalledWith([{"id": "4", "type": "remove"}] );

      expect(result.current.onEdgesChange).toHaveBeenCalledTimes(1);
      expect(result.current.onEdgesChange).toHaveBeenCalledWith([{"id": "7", "type": "remove"}] );
    });

    it('renders Trash', () => {
      render(renderReadyComponent );
      expect(screen.getByText(/MockTrash/i)).toBeInTheDocument();
    });

    it('renders correctly', () => {
      const renderedContainer = render(renderReadyComponent );
      expect(renderedContainer).toMatchSnapshot();
    });
  });

  it("doesn't render a button if there is no a selected edge or node", () => {
    useStore.setState({ 
      nodes: [testNodes[0]],
      edges: [testEdges[0]],
      onEdgesChange: jest.fn(),
      onNodesChange: jest.fn(),
    })

    render(renderReadyComponent );

    const removeButton = screen.queryByRole("button");

    expect(removeButton).not.toBeInTheDocument();
  });
});