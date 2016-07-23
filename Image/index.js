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
  'backgroundSize',
]

var componentStyle = {
  backgroundSize: 'cover',
}

var Image = React.createClass({
  displayName: 'Image',

  propTypes: {
    src: React.PropTypes.string.isRequired
  },

  render() {
    var style, passedProps
    var imageStylesFromProps = pick( this.props, imageStyles )
    var propsWithoutImageStyles = omit( this.props, imageStyles )

    if (this.props.children) {
      style = [].concat.call(
        componentStyle,
        {backgroundImage: 'url("' + this.props.src + '")'},
        imageStylesFromProps,
        this.props.style
      )
      passedProps = assign({}, propsWithoutImageStyles, {style: style})

      return React.createElement( 'div', passedProps )
    }

    style = [].concat.call(imageStylesFromProps, this.props.style)
    passedProps = assign({}, propsWithoutImageStyles, {style: style})

    return React.createElement( 'img', passedProps )
  }
})

module.exports = radium( Image )
