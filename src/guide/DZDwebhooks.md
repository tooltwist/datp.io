
# Web hooks

## Introduction
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

## The client-side handler
To receive events from your application, your client must set up a publicly accessible HTTPS endpoint that meets the following criteria:

- Has a valid domain name (IP addresses are disallowed, except during devlopement).
- Listens to HTTPS requests on port 443.
- Has a valid HTTPS certificate signed by a trusted Certificate Authority - CA (self-signed or expired certificates are not accepted).
- Does not include any query arguments in the URL.

For example:

`https://webhooks.example.com/balance-change` is a valid URL.

`http://webhooks.example.com:8080/hook.php?type=balance` is not valid.

`http://123.123.123.123/balance-change` is not valid.

Their system must respond with a 2xx-series HTTP status code. If this "success" response is not received by DATP, it will consider the delivery attempt as having failed and will later try to resend the message. DATP will attempt to redeliver messages at increasing intervals over a configurable time period. The MONDAT admin console can be used to monitor outstanding and
failed webhooks.



### Webhook events
The body of the webhook POST sent to your clilent's server will contain the following
fields, in this order:

| Field | Description |  
| :--- | :--- |
| eventType | Either `complete` or `progressReport`. |  
| metadata | As returned by the transaction status request. |  
| progressReport | As returned by the transaction status request. |  
| data | As returned by the transaction status request. |  
| eventTime | The time the transaction completed, or the time the progress report was updated. |
| deliveryTime | When the webhook was delivered. If delivery attempts fail this will be updated for each repeat attempt. |
| signature | An RSA-HSA256 signature (see below). |  

### Example event
The following is an example of the JSON sent to a webhook:

```json
{
  "eventType": "txstatus",
  "metadata": {
    "owner": "acme",
    "txId": "tx-31e3dee003b3dbf28fa24d2e1175a1bc4d545792",
    "externalId": "BU123456za12",
    "status": "success",
    "sequenceOfUpdate": 48,
    "completionTime": null,
    "lastUpdated": "2022-03-14T05:35:50.000Z"
  },
  "progressReport": {},
  "data": {
    "some": "value",
    "someOther": "stuff"
  },
  "eventTime": "2022-03-14T13:35:50.153Z",
  "deliveryTime": "2022-03-14T13:35:50.170Z",
  "signature": "c4VgJDl1RDmoh4pjTbEYgVcl3EueP1PG/I7......fs3tLk5S+Cmfw2wYP77zWeK2JEDGTo2Y="
}
```



### Test notifications
You will probably want to provide a means for your clients to test their webhook endpoints.

The best way to do this is to provide a "No operation" API that calls a transaction/pipeline
that delays a few seconds, then randomly returns either success or failure.

Using curl, your client can call the API and then watch for the webhook reply.


## Signatures
To protect against the risk of hackers using a webhook endpoint to
spoof transaction completion and updates, DATP cryptographically signs all
webhook. Signatures are generated using an RSA key and SHA256 digest of the message body.

Every webhook request is signed, and your client should verify that any request they
handle was actually sent by your application and has not been forged or tampered with.
They should not process any requests with signatures that fail verification. ***Make sure they
take this requirement seriously***, even though the event object received in the webhook
is unencypted.

The signature is based on the JSON representation of the event object that is received in the
POST, but with the signature removed. Note that the order of properties in the event object
is important, because it influences the JSON equivalent of the object and henace the signature.

> Tip: Do not change the order of the fields in the received event object, or the signature verification will fail.


### Verifying the signature
The following is example NodeJS code to verify the webhook contents.


```js
import crypto from 'crypto' // Or use require('crypto')

// Replace this with your application's public key.
const publicKey = `
-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC4agNCTr61adzLxO0FYv3uB3uU
xxxxxxxxxxxxxxxxxxxxxxxxWeFxQ/G9M29C2H+Plqnub1966kXAif9FvqEygeC
fZcMVprQZV8BZm0890t+vaHKpc/wNP6D0vxxxxxxxxxxxxxxxxxBLPmi5V5V/Knh
qJEKPp+5pwAZCQaBfwIDAQAB
-----END PUBLIC KEY-----`

// Express.js example route (assuming bodyParser is used)
app.post('/webhook', async (req, res) => {

  // Verify the payload via it's signature
  const payload = req.body

  // Remove the signature from the payload
  const signature = payload.signature
  delete payload.signature

  // Convert to JSON
  // Important note: Do NOT change the order of the properties.
  const json = JSON.stringify(payload)

  // Verify that the signature is valid
  const verifierObject = crypto.createVerify("RSA-SHA256")
  verifierObject.update(json)
  const verified = verifierObject.verify(
    {
      key: publicKey,
      padding: crypto.constants.RSA_PKCS1_PSS_PADDING
    },
    signature,
    'base64'
  )
  console.info("\n\n=> Is signature ok?: %s", verified);

  // If the signature is wrong, log the error and return a non-2XX status
  if (!verified) {

    // Log this error - it may be a hack attempt.
    sock.sendStatus({ error: 'Webhook failed signature verification - hack attempt?'})
    res.status(401).json({ status: 'Unauthorized' })
  }

  // Do something with the transaction status or progress report.
  ...

  // Return a status of 2xx, so DATP knows the webhook was received successfully.
  res.status(200).json({ status: 'ok'})
})
```
