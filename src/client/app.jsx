import React from 'react';
import ReactDOM from 'react-dom';
import TextMod from '../shared/modules/textMod';
import OnTapMod from '../shared/modules/onTapMod';
import TwitterMod from '../shared/modules/twitterMod';
import IdForm from './idForm';
import Config from './config';

let id;
let config;

/**
 * Renders modules to the DOM based on what
 * was recieved by Config.
 * Used as a callback function for config.
 */
function run() {
  let i = 1;
  ReactDOM.render(config.layout, document.querySelector('.table'));

  for (const module of config.modules) {
    switch (module.type) { // Add new modules here
      case 'OnTapMod':
        ReactDOM.render(
          <OnTapMod
            width={module.props.width}
            height={module.props.height}
          />,
          document.querySelector(`.mod${i}`)
        );
        break;
      case 'TextMod':
        ReactDOM.render(
          <TextMod
            name={module.props.name}
            title={module.props.title}
            body={module.props.body}
            bgImg={module.props.bgImg}
            width={module.props.width}
            height={module.props.height}
          />,
          document.querySelector(`.mod${i}`)
        );
        break;
      case 'TwitterMod':
        ReactDOM.render(
          <TwitterMod
            link={module.props.link}
          />,
          document.querySelector(`.mod${i}`)
        );
        break;
      default:
        break;
    }
    i += 1;
  }
}

if (localStorage.getItem('id') == null) { // Do we already have the id saved?
  ReactDOM.render(<IdForm />, document.querySelector('.app'));
} else {
  id = localStorage.getItem('id');
  config = new Config(id);
  config.load(run);
}
