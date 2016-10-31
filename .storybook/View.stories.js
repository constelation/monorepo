import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import View from '../packages/View'
// import ViewNative from '../packages/View/View.native.js'

const style = {
  backgroundColor: 'lightgrey',
  border: '1px solid black'
}

storiesOf('View', module)
  .add('with children divs and inline style', () => (
    <View height='500px' style={style}>
      <div style={{height: 20, backgroundColor: 'red'}} />
      <div style={{height: 20, backgroundColor: 'green'}} />
      <div style={{height: 20, backgroundColor: 'blue'}} />
    </View>
  ))
  .add('with children flex=1 Views', () => (
    <View height='500px' style={style}>
      <View flex={1} style={{backgroundColor: 'red'}} />
      <View flex={1} style={{backgroundColor: 'green'}} />
      <View flex={1} style={{backgroundColor: 'blue'}} />
    </View>
  ))
  .add('with children Views and inline css', () => (
    <View height='500px' css={style}>
      <View flex={1} css={{backgroundColor: 'red'}} />
      <View flex={1} css={{backgroundColor: 'green'}} />
      <View flex={1} css={{backgroundColor: 'blue'}} />
    </View>
  ))
  .add('alignVertical center alignHorizontal right', () => (
    <View
      height='500px'
      alignHorizontal='right'
      alignVertical='center'
      style={style}
    >
      <View height={40} width={40} backgroundColor='red' />
      <View height={40} width={40} backgroundColor='green' />
      <View height={40} width={40} backgroundColor='blue' />
    </View>
  ))
  .add('console.logs refNode', () => (
    <View refNode={node => {console.log(node)}} />
  ))
//
// be sure to uncomment the require line in View.native.js to get the correct displayComponentFactory
//
  // .add('Native View', () => (
  //   <ViewNative height='500px' >
  //     <ViewNative flex={1} style={{backgroundColor: 'red'}} />
  //     <ViewNative flex={1} style={{backgroundColor: 'green'}} />
  //     <ViewNative flex={1} style={{backgroundColor: 'blue'}} />
  //   </ViewNative>
  // ))
