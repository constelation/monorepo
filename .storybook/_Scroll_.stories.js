// @flow

import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
// import View from '../packages/View'
import _Scroll_ from '../packages/_Scroll_/dist'

const handleScroll = () => {
  console.log('SCROLLING');
}

const handleScrollEnd = (e, payload) => {
  console.log(payload);
}

storiesOf('_Scroll_', module)
  .add('logs to console', () => (
    <div style={{height: '200vh'}}>
      <_Scroll_ onScroll={handleScroll} />
    </div>
  ))
  .add('logs to console with raf throttle', () => (
    <div style={{height: '200vh'}}>
      <_Scroll_ onScroll={handleScroll} throttle='raf' />
    </div>
  ))
  .add('logs to console scrollEnd with info', () => (
    <div style={{height: '200vh'}}>
      <_Scroll_ onScrollEnd={handleScrollEnd} passInfo />
    </div>
  ))
  .add('logs to console no payload if passInfo == false', () => (
    <div style={{height: '200vh'}}>
      <_Scroll_ onScrollEnd={handleScrollEnd} />
    </div>
  ))
