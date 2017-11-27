'use strict'

const config = require('../config.js')
const store = require('../store.js')

const create = function (data) {
  console.log('got to Ajax request')
  return $.ajax({
    url: config.apiOrigin + 'routines',
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: data
    // contentType: false,
    // processData: false
  })
}

const index = function () {
  return $.ajax({
    url: config.apiOrigin + 'routines',
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

module.exports = {
  create,
  index
}
