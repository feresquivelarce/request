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
 * @param {object} options - Object
 * @property {object}  options.returnAttributes - Array with data to get
 * @property {throwError}  params.throwError - Default false
 * @return {array} The data and options from the URL.
 */
const Request = async (params, options = false) => {
  try {
    const opt = createRequestOptions(params);

    const response = await axios(opt);
    const { data } = response;

    if (
      options &&
      options.returnAttributes &&
      options.returnAttributes.length > 0
    ) {
      const responseObj = { data };
      options.returnAttributes.forEach(
        (attr) => (responseObj[attr] = response[attr])
      );
      return responseObj;
    }

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
    if (typeof response.data === "string") {
      data = {
        message: response.data,
        status: response.status,
        statusCode: response.status,
        errors: [response.data],
      };
    } else {
      data = response
        ? response.data
        : error && error.message && error.statusCode
        ? error
        : { message: "Error no identificado en el request", statusCode: 500 };
    }
    adapterAxiosError(error);
    if (params && params.throwError) {
      const errorData = new Error(data.message, data);
      errorData.statusCode = data.statusCode;
      errorData.status = response ? response.status : error.statusCode;
      errorData.errors =
        response && data.errors ? data.errors : error ? [error] : [];
      throw errorData;
    }
    return data;
  }
};

module.exports = Request;
