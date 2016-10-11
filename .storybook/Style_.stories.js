import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import View from '../packages/View'
import Style_ from '../packages/Style_'

storiesOf('Style_', module)
  .add('Style_Views inside a Style_View', () => (
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
  .add('nested Style_s combine', () => (
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
  .add('joined transitions', () => (
    <Style_
      backgroundColor='red'
      border='1px solid black'
      transition='background-color 1000ms ease'
    >
      <View
        height='500px'
        width='200px'
        transform='translateX(-50px)'
        transition='transform 2000ms ease'
      />
    </Style_>
  ))
