# Throttling

## Rate Control
DATP's [Throttling](https://en.wikipedia.org/w/index.php?title=Throttling_process_(computing)&redirect=no) is a mechanism by which we can reduce the rate of processing
specific transaction types. Most commonly this is desired to reduce the load on
an external system, such as a third party API with limited capacity.

The way we do this in DATP is to place the pipelines requiring thottling
in their own node group, so they'll have their own queue.
We can then control the rate at which those transactions are
processed by restricting the number of nodes and workers in that node group.

In the simplest use case, this mechanism can be used to provide
overload protection for the backend API. After appropriate load testing
you can set-and-forget the number of workers, knowing that
"X workers can handle Y transactions per minute".

## Backend Outage

In a more extreme case we can shut down all the worker threads and
completely stop processing of certain pipelines.
This can provide a fast on/off switch, to prevent our application
attempting to call, and getting errors,
from a backend system that we know has gone down.

Instead, when there are no active workers, the jobs in the event
queue will stack up, and processed in sequence will resume once we start up the
workers again.

:::warning
The fact that you using this mechanism will need to be taken into account
as you design and provision your system. This requires appropriate business
analysis and resource planning to ensure you do not overload queues when the
workers are shut down, or the node group or back end when the system comes back up.
:::

The advantages of this approach are:

1. Our transactions are delayed, but do eventually run once the backend comes back up.
1. The backend is not "harassed" by us continually retrying the same transactions.

This second factor is especially important if the backend outage was actually _caused_ by overloading. In that case the last thing we want to do is bombard the backend with retry attempts.

## Progressive recovery
When a backend system comes back up, it is common that all systems that were
attempting to use the backend will attempt to complete all the tasks that backed up
when while the system was down. For example, all the transactions that backed up
over the past hour can be dumped on the backend, all at once.

A common situation is that a system comes up, and is immediately overwhelmed and crashes again.

To prevent this, we can gradually increase the number of worker threads, to
progressively ramp up the load. Other applications may not be as polite to
the backend, but a DATP application can be.

## Automated Throttling
Automating the handling of backend outages will always be highly application specific.
The first task is to create a monitoring process that will determine when the
backend system in unavailable.

In your monitoring process, and also in pipeline steps, you will need to distinguish
between normal backend errors, and backend availability problems.
Your monitor will also need to make judgement call on whether the problem is
a glitch, such as a momentary network issue, or a full-on system outage.

If your monitoring process can reliably determine this information, then
it can use the DATP API to raise or lower the number of workers in the
relevant node group. If that determination cannot be accurately made then
a manual approach may be necessary, where the admistrator uses the MONDAT dashboard
to shutdown workers.

## Short term outages
As mentioned previously, it is also important that steps are able to differentiate
between between application errors and backend outages.
The throttling mechanisms described here will not kick in instantaniously, so
in the meantime the steps need to address availability problems themselves.

The best solution is that when a step believes the backend is unavailable,
it goes to sleep and retries a short time later (See the section on [sleeping](http://localhost:8080/guide/DZDsleeping.html#waiting-for-a-duration).
After the sleep interval, the DATP background process will add the event for
the step back on the queue.

:::warning
Be aware that unlike queuing, this sleep-and-retry will not guarantee that
transactions are processed in the order they are received.
If this poses a problem in your instance, then your step will need to fail
and return an application error.
:::

