(window.webpackJsonp=window.webpackJsonp||[]).push([[31],{410:function(e,t,s){},505:function(e,t,s){"use strict";s(410)},551:function(e,t,s){"use strict";s.r(t);var o={props:{triggerSelector:{type:String,default:".vuemastery-trigger"}},data:function(){return{isOpen:!1}},methods:{initVideoModal:function(){var e=this,t=document.querySelector(this.triggerSelector),s=new Vimeo.Player(this.$refs.videoIframe);t.addEventListener("click",(function(t){t.stopPropagation(),e.isOpen=!0,document.body.classList.toggle("stop-scroll"),s.play()})),document.body.addEventListener("click",(function(o){e.isOpen&&o.target!==t&&!e.$refs.modal.contains(o.target)&&(e.isOpen=!1,document.body.classList.remove("stop-scroll"),s.pause())}))}},mounted:function(){"undefined"!=typeof window&&this.initVideoModal()}},i=(s(505),s(60)),n=Object(i.a)(o,(function(){var e=this.$createElement,t=this._self._c||e;return t("div",{directives:[{name:"show",rawName:"v-show",value:this.isOpen,expression:"isOpen"}],staticClass:"overlay"},[t("div",{ref:"modal",staticClass:"modal",class:{open:this.isOpen}},[t("div",{staticClass:"video-space",staticStyle:{padding:"56.25% 0 0 0",position:"relative"}},[t("iframe",{ref:"videoIframe",staticStyle:{height:"100%",left:"0",position:"absolute",top:"0",width:"100%",margin:"0"},attrs:{src:"https://player.vimeo.com/video/455611549?dnt=1",frameborder:"0",webkitallowfullscreen:"",mozallowfullscreen:"",allowfullscreen:"",allow:"autoplay"}})]),this._v(" "),this._m(0)])])}),[function(){var e=this.$createElement,t=this._self._c||e;return t("p",{staticClass:"modal-text"},[this._v("\n      Video by\n      "),t("a",{attrs:{href:"https://www.vuemastery.com",target:"_blank",rel:"sponsored noopener",title:"Vue.js Courses on Vue Mastery"}},[this._v("Vue Mastery")]),this._v(". Watch Vue Mastery’s free\n      "),t("a",{attrs:{href:"https://www.vuemastery.com/courses/intro-to-vue-3/intro-to-vue3",target:"_blank",rel:"sponsored noopener",title:"Vue.js Courses on Vue Mastery"}},[this._v("Intro to Vue course")]),this._v(".\n    ")])}],!1,null,null,null);t.default=n.exports}}]);