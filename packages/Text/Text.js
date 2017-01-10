var React = require('react')
var glamorReact = require('glamor/react')
var _omit = require('lodash/omit')
var _assign = require('lodash/assign')

var propsToOmit = [
  'antialiased',
  'align',
  'bold',
  'center',
  'color',
  'decoration',
  'ellipsis',
  'fontFamily',
  'height',
  'italic',
  'size',
  'spacing',
  'tag',
  'transform',
  'underline',
  'uppercase',
  'weight',
]

function getStyleFromProps(props) {
  const style = {
    fontFamily: props.fontFamily,
    color: props.color,
    fontSize: props.size,
    letterSpacing: props.spacing,
    textAlign: props.center ? 'center' : props.align,
    textDecoration: props.decoration,
    textTransform: props.uppercase ? 'uppercase' : props.transform,
    fontWeight: props.bold ? 'bold' : props.weight,
  }

  // italic
  if (props.italic) {
    style.fontStyle = 'italic'
  }

  // Underline font-weight
  if (props.underline) {
    if (style.textDecoration) {
      style.textDecoration += ' underline'
    }
    else {
      style.textDecoration = 'underline'
    }
  }

  // ellipsis
  if (props.ellipsis) {
    style.textOverflow = 'ellipsis'
    style.overflow = 'hidden'
    style.whiteSpace = 'nowrap'
  }

  // antialiased
  if (props.antialiased) {
    style.WebkitFontSmoothing = 'antialiased'
    style.MozOsxFontSmoothing = 'grayscale'
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

function getNonStyleProps(props) {
  return _omit(props, propsToOmit)
}

class Text extends React.PureComponent {

  static defaultProps = {
    tag: 'span',
    // from https://bitsofco.de/the-new-system-font-stack/
    fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell, "Helvetica Neue", sans-serif'
  }

  render() {
    var styleFromProps = getStyleFromProps(this.props)
    var propsToPass = getNonStyleProps(this.props)

    var css = _assign({}, styleFromProps, this.props.css)
    propsToPass.css = css

    // Use refNode pattern to pass back the DOM's node
    if (propsToPass.refNode) {
      propsToPass.ref = propsToPass.refNode
      delete propsToPass.refNode
    }

    return glamorReact.createElement(this.props.tag, propsToPass)
  }
}

module.exports = Text
