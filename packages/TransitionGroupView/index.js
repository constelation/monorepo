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
      '&.appear-active': this.props.didAppear,
      '&.enter': this.props.willEnter,
      '&.enter-active': this.props.didEnter,
      '&.leave': this.props.willLeave,
      '&.leave.leave-active': this.props.didLeave,
    }),
    transitionName: {
      appear: this.props.willAppear && 'appear',
      enterAppear: this.props.didAppear && 'appear-active',
      enter: this.props.willEnter && 'enter',
      enterActive: this.props.didEnter && 'enter-active',
      leave: this.props.willLeave && 'leave',
      leaveActive: this.props.didLeave && 'leave-active',
    }
  }

  render() {
    // Do not forward these props
    const props = { ...this.props }
    delete props.willAppear
    delete props.didAppear
    delete props.willEnter
    delete props.didEnter
    delete props.willLeave
    delete props.didLeave
    delete props.appearTimeout
    delete props.enterTimeout
    delete props.leaveTimeout

    return (
      <CSSTransitionGroup
        {...props}
        transitionName={this.state.transitionName}
        transitionAppear={Boolean(this.props.willAppear || this.props.didAppear)}
        transitionAppearTimeout={this.props.appearTimeout}
        transitionEnter={Boolean(this.props.willEnter || this.props.didEnter)}
        transitionEnterTimeout={this.props.enterTimeout}
        transitionLeave={Boolean(this.props.willLeave || this.props.didLeave)}
        transitionLeaveTimeout={this.props.leaveTimeout}
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
