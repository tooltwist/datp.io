# Webhook handlers
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



## Webhook events
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

## Example event
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



## Test notifications
You will probably want to provide a means for your clients to test their webhook endpoints.

The best way to do this is to provide a "No operation" API that calls a transaction/pipeline
that delays a few seconds, then randomly returns either success or failure.

Using curl, your client can call the API and then watch for the webhook reply.
