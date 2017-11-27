'use strict'

// const store = require('../store.js')
const greenNotification = require('../shared/ui').greenNotification
const redNotification = require('../shared/ui').redNotification

const addRoutineSuccess = function (data) {
  console.log('success!')
  greenNotification('Added routine successfully')
}

const addRoutineFailure = function (response) {
  console.error(response)
  redNotification('Failed to add routine')
}
module.exports = {
  addRoutineSuccess,
  addRoutineFailure
}
