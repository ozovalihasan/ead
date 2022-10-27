import { ThroughEdge } from '../ThroughEdge';
import { render, screen } from "@testing-library/react";
import useStore from '@/zustandStore/store';
import useCustomizationStore from '@/zustandStore/customizationStore';


let renderReadyComponent: JSX.Element;

beforeEach(() => {
  
  useStore.setState({ 
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
      {
          "id": "3",
          "type": "entity",
          "position": {
              "x": 720,
              "y": 150
          },
          "data": {
              "tableId": "3",
              "name": "Patient"
          },
          "width": 138,
          "height": 45,
          "selected": false,
          "positionAbsolute": {
              "x": 720,
              "y": 150
          },
          "dragging": false
      }
    ]
  })
  
  renderReadyComponent = (
    <svg>
      <ThroughEdge
        id= {"111"}
        source= {"1"}
        target= {"3"}
        label= {"through"}
        data= {{throughNodeId: "2"}}
        selected={false}
      />
    </svg>
  );
});

describe('<ThroughEdge />', () => {
  describe("if the mouse hovers on the edge", () => {
    beforeEach(()=> {
      useStore.setState({ 
        mouseOnEdgeId: "111"
      })
    })

    it('update styles ', () => {
      
      render(renderReadyComponent );

      const allPathElements = screen.getAllByText("")[0].getElementsByTagName('path')

      expect(allPathElements[0]).toHaveStyle({stroke: "black", strokeWidth: 3, strokeDasharray: 0});
      expect(allPathElements[2]).toHaveStyle({stroke: "black", strokeWidth: 3, strokeDasharray: 0});
      expect(allPathElements.length).toBe(4);
    });
  
     it('renders correctly', () => {
      const renderedContainer = render(renderReadyComponent );
      expect(renderedContainer).toMatchSnapshot();
    });
    
  })
  
  describe("if texts are shown on the edges", () => {
    beforeEach(()=> {
      useCustomizationStore.setState({ 
        showTextOnEdges: true
      })
    })

    it('shows the text ', () => {
      
      render(renderReadyComponent );
      expect(screen.getByText(/through/i)).toBeInTheDocument();
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
          <ThroughEdge
            id= {"111"}
            source= {"1"}
            target= {"3"}
            label= {"through"}
            data= {{throughNodeId: "2"}}
            selected={true}
          />
        </svg>
      )
    })

    it('renders another component', () => {
      
      render(renderReadyComponent );
      expect(screen.getByText(/MockRemoveEdgeButton/i)).toBeInTheDocument();
    });
  
    it('renders correctly', () => {
      const renderedContainer = render(renderReadyComponent );
      expect(renderedContainer).toMatchSnapshot();
    });
    
  })

});