var React = require('react')
var glamorReact = require('glamor/react')
var _omit = require('lodash/omit')
var _assign = require('lodash/assign')

var textProps = [
  'fontFamily',
  'color',
  'size',
  'height',
  'spacing',
  'bold',
  'uppercase',
  'center'
]

function getStyleFromProps( props ) {
  var style = {
    fontFamily: props.fontFamily,
    color: props.color,
    fontSize: props.size,
    letterSpacing: props.spacing,
  }

  // Bold font-weight
  if (props.bold) {
    style.fontWeight = 'bold'
  }

  // Uppercase text-transform
  if (props.uppercase) {
    style.textTransform = 'uppercase'
  }

  // Center text-align
  if (props.center) {
    style.textAlign = 'center'
  }

  var height = props.height

  // sanitize lineHeight when it is a number
  if (typeof height === 'number') {
    style.lineHeight = height + 'px'
  }
  else if (typeof height === 'string') {
    style.lineHeight = height
  }

  return style
}

function getNonStyleProps( props ) {
  return _omit( props, textProps )
}

export default class Text extends React.PureComponent {
  static propTypes = {
    children: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.array]).isRequired,
    bold: React.PropTypes.bool,
    center: React.PropTypes.bool,
    color: React.PropTypes.string,
    fontFamily: React.PropTypes.string,
    height: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
    refNode: React.PropTypes.func,
    size: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
    spacing: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
    tag: React.PropTypes.string,
    uppercase: React.PropTypes.bool,
  }

  static defaultProps = {
    tag: 'span',
  }

  render() {
    var styleFromProps = getStyleFromProps( this.props )
    var propsToPass = getNonStyleProps( this.props )

    var css = _assign( {}, styleFromProps, this.props.css )
    propsToPass.css = css

    // No need to pass the tag prop down
    delete propsToPass.tag

    // Use refNode pattern to pass back the DOM's node
    if (propsToPass.refNode) {
      propsToPass.ref = propsToPass.refNode
      delete propsToPass.refNode
    }

    return glamorReact.createElement( this.props.tag, propsToPass )
  }
}
