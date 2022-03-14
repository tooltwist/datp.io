# Background
When your application invokes a transaction using DATP, the transaction is asynchronous and can take anything from milliseconds up to hours or even days to complete.

If your application's API invokes the transaction, it will usually not wait for the transaction
to complete before it returns. Your application will typically let DATP handle the API return.

By default, DATP will start the transaction and then return immediately, and the client
will need to repeatedly call the server to determine when the transaction
has completed and to get the transaction result.

### Polling
With _short polling_ the server returns the transaction status
immediately. Short polling can be used when the transaction is initiated, and also when polling
for the transaction status. Each time, the current status of the transaction is immediately
returned, without waiting.

While short polling is the default, it can be explicitly requested for clarity:

``` json
"metadata": {
    "reply": "shortpoll"
}
```

For fast running transactions _long polling_ can be used.

``` json
"metadata": {
    "reply": "longpoll"
}
```

In this case the API will not reply immediately, but will instead pause for a while in the hope
that the transaction will complete quickly and it can return the final transaction status. If the
transaction takes too long to complete the API returns a status of "running" and the client
will need to use short polling to wait for the final transaction status.

> Note: Only use long polling in situations where you have reason to
> believe that transaction completion is imminent, as long polling keeps the NodeJS
> response objects open and excessive use may impact performance or scaleability.

### Web hooks
An alternative to short and long polling, is the use of web hooks. Web hooks are essentially
the ***"Don't call us, we'll call you..."*** of API design. Rather than the client repeatedly
nagging the server, the client patiently waits for the DATP-based application to call them and
tell them that the transaction is complete.

The instruction to reply via a webhook is contained when the transaction is created:

```json
{
    "metadata": {
        "reply": "https://...........",
        "progressReports": true
    },
    "data": {
        ...
    }
}
```

In most cases, the DATP transaction will be created from within your own application, and so
it will be the responsibility of your application to provide the webhook endpoint required by the
client of your application. You may choose to have your clients specify their webhook endpoint as
part of their client profile, or you may require them to provide the endpoint as part of your
API definition.
