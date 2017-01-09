var React = require('react')
var ReactNative = require('react-native')
var _omit = require('lodash/omit')

// from https://facebook.github.io/react-native/docs/layout-props.html
var propsToOmit = [
  'align',
  'alignSelf',
  'justify',
  'bottom',
  'flex',
  'direction',
  'wrap',
  'grow',
  'shrink',
  'basis',

  'height',
  'left',
  'margin',
  'marginBottom',
  'marginLeft',
  'marginRight',
  'marginTop',
  'marginHorizontal',
  'marginVertical',
  'maxHeight',
  'maxWidth',
  'minHeight',
  'minWidth',
  'overflow',
  'padding',
  'paddingBottom',
  'paddingLeft',
  'paddingRight',
  'paddingTop',
  'paddingHorizontal',
  'paddingVertical',
  'position',
  'right',
  'top',
  'width',
  'zIndex',

  'animated',
  'center',
  'refNode',

  'resizeMode',
  'tintColor',
]

function getStyleFromProps(props) {
  return {
    alignSelf: props.alignSelf,
    alignItems: props.center ? 'center' : props.align,
    bottom: props.bottom,
    flex: props.flex,
    flexDirection: props.direction,
    flexWrap: props.wrap,
    flexGrow: props.grow === true ? 1 : props.grow,
    flexShrink: props.shrink,
    flexBasis: props.basis,
    height: props.height,
    justifyContent: props.center ? 'center' : props.justify,
    left: props.left,
    margin: props.margin,
    marginBottom: props.marginBottom,
    marginLeft: props.marginLeft,
    marginRight: props.marginRight,
    marginTop: props.marginTop,
    marginHorizontal: props.marginHorizontal,
    marginVertical: props.marginVertical,
    maxHeight: props.maxHeight,
    maxWidth: props.maxWidth,
    minHeight: props.minHeight,
    minWidth: props.minWidth,
    overflow: props.overflow,
    padding: props.padding,
    paddingBottom: props.paddingBottom,
    paddingLeft: props.paddingLeft,
    paddingRight: props.paddingRight,
    paddingTop: props.paddingTop,
    paddingHorizontal: props.paddingHorizontal,
    paddingVertical: props.paddingVertical,
    position: props.position,
    resizeMode: props.resizeMode,
    right: props.right,
    tintColor: props.tintColor,
    top: props.top,
    width: props.width,
    zIndex: props.zIndex,
  }
}

function getNonStyleProps(props) {
  return _omit( props, propsToOmit )
}

class Image extends React.PureComponent {
  render() {
    var styleFromProps = getStyleFromProps( this.props, styleAliases )
    var propsWithoutStyle = getNonStyleProps( this.props, styleAliases )

    var style = {...styleFromProps, ...this.props.style }

    // Use refNode pattern to pass back the DOM's node
    if (this.props.refNode) {
      propsWithoutStyle.ref = this.props.refNode
    }

    return this.props.animated
      ? <ReactNative.Animated.Image {...propsWithoutStyle} style={style}/>
      : <ReactNative.Image {...propsWithoutStyle} style={style}/>
  }
}

module.exports = Image
