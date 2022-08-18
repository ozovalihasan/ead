import { HasManyEdge } from '../HasManyEdge';
import { render, screen } from "@testing-library/react";
import useStore from '@/zustandStore/store';
import { 
  ShowEdgeTextType,
  RemoveEdgeButtonType
} from '@/components'


jest.mock('@/components',  () => ({
  RemoveEdgeButton: (
    (props: RemoveEdgeButtonType ) => (
      <>
        MockRemoveEdgeButton
        { Object.keys(props).map((key) => `${key}: ${props[key as keyof typeof props]}`) }
      </>
    )
  ),
  ShowEdgeText: (
    (props: ShowEdgeTextType ) => ( 
    <>
      MockShowEdgeText
      { Object.keys(props).map((key) => `${key}: ${props[key as keyof typeof props]}`) }
    </>
  )
  ),
}))

let renderReadyComponent: JSX.Element;

const nodes = [
  {
    "id": "1",
    "type": "entity",
    "position": {
        "x": 465,
        "y": 150
    },
    "data": {
        "tableId": "1",
        "name": "Physician"
    },
    "width": 138,
    "height": 45
  },
  {
      "id": "2",
      "type": "entity",
      "position": {
          "x": 585,
          "y": 255
      },
      "data": {
          "tableId": "2",
          "name": "Appointment"
      },
      "width": 138,
      "height": 45,
      "selected": false,
      "positionAbsolute": {
          "x": 585,
          "y": 255
      },
      "dragging": false
  },
]

beforeEach(() => {
  
  useStore.setState({ 
    nodes: nodes
  })
  
  renderReadyComponent = (
    <svg>
      <HasManyEdge
        id={"111"}
        source={"1"}
        target={"2"}
        sourceX={nodes[0].position.x}
        sourceY={nodes[0].position.y}
        targetX={nodes[1].position.x}
        targetY={nodes[1].position.y}
        style = {{}}
        label={"has_many"}
        selected={false}
      />
    </svg>
  );
});

describe('<HasManyEdge />', () => {

  it('renders another components correctly', () => {
    render(renderReadyComponent );
      expect(screen.getByText(/MockShowEdgeText/i)).toBeInTheDocument();
  });

  it('renders correctly', () => {
    const renderedContainer = render(renderReadyComponent );
    expect(renderedContainer).toMatchSnapshot();
  });
  
  describe("if the mouse hovers on the edge", () => {
    beforeEach(()=> {
      useStore.setState({ 
        mouseOnEdgeId: "111"
      })
    })

    it('update styles', () => {
      render(renderReadyComponent );

      const allPathElements = screen.getAllByText("")[0].getElementsByTagName('path')
      
      expect(allPathElements[1]).toHaveStyle({stroke: "black", strokeWidth: 3, strokeDasharray: 0});
      expect(allPathElements.length).toBe(3);
    });
  
    it('renders correctly', () => {
      const renderedContainer = render(renderReadyComponent );
      expect(renderedContainer).toMatchSnapshot();
    });
    
  })
  
  describe("if it is selected", () => {
    beforeEach(()=> {
      renderReadyComponent =(
        <svg>
          <HasManyEdge
            id={"111"}
            source={"1"}
            target={"2"}
            sourceX={nodes[0].position.x}
            sourceY={nodes[0].position.y}
            targetX={nodes[1].position.x}
            targetY={nodes[1].position.y}
            style = {{}}
            label={"has_many"}
            selected={true}
          />
        </svg>
      )
    })


    it('renders another component', () => {
      
      render(renderReadyComponent );
      expect(screen.getByText(/MockRemoveEdgeButton/i)).toBeInTheDocument();
    });

    it('update styles', () => {
      
      render(renderReadyComponent );
      
      const allPathElements = screen.getAllByText("")[0].getElementsByTagName('path')

      expect(allPathElements[1]).toHaveStyle({stroke: "black", strokeWidth: 3, strokeDasharray: 0});
    });
  
    it('renders correctly', () => {
      const renderedContainer = render(renderReadyComponent );
      expect(renderedContainer).toMatchSnapshot();
    });
    
  })

});