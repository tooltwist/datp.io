# Deployment on AWS

Our recommendation is that you follow the AWS best practices, to ensure maximum
security, scaleability and reliability.


We typically deploy using AWS ECS (Elastic Container Service), using Fargate servers,
while separating into progressive deeper security levels using private subnets.
We strongly discourage allowing _any_ form of direct access to the application from
the public Internet - not even with whitelisted IP addresses - and by preference use
[AWS Session Manager](https://aws.amazon.com/blogs/infrastructure-and-automation/toward-a-bastion-less-world/).

<!--
<div style="padding: 10px 25px 30px"><img src="/datp-images/aws-deployment.png" alt="AWS Deployment" style="width: 690px; border-radius: 3px; box-shadow: 0 10px 15px rgb(0 0 0 / 50%)"></div>
-->
<div style="padding: 20px 5px 30px"><img src="/datp-images/aws-deployment.png" alt="AWS Deployment" style="width: 720px; border-radius: 3px"></div>



## Scripted Provisioning

We recommend provisioning your infrastruacture using [Cloudformation](https://aws.amazon.com/cloudformation/) or [Terraform](https://www.terraform.io/).
Below we walk through using set of generic
Cloudformation scripts to provision your system, but feel free to modify these scripts or use
equivalent Terraform scripts instead.

:::tip
The following section assumes a thorough understanding of AWS and Cloudformation.
If you are not familiar with these AWS services, now would be a good time to explore the AWS leaning materials and tutorials.
:::

In the following sections, we provision in several stages:
1. Create the environment (Network, ECS Cluster, etc)
2. Create the database
3. Add a DATP node to the cluster (Load balancer, ECS service, etc)
4. Provide a configuration for the node.


## Step 1 - Environment


#### What we'll be Creating
An environment is an Amazon ECS Cluster running inside a Virtual Private Cloud, compartmentalised into separate sub nets and security groups across multiple availability zones. The ECS Hosts and the services they run are not exposed to the public Internet, and can only be accessed via one of jump boxes this environment sets up. For extra security, the jump boxes should be shut down when not in use.

The environment does not provide a database by default, but it does provision the subnets and a security group for any databases (e.g. Aurora) or caches (e.g. REDIS) you will later add to the environment. In a non-production environment you will typically add one database instance, with internal databases assigned for each project you deploy in the environment.


#### Before you start
Before you can begin, you will need to choose a name for your environment (not too long!) and also take note of the ***prefix*** you will use. This will prefereably be one to three characters (e.g. 'x-').

#### Provisioning

There are three stages of provisioning an environment, each utilising it's own Cloudformation template. These three steps could be combined into a single Cloudformation template, but are kept separate to make it easy to customise a particular aspect of the set up. Feel free to download and modify these templates to create your own customisation. Typical tweaks involve adjustments to use Fargate and Kubernetes.

Go though the following steps. For each you will need to go to your [Cloudformation](https://ap-southeast-1.console.aws.amazon.com/cloudformation/home?region=ap-southeast-1#/stacks) stacks page. Select `Create stack -> with new resources (standard)`. Copy in the URL of the template below and press _Next_ then enter the fields as discussed below.

After filling in the fields as described below, skip through the remaining pages, where no input is required unless specifically mentioned.


In the descriptions below the environment `EEEEEE` and prefix `PPP` _must_ be the same in every step.


### 1.1 - Network

##### Template
`https://s3-ap-southeast-1.amazonaws.com/tooltwist.aws-explorer.templates.2020-09-02/11.env-network.cf`

##### Fields

|Field|Description|
|-----|-----------|
| Stack Name | EEEEEE-network  (e.g. 'dev-network') |
| Contact Email | Who to call if there is a problem |
| Cost Code | This can be used to identify resources for billing purposes |
| Environment Name | EEEEEE |
| Prefix | PPP- (e.g. 'dev-')|

::: danger NOTE
Please **write down the environment name and prefix** you use, as they must be entered correctly in future steps.
Getting them wrong will cause confusingly named, unusable resources to be created.
:::

##### What this creates

1x Virtual Private Cloud (VPC)

1x Internet Gateway

2x Public subnets (One in each availability zone)

2x Private subnets (One in each availability zone)

2x NAT Gateways (One in each availability zone)

2x Route tables (One public, one private)

1x Load balancer security group

1x Application security group

1x Database security group

1x Database Subnet

1x Cache subnet (e.g. REDIS), in case your application needs it





### 1.2 - Jump Boxes
::: warning NOTE: This step is now optional
Bastion Boxes (Jumpboxes) are no longer recommended, since AWS started allowing access to instances via SSM (see [here](https://www.youtube.com/watch?v=dhPtThh-ShI) and [here](https://www.youtube.com/watch?v=-ASMtZBrx-k) for an overview). However in rare circumstances you might want them, so we'll leave the template and instructions here.
:::

#### 1.2.1 - Cloudformation Template
`https://s3-ap-southeast-1.amazonaws.com/tooltwist.aws-explorer.templates.2020-04-01/12.env-jumpboxes.cf`

#### 1.2.2 - Fields

|Field|Description|
|-----|-----------|
| Stack Name | EEEEEE-jumpboxes  (e.g. 'dev-jumpboxes') |
| Environment Name | EEEEEE |
| Instance Type | t2.nano (It's only a jumpbox) |
| Prefix | PPP- (e.g. 'v1-')|

#### 1.2.3 - What this creates

2x EC2 instances for jump boxes, in the public subnets, in each of the availability zones.









### 1.3 - ECS Cluster.
:::tip
This step can be started before step2 finishes.
:::

#### 3.1 - Create a Keypair
Before you create an environment in AWS, you will need a **keypair**.

The keypair allows you to log into the AWS server instances you create. The following steps must be completed using the AWS Dashboard. You'll create the keypair, then download and install it on your machine. Don't lose this file, or you will not be able to login to the environment you create.

In the commands below replace the `ppp` with your prefix (e.g. j-) and `eeeee` below with your environment name.
This example is for Singapore (ap-southeast-1) but feel free to change
this to [another AWS region](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-regions-availability-zones.html#concepts-available-regions).

```
  Each environment requires a master Key Pair, used to access the servers.
  1. Go to the following URL:
      https://ap-southeast-1.console.aws.amazon.com/ec2/v2/home?region=ap-southeast-1#KeyPairs:sort=keyName
  2. Create a key pair with the RSA and .pem options selected, named:
      ppp-eeeee-ap-southeast-1
  3. The keypair should be automatically downloaded to you machine, where you can install it:
      $ mv ~/Downloads/ppp-eeeee-ap-southeast-1.pem ~/.ssh
      $ chmod 600 ~/.ssh/ppp-eeeee-ap-southeast-1.pem
  4. On a Mac, also run:
      $ xattr -d com.apple.metadata:kMDItemWhereFroms ~/.ssh/ppp-eeeee-ap-southeast-1.pem
      $ xattr -d com.apple.quarantine ~/.ssh/ppp-eeeee-ap-southeast-1.pem
```


#### 1.3.2 - Run the Cloudformation Template

`https://s3-ap-southeast-1.amazonaws.com/tooltwist.aws-explorer.templates.2021-05-10/12.env-ecs-cluster.cf`


|Field|Description|
|-----|-----------|
| Stack Name | EEEEEE-cluster  (e.g. 'dev-cluster') |
| Cluster size | How many EC2 instances do you want in the cluster? If unsure start with 1 |
| Environment Name | EEEEEE |
| Instance Type | Choose an EC2 size appropriate for the environment's purpose |
| Prefix | PPP- (e.g. 'v1-')|

On the final page, select _I acknowledge that AWS CloudFormation might create IAM resources_ and create the stack.

#### 1.3.3 - What this creates

1x Role definition for the ECS services.

1x ECS Cluster

1x Autoscaling group

1x Launch Configuration






---

## Step 2 - Database
We do not provide specific instructions for setting up a database with AWS RDS, as the
needs will vary between deployments and there are many options for size, redundancy, backups, etc.

Whichever database you create, we recommend deploying production databases across multiple availability zones and ensuring you have adequate backups for your needs.

When you create the database, make sure you place it in the database security group provisioned during the environment set up above.









---
## Step 3 - The Docker image

### 3.1 - Build

####### Step 4 - Master Node

In this section we configure and start up the DATP master node inside your environment's ECS Cluster, where it will be resistant to server failures, will scale automatically,
and is accessible to the Internet via a load balancer. (You will restrict access to just your API Gateway, APIC or other gateway later)

The DATP Software will be deployed from an ECR (Elastic Container Registry) repository, and run as a Docker container in the ECS cluser.

You can choose to build the Docker image and put it into ECR manually, or you can set up a Code Pipline to do this automatically.
The normal procedure is to do this in your development environment, and deploy the same Docker image from the same ECR repository through your various stages of testing through and into production.
Using the same Docker image and repository ensures that the exact same software is used in production, as was used in all the testing stages.


In this section we set up the service, and in a later phase we optionally set up the build pipeline.

![docker-promoting-50](https://user-images.githubusercontent.com/848697/79914553-173bb980-8458-11ea-840e-55607a00b808.png)


#### Before you start
Before you can begin, you need to have an environment, and you need to know it's name and the prefix used when it was created.

In addition you will need your project built into a Docker Image. If you don't have that already, have the development team look at [[Preparing a Project for Deployment]]. There will be a step below where they load their initial Docker image into the ECR repository. More about that later...

One last thing... you do know that [[aws-explorer|Provisioning using aws-explorer]] can make provisioning easier, right?

#### Provisioning

There are three steps in provisioning a project, the second and third using Cloudformation templates.

Go though the following steps. For each you will need to go to your [Cloudformation](https://ap-southeast-1.console.aws.amazon.com/cloudformation/home?region=ap-southeast-1#/stacks) stacks page. Select `Create stack -> with new resources (standard)`. Copy in the URL of the template below and press _Next_ then enter the fields as discussed below.

After filling in the fields as described below, skip through the remaining pages. No additional input is required unless specifically mentioned.


In values for environment `EEEEEE` and prefix `PPP` _must_ be the same as when the environment was created.


### 3.2 - Create ECR Repository
:::tip
This only needs to be done the first time you deploy your DATP node, as the same repository and Docker images
should be used for development, testing, staging and production.
This how we ensure there are no accidental changes between testing and production.
:::
As discussed above, Amazon ECR (Elastic Container Repository) is a repository for your Docker images.

There will be **one** ECR repository for each project, irrespective of how many environments you deploy it to. The name of the repository should be the name of the project's repository in Github with a hyphen to replace the slash. For example, for `tooltwist/acme` you would create an ECR repository named `tooltwist-acme`.

If you already have an ECR repository for the project, go to step 2 now.


#### Template
`https://s3-ap-southeast-1.amazonaws.com/tooltwist.aws-explorer.templates.2020-09-02/21.project-ecr-image-repo.cf`


##### Fields

|Field|Description|
|-----|-----------|
| Stack Name | ecr-repositoryname  (e.g. 'ecr-tooltwist-acme') |
| Docker image repository | Repository name (e.g. tooltwist-acme) |

Once the repository is created, go to your [ECR Dashboard](https://ap-southeast-1.console.aws.amazon.com/ecr/repositories?region=ap-southeast-1), select the new repository and press the _View push commands_ button.

Before proceeding to Step 2, have the development team use these instructions to push an initial Docker image for their application to the repository. Have them tag this image as ***initial*** (not latest, as in the instructions).

In the future we will use a build pipeline to create the Docker images for this project, but to get the first deployment working we need to 'seed' the ECR repository with an initial version. (It's a "chicken or egg came first" sort of problem).



### 3.3 - Push to ECR


## Step 4 - Configure the service


### 4.1 - Load balancer

##### Template
`https://s3-ap-southeast-1.amazonaws.com/tooltwist.aws-explorer.templates.2020-09-02/31.app-loadbalancer.cf`

##### Fields

|Field|Description|
|-----|-----------|
| Stack Name | EEEEEE-AAAAA-loadbalancer  (e.g. 'dev-acme-loadbalancer') |
| Application Name | AAAAA (e.g. acme) |
| Cost Code | This can be used to identify resources for billing purposes |
| Environment Name | EEEEEE|
| Healthcheck path | (e.g. /api/healthcheck) |
| Prefix | PPP- (e.g. 'v1-')|

##### What this creates

1x Cloudwatch log group

1x Secrets Manager secret

1x Application Load Balancer (ALB)

1x Load Balancer Listener

1x Listener Rule

1x Target Group



---

### 4.2 - Configuration / Secrets
## Updating the configuration
If you view, and then edit the Secrets Manager secret, the json you place there will become available to the application. We recommend you access this config information using our [Juice configuration client](@tooltwist/juice-client), as suggested in the steps for preparing a project.






### 4.3 - ECS Service

##### Template
`https://s3-ap-southeast-1.amazonaws.com/tooltwist.aws-explorer.templates.2020-09-02/32.app-ecs-service.cf`

##### Fields

|Field|Description|
|-----|-----------|
| Stack Name | EEEEEE-AAAAAA-service  (e.g. 'dev-acme-service') |
| Prefix | PPP- (e.g. 'v1-')|
| Environment Name | EEEEEE |
| Application Name | AAAAAA (e.g. acme) |
| DockerImageRepository | our ECR repo (e.g. tooltwist-acme) |
| Version | Our initial seed version ('initial') |
| Desired count | start with 1 |
| Memory | 256 for NodeJS, more for Java |
| Port | Ask the development team (usually 3000 or 4000) |

Select _I acknowledge that AWS CloudFormation might create IAM resources._ on the final page and press _Create Stack_.

##### What this creates

1x ECS Service Role

1x ECS Service

1x ECS Task Definition



#### What next?
Your project will now be trying to start, but without a configuration it is probably failing it's healthchecks and continually restarting. You will need to [[give the project a configuration|Give a project a configuration]].




### 4.4 - Accessing the Configuration
In the previous step where you crearted the load balancer, an _AWS Secrets Manager_ secret would have been created. You should be able to see that on your [Secrets Manager console](https://ap-southeast-1.console.aws.amazon.com/secretsmanager/home?region=ap-southeast-1#/listSecrets).

The service just created will have the `JUICE_CONFIG` environment variable referencing this secret, however
the service will not yet be able to access that secret, without a policy in place.
For security reasons we do not enable this access in the Cloudformation scripts. We need you to explicitly enable access to Secrets Manager secrets.

Take a look at the service log file for the latest stopped tak, and will indicate the ***assumed role***, and the ***action*** and ***resource*** the role needs to grant.

First go to the [Secrets Manager Console page](https://ap-southeast-1.console.aws.amazon.com/secretsmanager/home?region=ap-southeast-1#!/listSecrets) for the region, and look up the ARN for the secret mentioned in the error.

Next, go to your [IAM Role Console page](https://console.aws.amazon.com/iam/home?#/roles) and search for the role
matching the ARN in the error. For example, role `myenv-myproject-ECSRole`.

Add the following inline policy, replacing the Resource ARN with that of the secret.

    {
        "Version": "2012-10-17",
        "Statement": [
            {
                "Effect": "Allow",
                "Action": "secretsmanager:GetSecretValue",
                "Resource": "arn:aws:secretsmanager:ap-southeast-1:1234567890:secret:j-myenv-myproject-Xxyzlj",
            }
        ]
    }





## Step 5 - Slave Nodes


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

