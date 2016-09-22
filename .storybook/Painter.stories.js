import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import View from '../packages/View'
import Painter from '../packages/Painter'

storiesOf('Painter', module)
  .add('alignVertical center alignHorizontal right', () => (
    <Painter
      backgroundColor='lightgrey'
      border='1px solid black'
    >
      <View
        height='500px'
        alignHorizontal='right'
        alignVertical='center'
      >
        <Painter backgroundColor='red'>
          <View height={40} width={40}/>
        </Painter>

        <Painter backgroundColor='green'>
          <View height={40} width={40}/>
        </Painter>

        <Painter backgroundColor='blue'>
          <View height={40} width={40}/>
        </Painter>
      </View>
    </Painter>
  ))
  .add('nested Painters', () => (
    <Painter backgroundColor='lightgrey' >
      <Painter border='1px solid black' >
        <View
          height='500px'
          alignHorizontal='right'
          alignVertical='center'
        >
        </View>
      </Painter>
    </Painter>
  ))
