'use strict'

// const store = require('../store.js')
const greenNotification = require('../shared/ui').greenNotification
const redNotification = require('../shared/ui').redNotification
const allRoutinesHandlebar = require('../templates/allRoutines.handlebars')
const allMyRoutinesHandlebar = require('../templates/allMyRoutines.handlebars')
const showRoutineHandlebar = require('../templates/showRoutine.handlebars')
const editRoutineHandlebar = require('../templates/editRoutine.handlebars')

const addRoutineSuccess = function (data) {
  console.log('success!')
  greenNotification('Added routine successfully')
}

const addRoutineFailure = function (response) {
  console.error(response)
  redNotification('Failed to add routine')
}

const viewRoutinesSuccess = function (routines) {
  console.log('is this an array?', routines)
  $('.all-routines-container').empty()
  console.log('success!')
  $('.all-routines-container').html(allRoutinesHandlebar(routines))
}

const viewRoutinesFailure = function (response) {
  console.error(response)
  redNotification('Failed to show all routines')
}

const viewRoutineSuccess = function (routine) {
  $('#trending').hide()
  $('.show-routine-container').empty()
  $('.show-routine-container').html(showRoutineHandlebar(routine))
}

const viewRoutineFailure = function (response) {
  console.error(response)
  redNotification('Failed to show routine')
}

const showEditSuccess = function (routine) {
  $('.edit-routine-container').empty()
  $('.edit-routine-container').html(editRoutineHandlebar(routine))
}

const showEditFailure = function (response) {
  console.error(response)
  redNotification('Failed to show routine')
}

const editRoutineSuccess = function (routine) {
  console.log('edited!')
  greenNotification('Routine edited successfully')
}

const editRoutineFailure = function (response) {
  console.error(response)
  redNotification('Failed to show edit routine')
}

const deleteRoutineSuccess = function () {
  console.log('deleted!')
  greenNotification('Routine deleted successfully')
}

const deleteRoutineFailure = function (response) {
  console.error(response)
  redNotification('Failed to delete routine')
}

const viewMyRoutinesSuccess = function (routines) {
  $('.view-my-routines').empty()
  console.log('success!')
  $('.view-my-routines').html(allMyRoutinesHandlebar(routines))
  $('.add-routine-button').on('click', () => {
    $('#addRoutine').show()
  })
}

const viewMyRoutinesFailure = function (response) {
  console.error(response)
  redNotification('Failed to show all your routines')
}

module.exports = {
  addRoutineSuccess,
  addRoutineFailure,
  viewRoutinesSuccess,
  viewRoutinesFailure,
  viewRoutineSuccess,
  viewRoutineFailure,
  viewMyRoutinesSuccess,
  viewMyRoutinesFailure,
  showEditSuccess,
  showEditFailure,
  editRoutineSuccess,
  editRoutineFailure,
  deleteRoutineSuccess,
  deleteRoutineFailure
}
