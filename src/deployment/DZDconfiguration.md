# Configuration

DATP is configured using a JSON file, which is accessed using
Tooltwist's juice-client package. This npm package allows an
environment to specify where to access the configuration.

- during development, the config is usually stored in a JSON
  file on the file system.

- if deployed on AWS the config is JSON stored in AWS Secrets Manager.

It's common to store your application configuration variables in this same config file.

If you have multiple node groups you will need one configuration
definition for each node group. All nodes within the node group will
use the same definition.

## Example

```json
{
  "datp": {
    "description": "Master DATP node",
    "protocol": "http",
    "host": "localhost",
    "port": 4000,
    "midiSupported": false,
    "nodeGroup": "master",
    "webhook-credentials": {
      "publicKey": "-----BEGIN PUBLIC KEY-----\n....\n-----END PUBLIC KEY-----\n",
      "privateKey": "-----BEGIN PRIVATE KEY-----\n....\n-----END PRIVATE KEY-----\n"
    },
    "statePersistanceInterval": 15,
    "logDestination": "datadog",
    "deltaDestination": "none",
    "keepAliveTimeout": 65000,
    "headersTimeout": 66000
  },
  "datadog": {
    "apikey": ".....",
    "appkey": "....."
  },
  "db": {
    "host": "localhost",
    "writeHost": "localhost",
    "port": 3306,
    "user": "root",
    "password": "",
    "database": "datp_master"
  },
  "redis": {
    "host": "localhost",
    "port": 6379,
    "user": "harry",
    "password": "xyz"
  },

  // Application specific configuration
  "myApp": {
    "name": "value"
  }
}
```

## datp.deltaDestination
`db` | `dynamodb` | `none`

This defines where DATP will write it's transaction journal entries ("deltas").

In most applications this can be set to `none` to reduce processing overhead. It is only
required where micro-level tracking of the transaction state is required. For example,
you might turn it on for just the node where a specific type of transaction is processed.

During development it can be beneficial to write deltas to the database using the `db` option,
where they can easily be viewed or cleared out using PhpMyadin.

`DynamoDB` is a fast alternative to the database for production
environments, and provides fallback transaction state information in
case of a database failure.

Also, the `none` option is useful during performance testing, to determine
which part of system load is caused by saving transaction deltas.


## datp.description
A string to describe this node group.


<!--
#### midiSupported
boolean (default=false)
If this is enabled the MONDAT will have the ability to use a music
midi controller to control loads applied while running load testing.
This requires that the 
-->

## datp.development
ZZZZZ


## datp.headersTimeout
(default=66000)  
This is related to `keepAliveTimeout`. To prevent the reported 502 errors, this value must be longer than `keepAliveTimeout`, which
must be longer than the timeout of your AWS ALB.

## datp.host
e.g. localhost

The domain name MONDAT should use to access DATP endpoints.

## datp.keepAliveTimeout
(default=65000)  
This value is used to configure Node to not shut down socket of the API endpoint within the specified number of milliseconds.
We've added this to provide a workaround for a bug that causes Express, Restify and some other frameworks to
occassionally return 502 errors under load, when behind an AWS load balancer.

For more details and a full description of the problem, see [Dealing with Intermittent 502's between an AWS ALB and Express Web Server
](https://adamcrowder.net/posts/node-express-api-and-aws-alb-502).

To prevent these errors make sure `keepAliveTimeout` is greater than the AWS timeout for the ALB (Application Load Balancer).

## datp.logDestination
`db` | `datadog` | `none`

This defines where DATP will write log entries.

During development it's easiest to write logs to the database using the `db` option, where they can easily be viewed or cleared out using PhpMyadin.

`Datadog` is a fast alternative to the database for production
environments.

The `none` option is useful during performance testing, to determine
which part of system load is caused by the logging.

## datp.logHealthcheck
`true`|`false`  
When true, each call to the healthcheck URL will be logged to the console.
This is useful to isolate errors when debugging errors with a load balancer or AWS target group.

## datp.maxWebhookAttempts
(default=5)  
This value specifies how many times DATP will attempt to call the webhook for a transaction before giving up.

## datp.name
(deprecated)  
Name of the current node.

## datp.nodeGroup
String (default="master")

When you divide your application into multiple types of DATP node, this value is used to group instances of each node type.

```json
"datp": {
  "nodeGroup": "master"
}
```


## datp.port
e.g. 4000

The HTTP port that MONDAT should use to access DATP endpoints.

## datp.protocol
(default https)
The protocol MONDAT should use to access DATP endpoints.

## datp.serveMondat
(default=false)  
If true the API server will also act as the website hosting MONDAT.
This requires that the MONDAT server be generated into the `dist` directory.

## datp.serveMondatApi
(default=false)  
When true, the server will enable the API endpoints used by MONDAT. Note that this is
different to `datp.serveMondat`, which causes the server to serve up the MONDAT clint/website.

## datp.statePersistanceInterval
(default=15 seconds)  

DATP normally stores transaction _state_ in REDIS, but if it is not accessed for a long time it is assumed the transaction has been put to sleep for an extended
period, and the state will be persisted to long term storage.

The `statePersistanceInterval` is the minimum number of seconds until
DATP schedules the state to be moved to this long term storage.

## datp.webhook-credentials
When DATP calls a client's webhook to notify the status of a transaction, the result is signed with a digital signature. This section of the config file defines the credentials to sign and check
those signatures.

See [./DZDwebhook-background.html]! for details.
See the [Web Hooks](./DZDwebhook-background.html#web-hooks) section for details.

```json
  "datp": {
    "webhook-credentials": {
      "publicKey": "-----BEGIN PUBLIC KEY-----\n....\n-----END PUBLIC KEY-----\n",
      "privateKey": "-----BEGIN PRIVATE KEY-----\n....\n-----END PRIVATE KEY-----\n"
    },
    ...
  }
```

## datadog.apikey
The APIKey provided by Datadog. Only required if you are logging to Datadog.

## datadog.appkey
The Application Key provided by Datadog. Only required if you are logging to Datadog.


## db.host
Domain name for reading from the DATP database.

## db.writeHost
The endpoint for writing to the DATP database.

## db.port
(default=3306)

Port for DATP's database endpoint.

## db.user
Database user name.

## db.password
Database password.

## db.database
(default=datp_master)

The name of the database used by this DATP node group.

## db.connectionLimit
(default=10)

This is the maximum number of connections in each connnection pool for the DATP database. Note that
there are two connection pools - one for reading and one for writing - so DATP will ultimately use double this
number of connections.

When specifying this value consider the number of nodes you will have running, across all node groups, and ensure you
do not exceed the maximum number of connections allowed by the database.

## redis.host
(default=localhost)

Domain name of the REDIS endpoint.

## redis.port
(default=6379)

Port of the REDIS endpoint.

## redis.username
(default=null)

User name used to access REDIS.

## redis.password
(default=null)

Password used to access REDIS.

