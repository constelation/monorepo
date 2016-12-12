// @flow

import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
// import View from '../packages/View'
import _Resize_ from '../packages/_Resize_/dist'

storiesOf('_Resize_', module)
  .add('onResize', () => (
    <div style={{height: '200vh'}}>
      <_Resize_ onResize={action('resize')} />
    </div>
  ))
  .add('with raf throttle', () => (
    <div style={{height: '200vh'}}>
      <_Resize_ onResize={action('resize-throttle')} throttle='raf' />
    </div>
  ))
  .add('onResizeEnd with info', () => (
    <div style={{height: '200vh'}}>
      <_Resize_ onEnd={action('resizeEnd-info')} passInfo />
    </div>
  ))
