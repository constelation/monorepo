import { configure } from '@kadira/storybook'

function loadStories() {
  require('./Button.stories.js')
  require('./BackgroundImage.stories.js')
  require('./View.stories.js')
  require('./Paint.stories.js')
  require('./Col.stories.js')
  require('./Row.stories.js')
  require('./Text.stories.js')
}

configure(loadStories, module)
