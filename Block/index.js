var React = require('react')
var assign = require('lodash/assign')
var styleUtils = require('../shared/styleUtils.js')

var componentStyle = {
  display: 'block'
}

module.exports = React.createClass({

  displayName: 'Block',

  getDefaultProps() {
    return {tag: 'div'}
  },

  render() {
    var styleFromProps = styleUtils.getDisplayStyles( this.props )
    var propsWithoutStyle = styleUtils.getNonDisplayProps( this.props )

    var style = assign({}, styleFromProps, this.props.style, componentStyle)
    var passedProps = assign({}, propsWithoutStyle, { style: style })

    // No need to pass the tag prop down
    delete passedProps.tag

    return <this.props.tag {...passedProps}/>
  }
})
