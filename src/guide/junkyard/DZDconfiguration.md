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
    "name": "master",
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
    "logDestination": "db",
    "deltaDestination": "db",
  },
  "db": {
    "host": "localhost",
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

## datp.name
Name of the current executable.

## datp.description


## datp.protocol
(default https)

The protocol MONDAT should use to access DATP endpoints.

## datp.host
e.g. localhost

The domain name MONDAT should use to access DATP endpoints.

## datp.port
e.g. 4000

The HTTP port that MONDAT should use to access DATP endpoints.

<!--
#### midiSupported
boolean (default=false)
If this is enabled the MONDAT will have the ability to use a music
midi controller to control loads applied while running load testing.
This requires that the 
-->

## datp.nodeGroup
String (default="master")

When you divide your application into multiple types of DATP node, this value is used to group instances of each node type.

```json
"datp": {
  "nodeGroup": "master"
}
```


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

## datp.statePersistanceInterval
(default=15 seconds)  

DATP normally stores transaction _state_ in REDIS, but if it is not accessed for a long time it is assumed the transaction has been put to sleep for an extended
period, and the state will be persisted to long term storage.

The `statePersistanceInterval` is the minimum number of seconds until
DATP schedules the state to be moved to this long term storage.

## datp.logDestination
`db` | `datadog` | `none`

This defines where DATP will write log entries.

During development it's easiest to write logs to the database using the `db` option, where they can easily be viewed or cleared out using PhpMyadin.

`Datadog` is a fast alternative to the database for production
environments.

The `none` option is useful during performance testing, to determine
which part of system load is caused by the logging.


## datp.deltaDestination
`db` | `dynamodb` | `none`

This defines where DATP will write it's transaction journal entries ("deltas").

During development it's easiest to write deltas to the database using the `db` option, where they can easily be viewed or cleared out using PhpMyadin.

`DynamoDB` is a fast alternative to the database for production
environments, and provides fallback transaction state information in
case of a database failure.

The `none` option is useful during performance testing, to determine
which part of system load is caused by saving transaction deltas.


## db.host
Domain name for DATP's database.

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

