import { configure } from '@kadira/storybook'

function loadStories() {
  require('./Button.stories.js')
  require('./BackgroundImage.stories.js')
  require('./View.stories.js')
  // require('./Perf.stories.js')
  require('./Style_.stories.js')
  require('./Event_.stories.js')
  require('./Animate_.stories.js')
  require('./Playground.stories.js')
  require('./Col.stories.js')
  require('./Row.stories.js')
  require('./Text.stories.js')
  require('./Video.stories.js')
  require('./_Scroll_.stories.js')
  require('./_Resize_.stories.js')
  require('./_Media_.stories.js')
  require('./decorators.stories.js')
  require('./TransitionGroupView.stories.js')
}

configure(loadStories, module)
