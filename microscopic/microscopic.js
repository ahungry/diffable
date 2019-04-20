// Basically, importing the tags you plan to use.
var { input, div, p, strong, i } = tags

// TODO: Wrap the dom elements in self observing state, so they re-render themselves.
// TODO: Need to figure out how to coalesce up to top of a node's tree
function Hello (p) {
  // state things
  this.clicked = p.clicked

  return div(
    make_handlers(e => {
      console.log(e)
      this.clicked++
      console.log('Clicked: ', this.clicked, 'id was: ', e.target.id)
      // Now, lets redraw the node?
      e.target.parentNode.replaceChild(new Hello({ name: p.name, clicked: this.clicked }), e.target)
    }),
    'I was clicked this many times: ' + this.clicked,
  )
}

var hello = new Hello({ clicked: 0, name: 'Matt' })
var hello2 = new Hello({ clicked: 0, name: 'Matt' })
var GoodBye = p => div('GoodBye ' + p.name)

var d = div(
  input(),
  hello, hello2,
  GoodBye({ name: 'Matt' }),
)

document.getElementById('hello-example').appendChild(d)
