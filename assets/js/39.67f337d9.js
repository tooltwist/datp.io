(window.webpackJsonp=window.webpackJsonp||[]).push([[39],{358:function(n,t,e){"use strict";var r=e(13),a=e(196),o=e(10),s=e(90),i=e(20),u=e(34),l=e(61),c=e(199),v=e(197);a("match",(function(n,t,e){return[function(t){var e=u(this),a=null==t?void 0:l(t,n);return a?r(a,t,e):new RegExp(t)[n](i(e))},function(n){var r=o(this),a=i(n),u=e(t,r,a);if(u.done)return u.value;if(!r.global)return v(r,a);var l=r.unicode;r.lastIndex=0;for(var h,d=[],p=0;null!==(h=v(r,a));){var g=i(h[0]);d[p]=g,""===g&&(r.lastIndex=c(a,s(r.lastIndex),l)),p++}return 0===p?null:d}]}))},367:function(n,t,e){"use strict";e.d(t,"a",(function(){return r})),e.d(t,"b",(function(){return a}));var r={language:"Language",github:"GitHub",lastCommit:"Last commit",last90Days:"Last 90 days",loadDetails:"Load Details",commits:"commits",loading:"Loading..."},a=[{lang:"en-us",owner:"vuejs",repo:"docs",branch:"master",url:"https://v3.vuejs.org/"},{lang:"fr",owner:"demahom18",repo:"docs-next",branch:"master",url:"https://vue3-fr.netlify.app"},{lang:"id",owner:"vuejs-id",repo:"docs-next",branch:"indonesian"},{lang:"ja",owner:"vuejs-jp",repo:"ja.vuejs.org",branch:"lang-ja",url:"https://v3.ja.vuejs.org/"},{lang:"ko",owner:"vuejs-kr",repo:"docs-next",branch:"rootKoKr",url:"https://v3.ko.vuejs.org/"},{lang:"pt-br",owner:"vuejs-br",repo:"docs-next",branch:"master",url:"https://vuejsbr-docs-next.netlify.app/"},{lang:"ru",owner:"translation-gang",repo:"docs-next",branch:"master",url:"https://v3.ru.vuejs.org/"},{lang:"zh-cn",owner:"vuejs",repo:"docs-next-zh-cn",branch:"master",url:"https://v3.cn.vuejs.org/"}]},545:function(n,t,e){"use strict";e.r(t);e(33),e(358),e(122),e(9);var r=e(367),a={data:function(){return{isTranslation:!1}},mounted:function(){var n=function(n){return(String(n).match(/https?:\/\/[^/]+/)||[])[0]},t=n(document.referrer);t&&t!==location.origin&&r.b.some((function(e){var r=e.url;return n(r)===t}))&&(this.isTranslation=!0)}},o=e(60),s=Object(o.a)(a,(function(){var n=this,t=n.$createElement,e=n._self._c||t;return e("div",{staticClass:"theme-container"},[e("div",{staticClass:"theme-default-content"},[e("h1",[n._v("404")]),n._v(" "),n._m(0),n._v(" "),e("p",{directives:[{name:"show",rawName:"v-show",value:n.isTranslation,expression:"isTranslation"}]},[n._v("\n      New pages are added to the documentation all the time. This page might not be included in all of the translations yet.\n    ")]),n._v(" "),e("RouterLink",{attrs:{to:"/"}},[n._v("\n      Take me home.\n    ")])],1)])}),[function(){var n=this.$createElement,t=this._self._c||n;return t("blockquote",[t("p",[this._v("Whoops! This page doesn't exist.")])])}],!1,null,null,null);t.default=s.exports}}]);