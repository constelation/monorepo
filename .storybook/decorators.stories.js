// @flow

import React from 'react'
import { storiesOf, action, decorateAction } from '@kadira/storybook'
// import View from '../packages/View'
import media from '../packages/decoratorMedia/dist'
import scroll from '../packages/decoratorScroll/dist'
import resize from '../packages/decoratorResize/dist'
import keydown from '../packages/decoratorKeydown/dist'

class Media extends React.Component {

  @media('(min-width: 500px)')
  handleChange = (matches) => {
    action('min-width: 500px')(matches)
  }

  render() {
    return <div style={{width: 500, height: 200, borderRight: '1px solid #111'}}>Resize my width</div>
  }
}

class Scroll extends React.Component {

  @scroll({passInfo: true})
  handleChange = (e, scroll) => {
    action('scroll')(scroll)
  }

  render() {
    return <div style={{width: 500, height: 2000}}>scroll me</div>
  }
}

class Resize extends React.Component {

  @resize({passInfo: true})
  handleChange = (e, resize) => {
    action('resize')(resize)
  }

  render() {
    return <div style={{width: 500, height: 2000}}>resize me</div>
  }
}

class Keydown extends React.Component {

  @keydown
  handleChange = (e) => {
    action('keydown')(e.key)
  }

  render() {
    return <div style={{width: 500, height: 2000}}>Press any key</div>
  }
}

class KeydownEsc extends React.Component {

  @keydown('Escape')
  handleChange = (e) => {
    action('keydownesc')(e.key)
  }

  render() {
    return <div style={{width: 500, height: 2000}}>Press Escape key</div>
  }
}

storiesOf('decorators', module)
  .add('keydown escape', () => (
    <KeydownEsc />
  ))
  .add('keydown', () => (
    <Keydown />
  ))
  .add('resize', () => (
    <Resize />
  ))
  .add('scroll', () => (
    <Scroll />
  ))
  .add('media change on 500px', () => (
    <Media />
  ))
