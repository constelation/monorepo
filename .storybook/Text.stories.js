import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import Text from '../packages/Text'
// import Text from '../packages/Text/dist/Text.native.js'

storiesOf('Text', module)
  .add('default', () => (
    <Text>
      this is text
    </Text>
  ))
  .add('bold', () => (
    <Text bold >
      this is bold text
    </Text>
  ))
  .add('underline', () => (
    <Text underline >
      this is underlined text
    </Text>
  ))
  .add('underline and strikethrough', () => (
    <Text decoration='line-through' underline >
      this is text
    </Text>
  ))
  .add('uppercase', () => (
    <Text uppercase >
      this is uppercased text
    </Text>
  ))
  .add('size, height, spacing, color', () => (
    <Text
      size={30}
      height={20}
      spacing={2}
      color='red'
    >
      this is more interesting text
    </Text>
  ))
  .add('ellipsis', () => (
    <div style={{width: 50, display: 'flex'}}>
      <Text ellipsis >
      this is clipped text with an ellipsis
    </Text>
  </div>
  ))
.add('antialiased', () => (
    <Text antialiased >
    this is antialiased text
  </Text>
))
