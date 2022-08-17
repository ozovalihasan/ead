import { CustomHandle } from '../CustomHandle';
import { render, screen } from "@testing-library/react";
import useStore from '@/zustandStore/store';
import { HandleComponentProps } from 'react-flow-renderer/dist/esm/components/Handle';

jest.mock('react-flow-renderer',  () => ({
  Handle: (
    ({ id, className, type, position, onMouseDown }: HandleComponentProps & { onMouseDown: () => void }) => (
      <>
        MockHandle
        id: {id}
        onMouseDown: {onMouseDown()}
        className: {className}
        type: {type}
        position: {JSON.stringify(position)}
      </>
    )
  ),
  Position: {
    Bottom: "positionBottom"
  }
}))

let renderReadyComponent: JSX.Element;

beforeEach(() => {
  
  useStore.setState({ 
    onChangeAssociationType: (handleType, nodeId) => `MockOnChangeAssociationType handleType:${handleType} nodeId:${nodeId}` 
  })
  
  renderReadyComponent = (
    <CustomHandle 
      id={"111"}
      nodeId={"222"}
      handleType={"mockHandleType"}
    />
  );
});

describe('<CustomHandle />', () => {
    
  it('renders Handle component with props', () => {
    render(renderReadyComponent );
    expect(screen.getByText(/MockHandle/i)).toBeInTheDocument();
  });

  it('renders correctly', () => {
    const renderedContainer = render(renderReadyComponent );
    expect(renderedContainer).toMatchSnapshot();
  });
    
});