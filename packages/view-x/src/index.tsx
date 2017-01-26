import * as React from 'react'
import * as glamorReact from 'glamor/react'
import * as _omit from 'lodash/omit'

export interface IProps {
  alignContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'stretch',
  alignVertical?: 'top' | 'center' | 'bottom',
  alignHorizontal?: 'left' | 'center' | 'right',
  alignSelf?: 'auto' | 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch',
  align?: 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch',
  justify?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around',
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
  hitSlop?: number | string,
  hitSlopHorizontal?: number | string,
  hitSlopVertical?: number | string,
  hitSlopTop?: number | string,
  hitSlopRight?: number | string,
  hitSlopBottom?: number | string,
  hitSlopLeft?: number | string,

  horizontal?: boolean,
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
  refNode?: () => {},
  right?: number | string,
  inlineStyle?: Object,
  style?: Object,
  top?: number | string,
  tag?: string,
  width?: number | string,
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

const propsToOmit = [
  'align',
  'alignSelf',
  'alignContent',
  'alignHorizontal',
  'alignVertical',
  'justify',
  'bottom',
  'flex',

  'wrap',
  'grow',
  'shrink',
  'basis',

  'horizontal',
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

  'hitSlop',
  'hitSlopVertical',
  'hitSlopHorizontal',
  'hitSlopTop',
  'hitSlopRight',
  'hitSlopBottom',
  'hitSlopLeft',

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
  else {
    // default without using defaultProps
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
  // some defaults from https://github.com/facebook/css-layout#default-values
  return {
    alignSelf: props.alignSelf,
    alignItems: getAlignItems(props),
    alignContent: props.alignContent,
    bottom: props.bottom,
    display: props.hidden ? 'none' : (props.inline ? 'inline-flex' : 'flex'),
    flex: props.flex,
    flexDirection: props.horizontal === true ? 'row' : 'col',
    flexWrap: props.wrap,
    flexGrow: props.grow === true ? 1 : props.grow,
    flexShrink: props.shrink,
    flexBasis: props.basis,
    height: props.fit ? '100%' : props.height,
    justifyContent: getJustifyContent(props),
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
    overflow: props.overflow,
    overflowX: props.overflowX,
    overflowY: props.overflowY,
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
    WebkitOverflowScrolling: props.overflowScrolling,
    zIndex: props.zIndex,
  }
}

function hasHitSlopProp(props: IProps) {
  return props.hitSlop
    || props.hitSlopVertical
    || props.hitSlopHorizontal
    || props.hitSlopTop
    || props.hitSlopRight
    || props.hitSlopBottom
    || props.hitSlopLeft
}

const Slop = (props: IProps) => (
  <span
    style={{
      position: 'absolute',
      top: -(props.hitSlopTop || props.hitSlopVertical || props.hitSlop || 0),
      right: -(props.hitSlopRight || props.hitSlopHorizontal || props.hitSlop || 0),
      bottom: -(props.hitSlopBottom || props.hitSlopVertical || props.hitSlop || 0),
      left: -(props.hitSlopLeft || props.hitSlopHorizontal || props.hitSlop || 0),
    }}
  />
)

export default class View extends React.PureComponent<IProps, void> {
  static defaultProps = {
    tag: 'div',
    srink: 0,
    position: 'relative',
    alignContent: 'flex-start',
  }

  render() {
    const styleFromProps = getStyleFromProps(this.props)
    const propsToPass = _omit(this.props, propsToOmit)

    const css = { ...styleFromProps, ...this.props.style }
    propsToPass.css = css

    // inlineStyle should pass down as style to apply inline
    propsToPass.style = this.props.inlineStyle

    // Use refNode pattern to pass back the DOM's node
    if (this.props.refNode) {
      propsToPass.ref = this.props.refNode
    }

    if (hasHitSlopProp(this.props)) {
      const HitSlop = (
        <Slop
          hitSlop={this.props.hitSlop}
          hitSlopTop={this.props.hitSlopTop}
          hitSlopRight={this.props.hitSlopRight}
          hitSlopBottom={this.props.hitSlopBottom}
          hitSlopLeft={this.props.hitSlopLeft}
          hitSlopVertical={this.props.hitSlopVertical}
          hitSlopHorizontal={this.props.hitSlopHorizontal}
        />
      )

      if (propsToPass.children == null) {
        propsToPass.children = HitSlop
      }
      else {
        // convert children to array, then prepend Slop
        propsToPass.children = React.Children.toArray(propsToPass.children)
        propsToPass.children.unshift(HitSlop)
      }
    }

    return glamorReact.createElement(this.props.tag, propsToPass)
  }
}