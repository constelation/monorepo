import * as React from 'react'
import * as _omit from 'lodash/omit'
import * as _pick from 'lodash/pick'

interface IProps {
  backfaceVisibility?: 'visible' | 'hidden',
  backgroundColor?: string,
  borderColor?: string,
  borderTopColor?: string,
  borderRightColor?: string,
  borderBottomColor?: string,
  borderLeftColor?: string,
  borderRadius?: number,
  borderTopLeftRadius?: number,
  borderTopRightRadius?: number,
  borderBottomLeftRadius?: number,
  borderBottomRightRadius?: number,
  borderStyle?: 'solid' | 'dotted' | 'dashed',
  borderWidth?: number,
  borderTopWidth?: number,
  borderRightWidth?: number,
  borderBottomWidth?: number,
  borderLeftWidth?: number,
  opacity?: number,
  shadowColor?: string,
  shadowOffset?: { width?: number, height?: number },
  shadowOpacity?: number,
  shadowRadius?: number,
  transform?: Array<Object>,
  style?: Object,
}
const styles = [
  'backgroundColor',
  'borderBottomColor',
  'borderBottomLeftRadius',
  'borderBottomRightRadius',
  'borderBottomWidth',
  'borderColor',
  'borderLeftColor',
  'borderLeftWidth',
  'borderRadius',
  'borderRightColor',
  'borderRightWidth',
  'borderStyle',
  'borderTopColor',
  'borderTopLeftRadius',
  'borderTopRightRadius',
  'borderTopWidth',
  'borderWidth',
  'opacity',
  'shadowColor',
  'shadowOffset',
  'shadowOpacity',
  'shadowRadius',
  'transform',
]

function getStyleFromProps(props: IProps) {
  return _pick(props, styles)
}

function getNonStyleProps(props: IProps) {
  return _omit(props, styles)
}

class Style_ extends React.PureComponent<IProps, void> {
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