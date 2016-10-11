import { configure } from '@kadira/storybook'

function loadStories() {
  require('./Button.stories.js')
  require('./BackgroundImage.stories.js')
  require('./View.stories.js')
  require('./Style_.stories.js')
  require('./Event_.stories.js')
  require('./Animate_.stories.js')
  require('./Playground.stories.js')
  require('./Col.stories.js')
  require('./Row.stories.js')
  require('./Text.stories.js')
}

configure(loadStories, module)
