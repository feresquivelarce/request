const { DataTypes } = require('sequelize');
const { JSON, INTEGER,STRING } = DataTypes

const sendError = (error) => {
    throw new Error(error.message)
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

module.exports = { sendError, createRequestOptions, attributes }