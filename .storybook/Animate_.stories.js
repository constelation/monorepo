import React from 'react'
import Radium, { StyleRoot } from 'radium'
import raf from 'raf'
import { storiesOf, action } from '@kadira/storybook'
import View from '../packages/View'
import Text from '../packages/Text'
import Style_ from '../packages/Style_'
import Animate_ from '../packages/Animate_'
import Event_ from '../packages/Event_'

// import { fadeIn } from 'react-animations'
// import fadeIn from 'react-animations/lib/fadeIn'


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

storiesOf('Animate_', module)
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
