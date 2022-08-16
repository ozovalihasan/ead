import { ThroughHandle } from '../ThroughHandle';
import { render, screen } from "@testing-library/react";
import { CustomHandleType } from '../../CustomHandle/CustomHandle';



jest.mock('@/components',  () => ({
  CustomHandle: ({
    nodeId,
    id,
    handleType
  }: CustomHandleType) => {
    
    return (
      <>
        nodeId: {nodeId}
        id: {id}
        handleType: {handleType}
      </>
    );
  },
}));

let renderReadyComponent: JSX.Element;

beforeEach(() => {
  renderReadyComponent = (
    <ThroughHandle nodeId="1" />
  );
});

describe('<ThroughHandle />', () => {
  it('calls another component with a prop with value "through"', () => {
    render(renderReadyComponent);
    expect(screen.getByText(/through/i)).toBeInTheDocument();
  });
  

  it('renders correctly', () => {
    const renderedContainer = render(renderReadyComponent );
    expect(renderedContainer).toMatchSnapshot();
  });

});