(window.webpackJsonp=window.webpackJsonp||[]).push([[44],{455:function(t,e,a){t.exports=a.p+"assets/img/mondat-home.72852ed2.png"},601:function(t,e,a){"use strict";a.r(e);var s=a(60),o=Object(s.a)({},(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",{attrs:{id:"installation"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#installation"}},[t._v("#")]),t._v(" Installation")]),t._v(" "),s("p",[t._v("While DATP can be installed and used many different ways, it is recommended to start by using the following instructions to set up\na development environment on your desktop or laptop.")]),t._v(" "),s("p",[t._v("This quick install uses Visual Studio Code and Docker to run up a\ndevelopment environment in minutes, without the need to\ninstall databases and other infrastructure on your development machine.")]),t._v(" "),s("p",[t._v("If you wish to install the database, REDIS or other components on\nyour machine later that can be done incrementally from this already\nworking configuration.")]),t._v(" "),s("h2",{attrs:{id:"instructions-for-developers"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#instructions-for-developers"}},[t._v("#")]),t._v(" Instructions for Developers")]),t._v(" "),s("p",[t._v("Version 4, October 2021")]),t._v(" "),s("h3",{attrs:{id:"prerequisites"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#prerequisites"}},[t._v("#")]),t._v(" Prerequisites")]),t._v(" "),s("ul",[s("li",[t._v("A machine running Windows or OSX (Intel or M1)")]),t._v(" "),s("li",[t._v("Docker Desktop")]),t._v(" "),s("li",[t._v("Vscode + extensions (Remote Container + ESLint)")]),t._v(" "),s("li",[t._v("Git Bash (on Windows)")])]),t._v(" "),s("p",[t._v("You will also need your "),s("code",[t._v("username")]),t._v("/"),s("code",[t._v("password")]),t._v(" to access the git repos.")]),t._v(" "),s("h3",{attrs:{id:"step-1-download-the-code"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#step-1-download-the-code"}},[t._v("#")]),t._v(" Step 1 - Download the code")]),t._v(" "),s("p",[t._v("In Terminal on Mac, or Git Bash on Windows:")]),t._v(" "),s("p",[t._v("A) Choose an install location that does not have any spaces in the path. For example "),s("code",[t._v("c:/Users/Fred Smith/xyz")]),t._v(" will not work, but "),s("code",[t._v("c:/Users/FredSmith/xyz")]),t._v(" or "),s("code",[t._v("c:/Projects/xyz")]),t._v(" will work.")]),t._v(" "),s("p",[t._v("B) Don't use any existing AWS credentials")]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",[s("code",[t._v("$ export AWS_PROFILE=XYZ\n")])])]),s("p",[t._v("C) Clone the project. You'll need to enter your username and password for the git repo on AWS.")]),t._v(" "),s("p",[t._v("Windows or Intel Mac:")]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",[s("code",[t._v("$ git clone https://git-codecommit.ap-southeast-1.amazonaws.com/v1/repos/datp-xpanse-dev\n")])])]),s("p",[t._v("M1 Mac:")]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",[s("code",[t._v("$ git clone https://git-codecommit.ap-southeast-1.amazonaws.com/v1/repos/datp-xpanse-dev -b mac-m1\n")])])]),s("p",[t._v("D) Load DATP and MONDAT")]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",[s("code",[t._v("$ cd datp-xpanse-dev\n$ sh ./0.sync-repositories\n")])])]),s("h3",{attrs:{id:"step-2-docker-config"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#step-2-docker-config"}},[t._v("#")]),t._v(" Step 2 - Docker config")]),t._v(" "),s("p",[t._v("Go into Docker Desktop preferences, Resources->File Sharing, and add your installation directory created above (i.e. datp-xpanse-dev)")]),t._v(" "),s("div",{staticStyle:{padding:"10px 25px 30px"}},[s("img",{staticStyle:{width:"690px","border-radius":"3px","box-shadow":"0 10px 15px rgb(0 0 0 / 50%)"},attrs:{src:"/datp-images/install-1.png",alt:"Add Chrome Configuration"}})]),t._v(" "),s("h3",{attrs:{id:"step-3-start-visual-studio-code"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#step-3-start-visual-studio-code"}},[t._v("#")]),t._v(" Step 3 - Start Visual Studio Code")]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",[s("code",[t._v("$ code .\n")])])]),s("h3",{attrs:{id:"step-4-workspace-inside-docker"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#step-4-workspace-inside-docker"}},[t._v("#")]),t._v(" Step 4 - Workspace inside Docker")]),t._v(" "),s("p",[t._v("Press “Reopen in Container” on the bottom right ... or Press the bottom left icon then “Reopen in Container” from the menu at the top.")]),t._v(" "),s("div",{staticStyle:{padding:"10px 25px 30px"}},[s("img",{staticStyle:{width:"690px","border-radius":"3px","box-shadow":"0 10px 15px rgb(0 0 0 / 50%)"},attrs:{src:"/datp-images/install-2.png",alt:"Add Chrome Configuration"}})]),t._v(" "),s("p",[t._v("The first time it runs it takes quite a while, as it builds the Docker container and then installs npm packages. If you want to watch what it's doing, you can show the log file.")]),t._v(" "),s("div",{staticStyle:{padding:"10px 25px 30px"}},[s("img",{staticStyle:{width:"550px","border-radius":"3px"},attrs:{src:"/datp-images/install-3.png",alt:"Add Chrome Configuration"}})]),t._v(" "),s("h3",{attrs:{id:"step-5-load-the-database"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#step-5-load-the-database"}},[t._v("#")]),t._v(" Step 5 - Load the database")]),t._v(" "),s("p",[t._v("Once you see "),s("em",[t._v("Configure Dev Container")]),t._v(" at the bottom, you can load the database. Either:")]),t._v(" "),s("p",[t._v("A) Use the option on the Terminal menu on the right.")]),t._v(" "),s("div",{staticStyle:{padding:"10px 25px 30px"}},[s("img",{staticStyle:{width:"320px","border-radius":"3px"},attrs:{src:"/datp-images/install-4.png",alt:"Add Chrome Configuration"}})]),t._v(" "),s("p",[t._v("B) Or, open a terminal inside vscode and run "),s("code",[t._v("./4.load-data")]),t._v(".")]),t._v(" "),s("p",[t._v("You can then access the database at "),s("a",{attrs:{href:""}},[t._v("http://localhost:33360")]),t._v(", with usename root and no password.")]),t._v(" "),s("h3",{attrs:{id:"step-6-start-the-servers"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#step-6-start-the-servers"}},[t._v("#")]),t._v(" Step 6 - Start the servers")]),t._v(" "),s("p",[t._v("Once the startup completes (the "),s("em",[t._v("Configure Dev Container")]),t._v(" message usually disappears), start the DATP Master server and the Mondat server. This can be done three ways:")]),t._v(" "),s("p",[t._v("A) Press "),s("strong",[t._v("Ctrl/Cmd + Shift + B")]),t._v('\n(This is the "Build" shortcut, and will open two terminal sessions for you).  Or,')]),t._v(" "),s("p",[t._v("B) Use the run-datp-server and run-mondat menu options on the Terminal menu on the right, or")]),t._v(" "),s("p",[t._v("C) Run "),s("code",[t._v("./5.run-master")]),t._v(" and "),s("code",[t._v("./6.run-mondat")]),t._v(" in a terminal inside vscode.")]),t._v(" "),s("h3",{attrs:{id:"ready-to-use"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#ready-to-use"}},[t._v("#")]),t._v(" Ready to use")]),t._v(" "),s("p",[t._v("Wait for these commands to complete. Mondat takes a while - it appears to be finished but is still loading until you see the second "),s("em",[t._v("Listening on: ...")]),t._v(" message.")]),t._v(" "),s("div",{staticStyle:{padding:"10px 25px 30px"}},[s("img",{staticStyle:{width:"490px","border-radius":"3px"},attrs:{src:"/datp-images/install-5.png",alt:"Add Chrome Configuration"}})]),t._v(" "),s("p",[t._v("Once this is complete, your application is running and ready for development work.")]),t._v(" "),s("p",[t._v("You will be able to use the application using the following URLs...")]),t._v(" "),s("h2",{attrs:{id:"urls"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#urls"}},[t._v("#")]),t._v(" URLs")]),t._v(" "),s("h3",{attrs:{id:"datp-healthcheck"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#datp-healthcheck"}},[t._v("#")]),t._v(" DATP healthcheck")]),t._v(" "),s("p",[s("a",{attrs:{href:""}},[t._v("http://localhost:33370/datp/1.0/healthcheck")])]),t._v(" "),s("div",{staticStyle:{padding:"10px 25px 30px"}},[s("img",{staticStyle:{width:"390px","border-radius":"3px"},attrs:{src:"/datp-images/install-6.png",alt:"Add Chrome Configuration"}})]),t._v(" "),s("h3",{attrs:{id:"mondat"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#mondat"}},[t._v("#")]),t._v(" Mondat")]),t._v(" "),s("p",[s("a",{attrs:{href:""}},[t._v("http://localhost:33380/mondat")])]),t._v(" "),s("p",[s("img",{attrs:{src:a(455),alt:"DATP Node"}})]),t._v(" "),s("h3",{attrs:{id:"phpmyadmin"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#phpmyadmin"}},[t._v("#")]),t._v(" PHPMyadmin")]),t._v(" "),s("p",[s("a",{attrs:{href:""}},[t._v("http://localhost:33360/")])]),t._v(" "),s("div",{staticStyle:{padding:"10px 25px 30px"}},[s("img",{staticStyle:{width:"690px","border-radius":"3px"},attrs:{src:"/datp-images/install-8.png",alt:"Add Chrome Configuration"}})])])}),[],!1,null,null,null);e.default=o.exports}}]);