import React from 'react'
import ReactNative from 'react-native'
import _omit from 'lodash/omit'
import _pick from 'lodash/pick'

export interface IProps {
  source: number | string | Object,
  align?: 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch',
  alignSelf?: 'auto' | 'flex-start' | 'flex-end' | 'center' | 'stretch',
  animated?: boolean,
  aspectRatio?: number,
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
  ratioGrow?: boolean,
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

const styles = [
  'alignSelf',
  'aspectRatio',
  'bottom',
  'flex',
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
  'tintColor',
]

// from https://facebook.github.io/react-native/docs/layout-props.html
const propsToOmit = styles.concat([
  'align',
  'justify',
  'direction',
  'wrap',
  'grow',
  'shrink',
  'basis',
  'animated',
  'center',
  'refNode',
  'ratioGrow',
  'style',
  // 'resizeMode',
  'tintColor',
])

function getStyleFromProps(props: IProps) {
  const stylesFromProps = _pick(props, styles)

  if (props.hasOwnProperty('center')) {
    stylesFromProps.justifyContent = 'center'
    stylesFromProps.alignItems = 'center'
  }
  else {
    if (props.hasOwnProperty('justify')) {
      stylesFromProps.justifyContent = props.justify
    }
    if (props.hasOwnProperty('align')) {
      stylesFromProps.alignItems = props.align
    }
  }

  if (props.hasOwnProperty('direction')) {
    stylesFromProps.flexDirection = props.direction
  }

  if (props.hasOwnProperty('wrap')) {
    stylesFromProps.flexWrap = props.wrap
  }

  if (props.hasOwnProperty('grow')) {
    stylesFromProps.flexGrow = props.grow === true ? 1 : props.grow
  }

  return stylesFromProps
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

    // Note: aspectRatio sets the value of whichever dimenion is _NOT_ set
    // So, be sure to set height/width, or grow it via flexGrow, alignSelf, or parent's alignItems
    if (this.props.ratioGrow === true) {
      const source = ReactNative.Image.resolveAssetSource(this.props.source)

      if (styleFromProps.height === undefined) {
        // set to undefined so height is not auto-set by react native
        styleFromProps.height = null
      }
      if (styleFromProps.width === undefined) {
        // set to undefined so width is not auto-set by react native
        styleFromProps.width = null
      }

      if (source !== null && source.width !== 0) {
        styleFromProps.aspectRatio = source.height / source.width
      }
    }

    const style = [styleFromProps, this.props.style]

    // Use refNode pattern to pass back the DOM's node
    if (this.props.refNode) {
      propsWithoutStyle.ref = this.props.refNode
    }

    return this.props.animated
      ? <ReactNative.Animated.Image {...propsWithoutStyle} style={style} />
      : <ReactNative.Image {...propsWithoutStyle} style={style} />
  }
}
