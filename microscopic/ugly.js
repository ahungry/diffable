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
var global_id = 0

// Args can be the children
function make_tag (tag) {
  return function () {
    global_id++
    var children = arguments
    console.log(children)
    var e = document.createElement(tag)
    e.id = global_id

    if (children && children.length > 0) {
      for (var i = 0; i < children.length; i++) {
        var child = children[i]
        if (typeof child === 'string') {
          var s = child
          child = document.createElement('span')
          global_id++
          child.id = global_id
          child.innerHTML = s
        }

        if (child instanceof Handlers) {
          e.addEventListener('click', child.onClick.bind(e))
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
