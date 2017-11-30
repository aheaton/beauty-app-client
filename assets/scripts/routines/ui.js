'use strict'

// const store = require('../store.js')
const greenNotification = require('../shared/ui').greenNotification
const redNotification = require('../shared/ui').redNotification
const allRoutinesHandlebar = require('../templates/allRoutines.handlebars')
const allMyRoutinesHandlebar = require('../templates/allMyRoutines.handlebars')
const showRoutineHandlebar = require('../templates/showRoutine.handlebars')
const editRoutineHandlebar = require('../templates/editRoutine.handlebars')
const addRoutineHandlebar = require('../templates/addRoutine.handlebars')

const addRoutineSuccess = function (data) {
  greenNotification('Added routine successfully')
  $('.add-routine-container').empty()
  $('#myposts-click').click()
}

const addRoutineFailure = function (response) {
  console.error(response)
  redNotification('Failed to add routine')
}

const viewRoutinesSuccess = function (routines) {
  $('.all-routines-container').empty()
  console.log('success!')
  $('.all-routines-container').html(allRoutinesHandlebar(routines))
  $('.all-routines-container').show()
  $('.add-routine-container').html(addRoutineHandlebar())
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
  $('.view-my-routines').hide()
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
  $('body').removeClass('modal-open')
  $('.modal-backdrop').remove()
  greenNotification('Routine deleted successfully')
  $('#confirmDeleteModal').modal('hide')
  $('#myposts-click').click()
}

const deleteRoutineFailure = function (response) {
  console.error(response)
  $('body').removeClass('modal-open')
  $('.modal-backdrop').remove()
  redNotification('Failed to delete routine')
}

const viewMyRoutinesSuccess = function (routines) {
  $('.view-my-routines').empty()
  console.log('success!')
  $('.view-my-routines').html(allMyRoutinesHandlebar(routines))
  $('.view-my-routines').show()
  $('.add-routine-container').html(addRoutineHandlebar())
}

const viewMyRoutinesFailure = function (response) {
  console.error(response)
  redNotification('Failed to show all your routines')
}

const showDeleteModal = function () {
  $('#confirmDeleteModal').modal('show')
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
  deleteRoutineFailure,
  showDeleteModal
}
