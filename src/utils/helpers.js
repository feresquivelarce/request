const { DataTypes } = require('sequelize')
const { JSON, INTEGER,STRING } = DataTypes

const createError = error => {
  throw new Error(error)
}

const printError = error => {
  const { message } = error
  console.error(message)
}

const createRequestOptions = params => {
  const { method, headers, url, responseType, data } = params
  if (!url) sendError('URL can not be undefined')
  const opt = {
    method: method || 'GET',
    headers: headers || { 'content-type': 'application/json' },
    url,
    responseType: responseType || 'json',
    data: data || null,
  }
  return opt
}

const attributes = {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type:INTEGER,
    },
    data: { type: JSON },
    retries: { type: INTEGER },
    attempts: { type: INTEGER },
    status: {
      type: INTEGER,
      enum: (-1, 0, 1),
    },
    response: { type: JSON },
    error: { type: JSON },
    method: { type: STRING },
    url: { type: STRING },
}

const optionsTesting = {
  url: 'https://60300165a1e9d20017af15f2.mockapi.io/posts',
  falseUrl: 'https://run.mocky.io/v3/f0895465-1e5b-43aa-8c5a-0badec7662ce',
  mock: {
    id: 1,
    createdAt: '2021-02-19T02:19:50.782Z',
    name: 'Ansel Schultz',
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/yehudab/128.jpg',
  },
  retriesAndLog: {
    retries: 3, 
    log: true
  }
}

module.exports = { 
  createError, 
  printError,
  createRequestOptions, 
  attributes, 
  optionsTesting
}