import {TableName} from '../TableName';
import { render, screen, renderHook, fireEvent } from "@testing-library/react";
import useStore from '@/zustandStore/store';

let renderReadyComponent: JSX.Element;

beforeEach(() => {
  useStore.setState({
    tables: {
      "1": {name: "Mock Name", attributes: {}, superclassId: ""},
    },
    onNodeTableChange: jest.fn() 
  })
  
  renderReadyComponent = (
    <TableName nodeId="2" tableId="1"></TableName>
  );
});

describe('<TableName />', () => {
  it('renders the name of the table', () => {
    render(renderReadyComponent);
    expect(screen.getAllByText(/Mock Name/i)[0]).toBeInTheDocument();
  });

  it('renders a dropdown menu to select the table when the table name is clicked by right mouse button', () => {
    render(renderReadyComponent);

    expect(screen.queryByText(/MockTableOptions/i)).not.toBeInTheDocument();
    
    const buttonEl = screen.getAllByText("Mock Name")[0]
    fireEvent.contextMenu(buttonEl)

    expect(screen.getByText(/MockTableOptions/i)).toBeInTheDocument();
  });

  it('hides the dropdown menu when the parent element of the table name is left', () => {
    render(renderReadyComponent);
    
    const buttonEl = screen.getAllByText("Mock Name")[0]
    fireEvent.contextMenu(buttonEl);

    expect(screen.getByText(/MockTableOptions/i)).toBeInTheDocument();

    fireEvent.mouseLeave(buttonEl.parentElement!);

    expect(screen.queryByText(/MockTableOptions/i)).not.toBeInTheDocument();
  });
  
  it('renders correctly', () => {
    const renderedContainer = render(renderReadyComponent );
    expect(renderedContainer).toMatchSnapshot();
  });
  
});