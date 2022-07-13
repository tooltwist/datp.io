# DATP package

## Introduction

This is the main entrypoint of the DATP package, and contains functions and classes related to running DATP in a RESTful server:

- Prepare and run the server.
- Start transactions.
- Enquire on transaction status.
- Register your custom step types
- Convenience functions

## Starting the server
```js
import DATP, { schedulerForThisNode } from './DATP'
import { addRoute } from './DATP/extras'

async function myRoute(req, res, next) {

  // The tenant should be provided by your your credential-checking middleware.
  // Transaction type is the pipeline name.
  // When data and metadata are not defined they are taken from the request body.
  const tenant = 'acme'
  const transactionType = 'example'
  return await DATP.startTransactionRoute(req, res, next, tenant, transactionType, data=null, metadata=null) {
}

(async function main() {

  // Fire up the master DATP server.
  const server = await DATP.restifyMasterServer()

  // Add a route to the API
  addRoute(server, 'get', API_PREFIX, '/my-route', [ { versions: '1.0 - 1.0', handler: myRoute } ])

  // Enable the healthcheck route,
  // start handling requests,
  // and process DATP transactions.
  await DATP.goLive(server)
  console.log(`Node ${schedulerForThisNode.getNodeId()} is ready for use.`)

})().catch(e => {
  // Something went wrong
  console.error(e)
})
```

## Variables
### schedulerForThisNode

## Functions

### prepareForUnitTesting

DATP transactions can be run from a standalone application, without the RESTify framework or serving HTTP routes. Typically this is used for unit testing transactions.

```js

  import { schedulerForThisNode, prepareForUnitTesting, callbackRegister, pause } from './DATP'

  ...
  await prepareForUnitTesting()


  let returnedContext = null
  let returnedData = null

  // Define a custom callback
  const handlerName = `test-${NODE_GROUP}-callback-${Math.random()}`
  await CallbackRegister.register(handlerName, (context, data) => {
    returnedContext = context
    returnedData = data
  })

  // Start a transaction
  await schedulerForThisNode.startTransaction({
    metadata: {
      owner: OWNER,
      nodeGroup: NODE_GROUP,
      externalId: `extref-${Math.random()}`,
      transactionType: 'someTransaction',
      onComplete: {
        callback: handlerName,
        context: {
          foo: 'bar'
        }
      }
    },
    data: {
      instruction: 'abort'
    }
  })

  // Give the transaction time to complete
  await pause(500)

  // The callback will hopefully have set returnedContext and returnedData by now...
  if (returnedContext === null) {
    // Not complete
  } else {
    // Check the reply
  }

```

### startTransactionRoute
data=null, metadata=null)

- **Arguments:**

  - `{Object} req` The request object, passed to a Restify route.
  - `{Object} req` The response object.
  - `{Object} next` The standard 'next' function.
  - `{string} tenant`
  - `{string} transactionType` The name of the transaction / pipeline to run
  - `{Object} data`
  - `{Object} metadata`

- **Usage:**  

This is the most common way to start a transaction.
An application route passes control to this function, and DATP looks after
starting the transaction and responding to the user.

Short polling, long polling and webhooks will be handled as required.

If the data and metadata are not provided in this function call, it will
look for them in the body of the request.

### transactionStatusByTxIdRoute

- **Arguments:**

  - `{Object} req` The request object, passed to a Restify route.
  - `{Object} req` The response object.
  - `{Object} next` The standard 'next' function.

- **Usage:**  

An application route can use this function to pass control over to DATP,
which will check for `transactionId` parameter
and return the transaction status back to the user.

### transactionStatusByExternalIdRoute

- **Arguments:**

  - `{Object} req` The request object, passed to a Restify route.
  - `{Object} req` The response object.
  - `{Object} next` The standard 'next' function.

- **Usage:**
An application route can use this function to pass control over to DATP,
which will check for an`externalId` parameter
and return the appropriate transaction status back to the user.


### goLive
export async function goLive

- **Arguments:**

  - `{Object} server` The Restify server object.

### restifyMasterServer

- **Arguments:**

  - `{Object} options` Not currently used

- **Usage:**

See the [Starting the Server](./DZDDATP.html#starting-the-server) example above.







### restifySlaveServer
Prepare the Restify server as with `restifyMasterServer`, but do not register the routes used by healthchecks and MONDAT.





<!--
## class ResultReceiver
## class ResultReceiverRegister
## class Step
## StepTypesZ
-->

<!-- ## Convenience
### ConversionHandler
### FormsAndFields
### RouterStep
### dbQuery
### schedulerForThisNode



### FormsAndFields
### getTransactionResult
### goLive
### initiateTransaction

## Variables
### query: dbQuery

## Classes
### Step
### StepTypes
### ConversionHandler
See #ConversionHandler
### FormsAndFields
### RouterStep -->