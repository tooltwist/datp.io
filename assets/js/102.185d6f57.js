(window.webpackJsonp=window.webpackJsonp||[]).push([[102],{624:function(e,t,a){"use strict";a.r(t);var s=a(60),r=Object(s.a)({},(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[a("h1",{attrs:{id:"deployment-on-aws"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#deployment-on-aws"}},[e._v("#")]),e._v(" Deployment on AWS")]),e._v(" "),a("p",[e._v("Our recommendation is that you follow the AWS best practices, to ensure maximum\nsecurity, scaleability and reliability.")]),e._v(" "),a("p",[e._v("We typically deploy using AWS ECS (Elastic Container Service), using Fargate servers,\nwhile separating into progressive deeper security levels using private subnets.\nWe strongly discourage allowing "),a("em",[e._v("any")]),e._v(" form of direct access to the application from\nthe public Internet - not even with whitelisted IP addresses - and by preference use\n"),a("a",{attrs:{href:"https://aws.amazon.com/blogs/infrastructure-and-automation/toward-a-bastion-less-world/",target:"_blank",rel:"noopener noreferrer"}},[e._v("AWS Session Manager"),a("OutboundLink")],1),e._v(".")]),e._v(" "),a("div",{staticStyle:{padding:"20px 5px 30px"}},[a("img",{staticStyle:{width:"720px","border-radius":"3px"},attrs:{src:"/datp-images/aws-deployment.png",alt:"AWS Deployment"}})]),e._v(" "),a("h2",{attrs:{id:"scripted-provisioning"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#scripted-provisioning"}},[e._v("#")]),e._v(" Scripted Provisioning")]),e._v(" "),a("p",[e._v("We recommend provisioning your infrastruacture using "),a("a",{attrs:{href:"https://aws.amazon.com/cloudformation/",target:"_blank",rel:"noopener noreferrer"}},[e._v("Cloudformation"),a("OutboundLink")],1),e._v(" or "),a("a",{attrs:{href:"https://www.terraform.io/",target:"_blank",rel:"noopener noreferrer"}},[e._v("Terraform"),a("OutboundLink")],1),e._v(".\nBelow we walk through using set of generic\nCloudformation scripts to provision your system, but feel free to modify these scripts or use\nequivalent Terraform scripts instead.")]),e._v(" "),a("div",{staticClass:"custom-block tip"},[a("p",{staticClass:"custom-block-title"},[e._v("TIP")]),e._v(" "),a("p",[e._v("The following section assumes a thorough understanding of AWS and Cloudformation.\nIf you are not familiar with these AWS services, now would be a good time to explore the AWS leaning materials and tutorials.")])]),e._v(" "),a("p",[e._v("In the following sections, we provision in several stages:")]),e._v(" "),a("ol",[a("li",[e._v("Create the environment (Network, ECS Cluster, etc)")]),e._v(" "),a("li",[e._v("Create the database")]),e._v(" "),a("li",[e._v("Add a DATP node to the cluster (Load balancer, ECS service, etc)")]),e._v(" "),a("li",[e._v("Provide a configuration for the node.")])]),e._v(" "),a("h2",{attrs:{id:"step-1-environment"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#step-1-environment"}},[e._v("#")]),e._v(" Step 1 - Environment")]),e._v(" "),a("h4",{attrs:{id:"what-we-ll-be-creating"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#what-we-ll-be-creating"}},[e._v("#")]),e._v(" What we'll be Creating")]),e._v(" "),a("p",[e._v("An environment is an Amazon ECS Cluster running inside a Virtual Private Cloud, compartmentalised into separate sub nets and security groups across multiple availability zones. The ECS Hosts and the services they run are not exposed to the public Internet, and can only be accessed via one of jump boxes this environment sets up. For extra security, the jump boxes should be shut down when not in use.")]),e._v(" "),a("p",[e._v("The environment does not provide a database by default, but it does provision the subnets and a security group for any databases (e.g. Aurora) or caches (e.g. REDIS) you will later add to the environment. In a non-production environment you will typically add one database instance, with internal databases assigned for each project you deploy in the environment.")]),e._v(" "),a("h4",{attrs:{id:"before-you-start"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#before-you-start"}},[e._v("#")]),e._v(" Before you start")]),e._v(" "),a("p",[e._v("Before you can begin, you will need to choose a name for your environment (not too long!) and also take note of the "),a("em",[a("strong",[e._v("prefix")])]),e._v(" you will use. This will prefereably be one to three characters (e.g. 'x-').")]),e._v(" "),a("h4",{attrs:{id:"provisioning"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#provisioning"}},[e._v("#")]),e._v(" Provisioning")]),e._v(" "),a("p",[e._v("There are three stages of provisioning an environment, each utilising it's own Cloudformation template. These three steps could be combined into a single Cloudformation template, but are kept separate to make it easy to customise a particular aspect of the set up. Feel free to download and modify these templates to create your own customisation. Typical tweaks involve adjustments to use Fargate and Kubernetes.")]),e._v(" "),a("p",[e._v("Go though the following steps. For each you will need to go to your "),a("a",{attrs:{href:"https://ap-southeast-1.console.aws.amazon.com/cloudformation/home?region=ap-southeast-1#/stacks",target:"_blank",rel:"noopener noreferrer"}},[e._v("Cloudformation"),a("OutboundLink")],1),e._v(" stacks page. Select "),a("code",[e._v("Create stack -> with new resources (standard)")]),e._v(". Copy in the URL of the template below and press "),a("em",[e._v("Next")]),e._v(" then enter the fields as discussed below.")]),e._v(" "),a("p",[e._v("After filling in the fields as described below, skip through the remaining pages, where no input is required unless specifically mentioned.")]),e._v(" "),a("p",[e._v("In the descriptions below the environment "),a("code",[e._v("EEEEEE")]),e._v(" and prefix "),a("code",[e._v("PPP")]),e._v(" "),a("em",[e._v("must")]),e._v(" be the same in every step.")]),e._v(" "),a("h3",{attrs:{id:"_1-1-network"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1-1-network"}},[e._v("#")]),e._v(" 1.1 - Network")]),e._v(" "),a("h5",{attrs:{id:"template"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#template"}},[e._v("#")]),e._v(" Template")]),e._v(" "),a("p",[a("code",[e._v("https://s3-ap-southeast-1.amazonaws.com/tooltwist.aws-explorer.templates.2020-09-02/11.env-network.cf")])]),e._v(" "),a("h5",{attrs:{id:"fields"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#fields"}},[e._v("#")]),e._v(" Fields")]),e._v(" "),a("table",[a("thead",[a("tr",[a("th",[e._v("Field")]),e._v(" "),a("th",[e._v("Description")])])]),e._v(" "),a("tbody",[a("tr",[a("td",[e._v("Stack Name")]),e._v(" "),a("td",[e._v("EEEEEE-network  (e.g. 'dev-network')")])]),e._v(" "),a("tr",[a("td",[e._v("Contact Email")]),e._v(" "),a("td",[e._v("Who to call if there is a problem")])]),e._v(" "),a("tr",[a("td",[e._v("Cost Code")]),e._v(" "),a("td",[e._v("This can be used to identify resources for billing purposes")])]),e._v(" "),a("tr",[a("td",[e._v("Environment Name")]),e._v(" "),a("td",[e._v("EEEEEE")])]),e._v(" "),a("tr",[a("td",[e._v("Prefix")]),e._v(" "),a("td",[e._v("PPP- (e.g. 'dev-')")])])])]),e._v(" "),a("div",{staticClass:"custom-block danger"},[a("p",{staticClass:"custom-block-title"},[e._v("NOTE")]),e._v(" "),a("p",[e._v("Please "),a("strong",[e._v("write down the environment name and prefix")]),e._v(" you use, as they must be entered correctly in future steps.\nGetting them wrong will cause confusingly named, unusable resources to be created.")])]),e._v(" "),a("h5",{attrs:{id:"what-this-creates"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#what-this-creates"}},[e._v("#")]),e._v(" What this creates")]),e._v(" "),a("p",[e._v("1x Virtual Private Cloud (VPC)")]),e._v(" "),a("p",[e._v("1x Internet Gateway")]),e._v(" "),a("p",[e._v("2x Public subnets (One in each availability zone)")]),e._v(" "),a("p",[e._v("2x Private subnets (One in each availability zone)")]),e._v(" "),a("p",[e._v("2x NAT Gateways (One in each availability zone)")]),e._v(" "),a("p",[e._v("2x Route tables (One public, one private)")]),e._v(" "),a("p",[e._v("1x Load balancer security group")]),e._v(" "),a("p",[e._v("1x Application security group")]),e._v(" "),a("p",[e._v("1x Database security group")]),e._v(" "),a("p",[e._v("1x Database Subnet")]),e._v(" "),a("p",[e._v("1x Cache subnet (e.g. REDIS), in case your application needs it")]),e._v(" "),a("h3",{attrs:{id:"_1-2-jump-boxes"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1-2-jump-boxes"}},[e._v("#")]),e._v(" 1.2 - Jump Boxes")]),e._v(" "),a("div",{staticClass:"custom-block warning"},[a("p",{staticClass:"custom-block-title"},[e._v("NOTE: This step is now optional")]),e._v(" "),a("p",[e._v("Bastion Boxes (Jumpboxes) are no longer recommended, since AWS started allowing access to instances via SSM (see "),a("a",{attrs:{href:"https://www.youtube.com/watch?v=dhPtThh-ShI",target:"_blank",rel:"noopener noreferrer"}},[e._v("here"),a("OutboundLink")],1),e._v(" and "),a("a",{attrs:{href:"https://www.youtube.com/watch?v=-ASMtZBrx-k",target:"_blank",rel:"noopener noreferrer"}},[e._v("here"),a("OutboundLink")],1),e._v(" for an overview). However in rare circumstances you might want them, so we'll leave the template and instructions here.")])]),e._v(" "),a("h4",{attrs:{id:"_1-2-1-cloudformation-template"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1-2-1-cloudformation-template"}},[e._v("#")]),e._v(" 1.2.1 - Cloudformation Template")]),e._v(" "),a("p",[a("code",[e._v("https://s3-ap-southeast-1.amazonaws.com/tooltwist.aws-explorer.templates.2020-04-01/12.env-jumpboxes.cf")])]),e._v(" "),a("h4",{attrs:{id:"_1-2-2-fields"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1-2-2-fields"}},[e._v("#")]),e._v(" 1.2.2 - Fields")]),e._v(" "),a("table",[a("thead",[a("tr",[a("th",[e._v("Field")]),e._v(" "),a("th",[e._v("Description")])])]),e._v(" "),a("tbody",[a("tr",[a("td",[e._v("Stack Name")]),e._v(" "),a("td",[e._v("EEEEEE-jumpboxes  (e.g. 'dev-jumpboxes')")])]),e._v(" "),a("tr",[a("td",[e._v("Environment Name")]),e._v(" "),a("td",[e._v("EEEEEE")])]),e._v(" "),a("tr",[a("td",[e._v("Instance Type")]),e._v(" "),a("td",[e._v("t2.nano (It's only a jumpbox)")])]),e._v(" "),a("tr",[a("td",[e._v("Prefix")]),e._v(" "),a("td",[e._v("PPP- (e.g. 'v1-')")])])])]),e._v(" "),a("h4",{attrs:{id:"_1-2-3-what-this-creates"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1-2-3-what-this-creates"}},[e._v("#")]),e._v(" 1.2.3 - What this creates")]),e._v(" "),a("p",[e._v("2x EC2 instances for jump boxes, in the public subnets, in each of the availability zones.")]),e._v(" "),a("h3",{attrs:{id:"_1-3-ecs-cluster"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1-3-ecs-cluster"}},[e._v("#")]),e._v(" 1.3 - ECS Cluster.")]),e._v(" "),a("div",{staticClass:"custom-block tip"},[a("p",{staticClass:"custom-block-title"},[e._v("TIP")]),e._v(" "),a("p",[e._v("This step can be started before step2 finishes.")])]),e._v(" "),a("h4",{attrs:{id:"_3-1-create-a-keypair"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_3-1-create-a-keypair"}},[e._v("#")]),e._v(" 3.1 - Create a Keypair")]),e._v(" "),a("p",[e._v("Before you create an environment in AWS, you will need a "),a("strong",[e._v("keypair")]),e._v(".")]),e._v(" "),a("p",[e._v("The keypair allows you to log into the AWS server instances you create. The following steps must be completed using the AWS Dashboard. You'll create the keypair, then download and install it on your machine. Don't lose this file, or you will not be able to login to the environment you create.")]),e._v(" "),a("p",[e._v("In the commands below replace the "),a("code",[e._v("ppp")]),e._v(" with your prefix (e.g. j-) and "),a("code",[e._v("eeeee")]),e._v(" below with your environment name.\nThis example is for Singapore (ap-southeast-1) but feel free to change\nthis to "),a("a",{attrs:{href:"https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-regions-availability-zones.html#concepts-available-regions",target:"_blank",rel:"noopener noreferrer"}},[e._v("another AWS region"),a("OutboundLink")],1),e._v(".")]),e._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("  Each environment requires a master Key Pair, used to access the servers.\n  1. Go to the following URL:\n      https://ap-southeast-1.console.aws.amazon.com/ec2/v2/home?region=ap-southeast-1#KeyPairs:sort=keyName\n  2. Create a key pair with the RSA and .pem options selected, named:\n      ppp-eeeee-ap-southeast-1\n  3. The keypair should be automatically downloaded to you machine, where you can install it:\n      $ mv ~/Downloads/ppp-eeeee-ap-southeast-1.pem ~/.ssh\n      $ chmod 600 ~/.ssh/ppp-eeeee-ap-southeast-1.pem\n  4. On a Mac, also run:\n      $ xattr -d com.apple.metadata:kMDItemWhereFroms ~/.ssh/ppp-eeeee-ap-southeast-1.pem\n      $ xattr -d com.apple.quarantine ~/.ssh/ppp-eeeee-ap-southeast-1.pem\n")])]),e._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[e._v("1")]),a("br"),a("span",{staticClass:"line-number"},[e._v("2")]),a("br"),a("span",{staticClass:"line-number"},[e._v("3")]),a("br"),a("span",{staticClass:"line-number"},[e._v("4")]),a("br"),a("span",{staticClass:"line-number"},[e._v("5")]),a("br"),a("span",{staticClass:"line-number"},[e._v("6")]),a("br"),a("span",{staticClass:"line-number"},[e._v("7")]),a("br"),a("span",{staticClass:"line-number"},[e._v("8")]),a("br"),a("span",{staticClass:"line-number"},[e._v("9")]),a("br"),a("span",{staticClass:"line-number"},[e._v("10")]),a("br"),a("span",{staticClass:"line-number"},[e._v("11")]),a("br")])]),a("h4",{attrs:{id:"_1-3-2-run-the-cloudformation-template"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1-3-2-run-the-cloudformation-template"}},[e._v("#")]),e._v(" 1.3.2 - Run the Cloudformation Template")]),e._v(" "),a("p",[a("code",[e._v("https://s3-ap-southeast-1.amazonaws.com/tooltwist.aws-explorer.templates.2021-05-10/12.env-ecs-cluster.cf")])]),e._v(" "),a("table",[a("thead",[a("tr",[a("th",[e._v("Field")]),e._v(" "),a("th",[e._v("Description")])])]),e._v(" "),a("tbody",[a("tr",[a("td",[e._v("Stack Name")]),e._v(" "),a("td",[e._v("EEEEEE-cluster  (e.g. 'dev-cluster')")])]),e._v(" "),a("tr",[a("td",[e._v("Cluster size")]),e._v(" "),a("td",[e._v("How many EC2 instances do you want in the cluster? If unsure start with 1")])]),e._v(" "),a("tr",[a("td",[e._v("Environment Name")]),e._v(" "),a("td",[e._v("EEEEEE")])]),e._v(" "),a("tr",[a("td",[e._v("Instance Type")]),e._v(" "),a("td",[e._v("Choose an EC2 size appropriate for the environment's purpose")])]),e._v(" "),a("tr",[a("td",[e._v("Prefix")]),e._v(" "),a("td",[e._v("PPP- (e.g. 'v1-')")])])])]),e._v(" "),a("p",[e._v("On the final page, select "),a("em",[e._v("I acknowledge that AWS CloudFormation might create IAM resources")]),e._v(" and create the stack.")]),e._v(" "),a("h4",{attrs:{id:"_1-3-3-what-this-creates"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1-3-3-what-this-creates"}},[e._v("#")]),e._v(" 1.3.3 - What this creates")]),e._v(" "),a("p",[e._v("1x Role definition for the ECS services.")]),e._v(" "),a("p",[e._v("1x ECS Cluster")]),e._v(" "),a("p",[e._v("1x Autoscaling group")]),e._v(" "),a("p",[e._v("1x Launch Configuration")]),e._v(" "),a("hr"),e._v(" "),a("h2",{attrs:{id:"step-2-database"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#step-2-database"}},[e._v("#")]),e._v(" Step 2 - Database")]),e._v(" "),a("p",[e._v("We do not provide specific instructions for setting up a database with AWS RDS, as the\nneeds will vary between deployments and there are many options for size, redundancy, backups, etc.")]),e._v(" "),a("p",[e._v("Whichever database you create, we recommend deploying production databases across multiple availability zones and ensuring you have adequate backups for your needs.")]),e._v(" "),a("p",[e._v("When you create the database, make sure you place it in the database security group provisioned during the environment set up above.")]),e._v(" "),a("hr"),e._v(" "),a("h2",{attrs:{id:"step-3-the-docker-image"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#step-3-the-docker-image"}},[e._v("#")]),e._v(" Step 3 - The Docker image")]),e._v(" "),a("h3",{attrs:{id:"_3-1-build"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_3-1-build"}},[e._v("#")]),e._v(" 3.1 - Build")]),e._v(" "),a("p",[e._v("####### Step 4 - Master Node")]),e._v(" "),a("p",[e._v("In this section we configure and start up the DATP master node inside your environment's ECS Cluster, where it will be resistant to server failures, will scale automatically,\nand is accessible to the Internet via a load balancer. (You will restrict access to just your API Gateway, APIC or other gateway later)")]),e._v(" "),a("p",[e._v("The DATP Software will be deployed from an ECR (Elastic Container Registry) repository, and run as a Docker container in the ECS cluser.")]),e._v(" "),a("p",[e._v("You can choose to build the Docker image and put it into ECR manually, or you can set up a Code Pipline to do this automatically.\nThe normal procedure is to do this in your development environment, and deploy the same Docker image from the same ECR repository through your various stages of testing through and into production.\nUsing the same Docker image and repository ensures that the exact same software is used in production, as was used in all the testing stages.")]),e._v(" "),a("p",[e._v("In this section we set up the service, and in a later phase we optionally set up the build pipeline.")]),e._v(" "),a("p",[a("img",{attrs:{src:"https://user-images.githubusercontent.com/848697/79914553-173bb980-8458-11ea-840e-55607a00b808.png",alt:"docker-promoting-50"}})]),e._v(" "),a("h4",{attrs:{id:"before-you-start-2"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#before-you-start-2"}},[e._v("#")]),e._v(" Before you start")]),e._v(" "),a("p",[e._v("Before you can begin, you need to have an environment, and you need to know it's name and the prefix used when it was created.")]),e._v(" "),a("p",[e._v("In addition you will need your project built into a Docker Image. If you don't have that already, have the development team look at [[Preparing a Project for Deployment]]. There will be a step below where they load their initial Docker image into the ECR repository. More about that later...")]),e._v(" "),a("p",[e._v("One last thing... you do know that [[aws-explorer|Provisioning using aws-explorer]] can make provisioning easier, right?")]),e._v(" "),a("h4",{attrs:{id:"provisioning-2"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#provisioning-2"}},[e._v("#")]),e._v(" Provisioning")]),e._v(" "),a("p",[e._v("There are three steps in provisioning a project, the second and third using Cloudformation templates.")]),e._v(" "),a("p",[e._v("Go though the following steps. For each you will need to go to your "),a("a",{attrs:{href:"https://ap-southeast-1.console.aws.amazon.com/cloudformation/home?region=ap-southeast-1#/stacks",target:"_blank",rel:"noopener noreferrer"}},[e._v("Cloudformation"),a("OutboundLink")],1),e._v(" stacks page. Select "),a("code",[e._v("Create stack -> with new resources (standard)")]),e._v(". Copy in the URL of the template below and press "),a("em",[e._v("Next")]),e._v(" then enter the fields as discussed below.")]),e._v(" "),a("p",[e._v("After filling in the fields as described below, skip through the remaining pages. No additional input is required unless specifically mentioned.")]),e._v(" "),a("p",[e._v("In values for environment "),a("code",[e._v("EEEEEE")]),e._v(" and prefix "),a("code",[e._v("PPP")]),e._v(" "),a("em",[e._v("must")]),e._v(" be the same as when the environment was created.")]),e._v(" "),a("h3",{attrs:{id:"_3-2-create-ecr-repository"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_3-2-create-ecr-repository"}},[e._v("#")]),e._v(" 3.2 - Create ECR Repository")]),e._v(" "),a("div",{staticClass:"custom-block tip"},[a("p",{staticClass:"custom-block-title"},[e._v("TIP")]),e._v(" "),a("p",[e._v("This only needs to be done the first time you deploy your DATP node, as the same repository and Docker images\nshould be used for development, testing, staging and production.\nThis how we ensure there are no accidental changes between testing and production.")])]),e._v(" "),a("p",[e._v("As discussed above, Amazon ECR (Elastic Container Repository) is a repository for your Docker images.")]),e._v(" "),a("p",[e._v("There will be "),a("strong",[e._v("one")]),e._v(" ECR repository for each project, irrespective of how many environments you deploy it to. The name of the repository should be the name of the project's repository in Github with a hyphen to replace the slash. For example, for "),a("code",[e._v("tooltwist/acme")]),e._v(" you would create an ECR repository named "),a("code",[e._v("tooltwist-acme")]),e._v(".")]),e._v(" "),a("p",[e._v("If you already have an ECR repository for the project, go to step 2 now.")]),e._v(" "),a("h4",{attrs:{id:"template-2"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#template-2"}},[e._v("#")]),e._v(" Template")]),e._v(" "),a("p",[a("code",[e._v("https://s3-ap-southeast-1.amazonaws.com/tooltwist.aws-explorer.templates.2020-09-02/21.project-ecr-image-repo.cf")])]),e._v(" "),a("h5",{attrs:{id:"fields-2"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#fields-2"}},[e._v("#")]),e._v(" Fields")]),e._v(" "),a("table",[a("thead",[a("tr",[a("th",[e._v("Field")]),e._v(" "),a("th",[e._v("Description")])])]),e._v(" "),a("tbody",[a("tr",[a("td",[e._v("Stack Name")]),e._v(" "),a("td",[e._v("ecr-repositoryname  (e.g. 'ecr-tooltwist-acme')")])]),e._v(" "),a("tr",[a("td",[e._v("Docker image repository")]),e._v(" "),a("td",[e._v("Repository name (e.g. tooltwist-acme)")])])])]),e._v(" "),a("p",[e._v("Once the repository is created, go to your "),a("a",{attrs:{href:"https://ap-southeast-1.console.aws.amazon.com/ecr/repositories?region=ap-southeast-1",target:"_blank",rel:"noopener noreferrer"}},[e._v("ECR Dashboard"),a("OutboundLink")],1),e._v(", select the new repository and press the "),a("em",[e._v("View push commands")]),e._v(" button.")]),e._v(" "),a("p",[e._v("Before proceeding to Step 2, have the development team use these instructions to push an initial Docker image for their application to the repository. Have them tag this image as "),a("em",[a("strong",[e._v("initial")])]),e._v(" (not latest, as in the instructions).")]),e._v(" "),a("p",[e._v("In the future we will use a build pipeline to create the Docker images for this project, but to get the first deployment working we need to 'seed' the ECR repository with an initial version. (It's a \"chicken or egg came first\" sort of problem).")]),e._v(" "),a("h3",{attrs:{id:"_3-3-push-to-ecr"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_3-3-push-to-ecr"}},[e._v("#")]),e._v(" 3.3 - Push to ECR")]),e._v(" "),a("h2",{attrs:{id:"step-4-configure-the-service"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#step-4-configure-the-service"}},[e._v("#")]),e._v(" Step 4 - Configure the service")]),e._v(" "),a("h3",{attrs:{id:"_4-1-load-balancer"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_4-1-load-balancer"}},[e._v("#")]),e._v(" 4.1 - Load balancer")]),e._v(" "),a("h5",{attrs:{id:"template-3"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#template-3"}},[e._v("#")]),e._v(" Template")]),e._v(" "),a("p",[a("code",[e._v("https://s3-ap-southeast-1.amazonaws.com/tooltwist.aws-explorer.templates.2020-09-02/31.app-loadbalancer.cf")])]),e._v(" "),a("h5",{attrs:{id:"fields-3"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#fields-3"}},[e._v("#")]),e._v(" Fields")]),e._v(" "),a("table",[a("thead",[a("tr",[a("th",[e._v("Field")]),e._v(" "),a("th",[e._v("Description")])])]),e._v(" "),a("tbody",[a("tr",[a("td",[e._v("Stack Name")]),e._v(" "),a("td",[e._v("EEEEEE-AAAAA-loadbalancer  (e.g. 'dev-acme-loadbalancer')")])]),e._v(" "),a("tr",[a("td",[e._v("Application Name")]),e._v(" "),a("td",[e._v("AAAAA (e.g. acme)")])]),e._v(" "),a("tr",[a("td",[e._v("Cost Code")]),e._v(" "),a("td",[e._v("This can be used to identify resources for billing purposes")])]),e._v(" "),a("tr",[a("td",[e._v("Environment Name")]),e._v(" "),a("td",[e._v("EEEEEE")])]),e._v(" "),a("tr",[a("td",[e._v("Healthcheck path")]),e._v(" "),a("td",[e._v("(e.g. /api/healthcheck)")])]),e._v(" "),a("tr",[a("td",[e._v("Prefix")]),e._v(" "),a("td",[e._v("PPP- (e.g. 'v1-')")])])])]),e._v(" "),a("h5",{attrs:{id:"what-this-creates-2"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#what-this-creates-2"}},[e._v("#")]),e._v(" What this creates")]),e._v(" "),a("p",[e._v("1x Cloudwatch log group")]),e._v(" "),a("p",[e._v("1x Secrets Manager secret")]),e._v(" "),a("p",[e._v("1x Application Load Balancer (ALB)")]),e._v(" "),a("p",[e._v("1x Load Balancer Listener")]),e._v(" "),a("p",[e._v("1x Listener Rule")]),e._v(" "),a("p",[e._v("1x Target Group")]),e._v(" "),a("hr"),e._v(" "),a("h3",{attrs:{id:"_4-2-configuration-secrets"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_4-2-configuration-secrets"}},[e._v("#")]),e._v(" 4.2 - Configuration / Secrets")]),e._v(" "),a("h2",{attrs:{id:"updating-the-configuration"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#updating-the-configuration"}},[e._v("#")]),e._v(" Updating the configuration")]),e._v(" "),a("p",[e._v("If you view, and then edit the Secrets Manager secret, the json you place there will become available to the application. We recommend you access this config information using our "),a("a",{attrs:{href:"@tooltwist/juice-client"}},[e._v("Juice configuration client")]),e._v(", as suggested in the steps for preparing a project.")]),e._v(" "),a("h3",{attrs:{id:"_4-3-ecs-service"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_4-3-ecs-service"}},[e._v("#")]),e._v(" 4.3 - ECS Service")]),e._v(" "),a("h5",{attrs:{id:"template-4"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#template-4"}},[e._v("#")]),e._v(" Template")]),e._v(" "),a("p",[a("code",[e._v("https://s3-ap-southeast-1.amazonaws.com/tooltwist.aws-explorer.templates.2020-09-02/32.app-ecs-service.cf")])]),e._v(" "),a("h5",{attrs:{id:"fields-4"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#fields-4"}},[e._v("#")]),e._v(" Fields")]),e._v(" "),a("table",[a("thead",[a("tr",[a("th",[e._v("Field")]),e._v(" "),a("th",[e._v("Description")])])]),e._v(" "),a("tbody",[a("tr",[a("td",[e._v("Stack Name")]),e._v(" "),a("td",[e._v("EEEEEE-AAAAAA-service  (e.g. 'dev-acme-service')")])]),e._v(" "),a("tr",[a("td",[e._v("Prefix")]),e._v(" "),a("td",[e._v("PPP- (e.g. 'v1-')")])]),e._v(" "),a("tr",[a("td",[e._v("Environment Name")]),e._v(" "),a("td",[e._v("EEEEEE")])]),e._v(" "),a("tr",[a("td",[e._v("Application Name")]),e._v(" "),a("td",[e._v("AAAAAA (e.g. acme)")])]),e._v(" "),a("tr",[a("td",[e._v("DockerImageRepository")]),e._v(" "),a("td",[e._v("our ECR repo (e.g. tooltwist-acme)")])]),e._v(" "),a("tr",[a("td",[e._v("Version")]),e._v(" "),a("td",[e._v("Our initial seed version ('initial')")])]),e._v(" "),a("tr",[a("td",[e._v("Desired count")]),e._v(" "),a("td",[e._v("start with 1")])]),e._v(" "),a("tr",[a("td",[e._v("Memory")]),e._v(" "),a("td",[e._v("256 for NodeJS, more for Java")])]),e._v(" "),a("tr",[a("td",[e._v("Port")]),e._v(" "),a("td",[e._v("Ask the development team (usually 3000 or 4000)")])])])]),e._v(" "),a("p",[e._v("Select "),a("em",[e._v("I acknowledge that AWS CloudFormation might create IAM resources.")]),e._v(" on the final page and press "),a("em",[e._v("Create Stack")]),e._v(".")]),e._v(" "),a("h5",{attrs:{id:"what-this-creates-3"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#what-this-creates-3"}},[e._v("#")]),e._v(" What this creates")]),e._v(" "),a("p",[e._v("1x ECS Service Role")]),e._v(" "),a("p",[e._v("1x ECS Service")]),e._v(" "),a("p",[e._v("1x ECS Task Definition")]),e._v(" "),a("h4",{attrs:{id:"what-next"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#what-next"}},[e._v("#")]),e._v(" What next?")]),e._v(" "),a("p",[e._v("Your project will now be trying to start, but without a configuration it is probably failing it's healthchecks and continually restarting. You will need to [[give the project a configuration|Give a project a configuration]].")]),e._v(" "),a("h3",{attrs:{id:"_4-4-accessing-the-configuration"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_4-4-accessing-the-configuration"}},[e._v("#")]),e._v(" 4.4 - Accessing the Configuration")]),e._v(" "),a("p",[e._v("In the previous step where you crearted the load balancer, an "),a("em",[e._v("AWS Secrets Manager")]),e._v(" secret would have been created. You should be able to see that on your "),a("a",{attrs:{href:"https://ap-southeast-1.console.aws.amazon.com/secretsmanager/home?region=ap-southeast-1#/listSecrets",target:"_blank",rel:"noopener noreferrer"}},[e._v("Secrets Manager console"),a("OutboundLink")],1),e._v(".")]),e._v(" "),a("p",[e._v("The service just created will have the "),a("code",[e._v("JUICE_CONFIG")]),e._v(" environment variable referencing this secret, however\nthe service will not yet be able to access that secret, without a policy in place.\nFor security reasons we do not enable this access in the Cloudformation scripts. We need you to explicitly enable access to Secrets Manager secrets.")]),e._v(" "),a("p",[e._v("Take a look at the service log file for the latest stopped tak, and will indicate the "),a("em",[a("strong",[e._v("assumed role")])]),e._v(", and the "),a("em",[a("strong",[e._v("action")])]),e._v(" and "),a("em",[a("strong",[e._v("resource")])]),e._v(" the role needs to grant.")]),e._v(" "),a("p",[e._v("First go to the "),a("a",{attrs:{href:"https://ap-southeast-1.console.aws.amazon.com/secretsmanager/home?region=ap-southeast-1#!/listSecrets",target:"_blank",rel:"noopener noreferrer"}},[e._v("Secrets Manager Console page"),a("OutboundLink")],1),e._v(" for the region, and look up the ARN for the secret mentioned in the error.")]),e._v(" "),a("p",[e._v("Next, go to your "),a("a",{attrs:{href:"https://console.aws.amazon.com/iam/home?#/roles",target:"_blank",rel:"noopener noreferrer"}},[e._v("IAM Role Console page"),a("OutboundLink")],1),e._v(" and search for the role\nmatching the ARN in the error. For example, role "),a("code",[e._v("myenv-myproject-ECSRole")]),e._v(".")]),e._v(" "),a("p",[e._v("Add the following inline policy, replacing the Resource ARN with that of the secret.")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",[a("code",[e._v('{\n    "Version": "2012-10-17",\n    "Statement": [\n        {\n            "Effect": "Allow",\n            "Action": "secretsmanager:GetSecretValue",\n            "Resource": "arn:aws:secretsmanager:ap-southeast-1:1234567890:secret:j-myenv-myproject-Xxyzlj",\n        }\n    ]\n}\n')])])]),a("h2",{attrs:{id:"step-5-slave-nodes"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#step-5-slave-nodes"}},[e._v("#")]),e._v(" Step 5 - Slave Nodes")]),e._v(" "),a("h3",{attrs:{id:"prerequisites"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#prerequisites"}},[e._v("#")]),e._v(" Prerequisites")]),e._v(" "),a("p",[e._v("By the time you come here, you should have provisioned an application and have it running correctly.")]),e._v(" "),a("p",[e._v("In this step we piggyback a new ECR service onto an existing application, it's load balancer, etc.  The application endpoint remains the same, but request URLs with a specified prefix will be routed to this new service.")]),e._v(" "),a("p",[a("img",{attrs:{src:"https://user-images.githubusercontent.com/848697/92301349-c60b0d00-ef95-11ea-88d8-17887bb8006b.png",alt:"ecs-piggyback"}})]),e._v(" "),a("h3",{attrs:{id:"initial-steps"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#initial-steps"}},[e._v("#")]),e._v(" Initial Steps")]),e._v(" "),a("p",[e._v("If you have not previously done so, create an ECR repository to contain the Docker images for the piggyback application. You can do this using the step shown "),a("a",{attrs:{href:"https://github.com/tooltwist/aws-explorer/wiki/Manually-provisioning-a-project#step-one---create-an-ecr-repository-first-time-only",target:"_blank",rel:"noopener noreferrer"}},[e._v("here"),a("OutboundLink")],1),e._v(", but do not proceed on to create the load balancer.")]),e._v(" "),a("h3",{attrs:{id:"provisioning-3"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#provisioning-3"}},[e._v("#")]),e._v(" Provisioning")]),e._v(" "),a("p",[e._v("This is a simple process using a Cloudformation template. Go to your "),a("a",{attrs:{href:"https://ap-southeast-1.console.aws.amazon.com/cloudformation/home?region=ap-southeast-1#/stacks",target:"_blank",rel:"noopener noreferrer"}},[e._v("Cloudformation"),a("OutboundLink")],1),e._v(" stacks page. Select "),a("code",[e._v("Create stack -> with new resources (standard)")]),e._v(". Copy in the URL of the template below and press "),a("em",[e._v("Next")]),e._v(" then enter the fields as discussed below.")]),e._v(" "),a("p",[e._v("The values for environment "),a("code",[e._v("EEEEEE")]),e._v(", prefix "),a("code",[e._v("PPP")]),e._v(", and application "),a("code",[e._v("AAAAAA")]),e._v(" "),a("em",[e._v("must")]),e._v(" be the same as when the environment and project were created. After filling in the fields as described below, skip through the remaining pages. No additional input is required unless specifically mentioned.")]),e._v(" "),a("h4",{attrs:{id:"template-5"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#template-5"}},[e._v("#")]),e._v(" Template")]),e._v(" "),a("p",[a("code",[e._v("https://s3-ap-southeast-1.amazonaws.com/tooltwist.aws-explorer.templates.2020-09-02/91.extra.cf")])]),e._v(" "),a("p",[e._v("To use this template, you must have created your application using the 2020-09-02 or later templates.")]),e._v(" "),a("h4",{attrs:{id:"fields-5"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#fields-5"}},[e._v("#")]),e._v(" Fields")]),e._v(" "),a("table",[a("thead",[a("tr",[a("th",[e._v("Field")]),e._v(" "),a("th",[e._v("Description")])])]),e._v(" "),a("tbody",[a("tr",[a("td",[e._v("Stack Name")]),e._v(" "),a("td",[e._v("EEEEEE-AAAAASSS-SSSSS  (e.g. 'test-acme-api2')")])]),e._v(" "),a("tr",[a("td",[e._v("Prefix")]),e._v(" "),a("td",[e._v("PPP- (e.g. 'v1-')")])]),e._v(" "),a("tr",[a("td",[e._v("Environment Name")]),e._v(" "),a("td",[e._v("EEEEEE (e.g. test)")])]),e._v(" "),a("tr",[a("td",[e._v("Application Name")]),e._v(" "),a("td",[e._v("AAAAA (e.g. acme)")])]),e._v(" "),a("tr",[a("td",[e._v("Suffix")]),e._v(" "),a("td",[e._v("Suffix to distinguish this extra service")])]),e._v(" "),a("tr",[a("td",[e._v("DockerImageRepository")]),e._v(" "),a("td",[e._v("our ECR repo (e.g. tooltwist-acme)")])]),e._v(" "),a("tr",[a("td",[e._v("Version")]),e._v(" "),a("td",[e._v("Our initial seed version ('initial')")])]),e._v(" "),a("tr",[a("td",[e._v("Desired count")]),e._v(" "),a("td",[e._v("start with 1")])]),e._v(" "),a("tr",[a("td",[e._v("Memory")]),e._v(" "),a("td",[e._v("256 for NodeJS, more for Java")])]),e._v(" "),a("tr",[a("td",[e._v("Port")]),e._v(" "),a("td",[e._v("Ask the development team (usually 3000 or 4000)")])]),e._v(" "),a("tr",[a("td",[e._v("Rule Number")]),e._v(" "),a("td",[e._v("Next in sequence for Load Balancer rules (default = 1)")])]),e._v(" "),a("tr",[a("td",[e._v("Path")]),e._v(" "),a("td",[e._v("Which URLs get sent to this service (e.g. /api2)")])]),e._v(" "),a("tr",[a("td",[e._v("Healthcheck path")]),e._v(" "),a("td",[e._v("(e.g. /api2/healthcheck)")])]),e._v(" "),a("tr",[a("td",[e._v("Name")]),e._v(" "),a("td",[e._v("Environment name (e.g. IS_API2_SERVER) - "),a("em",[a("strong",[e._v("Do NOT define JUICE_CONFIG here")])])])])])]),e._v(" "),a("p",[e._v("Select "),a("em",[e._v("I acknowledge that AWS CloudFormation might create IAM resources")]),e._v(" on the final page and press "),a("em",[e._v("Create Stack")]),e._v(".")]),e._v(" "),a("h4",{attrs:{id:"what-this-creates-4"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#what-this-creates-4"}},[e._v("#")]),e._v(" What this creates")]),e._v(" "),a("p",[e._v("1x Target Group")]),e._v(" "),a("p",[e._v("1x Rule from existing listener to new Target Group")]),e._v(" "),a("p",[e._v("1x Service")]),e._v(" "),a("p",[e._v("1x Task Definition")])])}),[],!1,null,null,null);t.default=r.exports}}]);