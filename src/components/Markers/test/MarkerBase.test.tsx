import { MarkerBase } from '../MarkerBase';
import { render, screen } from "@testing-library/react";


let renderReadyComponent: JSX.Element;

beforeEach(() => {
  renderReadyComponent = (
    <svg>
      <MarkerBase orient={"mockOrient"} edgeId={"1"}>
        <div>MockChildren</div>
      </MarkerBase>
    </svg>
  );
});

describe('<MarkerBase />', () => {
  it('renders the child', () => {
    render(renderReadyComponent);
    expect(screen.getByText(/MockChildren/i)).toBeInTheDocument();
  });


  it('renders correctly', () => {
    const renderedContainer = render(renderReadyComponent );
    expect(renderedContainer).toMatchSnapshot();
  });

});