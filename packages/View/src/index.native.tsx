import React from 'react'
import ReactNative from 'react-native'
import _omit from 'lodash/omit'

export interface IBase {
  alignVertical?: 'top' | 'center' | 'bottom',
  alignHorizontal?: 'left' | 'center' | 'right',
  alignSelf?: 'auto' | 'flex-start' | 'flex-end' | 'center' | 'stretch',
  align?: 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch',
  justify?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around',
  animated?: boolean,
  bottom?: number,
  center?: boolean,
  fit?: boolean,

  flex?: number,
  wrap?: 'wrap' | 'nowrap',
  grow?: number | boolean,
  shrink?: number,
  basis?: number | string,
  // horizontal?: boolean,

  height?: number | string,
  left?: number | string,
  margin?: number | string,
  marginBottom?: number | string,
  marginLeft?: number | string,
  marginRight?: number | string,
  marginTop?: number | string,
  marginVertical?: number | string,
  marginHorizontal?: number | string,
  maxHeight?: number | string,
  maxWidth?: number | string,
  minHeight?: number | string,
  minWidth?: number | string,
  overflow?: 'visible' | 'hidden' | 'scroll',
  padding?: number | string,
  paddingBottom?: number | string,
  paddingLeft?: number | string,
  paddingRight?: number | string,
  paddingTop?: number | string,
  paddingVertical?: number | string,
  paddingHorizontal?: number | string,
  pointerEvents?: 'box-none' | 'none' | 'box-only' | 'auto',
  position?: 'absolute' | 'relative',
  refNode?: () => {},
  right?: number | string,
  style?: Object,
  top?: number | string,
  width?: number | string,
  zIndex?: number,
}

export interface IView extends IBase {
  horizontal?: boolean,
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
  'alignHorizontal',
  'alignVertical',
  'bottom',

  'flex',
  // 'direction',
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

function getAlignItems(props: IBase, isHorizontal: boolean) {
  if (props.align) {
    return props.align
  }
  else if (isHorizontal && props.alignVertical) {
    return alignVerticalAlias[props.alignVertical]
  }
  else if (props.alignHorizontal) {
    return alignHorizontalAlias[props.alignHorizontal]
  }
  else if (props.center === true) {
    return 'center'
  }
  else if (isHorizontal) {
    return 'flex-start'
  }
  else {
    return 'stretch'
  }
}

function getJustifyContent(props: IBase, isHorizontal: boolean) {
  if (props.justify) {
    return props.justify
  }
  else if (isHorizontal && props.alignHorizontal) {
    return alignHorizontalAlias[props.alignHorizontal]
  }
  else if (props.alignVertical) {
    return alignVerticalAlias[props.alignVertical]
  }
  else if (props.center === true) {
    return 'center'
  }
}

function getStyleFromProps(props: IBase, isHorizontal: boolean) {
  return {
    alignSelf: props.alignSelf,
    alignItems: getAlignItems(props, isHorizontal),
    bottom: props.bottom,
    flex: props.flex,
    flexDirection: isHorizontal ? 'row' : 'column',
    flexWrap: props.wrap,
    flexGrow: props.grow === true ? 1 : props.grow,
    flexShrink: props.shrink,
    flexBasis: props.basis,
    height: props.fit === true ? '100%' : props.height,
    justifyContent: getJustifyContent(props, isHorizontal),
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
    width: props.fit === true ? '100%' : props.width,
    zIndex: props.zIndex,
  }
}

function getNonStyleProps(props: IBase | IView) {
  return _omit(props, propsToOmit)
}

export class View extends React.PureComponent<IView, void> {
  private setAnimatedRef = (node) => {
    this.props.refNode(node._component);
  }
  render() {
    const styleFromProps = getStyleFromProps(this.props, this.props.horizontal)
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

export class Row extends React.PureComponent<IBase, void> {
  private setAnimatedRef = (node) => {
    this.props.refNode(node._component);
  }
  render() {
    const styleFromProps = getStyleFromProps(this.props, true)
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

export class Col extends React.PureComponent<IBase, void> {
  private setAnimatedRef = (node) => {
    this.props.refNode(node._component);
  }
  render() {
    const styleFromProps = getStyleFromProps(this.props, false)
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

export default View