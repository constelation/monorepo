'use strict';

var flexComponentFactory = require('constelation-flex-component-factory')
// var flexComponentFactory = require('../flexComponentFactory/flexComponentFactory.native.js')

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

// export default flexComponentFactory('View', null, null, styleAliases)
module.exports = flexComponentFactory('View', null, null, styleAliases)
