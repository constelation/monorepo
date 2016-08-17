import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import Col from '../packages/Col'

const style = {backgroundColor: 'lightgrey'}

storiesOf('Col', module)
  .add('with children', () => (
    <Col>
      <div style={{height: 20, backgroundColor: 'red'}} />
      <div style={{height: 20, backgroundColor: 'green'}} />
      <div style={{height: 20, backgroundColor: 'blue'}} />
    </Col>
  ))
  .add('justify center', () => (
    <Col
      justify='center'
      height='500px'
      style={style}
    >
      <div style={{height: 20, width: 20, backgroundColor: 'red'}} />
      <div style={{height: 20, width: 20, backgroundColor: 'green'}} />
      <div style={{height: 20, width: 20, backgroundColor: 'blue'}} />
    </Col>
  ))
  .add('align center', () => (
    <Col
      align='center'
      height='500px'
      style={style}
    >
      <div style={{height: 20, width: 20, backgroundColor: 'red'}} />
      <div style={{height: 20, width: 20, backgroundColor: 'green'}} />
      <div style={{height: 20, width: 20, backgroundColor: 'blue'}} />
    </Col>
  ))
  .add('justify and align center', () => (
    <Col
      justify='center'
      align='center'
      height='500px'
      style={style}
    >
      <div style={{height: 20, width: 20, backgroundColor: 'red'}} />
      <div style={{height: 20, width: 20, backgroundColor: 'green'}} />
      <div style={{height: 20, width: 20, backgroundColor: 'blue'}} />
    </Col>
  ))

