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
  $('#trending-click').click(function (event) {
    event.preventDefault()
    $('.add-routine-container').empty()
    $(this).tab('show')
    routineEvents.onViewRoutines()
  })
  $('#addpost-click').click(function (event) {
    event.preventDefault()
    $(this).tab('show')
    routineEvents.onShowAddForm()
  })
  $('#myposts-click').click(function (event) {
    event.preventDefault()
    $('.add-routine-container').empty()
    $(this).tab('show')
    routineEvents.onViewMyRoutines()
  })
  $('#show-routine-link').on('click', routineEvents.onViewRoutine)
  $('#add-back-button').on('click', (event) => {
    event.preventDefault()
    $('.view-my-routines').show()
    $('#addRoutine').hide()
  })
  $('.add-routine-cancel').on('click', (event) => {
    event.preventDefault()
    $('.view-my-routines').show()
    $('#addRoutine').hide()
  })
})
