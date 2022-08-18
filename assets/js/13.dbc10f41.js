(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{474:function(t,e,s){t.exports=s.p+"assets/img/mondat-tests.6a341e23.png"},475:function(t,e,s){t.exports=s.p+"assets/img/mondat-test-1.5ad41fa0.png"},476:function(t,e,s){t.exports=s.p+"assets/img/mondat-test-2.c2e5789f.png"},477:function(t,e,s){t.exports=s.p+"assets/img/mondat-test-3.4a1b24a3.png"},478:function(t,e,s){t.exports=s.p+"assets/img/mondat-test-4.6590e6e0.png"},479:function(t,e,s){t.exports=s.p+"assets/img/mondat-test-5.c4d5afcf.png"},480:function(t,e,s){t.exports=s.p+"assets/img/mondat-test-6.2440e623.png"},481:function(t,e,s){t.exports=s.p+"assets/img/mondat-test-7.3de3e7a6.png"},482:function(t,e,s){t.exports=s.p+"assets/img/mondat-test-8.1154d897.png"},483:function(t,e,s){t.exports=s.p+"assets/img/mondat-test-9.c87bf0f3.png"},484:function(t,e,s){t.exports=s.p+"assets/img/mondat-test-10.5efae9f6.png"},608:function(t,e,s){"use strict";s.r(e);var a=s(60),n=Object(a.a)({},(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"testing"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#testing"}},[t._v("#")]),t._v(" Testing")]),t._v(" "),a("p",[t._v("The testing page allows a developer to quickly define and run tests on pipelines.\nThis provides a fast cycle time as you are coding, similar to tools such as "),a("a",{attrs:{href:"https://www.postman.com/",target:"_blank",rel:"noopener noreferrer"}},[t._v("Postman"),a("OutboundLink")],1),t._v("\nbut providing a simpler interface, and also features for polling and checking the result of a test.")]),t._v(" "),a("p",[a("img",{attrs:{src:s(474),alt:"DATP Node"}})]),t._v(" "),a("h2",{attrs:{id:"test-definition"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#test-definition"}},[t._v("#")]),t._v(" Test definition")]),t._v(" "),a("p",[t._v("This tab provides information for the tests page, and also allows you to specify the pipeline being tested.")]),t._v(" "),a("p",[a("img",{attrs:{src:s(475),alt:"DATP Node"}})]),t._v(" "),a("h2",{attrs:{id:"input-tab"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#input-tab"}},[t._v("#")]),t._v(" Input tab")]),t._v(" "),a("p",[t._v("Once you've chosen which pipeline you are going to test, you need to specify what you are going to send to the pipeline. This data is in JSON format. The metadata corresponds to the format used to call the\ntransaction programatically, and the data is passed directly to the first step of the pipeline.")]),t._v(" "),a("p",[a("img",{attrs:{src:s(476),alt:"DATP Node"}})]),t._v(" "),a("p",[t._v("Pressing the "),a("code",[t._v("Run test")]),t._v(" button will send this input to the pipeline.")]),t._v(" "),a("h2",{attrs:{id:"response-tab"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#response-tab"}},[t._v("#")]),t._v(" Response tab")]),t._v(" "),a("p",[t._v("Once the test is started, focus is moved to this tab, which will wait for the initial\nreply from the API. If "),a("code",[t._v("metadata.reply")]),t._v(" was "),a("code",[t._v("longpoll")]),t._v(", the server will wait for up to 15 seconds\nfor the transaction to complete, before replying.")]),t._v(" "),a("p",[t._v("If the transaction has completed, it's status will be shown on this page.\nIf the transaction has not completed, the reply will show a status of "),a("code",[t._v("running")]),t._v(",\nand focus will shift to the next "),a("code",[t._v("Polling")]),t._v(" tab.")]),t._v(" "),a("p",[a("img",{attrs:{src:s(477),alt:"DATP Node"}})]),t._v(" "),a("h2",{attrs:{id:"polling-tab"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#polling-tab"}},[t._v("#")]),t._v(" Polling tab")]),t._v(" "),a("p",[t._v("If the initial API call to start the pipeline/transaction did not return\nwith the transaction complete, then this tab shows the output of each subsequent polling attempt,\nans will keep trying until the server returns a transaction status.")]),t._v(" "),a("p",[a("img",{attrs:{src:s(478),alt:"DATP Node"}})]),t._v(" "),a("h2",{attrs:{id:"transaction-tab"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#transaction-tab"}},[t._v("#")]),t._v(" Transaction tab")]),t._v(" "),a("p",[t._v("This tab shows an audit trail of the transaction, as it runs through it's pipeline, steps, and\nany nested pipelines. By clicking on the transaction type, pipeline, or different steps, the information\non the right is displayed relevant to that part of the transaction processing.")]),t._v(" "),a("h3",{attrs:{id:"log-entries"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#log-entries"}},[t._v("#")]),t._v(" Log Entries")]),t._v(" "),a("p",[t._v("Log entries for this step - and only this step - are displayed here.\nThis is handy during development, and load testing, because the log entries are specific to this step,\nand not intermixed with log messages from other transactions or parts of the application.")]),t._v(" "),a("p",[a("img",{attrs:{src:s(479),alt:"DATP Node"}})]),t._v(" "),a("h3",{attrs:{id:"details"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#details"}},[t._v("#")]),t._v(" Details")]),t._v(" "),a("p",[t._v("This shows a quick summary of the transaction, pipeline or step.\n"),a("img",{attrs:{src:s(480),alt:"DATP Node"}})]),t._v(" "),a("h3",{attrs:{id:"input"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#input"}},[t._v("#")]),t._v(" Input")]),t._v(" "),a("p",[t._v("This shows the data that was passed in to the pipeline or step.\n"),a("img",{attrs:{src:s(481),alt:"DATP Node"}})]),t._v(" "),a("h3",{attrs:{id:"output"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#output"}},[t._v("#")]),t._v(" Output")]),t._v(" "),a("p",[t._v("This shows the data that was passed out of the pipeline or step.\n"),a("img",{attrs:{src:s(482),alt:"DATP Node"}})]),t._v(" "),a("h3",{attrs:{id:"step-definition"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#step-definition"}},[t._v("#")]),t._v(" Step definition")]),t._v(" "),a("p",[t._v("This shows the JSON configuration the pipeline or step - effectively the same information entered on the Pipeline defintion page. If the version of the pipeline has been changed, this will show the definition that was\nactually used at the time the transaction ran.")]),t._v(" "),a("p",[a("img",{attrs:{src:s(483),alt:"DATP Node"}})]),t._v(" "),a("h3",{attrs:{id:"step-data"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#step-data"}},[t._v("#")]),t._v(" Step Data")]),t._v(" "),a("p",[t._v("This is the internal transaction status data maintained by DATP as the transaction runs.\n"),a("img",{attrs:{src:s(484),alt:"DATP Node"}})])])}),[],!1,null,null,null);e.default=n.exports}}]);