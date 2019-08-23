import React from 'react';
import ReactDOM from 'react-dom';
import FolderSidebar from './FolderSidebar';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<FolderSidebar />, div);
  ReactDOM.unmountComponentAtNode(div);
});