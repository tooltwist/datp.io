# DATP

This is the main entrypoint of the DATP module, and contains functions to

- Register your custom step types
- Start the DATP server (master or slave)
- Convenience functions


## addRoute

- **Arguments:**

  - `{StepInstance} instance` Details of the step instance being run
  - `{Object} server` Restify server
  - `{String} operation` get, put, post, del
  - `{String} urlPrefix`
  - `{String} path`
  - `{Object[]} versionFunctionMapping`


- **Usage:**

The `addRoute` function allows you to add your own version-specific routes
to the DATP server.

- **Example:**

The following will add a route for GET /myapp/:version/wallet/balance.

```js
import DATP from './DATP'

// Standard Restify compatible route
function getWalletBalanceV1(req, res, next) {
  res.send(...)
  next()
}

// Start the DATP server
const server = await DATP.restifyMasterServer()

// Add my customer routes
const prefix = 'myapp'
DATP.addRoute(server, 'get', myApp, '/wallet/balance', [
  { versions: '1.0 - 1.4', handler: getWalletBalanceV1 },
  { versions: '2.0 - 2.9', handler: getWalletBalanceV2 },
])

```

- **See also:** [Application Config](./DZDstepInstance.html)








## ConversionHandler
## FormsAndFields
## getTransactionResult
## goLive
## initiateTransaction
## query: dbQuery


## restifyMasterServer

- **Arguments:**

  - `{Object} options` Not currently used

- **Usage:**

ZZZThe `invoke` function performs that actual functionality of the step. The
instance parameter provides the context of the transaction and also
convenience functions.

- **Example:**

```js
  async invoke(instance) {

    // Write something to the transaction logbook
    const stepId = instance.getStepId()
    instance.log(instance.DEBUG, `MyFavoriteStep invoked [${stepId}]`)

    // Get the data input to the step
    const data = instance.getDataAsObject()

    // Do something, using the data and details from the definition
    const greeting = this.#message
    data.newMessage = `${greeting} ${data.firstName}`

    // Add credit to an account
    instance.log(instance.DEBUG, `Crediting ${this.#amount} to account ${data.accountNo}`)
    await creditAccount(data.accountNo, this.#amount)

    // Time to complete the step and send a result
    const note = ''
    instance.log(instance.DEBUG, `MyFavoriteStep complete [${stepId}]`)
    return await instance.succeeded(note, data)
  }
```

- **See also:** [Application Config](./DZDstepInstance.html)







## restifySlaveServer

- **Arguments:**

  - `{StepInstance} instance` Details of the step instance being run

- **Usage:**

The `invoke` function performs that actual functionality of the step. The
instance parameter provides the context of the transaction and also
convenience functions.

- **Example:**

```js
  async invoke(instance) {

    // Write something to the transaction logbook
    const stepId = instance.getStepId()
    instance.log(instance.DEBUG, `MyFavoriteStep invoked [${stepId}]`)

    // Get the data input to the step
    const data = instance.getDataAsObject()

    // Do something, using the data and details from the definition
    const greeting = this.#message
    data.newMessage = `${greeting} ${data.firstName}`

    // Add credit to an account
    instance.log(instance.DEBUG, `Crediting ${this.#amount} to account ${data.accountNo}`)
    await creditAccount(data.accountNo, this.#amount)

    // Time to complete the step and send a result
    const note = ''
    instance.log(instance.DEBUG, `MyFavoriteStep complete [${stepId}]`)
    return await instance.succeeded(note, data)
  }
```

- **See also:** [Application Config](./DZDstepInstance.html)







## ResultReceiver
## ResultReceiverRegister
## Step
## StepTypes









