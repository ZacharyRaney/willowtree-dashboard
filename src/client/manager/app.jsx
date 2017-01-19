import React from 'react';
import ReactDOM from 'react-dom';
import ModForm from './modForm';
import ScreenList from './screenList';


function updateForm(id, type) {
  ReactDOM.render(
    <ModForm
      id={id}
      type={type}
    />,
    document.querySelector('.input')
  );
}

ReactDOM.render(
  <ModForm
    id="all"
    type="screen"
  />,
  document.querySelector('.input')
);

ReactDOM.render(
  <ScreenList
    callback={updateForm}
  />,
  document.querySelector('.screens')
);
