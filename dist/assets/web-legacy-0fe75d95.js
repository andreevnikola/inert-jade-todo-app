System.register(["./index-legacy-1b9f6e26.js"],(function(e,t){"use strict";var n;return{setters:[e=>{n=e.W}],execute:function(){var t={exports:{}};
/*!
        * $script.js JS loader & dependency manager
        * https://github.com/ded/script.js
        * (c) Dustin Diaz 2014 | License MIT
        */!function(e){!function(t,n){e.exports?e.exports=n():this.$script=n()}(0,(function(){var e,t,n=document,i=n.getElementsByTagName("head")[0],o=!1,r="push",a="readyState",l="onreadystatechange",s={},u={},p={};function c(e,t){for(var n=0,i=e.length;n<i;++n)if(!t(e[n]))return o;return 1}function d(e,t){c(e,(function(e){return t(e),1}))}function f(t,n,i){t=t[r]?t:[t];var o=n&&n.call,a=o?n:i,l=o?t.join(""):n,v=t.length;function m(e){return e.call?e():s[e]}function g(){if(! --v)for(var e in s[l]=1,a&&a(),u)c(e.split("|"),m)&&!d(u[e],m)&&(u[e]=[])}return setTimeout((function(){d(t,(function t(n,i){return null===n?g():(i||/^https?:\/\//.test(n)||!e||(n=-1===n.indexOf(".js")?e+n+".js":e+n),p[n]?2==p[n]?g():setTimeout((function(){t(n,!0)}),0):(p[n]=1,void h(n,g)))}))}),0),f}function h(e,o){var r,s=n.createElement("script");s.onload=s.onerror=s[l]=function(){s[a]&&!/^c|loade/.test(s[a])||r||(s.onload=s[l]=null,r=1,p[e]=2,o())},s.async=1,s.src=t?e+(-1===e.indexOf("?")?"?":"&")+t:e,i.insertBefore(s,i.lastChild)}return f.get=h,f.order=function(e,t,n){!function i(o){o=e.shift(),e.length?f(o,i):f(o,t,n)}()},f.path=function(t){e=t},f.urlArgs=function(e){t=e},f.ready=function(e,t,n){e=e[r]?e:[e];var i,o=[];return!d(e,(function(e){s[e]||o[r](e)}))&&c(e,(function(e){return s[e]}))?t():(i=e.join("|"),u[i]=u[i]||[],u[i][r](t),n&&n(o)),f},f.done=function(e){f([null],e)},f}))}(t);var i=t.exports;e("SignInWithAppleWeb",class extends n{constructor(){super({name:"SignInWithApple",platforms:["web"]}),this.appleScriptUrl="https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js",this.isAppleScriptLoaded=!1}async authorize(e){return new Promise(((t,n)=>{e?this.loadSignInWithAppleJS().then((i=>{var o,r,a;this.isAppleScriptLoaded=i,this.isAppleScriptLoaded?(AppleID.auth.init({clientId:e.clientId,redirectURI:e.redirectURI,scope:null!==(o=e.scopes)&&void 0!==o?o:void 0,state:null!==(r=e.state)&&void 0!==r?r:void 0,nonce:null!==(a=e.nonce)&&void 0!==a?a:void 0,usePopup:!0}),AppleID.auth.signIn().then((e=>{var n,i,o,r,a;const l={response:{user:null,email:null===(n=e.user)||void 0===n?void 0:n.email,givenName:null===(o=null===(i=e.user)||void 0===i?void 0:i.name)||void 0===o?void 0:o.firstName,familyName:null===(a=null===(r=e.user)||void 0===r?void 0:r.name)||void 0===a?void 0:a.lastName,identityToken:e.authorization.id_token,authorizationCode:e.authorization.code}};t(l)})).catch((e=>{n(e)}))):n("Unable to load Sign in with Apple JS framework.")})):n("No options were provided.")}))}loadSignInWithAppleJS(){return new Promise((e=>{this.isAppleScriptLoaded?e(!0):void 0!==typeof window?i.get(this.appleScriptUrl,(()=>e(!0))):e(!1)}))}})}}}));
