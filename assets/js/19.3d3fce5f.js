(window.webpackJsonp=window.webpackJsonp||[]).push([[19,43],{354:function(t,n){t.exports="\t\n\v\f\r                　\u2028\u2029\ufeff"},355:function(t,n,e){"use strict";var r=e(37),i=e(13),u=e(4),o=e(196),a=e(203),s=e(10),c=e(34),l=e(125),f=e(199),h=e(90),g=e(20),d=e(61),p=e(198),v=e(197),m=e(92),b=e(201),N=e(5),I=b.UNSUPPORTED_Y,E=Math.min,x=[].push,w=u(/./.exec),M=u(x),_=u("".slice);o("split",(function(t,n,e){var u;return u="c"=="abbc".split(/(b)*/)[1]||4!="test".split(/(?:)/,-1).length||2!="ab".split(/(?:ab)*/).length||4!=".".split(/(.?)(.?)/).length||".".split(/()()/).length>1||"".split(/.?/).length?function(t,e){var u=g(c(this)),o=void 0===e?4294967295:e>>>0;if(0===o)return[];if(void 0===t)return[u];if(!a(t))return i(n,u,t,o);for(var s,l,f,h=[],d=(t.ignoreCase?"i":"")+(t.multiline?"m":"")+(t.unicode?"u":"")+(t.sticky?"y":""),v=0,b=new RegExp(t.source,d+"g");(s=i(m,b,u))&&!((l=b.lastIndex)>v&&(M(h,_(u,v,s.index)),s.length>1&&s.index<u.length&&r(x,h,p(s,1)),f=s[0].length,v=l,h.length>=o));)b.lastIndex===s.index&&b.lastIndex++;return v===u.length?!f&&w(b,"")||M(h,""):M(h,_(u,v)),h.length>o?p(h,0,o):h}:"0".split(void 0,0).length?function(t,e){return void 0===t&&0===e?[]:i(n,this,t,e)}:n,[function(n,e){var r=c(this),o=null==n?void 0:d(n,t);return o?i(o,n,r,e):i(u,g(r),n,e)},function(t,r){var i=s(this),o=g(t),a=e(u,i,o,r,u!==n);if(a.done)return a.value;var c=l(i,RegExp),d=i.unicode,p=(i.ignoreCase?"i":"")+(i.multiline?"m":"")+(i.unicode?"u":"")+(I?"g":"y"),m=new c(I?"^(?:"+i.source+")":i,p),b=void 0===r?4294967295:r>>>0;if(0===b)return[];if(0===o.length)return null===v(m,o)?[o]:[];for(var N=0,x=0,w=[];x<o.length;){m.lastIndex=I?0:x;var P,y=v(m,I?_(o,x):o);if(null===y||(P=E(h(m.lastIndex+(I?x:0)),o.length))===N)x=f(o,x,d);else{if(M(w,_(o,N,x)),w.length===b)return w;for(var S=1;S<=y.length-1;S++)if(M(w,y[S]),w.length===b)return w;x=N=P}}return M(w,_(o,N)),w}]}),!!N((function(){var t=/(?:)/,n=t.exec;t.exec=function(){return n.apply(this,arguments)};var e="ab".split(t);return 2!==e.length||"a"!==e[0]||"b"!==e[1]})),I)},356:function(t,n,e){var r=e(4),i=e(34),u=e(20),o=e(354),a=r("".replace),s="["+o+"]",c=RegExp("^"+s+s+"*"),l=RegExp(s+s+"*$"),f=function(t){return function(n){var e=u(i(n));return 1&t&&(e=a(e,c,"")),2&t&&(e=a(e,l,"")),e}};t.exports={start:f(1),end:f(2),trim:f(3)}},357:function(t,n,e){var r=e(4);t.exports=r(1..valueOf)},359:function(t,n,e){"use strict";var r=e(11),i=e(2),u=e(4),o=e(124),a=e(18),s=e(12),c=e(205),l=e(35),f=e(93),h=e(204),g=e(5),d=e(62).f,p=e(36).f,v=e(14).f,m=e(357),b=e(356).trim,N=i.Number,I=N.prototype,E=i.TypeError,x=u("".slice),w=u("".charCodeAt),M=function(t){var n=h(t,"number");return"bigint"==typeof n?n:_(n)},_=function(t){var n,e,r,i,u,o,a,s,c=h(t,"number");if(f(c))throw E("Cannot convert a Symbol value to a number");if("string"==typeof c&&c.length>2)if(c=b(c),43===(n=w(c,0))||45===n){if(88===(e=w(c,2))||120===e)return NaN}else if(48===n){switch(w(c,1)){case 66:case 98:r=2,i=49;break;case 79:case 111:r=8,i=55;break;default:return+c}for(o=(u=x(c,2)).length,a=0;a<o;a++)if((s=w(u,a))<48||s>i)return NaN;return parseInt(u,r)}return+c};if(o("Number",!N(" 0o1")||!N("0b1")||N("+0x1"))){for(var P,y=function(t){var n=arguments.length<1?0:N(M(t)),e=this;return l(I,e)&&g((function(){m(e)}))?c(Object(n),e,y):n},S=r?d(N):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,isFinite,isInteger,isNaN,isSafeInteger,parseFloat,parseInt,fromString,range".split(","),k=0;S.length>k;k++)s(N,P=S[k])&&!s(y,P)&&v(y,P,p(N,P));y.prototype=I,I.constructor=y,a(i,"Number",y)}},360:function(t,n,e){"use strict";e.d(n,"e",(function(){return r})),e.d(n,"a",(function(){return i})),e.d(n,"c",(function(){return u})),e.d(n,"b",(function(){return o})),e.d(n,"d",(function(){return s})),e.d(n,"f",(function(){return c}));e(33),e(89),e(200),e(202),e(195),e(359),e(363);var r=function(t){return t.replace(/^https?:\/\/(www\.)?/,"").replace(/\/$/,"").replace(/^mailto:/,"")},i=function(t,n){return n&&n.url?n.url:n&&n.includes("/")?"https://github.com/".concat(n.replace(/\/\*$/,"")):"https://github.com/".concat(t,"/").concat(n||"")},u=function(){var t=window.navigator;return t.languages?t.languages[0]:t.userLanguage||t.language},o=function(t,n,e,r){var i=a(e-t),u=a(r-n),o=Math.sin(i/2)*Math.sin(i/2)+Math.cos(a(t))*Math.cos(a(e))*Math.sin(u/2)*Math.sin(u/2);return 6371*(2*Math.atan2(Math.sqrt(o),Math.sqrt(1-o)))};function a(t){return t*(Math.PI/180)}var s=function(t){return.62137*t},c=function(t){return Number(Math.ceil(t).toPrecision(2))}},363:function(t,n,e){"use strict";var r=e(3),i=e(4),u=e(5),o=e(357),a=i(1..toPrecision);r({target:"Number",proto:!0,forced:u((function(){return"1"!==a(1,void 0)}))||!u((function(){a({})}))},{toPrecision:function(t){return void 0===t?a(o(this)):a(o(this),t)}})},532:function(t,n,e){"use strict";e.r(n);e(33),e(355),e(94);var r=e(360),i={en:"English",nl:"Nederlands",zh:"中文",vi:"Tiếng Việt",pl:"Polski",pt:"Português",ru:"Русский",jp:"日本語",fr:"Français",de:"Deutsch",el:"Ελληνικά",es:"Español",hi:"हिंदी",fa:"فارسی",ko:"한국어",ro:"Română",uk:"Українська",no:"Norwegian"},u={props:{vuerName:String,code:String},data:function(){return{preferredCode:"en"}},mounted:function(){this.preferredCode=Object(r.c)().split("-")[0]},computed:{isUserPreferredLanguage:function(){return this.code===this.preferredCode},isEnglish:function(){return"en"===this.code},highlighted:function(){return this.isUserPreferredLanguage&&!this.isEnglish},title:function(){return this.highlighted?"".concat(this.vuerName," can give technical talks in your preferred language."):this.name},name:function(){return i[this.code]}}},o=e(60),a=Object(o.a)(u,(function(){var t=this.$createElement;return(this._self._c||t)("li",{class:{highlighted:this.highlighted},attrs:{title:this.title}},[this._v(this._s(this.name))])}),[],!1,null,null,null);n.default=a.exports}}]);