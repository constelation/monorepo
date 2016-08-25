import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import View from '../packages/View'

const style = {backgroundColor: 'lightgrey'}

storiesOf('View', module)
  .add('with children divs', () => (
    <View height='500px' style={style}>
      <div style={{height: 20, backgroundColor: 'red'}} />
      <div style={{height: 20, backgroundColor: 'green'}} />
      <div style={{height: 20, backgroundColor: 'blue'}} />
    </View>
  ))
  .add('with children flex=1 Views', () => (
    <View height='500px' style={style}>
      <View flex={1} style={{backgroundColor: 'red'}} />
      <View flex={1} style={{backgroundColor: 'green'}} />
      <View flex={1} style={{backgroundColor: 'blue'}} />
    </View>
  ))
  .add('alignVertical center alignHorizontal right', () => (
    <View
      height='500px'
      alignHorizontal='right'
      alignVertical='center'
      backgroundColor='lightgrey'
      border='1px solid black'
    >
      <View height={40} width={40} backgroundColor='red' />
      <View height={40} width={40} backgroundColor='green' />
      <View height={40} width={40} backgroundColor='blue' />
    </View>
  ))
  .add('console.logs refNode', () => (
    <View refNode={node => {console.log(node)}} />
  ))
