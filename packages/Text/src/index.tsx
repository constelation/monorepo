import * as React from 'react'
import * as glamorReact from 'glamor-react'
import * as _omit from 'lodash/omit'

export interface IProps {
  antialiased?: boolean,
  align?: 'start' | 'end' | 'left' | 'right' | 'center' | 'justify' | 'match-parent',
  bold?: boolean,
  center?: boolean,
  color?: string,
  css?: Object,
  decoration?: string,
  ellipsis?: boolean,
  fontFamily?: string,
  height?: string | number,
  italic?: boolean,
  refNode?: (node?: Text) => void,
  size?: string | number,
  spacing?: string | number,
  tag?: string,
  transform?: 'none' | 'capitalize' | 'uppercase' | 'lowercase' | 'full-width',
  underline?: boolean,
  uppercase?: boolean,
  weight?: 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900',
}

const propsToOmit = [
  'antialiased',
  'align',
  'bold',
  'center',
  'color',
  'decoration',
  'ellipsis',
  'fontFamily',
  'height',
  'italic',
  'size',
  'spacing',
  'tag',
  'transform',
  'underline',
  'uppercase',
  'weight',

  'refNode',
]

function getStyleFromProps(props: IProps) {
  const style: any = {
    fontFamily: props.fontFamily,
    color: props.color,
    fontSize: props.size,
    letterSpacing: props.spacing,
    textAlign: props.center ? 'center' : props.align,
    textDecoration: props.decoration,
    textTransform: props.uppercase ? 'uppercase' : props.transform,
    fontWeight: props.bold ? 'bold' : props.weight,
  }

  // italic
  if (props.italic) {
    style.fontStyle = 'italic'
  }

  // Underline font-weight
  if (props.underline) {
    if (style.textDecoration) {
      style.textDecoration += ' underline'
    }
    else {
      style.textDecoration = 'underline'
    }
  }

  // ellipsis
  if (props.ellipsis) {
    style.textOverflow = 'ellipsis'
    style.overflow = 'hidden'
    style.whiteSpace = 'nowrap'
  }

  // antialiased
  if (props.antialiased) {
    style.WebkitFontSmoothing = 'antialiased'
    style.MozOsxFontSmoothing = 'grayscale'
  }

  const height = props.height

  // sanitize lineHeight when it is a number
  if (typeof height === 'number') {
    style.lineHeight = height + 'px'
  }
  else if (typeof height === 'string') {
    style.lineHeight = height
  }

  return style
}

function getNonStyleProps(props: IProps): any {
  return _omit(props, propsToOmit)
}

export default class Text extends React.PureComponent<IProps, void> {
  static defaultProps = {
    tag: 'span',
    // from https://bitsofco.de/the-new-system-font-stack/
    fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell, "Helvetica Neue", sans-serif'
  }

  render() {
    const styleFromProps = getStyleFromProps(this.props)
    const propsToPass = getNonStyleProps(this.props)

    const css = { ...styleFromProps, ...this.props.css }
    propsToPass.css = css

    // Use refNode pattern to pass back the DOM's node
    if (this.props.refNode) {
      propsToPass.ref = this.props.refNode
    }

    return glamorReact.createElement(this.props.tag, propsToPass)
  }
}
