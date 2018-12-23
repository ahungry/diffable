var scene_mutex = false

function set_scene (state, next) {
  const url = 'http://localhost:12345/api.php'
  const data = next

  if (scene_mutex) return
  scene_mutex = true

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
      scene_mutex = false
    })
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
  server_side_diff()
}, 20)

// Every so often, just allow a refresh incase server changed.
setInterval(function () {
  if (document.getElementById('scene').hasAttribute('refresh')) {
    same = false
  }
}, 10e3)

function server_side_diff () {
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
}

// Ensure we always remember last focus
document.addEventListener('focus', function (e) {
  // console.log(e)
  lastFocused = e.target.id
}, true)

document.addEventListener('blur', function (_e) {
  // console.log(e)
}, true)

// TODO: Add some type of lock here.
// For instance, queue all keys pre-send and auto append if a
// refresh hits us mid typing.
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
    if (e.target.hasAttribute('pointer')) {
      var p = e.target.getAttribute('pointer')
      document.getElementById(p).value = e.target.value
    } else {
      e.target.value = 'clicked'
    }
    e.preventDefault()
    e.stopPropagation()
    same = false
  }
}, true)
