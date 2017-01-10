import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import View from '../packages/View'
import Style_ from '../packages/Style_'

storiesOf('Style_', module)
  .addWithInfo('Style_Views inside a Style_View', () => (
    <Style_
      backgroundColor='lightgrey'
      border='1px solid black'
    >
      <View
        height='500px'
        alignHorizontal='right'
        alignVertical='center'
      >
        <Style_ backgroundColor='red'>
          <View height={40} width={40}/>
        </Style_>

        <Style_ backgroundColor='green'>
          <View height={40} width={40}/>
        </Style_>

        <Style_ backgroundColor='blue'>
          <View height={40} width={40}/>
        </Style_>
      </View>
    </Style_>
  ))
  .addWithInfo('nested Style_s combine', () => (
    <Style_ backgroundColor='lightgrey' >
      <Style_ border='1px solid black' >
        <View
          height='500px'
          alignHorizontal='right'
          alignVertical='center'
        >
        </View>
      </Style_>
    </Style_>
  ))
