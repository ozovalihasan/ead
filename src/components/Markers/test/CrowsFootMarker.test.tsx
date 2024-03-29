import { CrowsFootMarker } from '../CrowsFootMarker';
import { render, screen } from "@testing-library/react";

let renderReadyComponent: JSX.Element;

beforeEach(() => {
  renderReadyComponent = (
    <svg>
      <CrowsFootMarker orient={"mockOrient"} edgeId={"1"} />
    </svg>
  );
});

describe('<CrowsFootMarker />', () => {
  it('renders a path in MarkerBase component', () => {
    render(renderReadyComponent);
    const parentElement = screen.getByText(/MockMarkerBase/i)
    expect(parentElement).toBeInTheDocument();
    expect(parentElement.getElementsByTagName('path').length).toBe(1);
  });


  it('renders correctly', () => {
    const renderedContainer = render(renderReadyComponent );
    expect(renderedContainer).toMatchSnapshot();
  });

});