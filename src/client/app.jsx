import React from 'react';
import ReactDOM from 'react-dom';
import Layouts from '../shared/layouts';
import TextMod from '../shared/modules/textMod';
import OnTapMod from '../shared/modules/onTapMod';

const layouts = new Layouts();
const textMod = {
  name: 'APP ANALYTICS',
  title: 'Regal Cinemas',
  body: 'In the month of September, 30 million people used the Regal Cinemas app. This is a 20% increase from the previous months of the summer.',
  bgImg: 'http://placehold.it/960x540',
  width: 960,
  height: 540,
};

ReactDOM.render(layouts.default, document.querySelector('.table'));
ReactDOM.render(
  <OnTapMod
    width={960}
    height={540}
  />,
  document.querySelector('.mod1')
);
ReactDOM.render(
  <TextMod
    name={textMod.name}
    title={textMod.title}
    body={textMod.body}
    bgImg={textMod.bgImg}
    width={textMod.width}
    height={textMod.height}
  />,
  document.querySelector('.mod2')
);
ReactDOM.render(
  <TextMod
    name={textMod.name}
    title={textMod.title}
    body={textMod.body}
    bgImg={textMod.bgImg}
    width={textMod.width}
    height={textMod.height}
  />,
  document.querySelector('.mod3')
);
ReactDOM.render(
  <TextMod
    name={textMod.name}
    title={textMod.title}
    body={textMod.body}
    bgImg={textMod.bgImg}
    width={textMod.width}
    height={textMod.height}
  />,
  document.querySelector('.mod4')
);
