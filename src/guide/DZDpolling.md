# Polling
When your application invokes a transaction using DATP, the transaction is asynchronous and can take anything from milliseconds up to hours or even days to complete.

If your application's API invokes the transaction, it will usually not wait for the transaction
to complete before it returns. Your application will typically let DATP handle the API return.

By default, DATP will start the transaction and then return immediately, and the client
will need to repeatedly call the server to determine when the transaction
has completed and to get the transaction result.

## Short polling
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

## Long polling
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
