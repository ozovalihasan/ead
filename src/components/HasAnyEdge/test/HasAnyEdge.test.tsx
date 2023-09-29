import { HasAnyEdge } from '../HasAnyEdge';
import { render, screen } from "@testing-library/react";
import { useStore, EntityNodeType, hasManyEdgePartial, hasOneEdgePartial } from '@/zustandStore';
import { useCustomizationStore } from '@/zustandStore/customizationStore';

let renderReadyComponent: JSX.Element;

const nodes: EntityNodeType[] = [
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
    "height": 45,
    "selected": false,
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
  },
]

beforeEach(() => {
  
  useStore.setState({ 
    nodes: nodes
  })
  
  useCustomizationStore.setState({ 
    showTextOnEdges: false
  })
  

  renderReadyComponent = (
    <svg>
      <HasAnyEdge
        id={"111"}
        source={"1"}
        target={"2"}
        label={hasManyEdgePartial.label}
        selected={false}
        data={{optional: false}}
        type={hasManyEdgePartial.type}
      />
    </svg>
  );
});

describe('<HasAnyEdge />', () => {

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
      
      expect(allPathElements[0]).toHaveStyle({stroke: "black", strokeWidth: 3, strokeDasharray: 0});
      expect(allPathElements.length).toBe(2);
    });
  
    it('renders correctly', () => {
      const renderedContainer = render(renderReadyComponent );
      expect(renderedContainer).toMatchSnapshot();
    });
    
  })
  
  describe("if the association is 'has one'", () => {
    beforeEach(()=> {
      renderReadyComponent =(
        <svg>
          <HasAnyEdge
            id={"111"}
            source={"1"}
            target={"2"}
            label={hasOneEdgePartial.label}
            selected={false}
            type={hasOneEdgePartial.type}
            data={{optional: false}}
          />
        </svg>
      )
    })


    it('renders CrossMarker marker', () => {
      
      render(renderReadyComponent );
      expect(screen.getByText(/MockCrossMarker/i)).toBeInTheDocument();
    });

    it('renders correctly', () => {
      const renderedContainer = render(renderReadyComponent );
      expect(renderedContainer).toMatchSnapshot();
    });
    
  })

  describe("if the association is 'has many'", () => {
    beforeEach(()=> {
      renderReadyComponent =(
        <svg>
          <HasAnyEdge
            id={"111"}
            source={"1"}
            target={"2"}
            label={hasManyEdgePartial.label}
            selected={false}
            type={hasManyEdgePartial.type}
            data={{optional: false}}
          />
        </svg>
      )
    })


    it('renders CrowsFootMarker', () => {
      
      render(renderReadyComponent );
      expect(screen.getByText(/MockCrowsFootMarker/i)).toBeInTheDocument();
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
          <HasAnyEdge
            id={"111"}
            source={"1"}
            target={"2"}
            label={hasOneEdgePartial.label}
            selected={true}
            type={hasOneEdgePartial.type}
            data={{optional: false}}
          />
        </svg>
      )
    })

    it('renders RemoveEdgeButton', () => {
      
      render(renderReadyComponent );
      expect(screen.getByText(/MockRemoveEdgeButton/i)).toBeInTheDocument();
    });

    it('renders ToggleOptionalButton', () => {
      
      render(renderReadyComponent );
      expect(screen.getByText(/MockRemoveEdgeButton/i)).toBeInTheDocument();
    });

    it('update styles', () => {
      
      render(renderReadyComponent );
      
      const allPathElements = screen.getAllByText("")[0].getElementsByTagName('path')

      expect(allPathElements[0]).toHaveStyle({stroke: "black", strokeWidth: 3, strokeDasharray: 0});
    });
  
    it('renders correctly', () => {
      const renderedContainer = render(renderReadyComponent );
      expect(renderedContainer).toMatchSnapshot();
    });
    
  })

  describe("shows an text if it is requested", () => {
    beforeEach(()=> {
      useCustomizationStore.setState({ 
        showTextOnEdges: true
      })
    })

    it('update styles', () => {
      render(renderReadyComponent );
      expect(screen.getByText(/MockShowEdgeText/i)).toBeInTheDocument();
    });
  
    it('renders correctly', () => {
      const renderedContainer = render(renderReadyComponent );
      expect(renderedContainer).toMatchSnapshot();
    });
    
  })

  describe("if the edge is optional", () => {
    beforeEach(()=> {
      renderReadyComponent =(
        <svg>
          <HasAnyEdge
            id={"111"}
            source={"1"}
            target={"2"}
            label={hasOneEdgePartial.label}
            selected={false}
            type={hasOneEdgePartial.type}
            data={{optional: true}}
          />
        </svg>
      )
    })


    it('renders CircleLineMarker', () => {
      
      render(renderReadyComponent );
      expect(screen.getByText(/MockCircleLineMarker/i)).toBeInTheDocument();
      expect(screen.queryByText(/MockStraightLineMarker/i)).not.toBeInTheDocument();
    });

    it('renders correctly', () => {
      const renderedContainer = render(renderReadyComponent );
      expect(renderedContainer).toMatchSnapshot();
    });
    
  })

  describe("if the edge is not optional", () => {
    beforeEach(()=> {
      renderReadyComponent =(
        <svg>
          <HasAnyEdge
            id={"111"}
            source={"1"}
            target={"2"}
            label={hasOneEdgePartial.label}
            selected={false}
            type={hasOneEdgePartial.type}
            data={{optional: false}}
          />
        </svg>
      )
    })


    it('renders StraightLineMarker', () => {
      
      render(renderReadyComponent );
      expect(screen.queryByText(/MockCircleLineMarker/i)).not.toBeInTheDocument();
      expect(screen.getByText(/MockStraightLineMarker/i)).toBeInTheDocument();
    });

    it('renders correctly', () => {
      const renderedContainer = render(renderReadyComponent );
      expect(renderedContainer).toMatchSnapshot();
    });
    
  })
  
});