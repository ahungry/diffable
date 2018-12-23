// At any given point, you can envision the before and after of a scene and
// map out very easily the different paths it could take just by receiving the "diff"
// of things you specifically care about.
// So - how would this be that different?  We would not "nest" things, and thus avoid
// the tree.  While the DOM is nested, our state of what is on the page and we care about
// shouldn't be, it just makes it much more complicated to hand things down.
// If it has a diffable tag, and it has an id, we pull from the id the current values.
// The other neat thing about this approach, is that we could use any server side language
// for the implementation of logic - javascript will just be scanning the front end for us
// and pushing JSON via websocket or AJAX (or even user POST I guess if we want to gracefully
// degrade).  Then we just dynamically create things based on transitional logic vs route mappings.
function DashboardScene () {
}

DashboardScene.prototype.toString = function () {
  return 'Your amazing dashboard is here now.'
}

function LoginScene (state, next) {
  this.state = state
  this.next = next

  // This ensures we don't hit a cyclic loop.
  if (undefined === next) return this

  // The user clicked the button to submit the form.
  if ("clicked" === next.go) {
    if (isAuthorized(next)) {
      return new DashboardScene
    }
    return new LoginScene({ ...next, error: "Invalid credentials (try 'test' / 'test')." })
  }

  // Hey, why not toss in a counter as well.
  if ("clicked" === next.inc) {
    next.counter = Number(next.counter) + 1

    return new LoginScene(next)
  }

  if (next.password.length > 0 && next.password.length < 5) {
    return new LoginScene({
      ...next,
      error: `Keep typing, we do not allow passes that small (${next.password.length} chars)`,
    })
  }

  return new LoginScene(next)
}

function ErrorView (error) {
  return `<div style="color:red;">Oops! ${error}</div>`
}

function LoginView (state) {
  return `
<form>
  ${state.error ? ErrorView(state.error) : ''}
  <input type="text" value="${state.username}" id="username" diffable />
  <input type="password" value="${state.password}" id="password" diffable />
  <button id="go" clickable diffable>Login</button>
  <div><strong id="inc" clickable diffable>Clicked ${state.counter} times!</strong></div>
  <input type="hidden" id="counter" diffable value="${state.counter}" />
</form>
`
}

LoginScene.prototype.toString = function () {
  return LoginView(this.state)
}

function isAuthorized (m) {
  if (m.username === 'test' && m.password === 'test') {
    return true
  }

  return false
}

function set_scene (state, next) {
  const url = 'http://localhost:12345/api.php'
  const data = next

  fetch(url, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(response => response.json())
    .then(json => {
      document.getElementById('diffable').innerHTML = json.html
      if (lastFocused) {
        var focus = document.getElementById(lastFocused)
        if (focus) {
          focus.focus()
          focus.selectionStart = focusPos
        }
      }
    })
  //document.getElementById('diffable').innerHTML = new LoginScene(state, next)
}

var world = { counter: 0, username: '', password: '' }
var focusPos = 0
var lastFocused = undefined
var same = true

setTimeout(function () {
  set_scene(world)
}, 1)

// Add a throttle when typing and needing to refresh the state.
setInterval(function () {
  if (true === same) {
    return
  }
  same = true

  if (lastFocused) {
    var focus = document.getElementById(lastFocused)
    focusPos = focus ? focus.selectionStart : 0
  }

  var diff = {}

  document.querySelectorAll('[diffable]')
    .forEach(function (node) {
      diff[node.id] = node.value
    })

  // This feedback loop needs to happen from the scene call
  console.log(diff)
  set_scene(world, diff)
  world = diff

}, 20)

// Ensure we always remember last focus
document.addEventListener('focus', function (e) {
  // console.log(e)
  lastFocused = e.target.id
}, true)

document.addEventListener('blur', function (_e) {
  // console.log(e)
}, true)

document.addEventListener('keypress', function (_e) {
  same = false
}, true)

document.addEventListener('change', function (_e) {
  same = false
}, true)

document.addEventListener('submit', function (e) {
  console.log(e)
}, true)

document.addEventListener('click', function (e) {
  if (e.target.hasAttribute('clickable')) {
    e.target.value = 'clicked'
    e.preventDefault()
    e.stopPropagation()
    same = false
  }
}, true)
