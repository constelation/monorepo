import React from 'react'
import { storiesOf } from '@kadira/react-native-storybook';
// import Event_ from '../packages/Event_'
import View from '../packages/View/View.native.js'

const style = {
  backgroundColor: 'lightgrey',
  border: '1px solid black'
}

storiesOf('Native-View', module)
  .add('with childen', () => (
    <View height={500} style={style}>
      <View flexGrow={1} style={{backgroundColor: 'red'}} />
      <View flexGrow={1} style={{backgroundColor: 'green'}} />
      <View flexGrow={1} style={{backgroundColor: 'blue'}} />
    </View>
  ))
  .add('centered', () => (
    <View height={500} center >
      <View height={50} width={50} style={{backgroundColor: 'red'}} />
    </View>
  ))
  .add('animated', () => (
    <View height={500} animated style={style} />
  ))
