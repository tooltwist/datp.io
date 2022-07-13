# Reply converters

DATP transactions are specifically started by your application.

Typically an application route receives the API request from your client, and
passes control over to DATP. From that point on, DATP looks after running the
transaction and sending status back to the client.

In this flow, your application has the ability to modify the message received
by the client, before it is passed to DATP. There is no need for the client
request to conform to the DATP message conventions.

A _reply converter_ gives you an opportunity to similarly modify the reply
sent back to the client. If the DATP format is appropriate, it is easiest to
just let DATP reply in
it's default format. If you wish to return a different type of message, then
the reply converter gives you the ability to massage all output sent to the
client in polling replies or webho.


```javascript
function myReplyConverter(txSummary) {
  txSummary.metadata.hello = 'world'
  return { httpStatus: 201, reply: txSummary }
}
DATP.registerReplyConverter(myReplyConverter)
```

Input to the converter is the standard DATP transaction status object, containing
`metadata`, `data`, and `progressReport`.
The reply converter decides what the send to the client, and provides a status for
use if the replying to a status polling request.

:::tip
Once registered, your reply converter will be used to translate the reply of all DATP transactions.

A typical first step is to check `txSummary.metadata.transactionType` and then
convert data as required for the transaction type. If no conversion is required you can simply
return txSummary with status code 200.
:::