import { HasManyHandle } from '../HasManyHandle';
import { render, screen } from "@testing-library/react";

let renderReadyComponent: JSX.Element;

beforeEach(() => {
  renderReadyComponent = (
    <HasManyHandle nodeId="1" />
  );
});

describe('<HasManyHandle />', () => {
  it('calls another component with a prop with value "has_many"', () => {
    render(renderReadyComponent);
    expect(screen.getByText(/MockCustomHandle/i)).toBeInTheDocument();
    expect(screen.getByText(/has_many/i)).toBeInTheDocument();
  });
  

  it('renders correctly', () => {
    const renderedContainer = render(renderReadyComponent );
    expect(renderedContainer).toMatchSnapshot();
  });

});