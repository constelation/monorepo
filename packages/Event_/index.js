'use strict';

var React = require('react')
// var _pick = require('lodash/pick')
var _omit = require('lodash/omit')
var _assign = require('lodash/assign')

var customEvents = [
  'onHover',
]

module.exports = class extends React.PureComponent {
  static displayName = 'Event_'

  constructor() {
    super()

    this.handleMouseEnter = this.handleMouseEnter.bind(this)
    this.handleMouseLeave = this.handleMouseLeave.bind(this)
    this.getConvertedCustomEventsFromProps = this.getConvertedCustomEventsFromProps.bind(this)
    this.getNonCustomEventProps = this.getNonCustomEventProps.bind(this)
  }

  handleMouseEnter() {
    this.props.onHover(true)
  }

  handleMouseLeave() {
    this.props.onHover(false)
  }

  getConvertedCustomEventsFromProps() {
    // var eventsFromProps = _pick( this.props, customEvents )
    var eventsFromProps = {}

    if (this.props.onHover) {
      eventsFromProps.onMouseEnter = this.handleMouseEnter
      eventsFromProps.onMouseLeave = this.handleMouseLeave
    }

    return eventsFromProps
  }

  getNonCustomEventProps() {
    return _omit( this.props, customEvents )
  }


  render() {
    var eventsFromProps = this.getConvertedCustomEventsFromProps()
    var propsToPass = this.getNonCustomEventProps()

    var Child = React.Children.only(this.props.children)

    // without removing children, this would infinite loop
    delete propsToPass.children

    _assign(propsToPass, eventsFromProps)

    return React.cloneElement( Child, propsToPass )
  }
}
