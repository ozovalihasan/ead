import { PlusSign } from '../PlusSign';
import { render } from '@testing-library/react';

let renderReadyComponent: JSX.Element;

beforeEach(() => {
  renderReadyComponent = (
    <PlusSign></PlusSign>
  );
});

describe('<PlusSign />', () => {
  it('renders correctly', () => {
    const renderedContainer = render(renderReadyComponent );
    expect(renderedContainer).toMatchSnapshot();
  });
  
});