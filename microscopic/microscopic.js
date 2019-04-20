function Handlers (fn) {
  this.onClick = function (e) {
    console.log('I was clicked!', e)

    if (fn) {
      fn(e)
    }
  }
}

function make_handlers (fn) {
  return new Handlers(fn)
}

var p = new Handlers()
console.log('p type', p instanceof Handlers)

// Args can be the children
function make_tag (tag) {
  return function () {
    var children = arguments
    console.log(children)
    var e = document.createElement(tag)

    if (children && children.length > 0) {
      for (var i = 0; i < children.length; i++) {
        var child = children[i]
        if (typeof child === 'string') {
          var s = child
          child = document.createElement('span')
          child.innerHTML = s
        }

        if (child instanceof Handlers) {
          e.addEventListener('click', child.onClick)
        } else {
          e.appendChild(child)
          console.log('Got a real object...')
        }
      }
    }

    return e
  }
}

var tags = {}

var tag_map = ['div', 'p', 'i', 'strong', 'form', 'input'].map(function (tag) {
  tags[tag] = make_tag(tag)
})

// Basically, importing the tags you plan to use.
var { div, p, strong, i } = tags

// TODO: Wrap the dom elements in self observing state, so they re-render themselves.
function Hello (p) {
  // state things
  this.clicked = 0

  return div(
    make_handlers(_ => { this.clicked++; console.log('Clicked: ', this.clicked); }),
    'Hello ' + p.name,
  )
}

var hello = new Hello({ name: 'Matt' })
var hello2 = new Hello({ name: 'Matt' })
var GoodBye = p => div('GoodBye ' + p.name)

var d = div(
  hello, hello2,
  GoodBye({ name: 'Matt' }),
)

document.getElementById('hello-example').appendChild(d)
// class HelloMessage extends React.Component {
//   render () {
//     const div = document.createElement('div')
//     div.innerHTML = `Hello M`

//     return div
//     // return (
//     //   <div>
//     //     Hello {this.props.name}
//     //   </div>
//     // );
//   }
// }

// document.appendChild()
// ReactDOM.render(
//   <HelloMessage name="Taylor" />,
//   document.getElementById('hello-example')
// )
