# Step

As you customize your DATP application, you implement new steps by
defining a class that overrides the `Step` object.

Your class represents a _type_ of step, not an actual _instance_ of a step
being run in a pipeline. At the time your `invoke` and `rollback` functions are
called, they will be provided an `instance` parameter that represents the
specific step _instance_ for which the function is being run.

The following is an example of a javascript module that implements a step.

```js
class ExampleStep extends Step {

  constructor(definition) {
    super(definition)
    this.someValue = definition.someValue
  }

  /**
   * This function is called to run this step. The step instance parameter
   * provides the context of the transaction and also convenience functions.
   * @param {StepInstance} instance
   */
  async invoke(instance) {
    ...
  }

  /**
   * This function is called to undo whatever was previously done by the invoke function. * The step instance parameter provides the context of the transaction and also
   * the convenience functions.
   * If a rollback is not possible, or no rollback is required do not implement this
   * function. If an error occurs during a rollback,
   * @param {StepInstance} instance
   */
  async rollback(instance) {
    ...
  }
}

/**
 * This function is called to register this as an available step type.
 */
async function register() {
  await StepTypes.register(myDef, 'example/exampleStep', 'Example step')
}//- register


/**
 *
 * @param {Object} definition Object created from the JSON definition of the step in the pipeline.
 * @returns New step instance
 */
async function factory(definition) {
  const rec = new ExampleStep(definition)
  return rec
}//- factory


const myDef = {
  register,
  factory,
}
export default myDef
```


Note that there are two functions external to the class that are returned by the
Javascript module.

- The `register` function, which will be called by your application statup code
  to register this step type. It can then be used in pipelines.
- The `factory` function, used by DATP to instantiate your step's class when it
  is required by a pipeline. Note that the pipeline passes a definition to this
  factory, so not all instances of this step type will be the same. You
  can write your step to perform however you like, based upon the definition
  it receives.

<!--
  When it is time to run the step, the pipeline will call the 'invoke'
 * function. When the step has completed running, it should call the
 * instance.finish function, including the completion status.
 *
 * For long running options, the invoke function may return before the
 * step has completed, but some other part of your server will need to later
 * tell the Scheduler that the step has completed. See ZZZZ for more information.
-->



##   constructor

- **Arguments:**

  - `{object} definition`

- **Usage:**

  This is a standard class constructor. The `definition` parameter comes from the
  JSON definition for the step, in the pipeline definition. As mentioned above, it
  is entirely up to you what the definition should contain, and what your step will
  do with that definition.

  The constructor must first pass the definition to the constructor of the
  Step superclass, using `super(definition)`. Once that is done it should store
  away any values in the definition that will be used by the `invoke` and `rollback`
  functions.

  :::tip
  We recommend using [private class variables](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Private_class_fields), which from ES16 are variables prefixed with a hash.
  :::

- **Example:**

The definition in the pipeline:
```json
{
  message: 'Good morning',
  amount: 123.45,
}
```

The constructor in your step class:

```js
import Step from "../Step"
import StepTypes from '../StepTypeRegister'

class MyFavoriteStep extends Step {
  #message
  #amount

  constructor(definition) {
    super(definition)
    this.#message = definition.message
    this.#amount = definition.amount
  }
  ...
}
```

- **See also:** [Components](../guide/component-basics.html)




## invoke

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






## rollback

- **Usage:**

The `rollback` function needs to undo any significant changes made when
invoke was called. It gets called if a step further down the pipeline from this
step fails, requiring that DATP back out every step that has already completed.

The instance parameter provides the context of the transaction and also
convenience functions.

- **Example:**

```js
  async rollback(instance) {

    // Write something to the transaction logbook
    const stepId = instance.getStepid()
    instance.log(instance.DEBUG, `MyFavoriteStep rolling back [${stepId}]`)

    // Get the data input to the step
    const data = instance.getDataAsObject()

    // Remove the credit added to the account during 'invoke'
    instance.log(instance.DEBUG, `Reversing credit of ${this.#amount} to account ${data.accountNo}`)
    await creditAccount(data.accountNo,  -data.amount)

    // Finish up
    instance.log(instance.DEBUG, `MyFavoriteStep roll back complete [${stepId}]`)
    const note = '...'
    return await instance.rolledBack(note, data)
  }
```

- **See also:** [Application Config](./DZDstepInstance.html)





## register

- **Returns:**

  - `{Promise<void>}`

- **Usage:**

  You provide a `register` function that registers your step class with DATP.

  Then, in your application startup code you call the registration function to make
  your custom step type available to pipelines.

  > Note that this function is not a class function. It is a function exported by your
  > Javascript module, that will be called by you in your server startup code.

- **Example:**

MyFavoriteStep.js:
```js
class MyFavoriteStep extends Step {
  ...
}

async function register() {
  await StepTypes.register(myDef, 'me/myStep', 'My favorite step')
}//- register

const myDef = {
  register,
  factory,
}
export default myDef
```


app.js:
```js
import MyFavoriteStep from `steps/MyFavoriteStep`
...

await MyStep.register()

```



## factory

- **Arguments:**

  - `{Object} definition` An object representation of the JSON data defining
    this step in the pipeline definition.

- **Returns:**

  - `{Promise<void>}`

- **Usage:**

  Your factory function instantiates and returns your step class.

  > Note that this function is not a class function. It is a function exported by your
  > Javascript module, that will be called by you in your server startup code.

- **Example:**

MyStep.js:
```js
async function factory(definition) {
  return new MyFavoriteStep(definition)
}
```

