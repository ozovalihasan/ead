import { ConnectionLine } from '../ConnectionLine';
import { render } from "@testing-library/react";
import { useStore } from '@/zustandStore';
import { Position } from 'reactflow';



let renderReadyComponent: JSX.Element;

beforeEach(() => {
  
  renderReadyComponent = (
    <svg>
      <ConnectionLine
        fromX={10}
        fromY={20}
        fromPosition={Position.Bottom}
        toX={30}
        toY={40}
        toPosition={Position.Top}
      />
    </svg>
  );
});

describe('<ConnectionLine />', () => {
  describe('if association type is "through"', () => {
    
    it('renders correctly', () => {
      useStore.setState({ 
        associationType: 'through',
        nodes: [
          {
            "id": "1",
            "type": "entity",
            "position": {
                "x": 465,
                "y": 150
            },
            "data": {
                "tableId": "1",
                "name": "mockName"
            },
            "width": 138,
            "height": 45
          },
        ],
        selectedNodeIdForThrough: "1"
      })
      
      const renderedContainer = render(renderReadyComponent );
      expect(renderedContainer).toMatchSnapshot();
    });
    
  })

  describe('if association type is"not "through"', () => {
    it('renders correctly', () => {
      useStore.setState({ 
        associationType: 'has_many'
      })
      
      const renderedContainer = render(renderReadyComponent );
      expect(renderedContainer).toMatchSnapshot();
    });
    
  })

});