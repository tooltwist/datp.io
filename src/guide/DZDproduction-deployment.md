# Production Deployment

The way you deploy DATP will be very site specific.
ZZZZ

## Creating the Docker image


## Directory Structure

Juice client
Every Vue application starts by creating a new **application instance** with the `createApp` function:

```js
const app = Vue.createApp({
  /* options */
})
```

```
Root Component
└─ TodoList
   ├─ TodoItem
   │  ├─ DeleteTodoButton
   │  └─ EditTodoButton
   └─ TodoListFooter
      ├─ ClearTodosButton
      └─ TodoListStatistics
```
