import {TableName} from '../TableName';
import { render } from '@testing-library/react';
import {screen} from '@testing-library/dom'

let renderReadyComponent: JSX.Element;

beforeEach(() => {
  renderReadyComponent = (
    <TableName tableId={"1"}></TableName>
  );
});

describe('<TableName />', () => {
  it('renders correctly', () => {
    render(renderReadyComponent);
    expect(screen.getByText(/Physician/i)).toBeInTheDocument();
  });

  it('renders correctly', () => {
    const renderedContainer = render(renderReadyComponent );
    expect(renderedContainer).toMatchSnapshot();
  });
  
});