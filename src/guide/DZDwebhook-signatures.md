# Signatures
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


## Verifying the signature
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
