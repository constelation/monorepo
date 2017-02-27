'use strict';

var React = require('react')
var subscribeUIEvent = require('subscribe-ui-event')

class _GlobalEvent_ extends React.Component {

  constructor() {
    super()

    this.subscriptions = []
  }

  // May want to remove this in the future and dynamically modify subscriptions if a prop changes
  shouldComponentUpdate() {
    return false
  }

  componentWillMount() {
    const {
      onScroll,
      onScrollStart,
      onScrollEnd,
      onResize,
      onResizeStart,
      onResizeEnd,
      onVisibilityChange,
    } = this.props

    // Scrolling handled by subscribe-ui-event
    if (onScroll) {
      this.subscriptions.push(subscribeUIEvent.subscribe('scroll', onScroll))
    }
    if (onScrollStart) {
      this.subscriptions.push(subscribeUIEvent.subscribe('scrollStart', onScrollStart))
    }
    if (onScrollEnd) {
      this.subscriptions.push(subscribeUIEvent.subscribe('scrollEnd', onScrollEnd))
    }

    // Resizing handled by subscribe-ui-event
    if (onResize) {
      this.subscriptions.push(subscribeUIEvent.subscribe('resize', onResize))
    }
    if (onResizeStart) {
      this.subscriptions.push(subscribeUIEvent.subscribe('resizeStart', onResizeStart))
    }
    if (onResizeEnd) {
      this.subscriptions.push(subscribeUIEvent.subscribe('resizeEnd', onResizeEnd))
    }

    // visibilitychange handled by subscribe-ui-event
    if (onVisibilityChange) {
      this.subscriptions.push(subscribeUIEvent.subscribe('visibilitychange', onVisibilityChange))
    }
  }

  componentWillUnmount() {
    this.subscriptions.forEach(function(subscription) {
      subscription.unsubscribe()
    })
  }

  render() {
    return null
  }
}

module.exports = _GlobalEvent_
