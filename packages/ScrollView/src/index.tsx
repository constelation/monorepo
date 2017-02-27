/*
 * Credits: https://github.com/rofrischmann/react-layout-components/blob/develop/modules/components/ScrollView.jsx
 */

import * as React from 'react'
import * as glamorReact from 'glamor-react'
import * as _omit from 'lodash/omit'
import * as _assign from 'lodash/assign'

export interface IProps {
  alignContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'stretch',
  alignSelf?: 'auto' | 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch',
  bottom?: number | string,
  center?: boolean,
  fit?: boolean,
  flex?: number | string,
  wrap?: string,
  grow?: number | boolean,
  shrink?: number,
  basis?: string | number,
  height?: number | string,
  hidden?: boolean,
  inline?: boolean,
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
  order?: number,
  overflow?: string,
  overflowX?: string,
  overflowY?: string,
  overflowScrolling?: string,
  padding?: number | string,
  paddingBottom?: number | string,
  paddingLeft?: number | string,
  paddingRight?: number | string,
  paddingTop?: number | string,
  paddingVertical?: number | string,
  paddingHorizontal?: number | string,
  pointerEvents?: string,
  position?: string,
  refNode?: Function,
  right?: number | string,
  style?: Object,
  inlineStyle?: Object,
  top?: number | string,
  tag?: string,
  width?: number | string,
  zIndex?: number,

  bounces?: boolean,
  horizontal?: boolean,
  onScroll?: Function,
  scrollEnabled?: boolean,
}

//NOTES: other 

// const align = {
//   left: 'flex-start',
//   top: 'flex-start',
//   center: 'center',
//   right: 'flex-end',
//   bottom: 'flex-end',
// }
//
// function getAlign(props) {
//   if (props.center) {
//     return 'center'
//   }
//   else if (props.horizontal && props.alignVertical) {
//     return align[props.alignVertical]
//   }
//   else if (!props.horizontal && props.alignHorizontal){
//     return align[props.alignHorizontal]
//   }
//   else {
//     return 'stretch'
//   }
// }
//
// function getJustify(props) {
//   if (props.center) {
//     return 'center'
//   }
//   else if (props.horizontal && props.alignHorizontal) {
//     return align[props.alignHorizontal]
//   }
//   else if (!props.horizontal && props.alignVertical){
//     return align[props.alignVertical]
//   }
//   else {
//     return null
//   }
// }

const propsToOmit = [
  // 'alignHorizontal',
  // 'alignVertical',
  'alignSelf',
  'alignContent',
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
  'maxHeight',
  'maxWidth',
  'minHeight',
  'minWidth',
  'order',
  'overflow',
  'overflowX',
  'overflowY',
  'padding',
  'paddingBottom',
  'paddingLeft',
  'paddingRight',
  'paddingTop',
  'pointerEvents',
  'position',
  'right',
  'top',
  'width',
  'zIndex',
  'marginHorizontal',
  'marginVertical',
  'paddingHorizontal',
  'paddingVertical',

  // don't want to pass style or tag down
  'style',
  'inlineStyle',
  'tag',

  // soon to be moved to aliases
  'overflowScrolling',
  'hidden',
  'inline',
  'fit',
  'center',
  'bounces',
  'horizontal',
  'refNode',
  'scrollEnabled',
]

function getStyleFromProps(props: IProps) {
  // some defaults from https://github.com/facebook/css-layout#default-values
  var styleFromProps = {
    alignSelf: props.alignSelf,
    // alignItems: getAlign(props),
    alignContent: props.alignContent,
    bottom: props.bottom,
    display: props.hidden ? 'none' : (props.inline ? 'inline-flex' : 'flex'),
    flex: props.flex,
    flexDirection: props.horizontal ? 'row' : 'column',
    flexWrap: props.wrap,
    flexGrow: props.grow === true ? 1 : props.grow,
    flexShrink: props.shrink,
    flexBasis: props.basis,
    height: props.fit ? '100%' : props.height,
    // justifyContent: getJustify(props),
    left: props.left,
    margin: props.margin,
    marginBottom: props.marginBottom || props.marginVertical,
    marginLeft: props.marginLeft || props.marginHorizontal,
    marginRight: props.marginRight || props.marginHorizontal,
    marginTop: props.marginTop || props.marginVertical,
    maxHeight: props.maxHeight,
    maxWidth: props.maxWidth,
    minHeight: props.minHeight,
    minWidth: props.minWidth,
    order: props.order,
    overflowY: (props.horizontal || !props.scrollEnabled) ? 'hidden' : 'auto',
    overflowX: (props.horizontal && props.scrollEnabled) ? 'auto' : 'hidden',
    padding: props.padding,
    paddingBottom: props.paddingBottom || props.paddingVertical,
    paddingLeft: props.paddingLeft || props.paddingHorizontal,
    paddingRight: props.paddingRight || props.paddingHorizontal,
    paddingTop: props.paddingTop || props.paddingVertical,
    pointerEvents: props.pointerEvents,
    position: props.position,
    right: props.right,
    top: props.top,
    width: props.fit ? '100%' : props.width,
    WebkitOverflowScrolling: props.bounces && 'touch',
    zIndex: props.zIndex,
  }

  return styleFromProps
}

function getNonStyleProps(props: IProps) {
  return _omit(props, propsToOmit)
}

export default class ScrollView extends React.PureComponent<IProps, void> {
  scrollView: HTMLElement

  static defaultProps = {
    tag: 'div',
    shrink: 0,
    position: 'relative',
    alignContent: 'flex-start',
    bounces: true,
    scrollEnabled: true,
  }

  setRef = (scrollView: HTMLElement) => {
    this.scrollView = scrollView

    this.props.refNode && this.props.refNode(scrollView)
  }

  // PUBLIC
  scrollTo = (pos: number) => {
    if (this.props.horizontal) {
      this.scrollView.scrollLeft = pos
    }
    else {
      this.scrollView.scrollTop = pos
    }
  }

  // PUBLIC
  scrollToStart = () => {
    if (this.props.horizontal) {
      this.scrollView.scrollLeft = 0
    }
    else {
      this.scrollView.scrollTop = 0
    }
  }

  // PUBLIC
  scrollToEnd = () => {
    if (this.props.horizontal) {
      this.scrollView.scrollLeft = this.scrollView.scrollWidth - this.scrollView.offsetWidth
    }
    else {
      this.scrollView.scrollTop = this.scrollView.scrollHeight - this.scrollView.offsetHeight
    }
  }

  render() {
    var styleFromProps = getStyleFromProps(this.props)
    var propsToPass = getNonStyleProps(this.props)

    var css = _assign({}, styleFromProps, this.props.style)
    propsToPass.css = css

    // inlineStyle should pass down as style to apply inline
    propsToPass.style = this.props.inlineStyle

    propsToPass.ref = this.setRef

    return glamorReact.createElement(this.props.tag, propsToPass)
  }
}
