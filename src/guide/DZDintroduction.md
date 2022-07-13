# DATP + RESTful APIs

DATP augments a RESTful API framework
to provide additional functionality for financial and commercial applications, including:

- Asynchronous transactions.
- Long running transactions (minutes through to days).
- Reliable restart after failures.
- Throttling by transaction type.
- Transaction monitoring.
- Step-by-step audit trail.
- Reuse functionality across subsystems.
- Deploy features and updates independantly.
- Secure segregation of source code and access.


::: tip PLEASE NOTE...
**A common misconception is that DATP is intended to replace a traditional RESTful API.**

That could not be further from the truth, so let's clear that up immediately!

DATP should be used to handle APIs with transactional requirements where DATP provides an
advantage. An application will typically have numerous API calls where DATP provides
no benefit. For example lookups and enquiries, and many fast running transactions.
In these cases, you can code up those API calls with your normal traditional routes and coding
techniques, and save DATP for the nasty stuff.

:::


## Introduction
API-first development is an almost universally accepted approach for building business applications, and most software frameworks now support API development. It's hardly surprising, considering the benefits for developers and businesses, and the impact of the end user's experience. More specifically, allowing mobile apps, websites and external systems to all be able to share back end functionality and business logic.

The protocols involved haven become progressively simpler over the decades, starting with complex legacy technologies such as [RPCs](https://en.wikipedia.org/wiki/Remote_procedure_call) in the 80's, [DCE](https://en.wikipedia.org/wiki/DCE/RPC), [Corba](https://en.wikipedia.org/wiki/Common_Object_Request_Broker_Architecture) and [DCOM](https://en.wikipedia.org/wiki/Distributed_Component_Object_Model) in the 90's, simplifying down to XML and [SOAP](https://en.wikipedia.org/wiki/SOAP) in the 2000's, and more recently to [JSON](https://en.wikipedia.org/wiki/JSON) over [RESTful](https://en.wikipedia.org/wiki/Representational_state_transfer) interfaces.


## Framework Expectations

While this technical progression has been wonderful in general, the simplification of API frameworks has resulted in several common expectations for your application design.

1. Your API calls will return quickly.  
  Most API frameworks perform poorly with long running transactions (e.g. _"25ms is great, but 5 minutes is unacceptable"_)

1. Your API calls are expected to be synchronous.  
  The API call is expected to be complete and return the result in the response.

1. Transaction completion is not guaranteed.  
  Few API frameworks guarantee _"once I start, I will absolutely, definitely, finish the transaction, even with long running transactions or with server restarts."_

1. Single code base, single executable.  
  The processing of an API call will occurs within the same server, from a single code base with a monolithic application design.

1. Over-simplified error handling  
  Basic error codes and error handling are limiting in a system that
  interacts with multple backend and legacy systems.

These assumptions are a large part of why developing APIs has become easy.

But... for some application environments these assumptions are unacceptably limiting.
Large commercial applications cannot always guarantee an immediate reply to API calls, as they
may be dependant upon other systems out of their control.

Similarly, for financial transactions a higher level of guarantee is required that simply
returning an error code is something goes wrong. An audit trail is required, and a guarantee that
once a transaction starts it will either be finished, or entirely rolled back.

While it is possible for a development team to code around framework limititations, the resulting
complexity can act as a multiplier on development times, as the dev team ends up spending as much time
working on the workarounds, as on the actual business logic they were tasked to implement.


## DATP

**DATP** (pronounced _"Dat Pee"_) augments a traditional API framework, to remove the limitations mentioned above.
DATP is an acronym for _Distributed_, _Asynchronous_, _Transaction_ _Pipelines_.


### Distributed
A DATP application runs across one or more _Nodes_.

Nodes can be developed and deployed individually, and may contain different software. Workflows can be changed on-the-fly, and multiple teams can work independantly, each with a separate codebase and running on their own nodes. Deployments can be scheduled independantly, without needing to sync activites or merge code with other teams.

Running across multiple nodes improves application security, as the code running in one node is not able to influence or access transactions being performed in another node.

Also, the code written by one team is entirely firewalled from the code of other teams, which constrains the potential impact of coding errors, or malicious code.

Despite these "Chinese walls", the code from one team can seamlessly invoke transactions on other nodes written by other teams.

### Asynchronous

Modern RESTful API frameworks work wonderfully for fast API calls, where the operation of each API can be performed quickly.

Unfortunately very few work well though for slow transactions - long running API calls will limit the throughput of the server at best, and crash the server at worst.

DATP allows a restful API to pass over control of API endpoints that cannot complete quickly.
DATP will queue the transaction for processing, and ensures the API user will receive
the transaction result. The user can either poll for completion, or be notified by a webhook.

The developer does not need to write this code. DATP simplies writing software for uncooperative
environments - back ends that are slow, operations that require approval or manual intervention
before proceeding, multi-step transactions that encounter errors half way through their workflow,
and other difficult - but unfortunately common - business scenarios.




### Transaction

Financial transactions must be treated with respect, and _every_ problem must be resolved. It's not acceptable
to just return an error status back to an API user when something unexpected happens, without
rectifying transactional consistency.

DATP provides high level monitoring and a low level audit trail of every transaction that runs through the system.

Dashboards allow administrators to watch out for and address problems, such as outages or backend APIs being down.
For every step in the processing of a transaction, DATP records the input and output data of the step, and retains the log messages and artifacts for easy access.

Transaction-based monitoring simplifies everything, from software development and debugging, to resolving production issues, through to customer service, and also root cause analyses and post-incident reviews.



### Pipelines

In a DATP trransaction, the business logic is broken down into a series of _Steps_. Steps are developed independantly and then assembled into _Pipelines_. The same step may be reused in multiple pipelines.

Steps are just software, and perform any operation. They have input data and output data similar to a normal function or API call. Steps can transform data, monitor the contents of a transaction's data, connect to backend systems, or any other activity.

In the finance industry and others that are heavily regulated, government agencies request institutions to perform
various checks. With DATP new requirements can be implemented by writing a new step and inserting it into existing pipelines. Since steps are developed independantly, this approach limits the chances of having new functionality break existing code.

Typical steps might include:

- Checking that mandatory API input parameters are provided.
- AML (Anti-money laundering) checks.
- Fraud detection.
- KYC (Know Your Customer) checks.
- Approval processing.
- Converting data formats.
- Integration with external APIs.
- Converting or formatting data returned by the API.

It is sometimes difficult to anticipate all of the steps of a transactional workflow in advance. DATP allows steps to be developed and released individually, and then "Drag and Dropped" into pipelines.


<!--
If you’d like to learn more about Vue before diving in, we <a id="modal-player" class="vuemastery-trigger"  href="#">created a video</a> walking through the core principles and a sample project.
-->

<!--
<VideoLesson href="https://www.vuemastery.com/courses/intro-to-vue-3/intro-to-vue3" title="Watch a free video course on Vue Mastery">Watch a free video course on Vue Mastery</VideoLesson>

<common-vuemastery-video-modal/>
-->
