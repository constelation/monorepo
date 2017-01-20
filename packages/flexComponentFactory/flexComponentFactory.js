var React = require('react')
var glamorReact = require('glamor/react')

var _isEmpty = require('lodash/isEmpty')
var _forEach = require('lodash/forEach')
var _keys = require('lodash/keys')
var _pick = require('lodash/pick')
var _omit = require('lodash/omit')
var _assign = require('lodash/assign')

var propsToOmit = [
  'alignSelf',
  'align',
  'alignContent',
  'justify',
  'bottom',
  'flex',
  'flexDirection',      // consider replacing with 'direction'
  'flexWrap',           // consider replacing with 'wrap'
  'flexGrow',           // consider replacing with 'grow'
  'flexShrink',         // consider replacing with 'shrink'
  'flexBasis',          // consider replacing with 'basis'

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
  'width',
  'zIndex',
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
  'hidden',
  'inline',
  'fit',
  'center',

  'hitSlop',
  'hitSlopVertical',
  'hitSlopHorizontal',
  'hitSlopTop',
  'hitSlopRight',
  'hitSlopBottom',
  'hitSlopLeft',
]

function getStyleFromProps( props, styleAliases ) {
  // some defaults from https://github.com/facebook/css-layout#default-values
  var styleFromProps = {
    alignSelf: props.alignSelf,
    alignItems: props.center ? 'center' : props.align,
    alignContent: props.alignContent,
    bottom: props.bottom,
    display: props.hidden ? 'none' : (props.inline ? 'inline-flex' : 'flex'),
    flex: props.flex,
    flexDirection: props.direction || props.flexDirection,      // consider replacing with 'direction'
    flexWrap: props.wrap || props.flexWrap,                // consider replacing with 'wrap'
    flexGrow: props.grow === true ? 1 : props.grow || props.flexGrow,                // consider replacing with 'grow'
    flexShrink: props.shrink || props.flexShrink,       // consider replacing with 'shrink'
    flexBasis: props.basis || props.flexBasis,              // consider replacing with 'basis'
    height: props.fit ? '100%' : props.height,
    justifyContent: props.center ? 'center' : props.justify,
    left: props.left,
    margin: props.margin,
    marginBottom: props.marginBottom || props.marginVertical,
    marginLeft: props.marginLeft || props.marginHorizontal,
    marginRight: props.marginRight || props.marginHorizontal,
    marginTop: props.marginTop || props.marginVertical,
    maxHeight: props.maxHeight,
    maxWidth: props.maxWidth,
    minHeight: props.minHeight,
    minWidth: props.minWidth,
    order: props.order,
    overflow: props.overflow,
    overflowX: props.overflowX,
    overflowY: props.overflowY,
    padding: props.padding,
    paddingBottom: props.paddingBottom || props.paddingVertical,
    paddingLeft: props.paddingLeft || props.paddingHorizontal,
    paddingRight: props.paddingRight || props.paddingHorizontal,
    paddingTop: props.paddingTop || props.paddingVertical,
    pointerEvents: props.pointerEvents,
    position: props.position,
    right: props.right,
    top: props.top,
    width: props.fit ? '100%' : props.width,
    WebkitOverflowScrolling: props.overflowScrolling,
    zIndex: props.zIndex,
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

function hasHitSlopProp(props) {
  return props.hitSlop
    || props.hitSlopVertical
    || props.hitSlopHorizontal
    || props.hitSlopTop
    || props.hitSlopRight
    || props.hitSlopBottom
    || props.hitSlopLeft
}

function getNonStyleProps( props, styleAliases ) {
  if (styleAliases) {
    return _omit( props, propsToOmit.concat( _keys( styleAliases ) ) )
  }

  return _omit( props, propsToOmit )
}

const Slop = (props) => (
  <span
    style={{
      position: 'absolute',
      top: -(props.hitSlopTop || props.hitSlopVertical || props.hitSlop || 0),
      right: -(props.hitSlopRight || props.hitSlopHorizontal || props.hitSlop || 0),
      bottom: -(props.hitSlopBottom || props.hitSlopVertical || props.hitSlop || 0),
      left: -(props.hitSlopLeft || props.hitSlopHorizontal || props.hitSlop || 0),
    }}
  />
)

module.exports = function( displayName, requiredStyle, defaultStyle, styleAliases ) {
  return class extends React.PureComponent {
    static displayName = displayName

    static defaultProps = {
      tag: 'div',
      flexShrink: 0,
      position: 'relative',
      alignContent: 'flex-start',
      align: 'stretch',
    }

    render() {
      var styleFromProps = getStyleFromProps( this.props, styleAliases )
      var propsToPass = getNonStyleProps( this.props, styleAliases )

      var css = _assign( {}, defaultStyle, styleFromProps, this.props.style, requiredStyle )
      propsToPass.css = css

      // inlineStyle should pass down as style to apply inline
      propsToPass.style = this.props.inlineStyle

      // Use refNode pattern to pass back the DOM's node
      if (propsToPass.refNode) {
        propsToPass.ref = propsToPass.refNode
        delete propsToPass.refNode
      }

      if (hasHitSlopProp(this.props)) {
        const HitSlop = (
          <Slop
            hitSlop={this.props.hitSlop}
            hitSlopTop={this.props.hitSlopTop}
            hitSlopRight={this.props.hitSlopRight}
            hitSlopBottom={this.props.hitSlopBottom}
            hitSlopLeft={this.props.hitSlopLeft}
            hitSlopVertical={this.props.hitSlopVertical}
            hitSlopHorizontal={this.props.hitSlopHorizontal}
          />
        )

        if (propsToPass.children == null) {
          propsToPass.children = HitSlop
        }
        else {
          // convert children to array, then prepend Slop
          propsToPass.children = React.Children.toArray(propsToPass.children)
          propsToPass.children.unshift(HitSlop)
        }
      }

      return glamorReact.createElement( this.props.tag, propsToPass )
    }
  }
}
