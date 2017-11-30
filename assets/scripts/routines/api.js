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

const show = function (id) {
  return $.ajax({
    url: config.apiOrigin + 'routines/' + id,
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const update = function (id, data) {
  console.log('id passed into edit', id)
  return $.ajax({
    url: config.apiOrigin + 'routines/' + id,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data
  })
}

const destroy = function (id) {
  return $.ajax({
    url: config.apiOrigin + 'routines/' + id,
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

module.exports = {
  create,
  index,
  show,
  update,
  destroy
}
