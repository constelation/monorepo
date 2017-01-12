import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import View from '../packages/View'
import ScrollView from '../packages/ScrollView'

const style = {
  backgroundColor: 'lightgrey',
  border: '1px solid black'
}

const stories = storiesOf('ScrollView', module)

stories.addWithInfo('with children views', () => (
  <ScrollView height={200} style={style}>
    <View height={100} style={{backgroundColor: 'red'}} />
    <View height={100} style={{backgroundColor: 'green'}} />
    <View height={100} style={{backgroundColor: 'blue'}} />
  </ScrollView>
))

stories.addWithInfo('horizontal', () => (
  <ScrollView height={200} width={200} horizontal style={style}>
    <View height={100} width={100} style={{backgroundColor: 'red'}} />
    <View height={100} width={100} style={{backgroundColor: 'green'}} />
    <View height={100} width={100} style={{backgroundColor: 'blue'}} />
  </ScrollView>
))

stories.addWithInfo('scrollEnabled=false', () => (
  <ScrollView scrollEnabled={false} height={200} style={style}>
    <View height={100} style={{backgroundColor: 'red'}} />
    <View height={100} style={{backgroundColor: 'green'}} />
    <View height={100} style={{backgroundColor: 'blue'}} />
  </ScrollView>
))

stories.addWithInfo('onScroll', () => (
  <ScrollView
    height={200}
    style={style}
    onScroll={action('onScroll')}
  >
    <View height={100} style={{backgroundColor: 'red'}} />
    <View height={100} style={{backgroundColor: 'green'}} />
    <View height={100} style={{backgroundColor: 'blue'}} />
  </ScrollView>
))

stories.add('scrollTo 50 after 1 second', () => {
  class ScrollTo extends React.Component {
    componentDidMount() {
      setTimeout(() => {
        this.refs.scrollView.scrollTo(50)
      }, 1000)
    }
    render() {
      return (
        <ScrollView
          ref='scrollView'
          height={200}
          style={style}
          onScroll={action('onScroll')}
        >
          <View height={100} style={{backgroundColor: 'red'}} />
          <View height={100} style={{backgroundColor: 'green'}} />
          <View height={100} style={{backgroundColor: 'blue'}} />
        </ScrollView>
      )
    }
  }

  return <ScrollTo />
})

stories.add('horizontal scrollTo 50 after 1 second', () => {
  class ScrollTo extends React.Component {
    componentDidMount() {
      setTimeout(() => {
        this.refs.scrollView.scrollTo(50)
      }, 1000)
    }
    render() {
      return (
        <ScrollView
          ref='scrollView'
          height={200}
          width={200} horizontal
          style={style}
          onScroll={action('onScroll')}
        >
          <View height={100} width={100} style={{backgroundColor: 'red'}} />
          <View height={100} width={100} style={{backgroundColor: 'green'}} />
          <View height={100} width={100} style={{backgroundColor: 'blue'}} />
        </ScrollView>
      )
    }
  }

  return <ScrollTo />
})

stories.add('scrollToEnd  after 1 second', () => {
  class ScrollTo extends React.Component {
    componentDidMount() {
      setTimeout(() => {
        this.refs.scrollView.scrollToEnd()
      }, 1000)
    }
    render() {
      return (
        <ScrollView
          ref='scrollView'
          height={200}
          style={style}
          onScroll={action('onScroll')}
        >
          <View height={100} style={{backgroundColor: 'red'}} />
          <View height={100} style={{backgroundColor: 'green'}} />
          <View height={100} style={{backgroundColor: 'blue'}} />
        </ScrollView>
      )
    }
  }

  return <ScrollTo />
})

stories.add('horizontal scrollToEnd 50 after 1 second', () => {
  class ScrollTo extends React.Component {
    componentDidMount() {
      setTimeout(() => {
        this.refs.scrollView.scrollToEnd()
      }, 1000)
    }
    render() {
      return (
        <ScrollView
          ref='scrollView'
          height={200}
          width={200} horizontal
          style={style}
          onScroll={action('onScroll')}
        >
          <View height={100} width={100} style={{backgroundColor: 'red'}} />
          <View height={100} width={100} style={{backgroundColor: 'green'}} />
          <View height={100} width={100} style={{backgroundColor: 'blue'}} />
        </ScrollView>
      )
    }
  }

  return <ScrollTo />
})

stories.addWithInfo('refNode', () => (
  <ScrollView
    height={200}
    style={style}
    refNode={action('refNode')}
  />
))


// stories.addWithInfo('alignHorizontal=right', () => (
//   <ScrollView
//     alignHorizontal='right'
//     height={200}
//     style={style}
//   >
//     <View height={100} width={100} style={{backgroundColor: 'red'}} />
//     <View height={100} width={100} style={{backgroundColor: 'green'}} />
//     <View height={100} width={100} style={{backgroundColor: 'blue'}} />
//   </ScrollView>
// ))
// stories.addWithInfo('horizontal alignHorizontal=right', () => (
//   <ScrollView
//     horizontal
//     alignHorizontal='right'
//     height={200}
//     style={style}
//   >
//     <View height={100} width={100} style={{backgroundColor: 'red'}} />
//     <View height={100} width={100} style={{backgroundColor: 'green'}} />
//     <View height={100} width={100} style={{backgroundColor: 'blue'}} />
//   </ScrollView>
// ))
