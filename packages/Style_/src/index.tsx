import * as React from 'react'
import * as _omit from 'lodash/omit'
import * as _pick from 'lodash/pick'

export interface IProps {
  background?: string,
  backgroundColor?: string,
  boxShadow?: string,
  border?: string,
  borderTop?: string,
  borderRight?: string,
  borderBottom?: string,
  borderLeft?: string,
  borderColor?: string,
  borderStyle?: string,
  borderRadius?: string | number,
  borderWidth?: string | number,
  opacity?: number,
  outline?: string,
  style?: Object,
  transform?: string,
  transition?: string,
  visibility?: string,
  willChange?: string,
}

const styles = [
  'background',
  'backgroundColor',
  'boxShadow',
  'border',
  'borderTop',
  'borderRight',
  'borderBottom',
  'borderLeft',
  'borderColor',
  'borderStyle',
  'borderRadius',
  'borderWidth',
  'opacity',
  'outline',
  'transform',
  'transition',
  'visibility',
  'willChange'
]

function getStyleFromProps(props: IProps) {
  return _pick(props, styles)
}

function getNonStyleProps(props: IProps) {
  return _omit(props, styles)
}

export default class Style_ extends React.PureComponent<IProps, void> {
  render() {
    const styleFromProps = getStyleFromProps(this.props)
    const propsToPass = getNonStyleProps(this.props)

    const Child = React.Children.only(this.props.children)

    // Style_'s render() runs before Child's, so add its style props back in
    const style = { ...styleFromProps, ...this.props.style, ...Child.props.style }
    propsToPass.style = style

    // without removing children, this would infinite loop
    delete propsToPass.children

    return React.cloneElement(Child, propsToPass)
  }
}