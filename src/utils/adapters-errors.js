const { ConnectionError, AxiosError } = require('./errors-types')
const { ServerNotResponse, ModelError } = require('./errors-types')

const adapterConnectionError = (message, error) => { 
    const { message: reason } = error
    if(reason) throw new ConnectionError(`${message}: ${reason}}`)
    const setError = new ConnectionError(message)
    new Promise((resolve, reject) => reject(setError)).
    catch(error => console.log(error.name, error.message))
}

const adapterAxiosError = (error) => {
    const {response}=error
    const {statusText,status}=response
    const setError = new AxiosError(statusText,status)
    new Promise((resolve, reject) => reject(setError)).
    catch(error => console.log(error.name, error.status))
}

const adapterServerNotResponse = (error) => { 
    const { message } = error
    const setError = new ServerNotResponse(message)
    new Promise((resolve, reject) => reject(setError)).
    catch(error => console.log(error.name, error.message))
}

const adapterModelError = (error) => {
    const { message } = error
    const setError = new ModelError(message)
    new Promise((resolve, reject) => reject(setError)).
    catch(error => console.log(error.name, error.message))
}

module.exports = {
    adapterConnectionError,
    adapterAxiosError,
    adapterServerNotResponse,
    adapterModelError
}