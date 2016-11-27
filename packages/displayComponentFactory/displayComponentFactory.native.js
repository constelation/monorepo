var React = require('react')
var ReactNative = require('react-native')
var _isEmpty = require('lodash/isEmpty')
var _pick = require('lodash/pick')
var _omit = require('lodash/omit')

// from https://facebook.github.io/react-native/docs/layout-props.html
var layoutStyles = [
  'alignSelf',
  'bottom',
  'flex',
  'flexDirection',      // consider replacing with 'direction'
  'flexWrap',           // consider replacing with 'wrap'
  'flexGrow',           // consider replacing with 'grow'
  'flexShrink',         // consider replacing with 'shrink'
  'flexBasis',          // consider replacing with 'basis'
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
]

var layoutProps = layoutStyles.concat([
  'align',
  'justify',
])

function getStyleFromProps( props, styleAliases ) {
  var styleFromProps = _pick( props, layoutStyles )

  // align and justify
  if (props.align) {
    styleFromProps.alignItems = props.align
  }
  if (props.justify) {
    styleFromProps.justifyContent = props.justify
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
    return _omit( props, layoutProps.concat( Object.keys( styleAliases ) ) )
  }

  return _omit( props, layoutProps )
}

module.exports = function( displayName, requiredStyle, defaultStyle, styleAliases ) {
  return class extends React.PureComponent {
    static displayName = displayName

    static propTypes = {
      refNode: React.PropTypes.func,
    }

    render() {
      var styleFromProps = getStyleFromProps( this.props, styleAliases )
      var propsWithoutStyle = getNonStyleProps( this.props, styleAliases )

      var style = {...defaultStyle, ...styleFromProps, ...this.props.style, ...requiredStyle }

      // Use refNode pattern to pass back the DOM's node
      if (propsWithoutStyle.refNode) {
        propsWithoutStyle.ref = propsWithoutStyle.refNode
        delete propsWithoutStyle.refNode
      }

      return <ReactNative.View {...propsWithoutStyle} style={style}/>
    }
  }
}
