import React from 'react'
import { style } from 'glamor'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import View from 'constelation-View'

class TransitionGroupView extends React.PureComponent {
  static defaultProps = {
    component: View,
  }

  // TODO: update state if props change
  state = {
    transitionStyles: style({
      '&.appear': this.props.willAppear,
      '&.appear-active': this.props.appear,
      '&.enter': this.props.willEnter,
      '&.enter-active': this.props.enter,
      '&.leave': this.props.willLeave,
      '&.leave.leave-active': this.props.leave,
    }),
    transitionName: {
      appear: this.props.willAppear && 'appear',
      enterAppear: this.props.appear && 'appear-active',
      enter: this.props.willEnter && 'enter',
      enterActive: this.props.enter && 'enter-active',
      leave: this.props.willLeave && 'leave',
      leaveActive: this.props.leave && 'leave-active',
    }
  }

  render() {
    // Do not forward these props
    const props = { ...this.props }
    delete props.willAppear
    delete props.appear
    delete props.willEnter
    delete props.enter
    delete props.willLeave
    delete props.leave
    delete props.appearDuration
    delete props.enterDuration
    delete props.leaveDuration

    return (
      <CSSTransitionGroup
        {...props}
        transitionName={this.state.transitionName}
        transitionAppear={Boolean(this.props.willAppear || this.props.appear)}
        transitionAppearTimeout={this.props.appearDuration}
        transitionEnter={Boolean(this.props.willEnter || this.props.enter)}
        transitionEnterTimeout={this.props.enterDuration}
        transitionLeave={Boolean(this.props.willLeave || this.props.leave)}
        transitionLeaveTimeout={this.props.leaveDuration}
      >
        {
          React.Children.map(this.props.children, (Child) => (
            React.cloneElement(Child, { ...this.state.transitionStyles })
          ))
        }
      </CSSTransitionGroup>
    )
  }
}

module.exports = TransitionGroupView
