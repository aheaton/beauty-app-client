'use strict'

const setAPIOrigin = require('../../lib/set-api-origin')
const config = require('./config')
const authEvents = require('./auth/events')
const routineEvents = require('./routines/events')
// const mutationObservers = require('./shared/mutation-observers')

$(() => {
  setAPIOrigin(location, config)
  authEvents.addHandlers()
  routineEvents.addHandlers()
  // mutationObservers.registerObservers()
  $('#sign-in-div').show()
  $('#trending').click(function (event) {
    event.preventDefault()
    $(this).tab('show')
    routineEvents.onViewRoutines()
  })
  $('#myposts').click(function (event) {
    event.preventDefault()
    console.log('hitting this tab event handler')
    $(this).tab('show')
    routineEvents.onViewMyRoutines()
  })
  $('#show-routine-link').on('click', routineEvents.onViewRoutine)
})

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')
