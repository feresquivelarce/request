const sendError = (message, status) => {
    const statusCode = {
      status: status || 500,
    }
    throw new StandardError(message, statusCode)
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


module.exports = { sendError, createRequestOptions }