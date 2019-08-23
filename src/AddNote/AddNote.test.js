import React from 'react';
import ReactDOM from 'react-dom';
import AddNote from './AddNote';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props = {
    history: {
      push: () => {},
    },
  }
  ReactDOM.render(<AddNote {...props} />, div);
  ReactDOM.unmountComponentAtNode(div);
});