const { DataTypes } = require('sequelize');
const StandardError = require('standard-error')
const { JSON, INTEGER } = DataTypes

const sendError = (message, status) => {
    const statusCode = {
      status: status || 500,
    }
    // throw new StandardError(message, statusCode)
    throw new Error(message, statusCode)
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
    params: { type: JSON },
    retries: { type: INTEGER },
    attempts: { type: INTEGER },
    status: {
      type: INTEGER,
      enum: (-1, 0, 1),
    },
    response: { type: JSON },
    error: { type: JSON }
}

module.exports = { sendError, createRequestOptions, attributes }