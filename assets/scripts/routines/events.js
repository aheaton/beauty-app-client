'use strict'

const getFormFields = require(`../../../lib/get-form-fields`)

const api = require('./api')
const ui = require('./ui')

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

const addHandlers = function () {
  $('#addRoutine').on('submit', onAddRoutine)
}

module.exports = {
  addHandlers
}
