import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import View from '../packages/View'
import Paint from '../packages/Paint'

storiesOf('Paint', module)
  .add('alignVertical center alignHorizontal right', () => (
    <Paint
      backgroundColor='lightgrey'
      border='1px solid black'
    >
      <View
        height='500px'
        alignHorizontal='right'
        alignVertical='center'
      >
        <Paint backgroundColor='red'>
          <View height={40} width={40}/>
        </Paint>

        <Paint backgroundColor='green'>
          <View height={40} width={40}/>
        </Paint>

        <Paint backgroundColor='blue'>
          <View height={40} width={40}/>
        </Paint>
      </View>
    </Paint>
  ))
