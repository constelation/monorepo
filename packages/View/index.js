'use strict';

var displayComponentFactory = require('kylpo-display-component-factory')

var style = {
  display: 'flex',
}

var defaultStyle = {
  flexDirection: 'column',
  alignItems: 'stretch',
  alignContent: 'flex-start',
}

module.exports = displayComponentFactory('View', style, defaultStyle)
