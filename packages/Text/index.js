'use strict';

var React = require('react')
var radium = require('radium')
var pick = require('lodash/pick')
var omit = require('lodash/omit')
var assign = require('lodash/assign')

var textProps = [
  'fontFamily',
  'color',
  'size',
  'height',
  'spacing',
  'bold',
  'center'
]

function getStyleFromProps( props ) {
  var style = {
    fontFamily: props.fontFamily,
    color: props.color,
    fontSize: props.size,
    letterSpacing: props.spacing,
  }

  if (props.bold) {
    style.fontWeight = 'bold'
  }

  if (props.center) {
    style.textAlign = 'center'
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

function getNonStyleProps( props ) {
  return omit( props, textProps )
}

var Text = React.createClass({
  displayName: 'Text',

  propTypes: {
    children: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.array]).isRequired,
    tag: React.PropTypes.string,
    fontFamily: React.PropTypes.string,
    color: React.PropTypes.string,
    size: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
    height: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
    spacing: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
    bold: React.PropTypes.bool,
    center: React.PropTypes.bool
  },

  getDefaultProps: function() {
    return {
      tag: 'span',
    }
  },

  render: function() {
    var styleFromProps = getStyleFromProps( this.props )
    var propsWithoutStyle = getNonStyleProps( this.props )

    var style = [].concat.call( styleFromProps, this.props.style )
    var passedProps = assign( {}, propsWithoutStyle, {style: style} )

    // No need to pass the tag prop down
    delete passedProps.tag

    return React.createElement( this.props.tag, passedProps )
  }
})

module.exports = radium( Text )
