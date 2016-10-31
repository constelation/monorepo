'use strict';

var React = require('react')
var _pick = require('lodash/pick')
var _omit = require('lodash/omit')
var _assign = require('lodash/assign')

var styles = [
  'background',
  'backgroundColor',
  'boxShadow',
  'borderBottomColor',
  'borderBottomLeftRadius',
  'borderBottomRightRadius',
  'borderBottomWidth',
  'borderColor',
  'borderLeftColor',
  'borderLeftWidth',
  'borderRadius',
  'borderRightColor',
  'borderRightWidth',
  'borderStyle',
  'borderTopColor',
  'borderTopLeftRadius',
  'borderTopRightRadius',
  'borderTopWidth',
  'borderWidth',
  'opacity',
  'transform',
  'transition',
  'visibility',
  'willChange'
]

function getStyleFromProps( props ) {
  return _pick( props, styles )
}

function getNonStyleProps( props ) {
  return _omit( props, styles )
}

module.exports = class extends React.PureComponent {
  static displayName = 'Style_'

  render() {
    var styleFromProps = getStyleFromProps( this.props )
    var propsToPass = getNonStyleProps( this.props )

    var Child = React.Children.only(this.props.children)

    // Style_'s render() runs before Child's, so add its style props back in
    var style = _assign( {}, styleFromProps, this.props.style, Child.props.style )
    propsToPass.style = style

    // without removing children, this would infinite loop
    delete propsToPass.children

    return React.cloneElement( Child, propsToPass )
  }
}
