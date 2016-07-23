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
    tag: React.PropTypes.string,
    size: React.PropTypes.string,
    repeat: React.PropTypes.string,
    position: React.PropTypes.string,
    origin: React.PropTypes.string,
    attachment: React.PropTypes.string,
    clip: React.PropTypes.string,
    color: React.PropTypes.string,
  },

  getDefaultProps() {
    return {
      tag: 'div',
      size: 'cover',
    }
  },

  render() {
    var styleFromProps = getStyleFromProps( this.props )
    var propsWithoutStyle = getNonStyleProps( this.props )

    var style = [].concat.call( styleFromProps, this.props.style )
    var passedProps = assign( {}, propsWithoutStyle, {style: style} )

    // No need to pass the tag prop down
    delete passedProps.tag

    return React.createElement( this.props.tag, passedProps )
  }
})

module.exports = radium( BackgroundImage )
