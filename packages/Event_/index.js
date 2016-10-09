'use strict';

var React = require('react')
var _pick = require('lodash/pick')
var _omit = require('lodash/omit')
var _assign = require('lodash/assign')

var events = [
  'onClick',
]

var eventsAndCustomEvents = events.concat([
  'onHover',
])

function getNonEventProps( props ) {
  return _omit( props, eventsAndCustomEvents )
}

var Event_ = React.createClass({
  displayName: 'Event_',

  handleMouseEnter: function() {
    this.props.onHover(true)
  },

  handleMouseLeave: function() {
    this.props.onHover(false)
  },

  getEventsFromProps: function() {
    var eventsFromProps = _pick( this.props, events )

    if (this.props.onHover) {
      eventsFromProps.onMouseEnter = this.handleMouseEnter
      eventsFromProps.onMouseLeave = this.handleMouseLeave
    }

    return eventsFromProps
  },

  render: function() {
    var eventsFromProps = this.getEventsFromProps()
    var propsWithoutEvents = getNonEventProps( this.props )

    var Child = React.Children.only(this.props.children)

    // without removing children, this would infinite loop
    delete propsWithoutEvents.children

    var passedProps = _assign( {}, propsWithoutEvents, eventsFromProps)

    return React.cloneElement( Child, passedProps )
  }
})

module.exports = Event_
