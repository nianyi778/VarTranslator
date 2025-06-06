import inlineCss from '../../../dist/all/index.css?inline';
import { initAppWithShadow } from '@extension/shared';
import App from '@src/matches/all/App';

// window.addEventListener('vargen:show', (e: Event) => {
//   const { text, position } = (e as CustomEvent).detail;

//   initAppWithShadow({
//     id: 'CEB-extension-all',
//     app: <App text={text} position={position} />,
//     inlineCss,
//   });
// });

initAppWithShadow({
  id: 'CEB-extension-all',
  app: <App />,
  inlineCss,
});
