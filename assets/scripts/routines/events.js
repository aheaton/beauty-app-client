'use strict'

const getFormFields = require(`../../../lib/get-form-fields`)

const api = require('./api')
const ui = require('./ui')
const store = require('../store')

const onAddRoutine = function (event) {
  event.preventDefault()
  console.log('got to event handler', event.target)
  const data = getFormFields(event.currentTarget)
  console.log('this is the data', data)
  api.create(data)
    .then(ui.addRoutineSuccess)
    .then(onViewMyRoutines)
    .then(() => {
      $('#addRoutine').hide()
      $('.view-my-routines').show()
    })
    .then(onViewRoutines)
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
    .then(onViewMyRoutines)
    .then(onViewRoutines)
    .catch(ui.deleteRoutineFailure)
}

const onViewRoutines = function () {
  api.index()
    .then(ui.viewRoutinesSuccess)
    .then((response) => {
      $('.show-routine-link').on('click', (event) => {
        event.preventDefault()
        onViewRoutine($(event.target).attr('data-id'))
      })
    })
    .then(() => {
      $('#addRoutine').on('submit', onAddRoutine)
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
  api.index()
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
  console.log('here')
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
