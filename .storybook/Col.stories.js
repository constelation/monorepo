import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import Col from '../packages/Col'

storiesOf('Col', module)
  .add('with children', () => (
    <Col>
      <div style={{height: 20, backgroundColor: 'red'}} />
      <div style={{height: 20, backgroundColor: 'green'}} />
      <div style={{height: 20, backgroundColor: 'blue'}} />
    </Col>
  ))
  .add('console.logs refNode', () => (
    <Col refNode={node => {console.log(node)}} />
  ))
