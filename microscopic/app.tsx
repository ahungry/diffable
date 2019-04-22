// A fake (minimal) React
const React = {
  createElement: function (tag, attrs, children) {
    var element

    switch (typeof tag) {
      case 'function':
        element = tag()
        break

      case 'string':
      default:
        element = document.createElement(tag)
        break
    }

    for (let name in attrs) {
      if (name && attrs.hasOwnProperty(name)) {
        let value = attrs[name]
        if (value === true) {
          element.setAttribute(name, name)
        } else if (value !== false && value != null) {
          element.setAttribute(name, value.toString())
        }
      }
    }
    for (let i = 2; i < arguments.length; i++) {
      let child = arguments[i]
      element.appendChild(
        child.nodeType == null ?
          document.createTextNode(child.toString()) : child)
    }
    return element
  }
}

function Hello () {
  var self = document.createElement('Hello')
  self.onclick = _ => alert('Hello')
  //this.onclick = function (_) { return alert('Hello'); };
  return self
}

const title = "Hello World"

document.getElementById('app').appendChild(
  <div>
    <Hello>Greetings!</Hello>
    <h1>{title}</h1>
    <h2>This is a template written in TSX, then compiled to JSX by tsc (the Typescript compiler), and finally
            injected into a web page using a script</h2>
  </div>
)

// var hello = <Hello clicked={0} name="Matt" />
