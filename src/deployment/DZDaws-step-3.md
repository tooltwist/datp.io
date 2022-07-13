# Step 3 - Docker image

In this step we build a Docker image for your master server and push it to an AWS repository where it
can be deployed to your various environments.

::: tip Note
**This step only needs to be performed once**, for one environment, and the
resulting ECR repository and Docker image can be used for other environments as well.
By using the same exact same image of your application from development,
testing and staging, through to production, you reduce the possibility of
introducing bugs or incompatible versions of dependancies.
:::



## 3.1 - The util directory
The `util` directory in the project folder provides scripts to build a Docker image for your DATP application.


```
Project Directory
├─ DATP
├─ MONDAT
├─ etc
└─ util
  ├─ 1.build-on-docker
  ├─ 2.push-to-ecr
  ├─ 3.deploy-to-XXX
  ├─ start-on-docker
  ├─ Config
  ├─ Dockerfile
  └─ etc
```


These scripts will require tweaking for your environment.

A prerequisite for running these scripts is that you have the **AWS CLI** installed.
In some scripts you will see `AWS_PROFILE` specified. This must have a corresponding entry in your `~/.aws/credentials` file. For more
information see the AWS CLI documentation.

The numbered scripts can be run in order to perform a normal deployment, however if you are still setting things up
you might want to test a few things along the way... After running


## 3.2 - Docker Build
This script runs a `docker build` to create the image of your application, based on the Dockerfile also in the util directory.

    ./1.build-on-docker

To ensure consistency between the desktop development environment and the application deployed on AWS, this Dockerfile should be
similar to `~/vscode/Dockerfile.ubuntu` excluding however any entries in that file that just support Visual Studio Code.

Once the image is built sucessfully, you can use test the image on your local machine.

    ./start-on-docker

The docker options provided by the script should allow the container to connect to the same database that is running when you
are using Visual Studio Code to develop the application. You will need to create a config file `util/Config/config-for-juice-yourName-DOCKER.json`,
and copying the example config file in the same directory usually works fine.

Once the container is running, the `docker ps` command will show you the ports you can use to attach to the application.


## 3.3 - Create ECR Repository
Amazon ECR (Elastic Container Repository) is a repository for your Docker images.

There will be **one** ECR repository for each project, irrespective of how many environments you deploy it to. The name of the repository should generally be the name of the project's repository in Github with a hyphen to replace the slash. For example, for `tooltwist/acme` you would create an ECR repository named `tooltwist-acme`.


#### Template
`https://s3-ap-southeast-1.amazonaws.com/tooltwist.aws-explorer.templates.2020-09-02/21.project-ecr-image-repo.cf`

`2021-11-06/21.project-ecr-image-repo.cf`


#### Fields

|Field|Description|
|-----|-----------|
| Stack Name | ecr-repositoryname  (e.g. 'ecr-tooltwist-acme') |
| Docker image repository | Repository name (e.g. tooltwist-acme) |


Once the repository is created, go to your [ECR Dashboard](https://ap-southeast-1.console.aws.amazon.com/ecr/repositories?region=ap-southeast-1) and select the new repository to see the details of the repository.


## 3.4 - Push to ECR repo

::: danger
Before running this script check that constant values provided at the top, that define
your AWS account, repository name, etc, are correct.
:::

    ./2.push-to-ecr

This command chooses a version number based upon the current date and time, and pushes the image up to your AWS ECR repository. When it finishes it displays a message containing the version number.

```
...
0a1c0b220d6e: Layer already exists
de1bb73bcb8b: Layer already exists
0279b13c6fc6: Layer already exists
2021-11-11.1533: digest: sha256:349011842dc903b82c5acfbc7353dc35b08c60a8b25514a4aa76e1000f6ea748 size: 8255
Push 2021-11-11.1533 complete.

New tag is 2021-11-11.1533

```

Take note of that tag / version number - you will need it to deploy the correct image into your envionment(s).


## 3.5 - Deployment script (used later)

:::tip NOTE
This script deploys the image you pushed to the ECR repository into an ***existing*** service.
We mention it here because we've discussed the other scripts, but you will not be able to run it
until you've completed the next step (Step 4 - Master node).

However, feel free to use this command later!
:::

You will often have multiple versions of this script, so you can deploy to your dev, test, staging environments.
You normally will not have a script for production, as you don't want developers doing production deployments.

The first parameter of this command will be the version number displayed by the previous step.

::: danger Super important !!!
Make sure you provide an existing, valid, version number. If you mistype this the server deployment will hang,
and you'll have to either cancel the update from the AWS console, or wait about half an hour for it to time out.
:::

    ./3.deploy-to-dev 2011-10-04.1254

This command will give you two options for following the status of the deployment. The first is a command you
can run using the AWS CLI, while the second is a link to the AWS Console.

This deployment works by performing an update of the version parameter supplied to the Cloudformation script
that provisions the service (in step 4 ahead). If you have any problems or need to debug this deployment,
take a look at the following likely hotspots:

- Cloudformation console
- The ECS task deployment, specifically the log entries for stopped (failed) tasks.
- The Target group for the task.
- The application security group for the environment.

For more information refer to the AWS documentation, and AWS expert, or Aunty Google.
