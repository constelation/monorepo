'use strict';

var React = require('react')
var radium = require('radium')
var pick = require('lodash/pick')
var omit = require('lodash/omit')
var assign = require('lodash/assign')

var imageStyles = [
  'width',
  'maxWidth',
  'minWidth',
  'height',
  'maxHeight',
  'minHeight',
]

var imageProps = imageStyles.concat([
  'src',
  'size',
  'repeat',
  'position',
  'origin',
  'attachment',
  'clip',
  'color',
])

function getStyleFromProps( props ) {
  var styleFromProps = pick( props, imageStyles )

  // required one
  if (props.src) {
    styleFromProps.backgroundImage = 'url("' + props.src + '")'
  }

  // optional
  if (props.size) {
    styleFromProps.backgroundSize = props.size
  }
  if (props.repeat) {
    styleFromProps.backgroundRepeat = props.repeat
  }
  if (props.position) {
    styleFromProps.backgroundPosition = props.position
  }
  if (props.origin) {
    styleFromProps.backgroundOrigin = props.origin
  }
  if (props.attachment) {
    styleFromProps.backgroundAttachment = props.attachment
  }
  if (props.clip) {
    styleFromProps.backgroundClip = props.clip
  }
  if (props.color) {
    styleFromProps.backgroundColor = props.color
  }

  return styleFromProps
}

function getNonStyleProps( props ) {
  return omit( props, imageProps )
}

var BackgroundImage = React.createClass({
  displayName: 'BackgroundImage',

  propTypes: {
    src: React.PropTypes.string.isRequired,
    attachment: React.PropTypes.string,
    clip: React.PropTypes.string,
    color: React.PropTypes.string,
    origin: React.PropTypes.string,
    position: React.PropTypes.string,
    refNode: React.PropTypes.func,
    repeat: React.PropTypes.string,
    size: React.PropTypes.string,
    tag: React.PropTypes.string,
  },

  getDefaultProps: function() {
    return {
      tag: 'div',
      size: 'cover',
    }
  },

  render: function() {
    var styleFromProps = getStyleFromProps( this.props )
    var propsWithoutStyle = getNonStyleProps( this.props )

    var style = [].concat.call( styleFromProps, this.props.style )
    var passedProps = assign( {}, propsWithoutStyle, {style: style} )

    // No need to pass the tag prop down
    delete passedProps.tag

    // Use refNode pattern to pass back the DOM's node
    if (passedProps.refNode) {
      passedProps.ref = passedProps.refNode
      delete passedProps.refNode
    }

    return React.createElement( this.props.tag, passedProps )
  }
})

module.exports = radium( BackgroundImage )
