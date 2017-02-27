"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var glamorReact = require("glamor-react");
var _omit = require("lodash/omit");
var alignHorizontalAlias = {
    left: 'flex-start',
    center: 'center',
    right: 'flex-end',
};
var alignVerticalAlias = {
    top: 'flex-start',
    center: 'center',
    bottom: 'flex-end',
};
var propsToOmit = [
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
    'style',
    'inlineStyle',
    'tag',
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
];
function getAlignItems(props) {
    if (props.align) {
        return props.align;
    }
    else if (props.horizontal === true && props.alignVertical) {
        return alignVerticalAlias[props.alignVertical];
    }
    else if (props.alignHorizontal) {
        return alignHorizontalAlias[props.alignHorizontal];
    }
    else if (props.center === true) {
        return 'center';
    }
    else if (props.horizontal === true) {
        return 'flex-start';
    }
    else {
        return 'stretch';
    }
}
function getJustifyContent(props) {
    if (props.justify) {
        return props.justify;
    }
    else if (props.horizontal === true && props.alignHorizontal) {
        return alignHorizontalAlias[props.alignHorizontal];
    }
    else if (props.alignVertical) {
        return alignVerticalAlias[props.alignVertical];
    }
    else if (props.center === true) {
        return 'center';
    }
}
function getStyleFromProps(props) {
    return {
        alignSelf: props.alignSelf,
        alignItems: getAlignItems(props),
        alignContent: props.alignContent,
        bottom: props.bottom,
        display: props.hidden ? 'none' : (props.inline ? 'inline-flex' : 'flex'),
        flex: props.flex,
        flexDirection: props.horizontal === true ? 'row' : 'column',
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
    };
}
function hasHitSlopProp(props) {
    return props.hitSlop
        || props.hitSlopVertical
        || props.hitSlopHorizontal
        || props.hitSlopTop
        || props.hitSlopRight
        || props.hitSlopBottom
        || props.hitSlopLeft;
}
var Slop = function (props) {
    return (React.createElement("span", {
        style: {
            position: 'absolute',
            top: -(props.hitSlopTop || props.hitSlopVertical || props.hitSlop || 0),
            right: -(props.hitSlopRight || props.hitSlopHorizontal || props.hitSlop || 0),
            bottom: -(props.hitSlopBottom || props.hitSlopVertical || props.hitSlop || 0),
            left: -(props.hitSlopLeft || props.hitSlopHorizontal || props.hitSlop || 0),
        }
    }));
};
var View = (function (_super) {
    __extends(View, _super);
    function View() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    View.prototype.render = function () {
        var styleFromProps = getStyleFromProps(this.props);
        var propsToPass = _omit(this.props, propsToOmit);
        var css = __assign({}, styleFromProps, this.props.style);
        propsToPass.css = css;
        propsToPass.style = this.props.inlineStyle;
        if (this.props.refNode) {
            propsToPass.ref = this.props.refNode;
        }
        if (hasHitSlopProp(this.props)) {
            var HitSlop = (React.createElement(Slop, { hitSlop: this.props.hitSlop, hitSlopTop: this.props.hitSlopTop, hitSlopRight: this.props.hitSlopRight, hitSlopBottom: this.props.hitSlopBottom, hitSlopLeft: this.props.hitSlopLeft, hitSlopVertical: this.props.hitSlopVertical, hitSlopHorizontal: this.props.hitSlopHorizontal }));
            if (propsToPass.children == null) {
                propsToPass.children = HitSlop;
            }
            else {
                propsToPass.children = React.Children.toArray(propsToPass.children);
                propsToPass.children.unshift(HitSlop);
            }
        }
        return glamorReact.createElement(this.props.tag, propsToPass);
    };
    return View;
}(React.PureComponent));
View.defaultProps = {
    tag: 'div',
    shrink: 0,
    position: 'relative',
    alignContent: 'flex-start',
};
exports.default = View;
