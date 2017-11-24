'use strict'

const setAPIOrigin = require('../../lib/set-api-origin')
const config = require('./config')
const authEvents = require('./auth/events')
// const mutationObservers = require('./shared/mutation-observers')

$(() => {
  setAPIOrigin(location, config)
  authEvents.addHandlers()
  // mutationObservers.registerObservers()
  $('#sign-in-div').show()
})

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')
