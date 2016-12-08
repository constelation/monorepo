// @flow

import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
// import View from '../packages/View'
import _Media_ from '../packages/_Media_/dist'

storiesOf('_Media_', module)
  .add('logs to console', () => (
    <div style={{height: '200vh'}}>
      <_Media_ matches='(min-width: 500px)' onChange={action('media')} />
    </div>
  ))
