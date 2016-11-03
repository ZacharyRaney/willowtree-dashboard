import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Test from '../shared/test';

const test = new Test('Testing!').read();

const App = props => (
  <div>
    Running test...
    <p>{props.message}</p>
  </div>
);

const Picture = props => (
  <div>
    <img
      src={props.url}
      alt="placeholder"
    />
  </div>
);

App.propTypes = {
  message: PropTypes.string.isRequired,
};

Picture.propTypes = {
  url: PropTypes.string.isRequired,
};

ReactDOM.render(<App message={test} />, document.querySelector('.app'));
ReactDOM.render(<Picture url={'http://placehold.it/960x540'} />, document.querySelector('.mod1'));
ReactDOM.render(<Picture url={'http://placehold.it/960x540'} />, document.querySelector('.mod2'));
ReactDOM.render(<Picture url={'http://placehold.it/960x540'} />, document.querySelector('.mod3'));
ReactDOM.render(<Picture url={'http://placehold.it/960x540'} />, document.querySelector('.mod4'));
