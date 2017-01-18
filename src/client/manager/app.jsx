import React from 'react';
import ReactDOM from 'react-dom';
import ModForm from './modForm';
import ScreenList from './screenList';

ReactDOM.render(
  <ModForm
    id="default"
  />,
  document.querySelector('.input')
);

ReactDOM.render(<ScreenList />, document.querySelector('.screens'));
