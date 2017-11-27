'use strict'

// const store = require('../store.js')
const greenNotification = require('../shared/ui').greenNotification
const redNotification = require('../shared/ui').redNotification
const allRoutinesHandlebar = require('../templates/allRoutines.handlebars')

const addRoutineSuccess = function (data) {
  console.log('success!')
  greenNotification('Added routine successfully')
}

const addRoutineFailure = function (response) {
  console.error(response)
  redNotification('Failed to add routine')
}

const viewRoutinesSuccess = function (routines) {
  $('.all-routines-container').empty()
  console.log('success!')
  $('.all-routines-container').append(allRoutinesHandlebar(routines))
}

const viewRoutinesFailure = function (response) {
  console.error(response)
  redNotification('Failed to show all routines')
}

module.exports = {
  addRoutineSuccess,
  addRoutineFailure,
  viewRoutinesSuccess,
  viewRoutinesFailure
}
