import { configure } from '@kadira/storybook'

function loadStories() {
  require('./Col.stories.js')
  require('./Row.stories.js')
  require('./Button.stories.js')
}

configure(loadStories, module)
