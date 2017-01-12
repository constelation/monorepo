import { configure, setAddon } from '@kadira/storybook'
import infoAddon from '@kadira/react-storybook-addon-info'

function loadStories() {
  require('./Button.stories')
  require('./BackgroundImage.stories')
  require('./View.stories')
  require('./ScrollView.stories')
  require('./NativeView.stories')
  // require('./Perf.stories')
  require('./Style_.stories')
  require('./Event_.stories')
  require('./Animate_.stories')
  require('./Playground.stories')
  require('./Col.stories')
  require('./Row.stories')
  require('./Text.stories')
  require('./Video.stories')
  require('./_Scroll_.stories')
  require('./_Resize_.stories')
  require('./_Media_.stories')
  require('./decorators.stories')
  require('./TransitionGroupView.stories')
}

setAddon(infoAddon);
configure(loadStories, module)
