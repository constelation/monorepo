import React from 'react'
import ReactNative from 'react-native'
import _omit from 'lodash/omit'

export interface IProps {
  alignContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'stretch',
  alignVertical?: 'top' | 'center' | 'bottom',
  alignHorizontal?: 'left' | 'center' | 'right',
  alignSelf?: 'auto' | 'flex-start' | 'flex-end' | 'center' | 'stretch',
  align?: 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch',
  justify?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around',
  animated?: boolean,
  bottom?: number,
  center?: boolean,

  flex?: number | string,
  wrap?: 'wrap' | 'nowrap',
  grow?: number | boolean,
  shrink?: number,
  basis?: number,

  horizontal?: boolean,
  height?: number,
  left?: number,
  margin?: number,
  marginBottom?: number,
  marginLeft?: number,
  marginRight?: number,
  marginTop?: number,
  marginVertical?: number,
  marginHorizontal?: number,
  maxHeight?: number,
  maxWidth?: number,
  minHeight?: number,
  minWidth?: number,
  overflow?: 'visible' | 'hidden' | 'scroll',
  padding?: number,
  paddingBottom?: number,
  paddingLeft?: number,
  paddingRight?: number,
  paddingTop?: number,
  paddingVertical?: number,
  paddingHorizontal?: number,
  pointerEvents?: 'box-none' | 'none' | 'box-only' | 'auto',
  position?: 'absolute' | 'relative',
  refNode?: () => {},
  right?: number,
  style?: Object,
  top?: number,
  width?: number,
  zIndex?: number,
}

const alignHorizontalAlias = {
  left: 'flex-start',
  center: 'center',
  right: 'flex-end',
}
const alignVerticalAlias = {
  top: 'flex-start',
  center: 'center',
  bottom: 'flex-end',
}

// from https://facebook.github.io/react-native/docs/layout-props.html
const propsToOmit = [
  'align',
  'alignSelf',
  'alignContent',
  'alignHorizontal',
  'alignVertical',
  'bottom',
  'flex',

  'direction',
  'wrap',
  'grow',
  'shrink',
  'basis',

  'horizontal',
  'height',
  'justify',
  'left',
  'margin',
  'marginBottom',
  'marginLeft',
  'marginRight',
  'marginTop',
  'marginHorizontal',
  'marginVertical',
  'maxHeight',
  'maxWidth',
  'minHeight',
  'minWidth',
  'overflow',
  'padding',
  'paddingBottom',
  'paddingLeft',
  'paddingRight',
  'paddingTop',
  'paddingHorizontal',
  'paddingVertical',
  'position',
  'right',
  'top',
  'width',
  'zIndex',

  'animated',
  'center',
  'refNode',
]

function getAlignItems(props: IProps) {
  if (props.align) {
    return props.align
  }
  else if (props.horizontal === true && props.alignVertical) {
    return alignVerticalAlias[props.alignVertical]
  }
  else if (props.alignHorizontal) {
    return alignHorizontalAlias[props.alignHorizontal]
  }
  else if (props.center === true) {
    return 'center'
  }
  else if (props.horizontal === true) {
    return 'flex-start'
  }
  else {
    return 'stretch'
  }
}

function getJustifyContent(props: IProps) {
  if (props.justify) {
    return props.justify
  }
  else if (props.horizontal === true && props.alignHorizontal) {
    return alignHorizontalAlias[props.alignHorizontal]
  }
  else if (props.alignVertical) {
    return alignVerticalAlias[props.alignVertical]
  }
  else if (props.center === true) {
    return 'center'
  }
}

function getStyleFromProps(props: IProps) {
  return {
    alignSelf: props.alignSelf,
    alignItems: getAlignItems(props),
    bottom: props.bottom,
    flex: props.flex,
    flexDirection: props.horizontal === true ? 'row' : 'column',
    flexWrap: props.wrap,
    flexGrow: props.grow === true ? 1 : props.grow,
    flexShrink: props.shrink,
    flexBasis: props.basis,
    height: props.height,
    justifyContent: getJustifyContent(props),
    left: props.left,
    margin: props.margin,
    marginBottom: props.marginBottom,
    marginLeft: props.marginLeft,
    marginRight: props.marginRight,
    marginTop: props.marginTop,
    marginHorizontal: props.marginHorizontal,
    marginVertical: props.marginVertical,
    maxHeight: props.maxHeight,
    maxWidth: props.maxWidth,
    minHeight: props.minHeight,
    minWidth: props.minWidth,
    overflow: props.overflow,
    padding: props.padding,
    paddingBottom: props.paddingBottom,
    paddingLeft: props.paddingLeft,
    paddingRight: props.paddingRight,
    paddingTop: props.paddingTop,
    paddingHorizontal: props.paddingHorizontal,
    paddingVertical: props.paddingVertical,
    position: props.position,
    right: props.right,
    top: props.top,
    width: props.width,
    zIndex: props.zIndex,
  }
}

function getNonStyleProps(props: IProps) {
  return _omit(props, propsToOmit)
}

export default class View extends React.PureComponent<IProps, void> {
  private setAnimatedRef = (node) => {
    this.props.refNode(node._component);
  }
  render() {
    const styleFromProps = getStyleFromProps(this.props)
    const propsToPass = _omit(this.props, propsToOmit)

    const style = [styleFromProps, this.props.style]

    if (this.props.refNode) {
      // We don't want the Animated node, just the View with measure(), blur(), etc
      propsToPass.ref = (this.props.animated)
        ? this.setAnimatedRef
        : this.props.refNode
    }

    return (this.props.animated)
      ? <ReactNative.Animated.View {...propsToPass} style={style} />
      : <ReactNative.View {...propsToPass} style={style} />
  }
}