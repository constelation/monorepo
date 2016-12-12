// @flow

import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
// import View from '../packages/View'
import _Scroll_ from '../packages/_Scroll_/dist'

storiesOf('_Scroll_', module)
  .add('logs to console', () => (
    <div style={{height: '200vh'}}>
      <_Scroll_ onScroll={action('scrolling')} />
    </div>
  ))
  .add('logs to console with raf throttle', () => (
    <div style={{height: '200vh'}}>
      <_Scroll_ onScroll={action('scrolling-throttle')} throttle='raf' />
    </div>
  ))
  .add('logs to console scrollEnd with info', () => (
    <div style={{height: '200vh'}}>
      <_Scroll_ onEnd={action('scrollEnd-info')} passInfo />
    </div>
  ))
