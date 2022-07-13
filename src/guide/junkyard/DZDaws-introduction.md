# Introduction

## Architecture

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
1. Create the environment (VPC, Subnets, Security Groups, ECS Cluster, etc)
2. Create the database (RDS)
3. Prepare the DATP node as a Docker image (ECR)
3. Deploy the Docker image to the cluster (ALB, ECS, Secrets, etc)

