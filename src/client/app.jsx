import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Layouts from '../shared/layouts';

const layouts = new Layouts();

const Picture = props => (
  <div>
    <img
      src={props.url}
      alt="placeholder"
    />
  </div>
);

Picture.propTypes = {
  url: PropTypes.string.isRequired,
};

ReactDOM.render(layouts.default, document.querySelector('.table'));
ReactDOM.render(<Picture url={'http://placehold.it/960x540'} />, document.querySelector('.mod1'));
ReactDOM.render(<Picture url={'http://placehold.it/960x540'} />, document.querySelector('.mod2'));
ReactDOM.render(<Picture url={'http://placehold.it/960x540'} />, document.querySelector('.mod3'));
ReactDOM.render(<Picture url={'http://placehold.it/960x540'} />, document.querySelector('.mod4'));
