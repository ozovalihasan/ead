import { ThroughHandle } from '../ThroughHandle';
import { render} from "@testing-library/react";
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

  it('renders correctly', () => {
    const renderedContainer = render(renderReadyComponent );
    expect(renderedContainer).toMatchSnapshot();
  });

});