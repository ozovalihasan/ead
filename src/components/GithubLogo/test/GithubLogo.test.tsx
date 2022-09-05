import { GithubLogo } from '../GithubLogo';
import { render } from '@testing-library/react';

let renderReadyComponent: JSX.Element;

beforeEach(() => {
  renderReadyComponent = (
    <GithubLogo></GithubLogo>
  );
});

describe('<GithubLogo />', () => {
  it('renders correctly', () => {
    const renderedContainer = render(renderReadyComponent );
    expect(renderedContainer).toMatchSnapshot();
  });
  
});