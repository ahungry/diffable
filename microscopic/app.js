// A fake (minimal) React
var React = {
    createElement: function (tag, attrs, children) {
        var element;
        switch (typeof tag) {
            case 'function':
                element = tag();
                break;
            case 'string':
            default:
                element = document.createElement(tag);
                break;
        }
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
        for (var i = 2; i < arguments.length; i++) {
            var child = arguments[i];
            element.appendChild(child.nodeType == null ?
                document.createTextNode(child.toString()) : child);
        }
        return element;
    }
};
function Hello() {
    var self = document.createElement('Hello');
    self.onclick = function (_) { return alert('Hello'); };
    //this.onclick = function (_) { return alert('Hello'); };
    return self;
}
var title = "Hello World";
document.getElementById('app').appendChild(React.createElement("div", null,
    React.createElement(Hello, null, "Greetings!"),
    React.createElement("h1", null, title),
    React.createElement("h2", null, "This is a template written in TSX, then compiled to JSX by tsc (the Typescript compiler), and finally injected into a web page using a script")));
// var hello = <Hello clicked={0} name="Matt" />
