import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import View from '../packages/View'
import Text from '../packages/Text'
import Style_ from '../packages/Style_'
import Event_ from '../packages/Event_'

// import Painter from '../packages/Painter'
// import painter from '../packages/Painter'


// import { fadeIn } from 'react-animations'
// import fadeIn from 'react-animations/lib/fadeIn'


// style={{
//   animation: 'x 1s',
//   animationName: Radium.keyframes(fadeIn, 'fadeIn')
// }}

// class FadeIn extends React.Component {
//   render() {
//     return (
//       <Event onHover={this.handleHover}>
//         <Animate type='fadeIn' duration={1} trigger={this.props.trigger}>
//           <Style
//             backgroundColor={this.state.backgroundColor}
//             border='1px solid black'
//             transition='color 1s ease'
//           >
//             <View height='500px' />
//           </Style>
//         </Animate>
//       </Event>
//     )
//   }
// }
//
// class AnimatedColorOnHover extends React.Component {
//   state = {
//     backgroundColor: 'lightGrey',
//   }
//
//   handleHover(isHovering) {
//     this.setState({backgroundColor: (isHovering) ? 'red' : 'lightGrey'})
//   }
//
//   render() {
//     return (
//       <Event onHover={this.handleHover}>
//         {#<{(| <transformer type='backgroundColor' duration={1} > |)}>#}
//           <Styler
//             backgroundColor={this.state.backgroundColor}
//             border='1px solid black'
//             transition='color 1s ease'
//           >
//             <View height='500px' />
//           </Styler>
//         {#<{(| </transformer> |)}>#}
//       </Event>
//     )
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
  //  .add('Again', () => (
    //  {/* <AnimationGroup type='fadeIn'> */}
    //  {/*   {List} */}
    //  {/* </AnimationGroup> */}
    //  {/*  */}
    //
  //    <Event onHover={this.handleHover}>
  //      <Animate type='fadeIn' duration={1}>
  //        <Style
  //          backgroundColor={this.state.backgroundColor}
  //          border='1px solid black'
  //          transition='color 1s ease'
  //        >
  //          <View height='500px' />
  //        </Style>
  //      </Animate>
  //    </Event>
  //  ))
    // .add('Again Names', () => (
    //   <Event_ onHover={this.handleHover} onClick >
    //     <Animate_
    //       type='fadeIn'
    //       duration={1000}
    //       trigger={this.state.trigger}
    //     >
    //       <Style_
    //         backgroundColor={this.state.backgroundColor}
    //         border='1px solid black'
    //         transition='backgroundColor 1000ms ease'
    //         willChange
    //       >
    //         <View
    //           height='500px'
    //           width='200px'
    //           transform={`translateX(${this.props.isActive ? '-50px' : '0px'})`}
    //           transition='transform 2000ms ease'
    //         />
    //       </Style_>
    //     </Animate_>
    //   </Event_>
    //
    // ))
