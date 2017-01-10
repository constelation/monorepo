import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import Row from '../packages/Row'

const style = {backgroundColor: 'lightgrey'}

storiesOf('Row', module)
  .addWithInfo('with children', () => (
    <Row>
      <div style={{height: 20, width: 20, backgroundColor: 'red'}} />
      <div style={{height: 20, width: 20, backgroundColor: 'green'}} />
      <div style={{height: 20, width: 20, backgroundColor: 'blue'}} />
    </Row>
  ))
  .addWithInfo('justify center', () => (
    <Row
      justify='center'
      height='500px'
      style={style}
    >
      <div style={{height: 20, width: 20, backgroundColor: 'red'}} />
      <div style={{height: 20, width: 20, backgroundColor: 'green'}} />
      <div style={{height: 20, width: 20, backgroundColor: 'blue'}} />
    </Row>
  ))
  .addWithInfo('align center', () => (
    <Row
      align='center'
      height='500px'
      style={style}
    >
      <div style={{height: 20, width: 20, backgroundColor: 'red'}} />
      <div style={{height: 20, width: 20, backgroundColor: 'green'}} />
      <div style={{height: 20, width: 20, backgroundColor: 'blue'}} />
    </Row>
  ))
  .addWithInfo('justify align center', () => (
    <Row
      align='center'
      justify='center'
      height='500px'
      style={style}
    >
      <div style={{height: 20, width: 20, backgroundColor: 'red'}} />
      <div style={{height: 20, width: 20, backgroundColor: 'green'}} />
      <div style={{height: 20, width: 20, backgroundColor: 'blue'}} />
    </Row>
  ))
