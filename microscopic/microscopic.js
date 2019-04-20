function Props (fn) {
  this.onClick = function (e) {
    console.log('I was clicked!', e)

    if (fn) {
      fn(e)
    }
  }
}

function make_props (fn) {
  return new Props(fn)
}

var p = new Props()
console.log('p type', p instanceof Props)

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

        if (child instanceof Props) {
          e.addEventListener('click', child.onClick)
        } else {
          e.appendChild(child)
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

var d = div(make_props(function (e) { alert('wowee!') }),
  p('Start a paragraph here...',
    strong('Bold text, wow!'),
    i('italic text, wow!'),
  ),
  'Hello world',
  'This is not bad.'
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
