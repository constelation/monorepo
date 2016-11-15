import React from 'react'
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
  //  .add('Again', () => (
    //  {/* <AnimationGroup type='fadeIn'> */}
    //  {/*   {List} */}
    //  {/* </AnimationGroup> */}
    //  {/*  */}
    //
