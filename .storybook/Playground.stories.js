import React from 'react'
import Radium, { StyleRoot } from 'radium'
import raf from 'raf'
import { storiesOf, action } from '@kadira/storybook'
import View from '../packages/View'
import Text from '../packages/Text'
import Style_ from '../packages/Style_'
import Animate_ from '../packages/Animate_'
import Event_ from '../packages/Event_'

// import Painter from '../packages/Painter'
// import painter from '../packages/Painter'


// import { fadeIn } from 'react-animations'
// import fadeIn from 'react-animations/lib/fadeIn'


// style={{
//   animation: 'x 1s',
//   animationName: Radium.keyframes(fadeIn, 'fadeIn')
// }}

const fadeIn = {
  from: {
    opacity: 0
  },
  to: {
    opacity: 1
  }
}

const fadeOut = {
  from: {
    opacity: 1
  },
  to: {
    opacity: 0
  }
}

// class Animate_ extends React.Component {
//
//   static defaultProps = {
//     duration: '1000ms',
//     keyframes: fadeIn,
//   }
//
//   state = {
//     animation: Radium.keyframes(this.props.keyframes),
//   }
//
//   componentWillReceiveProps(nextProps) {
//     if (nextProps.keyframes !== this.props.keyframes) {
//       this.setState({animation: Radium.keyframes(nextProps.keyframes)})
//     }
//   }
//
//   // PUBLIC
//   trigger = () => {
//     const { animation } = this.state;
//
//     this.setState({animation: ''}, () => {
//       raf(() => {
//         this.setState({ animation })
//       })
//     })
//   }
//
//   render() {
//     const { children, duration, ...passedProps } = this.props
//
//     var Child = React.Children.only(children)
//     var style = {
//       animation: `x ${duration}`,
//       animationName: this.state.animation,
//     }
//
//     return React.cloneElement( Child, {...passedProps, style} )
//   }
// }
//
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

storiesOf('Playground', module)
  .add('Style_View', () => (
        <Style_
          backgroundColor='red'
          border='1px solid black'
          transition='background-color 1000ms ease'
        >
          <View
            height='500px'
            width='200px'
            transform='translateX(-50px)'
            transition='transform 2000ms ease'
          />
        </Style_>
  ))
  .add('Rotate Event_View', () => {
    class EventView extends React.Component {
      state = {
        isRotated: false,
      }

      handleClick = () => {
        this.setState({isRotated: !this.state.isRotated})
      }

      render() {
        return (
          <Event_ onClick={this.handleClick}>
            <View
              tag='button'
              height='200px'
              width='200px'
              alignHorizontal='center'
              alignVertical='center'
              transform={`rotate(${this.state.isRotated ? '90deg' : '0deg'})`}
              transition='transform 1000ms ease'
            >
              <Text>Click me</Text>
            </View>
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
          <Event_ onHover={this.handleHover}>
            <Style_
              backgroundColor={this.state.backgroundColor}
              border='1px solid black'
              transition='background-color 1000ms ease'
            >
              <View
                height='500px'
                width='200px'
                alignHorizontal='center'
                alignVertical='center'
                transform={`translateX(${this.state.translateX})`}
                transition='transform 2000ms ease'
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
  .add('Hoverable Style_View', () => (
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
  .add('fadeIn Style_View with repeat and delay', () => (
  <StyleRoot>
    <Animate_
      type='fadeIn'
      duration='3000ms'
      delay='2000ms'
      repeat={5}
    >
      <Style_
        backgroundColor='red'
        border='1px solid black'
        transition='opacity 10000ms ease'
      >
        <View
          height='500px'
          width='200px'
          alignHorizontal='center'
          alignVertical='center'
        >
          <Text>I fade in</Text>
        </View>
      </Style_>
    </Animate_>
  </StyleRoot>
  ))
  .add('click to fadeIn Style_View', () => {
    class ClickToFadeIn extends React.Component {
      handleClick = () => {
        this.animated.trigger()
      }

      render() {
        return (
          <Event_ onClick={this.handleClick}>
            <Animate_
              type='fadeIn'
              duration='3000ms'
              ref={node => this.animated = node}
            >
              <Style_
                backgroundColor='red'
                border='1px solid black'
                transition='opacity 10000ms ease'
              >
                <View
                  height='500px'
                  width='200px'
                  alignHorizontal='center'
                  alignVertical='center'
                >
                  <Text>Click me</Text>
                </View>
              </Style_>
            </Animate_>
          </Event_>
        )
      }
    }

    return (
      <StyleRoot>
        <ClickToFadeIn />
      </StyleRoot>
    )
  })
  .add('click to custom animation Style_View', () => {
    class ClickToFadeIn extends React.Component {
      handleClick = () => {
        this.animated.trigger()
      }

      render() {
        return (
          <Event_ onClick={this.handleClick}>
            <Animate_
              //type='fadeIn'
              keyframes={{
                from: {
                  opacity: 0,
                  backgroundColor: 'red',
                },
                to: {
                  opacity: 1,
                  backgroundColor: 'blue',
                }
              }}
              duration='3000ms'
              ref={node => this.animated = node}
            >
              <Style_
                backgroundColor='red'
                border='1px solid black'
                transition='opacity 10000ms ease'
              >
                <View
                  height='500px'
                  width='200px'
                  alignHorizontal='center'
                  alignVertical='center'
                >
                  <Text>Click me</Text>
                </View>
              </Style_>
            </Animate_>
          </Event_>
        )
      }
    }

    return (
      <StyleRoot>
        <ClickToFadeIn />
      </StyleRoot>
    )
  })
  .add('click to change animation Style_View', () => {
    class ClickToFadeIn extends React.Component {
      state = {
        keyframes: {
          from: {
            opacity: 0,
            backgroundColor: 'red',
          },
          to: {
            opacity: 1,
            backgroundColor: 'blue',
          }
        }
      }

      handleClick = () => {
        this.setState({
          keyframes: {
            from: {
              opacity: 1,
            },
            to: {
              opacity: 0,
            }
          }
        })
      }

      render() {
        return (
          <Event_ onClick={this.handleClick}>
            <Animate_
              //type='fadeIn'
              ref={node => this.animated = node}
              keyframes={this.state.keyframes}
              duration='3000ms'
            >
              <Style_
                backgroundColor='red'
                border='1px solid black'
                transition='opacity 10000ms ease'
              >
                <View
                  height='500px'
                  width='200px'
                  alignHorizontal='center'
                  alignVertical='center'
                >
                  <Text>Click me</Text>
                </View>
              </Style_>
            </Animate_>
          </Event_>
        )
      }
    }

    return (
      <StyleRoot>
        <ClickToFadeIn />
      </StyleRoot>
    )
  })
  //  .add('Again', () => (
    //  {/* <AnimationGroup type='fadeIn'> */}
    //  {/*   {List} */}
    //  {/* </AnimationGroup> */}
    //  {/*  */}
    //
