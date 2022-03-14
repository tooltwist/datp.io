# Introduction

<!--
::: tip NOTE
Already know Vue 2 and just want to learn about what's new in Vue 3? Check out the [Migration Guide](/guide/migration/introduction.html)!
:::
-->

## What is DATP?

**DATP** (pronounced _"Dat Pee"_) is an acronym for **Distributed**, **Asynchronous**, **Transaction**, **Pipelines**.

DATP is a framework for **developing**, **running** and **monitoring** transaction based APIs.
DATP is ideally suited for creating "man in the middle" software that aggregates the functions of multiple APIs, especially
when older APIs are involved

Let's go through the individual aspects:


## Distributed
A DATP application typically runs across multiple 'nodes'.

Each node can be developed and deployed individually. Workflows can be changed on-the-fly, and multiple teams can work independantly on their
own source code, and schedule deploys without needing to sync activites or merge code with other teams. For large applications with multiple
backend integrations, this de-coupling can make the difference between success and failure as you scale up your development effort.

Another benefit of running across multiple nodes is improved internal application security, as the code
running in one node is unable to influence or access the transactions being performed in another node.
The code written by one team is entirely firewalled from the code of other teams, which constrains the potential impact of both unintentional or maliscious
code.



## Asynchronous

Modern RESTful API frameworks work wonderfully for fast API calls, where the operation of each API can be performed quickly.

Unfortunately though, they do not work well though for slow transactions, as an API that takes seconds, minutes or hours to complete
results in a terrible user experience. In most cases slow API calls will also jam up, crash, or limit the throughput of the API server.

Unlike these common API frameworks, DATP is designed from the ground up to handle "uncooperative" environments - back end
systems that are slow, operations that require approval and manual intervention before proceeding, and multi-step
transactions that encounter errors half way through their workflow.




## Transaction

In a production environment DATP provides high level monitoring and a low level audit trail of every transaction that runs through
the system. Dashboards allow administrators to watch out for and address any problems, such as outages or backend APIs being down.
For each step in the processing of a transaction, DATP records the input and output data of the step, log entries, and any
artifacts used in the processing of the step.

This level of monitoring also simplifies software development and debugging.



## Pipelines

A DATP application is created by assembling a series of _Steps_.
Steps are developed independantly, and the same step may be used in multiple pipelines to handle various types of transaction.

Steps can perform any operation, but are defined as having input data and output data. Steps can transform data, monitor the contents of transaction data,
or do something with the data.

In the finance industry, and others that are heavily regulated, the regulatory agencies often request institutions to perform
various checks and balances. When developed as reusable steps, this functionality can be slotted into existing workflows with minimal effort.

Typical steps might include:

- Checking that mandatory API input parameters are provided
- AML (Anti-money laundering) checks
- Fraud detection
- KYC (Know Your Customer) checks
- Approval processing
- Converting data formats
- Integration with external APIs
- Converting or formatting data returned by the API

Often it is difficult to anticipate all of the steps of a transactional workflow in advance. DATP allows steps to be developed and released acording to their
own development schedule, and then "Drag and Dropped" into pipelines.


<!--
If you’d like to learn more about Vue before diving in, we <a id="modal-player" class="vuemastery-trigger"  href="#">created a video</a> walking through the core principles and a sample project.
-->

<!--
<VideoLesson href="https://www.vuemastery.com/courses/intro-to-vue-3/intro-to-vue3" title="Watch a free video course on Vue Mastery">Watch a free video course on Vue Mastery</VideoLesson>

<common-vuemastery-video-modal/>
-->

## Getting Started

<p>
  <ActionLink class="primary" url="DZDinstallation.html">
    Installation
  </ActionLink>
</p>

A development environment for DATP can be downlaoded and run up in a few minutes.
This environment uses Visual Studio Code and Docker to run the application and it's database inside Docker containers,
so it can be set up in minutes without leaving residual software on your machine.



<p>
  <ActionLink class="primary" url="ZDZmondat.html">
    Mondat
  </ActionLink>
</p>
The best place to start for anyone who intends to review or use DATP is to [become familiar with Mondat](DZDmondat), our transaction monitoring dashboard.

<p>
  <ActionLink class="primary" url="ZDZmondat.html">
    Developing Steps
  </ActionLink>
</p>

::: tip
The official guide assumes intermediate level knowledge of JavaScript, Docker, Visual Studio Code, data modelling, and transactional business systems. If you are totally new to API development, it might not be the best idea to jump right into a framework as your first step - grasp the basics then come back! Prior experience with other frameworks helps, but is not required.
:::

Developers will then want to spend ten minutes running through a walkthrough where you use the Visual Source Code development environment to build and deploy a Step.

