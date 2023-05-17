(window.webpackJsonp=window.webpackJsonp||[]).push([[127],{648:function(t,e,n){"use strict";n.r(e);var s=n(60),o=Object(s.a)({},(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[n("h1",{attrs:{id:"lifecycle-hooks"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#lifecycle-hooks"}},[t._v("#")]),t._v(" Lifecycle Hooks")]),t._v(" "),n("blockquote",[n("p",[t._v("This section uses "),n("RouterLink",{attrs:{to:"/guide/junkyard/single-file-component.html"}},[t._v("single-file component")]),t._v(" syntax for code examples")],1)]),t._v(" "),n("blockquote",[n("p",[t._v("This guide assumes that you have already read the "),n("RouterLink",{attrs:{to:"/guide/junkyard/composition-api-introduction.html"}},[t._v("Composition API Introduction")]),t._v(" and "),n("RouterLink",{attrs:{to:"/guide/junkyard/reactivity-fundamentals.html"}},[t._v("Reactivity Fundamentals")]),t._v(". Read that first if you are new to Composition API.")],1)]),t._v(" "),n("VideoLesson",{attrs:{href:"https://www.vuemastery.com/courses/vue-3-essentials/lifecycle-hooks",title:"Learn about how Lifecycle Hooks work with Vue Mastery"}},[t._v("Watch a free video about Lifecycle Hooks on Vue Mastery")]),t._v(" "),n("p",[t._v('You can access a component\'s lifecycle hook by prefixing the lifecycle hook with "on".')]),t._v(" "),n("p",[t._v("The following table contains how the lifecycle hooks are invoked inside of "),n("RouterLink",{attrs:{to:"/guide/junkyard/composition-api-setup.html"}},[t._v("setup()")]),t._v(":")],1),t._v(" "),n("table",[n("thead",[n("tr",[n("th",[t._v("Options API")]),t._v(" "),n("th",[t._v("Hook inside "),n("code",[t._v("setup")])])])]),t._v(" "),n("tbody",[n("tr",[n("td",[n("code",[t._v("beforeCreate")])]),t._v(" "),n("td",[t._v("Not needed*")])]),t._v(" "),n("tr",[n("td",[n("code",[t._v("created")])]),t._v(" "),n("td",[t._v("Not needed*")])]),t._v(" "),n("tr",[n("td",[n("code",[t._v("beforeMount")])]),t._v(" "),n("td",[n("code",[t._v("onBeforeMount")])])]),t._v(" "),n("tr",[n("td",[n("code",[t._v("mounted")])]),t._v(" "),n("td",[n("code",[t._v("onMounted")])])]),t._v(" "),n("tr",[n("td",[n("code",[t._v("beforeUpdate")])]),t._v(" "),n("td",[n("code",[t._v("onBeforeUpdate")])])]),t._v(" "),n("tr",[n("td",[n("code",[t._v("updated")])]),t._v(" "),n("td",[n("code",[t._v("onUpdated")])])]),t._v(" "),n("tr",[n("td",[n("code",[t._v("beforeUnmount")])]),t._v(" "),n("td",[n("code",[t._v("onBeforeUnmount")])])]),t._v(" "),n("tr",[n("td",[n("code",[t._v("unmounted")])]),t._v(" "),n("td",[n("code",[t._v("onUnmounted")])])]),t._v(" "),n("tr",[n("td",[n("code",[t._v("errorCaptured")])]),t._v(" "),n("td",[n("code",[t._v("onErrorCaptured")])])]),t._v(" "),n("tr",[n("td",[n("code",[t._v("renderTracked")])]),t._v(" "),n("td",[n("code",[t._v("onRenderTracked")])])]),t._v(" "),n("tr",[n("td",[n("code",[t._v("renderTriggered")])]),t._v(" "),n("td",[n("code",[t._v("onRenderTriggered")])])]),t._v(" "),n("tr",[n("td",[n("code",[t._v("activated")])]),t._v(" "),n("td",[n("code",[t._v("onActivated")])])]),t._v(" "),n("tr",[n("td",[n("code",[t._v("deactivated")])]),t._v(" "),n("td",[n("code",[t._v("onDeactivated")])])])])]),t._v(" "),n("div",{staticClass:"custom-block tip"},[n("p",{staticClass:"custom-block-title"},[t._v("TIP")]),t._v(" "),n("p",[t._v("Because "),n("code",[t._v("setup")]),t._v(" is run around the "),n("code",[t._v("beforeCreate")]),t._v(" and "),n("code",[t._v("created")]),t._v(" lifecycle hooks, you do not need to explicitly define them. In other words, any code that would be written inside those hooks should be written directly in the "),n("code",[t._v("setup")]),t._v(" function.")])]),t._v(" "),n("p",[t._v("These functions accept a callback that will be executed when the hook is called by the component:")]),t._v(" "),n("div",{staticClass:"language-js line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-js"}},[n("code",[n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// MyBook.vue")]),t._v("\n\n"),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("export")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("default")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("setup")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// mounted")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("onMounted")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      console"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Component is mounted!'")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])]),t._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[t._v("1")]),n("br"),n("span",{staticClass:"line-number"},[t._v("2")]),n("br"),n("span",{staticClass:"line-number"},[t._v("3")]),n("br"),n("span",{staticClass:"line-number"},[t._v("4")]),n("br"),n("span",{staticClass:"line-number"},[t._v("5")]),n("br"),n("span",{staticClass:"line-number"},[t._v("6")]),n("br"),n("span",{staticClass:"line-number"},[t._v("7")]),n("br"),n("span",{staticClass:"line-number"},[t._v("8")]),n("br"),n("span",{staticClass:"line-number"},[t._v("9")]),n("br"),n("span",{staticClass:"line-number"},[t._v("10")]),n("br")])])],1)}),[],!1,null,null,null);e.default=o.exports}}]);