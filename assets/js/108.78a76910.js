(window.webpackJsonp=window.webpackJsonp||[]).push([[108],{628:function(e,t,a){"use strict";a.r(t);var r=a(60),s=Object(r.a)({},(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[a("h1",{attrs:{id:"step-5-slave-nodes"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#step-5-slave-nodes"}},[e._v("#")]),e._v(" Step 5 - Slave nodes")]),e._v(" "),a("h3",{attrs:{id:"prerequisites"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#prerequisites"}},[e._v("#")]),e._v(" Prerequisites")]),e._v(" "),a("p",[e._v("By the time you come here, you should have provisioned an application and have it running correctly.")]),e._v(" "),a("p",[e._v("In this step we piggyback a new ECR service onto an existing application, it's load balancer, etc.  The application endpoint remains the same, but request URLs with a specified prefix will be routed to this new service.")]),e._v(" "),a("p",[a("img",{attrs:{src:"https://user-images.githubusercontent.com/848697/92301349-c60b0d00-ef95-11ea-88d8-17887bb8006b.png",alt:"ecs-piggyback"}})]),e._v(" "),a("h3",{attrs:{id:"initial-steps"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#initial-steps"}},[e._v("#")]),e._v(" Initial Steps")]),e._v(" "),a("p",[e._v("If you have not previously done so, create an ECR repository to contain the Docker images for the piggyback application. You can do this using the step shown "),a("a",{attrs:{href:"https://github.com/tooltwist/aws-explorer/wiki/Manually-provisioning-a-project#step-one---create-an-ecr-repository-first-time-only",target:"_blank",rel:"noopener noreferrer"}},[e._v("here"),a("OutboundLink")],1),e._v(", but do not proceed on to create the load balancer.")]),e._v(" "),a("h3",{attrs:{id:"provisioning"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#provisioning"}},[e._v("#")]),e._v(" Provisioning")]),e._v(" "),a("p",[e._v("This is a simple process using a Cloudformation template. Go to your "),a("a",{attrs:{href:"https://ap-southeast-1.console.aws.amazon.com/cloudformation/home?region=ap-southeast-1#/stacks",target:"_blank",rel:"noopener noreferrer"}},[e._v("Cloudformation"),a("OutboundLink")],1),e._v(" stacks page. Select "),a("code",[e._v("Create stack -> with new resources (standard)")]),e._v(". Copy in the URL of the template below and press "),a("em",[e._v("Next")]),e._v(" then enter the fields as discussed below.")]),e._v(" "),a("p",[e._v("The values for environment "),a("code",[e._v("EEEEEE")]),e._v(", prefix "),a("code",[e._v("PPP")]),e._v(", and application "),a("code",[e._v("AAAAAA")]),e._v(" "),a("em",[e._v("must")]),e._v(" be the same as when the environment and project were created. After filling in the fields as described below, skip through the remaining pages. No additional input is required unless specifically mentioned.")]),e._v(" "),a("h4",{attrs:{id:"template"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#template"}},[e._v("#")]),e._v(" Template")]),e._v(" "),a("p",[a("code",[e._v("https://s3-ap-southeast-1.amazonaws.com/tooltwist.aws-explorer.templates.2020-09-02/91.extra.cf")])]),e._v(" "),a("p",[e._v("To use this template, you must have created your application using the 2020-09-02 or later templates.")]),e._v(" "),a("h4",{attrs:{id:"fields"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#fields"}},[e._v("#")]),e._v(" Fields")]),e._v(" "),a("table",[a("thead",[a("tr",[a("th",[e._v("Field")]),e._v(" "),a("th",[e._v("Description")])])]),e._v(" "),a("tbody",[a("tr",[a("td",[e._v("Stack Name")]),e._v(" "),a("td",[e._v("EEEEEE-AAAAASSS-SSSSS  (e.g. 'test-acme-api2')")])]),e._v(" "),a("tr",[a("td",[e._v("Prefix")]),e._v(" "),a("td",[e._v("PPP- (e.g. 'v1-')")])]),e._v(" "),a("tr",[a("td",[e._v("Environment Name")]),e._v(" "),a("td",[e._v("EEEEEE (e.g. test)")])]),e._v(" "),a("tr",[a("td",[e._v("Application Name")]),e._v(" "),a("td",[e._v("AAAAA (e.g. acme)")])]),e._v(" "),a("tr",[a("td",[e._v("Suffix")]),e._v(" "),a("td",[e._v("Suffix to distinguish this extra service")])]),e._v(" "),a("tr",[a("td",[e._v("DockerImageRepository")]),e._v(" "),a("td",[e._v("our ECR repo (e.g. tooltwist-acme)")])]),e._v(" "),a("tr",[a("td",[e._v("Version")]),e._v(" "),a("td",[e._v("Our initial seed version ('initial')")])]),e._v(" "),a("tr",[a("td",[e._v("Desired count")]),e._v(" "),a("td",[e._v("start with 1")])]),e._v(" "),a("tr",[a("td",[e._v("Memory")]),e._v(" "),a("td",[e._v("256 for NodeJS, more for Java")])]),e._v(" "),a("tr",[a("td",[e._v("Port")]),e._v(" "),a("td",[e._v("Ask the development team (usually 3000 or 4000)")])]),e._v(" "),a("tr",[a("td",[e._v("Rule Number")]),e._v(" "),a("td",[e._v("Next in sequence for Load Balancer rules (default = 1)")])]),e._v(" "),a("tr",[a("td",[e._v("Path")]),e._v(" "),a("td",[e._v("Which URLs get sent to this service (e.g. /api2)")])]),e._v(" "),a("tr",[a("td",[e._v("Healthcheck path")]),e._v(" "),a("td",[e._v("(e.g. /api2/healthcheck)")])]),e._v(" "),a("tr",[a("td",[e._v("Name")]),e._v(" "),a("td",[e._v("Environment name (e.g. IS_API2_SERVER) - "),a("em",[a("strong",[e._v("Do NOT define JUICE_CONFIG here")])])])])])]),e._v(" "),a("p",[e._v("Select "),a("em",[e._v("I acknowledge that AWS CloudFormation might create IAM resources")]),e._v(" on the final page and press "),a("em",[e._v("Create Stack")]),e._v(".")]),e._v(" "),a("h4",{attrs:{id:"what-this-creates"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#what-this-creates"}},[e._v("#")]),e._v(" What this creates")]),e._v(" "),a("p",[e._v("1x Target Group")]),e._v(" "),a("p",[e._v("1x Rule from existing listener to new Target Group")]),e._v(" "),a("p",[e._v("1x Service")]),e._v(" "),a("p",[e._v("1x Task Definition")])])}),[],!1,null,null,null);t.default=s.exports}}]);