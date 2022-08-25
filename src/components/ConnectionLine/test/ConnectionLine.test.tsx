import { ConnectionLine } from '../ConnectionLine';
import { render, screen } from "@testing-library/react";
import useStore from '@/zustandStore/store';
import { Position } from 'react-flow-renderer';



let renderReadyComponent: JSX.Element;

beforeEach(() => {
  
  renderReadyComponent = (
    <svg>
      <ConnectionLine
        sourceX={10}
        sourceY={20}
        sourcePosition={Position.Bottom}
        targetX={30}
        targetY={40}
        targetPosition={Position.Top}
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
            "type": "mockType",
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