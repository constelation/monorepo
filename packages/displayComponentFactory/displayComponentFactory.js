var React = require('react')
var glamorReact = require('glamor/react')

var _isEmpty = require('lodash/isEmpty')
var _forEach = require('lodash/forEach')
var _keys = require('lodash/keys')
var _pick = require('lodash/pick')
var _omit = require('lodash/omit')
var _assign = require('lodash/assign')

// from https://github.com/facebook/css-layout#default-values
var layoutDefaultStyle = {
  position: 'relative',
  flexShrink: 0,
}

// from https://facebook.github.io/react-native/docs/layout-props.html
var layoutStyles = [
  'alignSelf',

  // --soon to be removed--
  'alignItems',
  'alignContent',
  'justifyContent',
  // ----

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
  'maxHeight',
  'maxWidth',
  'minHeight',
  'minWidth',
  'order',
  'overflow',
  'overflowX',
  'overflowY',
  'padding',
  'paddingBottom',
  'paddingLeft',
  'paddingRight',
  'paddingTop',
  'pointerEvents',
  'position',
  'right',
  'top',
  // 'transform',
  // 'transition',
  'width',
  'zIndex',

  //TODO: Deprecate these
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
  'outline',
]

var propsToOmit = layoutStyles.concat([
  'marginHorizontal',
  'marginVertical',
  'paddingHorizontal',
  'paddingVertical',

  // don't want to pass style or tag down
  'style',
  'inlineStyle',
  'tag',

  // soon to be moved to aliases
  'overflowScrolling',
  'align',
  'justify',
])

function getStyleFromProps( props, styleAliases ) {
  var styleFromProps = _pick( props, layoutStyles )

  // Handle Vertical and Horizontal cases (like React Native)
  if (!styleFromProps.marginTop && props.marginVertical) {
    styleFromProps.marginTop = props.marginVertical
  }
  if (!styleFromProps.marginBottom && props.marginVertical) {
    styleFromProps.marginBottom = props.marginVertical
  }
  if (!styleFromProps.marginLeft && props.marginHorizontal) {
    styleFromProps.marginLeft = props.marginHorizontal
  }
  if (!styleFromProps.marginRight && props.marginHorizontal) {
    styleFromProps.marginRight = props.marginHorizontal
  }
  if (!styleFromProps.paddingTop && props.paddingVertical) {
    styleFromProps.paddingTop = props.paddingVertical
  }
  if (!styleFromProps.paddingBottom && props.paddingVertical) {
    styleFromProps.paddingBottom = props.paddingVertical
  }
  if (!styleFromProps.paddingLeft && props.paddingHorizontal) {
    styleFromProps.paddingLeft = props.paddingHorizontal
  }
  if (!styleFromProps.paddingRight && props.paddingHorizontal) {
    styleFromProps.paddingRight = props.paddingHorizontal
  }

  // webkit-overflow-scrolling
  if (props.overflowScrolling) {
    styleFromProps.WebkitOverflowScrolling = props.overflowScrolling
  }

  // align and justify
  if (props.align) {
    styleFromProps.alignItems = props.align
  }
  if (props.justify) {
    styleFromProps.justifyContent = props.justify
  }

  // map styleAliases if there are any
  if (styleAliases) {
    var styleAliasesFromProps = _pick( props, _keys( styleAliases ))

    // if aliased props are found, use the styleAlias maps to convert their value
    if (!_isEmpty( styleAliasesFromProps )) {
      _forEach( _keys( styleAliasesFromProps ), function( aliasKey ) {
        var alias = styleAliases[ aliasKey ]

        styleFromProps[ alias.property ] = alias.map[ props[ aliasKey ] ]
      })
    }
  }

  return styleFromProps
}

function getNonStyleProps( props, styleAliases ) {
  if (styleAliases) {
    return _omit( props, propsToOmit.concat( _keys( styleAliases ) ) )
  }

  return _omit( props, propsToOmit )
}

module.exports = function( displayName, requiredStyle, defaultStyle, styleAliases ) {
  return class extends React.PureComponent {
    static displayName = displayName

    static propTypes = {
      refNode: React.PropTypes.func,
    }

    static defaultProps = {
      tag: 'div',
    }

    render() {
      var styleFromProps = getStyleFromProps( this.props, styleAliases )
      var propsToPass = getNonStyleProps( this.props, styleAliases )

      var css = _assign( {}, layoutDefaultStyle, defaultStyle, styleFromProps, this.props.style, requiredStyle )
      propsToPass.css = css

      // inlineStyle should pass down as style to apply inline
      propsToPass.style = this.props.inlineStyle

      // Use refNode pattern to pass back the DOM's node
      if (propsToPass.refNode) {
        propsToPass.ref = propsToPass.refNode
        delete propsToPass.refNode
      }

      return glamorReact.createElement( this.props.tag, propsToPass )
    }
  }
}
