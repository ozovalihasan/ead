import { HasManyEdge } from '../HasManyEdge';
import { render, screen } from "@testing-library/react";

let renderReadyComponent: JSX.Element;

beforeEach(() => {
  renderReadyComponent = (
    <svg>
      <HasManyEdge
        id={"111"}
        source={"1"}
        target={"2"}
        sourceX={333}
        sourceY={444}
        targetX={555}
        targetY={666}
        label={"has many"}
        selected={false}
      />
    </svg>
  );
});

describe('<HasManyEdge />', () => {

  it('renders HasAnyEdge component correctly', () => {
    render(renderReadyComponent );
      expect(screen.getByText(/MockHasAnyEdge/i)).toBeInTheDocument();
  });

  it('renders correctly', () => {
    const renderedContainer = render(renderReadyComponent );
    expect(renderedContainer).toMatchSnapshot();
  });

});