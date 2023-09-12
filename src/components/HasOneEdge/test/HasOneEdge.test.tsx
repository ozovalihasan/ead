import { HasOneEdge } from '../HasOneEdge';
import { render, screen } from "@testing-library/react";

let renderReadyComponent: JSX.Element;

beforeEach(() => {
  renderReadyComponent = (
    <svg>
      <HasOneEdge
        id={"111"}
        source={"1"}
        target={"2"}
        label={ "has one" }
        selected={false}
        data={{optional: false}}
      />
    </svg>
  );
});

describe('<HasOneEdge />', () => {

  it('renders HasAnyEdge component correctly', () => {
    render(renderReadyComponent );
      expect(screen.getByText(/MockHasAnyEdge/i)).toBeInTheDocument();
  });

  it('renders correctly', () => {
    const renderedContainer = render(renderReadyComponent );
    expect(renderedContainer).toMatchSnapshot();
  });

});