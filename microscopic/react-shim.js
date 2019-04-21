/**
 * Include this script in your HTML to use JSX compiled code without React.
 */

const React = {
  createElement: function (tag, attrs, children) {
    var element = document.createElement(tag);

    for (let name in attrs) {
      if (name && attrs.hasOwnProperty(name)) {
        let value = attrs[name];
        if (value === true) {
          element.setAttribute(name, name);
        } else if (value !== false && value != null) {
          element.setAttribute(name, value.toString());
        }
      }
    }
    for (let i = 2; i < arguments.length; i++) {
      let child = arguments[i];
      element.appendChild(
        child.nodeType == null ?
          document.createTextNode(child.toString()) : child);
    }
    return element;
  }
};
