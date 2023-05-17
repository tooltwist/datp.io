(window.webpackJsonp=window.webpackJsonp||[]).push([[232],{751:function(e,t,a){"use strict";a.r(t);var s=a(60),r=Object(s.a)({},(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[a("h1",{attrs:{id:"_1-add-datp-to-your-restify-server"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1-add-datp-to-your-restify-server"}},[e._v("#")]),e._v(" 1 - Add DATP to your Restify server")]),e._v(" "),a("h2",{attrs:{id:"add-datp-to-your-project"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#add-datp-to-your-project"}},[e._v("#")]),e._v(" Add DATP to your project")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",[a("code",[e._v("mv index.js app.js\nnpm install @tooltwist/datp\nnpm install esm\n")])])]),a("h2",{attrs:{id:"changes-to-your-source-code"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#changes-to-your-source-code"}},[e._v("#")]),e._v(" Changes to your source code")]),e._v(" "),a("p",[e._v("In VSCode, right click on "),a("code",[e._v("COURSE-FILES/3.datp/app-example1.js")]),e._v(" and select "),a("em",[e._v("Open to the Side")]),e._v(". This will allow you to view your app.js in the left pain, and the updated version in the right pane.")]),e._v(" "),a("p",[e._v("These are the changes required to add DATP to your Restify server:")]),e._v(" "),a("ol",[a("li",[e._v("Import DATP and the function addRoute() function.")]),e._v(" "),a("li",[e._v("Surrounding our code with an asynchronous main() function. This allows us to use await and try/catch in our code.")]),e._v(" "),a("li",[e._v("Use "),a("em",[e._v("DATP.restifyMasterServer()")]),e._v(" instead of "),a("em",[e._v("restify.createServer()")]),e._v(".")]),e._v(" "),a("li",[e._v("Register our routes using "),a("em",[e._v("addRoute()")]),e._v(" rather than "),a("em",[e._v("server.get()")]),e._v(". We'll ignore the server.head() in this tutorial.")]),e._v(" "),a("li",[e._v("Start the server using "),a("em",[e._v("DATP.goLive()")]),e._v(" rather than "),a("em",[e._v("server.listen()")]),e._v(".")])]),e._v(" "),a("h2",{attrs:{id:"configuration-files"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#configuration-files"}},[e._v("#")]),e._v(" Configuration files")]),e._v(" "),a("p",[e._v("When DATP is run, it's configuration is using JSON, and accessed using a library named "),a("em",[e._v("Juice")]),e._v(". This library allows the JSON file to be accessed from the file system during development, or from AWS Secrets Manager or another secure credentials store when running in a production environment.")]),e._v(" "),a("p",[e._v("Inside your project folder, create a folder named "),a("code",[e._v("util-vsc")]),e._v(" and copy these files into that folder.")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",[a("code",[e._v("COURSE_FILES/3.datp/run-master  \nCOURSE_FILES/3.datp/dev-master  \nCOURSE_FILES/3.datp/config-master.json\n")])])]),a("p",[e._v("The location of the JSON configuration file is specified using an environment variable. The "),a("code",[e._v("run-master")]),e._v(" script sets that environment variable and then runs our server.")]),e._v(" "),a("h2",{attrs:{id:"database-and-redis"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#database-and-redis"}},[e._v("#")]),e._v(" Database and REDIS")]),e._v(" "),a("p",[e._v("Our devcontainer definitions cause Docker to start Docker containers for MySQL and also REDIS. It also starts a Docker container for a utility named "),a("em",[e._v("phpMyadmin")]),e._v(". This is a browser-based database administration tool, and we can use it to load our initial data into our database.")]),e._v(" "),a("ol",[a("li",[a("p",[e._v("Open phpMyAdmin at http://localhost:33360. The pssword is root, and there is no password.")])]),e._v(" "),a("li",[a("p",[e._v("Have a look around this tool.")])]),e._v(" "),a("li",[a("p",[e._v("Create a database named "),a("code",[e._v("datp")]),e._v(", with encoding "),a("code",[e._v("utf8_unicode_ci")]),e._v(".")])]),e._v(" "),a("li",[a("p",[e._v("Use the Import tab to load data from "),a("code",[e._v("COURSE_FILES/3.datp/initial-data.sql")]),e._v(".")])])]),e._v(" "),a("p",[e._v("ZZZZ Need to simplify the data file")]),e._v(" "),a("h2",{attrs:{id:"run-our-new-datp-server"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#run-our-new-datp-server"}},[e._v("#")]),e._v(" Run our new DATP server")]),e._v(" "),a("ol",[a("li",[e._v("In the terminal [within VSC], start the server with "),a("em",[e._v("run-master")]),e._v(".")])]),e._v(" "),a("div",{staticClass:"language-bash line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[e._v("util-vsc/run-master\n")])]),e._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[e._v("1")]),a("br")])]),a("ol",{attrs:{start:"2"}},[a("li",[e._v("If the following URLs by either clicking on the following links, or test them using "),a("code",[e._v("curl")]),e._v(".")])]),e._v(" "),a("blockquote",[a("p",[e._v("http://localhost:33370/datp/1.0/healthcheck"),a("br"),e._v("\nhttp://localhost:33370/datp/1.0/ping"),a("br"),e._v("\nhttp://localhost:33370/myProject/1.0/hello/fred")])]),e._v(" "),a("p",[e._v("You might have noticed that our original Restify URL with the path "),a("em",[e._v("/hello/fred")]),e._v(" is now "),a("em",[e._v("/myProject/1.0/hello/fred")]),e._v(". This is because the "),a("code",[e._v("addRoute()")]),e._v(" function promotes the best practices of namespaces and API versioning.")]),e._v(" "),a("h2",{attrs:{id:"automatic-restart"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#automatic-restart"}},[e._v("#")]),e._v(" Automatic Restart")]),e._v(" "),a("p",[e._v("If you modify your "),a("code",[e._v("app.js")]),e._v(", you will find that the changes aren't deployed until you restart the server. To speed up development, we can use a utility named "),a("code",[e._v("nodemon")]),e._v(", by using "),a("code",[e._v("dev-master")]),e._v(" instead of "),a("code",[e._v("run-master")]),e._v(".")]),e._v(" "),a("ol",[a("li",[e._v("Edit "),a("code",[e._v("package.json")]),e._v(" and update the "),a("em",[e._v("scripts")]),e._v(" section to include a "),a("em",[e._v("vsc_dev")]),e._v(" entry:")])]),e._v(" "),a("div",{staticClass:"language-json line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-json"}},[a("code",[e._v("  "),a("span",{pre:!0,attrs:{class:"token property"}},[e._v('"scripts"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("{")]),e._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[e._v('"test"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[e._v('"echo \\"Error: no test specified\\" && exit 1"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(",")]),e._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[e._v('"vsc-dev"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[e._v('"nodemon -w /workspace -x node -r esm app.js"')]),e._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(",")]),e._v("\n")])]),e._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[e._v("1")]),a("br"),a("span",{staticClass:"line-number"},[e._v("2")]),a("br"),a("span",{staticClass:"line-number"},[e._v("3")]),a("br"),a("span",{staticClass:"line-number"},[e._v("4")]),a("br")])]),a("ol",{attrs:{start:"2"}},[a("li",[a("p",[e._v("If your server is still running, kill it using "),a("strong",[e._v("<control>")]),e._v("-"),a("strong",[e._v("C")]),e._v(".")])]),e._v(" "),a("li",[a("p",[e._v("Start the server using "),a("em",[e._v("dev-master")]),e._v(":")])])]),e._v(" "),a("div",{staticClass:"language-bash line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[e._v("util-vsc/dev-master\n")])]),e._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[e._v("1")]),a("br")])]),a("ol",{attrs:{start:"4"}},[a("li",[e._v("If you make any change to "),a("code",[e._v("app.js")]),e._v(" and save the file, you will see the server restart.")])]),e._v(" "),a("h2",{attrs:{id:"menu-option-to-start-the-server"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#menu-option-to-start-the-server"}},[e._v("#")]),e._v(" Menu option to start the server")]),e._v(" "),a("p",[e._v("On the pane at the bottom of VSCode where it says "),a("em",[e._v("PROBLEMS OUTPUT DEBUG CONSOLE TERMINAL PORTS")]),e._v(", on the right side there is a + and down arrow. If you click on that arrow you'll see an option 'MASTER', that will run the "),a("em",[e._v("dev-master")]),e._v(" script in a new terminal.")]),e._v(" "),a("h2",{attrs:{id:"next"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#next"}},[e._v("#")]),e._v(" Next...")]),e._v(" "),a("p",[e._v("In the next exercise we will start calling DATP transactions from the administration tool, MONDAT.")]),e._v(" "),a("hr")])}),[],!1,null,null,null);t.default=r.exports}}]);