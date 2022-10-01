import {TableName} from '../TableName';
import { render, screen, renderHook, fireEvent } from "@testing-library/react";
import useStore from '@/zustandStore/store';

let renderReadyComponent: JSX.Element;

beforeEach(() => {
  useStore.setState({
    tables: {
      "1": {name: "Mock Name", attributes: {}, superclassId: ""},
      "2": {name: "Mock Second Name", attributes: {}, superclassId: ""}
    },
    onNodeTableChange: jest.fn() 
  })
  
  renderReadyComponent = (
    <TableName nodeId="2" tableId={"1"}></TableName>
  );
});

describe('<TableName />', () => {
  it('renders the name of the table', () => {
    render(renderReadyComponent);
    expect(screen.getAllByText(/Mock Name/i)[0]).toBeInTheDocument();
  });

  describe("displays a select element", () => {

    beforeEach(() => {
      render(renderReadyComponent);
  
      const mainEl = screen.getAllByText(/Mock Name/i)[0]
      fireEvent.mouseDown(mainEl, {button: 1})
      
    });

    it('renders all table names as an option', () => {
      const mainEl = screen.getAllByText(/Mock Name/i)[0]
      const selectEl = mainEl.getElementsByTagName("select")[0]

      expect(selectEl.getElementsByTagName("option").length).toBe(2);
      expect(selectEl).toHaveTextContent("Mock Name");
      expect(selectEl).toHaveTextContent("Mock Second Name");
    });

    it('can be hidden or shown with different events', () => {
      const mainEl = screen.getAllByText(/Mock Name/i)[0]
      const selectEl = mainEl.getElementsByTagName("select")[0]
      
      expect(selectEl.style.display).toBe("block");
      expect(document.activeElement).toBe(mainEl.querySelector("select"));
  
      fireEvent.mouseLeave(mainEl)
  
      expect(selectEl.style.display).toBe("none");
    });
    
    it('calls the onNodeTableChange function when the select element is changed', () => {
      const { result } = renderHook(() => useStore());

      const selectEl = screen.getAllByText("")[0].getElementsByTagName("select")[0] 
      
      fireEvent.change( selectEl, {target: {value: '2'}})
  
      expect(result.current.onNodeTableChange).toHaveBeenCalledTimes(1);
    });

  })

  it('renders correctly', () => {
    const renderedContainer = render(renderReadyComponent );
    expect(renderedContainer).toMatchSnapshot();
  });
  
});