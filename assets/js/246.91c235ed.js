(window.webpackJsonp=window.webpackJsonp||[]).push([[246],{767:function(t,e,s){"use strict";s.r(e);var a=s(60),n=Object(a.a)({},(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",{attrs:{id:"barrage-testing"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#barrage-testing"}},[t._v("#")]),t._v(" Barrage testing")]),t._v(" "),s("h2",{attrs:{id:"install-the-initial-files"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#install-the-initial-files"}},[t._v("#")]),t._v(" Install the initial files")]),t._v(" "),s("ol",[s("li",[s("p",[t._v("Create a folder "),s("code",[t._v("myProject/util-vsc/barrage")]),t._v(".")])]),t._v(" "),s("li",[s("p",[t._v("Copy all the files from "),s("code",[t._v("COURSE-FILES/3.2-barrage-testing")]),t._v(" into this folder.")])]),t._v(" "),s("li",[s("p",[t._v("In a VSCode Terminal run these commands:")])])]),t._v(" "),s("div",{staticClass:"language-sh line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-sh"}},[s("code",[s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v("cd")]),t._v(" /workspace/myProject/util-vsc/barrage\n"),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("npm")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("install")]),t._v("\n./1.test-hello.sh\n")])]),t._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[t._v("1")]),s("br"),s("span",{staticClass:"line-number"},[t._v("2")]),s("br"),s("span",{staticClass:"line-number"},[t._v("3")]),s("br")])]),s("ol",{attrs:{start:"3"}},[s("li",[s("p",[t._v("Stretch the terminal to be as large as you can make it,\nthen run "),s("code",[t._v("./1.ping.sh")]),t._v(".")])]),t._v(" "),s("li",[s("p",[t._v("Press 's' to start the test.")])])]),t._v(" "),s("div",{staticClass:"custom-block tip"},[s("p",{staticClass:"custom-block-title"},[t._v("So what is it doing?")]),t._v(" "),s("p",[t._v("Each cell on the grid represents a seperate transaction.\nYour server is called to start each transaction, and\nthe cell color and letter gets changed.\nThe barrage tester provided a webhook and keeps track of the transactions, so when it receives notification of a transaction copmpleting it places a tick in the relevant position on the grid.")])]),t._v(" "),s("ol",{attrs:{start:"5"}},[s("li",[t._v("The 'h' command will give you the valid commands, but in short,\nuse 't' to set the number of tests, and then 'c' to try to get it to\nfit on the screen.\nSo for example 't 10000' will set ten thousands transactions, and\nthen hopefully 'c 250' will stop it making a mess of the page.")])]),t._v(" "),s("h2",{attrs:{id:"waiting-transactions"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#waiting-transactions"}},[t._v("#")]),t._v(" Waiting transactions")]),t._v(" "),s("p",[t._v("Run "),s("code",[t._v("./2.example-pipeline.sh")]),t._v(" and starting the test.")]),t._v(" "),s("p",[t._v("You will see the entire screen covered with the letter 'R'.")]),t._v(" "),s("p",[t._v("If you go to the queues page on MONDAT you will see\nthat node group 'slave1' has about ten thousand transactions\nqueued, but it has zero workers, because we've never started a server\nfor slave1.")]),t._v(" "),s("p",[t._v("We'll do that in a later section, but for now we'll just leave these\nin the queue.")]),t._v(" "),s("p",[t._v("One way of handling back end outages is to continue to accept and queue transactions, but turn off the workers feeding them to\nthe back end. In this way we don't fail the transactions - we just buffer them up until they can be processed.")]),t._v(" "),s("p",[t._v("This barrage tester can help you check that all the transactions\ncomplete correctly, as you experiment with various failure scenarios.")]),t._v(" "),s("h2",{attrs:{id:"pre-production-tests"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#pre-production-tests"}},[t._v("#")]),t._v(" Pre-production tests")]),t._v(" "),s("p",[t._v("Before putting any system into production, you should stress the system using your load testing scripts, and then run this barrage\ntest.\nAs the system is placed under increasing stress you may see\nit stutter. Ideally you place the high load pipelines in node groups\nbehind their own queues, and you can control how much work they take\non by adjusting the number of workers.")]),t._v(" "),s("div",{staticClass:"custom-block warning"},[s("p",{staticClass:"custom-block-title"},[t._v("Exercise")]),t._v(" "),s("p",[t._v("Create a test for "),s("code",[t._v("myPipeline")]),t._v(".")])])])}),[],!1,null,null,null);e.default=n.exports}}]);