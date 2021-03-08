# Request

#### Request library based on HTTP promise for SOIN

This repo/package exports 3 libraries: 

`Request`: It's a simple and lightweight library based on HTTP Promise queries used as a function, ready to use anywhere.

`RequestTracking`: It's a complex library based on HTTP Promise queries used as a Class, it's required to instance and pass a Sequelize object before to use

`RequestScheduler`: It's another library used to retrieve fetch the HTTP queries inside in the table WebRequestLogs, it's required to instance and pass a Sequelize object before to use

### How to use it?

#### Request

```js
const Request = require('@soinlabs/request')
const response = await Request({ params })
- Where
   *  params - Object
   *  {string}  params.method - Default GET
   *  {object}  params.headers - Default { content-type: application/json }
   *  {string}  params.url - Required
   *  {string}  params.responseType - Default json
   *  {object}  params.data - Default null
	 *  {array} 	return response - the data from the URL.
```

#### RequestTracking

Insert the next SQL script in the database need it:

```sql
-- WebRequestLogs definition
CREATE TABLE `WebRequestLogs` (`id` INTEGER PRIMARY KEY AUTOINCREMENT, `data` JSON, `retries` INTEGER, `attempts` INTEGER, `status` INTEGER, `response` JSON, `error` JSON, `method` VARCHAR(255), `url` VARCHAR(255), `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL);
```

Add the model in package/model or whatever place where is it the Squeeze models/objects

```js
module.exports = (sequelize, DataTypes) => {
  const WebRequestLog = sequelize.define(
    'WebRequestLog',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      data: { type: JSON },
      retries: { type: DataTypes.INTEGER },
      attempts: { type: DataTypes.INTEGER },
      status: {
        type: DataTypes.INTEGER,
        enum: (-1, 0, 1),
      },
      response: { type: JSON },
      error: { type: JSON },
      method: { type: DataTypes.STRING },
      url: { type: DataTypes.STRING },
    },
    {
      tableName: 'WebRequestLogs'
    }
  )
  return WebRequestLog
}
```

And finally, the implementation of RequestTracking

```js
const RequestTracking = require('@soinlabs/request-tracking')
const { WebRequestLog } = require('models/WebRequestLog')

const request = new RequestTracking(WebRequestLog)
const response = await request.RequestTracking({ params })
- Where
   *  params - Object
   *  {string}  params.method - Default GET
   *  {object}  params.headers - Default { content-type: application/json }
   *  {string}  params.url - Required
   *  {string}  params.responseType - Default json
   *  {object}  params.data - Default null
   *  {number}  params.retries - Default null
   *  {boolean} params.log - Default null
	 *  {array} 	return response - the data from the URL.
```

#### RequestScheduler

Implemente `RequestScheduler` in cronjobs or scheduler logic

```js
const RequestScheduler = require('@soinlabs/ibs/request-scheduler')
const { WebRequestLog } = require('models/WebRequestLog')
await requestScheduler.start(limit)
- Where
*  {number} limit - Default 10
```

