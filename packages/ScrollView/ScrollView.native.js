var React = require('react')
var ReactNative = require('react-native')
var _omit = require('lodash/omit')

var AnimatedScrollView = Animated.createAnimatedComponent(ReactNative.ScrollView);

// from https://facebook.github.io/react-native/docs/layout-props.html
var propsToOmit = [
  'align',
  'alignSelf',
  'bottom',
  'flex',
  'grow',
  'shrink',
  'basis',
  'height',
  'justify',
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
]

function getStyleFromProps( props, styleAliases ) {
  return {
    alignSelf: props.alignSelf,
    alignItems: props.center ? 'center' : props.align,
    bottom: props.bottom,
    flex: props.flex,
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
    right: props.right,
    top: props.top,
    width: props.width,
    zIndex: props.zIndex,
  }
}

function getNonStyleProps( props, styleAliases ) {
  return _omit( props, propsToOmit )
}

class ScrollView extends React.PureComponent {

  render() {
    var styleFromProps = getStyleFromProps(this.props)
    var propsWithoutStyle = getNonStyleProps(this.props)

    var style = [ styleFromProps, this.props.style ]

    // Use refNode pattern to pass back the DOM's node
    if (this.props.refNode) {
      propsWithoutStyle.ref = this.props.refNode
    }

    return this.props.animated
      ? <AnimatedScrollView {...propsWithoutStyle} style={style}/>
      : <ReactNative.ScrollView {...propsWithoutStyle} style={style}/>
  }
}

module.exports = ScrollView
