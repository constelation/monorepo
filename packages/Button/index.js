'use strict';

var React = require('react')
var glamorReact = require('glamor/react')
var _assign = require('lodash/assign')

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
    var css = _assign( {}, componentStyle, this.props.css )
    var propsToPass = _assign( {}, this.props, {css: css})

    // Use refNode pattern to pass back the DOM's node
    if (propsToPass.refNode) {
      propsToPass.ref = propsToPass.refNode
      delete propsToPass.refNode
    }

    return glamorReact.createElement( 'button', propsToPass )
  }
})

module.exports = Button
