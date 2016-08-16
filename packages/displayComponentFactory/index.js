'use strict';

var React = require('react')
var radium = require('radium')
var pick = require('lodash/pick')
var omit = require('lodash/omit')
var assign = require('lodash/assign')

// from https://facebook.github.io/react-native/docs/layout-props.html
var layoutStyles = [
  'alignItems',
  'alignSelf',
  'alignContent',
  'bottom',
  'flex',
  'flexDirection',
  'flexWrap',
  'flexGrow',
  'flexShrink',
  'flexBasis',
  'height',
  'justifyContent',
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
  'overflow',
  'overflowX',
  'overflowY',
  'padding',
  'paddingBottom',
  'paddingLeft',
  'paddingRight',
  'paddingTop',
  'position',
  'right',
  'top',
  'width',
  'zIndex'
]

var layoutProps = layoutStyles.concat([
  'marginHorizontal',
  'marginVertical',
  'paddingHorizontal',
  'paddingVertical',
  'overflowScrolling',
])

function getStyleFromProps( props ) {
  var styleFromProps = pick( props, layoutStyles )

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

  return styleFromProps
}

function getNonStyleProps( props ) {
  return omit( props, layoutProps )
}

module.exports = function( displayName, componentStyle ) {
  return radium(React.createClass({

    displayName: displayName,

    getDefaultProps: function() {
      return {tag: 'div'}
    },

    render: function() {
      var styleFromProps = getStyleFromProps( this.props )
      var propsWithoutStyle = getNonStyleProps( this.props )

      var style = [].concat.call( styleFromProps, this.props.style, componentStyle )
      var passedProps = assign( {}, propsWithoutStyle, {style: style} )

      // No need to pass the tag prop down
      delete passedProps.tag

      return React.createElement( this.props.tag, passedProps )
    }
  }))
}
