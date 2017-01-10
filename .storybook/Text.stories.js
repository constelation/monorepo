import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import { withKnobs, text, boolean, number } from '@kadira/storybook-addon-knobs'
import Text from '../packages/Text'
// import Text from '../packages/Text/dist/Text.native.js'
const stories = storiesOf('Text', module)

// Add the `withKnobs` decorator to add knobs support to your stories.
// You can also configure `withKnobs` as a global decorator.
stories.addDecorator(withKnobs)

stories.addWithInfo('default', () => (
  <Text>
    text(this is text)
  </Text>
))
stories.addWithInfo('bold', () => (
  <Text bold={boolean('bold', true)} >
    this is bold text
  </Text>
))
stories.addWithInfo('italic', () => (
  <Text italic={boolean('italic', true)} >
    this is italic text
  </Text>
))
stories.addWithInfo('underline', () => (
  <Text underline={boolean('underline', true)} >
    this is underlined text
  </Text>
))
stories.addWithInfo('underline and strikethrough', () => (
  <Text decoration='line-through' underline={boolean('underline', true)} >
    this is text
  </Text>
))
stories.addWithInfo('uppercase', () => (
  <Text uppercase={boolean('ellipsis', true)} >
    this is uppercased text
  </Text>
))
stories.addWithInfo('size, height, spacing, color', () => (
  <Text
    size={30}
    height={20}
    spacing={2}
    color='red'
  >
    this is more interesting text
  </Text>
))
stories.addWithInfo('ellipsis', () => (
  <div style={{width: 50, display: 'flex'}}>
    <Text ellipsis={boolean('ellipsis', true)}>
      this is clipped text with an ellipsis
    </Text>
  </div>
))
stories.addWithInfo('antialiased', () => (
  <Text antialiased={boolean('antialiased', true)} >
    this is antialiased text
  </Text>
))
