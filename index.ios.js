import { AppRegistry } from 'react-native';
import { getStorybookUI, configure } from '@kadira/react-native-storybook';
import './.storybook/addons.native';

// import your stories
configure(function() {
  // require('./Button.stories')
  // require('./BackgroundImage.stories')
  // require('./View.stories')
  require('./.storybook/NativeView.stories')
  // require('./Perf.stories')
  // require('./Style_.stories')
  // require('./Event_.stories')
  // require('./Animate_.stories')
  // require('./Playground.stories')
  // require('./Col.stories')
  // require('./Row.stories')
  // require('./Text.stories')
  // require('./Video.stories')
  // require('./_Scroll_.stories')
  // require('./_Resize_.stories')
  // require('./_Media_.stories')
  // require('./decorators.stories')
  // require('./TransitionGroupView.stories')
}, module);

const StorybookUI = getStorybookUI({port: 9001, host: 'localhost'});
AppRegistry.registerComponent('Constelation', () => StorybookUI);
