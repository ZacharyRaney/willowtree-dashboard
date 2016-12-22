import ReactDOM from 'react-dom';
import Layouts from '../shared/layouts';
import TextMod from '../shared/modules/textMod';

const layouts = new Layouts();
const textMod = new TextMod(
  'APP ANALYTICS',
  'Regal Cinemas',
  'In the month of September, 30 million people used the Regal Cinemas app. This is a 20% increase from the previous months of the summer.',
  'http://placehold.it/960x540'
);

ReactDOM.render(layouts.default, document.querySelector('.table'));
ReactDOM.render(textMod.getView(960, 540), document.querySelector('.mod1'));
ReactDOM.render(textMod.getView(960, 540), document.querySelector('.mod2'));
ReactDOM.render(textMod.getView(960, 540), document.querySelector('.mod3'));
ReactDOM.render(textMod.getView(960, 540), document.querySelector('.mod4'));
