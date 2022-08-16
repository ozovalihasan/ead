import { ThroughHandle } from '../ThroughHandle';
import { render, screen, act, renderHook, fireEvent } from "@testing-library/react";
import { EdgeTextProps } from 'react-flow-renderer';
import React from 'react';
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