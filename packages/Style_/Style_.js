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
  'opacity',
  'outline',
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

export default class Style_ extends React.PureComponent {
  render() {
    var styleFromProps = getStyleFromProps( this.props )
    var propsToPass = getNonStyleProps( this.props )

    var Child = React.Children.only(this.props.children)

    // Style_'s render() runs before Child's, so add its css props back in
    var css = _assign( {}, styleFromProps, this.props.css, Child.props.css )
    propsToPass.css = css

    // without removing children, this would infinite loop
    delete propsToPass.children

    return React.cloneElement( Child, propsToPass )
  }
}
