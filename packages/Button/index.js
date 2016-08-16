'use strict';

var React = require('react')
var radium = require('radium')
var assign = require('lodash/assign')

var componentStyle = {
  padding: 0,
  margin: 0,
  border: 0,
  backgroundColor: 'inherit',
  outline: 'none',
}

var Button = React.createClass({
  displayName: 'Button',

  propTypes: {
    refNode: React.PropTypes.func,
  },

  render: function() {
    var style = [].concat.call( componentStyle, this.props.style )
    var passedProps = assign( {}, this.props, {style: style} )

    // Use refNode pattern to pass back the DOM's node
    if (passedProps.refNode) {
      passedProps.ref = passedProps.refNode
      delete passedProps.refNode
    }

    return React.createElement( 'button', passedProps )
  }
})

module.exports = radium( Button )
