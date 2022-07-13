# Progress Reports
Transactions in DATP can run for very long periods of time, and may
involve multiple steps. *Progress Reports* are a way to keep your API client
informed about the status of the transaction.

A progress report is any simple object that you provide, that will be returned
in the next status enquiry by the client.

There's not much point providing a progress report for a transactoin that is about to
complete, so the most common scenario is that a progress report is specified
immediately prior the the step going to sleep for a while.


```javascript


class MyStep extends Step {
    ...
    async invoke(instance) {

        if (...) {
            await instance.progressReport({
                // Any user defined message...
                message: 'Stage 1 completed',
                ...
            })
            return await instance.retryLater(...)
        }
        ...
        return await instance.succeeded('Transaction completed', output)
    }
}
```

#### Example transaction status:

```json
{
  "metadata": {
    "owner": "acme",
    "txId": "tx-38328af134fbcc5558f5b030f2d909da5268403a",
    "externalId": null,
    "transactionType": "example.sleeper",
    "status": "sleeping",
    "sequenceOfUpdate": 12,
    ...
  },
  "progressReport": {
    "message": "Stage 1 completed".
    ...
  }
}

```

The progress report will be returned each time the client polls for the transaction status. Setting a new progress report replaces any previous progress report.
The progress gets cleared out when the transaction completes.

The `sequenceOfUpdate` value increments progressively as the transaction proceeds.
While it's value does not correspond exactly to the number of steps that have been run,
or anything else,
if it's value increases with subsequent status polling then you know further processing has occurred. For example, the step might have been retried and put itself
back to sleep again.

#### Example transaction input:

If the client wishes to receive progress reports with a webhook, then in addition
to providing the webhook details, you can set `progressReports` in the
request metadata.

```json
{
    "metadata": {
        ...
        "reply": "https://...........",
        "progressReports": true
    },
    "data": {
        ...
    }
}
```



