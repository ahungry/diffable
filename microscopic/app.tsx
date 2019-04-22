// A fake (minimal) React
var idc = 0 // id counter

function makeElement (element) {
  idc++
  var node = document.createElement(element)
  node.id = idc

  return node
}

function renderCustom (element) {
  var node = makeElement(element.constructor.name)
  node.onclick = element.onClick.bind(node)
  node.appendChild(element.render())
  element.props.id = node.id

  return node
}

const React = {
  createElement: function (tag, attrs, children) {
    var isFn = false
    var element

    switch (typeof tag) {
      case 'function':
        const t = { [tag]: tag }
        element = (new t[tag](attrs))
        element.props = {
          children: document.createElement('span')
        }
        isFn = true
        console.log(element.constructor.name)
        break

      case 'string':
      default:
        element = document.createElement(tag)
        break
    }

    if (false === isFn) {
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
    }
    for (let i = 2; i < arguments.length; i++) {
      let child = arguments[i]

      if (false === isFn) {
        element.appendChild(
          child.nodeType == null ?
            document.createTextNode(child.toString()) : child)
      } else {
        element.props.children.appendChild(
          child.nodeType == null ?
            document.createTextNode(child.toString()) : child)
      }
    }
    return isFn ? renderCustom(element) : element
  }
}

class Hello {
  public props
  public clicked = 0

  constructor (props) {
    this.clicked = props.clicked || 0
  }

  public onClick = () => {
    this.clicked++
    console.log(this.clicked)
    this.setState()
  }

  // Just a redraw for now
  setState = () => {
    console.log(this.props.id)
    var self = <Hello clicked={this.clicked} />
    var t = document.getElementById(this.props.id)
    t.parentNode.replaceChild(self, t)
  }

  render () {
    return (
      <div>Greetings to you!<strong>{this.props.children}</strong>
        <b>Clicked {this.clicked} times!</b>
      </div>
    )
  }
}

const title = "Hello World"

document.getElementById('app').appendChild(
  <div>
    <Hello clicked={0}>Greetings!</Hello>
    <h1>{title}</h1>
    <h2>This is a template written in TSX, then compiled to JSX by tsc (the Typescript compiler), and finally
            injected into a web page using a script</h2>
  </div>
)

// var hello = <Hello clicked={0} name="Matt" />
