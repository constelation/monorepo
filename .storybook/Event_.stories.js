import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import View from '../packages/View'
import Text from '../packages/Text'
import Style_ from '../packages/Style_'
import Event_ from '../packages/Event_/index.js'

class Hoverable extends React.Component {

  static defaultProps = {
    component: View,
  }

  state = {
    isHovering: false,
  }

  handleHover = (isHovering) => {
    this.setState({ isHovering })
  }

  render() {
    const { component, children, ...passedProps } = this.props

    return (
      <Event_ onHover={this.handleHover}>
        {
          React.createElement(
            component,
            passedProps,
            children(this.state.isHovering)
          )
        }
      </Event_>
    )
  }
}

storiesOf('Event_', module)
.add('Rotate onTap Event_View', () => {
  class EventView extends React.Component {
    state = {
      isRotated: false,
    }

    handleClick = () => {
      this.setState({isRotated: !this.state.isRotated})
    }

    render() {
      return (
        <Event_
          onTap={this.handleClick}
        >
          <Style_
            transform={`rotate(${this.state.isRotated ? '90deg' : '0deg'})`}
            transition='transform 1000ms ease'
          >
            <View
              tag='button'
              height='200px'
              width='200px'
              alignHorizontal='center'
              alignVertical='center'
            >
              <Text>Click me</Text>
            </View>
          </Style_>
        </Event_>
      )
    }
  }

  return (
    <EventView />
)})
.add('Rotate onPress Event_View', () => {
  class EventView extends React.Component {
    state = {
      isRotated: false,
    }

    handleClick = () => {
      this.setState({isRotated: !this.state.isRotated})
    }

    render() {
      return (
        <Event_
          onPress={this.handleClick}
        >
          <Style_
            transform={`rotate(${this.state.isRotated ? '90deg' : '0deg'})`}
            transition='transform 1000ms ease'
          >
            <View
              tag='button'
              height='200px'
              width='200px'
              alignHorizontal='center'
              alignVertical='center'
            >
              <Text>Click me</Text>
            </View>
          </Style_>
        </Event_>
      )
    }
  }

  return (
    <EventView />
)})
  .add('Rotate onClick Event_View', () => {
    class EventView extends React.Component {
      state = {
        isRotated: false,
      }

      handleClick = () => {
        this.setState({isRotated: !this.state.isRotated})
      }

      render() {
        return (
          <Event_
            onClick={this.handleClick}
          >
            <Style_
              transform={`rotate(${this.state.isRotated ? '90deg' : '0deg'})`}
              transition='transform 1000ms ease'
            >
              <View
                tag='button'
                height='200px'
                width='200px'
                alignHorizontal='center'
                alignVertical='center'
              >
                <Text>Click me</Text>
              </View>
            </Style_>
          </Event_>
        )
      }
    }

    return (
      <EventView />
  )})
  .add('Hover Event_Style_View joined transitions', () => {
    class EventStyleView extends React.Component {
      state = {
        backgroundColor: 'lightGrey',
        translateX: '-50px',
      }

      handleHover = (isHovering) => {
        this.setState({
          backgroundColor: (isHovering) ? 'red' : 'lightGrey',
          translateX: (isHovering) ? '0px' : '-50px',
        })
      }

      render() {
        return (
          <Event_
            onHover={this.handleHover}
          >
            <Style_
              backgroundColor={this.state.backgroundColor}
              border='1px solid black'
              transform={`translateX(${this.state.translateX})`}
              transition='background-color 1000ms ease, transform 2000ms ease'
            >
              <View
                height='500px'
                width='200px'
                alignHorizontal='center'
                alignVertical='center'
              >
                <Text>Hover me</Text>
              </View>
            </Style_>
          </Event_>
        )
      }
    }

    return (
      <EventStyleView />
  )})
  .addWithInfo('Hoverable Style_View', () => (
    <Style_ backgroundColor='grey'>
      <Hoverable>
        {(isHovering) => (
          <Style_
            backgroundColor={isHovering ? 'red' : 'blue'}
            border='1px solid black'
            transition='background-color 1000ms ease'
          >
            <View
              height='500px'
              width='200px'
              alignHorizontal='center'
              alignVertical='center'
            >
              <Text>Hover me</Text>
            </View>
          </Style_>
        )}
      </Hoverable>
    </Style_>
  ))
  .addWithInfo('onClick and onTap', () => (
    <Event_
      onClick={action('Click')}
      onTap={action('Tap')}
    >
      <Style_
        backgroundColor='lightgrey'
        border='1px solid black'
      >
        <View
          height={200}
          width={200}
          alignHorizontal='center'
          alignVertical='center'
        >
          <Text>Click me</Text>
        </View>
      </Style_>
    </Event_>
  ))
  .addWithInfo('action', () => (
    <Event_
      action={action('action')}
    >
      <Style_
        backgroundColor='lightgrey'
        border='1px solid black'
      >
        <View
          height={200}
          width={200}
          alignHorizontal='center'
          alignVertical='center'
        >
          <Text>Click me</Text>
        </View>
      </Style_>
    </Event_>
  ))
  .addWithInfo('swipe vertical and horizontal', () => (
    <Event_
      onSwipe={action('swipe-all')}
      direction='DIRECTION_ALL'
    >
      <Style_
        backgroundColor='lightgrey'
        border='1px solid black'
      >
        <View
          height={200}
          width={200}
          alignHorizontal='center'
          alignVertical='center'
        >
          <Text>Click me</Text>
        </View>
      </Style_>
    </Event_>
  ))
