var world = { counter: 0, username: '', password: '' }
var focusPos = 0
var lastFocused = undefined
var same = true
var buf = ''
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
      // Here, we may have had the form change between send and receive.
      const diff = get_diff()
      const missing = compare_diffs(data, diff)

      document.getElementById('diffable').innerHTML = json.html

      // Now, try to add the missing values.
      Object.keys(missing).forEach(key => {
        const node = document.getElementById(key)

        if (node) {
          node.value += missing[key]
        }
      })

      if (lastFocused) {
        var focus = document.getElementById(lastFocused)

        if (focus) {
          focus.focus()
          // This could be good, unless we need to go to end due to
          // auto format things.
          // focus.selectionStart = focusPos
          focus.selectionStart = focus.value.length + 1
        }
      }
      scene_mutex = false
      if (Object.keys(missing).length > 0) same = false
    })
}

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

function compare_diffs (prev, next) {
  const diff = {}

  Object.keys(next).forEach(key => {
    if (next[key] !== prev[key]) {
      console.log('Diff: ', next[key], prev[key])
      diff[key] = next[key].slice(prev[key].length)
    }
  })

  return diff
}

function get_diff () {
  const diff = {}

  document.querySelectorAll('[diffable]')
    .forEach(node => {
      diff[node.id] = node.value
    })

  return diff
}

function server_side_diff () {
  same = true

  if (lastFocused) {
    var focus = document.getElementById(lastFocused)
    focusPos = focus ? focus.selectionStart : 0
  }

  var diff = get_diff()

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
var keypressTimeout
document.addEventListener('keypress', function (_e) {
  clearTimeout(keypressTimeout)

  keypressTimeout = setTimeout(function () {
    same = false
  }, 20)
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
