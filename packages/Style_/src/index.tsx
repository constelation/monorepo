import * as React from 'react'
import { View } from 'constelation-view'
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
  cursor?: 'auto' | 'default' | 'none' | 'context-menu' | 'help' | 'pointer' | 'progress' | 'wait' | 'cell' | 'crosshair' | 'text' | 'vertical-text' | 'alias' | 'copy' | 'move' | 'no-drop' | 'not-allowed' | 'e-resize' | 'n-resize' | 'ne-resize' | 'nw-resize' | 's-resize' | 'se-resize' | 'sw-resize' | 'w-resize' | 'ew-resize' | 'ns-resize' | 'nesw-resize' | 'nwse-resize' | 'col-resize' | 'row-resize' | 'all-scroll' | 'zoom-in' | 'zoom-out' | 'grab' | 'grabbing',

  // transforms
  translateX?: string,
  translateY?: string,
  scale?: string,
  scaleX?: string,
  scaleY?: string,
  skewX?: string,
  skewY?: string,
  rotate?: string,
  rotateX?: string,
  rotateY?: string,
  rotateZ?: string,
  perspective?: string,
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
  'cursor',
  'opacity',
  'outline',
  'transform',
  'transition',
  'visibility',
  'willChange',
]

const TRANSFORM_STYLE_PROPERTIES = [
  'perspective',
  'rotate',
  'rotateX',
  'rotateY',
  'rotateZ',
  'scale',
  'scaleX',
  'scaleY',
  'skewX',
  'skewY',
  'translateX',
  'translateY',
]


const propsToOmit = styles.concat(TRANSFORM_STYLE_PROPERTIES)

function hasTransforms(style: any): boolean {
  return (TRANSFORM_STYLE_PROPERTIES.some(transform => style.hasOwnProperty(transform)))
}

// credits: https://github.com/oblador/react-native-animatable/blob/master/wrapStyleTransforms.js
function buildTransforms(style: any): string {
  let transform: string = style.transform || ''

  Object.keys(style).forEach((key) => {
    if (TRANSFORM_STYLE_PROPERTIES.indexOf(key) !== -1) {
      transform += ` ${key}(${style[key]})`
    }
  })

  return transform
}

function getStyleFromProps(props: IProps) {
  const stylesFromProps = _pick(props, styles)

  if (hasTransforms(props)) {
    stylesFromProps.transform = buildTransforms(props)
  }

  return stylesFromProps
}

function getNonStyleProps(props: IProps) {
  return _omit(propsToOmit, styles)
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

export class Style extends React.PureComponent<IProps, void> {
  render() {
    const { children, ...props } = this.props

    return (
      <Style_ {...props}>
        <View>{children}</View>
      </Style_>
    )
  }
}