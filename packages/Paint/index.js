'use strict';

var React = require('react')
var pick = require('lodash/pick')
var omit = require('lodash/omit')

var styles = [
  'background',
  'backgroundColor',
  'boxShadow',
  'border',
  'borderTop',
  'borderRight',
  'borderBottom',
  'borderLeft',
  'borderColor',
  'borderStyle',
  'borderRadius',
  'borderWidth',
  'outline',
]

function getStyleFromProps( props ) {
  return pick( props, styles )
}

function getNonStyleProps( props ) {
  return omit( props, styles )
}

var Paint = React.createClass({
  displayName: 'Paint',

  render: function() {
    var styleFromProps = getStyleFromProps( this.props )

    var Child = React.Children.only(this.props.children)
    var style = [].concat.call( styleFromProps, Child.props.style )

    return React.cloneElement( Child, {style: style} )
  }
})

module.exports = Paint
