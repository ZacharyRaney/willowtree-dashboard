import React from 'react';
import ReactDOM from 'react-dom';
import ModForm from './modForm';
import ScreenList from './screenList';
import NewScreen from './newScreen';
import LayoutSelect from './layoutSelect';

/**
 * Switches the screen selected in ModForm
 */
function updateForm(id, type) {
  if (id === 'new') {
    ReactDOM.render(<NewScreen />, document.querySelector('.input'));
  } else {
    ReactDOM.render(
      <ModForm
        id={id}
        type={type}
      />,
      document.querySelector('.input')
    );
  }
}
/**
 * Updates the layout selected in ModForm
 */
function updateLayout(layout) {
  ReactDOM.render(
    <ModForm
      layout={layout}
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

ReactDOM.render(<LayoutSelect callback={updateLayout} />, document.querySelector('.layouts'));

ReactDOM.render(
  <ScreenList
    callback={updateForm}
  />,
  document.querySelector('.screens')
);
