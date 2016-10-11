'use strict';

var React = require('react')
var shallowCompare = require('react-addons-shallow-compare')
// var _pick = require('lodash/pick')
var _omit = require('lodash/omit')
var _assign = require('lodash/assign')

var customEvents = [
  'onHover',
]

var Event_ = React.createClass({
  displayName: 'Event_',

  shouldComponentUpdate: function(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState)
  },

  handleMouseEnter: function() {
    this.props.onHover(true)
  },

  handleMouseLeave: function() {
    this.props.onHover(false)
  },

  getConvertedCustomEventsFromProps: function() {
    // var eventsFromProps = _pick( this.props, customEvents )
    var eventsFromProps = {}

    if (this.props.onHover) {
      eventsFromProps.onMouseEnter = this.handleMouseEnter
      eventsFromProps.onMouseLeave = this.handleMouseLeave
    }

    return eventsFromProps
  },

  getNonCustomEventProps: function() {
    return _omit( this.props, customEvents )
  },


  render: function() {
    var eventsFromProps = this.getConvertedCustomEventsFromProps()
    var propsWithoutCustomEvents = this.getNonCustomEventProps()

    var Child = React.Children.only(this.props.children)

    // without removing children, this would infinite loop
    delete propsWithoutCustomEvents.children

    var passedProps = _assign( {}, propsWithoutCustomEvents, eventsFromProps)

    return React.cloneElement( Child, passedProps )
  }
})

module.exports = Event_
