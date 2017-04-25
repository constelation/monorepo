import * as React from 'react'
import * as glamorReact from 'glamor-react'
import * as _omit from 'lodash/omit'
export interface IBase {
  absoluteFill?: boolean,
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
  // horizontal?: boolean,

  height?: number | string,
  hidden?: boolean,
  hitSlop?: number | string,
  hitSlopHorizontal?: number | string,
  hitSlopVertical?: number | string,
  hitSlopTop?: number | string,
  hitSlopRight?: number | string,
  hitSlopBottom?: number | string,
  hitSlopLeft?: number | string,

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
  refNode?: (node?: HTMLElement) => void,
  right?: number | string,
  inlineStyle?: Object,
  style?: Object,
  top?: number | string,
  tag?: string,
  width?: number | string,
  zIndex?: number,
}

export interface IView extends IBase {
  horizontal?: boolean,
}

export interface IRow extends IBase {
}

export interface ICol extends IBase {
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
  'absoluteFill',

  'hitSlop',
  'hitSlopVertical',
  'hitSlopHorizontal',
  'hitSlopTop',
  'hitSlopRight',
  'hitSlopBottom',
  'hitSlopLeft',

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

function checkAbsoluteFill(value: number | string, props: IBase) {
  if (value != null) {
    return value
  }

  return props.absoluteFill === true ? 0 : undefined
}

function getStyleFromProps(props: IBase, isHorizontal: boolean) {
  // some defaults from https://github.com/facebook/css-layout#default-values
  return {
    alignSelf: props.alignSelf,
    alignItems: getAlignItems(props, isHorizontal),
    alignContent: props.alignContent,
    bottom: checkAbsoluteFill(props.bottom, props),
    display: props.hidden ? 'none' : (props.inline ? 'inline-flex' : 'flex'),
    flex: props.flex,
    flexDirection: isHorizontal ? 'row' : 'column',
    flexWrap: props.wrap,
    flexGrow: props.grow === true ? 1 : props.grow,
    flexShrink: props.shrink,
    flexBasis: props.basis,
    height: props.fit ? '100%' : props.height,
    justifyContent: getJustifyContent(props, isHorizontal),
    left: checkAbsoluteFill(props.left, props),
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
    position: props.absoluteFill === true ? 'absolute' : props.position,
    right: checkAbsoluteFill(props.right, props),
    top: checkAbsoluteFill(props.top, props),
    width: props.fit ? '100%' : props.width,
    WebkitOverflowScrolling: props.overflowScrolling,
    zIndex: props.zIndex,
  }
}

function hasHitSlopProp(props: IBase) {
  return props.hitSlop
    || props.hitSlopVertical
    || props.hitSlopHorizontal
    || props.hitSlopTop
    || props.hitSlopRight
    || props.hitSlopBottom
    || props.hitSlopLeft
}

const Slop = (props: IBase) => (
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

export class View extends React.Component<IView, void> {
  static defaultProps = {
    tag: 'div',
    shrink: 0,
    position: 'relative',
    alignContent: 'flex-start',
  }

  render() {
    const styleFromProps = getStyleFromProps(this.props, this.props.horizontal)
    const propsToPass = _omit(this.props, propsToOmit)

    propsToPass.css = { ...styleFromProps, ...this.props.style }

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

// TODO: DRY it up
export class Row extends React.Component<IRow, void> {
  static defaultProps = {
    tag: 'div',
    shrink: 0,
    position: 'relative',
    alignContent: 'flex-start',
  }

  render() {
    const styleFromProps = getStyleFromProps(this.props, true)
    const propsToPass = _omit(this.props, propsToOmit)

    propsToPass.css = { ...styleFromProps, ...this.props.style }

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

export class Col extends React.Component<ICol, void> {
  static defaultProps = {
    tag: 'div',
    shrink: 0,
    position: 'relative',
    alignContent: 'flex-start',
  }

  render() {
    const styleFromProps = getStyleFromProps(this.props, false)
    const propsToPass = _omit(this.props, propsToOmit)

    propsToPass.css = { ...styleFromProps, ...this.props.style }

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

export default View
