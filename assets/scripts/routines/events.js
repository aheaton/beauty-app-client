'use strict'

const getFormFields = require(`../../../lib/get-form-fields`)

const api = require('./api')
const ui = require('./ui')
const store = require('../store')

const onAddRoutine = function (event) {
  event.preventDefault()
  console.log('on add routine')
  const data = getFormFields(event.currentTarget)
  api.create(data)
    .then(ui.addRoutineSuccess)
    .catch(ui.addRoutineFailure)
}

const onViewRoutine = function (id) {
  api.show(id)
    .then(ui.viewRoutineSuccess)
    .then(() => {
      $('#view-back-button').on('click', () => {
        $('.show-routine-container').hide()
        $('.all-routines-container').show()
      })
    })
    .catch(ui.viewRoutineFailure)
}

const onDeleteRoutine = function (id) {
  api.destroy(id)
    .then(ui.deleteRoutineSuccess)
    .catch(ui.deleteRoutineFailure)
}

const onViewRoutines = function () {
  return api.index()
    .then(ui.viewRoutinesSuccess)
    .then((response) => {
      $('.show-routine-link').on('click', (event) => {
        event.preventDefault()
        onViewRoutine($(event.target).attr('data-id'))
      })
    })
    .catch(ui.viewRoutinesFailure)
}

const onEditRoutine = function (id, data) {
  console.log('this is the edit data', data)
  api.update(id, data)
    .then(ui.editRoutineSuccess)
    .then(() => {
      onViewMyRoutines()
      $('.view-my-routines').show()
      $('.edit-routine-container').empty()
    })
    .then(onViewRoutines)
    .catch(ui.editRoutineFailure)
}

const onShowEdit = function (id) {
  api.show(id)
    .then(ui.showEditSuccess)
    .then(() => {
      $('#edit-routine').on('submit', (event) => {
        event.preventDefault()
        const data = getFormFields(event.target)
        onEditRoutine($(event.target).attr('data-id'), data)
      })
    })
    .then(() => {
      $('.edit-routine-cancel').on('click', (event) => {
        event.preventDefault()
        onViewMyRoutines()
        $('.view-my-routines').show()
        $('.edit-routine-container').empty()
      })
    })
    .then(() => {
      $('#edit-back-button').on('click', (event) => {
        event.preventDefault()
        onViewMyRoutines()
        $('.view-my-routines').show()
        $('.edit-routine-container').empty()
      })
    })
    .catch(ui.showEditFailure)
}

const filterRoutines = function (array) {
  const userRoutineArray = []
  for (let i = 0; i < array.routines.length; i++) {
    if (array.routines[i]._owner === store.user.id) {
      userRoutineArray.push(array.routines[i])
    } else {
    }
  }
  return userRoutineArray
}

const onViewMyRoutines = function () {
  return api.index()
    .then((response) => {
      return { routines: filterRoutines(response) }
    })
    .then(ui.viewMyRoutinesSuccess)
    .then((response) => {
      $('.edit-routine-link').on('click', (event) => {
        event.preventDefault()
        onShowEdit($(event.target).attr('data-id'))
      })
    })
    .then(() => {
      $('.delete-routine-link').unbind('click')
      $('.delete-routine-link').on('click', (event) => {
        onDeleteClick()
        const routineId = event.target.getAttribute('data-id')
        store.routineId = routineId
      })
    })
    .then(() => {
      $('#delete-routine-confirm').unbind('click')
      $('#delete-routine-confirm').on('click', (event) => {
        event.preventDefault()
        onDeleteRoutine(store.routineId)
      })
    })
    .catch(ui.viewMyRoutinesFailure)
}

const onDeleteClick = function () {
  event.stopPropagation()
  ui.showDeleteModal()
}

const onShowAddForm = function () {
  $('.add-routine-container').show()
  $('#addRoutine').on('submit', onAddRoutine)
}

const addHandlers = function () {
}

module.exports = {
  addHandlers,
  onViewRoutines,
  onViewRoutine,
  filterRoutines,
  onViewMyRoutines,
  onDeleteClick,
  onShowAddForm
}
