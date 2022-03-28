parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"UnXq":[function(require,module,exports) {
        "use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.qrCodeResponse=exports.getFavicon=exports.pushState=exports.history=void 0;var e=require("./messages");exports.history=window.history,exports.pushState=exports.history.pushState;var t=function(){for(var e,t=document.getElementsByTagName("link"),r=0;r<t.length;r++){var o=t[r].getAttribute("rel");"icon"!==o&&"shortcut icon"!==o||(e=t[r])}return e&&e.href};function r(e,t){var r=e.data,o=new RegExp(t.regex);r?o.test(r)?t.resolve&&t.resolve(r):t.reject&&t.reject(new Error("Doesn't match")):t.reject&&t.reject(new Error("Cancelled"))}exports.getFavicon=t,exports.qrCodeResponse=r,exports.history.pushState=function(t){return setTimeout(function(){(0,e.bridgeSend)({type:"history-state-changed",navState:{url:location.href,title:document.title,icon:(0,exports.getFavicon)(),canGoBack:exports.history.length}})},100),exports.pushState.apply(exports.history,arguments)};
    },{"./messages":"tvsm"}],"tvsm":[function(require,module,exports) {
        "use strict";function e(t){return(e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(t)}function t(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function r(e,r,n){return r&&t(e.prototype,r),n&&t(e,n),Object.defineProperty(e,"prototype",{writable:!1}),e}function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&l(e,t)}function i(e){var t=p();return function(){var r,n=f(e);if(t){var o=f(this).constructor;r=Reflect.construct(n,arguments,o)}else r=n.apply(this,arguments);return u(this,r)}}function u(t,r){if(r&&("object"===e(r)||"function"==typeof r))return r;if(void 0!==r)throw new TypeError("Derived constructors may only return object or undefined");return c(t)}function c(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function s(e){var t="function"==typeof Map?new Map:void 0;return(s=function(e){if(null===e||!d(e))return e;if("function"!=typeof e)throw new TypeError("Super expression must either be null or a function");if(void 0!==t){if(t.has(e))return t.get(e);t.set(e,r)}function r(){return a(e,arguments,f(this).constructor)}return r.prototype=Object.create(e.prototype,{constructor:{value:r,enumerable:!1,writable:!0,configurable:!0}}),l(r,e)})(e)}function a(e,t,r){return(a=p()?Reflect.construct:function(e,t,r){var n=[null];n.push.apply(n,t);var o=new(Function.bind.apply(e,n));return r&&l(o,r.prototype),o}).apply(null,arguments)}function p(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch(e){return!1}}function d(e){return-1!==Function.toString.call(e).indexOf("[native code]")}function l(e,t){return(l=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function f(e){return(f=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}Object.defineProperty(exports,"__esModule",{value:!0}),exports.getSyncResponse=exports.web3Response=exports.UserRejectedRequest=exports.Unauthorized=exports.bridgeSend=void 0;var y=require("./utils"),h=require("./index"),w=function(e){window.ReactNativeWebView?window.ReactNativeWebView.postMessage(JSON.stringify(e)):window.postMessage(JSON.stringify(e))};exports.bridgeSend=w;var b=function(e){o(u,s(Error));var t=i(u);function u(){var e;return n(this,u),(e=t.apply(this,arguments)).name="Unauthorized",e.id=4100,e.code=4100,e.message="The requested method and/or account has not been authorized by the user.",e}return r(u)}();exports.Unauthorized=b;var m=function(e){o(u,s(Error));var t=i(u);function u(){var e;return n(this,u),(e=t.apply(this,arguments)).name="UserRejectedRequest",e.id=4001,e.code=4001,e.message="The user rejected the request.",e}return r(u)}();function v(e,t){return{id:e.id,jsonrpc:"2.0",result:t}}exports.UserRejectedRequest=m,exports.web3Response=v,window.ReactNativeWebView.onMessage=function(e){var t=JSON.parse(e),r=t.messageId,n=h.callbacks[r];if("getPageInfo"!==t.type){if("accountsChanged"===t.type&&window.ethereum.emit("accountsChanged",t.data),"networkChanged"===t.type&&window.ethereum.emit("networkChanged",t.data),n)if("api-response"===t.type)if("qr-code"===t.permission)(0,y.qrCodeResponse)(t,n);else if(t.isAllowed){if("web3"===t.permission){var o=t.data[0];window.humaniqAppcurrentAccountAddress=o,window.ethereum.selectedAddress=o,window.ethereum.emit("accountsChanged",t.data),(0,exports.bridgeSend)({type:"set-web3",data:t.data})}n.resolve(t.data)}else(0,exports.bridgeSend)({type:"user-reject-request",data:t}),n.reject(new m);else"web3-send-async-callback"===t.type&&(n.beta?t.error?4100===t.error.code?n.reject(new b):n.reject(t.error):n.resolve(t.result.result):n.results?(n.results.push(t.error||t.result),n.results.length==n.num&&n.callback(void 0,n.results)):n.callback(t.error,t.result))}else(0,exports.bridgeSend)({type:"history-state-changed",navState:{url:location.href,title:document.title,icon:(0,y.getFavicon)(),canGoBack:window.history.length}})};var g=function(e){return"eth_accounts"==e.method&&void 0!==window.humaniqAppcurrentAccountAddress?v(e,[window.humaniqAppcurrentAccountAddress]):"eth_coinbase"==e.method&&void 0!==window.humaniqAppcurrentAccountAddress?v(e,window.humaniqAppcurrentAccountAddress):"net_version"==e.method||"eth_chainId"==e.method?v(e,window.humaniqAppNetworkId):"eth_uninstallFilter"==e.method?v(e,!0):null};exports.getSyncResponse=g;
    },{"./utils":"UnXq","./index":"QCba"}],"QCba":[function(require,module,exports) {
        "use strict";function e(e,n){for(var t=0;t<n.length;t++){var r=n[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function n(n,t,r){return t&&e(n.prototype,t),r&&e(n,r),Object.defineProperty(n,"prototype",{writable:!1}),n}function t(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(exports,"__esModule",{value:!0}),exports.EthereumProvider=exports.HumaniqAPI=exports.sendAPIrequest=exports.callbacks=exports.callbackId=void 0;var r=require("./messages");function s(e,n){var t=exports.callbackId++,s=n||{};return(0,r.bridgeSend)({type:"api-request",permission:e,messageId:t,params:s}),new Promise(function(e,n){s.resolve=e,s.reject=n,exports.callbacks[t]=s})}console.log("IMPORT-PROVIDER!!!!!!!!!!!!!!!!!!!"),exports.callbackId=0,exports.callbacks={},exports.sendAPIrequest=s;var o=n(function e(){t(this,e),this.getContactCode=function(){return s("contact-code")}});exports.HumaniqAPI=o;var i=function(){function e(){var n=this;t(this,e),this.isHumaniq=!0,this.isMetamask=!0,this.humaniq=new o,this.isConnected=function(){return!0},this.networkVersion=window.humaniqAppNetworkId,this.chainId="0x"+Number(window.humaniqAppNetworkId).toString(16),this.networkId=window.humaniqAppNetworkId,this.sendAsync=function(e,n){if(window.humaniqAppDebug&&console.log("sendAsync (legacy)"+JSON.stringify(e)),!e)return new Error("Request is not valid.");if("eth_requestAccounts"==e.method)return s("web3",{url:location.href});var t=(0,r.getSyncResponse)(e);if(t&&n)n(null,t);else{var o=exports.callbackId++;if(Array.isArray(e))for(var i in exports.callbacks[o]={num:e.length,results:[],callback:n},e)(0,r.bridgeSend)({type:"web3-send-async-read-only",messageId:o,payload:e[i]});else exports.callbacks[o]={callback:n},(0,r.bridgeSend)({type:"web3-send-async-read-only",messageId:o,payload:e})}},this.sendSync=function(e){window.humaniqAppDebug&&console.log("sendSync (legacy)"+JSON.stringify(e)),"eth_uninstallFilter"==e.method&&n.sendAsync(e,function(e,n){});var t=(0,r.getSyncResponse)(e);return t||(0,r.web3Response)(e,null)},this.request=function(e){try{if(!e)return new Error("Request is not valid.");var t=e.method;if(!t)return new Error("Request is not valid.");if("string"!=typeof t)return n.sendSync(t);if("eth_requestAccounts"===t)return s("web3",{url:location.href});var o=(0,r.getSyncResponse)({method:t});if(o)return new Promise(function(e,n){e(o.result)});var i=exports.callbackId++,a={id:i,jsonrpc:"2.0",method:t,params:e.params};return(0,r.bridgeSend)({type:"web3-send-async-read-only",messageId:i,payload:a,meta:{url:location.href}}),new Promise(function(e,n){exports.callbacks[i]={beta:!0,resolve:e,reject:n}})}catch(c){(0,r.bridgeSend)({error:c})}},this.send=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];return window.humaniqAppDebug&&console.log("send (legacy): "+e),n.request({method:e,params:t})},this._events={},this.on=function(e,t){n._events[e]||(n._events[e]=[]),n._events[e].push(t)},this.removeListener=function(e,t){if(n._events[e]){n._events[e]=n._events[e].filter(function(e){return e!==t})}},this.emit=function(e,t){n._events[e]&&n._events[e].forEach(function(e){return e(t)})}}return n(e,[{key:"enable",value:function(){return s("web3",{url:location.href})}},{key:"scanQRCode",value:function(e){return s("qr-code",{regex:e})}}]),e}();exports.EthereumProvider=i,window.ethereum=new i;
    },{"./messages":"tvsm"}]},{},["QCba"], null)