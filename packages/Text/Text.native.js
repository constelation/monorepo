var React = require('react')
var ReactNative = require('react-native')
var _omit = require('lodash/omit')

var textStyleProps = [
  'color',
  'fontFamily',
  'size',
  'height',
  'spacing',
  'bold',
  'underline',
  // 'decorationLine',
  // 'decorationLineColor',
  // 'decorationLineStyle',
  'uppercase',
  'center'
]

function getStyleFromProps(props) {
  const style = {
    fontFamily: props.fontFamily,
    color: props.color,
    fontSize: props.size,
    letterSpacing: props.spacing,
    lineHeight: props.height,
    // textDecorationLine: props.decorationLine,
    // textDecorationColor: props.decorationLineColor,
    // textDecorationStyle: props.decorationLineStyle,
  }

  // Bold font-weight
  if (props.bold) {
    style.fontWeight = 'bold'
  }

  // underline
  if (props.underline) {
    style.textDecorationLine = 'underline'
  }

  // Center text-align
  if (props.center) {
    style.textAlign = 'center'
  }

  return style
}

function getNonStyleProps( props ) {
  return _omit( props, textStyleProps )
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
    const { children } = this.props
    const styleFromProps = getStyleFromProps( this.props )
    const propsToPass = getNonStyleProps( this.props )

    let content
    if (this.props.uppercase && typeof children === 'string') {
      content = children.toUpperCase()
    }
    else {
      content = children
    }

    return (
      <ReactNative.Text
        ref={this.setRef}
        {...propsToPass}
        style={[styleFromProps, this.props.style]}
      >
        {content}
      </ReactNative.Text>
    )
  }
}

module.exports = Text
