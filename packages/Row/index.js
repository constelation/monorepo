'use strict';

var displayComponentFactory = require('constelation-display-component-factory')

var style = {
  display: 'flex',
  flexDirection: 'row',
}

// var styleAliases = {
//   alignHorizontal: 'justifyContent',
//   alignVertical: 'alignItems',
// }

// module.exports = displayComponentFactory('Row', style, styleAliases)
module.exports = displayComponentFactory('Row', style)
