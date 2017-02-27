'use strict';

var React = require('react')
var subscribeUIEvent = require('subscribe-ui-event')

/*
 * <_Resize_ onResize={this.handleResize} throttle='raf' />
 */
class _Resize_ extends React.Component {

  constructor() {
    super()

    this.resize = null
    this.resizeStart = null
    this.resizeEnd = null
  }

  // May want to remove this in the future and dynamically modify subscriptions if a prop changes
  shouldComponentUpdate() {
    return false
  }

  componentDidMount() {
    const options = {
      throttle: this.props.throttle,
      enableResizeInfo: this.props.passInfo,
      useRAF: this.props.throttle === 'RAF',
    }

    // resizeing handled by subscribe-ui-event
    if (this.props.onResize) {
      this.resize = subscribeUIEvent.subscribe('resize', this.handleResize, options)
    }
    if (this.props.onStart) {
      this.resizeStart = subscribeUIEvent.subscribe('resizeStart', this.handleResizeStart, options)
    }
    if (this.props.onEnd) {
      this.resizeEnd = subscribeUIEvent.subscribe('resizeEnd', this.handleResizeEnd, options)
    }
  }

  componentWillUnmount() {
    if (this.resize !== null) {
      this.resize.unsubscribe()
    }

    if (this.resizeStart !== null) {
      this.resizeStart.unsubscribe()
    }

    if (this.resizeEnd !== null) {
      this.resizeEnd.unsubscribe()
    }
  }

  handleResize = (e, { resize }) => {
    this.props.onResize(e, resize)
  }

  handleResizeStart = (e, { resize }) => {
    this.props.onStart(e, resize)
  }

  handleResizeEnd = (e, { resize }) => {
    this.props.onEnd(e, resize)
  }

  render() {
    return null
  }
}

module.exports = _Resize_
