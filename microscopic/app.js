var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
// A fake (minimal) React
var idc = 0; // id counter
function makeElement(element) {
    idc++;
    var node = document.createElement(element);
    node.id = idc;
    return node;
}
function renderCustom(element) {
    var node = makeElement(element.constructor.name);
    node.onclick = element.onClick.bind(node);
    node.appendChild(element.render());
    element.props.id = node.id;
    return node;
}
var React = {
    createElement: function (tag, attrs, children) {
        var _a;
        var isFn = false;
        var element;
        switch (typeof tag) {
            case 'function':
                var t = (_a = {}, _a[tag] = tag, _a);
                element = (new t[tag](attrs));
                element.props = {
                    children: document.createElement('span')
                };
                isFn = true;
                console.log(element.constructor.name);
                break;
            case 'string':
            default:
                element = document.createElement(tag);
                break;
        }
        if (false === isFn) {
            for (var name_1 in attrs) {
                if (name_1 && attrs.hasOwnProperty(name_1)) {
                    var value = attrs[name_1];
                    if (value === true) {
                        element.setAttribute(name_1, name_1);
                    }
                    else if (value !== false && value != null) {
                        element.setAttribute(name_1, value.toString());
                    }
                }
            }
        }
        for (var i = 2; i < arguments.length; i++) {
            var child = arguments[i];
            if (false === isFn) {
                element.appendChild(child.nodeType == null ?
                    document.createTextNode(child.toString()) : child);
            }
            else {
                element.props.children.appendChild(child.nodeType == null ?
                    document.createTextNode(child.toString()) : child);
            }
        }
        return isFn ? renderCustom(element) : element;
    }
};
var Base = /** @class */ (function () {
    function Base(props, state) {
        var _this = this;
        this.props = props;
        this.state = state;
        // Just a redraw for now
        this.setState = function (m) {
            console.log(_this.props.id);
            console.log('New state was: ', m);
            console.log('I am of type: ', typeof _this);
            // TODO: How to get the static class ref dynamically?
            var self = React.createElement(Hello, __assign({}, _this.props, m), _this.props.children);
            // var self = <Hello {...this.props} {...m}>{this.props.children}</Hello>
            var t = document.getElementById(_this.props.id);
            console.log('T was: ', t);
            t.parentNode.replaceChild(self, t);
        };
    }
    return Base;
}());
var Hello = /** @class */ (function (_super) {
    __extends(Hello, _super);
    function Hello(props, state) {
        var _this = _super.call(this, props, state) || this;
        _this.onClick = function () {
            _this.setState({
                clicked: ++_this.state.clicked
            });
        };
        console.log('New props was: ', props);
        _this.state = {
            clicked: props.clicked || 0
        };
        return _this;
    }
    Hello.prototype.render = function () {
        return (React.createElement("div", null,
            "Greetings to you!",
            React.createElement("strong", null, this.props.children),
            React.createElement("b", null,
                "Clicked ",
                this.state.clicked,
                " times!")));
    };
    return Hello;
}(Base));
var title = "Hello World";
document.getElementById('app').appendChild(React.createElement("div", null,
    React.createElement(Hello, { clicked: 0 }, "Greetings!"),
    React.createElement("h1", null, title),
    React.createElement("h2", null, "This is a template written in TSX, then compiled to JSX by tsc (the Typescript compiler), and finally injected into a web page using a script")));
// var hello = <Hello clicked={0} name="Matt" />
