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

App.propTypes = {
  message: PropTypes.string.isRequired,
};

ReactDOM.render(<App message={test} />, document.querySelector('.app'));
