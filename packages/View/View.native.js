'use strict';

var displayComponentFactory = require('constelation-display-component-factory')
// var displayComponentFactory = require('../displayComponentFactory/displayComponentFactory.native.js')

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

module.exports = displayComponentFactory('View', null, null, styleAliases)
