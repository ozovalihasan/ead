import { ThroughHandle } from '../ThroughHandle';
import { render, screen } from "@testing-library/react";

let renderReadyComponent: JSX.Element;

beforeEach(() => {
  renderReadyComponent = (
    <ThroughHandle nodeId="1" />
  );
});

describe('<ThroughHandle />', () => {
  it('calls another component with a prop with value "through"', () => {
    render(renderReadyComponent);
    expect(screen.getByText(/MockCustomHandle/i)).toBeInTheDocument();
    expect(screen.getByText(/through/i)).toBeInTheDocument();
  });
  

  it('renders correctly', () => {
    const renderedContainer = render(renderReadyComponent );
    expect(renderedContainer).toMatchSnapshot();
  });

});