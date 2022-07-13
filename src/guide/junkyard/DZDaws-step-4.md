# Step 4 - Master node

In this section we configure and start up the DATP master node inside your environment's ECS Cluster, where it will be resistant to server failures, will scale automatically,
and is accessible from the Internet via a load balancer.

You can restrict access to just your API Gateway, APIC or other gateway later.

The DATP Software will be deployed from the ECR repository you created in the previous step, and run as a Docker container in the ECS cluser.

You can choose to build the Docker image and put it into ECR manually, or you can set up a Code Pipline to do this automatically.
The normal procedure is to either manually or automatically build the Docker image in your development environment,
and then deploy the exact same Docker image from the same ECR repository through your various stages
of testing through and into production.

In this section we set up the service, and in a later step we optionally set up the build pipeline.

![docker-promoting-50](https://user-images.githubusercontent.com/848697/79914553-173bb980-8458-11ea-840e-55607a00b808.png)


Run though the following steps. For each you will need to go to your [Cloudformation](https://ap-southeast-1.console.aws.amazon.com/cloudformation/home?region=ap-southeast-1#/stacks) stacks page. Select `Create stack -> with new resources (standard)`. Copy in the URL of the template below and press _Next_ then enter the fields as discussed below.

After filling in the fields as described below, skip through the remaining pages. No additional input is required unless specifically mentioned.

In values for environment `EEEEEE` and prefix `PPP` _must_ be the same as when the environment was created.


## 4.1 - Load balancer

#### What this creates
```
1x Cloudwatch log group
1x Secrets Manager secret
1x Application Load Balancer (ALB)
1x Load Balancer Listener
1x Listener Rule
1x Target Group
```

#### Template
`https://s3-ap-southeast-1.amazonaws.com/tooltwist.aws-explorer.templates.2020-09-02/31.app-loadbalancer.cf`

`2021-11-06/31.app-loadbalancer.cf`

or to use Fargate...

`2021-11-06/31.app-loadbalancer-fargate.cf`


#### Fields

|Field|Description|
|-----|-----------|
| Stack Name | EEEEEE-AAAAA-loadbalancer  (e.g. 'dev-acme-loadbalancer') |
| Application Name | AAAAA (e.g. acme) |
| Cost Code | This can be used to identify resources for billing purposes |
| Environment Name | EEEEEE|
| Healthcheck path | (e.g. /api/healthcheck) |
| Prefix | PPP- (e.g. 'v1-')|



## 4.2 - ECS Service

#### What this creates

```
1x ECS Service Role
1x ECS Service
1x ECS Task Definition
```

#### Template
`https://s3-ap-southeast-1.amazonaws.com/tooltwist.aws-explorer.templates.2020-09-02/32.app-ecs-service.cf`

`32.app-ecs-service.cf`

or for Fargate

`32.app-ecs-service-fargate.cf`



#### Fields

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



## 4.3 - Provide a Configuration
Your project will now be trying to start, but without a configuration it will be failing it's healthchecks and continually restarting. You will need to (a) give the DATP service a configuration, and
(b) let the DATP service _access_ the configuration.

In the previous step where you created the load balancer an _AWS Secrets Manager_ secret was created,
which you will be able to see on your [Secrets Manager console](https://ap-southeast-1.console.aws.amazon.com/secretsmanager/home?region=ap-southeast-1#/listSecrets).


#### Updating the Service Role
The ECS service just created has a `JUICE_CONFIG` environment variable referencing this secret, however
the service will not yet be able to access that secret, without a policy in place. For security reasons we do not enable this access in the Cloudformation scripts, and you will need you to explicitly enable access to
the secret. This is done by updating the role ECS uses to start the service's task:

1. Find the latest failed (stopped) task in the ECS Console, and look at the Logs tab. You should see
an error message that incudes the ***assumed role***, the ***action*** and the ***resource*** the role needs to grant.

2. Go to the [Secrets Manager Console page](https://ap-southeast-1.console.aws.amazon.com/secretsmanager/home?region=ap-southeast-1#!/listSecrets) for the region, and look up the ARN for the secret mentioned in the error.

3. Next, go to your [IAM Role Console page](https://console.aws.amazon.com/iam/home?#/roles) and search for the role
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


#### Configuration / Secrets
The task / service now has access to the secret, but the secret is currently empty.

Return to the Go to the [Secrets Manager Console page](https://ap-southeast-1.console.aws.amazon.com/secretsmanager/home?region=ap-southeast-1#!/listSecrets) and enter your JSON configuration into the secret as text.

The file `/workspace/datp-config.json` can be used as a template, but make sure you update the
host names and ports to match your AWS environment, and include any other variables
your application uses from the secret.

With this done, your service for the master node should start successfully.

---