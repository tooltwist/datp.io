# DATP/extras

Convenience functions, useful when using DATP.

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
import { addRoute } from './DATP/extras'

// Standard Restify compatible route
function getWalletBalanceV1(req, res, next) {
  res.send(...)
  next()
}

// Start the DATP server
const server = await DATP.restifyMasterServer()

// Add my customer routes
const prefix = 'myapp'
addRoute(server, 'get', myApp, '/wallet/balance', [
  { versions: '1.0 - 1.4', handler: getWalletBalanceV1 },
  { versions: '2.0 - 2.9', handler: getWalletBalanceV2 },
])

```
