# Step 1 - Environment


### What we'll be creating

What we call an "environment", is a collection of AWS resources used to deploy one or more applications (in this case, DATP nodes).

Each environment is self contained, and protected from the outside world by various security measures.

Typically, you might have environments for each other following:

- development
- testing
- staging
- production

The implementation of an environment described here, is an Amazon ECS Cluster running inside a Virtual Private Cloud, compartmentalised into separate subnets and security groups across multiple availability zones. The ECS Hosts and the services they run are not exposed to the public Internet, and can only be accessed
via one of jump boxes this environment sets up [AWS Systems Manager Sessions Manager](https://docs.aws.amazon.com/systems-manager/latest/userguide/session-manager.html).

An environment does not provide a database by default, but it does provision the subnets and a security group for any databases (e.g. Aurora) or caches (e.g. REDIS) you will later add to the environment. In a non-production environment you will typically add one database instance, with internal databases assigned for each project you deploy in the environment.


### Before you start
Before you can begin, you will need to choose a name for your environment (not too long!) and also take note of the ***prefix*** you will use.

In a busy AWS account it can sometimes be difficult to know which person, or which tool, created each of the myriad resources.
To simplify identification, our scripts will prefix the name of each resource whenever possible. We update our Cloudformation scripts
occasionally - these prefixes can also help you determine which environments and project you would like to upgrade.



### Provisioning

There are multiple stages of provisioning an environment, each utilising it's own Cloudformation template. These steps could be combined into a
single Cloudformation template, but are kept separate to make it easy to customise a particular aspect of the set up. Feel free to download and
modify these templates to create your own customisation. Typical tweaks involve adjustments to use Fargate or other AWS features.

Go though the following steps. For each you will need to go to your [Cloudformation](https://ap-southeast-1.console.aws.amazon.com/cloudformation/home?region=ap-southeast-1#/stacks) stacks page. Select `Create stack -> with new resources (standard)`. Copy in the URL of the template
below and press _Next_ and enter the fields as discussed below.

After filling in the fields, skip through the remaining pages, where **no input is required unless specifically mentioned**.


## 1.1 - Network
#### What this creates

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

1x Cache subnet (e.g. for REDIS), in case your application needs it

#### Template
`https://s3-ap-southeast-1.amazonaws.com/tooltwist.aws-explorer.templates.2020-09-02/11.env-network.cf`

`2021-11-06/11.env-network.cf`

#### Fields

|Field|Description|
|-----|-----------|
| Stack Name | EEEEEE-network  (e.g. 'dev-network') |
| Contact Email | Who to call if there is a problem |
| Cost Code | This can be used to identify resources for billing purposes |
| Environment Name | EEEEEE |
| Prefix | PPP- (e.g. 'dev-')|

::: warning Important !
Please **write down the environment name and prefix** you use, as they must be entered correctly and exactly the same in future steps.
Getting them wrong will cause confusingly named, unusable resources to be created.
:::






## 1.2 - Jump Boxes
This creates one EC2 instance as a jump box, in the public subnets, in each of the availability zones.

::: warning NOTE: This step is now discouraged
Bastion Boxes (Jump boxes) are no longer recommended, since AWS enabled access to instances via SSM (see [here](https://www.youtube.com/watch?v=dhPtThh-ShI) and [here](https://www.youtube.com/watch?v=-ASMtZBrx-k) for an overview). However in rare circumstances you might want them, so we've left the template and instructions here.
:::

#### Cloudformation Template
`https://s3-ap-southeast-1.amazonaws.com/tooltwist.aws-explorer.templates.2020-04-01/12.env-jumpboxes.cf`

`2021-11-06/12.env-jumpboxes.cf`

#### Fields

|Field|Description|
|-----|-----------|
| Stack Name | EEEEEE-jumpboxes  (e.g. 'dev-jumpboxes') |
| Environment Name | EEEEEE |
| Instance Type | t2.nano (It's only a jumpbox) |
| Prefix | PPP- (e.g. 'v1-')|






## 1.3 - Keypair
Before you create an environment in AWS, you will need a ***keypair***.

The keypair allows you to log into the AWS server instances you create. The following steps must be completed using the AWS Dashboard. You'll create the keypair, then download and install it on your machine. Don't lose this file, or you will not be able to login to the environment you create.

In the commands below replace the `ppp` with your prefix (e.g. j-) and `eeeee` below with your environment name.
This example is for Singapore (ap-southeast-1) but feel free to change
this to [another AWS region](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-regions-availability-zones.html#concepts-available-regions).


a) Go to the [Keypairs page of the AWS console](https://ap-southeast-1.console.aws.amazon.com/ec2/v2/home?region=ap-southeast-1#KeyPairs:sort=keyName)

b) Create a key pair with the RSA and .pem options selected, named `ppp-eeeee-region`. For example `j-dev-ap-southeast-1` or `acme-prod-us-east-1`.

c) The keypair should be automatically downloaded to you machine, where you can install it:

      $ mv ~/Downloads/ppp-eeeee-ap-southeast-1.pem ~/.ssh
      $ chmod 600 ~/.ssh/ppp-eeeee-ap-southeast-1.pem

d) On a Mac you'll need to remove the extended attributes.

    $ xattr -d com.apple.metadata:kMDItemWhereFroms ~/.ssh/ppp-eeeee-ap-southeast-1.pem
    $ xattr -d com.apple.quarantine ~/.ssh/ppp-eeeee-ap-southeast-1.pem


## 1.4 - ECS Cluster.

1x Role definition for the ECS services.

1x ECS Cluster

1x Autoscaling group

1x Launch Configuration

#### Cloudformation Template

`https://s3-ap-southeast-1.amazonaws.com/tooltwist.aws-explorer.templates.2021-05-10/12.env-ecs-cluster.cf`

`2021-11-06/13.env-ecs-cluster.cf`

#### Fields

|Field|Description|
|-----|-----------|
| Stack Name | EEEEEE-cluster  (e.g. 'dev-cluster') |
| Cluster size | How many EC2 instances do you want in the cluster? If unsure start with 1 |
| Environment Name | EEEEEE |
| Instance Type | Choose an EC2 size appropriate for the environment's purpose |
| Prefix | PPP- (e.g. 'v1-')|

On the final page, select _I acknowledge that AWS CloudFormation might create IAM resources_ and create the stack.





