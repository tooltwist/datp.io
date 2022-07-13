# Use Cases

## Aggregator API
When writing an API that relies on other APIs or external systems you are the mercy of those backend systems. For those that run slowly, DATP's asyncronous transactions allow them to be started, monitored,and once complete your application's client will be notified.

Some business cases involve _very_ slow transactions. For example, task like scheduled data transfers, batch jobs, and KYC background checks may all take 24 hours to complete. A DATP application is not impacted by long running transactions, and is not slowed down by large numbers of outstanding transactions.

Transactions are monitored and followed through to completion despite server failures or restarts. This is a normal business case for DATP-based applications and does not require any special coding.

## Multiple Development Teams
In banking and other industries with high-security requirements, it can be an advantage if "the left hand doesn't know what the right hand is doing". More specifically, if different teams work on different parts of an Enterprise system, DATP firewalls, and reduces the opportunity for criminal or malicious activity.

DATP allows steps and pipelines to be developed independantly, and allows pipelines to a deployed as different executables, and to be
run on different nodes. This flexibility provides many options for
code segregation.

If the system integrates with multiple backends, then a different development team can build each of the integrations. Similarly, other functionality can be developed by independant teams, and deployed independantly of each other.

## Unreliable Environments
If your business application depends upon external systems or networks that are unreliable, then DATP's reliable transaction architecture will simplify retrying transactions until they succeed.
MONDAT or a custom dashboard can be created to alert administrators when a backend system or network is down.

## Multi-part Transactions
If your application uses multiple backend API calls in order to complete a transaction, you will need to know that either (a) all the API calls completed sucessfully, or (b) _none_ of the API calls completed. In any other situation your application will need to take remedial action because the transaction is in an inconsistent state.

As a simplified example, if you intend to take $100 out of Fred's account and then deposit the $100 into Mary's account, then you need to make sure that either both these actions occur, or that neither of them occur.

If the first step completed (taking $100 from Fred) but the second step cannot be performed (depositing $100 into Mary's account), then we need to roll back the first step and put the $100 back into Fred's account.

DATP has the facility to run pipelines backwards when the output of a step tells it to do so. When this happens each of the already-completed steps will be asked to do an 'undo' operation.

Depending upon business constraints and the backend APIs in use, this might be possible programatically, or it might involve notifying the appropriate person that manual intervention is required. No matter the approach, DATP will invoke your application steps and monitor the transaction through to sucessful resolution.
