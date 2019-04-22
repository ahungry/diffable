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
var Hello = /** @class */ (function () {
    function Hello(props) {
        var _this = this;
        this.clicked = 0;
        this.onClick = function () {
            _this.clicked++;
            console.log(_this.clicked);
            _this.setState();
        };
        // Just a redraw for now
        this.setState = function () {
            console.log(_this.props.id);
            var self = React.createElement(Hello, { clicked: _this.clicked });
            var t = document.getElementById(_this.props.id);
            t.parentNode.replaceChild(self, t);
        };
        this.clicked = props.clicked || 0;
    }
    Hello.prototype.render = function () {
        return (React.createElement("div", null,
            "Greetings to you!",
            React.createElement("strong", null, this.props.children),
            React.createElement("b", null,
                "Clicked ",
                this.clicked,
                " times!")));
    };
    return Hello;
}());
var title = "Hello World";
document.getElementById('app').appendChild(React.createElement("div", null,
    React.createElement(Hello, { clicked: 0 }, "Greetings!"),
    React.createElement("h1", null, title),
    React.createElement("h2", null, "This is a template written in TSX, then compiled to JSX by tsc (the Typescript compiler), and finally injected into a web page using a script")));
// var hello = <Hello clicked={0} name="Matt" />
