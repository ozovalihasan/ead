import { AllHandlers } from '../AllHandlers';
import { render, screen } from "@testing-library/react";

jest.mock('@/components',  () => ({
  HasOneHandle: ({ nodeId }: {nodeId : string}) => (
    <div>
      nodeId: {nodeId}
      has_one
    </div>
  ),
  HasManyHandle: ({ nodeId }: {nodeId : string}) => (
    <div>
      nodeId: {nodeId}
      has_many
    </div>
  ),
  ThroughHandle: ({ nodeId }: {nodeId : string}) => (
    <div>
      nodeId: {nodeId}
      through
    </div>
  ),
}));

let renderReadyComponent: JSX.Element;

beforeEach(() => {
  renderReadyComponent = (
    <AllHandlers nodeId="111" />
  );
});

describe('<AllHandlers />', () => {
  it('renders three different handlers', () => {
    render(renderReadyComponent);

    expect(screen.getAllByText(/111/i).length).toBe(3);
    expect(screen.getByText(/has_one/i)).toBeInTheDocument();
    expect(screen.getByText(/has_many/i)).toBeInTheDocument();
    expect(screen.getByText(/through/i)).toBeInTheDocument();
  });
  

  it('renders correctly', () => {
    const renderedContainer = render(renderReadyComponent );
    expect(renderedContainer).toMatchSnapshot();
  });

});