'use strict'

const getFormFields = require(`../../../lib/get-form-fields`)

const api = require('./api')
const ui = require('./ui')
const store = require('../store')

const onAddRoutine = function (event) {
  event.preventDefault()
  console.log('got to event handler', event.target)
  const data = getFormFields(event.target)
  // const photoData = new FormData(event.target)
  console.log('this is the data', data)
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
  api.index()
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
    .catch(ui.editRoutineFailure)
}

const onShowEdit = function (id) {
  api.show(id)
    .then(ui.showEditSuccess)
    .then(() => {
      $('#edit-back-button').on('click', () => {
        $('.edit-routine-container').hide()
        $('.view-my-routines').show()
      })
    })
    .then(() => {
      $('#edit-routine').on('submit', (event) => {
        console.log('this is the event.target', event.target)
        const data = getFormFields(event.target)
        onEditRoutine($(event.target).attr('data-id'), data)
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
    .then((response) => {
      $('.delete-routine-link').on('click', (event) => {
        event.preventDefault()
        onDeleteRoutine($(event.target).attr('data-id'))
      })
    })
    .catch(ui.viewMyRoutinesFailure)
}

const addHandlers = function () {
  $('#addRoutine').on('submit', onAddRoutine)
}

module.exports = {
  addHandlers,
  onViewRoutines,
  onViewRoutine,
  filterRoutines,
  onViewMyRoutines
}
