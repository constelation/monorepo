import React from 'react'
import ReactNative from 'react-native'
import _omit from 'lodash/omit'
import _pick from 'lodash/pick'

export interface IProps {
    align?: 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch',
    alignSelf?: 'auto' | 'flex-start' | 'flex-end' | 'center' | 'stretch',
    alignVertical?: 'top' | 'center' | 'bottom',
    alignHorizontal?: 'left' | 'center' | 'right',
    justify?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around',
    animated?: boolean,
    bottom?: number,
    center?: boolean,
    flex?: number | string,
    grow?: number | boolean,
    shrink?: number,
    basis?: number,
    height?: number,
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
    overflow?: 'visible' | 'hidden' | 'scroll',
    padding?: number,
    paddingBottom?: number,
    paddingLeft?: number,
    paddingRight?: number,
    paddingTop?: number,
    paddingVertical?: number,
    paddingHorizontal?: number,
    position?: 'absolute' | 'relative',
    refNode?: () => {},
    right?: number,
    style?: Object,
    top?: number,
    width?: number,
    zIndex?: number,

    alwaysBounceHorizontal?: boolean,
    alwaysBounceVertical?: boolean,
    automaticallyAdjustContentInsets?: boolean,
    bounces?: boolean,
    bouncesZoom?: boolean,
    canCancelContentTouches?: boolean,
    centerContent?: boolean,
    contentContainerStyle?: Object,
    contentInset?: { top?: number, left?: number, bottom?: number, right?: number },
    contentOffset?: { x: number, y: number },
    decelerationRate?: "fast" | "normal" | number,
    directionalLockEnabled?: boolean,
    horizontal?: boolean,
    indicatorStyle?: "default" | "black" | "white",
    keyboardDismissMode?: 'none' | 'interactive' | 'on-drag',
    keyboardShouldPersistTaps?: 'always' | 'never' | 'handled' | boolean,
    maximumZoomScale?: number,
    minimumZoomScale?: number,
    onContentSizeChange?: Function,
    onScroll?: () => void,
    onScrollAnimationEnd?: () => void,
    onScrollBeginDrag?: () => void,
    onScrollEndDrag?: () => void,
    onMomentumScrollEnd?: () => void,
    onMomentumScrollBegin?: () => void,
    pagingEnabled?: boolean,
    refreshControl?: JSX.Element,
    removeClippedSubviews?: boolean,
    showsHorizontalScrollIndicator?: boolean,
    scrollEnabled?: boolean,
    scrollEventThrottle?: number,
    scrollIndicatorInsets?: { top?: number, left?: number, bottom?: number, right?: number },
    scrollsToTop?: boolean,
    showsVerticalScrollIndicator?: boolean,
    snapToAlignment?: "start" | "center" | "end",
    snapToInterval?: number,
    stickyHeaderIndices?: number[],
    zoomScale?: number,
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

// from https://facebook.github.io/react-native/docs/layout-props.html
const styles = [
    'alignSelf',
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
]

const propsToOmit = styles.concat([
    'align',
    'alignHorizontal',
    'alignVertical',
    'grow',
    'shrink',
    'basis',
    'justify',
    'center',

    'style',
    'animated',
    'refNode',
])

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
    else if (props.horizontal === true) {
        return 'flex-start'
    }
    else {
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
    const stylesFromProps = _pick(props, styles)

    if (props.hasOwnProperty('grow')) {
        stylesFromProps.flexGrow = props.grow === true ? 1 : props.grow
    }

    if (props.hasOwnProperty('shrink')) {
        stylesFromProps.flexShrink = props.shrink
    }

    if (props.hasOwnProperty('basis')) {
        stylesFromProps.flexBasis = props.basis
    }

    return stylesFromProps
}

function getContentStyleFromProps(props: IProps) {
    // from https://github.com/facebook/react-native/blob/master/Libraries/Components/ScrollView/ScrollView.js#L518
    return {
        // TODO: add other convenience props like `contentHeight`
        alignItems: getAlignItems(props),
        justifyContent: getJustifyContent(props),
    }
}

function getNonStyleProps(props: IProps) {
    return _omit(props, propsToOmit)
}

function hasContentStyleProps(props: IProps) {
    return (
        props.alignHorizontal !== undefined ||
        props.alignVertical !== undefined ||
        props.center !== undefined ||
        props.align !== undefined ||
        props.justify !== undefined
    )
}

export default class ScrollView extends React.Component<IProps, void> {
    private setAnimatedRef = (node) => {
        this.props.refNode(node ? node._component : node);
    }

    render() {
        const styleFromProps = getStyleFromProps(this.props)
        const propsToPass = getNonStyleProps(this.props)

        propsToPass.style = [styleFromProps, this.props.style]

        if (hasContentStyleProps(this.props)) {
            propsToPass.contentContainerStyle = getContentStyleFromProps(this.props)
        }

        if (this.props.refNode) {
            // We don't want the Animated node, just the ScrollView with scrollTo(), etc
            propsToPass.ref = (this.props.animated)
                ? this.setAnimatedRef
                : this.props.refNode
        }

        return this.props.animated
            ? <ReactNative.Animated.ScrollView {...propsToPass} />
            : <ReactNative.ScrollView {...propsToPass} />
    }
}
