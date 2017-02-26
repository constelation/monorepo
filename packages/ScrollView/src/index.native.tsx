import React from 'react'
import ReactNative from 'react-native'
import _omit from 'lodash/omit'

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
const propsToOmit = [
    'align',
    'alignHorizontal',
    'alignVertical',
    'alignSelf',
    'bottom',
    'flex',
    'grow',
    'shrink',
    'basis',
    'height',
    'justify',
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

    'animated',
    'center',
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
    return {
        alignSelf: props.alignSelf,
        bottom: props.bottom,
        flex: props.flex,
        flexGrow: props.grow === true ? 1 : props.grow,
        flexShrink: props.shrink,
        flexBasis: props.basis,
        height: props.height,
        left: props.left,
        margin: props.margin,
        marginBottom: props.marginBottom,
        marginLeft: props.marginLeft,
        marginRight: props.marginRight,
        marginTop: props.marginTop,
        marginHorizontal: props.marginHorizontal,
        marginVertical: props.marginVertical,
        maxHeight: props.maxHeight,
        maxWidth: props.maxWidth,
        minHeight: props.minHeight,
        minWidth: props.minWidth,
        overflow: props.overflow,
        padding: props.padding,
        paddingBottom: props.paddingBottom,
        paddingLeft: props.paddingLeft,
        paddingRight: props.paddingRight,
        paddingTop: props.paddingTop,
        paddingHorizontal: props.paddingHorizontal,
        paddingVertical: props.paddingVertical,
        position: props.position,
        right: props.right,
        top: props.top,
        width: props.width,
        zIndex: props.zIndex,
    }
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

export default class ScrollView extends React.PureComponent<IProps, void> {
    render() {
        const styleFromProps = getStyleFromProps(this.props)
        const propsToPass = getNonStyleProps(this.props)

        propsToPass.style = [styleFromProps, this.props.style]

        if (hasContentStyleProps(this.props)) {
            propsToPass.contentContainerStyle = getContentStyleFromProps(this.props)
        }

        // Use refNode pattern to pass back the DOM's node
        if (this.props.refNode) {
            propsToPass.ref = this.props.refNode
        }

        return this.props.animated
            ? <ReactNative.Animated.ScrollView {...propsToPass} />
            : <ReactNative.ScrollView {...propsToPass} />
    }
}