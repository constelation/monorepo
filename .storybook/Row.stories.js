import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import Row from '../packages/Row'

storiesOf('Row', module)
  .add('with children', () => (
    <Row>
      <div style={{height: 20, width: 20, backgroundColor: 'red'}} />
      <div style={{height: 20, width: 20, backgroundColor: 'green'}} />
      <div style={{height: 20, width: 20, backgroundColor: 'blue'}} />
    </Row>
  ))
