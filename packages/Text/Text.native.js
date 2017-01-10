var React = require('react')
var ReactNative = require('react-native')
var _omit = require('lodash/omit')

var propsToOmit = [
  'align',
  'color',
  'fontFamily',
  'size',
  'height',
  'italic',
  'spacing',
  'bold',
  'weight',
  'underline',
  'decorationLine',
  // 'decorationLineColor',
  // 'decorationLineStyle',
  'uppercase',
  'center',
  'animated'
]

function getStyleFromProps(props) {
  return {
    color: props.color,
    fontFamily: props.fontFamily,
    fontSize: props.size,
    fontStyle: props.italic && 'italic',
    letterSpacing: props.spacing,
    lineHeight: props.height,
    fontWeight: props.bold ? 'bold' : props.weight,
    textAlign: props.center ? 'center' : props.align,
    textDecorationLine: props.underline ? 'underline' : props.decorationLine,
    // textDecorationColor: props.decorationLineColor,
    // textDecorationStyle: props.decorationLineStyle,
  }
}

function getNonStyleProps( props ) {
  return _omit( props, propsToOmit )
}

class Text extends React.PureComponent {

  // PUBLIC
  setNativeProps(nativeProps) {
    this._root.setNativeProps(nativeProps);
  }

  setRef = (component) => {
    this._root = component
  }

  render() {
    const styleFromProps = getStyleFromProps( this.props )
    const propsToPass = getNonStyleProps( this.props )

    // Handle uppercase if children is a string
    if (this.props.uppercase && typeof propsToPass.children === 'string') {
      propsToPass.children = propsToPass.children.toUpperCase()
    }

    return this.props.animated
    ? (
      <ReactNative.Animated.Text
        ref={this.setRef}
        {...propsToPass}
        style={[styleFromProps, this.props.style]}
      />
    )
    : (
      <ReactNative.Text
        ref={this.setRef}
        {...propsToPass}
        style={[styleFromProps, this.props.style]}
      />
    )
  }
}

module.exports = Text
