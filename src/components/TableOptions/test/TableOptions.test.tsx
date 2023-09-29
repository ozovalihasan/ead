import { TableOptions } from '../TableOptions';
import { render, screen, renderHook, fireEvent } from "@testing-library/react";
import { useStore } from '@/zustandStore';

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
    <TableOptions nodeId="2" tableId={"1"}></TableOptions>
  );
});

describe('<TableOptions />', () => {
  
  it('renders all table names as an option', () => {
    render(renderReadyComponent);

    const mainEl = screen.getAllByText("")[0]
    const selectEl = mainEl.getElementsByTagName("select")[0]

    expect(selectEl.getElementsByTagName("option").length).toBe(2);
    expect(selectEl).toHaveTextContent("Mock Name");
    expect(selectEl).toHaveTextContent("Mock Second Name");
  });
  
  describe("calls the onNodeTableChange function ", () => {
    it('when the select element is changed', () => {
      const { result } = renderHook(() => useStore());

      render(renderReadyComponent);

      const mainEl = screen.getAllByText("")[0]
      const selectEl = mainEl.getElementsByTagName("select")[0]

      fireEvent.change( selectEl, {target: {value: '2'}})
  
      expect(result.current.onNodeTableChange).toHaveBeenCalledTimes(1);
    });

    it('when an option is clicked', () => {
      const { result } = renderHook(() => useStore());

      render(renderReadyComponent);

      const mainEl = screen.getAllByText("")[0]
      
      const optionEl = mainEl.getElementsByTagName("option")[0]
      fireEvent.click( optionEl, {target: {value: '2'}})

      expect(result.current.onNodeTableChange).toHaveBeenCalledTimes(1);
    });

  })

  it('renders correctly', () => {
    const renderedContainer = render(renderReadyComponent );
    expect(renderedContainer).toMatchSnapshot();
  });
  
});