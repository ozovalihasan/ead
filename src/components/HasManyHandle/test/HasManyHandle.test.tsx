import { HasManyHandle } from '../HasManyHandle';
import { render, screen } from "@testing-library/react";
import { CustomHandleType } from '@/components';

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
    <HasManyHandle nodeId="1" />
  );
});

describe('<HasManyHandle />', () => {
  it('calls another component with a prop with value "through"', () => {
    render(renderReadyComponent);
    expect(screen.getByText(/has_many/i)).toBeInTheDocument();
  });
  

  it('renders correctly', () => {
    const renderedContainer = render(renderReadyComponent );
    expect(renderedContainer).toMatchSnapshot();
  });

});