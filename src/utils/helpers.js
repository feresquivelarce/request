const { DataTypes } = require("sequelize");
const { adapterAxiosError } = require("./adapters-errors");
const { JSON, INTEGER, STRING } = DataTypes;

const printError = (error) => {
  const { message } = error;
  console.error(message);
};

const createRequestOptions = (parameters) => {
  const {
    method,
    headers,
    url,
    responseType,
    data,
    params,
    maxContentLength,
    maxBodyLength,
  } = parameters;
  if (!url) adapterAxiosError("URL can not be undefined");
  const opt = {
    method: method || "GET",
    headers: headers || { "content-type": "application/json" },
    url: bindUrlParameters(parameters),
    responseType: responseType || "json",
    data: data || null,
    params: params || null,
    ...parameters,
  };
  if (maxContentLength && maxBodyLength) {
    opt.maxContentLength = maxContentLength;
    opt.maxBodyLength = maxBodyLength;
  }

  return opt;
};

const bindUrlParameters = (parameters) => {
  let { url, params } = parameters;
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      url = url.replace(`:${key}`, value);
    }
  }
  return url;
};
const attributes = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: INTEGER,
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
};

const optionsTesting = {
  url: "https://60300165a1e9d20017af15f2.mockapi.io/posts",
  falseUrl: "https://run.mocky.io/v3/f0895465-1e5b-43aa-8c5a-0badec7662ce",
  mock: {
    id: 1,
    createdAt: "2021-02-19T02:19:50.782Z",
    name: "Ansel Schultz",
    avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/yehudab/128.jpg",
  },
  retriesAndLog: {
    retries: 3,
    log: true,
  },
};

module.exports = {
  printError,
  createRequestOptions,
  attributes,
  optionsTesting,
};
