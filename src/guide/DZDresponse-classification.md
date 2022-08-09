# Response Classifications

## Purpose
One of the motivations for using DATP is it's ability to more cleanly handle
communications to unreliable backend systems.

1. Retry a transaction step later if a backend is down.
1. Queue transactions and stop processing the queue if a backend is down.

For this to work, it's obviously necessary to be able to determine if a
backend is down. That's what this module does.

There can be many ways to make such a determination. For example...

- if an API call to the backend times out.
- if the API call returns a certain HTTP status code.
- if a field in the response contains a certain value.

This module allows a list of rules to be used to make this judgement
call, such that the application code does no need to do so itself.
Instead, the response to a backend API call is passed to the following
function, and it will decide if the API call was sucessful, or resulted in
an error, or whether the backend system simply was not available.

```javascript
async function responseClassifier(rules, timedOut, status, data)
```

The rules are as described below. Pass true for `timedOut` if the API call
timed out. For example, an axios call that returns ECONNABORTED. The `status`
and `data` are as returned by the API call. Depending upon your application,
the general usage is something like this:

```javascript
async function callBackendAPI(url, options) {
  try {

    // Happy (successful) path
    const response = await axios.get(url, options)
    const { classification, subClassification, status, data } = await responseClassifier(rules, false, response.status, response.data)
    return  { classification, subClassification, status, data, response }

  } catch (e) {
    if (e.code === 'ECONNABORTED') {

      // Timeout error
      return await responseClassifier(rules, true, 599, e.response.data)
    } else {

      // Some other error
      const status = (e.response && e.response.status) ? e.response.status : 500
      const data = (e.response && e.response.data) ? e.response.data : { }
      return await responseClassifier(rules, false, status, data)
    }
  }
}
```

::: tip
To save effort, use the convenience functions defined below.
:::

## Rules
Typically the rules will be stored in a JSON file, a database table, or in a configuration
store such as AWS Secrets Manager. The objective is to keep them separate to the application
code so they can be updated without modifying application code.

::: tip
It is not uncommon for the load balancer, server framework, or backend API code to have a
variety of responses that indicate a backend is offline. Sometimes these are
poorly documented, or documented in a way that it is hard to collect all the relevant
responses ahead of time.

While you should attempt to do the analysis ahead of coding, some may sneak through and
not be recognised. By keeping the rules seperate to your code you'll be able to add
new rules easily, without coding, if new responses are found when the backend goes down.
:::



## How it works
We check an API's response in the following order:

1. Did it timeout?
2. Check rules for status code and data values, looking for the first match.
3. Look for rules that override our default classification.
4. Use our default classification (0 to 399 is okay, 400 and upwards is an error)

The following is a typical set of rules:

```javascript
[
  // Timeout rule
  { type: RESPONSE_RULE_TIMEOUT, classification: RESPONSE_CLASSIFICATION_OFFLINE },

  // Status rules
  { type: RESPONSE_RULE_STATUS, value: 200, classification: RESPONSE_CLASSIFICATION_OK },
  { type: RESPONSE_RULE_STATUS, value: 4XX, classification: RESPONSE_CLASSIFICATION_ERROR },
  { type: RESPONSE_RULE_STATUS, value: '5*', classification: RESPONSE_CLASSIFICATION_ERROR },

  // Check value in API response
  { type: RESPONSE_RULE_VALUE, field: 'update_code', value: 'TC', classification: RESPONSE_CLASSIFICATION_OK },
  { type: RESPONSE_RULE_VALUE, field: 'tx.status', value: 'NA', classification: RESPONSE_CLASSIFICATION_OFFLINE },
  { type: RESPONSE_RULE_VALUE, field: 'tx.status', value: 'FAIL', classification: RESPONSE_CLASSIFICATION_ERROR },

  // Default classification
  { type: RESPONSE_RULE_DEFAULT, classification: RESPONSE_CLASSIFICATION_ERROR }
]
```

### Defining a timeout rule
Normally you will consider a timeout to be either an offline backend, or else an error.

```javascript
{ type: RESPONSE_RULE_TIMEOUT, classification: RESPONSE_CLASSIFICATION_OFFLINE },
// or
{ type: RESPONSE_RULE_TIMEOUT, classification: RESPONSE_CLASSIFICATION_ERROR },
```

### Rules for status codes
We can match against the HTTP status code returned by the API either with it's specific number (e.g. 201),
or with a range (e.g. 2XX), or with a prefix (e.g. 5*).

```javascript
  { type: RESPONSE_RULE_STATUS, value: 201, classification: RESPONSE_CLASSIFICATION_OK },
  { type: RESPONSE_RULE_STATUS, value: 4XX, classification: RESPONSE_CLASSIFICATION_ERROR },
  { type: RESPONSE_RULE_STATUS, value: '5*', classification: RESPONSE_CLASSIFICATION_ERROR },
```

### Rules for data values
With this option, we dig into the data returned by the API call. It is assumed that JSON was returned
and it is being passed to us as an object. We can match against string and numeric values, which can
be either top level properties of the object, or nested within the response object.

```javascript
  { type: RESPONSE_RULE_VALUE, field: 'shoe_size', value: '6', classification: RESPONSE_CLASSIFICATION_OK },
  { type: RESPONSE_RULE_VALUE, field: 'shoe_size', value: '7', classification: RESPONSE_CLASSIFICATION_OK },
  { type: RESPONSE_RULE_VALUE, field: 'shoe_size', value: '8', classification: RESPONSE_CLASSIFICATION_OK },
  { type: RESPONSE_RULE_VALUE, field: 'shoe_size', value: '9', classification: RESPONSE_CLASSIFICATION_OK },
  { type: RESPONSE_RULE_VALUE, field: 'firstname', value: 'Fred', classification: RESPONSE_CLASSIFICATION_ERROR },
  { type: RESPONSE_RULE_VALUE, field: 'address.zipcode', value: '12345', classification: RESPONSE_CLASSIFICATION_ERROR },
  { type: RESPONSE_RULE_VALUE, field: 'error_code', value: 'RETRY', classification: RESPONSE_CLASSIFICATION_OFFLINE },
```


::: warning
This functionality does not try to match against arrays in the response object. If a backend API is
returning complex data structures that need to be interpreted, it should be handled
by specific application code.
:::

### Providing default rules
By default we assume that a timeout, or status codes below 400 are successful API calls, and all other
responses are an error. If you wish you can override it with specific rules as described above, or
you can provide a blanket rule if none of your specified rules is matched.

In this example, we consider any API response that does not return a status of 201 to be an error.

```javascript
  { type: RESPONSE_RULE_STATUS, value: 201, classification: RESPONSE_CLASSIFICATION_OK },
  { type: RESPONSE_RULE_DEFAULT, classification: RESPONSE_CLASSIFICATION_ERROR }
```

::: warning
We don't allow the default rule to assume the backend is offline, as this could result
in situations where transactions repeatedly retry, when the backend is not in fact offline.
:::

## Custom Classifications
If you wish to classify API responses beyond the base OK, ERROR, and OFFLINE classifications,
you can define your own custom classifications. You can also provide sub-classifications in
your rules, and they will be returned as-is if the rule is matched.

```javascript
const rules = [
  { type: RESPONSE_RULE_DEFAULT, classification: 'BADLUCK', subClassification: 'Request matched no rule' }
]
...
const { classification, subClassification } = await responseClassifier(rules, timedOut, status, data)
console.log(classification) // BADLUCK
console.log(subClassification) // Request matched no rule
```


## Convenience Functions
To simplify coding this module provides equivalents of the main axios functions, with the exception that
a final rules parameter is also passed.


|Axios function|Convenience function|
|-----|-----------|
| axios.get | axiosGET |
| axios.post | axiosPOST |
| axios.put | axiosPUT |
| axios.delete | axiosDELETE |


### Example
```javascript
import {
  axiosGET,
  axiosPOST,
  RESPONSE_CLASSIFICATION_OK,
  RESPONSE_CLASSIFICATION_ERROR,
  RESPONSE_CLASSIFICATION_OFFLINE } from '../../DATP/responseClassifier'

...

const url = ...
const options = { ... } // Standard axios options
const { classification, status, data, response } = await axiosGET(url, options, rules)
switch (classification) {
  case RESPONSE_CLASSIFICATION_OFFLINE:
    // Retry the transaction later..
    break
  case RESPONSE_CLASSIFICATION_ERROR:
    // The transaction failed..
    break
  case RESPONSE_CLASSIFICATION_OK:
    // The transaction succeeded..
    break
}

...

const url = ...
const options = { ... } // Standard axios options
const requestData = { ... }
const { classification, status, data, response } = await axiosPOST(url, options, requestData, rules)
...

```