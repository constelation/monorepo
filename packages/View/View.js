'use strict';

var displayComponentFactory = require('constelation-display-component-factory')

var style = {
  display: 'flex',
}

var defaultStyle = {
  flexDirection: 'column',
  alignItems: 'stretch',
  alignContent: 'flex-start',
}

var styleAliases = {
  alignHorizontal: {
    property: 'alignItems',
    map: {
      left: 'flex-start',
      center: 'center',
      right: 'flex-end',
    },
  },
  alignVertical: {
    property: 'justifyContent',
    map: {
      top: 'flex-start',
      center: 'center',
      bottom: 'flex-end',
    },
  },
}

// export default displayComponentFactory('View', style, defaultStyle, styleAliases)
module.exports = displayComponentFactory('View', style, defaultStyle, styleAliases)
