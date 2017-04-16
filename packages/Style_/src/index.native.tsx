import React from 'react'
import _omit from 'lodash/omit'
import _pick from 'lodash/pick'
import View from 'constelation-view'

export interface IProps {
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
  style?: Object,

  // transforms
  translateX?: number,
  translateY?: number,
  scale?: number,
  scaleX?: number,
  scaleY?: number,
  skewX?: string,
  skewY?: string,
  rotate?: string,
  rotateX?: string,
  rotateY?: string,
  rotateZ?: string,
  perspective?: number,
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
function buildTransforms(style: any): any[] {
  const transform: any[] = []

  Object.keys(style).forEach((key) => {
    if (TRANSFORM_STYLE_PROPERTIES.indexOf(key) !== -1) {
      transform.push({
        [key]: style[key],
      })
    }
  })

  return transform
}

function getStyleFromProps(props: IProps) {
  const stylesFromProps: any = _pick(props, styles)

  if (hasTransforms(props)) {
    stylesFromProps.transform = buildTransforms(props)
  }

  return stylesFromProps
}

function getNonStyleProps(props: IProps): any {
  return _omit(props, propsToOmit)
}

export class Style_ extends React.Component<IProps, void> {
  render() {
    const styleFromProps = getStyleFromProps(this.props)
    const propsToPass = getNonStyleProps(this.props)

    const Child = React.Children.only(this.props.children)

    // Style_'s render() runs before Child's, so add its style props back in
    propsToPass.style = [styleFromProps, this.props.style, Child.props.style]

    // without removing children, this would infinite loop
    delete propsToPass.children

    return React.cloneElement(Child, propsToPass)
  }
}

export class Style extends React.Component<IProps, void> {
  render() {
    const { children, ...props } = this.props

    return (
      <Style_ {...props}>
        <View>{children}</View>
      </Style_>
    )
  }
}

export default Style_