import * as React from 'react';
import * as ReactDOM from 'react-dom';
import PinInput from '../src';

describe('it', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<PinInput />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
