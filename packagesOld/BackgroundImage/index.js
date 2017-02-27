'use strict';

var React = require('react')
var glamorReact = require('glamor-react')
var _pick = require('lodash/pick')
var _omit = require('lodash/omit')
var _assign = require('lodash/assign')

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
  var styleFromProps = _pick( props, imageStyles )

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
  return _omit( props, imageProps )
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
    var propsToPass = getNonStyleProps( this.props )

    var css = _assign( {}, styleFromProps, this.props.style )
    propsToPass.css = css

    // don't want to pass style on as inline
    delete propsToPass.style

    // No need to pass the tag prop down
    delete propsToPass.tag

    // Use refNode pattern to pass back the DOM's node
    if (propsToPass.refNode) {
      propsToPass.ref = propsToPass.refNode
      delete propsToPass.refNode
    }

    return glamorReact.createElement( this.props.tag, propsToPass )
  }
})

module.exports = BackgroundImage
