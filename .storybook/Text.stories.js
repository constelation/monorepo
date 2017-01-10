import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import Text from '../packages/Text'
// import Text from '../packages/Text/dist/Text.native.js'

storiesOf('Text', module)
  .addWithInfo('default', () => (
    <Text>
      this is text
    </Text>
  ))
  .addWithInfo('bold', () => (
    <Text bold >
      this is bold text
    </Text>
  ))
  .addWithInfo('italic', () => (
    <Text italic >
      this is italic text
    </Text>
  ))
  .addWithInfo('underline', () => (
    <Text underline >
      this is underlined text
    </Text>
  ))
  .addWithInfo('underline and strikethrough', () => (
    <Text decoration='line-through' underline >
      this is text
    </Text>
  ))
  .addWithInfo('uppercase', () => (
    <Text uppercase >
      this is uppercased text
    </Text>
  ))
  .addWithInfo('size, height, spacing, color', () => (
    <Text
      size={30}
      height={20}
      spacing={2}
      color='red'
    >
      this is more interesting text
    </Text>
  ))
  .addWithInfo('ellipsis', () => (
    <div style={{width: 50, display: 'flex'}}>
      <Text ellipsis >
      this is clipped text with an ellipsis
    </Text>
  </div>
  ))
.addWithInfo('antialiased', () => (
    <Text antialiased >
    this is antialiased text
  </Text>
))
