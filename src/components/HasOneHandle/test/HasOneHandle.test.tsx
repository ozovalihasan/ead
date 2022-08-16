import { HasOneHandle } from '../HasOneHandle';
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
    <HasOneHandle nodeId="1" />
  );
});

describe('<HasOneHandle />', () => {
  it('calls another component with a prop with value "has_one"', () => {
    render(renderReadyComponent);
    expect(screen.getByText(/has_one/i)).toBeInTheDocument();
  });


  it('renders correctly', () => {
    const renderedContainer = render(renderReadyComponent );
    expect(renderedContainer).toMatchSnapshot();
  });

});