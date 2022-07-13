# class StepInstance

Most of the step functions receive a **StepInstance** parameter, which provides the context of the step being run, and also gives access to various functions related
to the step being run.

The step's `invoke` and `rollback` functions use this 'instance' object to
interact wih the DATP infrastructure:

- the get the input data
- to perform logging and provide an audit trail.
- to return the status when the step finishes.

The following functions are used to perform these actions.


## aborted

  - `{Object} note`
  - `{Object|String} output`

- **Returns:**

  - `{Promise} no return value`

- **Usage:**

  Finish the step, with status `Step.ABORTED`

  Call this when the step was unable to complete its purpose, and the pipeline
  must not proceed. An aborted pipeline will NOT try to rollback previously completed
  steps. The output can be used to report details of the error.

  > Note: it is essential that you `return await instance.aborted(...)` so
  the function has a chance to complete, and so you return without further processing.

- **Example:**

```js
  async invoke(instance) {
    ...
    if (some backend error) {
      return await instance.aborted(`Could not contact ACME API`, null)
    }
    ...
  }
```

- **See also:** [Components](../guide/step-basics.html)



## badDefinition

  - `{Object} note`
  - `{Object|String} output`

- **Returns:**

  - `{Promise} no return value`

- **Usage:**

  This function should be used when a step encounters a definition it does not
  understand, or that is missing required information.

- **Example:**

```js
class CustomStep extends Step {
  #definition

  constructor(definition) {
    super(definition)
    this.#definition = definition
  }

  async invoke(instance) {
    if (typeof(this.#definition.costCode) === 'undefined') {
      return await instance.badDefinition(`Missing parameter [codeCode]`, null)
    }
    if (this.#definition.sleepTime < 100) {
      return await instance.badDefinition(`Sleep time must be greater than 100ms [sleepTime]`, null)
    }
    // All okay, proceed on...
    ...
  }
  ...
}
```

- **See also:** [Components](../guide/step-basics.html)



## debug

- **Arguments:**

  - `{String, String, ...} message`
  - `{String} source (Optional)`

- **Usage:**

  Write a debug-level log message to the log of the current step.
  This function takes an arbitrary number of arguments.

  The 'source' argument is not normally provided and defaults to
  Transaction.LOG_SOURCE_INVOKE or Transaction.LOG_SOURCE_ROLLBACK depending upon
  whether the pipeline is currently progressing forward or rolling back.

- **Example:**

```js
  async invoke(instance) {
    ...
    instance.debug('value=', value)
  }
```

- **See also:** [Components](../guide/step-basics.html)





## error

- **Arguments:**

  - `{String, String, ...} message`
  - `{String} source (Optional)`

- **Usage:**

  Write an error-level log message to the log of the current step.
  This function takes an arbitrary number of arguments.

  The 'source' argument is not normally provided and defaults to
  Transaction.LOG_SOURCE_INVOKE or Transaction.LOG_SOURCE_ROLLBACK depending upon
  whether the pipeline is currently progressing forward or rolling back.

- **Example:**

```js
  async invoke(instance) {
    ...
    instance.error('value=', value)
  }
```

- **See also:** [Components](../guide/step-basics.html)






## exceptionInStep

- **Arguments:**

  - `{String} message`
  - `{Error} error`

- **Returns:**

  - `{Promise} no return value`

- **Usage:**

  Finish the step, with status `Step.EXCEPTION`

  This function is called when a logic error occurs while a step is processing. This
  could be an exception in your user code, or a system error throwing an exception.
  This function is not always called by user code - it will also be called by the
  pipeline to handle uncaught exceptions within the user code.

  DATP treats exceptions as an unrecoverable error. It does not know what might have
  been completed, or whether to continue on to the next step or to rollback previous
  steps. Consequently it treats exceptions as an abort, that will require
  investigation and possible manual correction of the transaction.

  > Note: it is essential that you `return await instance.exceptionInStep(...)` so
  the function has a chance to complete, and so you return without further processing.

- **Example:**

The following three cases will all result in a step exception, with the step
(and pipeline) being aborted.

```js
  async invoke(instance) {

    // Case 1 - Explicitly specify the step exception status.
    try {
      ...
    } catch (e) {

      const msg = `Exception while ....`
      await instance.log(msg, e)
      return await instance.exceptionInStep(msg, e)
    }

    // Case 2 - DATP catches a throw exception
    throw new Error("I don't like Mondays")

    // Case 3 - DATP catches an unintended exception
    const a = null
    const b = a.unknown // "Invalid property of undefined" exception
  }
```



## failed

  - `{Object} note`
  - `{Object|String} output`

- **Returns:**

  - `{Promise} no return value`

- **Usage:**

  Finish the step, with status `Step.FAILED`

  Call this when the step was unable to complete its purpose, and the pipeline
  must not proceed. The pipeline will then try to rollback previously completed
  steps. The output can be used to report details of the error.

  > Note: it is essential that you `return await instance.failed(...)` so
  the function has a chance to complete, and so you return without further processing.

- **Example:**

```js
  async invoke(instance) {
    ...
    if (some backend error) {
      return await instance.failed(`Could not contact ACME API`, null)
    }
    ...
  }
```

- **See also:** [Components](../guide/step-basics.html)




## getDataAsJson

- **Returns:**

  - The input data for the current step, as a JSON string

- **Usage:**

  Every step has input and output, and the input may be accessed as
  JSON or as a Javascript object. This function returns the input data as JSON.

  :::tip
  If your application code does not need to modify the input data but wishes
  to view it and JSON is acceptable, it is preferable to use this function over `getDataAsObject` and avoid the overhead of parsing the data.
  :::

- **Example:**

```js
  async invoke(instance) {
    const json = instance.getDataAsJson()
    ...
    instance.succeeded('Greetings!', json)
  }
```

- **See also:** [Components](../guide/step-basics.html)

<!--
## getMetadata

- **Returns:**

  - The transactionID for the current step

- **Usage:**

  Register or retrieve a global component. Registration also automatically sets the component's `name` with the given `name` parameter.

- **Example:**

```js
  async invoke(instance) {
    const transactionID = instance.getTransactionId()
    ...
  }
```

- **See also:** [Components](../guide/step-basics.html)
-->

## getDataAsObject

- **Returns:**

  - The input data for the current step, as a javascript object

- **Usage:**

  Every step has input and output, and the input may be accessed as
  JSON or as a Javascript object. This function returns the input data as an object.
  Your application code can modify this object and pass it to its output.

  Note that as a security measure data is converted to JSON and back between
  steps, to ensure that only data can pass between steps.

- **Example:**

```js
  async invoke(instance) {
    const data = instance.getDataAsObject()

    // Case 1 - This will pass to the next step
    data.foo = 'bar'

    // This function will NOT pass to the next step
    data.nasty1 = () => { }

    // This dangerous getter/setter will NOT pass to the next step
    data.nasty2 = {
      get: { ... },
      set: { ... }
    }
    ...
    instance.succeeded('Greetings!', data)
  }
```

- **See also:** [Components](../guide/step-basics.html)



## getLevel

- **Returns:**

  - The current level of nesting

- **Usage:**

  A transaction invokes a pipeline step (level 0) which invokes an
  application step (level 1) which may invoke another pipeline (level 2),
  and so on.

  The level may be useful for indenting messages to the console while debugging.

- **Example:**

```js
  async invoke(instance) {
    const level = instance.getLevel()
    // 2
    ...
  }
```

- **See also:** [Components](../guide/step-basics.html)





## getMetadata

- **Returns:**

  - The metadata for the current transaction

- **Usage:**

  Each transaction contains data of two types.
  The metadata contains information related to the processing of the transaction,
  that is not actually data of the transaction. For example, details of the current user,
  and the type of polling for the transaction's reply.

- **Example:**

```js
  async invoke(instance) {
    const metadata = instance.getMetadata()
    // {
      tenant: 'acme',

    }
    ...
  }
```

- **See also:** [Components](../guide/step-basics.html)




## getNodeGroup

- **Returns:**

  - {String} The node group of the current step.

- **Example:**

```js
  async invoke(instance) {
    const nodeGroup = instance.getNodeGroup()
    // 'master'
    ...
  }
```

- **See also:** [Components](../guide/step-basics.html)




## getNodeId

- **Returns:**

  - {String} The ID of the node where this step is running.

- **Usage:**

  Each pipeline runs on a node, and the nodes are grouped in "node groups".
  The nodes in a group all run the same code and feed from the same transaction
  queue, to provide scaling and redundancy.

  The node ID identifies a specific instance of a node.

- **Example:**

```js
  async invoke(instance) {
    const nodeId = instance.getNodeId()
    // node-070f86ffec01bfbff98847dc59d1cbc8a71f564d
    ...
  }
```

- **See also:** [Components](../guide/step-basics.html)



## getStepId

- **Returns:**

  - {String} Get the step ID of the current step

- **Example:**

```js
  async invoke(instance) {
    const stepID = instance.getStepId()
    // step-070f86ffec01bfbff98847dc59d1cbc8a71f564d
    ...
  }
```

- **See also:** [Components](../guide/step-basics.html)



## getStepObject

- **Returns:**

  - {Object} The currently running step (step, not step instance)

- **Usage:**

  This is isn't typically required in user code, as the step already knows who it is.

- **Example:**

```js
  async invoke(instance) {
    const me = instance.getStepObject()
    // me === this
    ...
  }
```

- **See also:** [Components](../guide/step-basics.html)



## getStepType

- **Returns:**

  - {String} The type of the current step

- **Usage:**

  This is isn't typically required in user code, as the step actually registers
  it's own name.

- **Example:**

```js
  async invoke(instance) {
    const myType = instance.getStepType()
    // my.exampleStep
    ...
  }
```

- **See also:** [Components](../guide/step-basics.html)



## getSwitch

  - `{String} name`

- **Returns:**

  - {String} The value of the named switch.

- **Usage:**

  Each transaction can have 'switches' set.
  Each switch has a name and a value, and for simlicity sake the value is typically true or false.
  The values of switches can be set from routes, steps, or other places, and
  are typically watched by steps waiting for some event to occur.

  For example, a pipeline might start a transaction on a backend system, and then go to sleep
  until the backend uses a web hook to notify that it has completed processing.\

  The 'instance.retryLater' method can be used to put a step alseep, while it waits for a switch to be set.

- **Example:**

```js
  async invoke(instance) {

    const value = await instance.getSwitch('processing-finished')
    // false
    if (!value) {
      instance.progressReport({ status: 'Waiting for backend processing to complete'})
      return await instance.retryLater('processing-finished')
    }
    ...
    // Back end processing is finished - e.g. a webhook route set the switch
  }
```

- **See also:** [Components](../guide/step-basics.html)




## getTxData

- **Returns:**

  - The data for the current transaction

- **Usage:**

  Each transaction contains data of two types.
  The metadata contains information related to the processing of the transaction,
  that is not actually data of the transaction, and then there is the actual
  transaction data.

- **Example:**

```js
  async invoke(instance) {
    const txData = instance.getTxData()
    // {
    //    amount: '123.45,
    //    recipient: 'Fred Smith',
    //    accountNumber: '123456789012',
    // }
    ...
  }
```

- **See also:** [Components](../guide/step-basics.html)






## getTxId

- **Returns:**

  - {String} The transactionID for the current step.

- **Example:**

```js
  async invoke(instance) {
    const transactionID = instance.getTxId()
    // tx-49f4a7c5f2cf72581922de30ac69c60aa3ea2d3f
    ...
  }
```

- **See also:** [Components](../guide/step-basics.html)






## progressReport

  - `{Object|String} report`

- **Returns:**

  - {Promise} No return value

- **Usage:**

  Call this function when you are about to put a step to sleep using 'retryLater()'
  and the value you provide will be returned in status requests from the client.

  This allows a client application to get information about how a transaction is
  progressing.

  As an example, a KYC transaction can take an extended period of time, escpecially
  if it contains manual steps, and the transaction may enter a waiting mode (sleeping)
  several times and it proceeds through the workflow. Using the 'progressReport'
  function, status requests from the API client can receive updates along the way.

- **Example:**

```js
  async invoke(instance) {

    const value = await instance.getSwitch('processing-finished')
    // false
    if (!value) {
      instance.progressReport({ status: 'Waiting for backend processing to complete'})
      return await instance.retryLater('processing-finished')
    }
    ...
    // Back end processing is finished - e.g. a webhook route set the switch
  }
```

- **See also:** [Components](../guide/step-basics.html)







## retryLater

  - `{String} Name of switch (Optional)`
  - `{Number} Sleep time in seconds (Optional)`

- **Returns:**

  - {Promise} No return value

- **Usage:**

  Calling this function will put the current step and pipline to sleep until either
  the named switch changes value, of the specified duration passes. At that time, the
  current step will start again.

  A value metadata.sleepCounter can be used to determine how many times the step
  has been run.

  It is important to remember that the step may be called many times, so make sure you
  do not perform any operations where duplicates are not acceptable in the code above
  where you check whether you want to retry.


  > Note: it is essential that you `return await instance.retryLater(...)` so
  the function has a chance to complete, and you return without further processing.

- **Example:**


```js
  async invoke(instance) {

    // Call the backend to see if it has finished doing something.
    const reply = await axios.get(url, {...})
    if (reply.data.status !== 'complete') {
      instance.progressReport({ status: 'Waiting for backend processing to complete'})
      return await instance.retryLater(null, 60) // wait a minute and check again
    }
    ...
    // Back end processing is finished - e.g. a webhook route set the switch
  }
```
- **See also:** [Components](../guide/step-basics.html)






## succeeded

  - `{Object} note`
  - `{Object|String} output`

- **Returns:**

  - {Promise} No return value

- **Usage:**

  Call this function when your invoke function completes sucessfully. The pipeline
  will proceed
  on to the next step or, if this was the final step in the pipeline, the pipline
  will complete with it's own success status.

  If `data` is null the input of the step will be used as it's output.


  > Note: it is essential that you `return await instance.succeeded(...)` so
  the function has a chance to complete, and so you return without further processing.

- **Example:**

```js
  async invoke(instance) {
    const data = instance.getDataAsObject()
    data.foo = bar
    ...
    return await instance.success('Successful completion', data)
  }
```

- **See also:** [Components](../guide/step-basics.html)





## trace

- **Arguments:**

  - `{String, String, ...} message`
  - `{String} source (Optional)`

- **Usage:**

  Write a trace-level log message to the log of the current step.
  This function takes an arbitrary number of arguments.

  The 'source' argument is not normally provided and defaults to
  Transaction.LOG_SOURCE_INVOKE or Transaction.LOG_SOURCE_ROLLBACK depending upon
  whether the pipeline is currently progressing forward or rolling back.

- **Example:**

```js
  async invoke(instance) {
    ...
    instance.trace('value=', value)
  }
```

- **See also:** [Components](../guide/step-basics.html)





## warning

- **Arguments:**

  - `{String, String, ...} message`
  - `{String} source (Optional)`

- **Usage:**

  Write a warning-level log message to the log of the current step.
  This function takes an arbitrary number of arguments.

  The 'source' argument is not normally provided and defaults to
  Transaction.LOG_SOURCE_INVOKE or Transaction.LOG_SOURCE_ROLLBACK depending upon
  whether the pipeline is currently progressing forward or rolling back.

- **Example:**

```js
  async invoke(instance) {
    ...
    instance.warning('value=', value)
  }
```

- **See also:** [Components](../guide/step-basics.html)


