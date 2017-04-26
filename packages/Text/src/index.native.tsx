import React from 'react'
import ReactNative from 'react-native'
import _omit from 'lodash/omit'

export interface IProps {
  animated?: boolean,
  align?: 'auto' | 'left' | 'right' | 'center' | 'justify',
  allowFontScaling?: boolean,
  bold?: boolean,
  center?: boolean,
  color?: string,
  decorationLine?: 'none' | 'underline' | 'line-through' | 'underline line-through',
  fontFamily?: string,
  height?: number,
  italic?: boolean,
  numberOfLines?: number,
  refNode?: (node?: ReactNative.Text) => void,
  selectable?: boolean,
  size?: number,
  spacing?: number,
  underline?: boolean,
  uppercase?: boolean,
  weight?: 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900',
  style?: Object | Object[],
}

const propsToOmit = [
  'align',
  'color',
  'fontFamily',
  'size',
  'height',
  'italic',
  'spacing',
  'bold',
  'weight',
  'underline',
  'decorationLine',
  // 'decorationLineColor',
  // 'decorationLineStyle',
  'uppercase',
  'center',
  'animated'
]

function getStyleFromProps(props: IProps) {
  return {
    color: props.color,
    fontFamily: props.fontFamily,
    fontSize: props.size,
    fontStyle: props.italic && 'italic',
    letterSpacing: props.spacing,
    lineHeight: props.height,
    fontWeight: props.bold ? 'bold' : props.weight,
    textAlign: props.center ? 'center' : props.align,
    textDecorationLine: props.underline ? 'underline' : props.decorationLine,
    // textDecorationColor: props.decorationLineColor,
    // textDecorationStyle: props.decorationLineStyle,
  }
}

function getNonStyleProps(props: IProps): any {
  return _omit(props, propsToOmit)
}

export default class Text extends React.PureComponent<IProps, void> {
  _root: {
    setNativeProps: Function,
  }

  public setNativeProps(nativeProps: any) {
    this._root.setNativeProps(nativeProps);
  }

  setRef = (component: any) => {
    this._root = component
  }

  render() {
    const styleFromProps = getStyleFromProps(this.props)
    const propsToPass = getNonStyleProps(this.props)

    // Handle uppercase if children is a string
    if (this.props.uppercase && typeof propsToPass.children === 'string') {
      propsToPass.children = propsToPass.children.toUpperCase()
    }

    return this.props.animated
      ? (
        <ReactNative.Animated.Text
          ref={this.setRef}
          {...propsToPass }
          style={[styleFromProps, this.props.style]}
        />
      )
      : (
        <ReactNative.Text
          ref={this.setRef}
          {...propsToPass }
          style={[styleFromProps, this.props.style]}
        />
      )
  }
}
