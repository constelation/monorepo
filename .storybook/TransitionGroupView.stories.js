import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import View from '../packages/View'
import Style_ from '../packages/Style_'
import TransitionGroupView from '../packages/TransitionGroupView/index.js'

const style = {
  backgroundColor: 'lightgrey',
  border: '1px solid black'
}

const appearTransition = {
  willAppear: {
    opacity: 0,
  },
  appear: {
    opacity: 1,
    transition: 'opacity 1000ms ease-in',
  },
}

const enterLeaveTransition = {
  willEnter: {
    opacity: 0,
    // position: 'absolute',
  },
  enter: {
    opacity: 1,
    // position: 'absolute',
    backgroundColor: 'green',
    transition: 'opacity 300ms ease',
  },
  willLeave: {
    opacity: 1,
  },
  leave: {
    opacity: 0,
    backgroundColor: 'red',
    transition: 'opacity 300ms ease',
  },
}

storiesOf('TransitionGroupView', module)
  .add('renders children', () => (
    <TransitionGroupView>
      <View height='500px' style={style} />
      <View height='500px' style={style} />
      <View height='500px' style={style} />
    </TransitionGroupView>
  ))
  .add('renders without null, undefined, and false children', () => (
    <TransitionGroupView>
      {false}
      {null}
      {undefined}
    </TransitionGroupView>
  ))
  .add('passes props to parent View', () => (
    <Style_ backgroundColor='blue'>
      <TransitionGroupView
        flex={1}
        padding={20}
        width={300}
      >
        <View height='500px' style={style} />
        <View height='500px' style={style} />
        <View height='500px' style={style} />
      </TransitionGroupView>
    </Style_>
  ))
  .add('renders fadeIn appear', () => (
    <TransitionGroupView
      {...appearTransition}
      appearDuration={1000}
    >
      <View height='500px' style={style} />
      <View height='500px' style={style} />
      <View height='500px' style={style} />
    </TransitionGroupView>
  ))
  .add('enter with green, leave with red', () => {
    class DynamicChildren extends React.Component {
      state = {
        children: [
          <View key={1} height='200px' style={style} />,
          <View key={2} height='200px' style={style} />,
          <View key={3} height='200px' style={style} />,
        ]
      }

      componentDidMount() {
        setTimeout(() => {
          this.setState({children: [
            <View key={4} height='200px' style={style} />,
            <View key={5} height='200px' style={style} />,
            <View key={6} height='200px' style={style} />,
          ]})
        }, 600)
      }

      render() {
        return (
          <TransitionGroupView
            {...enterLeaveTransition}
            enterDuration={300}
            leaveDuration={300}
          >
            {this.state.children}
          </TransitionGroupView>
        )
      }
    }

    return (
      <DynamicChildren />
    )
  })
  .add('2000ms enterDuration', () => {
    class DynamicChildren extends React.Component {
      state = {
        children: [
          <View key={1} height='200px' style={style} />,
          <View key={2} height='200px' style={style} />,
          <View key={3} height='200px' style={style} />,
        ]
      }

      componentDidMount() {
        setTimeout(() => {
          this.setState({children: [
            <View key={4} height='200px' style={style} />,
            <View key={5} height='200px' style={style} />,
            <View key={6} height='200px' style={style} />,
          ]})
        }, 600)
      }

      render() {
        return (
          <TransitionGroupView
            {...enterLeaveTransition}
            enterDuration={2000}
            leaveDuration={300}
          >
            {this.state.children}
          </TransitionGroupView>
        )
      }
    }

    return (
      <DynamicChildren />
    )
  })
