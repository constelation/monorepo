import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
// import Event_ from '../packages/Event_'
import ViewNative from '../packages/View/dist/View.native.js'

const style = {
  backgroundColor: 'lightgrey',
  border: '1px solid black'
}

storiesOf('Native-View', module)
  .addWithInfo('with childen', () => (
    <ViewNative height={500} style={style}>
      <ViewNative flexGrow={1} style={{backgroundColor: 'red'}} />
      <ViewNative flexGrow={1} style={{backgroundColor: 'green'}} />
      <ViewNative flexGrow={1} style={{backgroundColor: 'blue'}} />
    </ViewNative>
  ))
  .addWithInfo('centered', () => (
    <ViewNative height={500} center >
      <ViewNative height={50} width={50} style={{backgroundColor: 'red'}} />
    </ViewNative>
  ))
  .addWithInfo('animated', () => (
    <ViewNative height={500} animated style={style} />
  ))
