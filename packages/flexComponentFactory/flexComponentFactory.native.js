var React = require('react')
var ReactNative = require('react-native')
var _isEmpty = require('lodash/isEmpty')
var _pick = require('lodash/pick')
var _omit = require('lodash/omit')

// from https://facebook.github.io/react-native/docs/layout-props.html
var propsToOmit = [
  'align',
  'alignSelf',
  'bottom',
  'flex',
  'flexDirection',      // consider replacing with 'direction'
  'flexWrap',           // consider replacing with 'wrap'
  'flexGrow',           // consider replacing with 'grow'
  'flexShrink',         // consider replacing with 'shrink'
  'flexBasis',          // consider replacing with 'basis'
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
  var styleFromProps = {
    alignSelf: props.alignSelf,
    alignItems: props.center ? 'center' : props.align,
    bottom: props.bottom,
    flex: props.flex,
    flexDirection: props.flexDirection,      // consider replacing with 'direction'
    flexWrap: props.flexWrap,                // consider replacing with 'wrap'
    flexGrow: props.flexGrow,                // consider replacing with 'grow'
    flexShrink: props.flexShrink,            // consider replacing with 'shrink'
    flexBasis: props.flexBasis,              // consider replacing with 'basis'
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

  // map styleAliases if there are any
  if (styleAliases) {
    var styleAliasesFromProps = _pick( props, Object.keys( styleAliases ))

    // if aliased props are found, use the styleAlias maps to convert their value
    if (!_isEmpty( styleAliasesFromProps )) {
      Object.keys( styleAliasesFromProps ).forEach(function( aliasKey ) {
        var alias = styleAliases[ aliasKey ]

        styleFromProps[ alias.property ] = alias.map[ props[ aliasKey ] ]
      })
    }
  }

  return styleFromProps
}

function getNonStyleProps( props, styleAliases ) {
  if (styleAliases) {
    return _omit( props, propsToOmit.concat( Object.keys( styleAliases ) ) )
  }

  return _omit( props, propsToOmit )
}

module.exports = function( displayName, requiredStyle, defaultStyle, styleAliases ) {
  return class extends React.PureComponent {
    static displayName = displayName

    render() {
      var styleFromProps = getStyleFromProps( this.props, styleAliases )
      var propsWithoutStyle = getNonStyleProps( this.props, styleAliases )

      var style = {...defaultStyle, ...styleFromProps, ...this.props.style, ...requiredStyle }

      // Use refNode pattern to pass back the DOM's node
      if (this.props.refNode) {
        propsWithoutStyle.ref = this.props.refNode
      }

      return this.props.animated
        ? <ReactNative.Animated.View {...propsWithoutStyle} style={style}/>
        : <ReactNative.View {...propsWithoutStyle} style={style}/>
    }
  }
}
