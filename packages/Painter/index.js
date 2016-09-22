'use strict';

var React = require('react')
var _pick = require('lodash/pick')
var _omit = require('lodash/omit')
var _assign = require('lodash/assign')

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
  return _pick( props, styles )
}

function getNonStyleProps( props ) {
  return _omit( props, styles )
}

var Painter = React.createClass({
  displayName: 'Painter',

  render: function() {
    var styleFromProps = getStyleFromProps( this.props )
    var propsWithoutStyle = getNonStyleProps( this.props )

    var Child = React.Children.only(this.props.children)
    var style = [].concat.call( styleFromProps, this.props.style, Child.props.style )

    // without removing children, this would infinite loop
    delete propsWithoutStyle.children

    var passedProps = _assign( {}, propsWithoutStyle, {style: style} )

    return React.cloneElement( Child, { style } )
  }
})

module.exports = Painter
