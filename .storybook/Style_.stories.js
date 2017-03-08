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
          <View height={40} width={40} />
        </Style_>

        <Style_ backgroundColor='green'>
          <View height={40} width={40} />
        </Style_>

        <Style_ backgroundColor='blue'>
          <View height={40} width={40} />
        </Style_>
      </View>
    </Style_>
  ))
  .addWithInfo('transforms as props, and order matters', () => (
    <Style_
      backgroundColor='lightgrey'
      border='1px solid black'
    >
      <View
        center
        height='500px'
      >
        <Style_
          rotate='20deg'
          translateX='30px'
          backgroundColor='red'
        >
          <View height={40} width={40} />
        </Style_>

        <Style_ backgroundColor='green'>
          <View height={40} width={40} />
        </Style_>

        <Style_
          translateX='30px'
          rotate='20deg'
          backgroundColor='blue'
        >
          <View height={40} width={40} />
        </Style_>
      </View>
    </Style_>
  ))
  .addWithInfo('transforms as props and transform style', () => (
    <Style_
      backgroundColor='lightgrey'
      border='1px solid black'
    >
      <View
        center
        height='500px'
      >
        <Style_
          translateX='30px'
          transform='rotate(20deg)'
          backgroundColor='red'
        >
          <View height={40} width={40} />
        </Style_>

        <Style_ backgroundColor='green'>
          <View height={40} width={40} />
        </Style_>

        <Style_ backgroundColor='blue'>
          <View height={40} width={40} />
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
  .addWithInfo('cursors', () => (
    <Style_
      backgroundColor='lightgrey'
      border='1px solid black'
    >
      <View
        center
        height='500px'
      >
        <Style_
          cursor='pointer'
          backgroundColor='red'
        >
          <View height={40} width={40} />
        </Style_>

        <Style_
          cursor='help'
          backgroundColor='green'
        >
          <View height={40} width={40} />
        </Style_>

        <Style_
          cursor='wait'
          backgroundColor='blue'
        >
          <View height={40} width={40} />
        </Style_>
      </View>
    </Style_>
  ))
