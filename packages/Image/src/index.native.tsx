import React from 'react'
import ReactNative from 'react-native'
import _omit from 'lodash/omit'

export interface IProps {
  source: number | string | Object,
  align?: 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch',
  alignSelf?: 'auto' | 'flex-start' | 'flex-end' | 'center' | 'stretch',
  animated?: boolean,
  basis?: number,
  bottom?: number,
  center?: boolean,
  direction?: 'column' | 'column-reverse' | 'row' | 'row-reverse',
  flex?: number | string,
  grow?: number | boolean,
  height?: number,
  justify?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around',
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
  onError?: Function,
  onLayout?: Function,
  onLoad?: Function,
  onLoadEnd?: Function,
  onLoadStart?: Function,
  overflow?: 'visible' | 'hidden' | 'scroll',
  padding?: number,
  paddingBottom?: number,
  paddingLeft?: number,
  paddingRight?: number,
  paddingTop?: number,
  paddingVertical?: number,
  paddingHorizontal?: number,
  position?: 'absolute' | 'relative',
  refNode?: () => {},
  resizeMode?: 'cover' | 'contain' | 'stretch' | 'repeat' | 'center',
  right?: number,
  shrink?: number,
  style?: Object,
  tintColor?: string,
  top?: number,
  width?: number,
  wrap?: 'wrap' | 'nowrap',
  zIndex?: number,
}

// from https://facebook.github.io/react-native/docs/layout-props.html
const propsToOmit = [
  'align',
  'alignSelf',
  'justify',
  'bottom',
  'flex',
  'direction',
  'wrap',
  'grow',
  'shrink',
  'basis',

  'height',
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

  'resizeMode',
  'tintColor',
]

function getStyleFromProps(props: IProps) {
  return {
    alignSelf: props.alignSelf,
    alignItems: props.center ? 'center' : props.align,
    bottom: props.bottom,
    flex: props.flex,
    flexDirection: props.direction,
    flexWrap: props.wrap,
    flexGrow: props.grow === true ? 1 : props.grow,
    flexShrink: props.shrink,
    flexBasis: props.basis,
    height: props.height,
    justifyContent: props.center ? 'center' : props.justify,
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
    resizeMode: props.resizeMode,
    right: props.right,
    tintColor: props.tintColor,
    top: props.top,
    width: props.width,
    zIndex: props.zIndex,
  }
}

function getNonStyleProps(props: IProps) {
  return _omit(props, propsToOmit)
}

export default class Image extends React.PureComponent<IProps, void> {
  static getSize = ReactNative.Image.getSize
  static prefetch = ReactNative.Image.prefetch
  static resolveAssetSource = ReactNative.Image.resolveAssetSource
  static resizeMode = ReactNative.Image.resizeMode

  render() {
    const styleFromProps = getStyleFromProps(this.props)
    const propsWithoutStyle = getNonStyleProps(this.props)

    /* Since Image runs style props through StyleSheet.flatten(),
     * and flatten will override values with undefined if passed,
     * remove height and width so images can size themselves.
     *
     * see https://github.com/facebook/react-native/blob/master/Libraries/Image/Image.ios.js#L349
     * and https://github.com/exponent/react-native/blob/master/Libraries/StyleSheet/__tests__/flattenStyle-test.js#L37
     */
    if (styleFromProps.height === undefined) {
      delete styleFromProps.height
    }
    if (styleFromProps.width === undefined) {
      delete styleFromProps.width
    }

    const style = { ...styleFromProps, ...this.props.style }

    // Use refNode pattern to pass back the DOM's node
    if (this.props.refNode) {
      propsWithoutStyle.ref = this.props.refNode
    }

    return this.props.animated
      ? <ReactNative.Animated.Image {...propsWithoutStyle} style={style} />
      : <ReactNative.Image {...propsWithoutStyle} style={style} />
  }
}