# Step 5 - Slave nodes


### Prerequisites

By the time you come here, you should have provisioned an application and have it running correctly.

In this step we piggyback a new ECR service onto an existing application, it's load balancer, etc.  The application endpoint remains the same, but request URLs with a specified prefix will be routed to this new service.

![ecs-piggyback](https://user-images.githubusercontent.com/848697/92301349-c60b0d00-ef95-11ea-88d8-17887bb8006b.png)


### Initial Steps
If you have not previously done so, create an ECR repository to contain the Docker images for the piggyback application. You can do this using the step shown [here](https://github.com/tooltwist/aws-explorer/wiki/Manually-provisioning-a-project#step-one---create-an-ecr-repository-first-time-only), but do not proceed on to create the load balancer.


### Provisioning

This is a simple process using a Cloudformation template. Go to your [Cloudformation](https://ap-southeast-1.console.aws.amazon.com/cloudformation/home?region=ap-southeast-1#/stacks) stacks page. Select `Create stack -> with new resources (standard)`. Copy in the URL of the template below and press _Next_ then enter the fields as discussed below.

The values for environment `EEEEEE`, prefix `PPP`, and application `AAAAAA` _must_ be the same as when the environment and project were created. After filling in the fields as described below, skip through the remaining pages. No additional input is required unless specifically mentioned.




#### Template
`https://s3-ap-southeast-1.amazonaws.com/tooltwist.aws-explorer.templates.2020-09-02/91.extra.cf`

To use this template, you must have created your application using the 2020-09-02 or later templates.

#### Fields


|Field|Description|
|-----|-----------|
| Stack Name | EEEEEE-AAAAASSS-SSSSS  (e.g. 'test-acme-api2') |
| Prefix | PPP- (e.g. 'v1-')|
| Environment Name | EEEEEE (e.g. test) |
| Application Name | AAAAA (e.g. acme) |
| Suffix | Suffix to distinguish this extra service |
| DockerImageRepository | our ECR repo (e.g. tooltwist-acme) |
| Version | Our initial seed version ('initial') |
| Desired count | start with 1 |
| Memory | 256 for NodeJS, more for Java |
| Port | Ask the development team (usually 3000 or 4000) |
| Rule Number | Next in sequence for Load Balancer rules (default = 1) |
| Path | Which URLs get sent to this service (e.g. /api2) |
| Healthcheck path | (e.g. /api2/healthcheck) |
| Name | Environment name (e.g. IS_API2_SERVER) - ***Do NOT define JUICE_CONFIG here*** |



Select _I acknowledge that AWS CloudFormation might create IAM resources_ on the final page and press _Create Stack_.


#### What this creates

1x Target Group

1x Rule from existing listener to new Target Group

1x Service

1x Task Definition

