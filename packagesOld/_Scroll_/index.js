'use strict';

var React = require('react')
var subscribeUIEvent = require('subscribe-ui-event')

/*
 * <_Scroll_ onScroll={this.handleScroll} throttle={200} />
 */
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

  componentDidMount() {
    const options = {
      throttle: this.props.throttle,
      enableScrollInfo: this.props.passInfo,
      useRAF: this.props.throttle === 'RAF',
    }

    // Scrolling handled by subscribe-ui-event
    if (this.props.onScroll) {
      this.scroll = subscribeUIEvent.subscribe('scroll', this.handleScroll, options)
    }
    if (this.props.onStart) {
      this.scrollStart = subscribeUIEvent.subscribe('scrollStart', this.handleScrollStart, options)
    }
    if (this.props.onEnd) {
      this.scrollEnd = subscribeUIEvent.subscribe('scrollEnd', this.handleScrollEnd, options)
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

  handleScroll = (e, { scroll }) => {
    this.props.onScroll(e, scroll)
  }

  handleScrollStart = (e, { scroll }) => {
    this.props.onStart(e, scroll)
  }

  handleScrollEnd = (e, { scroll }) => {
    this.props.onEnd(e, scroll)
  }

  render() {
    return null
  }
}

module.exports = _Scroll_
