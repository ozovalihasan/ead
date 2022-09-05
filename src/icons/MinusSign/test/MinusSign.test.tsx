import { MinusSign } from '../MinusSign';
import { render } from '@testing-library/react';

let renderReadyComponent: JSX.Element;

beforeEach(() => {
  renderReadyComponent = (
    <MinusSign></MinusSign>
  );
});

describe('<MinusSign />', () => {
  it('renders correctly', () => {
    const renderedContainer = render(renderReadyComponent );
    expect(renderedContainer).toMatchSnapshot();
  });
  
});