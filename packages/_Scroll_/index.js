'use strict';

var React = require('react')
var subscribeUIEvent = require('subscribe-ui-event')

class _Scroll_ extends React.Component {

  constructor() {
    super()

    this.scroll = null
    this.scrollStart = null
    this.scrollEnd = null
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
      throttle,
      passInfo,
    } = this.props

    const options = {
      throttle,
      enableScrollInfo: passInfo,
      useRAF: throttle === 'RAF',
    }

    // Scrolling handled by subscribe-ui-event
    if (onScroll) {
      this.scroll = subscribeUIEvent.subscribe('scroll', onScroll, options)
    }
    if (onScrollStart) {
      this.scrollStart = subscribeUIEvent.subscribe('scrollStart', onScrollStart, options)
    }
    if (onScrollEnd) {
      this.scrollEnd = subscribeUIEvent.subscribe('scrollEnd', onScrollEnd, options)
    }
  }

  componentWillUnmount() {
    if (this.scroll !== null) {
      this.scroll.unsubscribe()
    }

    if (this.scrollStart !== null) {
      this.scrollStart.unsubscribe()
    }

    if (this.scrollEnd !== null) {
      this.scrollEnd.unsubscribe()
    }
  }

  render() {
    return null
  }
}

module.exports = _Scroll_
