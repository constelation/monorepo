import React from 'react'
import ReactNative from 'react-native'
import _omit from 'lodash/omit'

export interface IProps {
  align?: 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch',
  justify?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around',
  alignSelf?: 'auto' | 'flex-start' | 'flex-end' | 'center' | 'stretch',
  animated?: boolean,
  bottom?: number,
  center?: boolean,
  flex?: number | string,
  grow?: number | boolean,
  shrink?: number,
  basis?: number,
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
  position?: 'absolute' | 'relative',
  refNode?: () => {},
  right?: number,
  style?: Object,
  top?: number,
  width?: number,
  zIndex?: number,

  bounces?: boolean,
  contentContainerStyle?: Object,
  horizontal?: boolean,
  keyboardDismissMode?: 'none' | 'interactive' | 'on-drag',
  keyboardShouldPersistTaps?: 'always' | 'never' | 'handled' | boolean,
  onContentSizeChange?: Function,
  onScroll?: Function,
  pagingEnabled?: boolean,
  refreshControl?: JSX.Element,
  removeClippedSubviews?: boolean,
  scrollEnabled?: boolean,
  scrollEventThrottle?: number,
  showsHorizontalScrollIndicator?: boolean,
  showsVerticalScrollIndicator?: boolean,
}

// from https://facebook.github.io/react-native/docs/layout-props.html
const propsToOmit = [
  'align',
  'alignSelf',
  'bottom',
  'flex',
  'grow',
  'shrink',
  'basis',
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

function getStyleFromProps(props: IProps) {
  return {
    alignSelf: props.alignSelf,
    alignItems: props.center ? 'center' : props.align,
    bottom: props.bottom,
    flex: props.flex,
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
    right: props.right,
    top: props.top,
    width: props.width,
    zIndex: props.zIndex,
  }
}

function getNonStyleProps(props: IProps) {
  return _omit(props, propsToOmit)
}

export default class ScrollView extends React.PureComponent<IProps, void> {
  render() {
    const styleFromProps = getStyleFromProps(this.props)
    const propsWithoutStyle = getNonStyleProps(this.props)

    const style = [styleFromProps, this.props.style]

    // Use refNode pattern to pass back the DOM's node
    if (this.props.refNode) {
      propsWithoutStyle.ref = this.props.refNode
    }

    return this.props.animated
      ? <ReactNative.Animated.ScrollView {...propsWithoutStyle} style={style} />
      : <ReactNative.ScrollView {...propsWithoutStyle} style={style} />
  }
}