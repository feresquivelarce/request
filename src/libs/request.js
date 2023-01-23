const axios = require("axios");
const { adapterAxiosError } = require("../utils/adapters-errors");
const { createRequestOptions } = require("../utils/helpers");

/**
 * Promise function based on HTTP client
 * @async
 * @function Request
 * @param {object} params - Object
 * @property {string}  params.method - Default GET
 * @property {object}  params.headers - Default { content-type: application/json }
 * @property {string}  params.url - Required
 * @property {string}  params.responseType - Default json
 * @property {object}  params.data - Default null
 * @property {throwError}  params.throwError - Default false
 * @return {array} The data from the URL.
 */
const Request = async (params) => {
  try {
    const opt = createRequestOptions(params);

    const response = await axios(opt);
    const { data } = response;
    return data;
  } catch (error) {
    //se agrega parametro para responder con erro en caso de que falle
    let data = {};

    // Se añade validación para cuando no se logra conectar al server
    if (error.code === "ECONNREFUSED") {
      data = { message: `${error.code} ${error.address}`, status: 500 };
    }
    // Se añade validación para internal server error
    if (
      error.response &&
      error.response.statusText === "Internal Server Error"
    ) {
      data = {
        message: error.response.data.message,
        status: error.response.status,
        statusCode: error.response.status,
      };
    }
    // Retorna el resto de errores posibles
    const { response } = error;
    data = response.data;
    adapterAxiosError(error);
    if (params && params.throwError) {
      const errorData = new Error(data.message, data);
      errorData.statusCode = data.statusCode;
      errorData.status = response.status;
      errorData.errors = data.errors;
      throw errorData;
    }
    return data;
  }
};

/**
 * Promise function based on HTTP client
 * @async
 * @function Request
 * @param {object} params - Object
 * @property {string}  params.method - Default GET
 * @property {object}  params.headers - Default { content-type: application/json }
 * @property {string}  params.url - Required
 * @property {string}  params.responseType - Default json
 * @property {object}  params.data - Default null
 * @property {throwError}  params.throwError - Default false
 * @return {array} JSON with Data and Headers from the URL.
 */
const RequestWithHeader = async (params) => {
  try {
    const opt = createRequestOptions(params);

    const response = await axios(opt);
    const { data, headers } = response;
    return { data, headers };
  } catch (error) {
    //se agrega parametro para responder con erro en caso de que falle
    let data = {};

    // Se añade validación para cuando no se logra conectar al server
    if (error.code === "ECONNREFUSED") {
      data = { message: `${error.code} ${error.address}`, status: 500 };
    }
    // Se añade validación para internal server error
    if (
      error.response &&
      error.response.statusText === "Internal Server Error"
    ) {
      data = {
        message: error.response.data.message,
        status: error.response.status,
        statusCode: error.response.status,
      };
    }
    // Retorna el resto de errores posibles
    const { response } = error;
    data = response.data;
    adapterAxiosError(error);
    if (params && params.throwError) {
      const errorData = new Error(data.message, data);
      errorData.statusCode = data.statusCode;
      errorData.status = response.status;
      errorData.errors = data.errors;
      throw errorData;
    }
    return data;
  }
};

module.exports = { Request, RequestWithHeader };
