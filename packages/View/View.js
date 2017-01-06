'use strict';

var flexComponentFactory = require('constelation-flex-component-factory')

var requiredStyle = {
  flexDirection: 'column',
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
module.exports = flexComponentFactory('View', requiredStyle, undefined, styleAliases)
