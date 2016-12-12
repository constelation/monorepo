import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import TransitionGroupView from '../packages/TransitionGroupView/index.js'
import View from '../packages/View'

const style = {
  backgroundColor: 'lightgrey',
  border: '1px solid black'
}

const appearTransition = {
  willAppear: {
    opacity: 0,
  },
  didAppear: {
    opacity: 1,
    transition: 'opacity 300ms ease',
  },
}

const enterLeaveTransition = {
  willEnter: {
    opacity: 0,
    // position: 'absolute',
  },
  didEnter: {
    opacity: 1,
    // position: 'absolute',
    backgroundColor: 'green',
    transition: 'opacity 300ms ease',
  },
  willLeave: {
    opacity: 1,
  },
  didLeave: {
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
  .add('renders fadeIn appear', () => (
    <TransitionGroupView
      {...appearTransition}
      appearTimeout={300}
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
            enterTimeout={300}
            leaveTimeout={300}
            flex={1}
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
