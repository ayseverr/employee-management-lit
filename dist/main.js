function e(e,t){void 0===t&&(t={});for(var n=function(e){for(var t=[],n=0;n<e.length;){var r=e[n];if("*"!==r&&"+"!==r&&"?"!==r)if("\\"!==r)if("{"!==r)if("}"!==r)if(":"!==r)if("("!==r)t.push({type:"CHAR",index:n,value:e[n++]});else{var o=1,i="";if("?"===e[s=n+1])throw new TypeError('Pattern cannot start with "?" at '.concat(s));for(;s<e.length;)if("\\"!==e[s]){if(")"===e[s]){if(0==--o){s++;break}}else if("("===e[s]&&(o++,"?"!==e[s+1]))throw new TypeError("Capturing groups are not allowed at ".concat(s));i+=e[s++]}else i+=e[s++]+e[s++];if(o)throw new TypeError("Unbalanced pattern at ".concat(n));if(!i)throw new TypeError("Missing pattern at ".concat(n));t.push({type:"PATTERN",index:n,value:i}),n=s}else{for(var a="",s=n+1;s<e.length;){var c=e.charCodeAt(s);if(!(c>=48&&c<=57||c>=65&&c<=90||c>=97&&c<=122||95===c))break;a+=e[s++]}if(!a)throw new TypeError("Missing parameter name at ".concat(n));t.push({type:"NAME",index:n,value:a}),n=s}else t.push({type:"CLOSE",index:n,value:e[n++]});else t.push({type:"OPEN",index:n,value:e[n++]});else t.push({type:"ESCAPED_CHAR",index:n++,value:e[n++]});else t.push({type:"MODIFIER",index:n,value:e[n++]})}return t.push({type:"END",index:n,value:""}),t}(e),o=t.prefixes,i=void 0===o?"./":o,a=t.delimiter,s=void 0===a?"/#?":a,c=[],l=0,d=0,u="",h=function(e){if(d<n.length&&n[d].type===e)return n[d++].value},p=function(e){var t=h(e);if(void 0!==t)return t;var r=n[d],o=r.type,i=r.index;throw new TypeError("Unexpected ".concat(o," at ").concat(i,", expected ").concat(e))},f=function(){for(var e,t="";e=h("CHAR")||h("ESCAPED_CHAR");)t+=e;return t},m=function(e){var t=c[c.length-1],n=e||(t&&"string"==typeof t?t:"");if(t&&!n)throw new TypeError('Must have text between two parameters, missing text after "'.concat(t.name,'"'));return!n||function(e){for(var t=0,n=s;t<n.length;t++){var r=n[t];if(e.indexOf(r)>-1)return!0}return!1}(n)?"[^".concat(r(s),"]+?"):"(?:(?!".concat(r(n),")[^").concat(r(s),"])+?")};d<n.length;){var y=h("CHAR"),g=h("NAME"),b=h("PATTERN");if(g||b){var w=y||"";-1===i.indexOf(w)&&(u+=w,w=""),u&&(c.push(u),u=""),c.push({name:g||l++,prefix:w,suffix:"",pattern:b||m(w),modifier:h("MODIFIER")||""})}else{var v=y||h("ESCAPED_CHAR");if(v)u+=v;else if(u&&(c.push(u),u=""),h("OPEN")){w=f();var _=h("NAME")||"",$=h("PATTERN")||"",E=f();p("CLOSE"),c.push({name:_||($?l++:""),pattern:_&&!$?m(w):$,prefix:w,suffix:E,modifier:h("MODIFIER")||""})}else p("END")}}return c}function t(t,r){return n(e(t,r),r)}function n(e,t){void 0===t&&(t={});var n=o(t),r=t.encode,i=void 0===r?function(e){return e}:r,a=t.validate,s=void 0===a||a,c=e.map((function(e){if("object"==typeof e)return new RegExp("^(?:".concat(e.pattern,")$"),n)}));return function(t){for(var n="",r=0;r<e.length;r++){var o=e[r];if("string"!=typeof o){var a=t?t[o.name]:void 0,l="?"===o.modifier||"*"===o.modifier,d="*"===o.modifier||"+"===o.modifier;if(Array.isArray(a)){if(!d)throw new TypeError('Expected "'.concat(o.name,'" to not repeat, but got an array'));if(0===a.length){if(l)continue;throw new TypeError('Expected "'.concat(o.name,'" to not be empty'))}for(var u=0;u<a.length;u++){var h=i(a[u],o);if(s&&!c[r].test(h))throw new TypeError('Expected all "'.concat(o.name,'" to match "').concat(o.pattern,'", but got "').concat(h,'"'));n+=o.prefix+h+o.suffix}}else if("string"!=typeof a&&"number"!=typeof a){if(!l){var p=d?"an array":"a string";throw new TypeError('Expected "'.concat(o.name,'" to be ').concat(p))}}else{h=i(String(a),o);if(s&&!c[r].test(h))throw new TypeError('Expected "'.concat(o.name,'" to match "').concat(o.pattern,'", but got "').concat(h,'"'));n+=o.prefix+h+o.suffix}}else n+=o}return n}}function r(e){return e.replace(/([.+*?=^!:${}()[\]|/\\])/g,"\\$1")}function o(e){return e&&e.sensitive?"":"i"}function i(t,n,i){return function(e,t,n){void 0===n&&(n={});for(var i=n.strict,a=void 0!==i&&i,s=n.start,c=void 0===s||s,l=n.end,d=void 0===l||l,u=n.encode,h=void 0===u?function(e){return e}:u,p=n.delimiter,f=void 0===p?"/#?":p,m=n.endsWith,y="[".concat(r(void 0===m?"":m),"]|$"),g="[".concat(r(f),"]"),b=c?"^":"",w=0,v=e;w<v.length;w++){var _=v[w];if("string"==typeof _)b+=r(h(_));else{var $=r(h(_.prefix)),E=r(h(_.suffix));if(_.pattern)if(t&&t.push(_),$||E)if("+"===_.modifier||"*"===_.modifier){var x="*"===_.modifier?"?":"";b+="(?:".concat($,"((?:").concat(_.pattern,")(?:").concat(E).concat($,"(?:").concat(_.pattern,"))*)").concat(E,")").concat(x)}else b+="(?:".concat($,"(").concat(_.pattern,")").concat(E,")").concat(_.modifier);else{if("+"===_.modifier||"*"===_.modifier)throw new TypeError('Can not repeat "'.concat(_.name,'" without a prefix and suffix'));b+="(".concat(_.pattern,")").concat(_.modifier)}else b+="(?:".concat($).concat(E,")").concat(_.modifier)}}if(d)a||(b+="".concat(g,"?")),b+=n.endsWith?"(?=".concat(y,")"):"$";else{var A=e[e.length-1],S="string"==typeof A?g.indexOf(A[A.length-1])>-1:void 0===A;a||(b+="(?:".concat(g,"(?=").concat(y,"))?")),S||(b+="(?=".concat(g,"|").concat(y,")"))}return new RegExp(b,o(n))}(e(t,i),n,i)}function a(e,t,n){return e instanceof RegExp?function(e,t){if(!t)return e;for(var n=/\((?:\?<(.*?)>)?(?!\?)/g,r=0,o=n.exec(e.source);o;)t.push({name:o[1]||r++,prefix:"",suffix:"",modifier:"",pattern:""}),o=n.exec(e.source);return e}(e,t):Array.isArray(e)?function(e,t,n){var r=e.map((function(e){return a(e,t,n).source}));return new RegExp("(?:".concat(r.join("|"),")"),o(n))}(e,t,n):i(e,t,n)}function s(e){return"object"==typeof e&&!!e}function c(e){return"function"==typeof e}function l(e){return"string"==typeof e}function d(e=[]){return Array.isArray(e)?e:[e]}function u(e){return`[Vaadin.Router] ${e}`}class h extends Error{code;context;constructor(e){super(u(`Page not found (${e.pathname})`)),this.context=e,this.code=404}}const p=Symbol("NotFoundResult");function f(e){return new h(e)}function m(e){return(Array.isArray(e)?e[0]:e)??""}function y(e){return m(e?.path)}const g=new Map;function b(e){try{return decodeURIComponent(e)}catch{return e}}g.set("|false",{keys:[],pattern:/(?:)/u});var w=function(e,t,n=!1,r=[],o){const i=`${e}|${String(n)}`,s=m(t);let c=g.get(i);if(!c){const t=[];c={keys:t,pattern:a(e,t,{end:n,strict:""===e})},g.set(i,c)}const l=c.pattern.exec(s);if(!l)return null;const d={...o};for(let e=1;e<l.length;e++){const t=c.keys[e-1],n=t.name,r=l[e];void 0===r&&Object.hasOwn(d,n)||("+"===t.modifier||"*"===t.modifier?d[n]=r?r.split(/[/?#]/u).map(b):[]:d[n]=r?b(r):r)}return{keys:[...r,...c.keys],params:d,path:l[0]}};var v=function e(t,n,r,o,i){let a,s,c=0,l=y(t);return l.startsWith("/")&&(r&&(l=l.substring(1)),r=!0),{next(d){if(t===d)return{done:!0,value:void 0};t.__children??=function(e){return Array.isArray(e)&&e.length>0?e:void 0}(t.children);const u=t.__children??[],h=!t.__children&&!t.children;if(!a&&(a=w(l,n,h,o,i),a))return{value:{keys:a.keys,params:a.params,path:a.path,route:t}};if(a&&u.length>0)for(;c<u.length;){if(!s){const o=u[c];o.parent=t;let i=a.path.length;i>0&&"/"===n.charAt(i)&&(i+=1),s=e(o,n.substring(i),r,a.keys,a.params)}const o=s.next(d);if(!o.done)return{done:!1,value:o.value};s=null,c+=1}return{done:!0,value:void 0}}}};function _(e){if(c(e.route.action))return e.route.action(e)}class $ extends Error{code;context;constructor(e,t){let n=`Path '${e.pathname}' is not properly resolved due to an error.`;const r=y(e.route);r&&(n+=` Resolution had failed on route: '${r}'`),super(n,t),this.code=t?.code,this.context=e}warn(){console.warn(this.message)}}class E{baseUrl;#e;errorHandler;resolveRoute;#t;constructor(e,{baseUrl:t="",context:n,errorHandler:r,resolveRoute:o=_}={}){if(Object(e)!==e)throw new TypeError("Invalid routes");this.baseUrl=t,this.errorHandler=r,this.resolveRoute=o,Array.isArray(e)?this.#t={__children:e,__synthetic:!0,action:()=>{},path:""}:this.#t={...e,parent:void 0},this.#e={...n,hash:"",next:async()=>p,params:{},pathname:"",resolver:this,route:this.#t,search:"",chain:[]}}get root(){return this.#t}get context(){return this.#e}get __effectiveBaseUrl(){return this.baseUrl?new URL(this.baseUrl,document.baseURI||document.URL).href.replace(/[^/]*$/u,""):""}getRoutes(){return[...this.#t.__children??[]]}removeRoutes(){this.#t.__children=[]}async resolve(e){const t=this,n={...this.#e,...l(e)?{pathname:e}:e,next:c},r=v(this.#t,this.__normalizePathname(n.pathname)??n.pathname,!!this.baseUrl),o=this.resolveRoute;let i=null,a=null,s=n;async function c(e=!1,l=i?.value?.route,d){const u=null===d?i?.value?.route:void 0;if(i=a??r.next(u),a=null,!e&&(i.done||!function(e,t){let n=e;for(;n;)if(n=n.parent,n===t)return!0;return!1}(i.value.route,l)))return a=i,p;if(i.done)throw f(n);s={...n,params:i.value.params,route:i.value.route,chain:s.chain?.slice()},function(e,t){const{path:n,route:r}=t;if(r&&!r.__synthetic){const t={path:n,route:r};if(r.parent&&e.chain)for(let t=e.chain.length-1;t>=0&&e.chain[t].route!==r.parent;t--)e.chain.pop();e.chain?.push(t)}}(s,i.value);const h=await o(s);return null!=h&&h!==p?(s.result=(m=h)&&"object"==typeof m&&"next"in m&&"params"in m&&"result"in m&&"route"in m?h.result:h,t.#e=s,s):await c(e,l,h);var m}try{return await c(!0,this.#t)}catch(e){const t=e instanceof h?e:new $(s,{code:500,cause:e});if(this.errorHandler)return s.result=this.errorHandler(t),s;throw e}}setRoutes(e){this.#t.__children=[...d(e)]}__normalizePathname(e){if(!this.baseUrl)return e;const t=this.__effectiveBaseUrl,n=e.startsWith("/")?new URL(t).origin+e:`./${e}`,r=new URL(n,t).href;return r.startsWith(t)?r.slice(t.length):void 0}addRoutes(e){return this.#t.__children=[...this.#t.__children??[],...d(e)],this.getRoutes()}}function x(e,t,n,r){const o=t.name??r?.(t);if(o&&(e.has(o)?e.get(o)?.push(t):e.set(o,[t])),Array.isArray(n))for(const o of n)o.parent=t,x(e,o,o.__children??o.children,r)}function A(e,t){const n=e.get(t);if(n){if(n.length>1)throw new Error(`Duplicate route with name "${t}". Try seting unique 'name' route properties.`);return n[0]}}var S=function(t,r={}){if(!(t instanceof E))throw new TypeError("An instance of Resolver is expected");const o=new Map,i=new Map;return(a,s)=>{let c=A(i,a);if(!c&&(i.clear(),x(i,t.root,t.root.__children,r.cacheKeyProvider),c=A(i,a),!c))throw new Error(`Route "${a}" not found`);let d=c.fullPath?o.get(c.fullPath):void 0;if(!d){let t=y(c),n=c.parent;for(;n;){const e=y(n);e&&(t=`${e.replace(/\/$/u,"")}/${t.replace(/^\//u,"")}`),n=n.parent}const r=e(t),i=Object.create(null);for(const e of r)l(e)||(i[e.name]=!0);d={keys:i,tokens:r},o.set(t,d),c.fullPath=t}let u=n(d.tokens,{encode:encodeURIComponent,...r})(s)||"/";if(r.stringifyQueryParams&&s){const e={};for(const[t,n]of Object.entries(s))!(t in d.keys)&&n&&(e[t]=n);const t=r.stringifyQueryParams(e);t&&(u+=t.startsWith("?")?t:`?${t}`)}return u}};const C=/\/\*[\*!]\s+vaadin-dev-mode:start([\s\S]*)vaadin-dev-mode:end\s+\*\*\//i,O=window.Vaadin&&window.Vaadin.Flow&&window.Vaadin.Flow.clients;function k(e,t){if("function"!=typeof e)return;const n=C.exec(e.toString());if(n)try{e=new Function(n[1])}catch(e){console.log("vaadin-development-mode-detector: uncommentAndRun() failed",e)}return e(t)}window.Vaadin=window.Vaadin||{};const P=function(e,t){if(window.Vaadin.developmentMode)return k(e,t)};function N(){
/*! vaadin-dev-mode:start
  (function () {
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var getPolymerVersion = function getPolymerVersion() {
  return window.Polymer && window.Polymer.version;
};

var StatisticsGatherer = function () {
  function StatisticsGatherer(logger) {
    classCallCheck(this, StatisticsGatherer);

    this.now = new Date().getTime();
    this.logger = logger;
  }

  createClass(StatisticsGatherer, [{
    key: 'frameworkVersionDetectors',
    value: function frameworkVersionDetectors() {
      return {
        'Flow': function Flow() {
          if (window.Vaadin && window.Vaadin.Flow && window.Vaadin.Flow.clients) {
            var flowVersions = Object.keys(window.Vaadin.Flow.clients).map(function (key) {
              return window.Vaadin.Flow.clients[key];
            }).filter(function (client) {
              return client.getVersionInfo;
            }).map(function (client) {
              return client.getVersionInfo().flow;
            });
            if (flowVersions.length > 0) {
              return flowVersions[0];
            }
          }
        },
        'Vaadin Framework': function VaadinFramework() {
          if (window.vaadin && window.vaadin.clients) {
            var frameworkVersions = Object.values(window.vaadin.clients).filter(function (client) {
              return client.getVersionInfo;
            }).map(function (client) {
              return client.getVersionInfo().vaadinVersion;
            });
            if (frameworkVersions.length > 0) {
              return frameworkVersions[0];
            }
          }
        },
        'AngularJs': function AngularJs() {
          if (window.angular && window.angular.version && window.angular.version) {
            return window.angular.version.full;
          }
        },
        'Angular': function Angular() {
          if (window.ng) {
            var tags = document.querySelectorAll("[ng-version]");
            if (tags.length > 0) {
              return tags[0].getAttribute("ng-version");
            }
            return "Unknown";
          }
        },
        'Backbone.js': function BackboneJs() {
          if (window.Backbone) {
            return window.Backbone.VERSION;
          }
        },
        'React': function React() {
          var reactSelector = '[data-reactroot], [data-reactid]';
          if (!!document.querySelector(reactSelector)) {
            // React does not publish the version by default
            return "unknown";
          }
        },
        'Ember': function Ember() {
          if (window.Em && window.Em.VERSION) {
            return window.Em.VERSION;
          } else if (window.Ember && window.Ember.VERSION) {
            return window.Ember.VERSION;
          }
        },
        'jQuery': function (_jQuery) {
          function jQuery() {
            return _jQuery.apply(this, arguments);
          }

          jQuery.toString = function () {
            return _jQuery.toString();
          };

          return jQuery;
        }(function () {
          if (typeof jQuery === 'function' && jQuery.prototype.jquery !== undefined) {
            return jQuery.prototype.jquery;
          }
        }),
        'Polymer': function Polymer() {
          var version = getPolymerVersion();
          if (version) {
            return version;
          }
        },
        'LitElement': function LitElement() {
          var version = window.litElementVersions && window.litElementVersions[0];
          if (version) {
            return version;
          }
        },
        'LitHtml': function LitHtml() {
          var version = window.litHtmlVersions && window.litHtmlVersions[0];
          if (version) {
            return version;
          }
        },
        'Vue.js': function VueJs() {
          if (window.Vue) {
            return window.Vue.version;
          }
        }
      };
    }
  }, {
    key: 'getUsedVaadinElements',
    value: function getUsedVaadinElements(elements) {
      var version = getPolymerVersion();
      var elementClasses = void 0;
      // NOTE: In case you edit the code here, YOU MUST UPDATE any statistics reporting code in Flow.
      // Check all locations calling the method getEntries() in
      // https://github.com/vaadin/flow/blob/master/flow-server/src/main/java/com/vaadin/flow/internal/UsageStatistics.java#L106
      // Currently it is only used by BootstrapHandler.
      if (version && version.indexOf('2') === 0) {
        // Polymer 2: components classes are stored in window.Vaadin
        elementClasses = Object.keys(window.Vaadin).map(function (c) {
          return window.Vaadin[c];
        }).filter(function (c) {
          return c.is;
        });
      } else {
        // Polymer 3: components classes are stored in window.Vaadin.registrations
        elementClasses = window.Vaadin.registrations || [];
      }
      elementClasses.forEach(function (klass) {
        var version = klass.version ? klass.version : "0.0.0";
        elements[klass.is] = { version: version };
      });
    }
  }, {
    key: 'getUsedVaadinThemes',
    value: function getUsedVaadinThemes(themes) {
      ['Lumo', 'Material'].forEach(function (themeName) {
        var theme;
        var version = getPolymerVersion();
        if (version && version.indexOf('2') === 0) {
          // Polymer 2: themes are stored in window.Vaadin
          theme = window.Vaadin[themeName];
        } else {
          // Polymer 3: themes are stored in custom element registry
          theme = customElements.get('vaadin-' + themeName.toLowerCase() + '-styles');
        }
        if (theme && theme.version) {
          themes[themeName] = { version: theme.version };
        }
      });
    }
  }, {
    key: 'getFrameworks',
    value: function getFrameworks(frameworks) {
      var detectors = this.frameworkVersionDetectors();
      Object.keys(detectors).forEach(function (framework) {
        var detector = detectors[framework];
        try {
          var version = detector();
          if (version) {
            frameworks[framework] = { version: version };
          }
        } catch (e) {}
      });
    }
  }, {
    key: 'gather',
    value: function gather(storage) {
      var storedStats = storage.read();
      var gatheredStats = {};
      var types = ["elements", "frameworks", "themes"];

      types.forEach(function (type) {
        gatheredStats[type] = {};
        if (!storedStats[type]) {
          storedStats[type] = {};
        }
      });

      var previousStats = JSON.stringify(storedStats);

      this.getUsedVaadinElements(gatheredStats.elements);
      this.getFrameworks(gatheredStats.frameworks);
      this.getUsedVaadinThemes(gatheredStats.themes);

      var now = this.now;
      types.forEach(function (type) {
        var keys = Object.keys(gatheredStats[type]);
        keys.forEach(function (key) {
          if (!storedStats[type][key] || _typeof(storedStats[type][key]) != _typeof({})) {
            storedStats[type][key] = { firstUsed: now };
          }
          // Discards any previously logged version number
          storedStats[type][key].version = gatheredStats[type][key].version;
          storedStats[type][key].lastUsed = now;
        });
      });

      var newStats = JSON.stringify(storedStats);
      storage.write(newStats);
      if (newStats != previousStats && Object.keys(storedStats).length > 0) {
        this.logger.debug("New stats: " + newStats);
      }
    }
  }]);
  return StatisticsGatherer;
}();

var StatisticsStorage = function () {
  function StatisticsStorage(key) {
    classCallCheck(this, StatisticsStorage);

    this.key = key;
  }

  createClass(StatisticsStorage, [{
    key: 'read',
    value: function read() {
      var localStorageStatsString = localStorage.getItem(this.key);
      try {
        return JSON.parse(localStorageStatsString ? localStorageStatsString : '{}');
      } catch (e) {
        return {};
      }
    }
  }, {
    key: 'write',
    value: function write(data) {
      localStorage.setItem(this.key, data);
    }
  }, {
    key: 'clear',
    value: function clear() {
      localStorage.removeItem(this.key);
    }
  }, {
    key: 'isEmpty',
    value: function isEmpty() {
      var storedStats = this.read();
      var empty = true;
      Object.keys(storedStats).forEach(function (key) {
        if (Object.keys(storedStats[key]).length > 0) {
          empty = false;
        }
      });

      return empty;
    }
  }]);
  return StatisticsStorage;
}();

var StatisticsSender = function () {
  function StatisticsSender(url, logger) {
    classCallCheck(this, StatisticsSender);

    this.url = url;
    this.logger = logger;
  }

  createClass(StatisticsSender, [{
    key: 'send',
    value: function send(data, errorHandler) {
      var logger = this.logger;

      if (navigator.onLine === false) {
        logger.debug("Offline, can't send");
        errorHandler();
        return;
      }
      logger.debug("Sending data to " + this.url);

      var req = new XMLHttpRequest();
      req.withCredentials = true;
      req.addEventListener("load", function () {
        // Stats sent, nothing more to do
        logger.debug("Response: " + req.responseText);
      });
      req.addEventListener("error", function () {
        logger.debug("Send failed");
        errorHandler();
      });
      req.addEventListener("abort", function () {
        logger.debug("Send aborted");
        errorHandler();
      });
      req.open("POST", this.url);
      req.setRequestHeader("Content-Type", "application/json");
      req.send(data);
    }
  }]);
  return StatisticsSender;
}();

var StatisticsLogger = function () {
  function StatisticsLogger(id) {
    classCallCheck(this, StatisticsLogger);

    this.id = id;
  }

  createClass(StatisticsLogger, [{
    key: '_isDebug',
    value: function _isDebug() {
      return localStorage.getItem("vaadin." + this.id + ".debug");
    }
  }, {
    key: 'debug',
    value: function debug(msg) {
      if (this._isDebug()) {
        console.info(this.id + ": " + msg);
      }
    }
  }]);
  return StatisticsLogger;
}();

var UsageStatistics = function () {
  function UsageStatistics() {
    classCallCheck(this, UsageStatistics);

    this.now = new Date();
    this.timeNow = this.now.getTime();
    this.gatherDelay = 10; // Delay between loading this file and gathering stats
    this.initialDelay = 24 * 60 * 60;

    this.logger = new StatisticsLogger("statistics");
    this.storage = new StatisticsStorage("vaadin.statistics.basket");
    this.gatherer = new StatisticsGatherer(this.logger);
    this.sender = new StatisticsSender("https://tools.vaadin.com/usage-stats/submit", this.logger);
  }

  createClass(UsageStatistics, [{
    key: 'maybeGatherAndSend',
    value: function maybeGatherAndSend() {
      var _this = this;

      if (localStorage.getItem(UsageStatistics.optOutKey)) {
        return;
      }
      this.gatherer.gather(this.storage);
      setTimeout(function () {
        _this.maybeSend();
      }, this.gatherDelay * 1000);
    }
  }, {
    key: 'lottery',
    value: function lottery() {
      return true;
    }
  }, {
    key: 'currentMonth',
    value: function currentMonth() {
      return this.now.getYear() * 12 + this.now.getMonth();
    }
  }, {
    key: 'maybeSend',
    value: function maybeSend() {
      var firstUse = Number(localStorage.getItem(UsageStatistics.firstUseKey));
      var monthProcessed = Number(localStorage.getItem(UsageStatistics.monthProcessedKey));

      if (!firstUse) {
        // Use a grace period to avoid interfering with tests, incognito mode etc
        firstUse = this.timeNow;
        localStorage.setItem(UsageStatistics.firstUseKey, firstUse);
      }

      if (this.timeNow < firstUse + this.initialDelay * 1000) {
        this.logger.debug("No statistics will be sent until the initial delay of " + this.initialDelay + "s has passed");
        return;
      }
      if (this.currentMonth() <= monthProcessed) {
        this.logger.debug("This month has already been processed");
        return;
      }
      localStorage.setItem(UsageStatistics.monthProcessedKey, this.currentMonth());
      // Use random sampling
      if (this.lottery()) {
        this.logger.debug("Congratulations, we have a winner!");
      } else {
        this.logger.debug("Sorry, no stats from you this time");
        return;
      }

      this.send();
    }
  }, {
    key: 'send',
    value: function send() {
      // Ensure we have the latest data
      this.gatherer.gather(this.storage);

      // Read, send and clean up
      var data = this.storage.read();
      data["firstUse"] = Number(localStorage.getItem(UsageStatistics.firstUseKey));
      data["usageStatisticsVersion"] = UsageStatistics.version;
      var info = 'This request contains usage statistics gathered from the application running in development mode. \n\nStatistics gathering is automatically disabled and excluded from production builds.\n\nFor details and to opt-out, see https://github.com/vaadin/vaadin-usage-statistics.\n\n\n\n';
      var self = this;
      this.sender.send(info + JSON.stringify(data), function () {
        // Revert the 'month processed' flag
        localStorage.setItem(UsageStatistics.monthProcessedKey, self.currentMonth() - 1);
      });
    }
  }], [{
    key: 'version',
    get: function get$1() {
      return '2.1.2';
    }
  }, {
    key: 'firstUseKey',
    get: function get$1() {
      return 'vaadin.statistics.firstuse';
    }
  }, {
    key: 'monthProcessedKey',
    get: function get$1() {
      return 'vaadin.statistics.monthProcessed';
    }
  }, {
    key: 'optOutKey',
    get: function get$1() {
      return 'vaadin.statistics.optout';
    }
  }]);
  return UsageStatistics;
}();

try {
  window.Vaadin = window.Vaadin || {};
  window.Vaadin.usageStatsChecker = window.Vaadin.usageStatsChecker || new UsageStatistics();
  window.Vaadin.usageStatsChecker.maybeGatherAndSend();
} catch (e) {
  // Intentionally ignored as this is not a problem in the app being developed
}

}());

  vaadin-dev-mode:end **/}void 0===window.Vaadin.developmentMode&&(window.Vaadin.developmentMode=function(){try{return!!localStorage.getItem("vaadin.developmentmode.force")||["localhost","127.0.0.1"].indexOf(window.location.hostname)>=0&&(O?!(O&&Object.keys(O).map((e=>O[e])).filter((e=>e.productionMode)).length>0):!k((function(){return!0})))}catch(e){return!1}}());!function(e,t=(window.Vaadin??={})){t.registrations??=[],t.registrations.push({is:"@vaadin/router",version:"2.0.0"})}(),P(N);var R=async function(e,t){return e.classList.add(t),await new Promise((n=>{if((e=>{const t=getComputedStyle(e).getPropertyValue("animation-name");return t&&"none"!==t})(e)){const r=e.getBoundingClientRect(),o=`height: ${r.bottom-r.top}px; width: ${r.right-r.left}px`;e.setAttribute("style",`position: absolute; ${o}`),((e,t)=>{const n=()=>{e.removeEventListener("animationend",n),t()};e.addEventListener("animationend",n)})(e,(()=>{e.classList.remove(t),e.removeAttribute("style"),n()}))}else e.classList.remove(t),n()}))};function T(e){if(!e||!l(e.path))throw new Error(u('Expected route config to be an object with a "path" string property, or an array of such objects'));if(!(c(e.action)||Array.isArray(e.children)||c(e.children)||l(e.component)||l(e.redirect)))throw new Error(u(`Expected route config "${e.path}" to include either "component, redirect" or "action" function but none found.`));e.redirect&&["bundle","component"].forEach((t=>{t in e&&console.warn(u(`Route config "${String(e.path)}" has both "redirect" and "${t}" properties, and "redirect" will always override the latter. Did you mean to only use "${t}"?`))}))}function j(e){d(e).forEach((e=>T(e)))}function I(e,t){const n=t.__effectiveBaseUrl;return n?new URL(e.replace(/^\//u,""),n).pathname:e}function L(e){return e.map((e=>e.path)).reduce(((e,t)=>t.length?`${e.replace(/\/$/u,"")}/${t.replace(/^\//u,"")}`:e),"")}function M({chain:e=[],hash:n="",params:r={},pathname:o="",redirectFrom:i,resolver:a,search:s=""},c){const l=e.map((e=>e.route));return{baseUrl:a?.baseUrl??"",getUrl:(n={})=>a?I(t(function(e){return L(e.map((e=>e.route)))}(e))({...r,...n}),a):"",hash:n,params:r,pathname:o,redirectFrom:i,route:c??(Array.isArray(l)?l.at(-1):void 0)??null,routes:l,search:s,searchParams:new URLSearchParams(s)}}function D(e,t){const n={...e.params};return{redirect:{from:e.pathname,params:n,pathname:t}}}function U(e,t,...n){if("function"==typeof e)return e.apply(t,n)}function B(e,t,...n){return r=>r&&s(r)&&("cancel"in r||"redirect"in r)?r:U(t?.[e],t,...n)}function z(e,t){return!window.dispatchEvent(new CustomEvent(`vaadin-router-${e}`,{cancelable:"go"===e,detail:t}))}function F(e){if(e instanceof Element)return e.nodeName.toLowerCase()}function H(e){if(e.defaultPrevented)return;if(0!==e.button)return;if(e.shiftKey||e.ctrlKey||e.altKey||e.metaKey)return;let t=e.target;const n=e instanceof MouseEvent?e.composedPath():e.path??[];for(let e=0;e<n.length;e++){const r=n[e];if("nodeName"in r&&"a"===r.nodeName.toLowerCase()){t=r;break}}for(;t&&t instanceof Node&&"a"!==F(t);)t=t.parentNode;if(!t||"a"!==F(t))return;const r=t;if(r.target&&"_self"!==r.target.toLowerCase())return;if(r.hasAttribute("download"))return;if(r.hasAttribute("router-ignore"))return;if(r.pathname===window.location.pathname&&""!==r.hash)return;const o=r.origin||function(e){const{port:t,protocol:n}=e;return`${n}//${"http:"===n&&"80"===t||"https:"===n&&"443"===t?e.hostname:e.host}`}(r);if(o!==window.location.origin)return;const{hash:i,pathname:a,search:s}=r;z("go",{hash:i,pathname:a,search:s})&&e instanceof MouseEvent&&(e.preventDefault(),"click"===e.type&&window.scrollTo(0,0))}function W(e){if("vaadin-router-ignore"===e.state)return;const{hash:t,pathname:n,search:r}=window.location;z("go",{hash:t,pathname:n,search:r})}let V=[];const q={CLICK:{activate(){window.document.addEventListener("click",H)},inactivate(){window.document.removeEventListener("click",H)}},POPSTATE:{activate(){window.addEventListener("popstate",W)},inactivate(){window.removeEventListener("popstate",W)}}};function J(e=[]){V.forEach((e=>e.inactivate())),e.forEach((e=>e.activate())),V=e}function K(){return{cancel:!0}}const Y={__renderId:-1,params:{},route:{__synthetic:!0,children:[],path:"",action(){}},pathname:"",next:async()=>p};class X extends E{location=M({resolver:this});ready=Promise.resolve(this.location);#n=new WeakSet;#r=new WeakSet;#o=this.#i.bind(this);#a=0;#s;__previousContext;#c;#l=null;#d=null;constructor(e,t){const n=document.head.querySelector("base"),r=n?.getAttribute("href");super([],{baseUrl:r?new URL(r,document.URL).href.replace(/[^/]*$/u,""):void 0,...t,resolveRoute:async e=>await this.#u(e)}),J(Object.values(q)),this.setOutlet(e),this.subscribe()}async#u(e){const{route:t}=e;if(c(t.children)){let n=await t.children(function({next:e,...t}){return t}(e));c(t.children)||({children:n}=t),function(e,t){if(!Array.isArray(e)&&!s(e))throw new Error(u(`Incorrect "children" value for the route ${String(t.path)}: expected array or object, but got ${String(e)}`));const n=d(e);n.forEach((e=>T(e))),t.__children=n}(n,t)}const n={component:e=>{const t=document.createElement(e);return this.#r.add(t),t},prevent:K,redirect:t=>D(e,t)};return await Promise.resolve().then((async()=>{if(this.#h(e))return await U(t.action,t,e,n)})).then((e=>null==e||"object"!=typeof e&&"symbol"!=typeof e||!(e instanceof HTMLElement||e===p||s(e)&&"redirect"in e)?l(t.redirect)?n.redirect(t.redirect):void 0:e)).then((e=>null!=e?e:l(t.component)?n.component(t.component):void 0))}setOutlet(e){e&&this.#p(e),this.#s=e}getOutlet(){return this.#s}async setRoutes(e,t=!1){return this.__previousContext=void 0,this.#c=void 0,j(e),super.setRoutes(e),t||this.#i(),await this.ready}addRoutes(e){return j(e),super.addRoutes(e)}async render(e,t=!1){this.#a+=1;const n=this.#a,r={...Y,...l(e)?{hash:"",search:"",pathname:e}:e,__renderId:n};return this.ready=this.#f(r,t),await this.ready}async#f(e,t){const{__renderId:n}=e;try{const r=await this.resolve(e),o=await this.#m(r);if(!this.#h(o))return this.location;const i=this.__previousContext;if(o===i)return this.#y(i,!0),this.location;if(this.location=M(o),t&&this.#y(o,1===n),z("location-changed",{router:this,location:this.location}),o.__skipAttach)return this.#g(o,i),this.__previousContext=o,this.location;this.#b(o,i);const a=this.#w(o);if(this.#v(o),this.#_(o,i),await a,this.#h(o))return this.#$(),this.__previousContext=o,this.location}catch(r){if(n===this.#a){t&&this.#y(this.context);for(const e of this.#s?.children??[])e.remove();throw this.location=M(Object.assign(e,{resolver:this})),z("error",{router:this,error:r,...e}),r}}return this.location}async#m(e,t=e){const n=await this.#E(t),r=n!==t?n:e,o=I(L(n.chain??[]),this)===n.pathname,i=async(e,t=e.route,n)=>{const r=await e.next(!1,t,n);return null===r||r===p?o?e:null!=t.parent?await i(e,t.parent,r):r:r},a=await i(n);if(null==a||a===p)throw f(r);return a!==n?await this.#m(r,a):await this.#x(n)}async#E(e){const{result:t}=e;if(t instanceof HTMLElement)return function(e,t){if(t.location=M(e),e.chain){const n=e.chain.map((e=>e.route)).indexOf(e.route);e.chain[n].element=t}}(e,t),e;if(t&&"redirect"in t){const n=await this.#A(t.redirect,e.__redirectCount,e.__renderId);return await this.#E(n)}throw t instanceof Error?t:new Error(u(`Invalid route resolution result for path "${e.pathname}". Expected redirect object or HTML element, but got: "${function(e){if("object"!=typeof e)return String(e);const[t="Unknown"]=/ (.*)\]$/u.exec(String(e))??[];return"Object"===t||"Array"===t?`${t} ${JSON.stringify(e)}`:t}(t)}". Double check the action return value for the route.`))}async#x(e){return await this.#S(e).then((async t=>t===this.__previousContext||t===e?t:await this.#m(t)))}async#S(e){const t=this.__previousContext??{},n=t.chain??[],r=e.chain??[];let o=Promise.resolve(void 0);const i=t=>D(e,t);if(e.__divergedChainIndex=0,e.__skipAttach=!1,n.length){for(let t=0;t<Math.min(n.length,r.length)&&(n[t].route===r[t].route&&(n[t].path===r[t].path||n[t].element===r[t].element)&&this.#C(n[t].element,r[t].element));e.__divergedChainIndex++,t++);if(e.__skipAttach=r.length===n.length&&e.__divergedChainIndex===r.length&&this.#C(e.result,t.result),e.__skipAttach){for(let t=r.length-1;t>=0;t--)o=this.#O(o,e,{prevent:K},n[t]);for(let t=0;t<r.length;t++)o=this.#k(o,e,{prevent:K,redirect:i},r[t]),n[t].element.location=M(e,n[t].route)}else for(let t=n.length-1;t>=e.__divergedChainIndex;t--)o=this.#O(o,e,{prevent:K},n[t])}if(!e.__skipAttach)for(let t=0;t<r.length;t++)t<e.__divergedChainIndex?t<n.length&&n[t].element&&(n[t].element.location=M(e,n[t].route)):(o=this.#k(o,e,{prevent:K,redirect:i},r[t]),r[t].element&&(r[t].element.location=M(e,r[t].route)));return await o.then((async t=>{if(t&&s(t)){if("cancel"in t&&this.__previousContext)return this.__previousContext.__renderId=e.__renderId,this.__previousContext;if("redirect"in t)return await this.#A(t.redirect,e.__redirectCount,e.__renderId)}return e}))}async#O(e,t,n,r){const o=M(t);let i=await e;if(this.#h(t)){i=B("onBeforeLeave",r.element,o,n,this)(i)}if(!s(i)||!("redirect"in i))return i}async#k(e,t,n,r){const o=M(t,r.route),i=await e;if(this.#h(t)){return B("onBeforeEnter",r.element,o,n,this)(i)}}#C(e,t){return e instanceof Element&&t instanceof Element&&(this.#r.has(e)&&this.#r.has(t)?e.localName===t.localName:e===t)}#h(e){return e.__renderId===this.#a}async#A(e,t=0,n=0){if(t>256)throw new Error(u(`Too many redirects when rendering ${e.from}`));return await this.resolve({...Y,pathname:this.urlForPath(e.pathname,e.params),redirectFrom:e.from,__redirectCount:t+1,__renderId:n})}#p(e=this.#s){if(!(e instanceof Element||e instanceof DocumentFragment))throw new TypeError(u(`Expected router outlet to be a valid DOM Element | DocumentFragment (but got ${e})`))}#y({pathname:e,search:t="",hash:n=""},r){if(window.location.pathname!==e||window.location.search!==t||window.location.hash!==n){const o=r?"replaceState":"pushState";window.history[o](null,document.title,e+t+n),window.dispatchEvent(new PopStateEvent("popstate",{state:"vaadin-router-ignore"}))}}#g(e,t){let n=this.#s;for(let r=0;r<(e.__divergedChainIndex??0);r++){const o=t?.chain?.[r].element;if(o){if(o.parentNode!==n)break;e.chain[r].element=o,n=o}}return n}#b(e,t){this.#p(),this.#P();const n=this.#g(e,t);this.#l=[],this.#d=Array.from(n?.children??[]).filter((t=>this.#n.has(t)&&t!==e.result));let r=n;for(let t=e.__divergedChainIndex??0;t<(e.chain?.length??0);t++){const o=e.chain[t].element;o&&(r?.appendChild(o),this.#n.add(o),r===n&&this.#l.push(o),r=o)}}#$(){if(this.#d)for(const e of this.#d)e.remove();this.#d=null,this.#l=null}#P(){if(this.#d&&this.#l){for(const e of this.#l)e.remove();this.#d=null,this.#l=null}}#_(e,t){if(t?.chain&&null!=e.__divergedChainIndex)for(let n=t.chain.length-1;n>=e.__divergedChainIndex&&this.#h(e);n--){const r=t.chain[n].element;if(r)try{const t=M(e);U(r.onAfterLeave,r,t,{},this)}finally{if(this.#d?.includes(r))for(const e of r.children)e.remove()}}}#v(e){if(e.chain&&null!=e.__divergedChainIndex)for(let t=e.__divergedChainIndex;t<e.chain.length&&this.#h(e);t++){const n=e.chain[t].element;if(n){const r=M(e,e.chain[t].route);U(n.onAfterEnter,n,r,{},this)}}}async#w(e){const t=this.#d?.[0],n=this.#l?.[0],r=[],{chain:o=[]}=e;let i;for(let e=o.length-1;e>=0;e--)if(o[e].route.animate){i=o[e].route.animate;break}if(t&&n&&i){const e=s(i)&&i.leave?i.leave:"leaving",o=s(i)&&i.enter?i.enter:"entering";r.push(R(t,e)),r.push(R(n,o))}return await Promise.all(r),e}subscribe(){window.addEventListener("vaadin-router-go",this.#o)}unsubscribe(){window.removeEventListener("vaadin-router-go",this.#o)}#i(e){const{pathname:t,search:n,hash:r}=e instanceof CustomEvent?e.detail:window.location;l(this.__normalizePathname(t))&&(e?.preventDefault&&e.preventDefault(),this.render({pathname:t,search:n,hash:r},!0))}static setTriggers(...e){J(e)}urlForName(e,t){return this.#c||(this.#c=S(this,{cacheKeyProvider:e=>"component"in e&&"string"==typeof e.component?e.component:void 0})),I(this.#c(e,t??void 0),this)}urlForPath(e,n){return I(t(e)(n??void 0),this)}static go(e){const{pathname:t,search:n,hash:r}=l(e)?new URL(e,"http://a"):e;return z("go",{pathname:t,search:n,hash:r})}}
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const G=globalThis,Q=G.ShadowRoot&&(void 0===G.ShadyCSS||G.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Z=Symbol(),ee=new WeakMap;let te=class{constructor(e,t,n){if(this._$cssResult$=!0,n!==Z)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(Q&&void 0===e){const n=void 0!==t&&1===t.length;n&&(e=ee.get(t)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),n&&ee.set(t,e))}return e}toString(){return this.cssText}};const ne=(e,...t)=>{const n=1===e.length?e[0]:t.reduce(((t,n,r)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(n)+e[r+1]),e[0]);return new te(n,e,Z)},re=Q?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const n of e.cssRules)t+=n.cssText;return(e=>new te("string"==typeof e?e:e+"",void 0,Z))(t)})(e):e
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */,{is:oe,defineProperty:ie,getOwnPropertyDescriptor:ae,getOwnPropertyNames:se,getOwnPropertySymbols:ce,getPrototypeOf:le}=Object,de=globalThis,ue=de.trustedTypes,he=ue?ue.emptyScript:"",pe=de.reactiveElementPolyfillSupport,fe=(e,t)=>e,me={toAttribute(e,t){switch(t){case Boolean:e=e?he:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let n=e;switch(t){case Boolean:n=null!==e;break;case Number:n=null===e?null:Number(e);break;case Object:case Array:try{n=JSON.parse(e)}catch(e){n=null}}return n}},ye=(e,t)=>!oe(e,t),ge={attribute:!0,type:String,converter:me,reflect:!1,hasChanged:ye};Symbol.metadata??=Symbol("metadata"),de.litPropertyMetadata??=new WeakMap;class be extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=ge){if(t.state&&(t.attribute=!1),this._$Ei(),this.elementProperties.set(e,t),!t.noAccessor){const n=Symbol(),r=this.getPropertyDescriptor(e,n,t);void 0!==r&&ie(this.prototype,e,r)}}static getPropertyDescriptor(e,t,n){const{get:r,set:o}=ae(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get(){return r?.call(this)},set(t){const i=r?.call(this);o.call(this,t),this.requestUpdate(e,i,n)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??ge}static _$Ei(){if(this.hasOwnProperty(fe("elementProperties")))return;const e=le(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(fe("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(fe("properties"))){const e=this.properties,t=[...se(e),...ce(e)];for(const n of t)this.createProperty(n,e[n])}const e=this[Symbol.metadata];if(null!==e){const t=litPropertyMetadata.get(e);if(void 0!==t)for(const[e,n]of t)this.elementProperties.set(e,n)}this._$Eh=new Map;for(const[e,t]of this.elementProperties){const n=this._$Eu(e,t);void 0!==n&&this._$Eh.set(n,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const n=new Set(e.flat(1/0).reverse());for(const e of n)t.unshift(re(e))}else void 0!==e&&t.push(re(e));return t}static _$Eu(e,t){const n=t.attribute;return!1===n?void 0:"string"==typeof n?n:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise((e=>this.enableUpdating=e)),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach((e=>e(this)))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const n of t.keys())this.hasOwnProperty(n)&&(e.set(n,this[n]),delete this[n]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((e,t)=>{if(Q)e.adoptedStyleSheets=t.map((e=>e instanceof CSSStyleSheet?e:e.styleSheet));else for(const n of t){const t=document.createElement("style"),r=G.litNonce;void 0!==r&&t.setAttribute("nonce",r),t.textContent=n.cssText,e.appendChild(t)}})(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach((e=>e.hostConnected?.()))}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach((e=>e.hostDisconnected?.()))}attributeChangedCallback(e,t,n){this._$AK(e,n)}_$EC(e,t){const n=this.constructor.elementProperties.get(e),r=this.constructor._$Eu(e,n);if(void 0!==r&&!0===n.reflect){const o=(void 0!==n.converter?.toAttribute?n.converter:me).toAttribute(t,n.type);this._$Em=e,null==o?this.removeAttribute(r):this.setAttribute(r,o),this._$Em=null}}_$AK(e,t){const n=this.constructor,r=n._$Eh.get(e);if(void 0!==r&&this._$Em!==r){const e=n.getPropertyOptions(r),o="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:me;this._$Em=r,this[r]=o.fromAttribute(t,e.type),this._$Em=null}}requestUpdate(e,t,n){if(void 0!==e){if(n??=this.constructor.getPropertyOptions(e),!(n.hasChanged??ye)(this[e],t))return;this.P(e,t,n)}!1===this.isUpdatePending&&(this._$ES=this._$ET())}P(e,t,n){this._$AL.has(e)||this._$AL.set(e,t),!0===n.reflect&&this._$Em!==e&&(this._$Ej??=new Set).add(e)}async _$ET(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[t,n]of e)!0!==n.wrapped||this._$AL.has(t)||void 0===this[t]||this.P(t,this[t],n)}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach((e=>e.hostUpdate?.())),this.update(t)):this._$EU()}catch(t){throw e=!1,this._$EU(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach((e=>e.hostUpdated?.())),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Ej&&=this._$Ej.forEach((e=>this._$EC(e,this[e]))),this._$EU()}updated(e){}firstUpdated(e){}}be.elementStyles=[],be.shadowRootOptions={mode:"open"},be[fe("elementProperties")]=new Map,be[fe("finalized")]=new Map,pe?.({ReactiveElement:be}),(de.reactiveElementVersions??=[]).push("2.0.4");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const we=globalThis,ve=we.trustedTypes,_e=ve?ve.createPolicy("lit-html",{createHTML:e=>e}):void 0,$e="$lit$",Ee=`lit$${Math.random().toFixed(9).slice(2)}$`,xe="?"+Ee,Ae=`<${xe}>`,Se=document,Ce=()=>Se.createComment(""),Oe=e=>null===e||"object"!=typeof e&&"function"!=typeof e,ke=Array.isArray,Pe="[ \t\n\f\r]",Ne=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Re=/-->/g,Te=/>/g,je=RegExp(`>|${Pe}(?:([^\\s"'>=/]+)(${Pe}*=${Pe}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),Ie=/'/g,Le=/"/g,Me=/^(?:script|style|textarea|title)$/i,De=(e=>(t,...n)=>({_$litType$:e,strings:t,values:n}))(1),Ue=Symbol.for("lit-noChange"),Be=Symbol.for("lit-nothing"),ze=new WeakMap,Fe=Se.createTreeWalker(Se,129);function He(e,t){if(!ke(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==_e?_e.createHTML(t):t}const We=(e,t)=>{const n=e.length-1,r=[];let o,i=2===t?"<svg>":3===t?"<math>":"",a=Ne;for(let t=0;t<n;t++){const n=e[t];let s,c,l=-1,d=0;for(;d<n.length&&(a.lastIndex=d,c=a.exec(n),null!==c);)d=a.lastIndex,a===Ne?"!--"===c[1]?a=Re:void 0!==c[1]?a=Te:void 0!==c[2]?(Me.test(c[2])&&(o=RegExp("</"+c[2],"g")),a=je):void 0!==c[3]&&(a=je):a===je?">"===c[0]?(a=o??Ne,l=-1):void 0===c[1]?l=-2:(l=a.lastIndex-c[2].length,s=c[1],a=void 0===c[3]?je:'"'===c[3]?Le:Ie):a===Le||a===Ie?a=je:a===Re||a===Te?a=Ne:(a=je,o=void 0);const u=a===je&&e[t+1].startsWith("/>")?" ":"";i+=a===Ne?n+Ae:l>=0?(r.push(s),n.slice(0,l)+$e+n.slice(l)+Ee+u):n+Ee+(-2===l?t:u)}return[He(e,i+(e[n]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),r]};class Ve{constructor({strings:e,_$litType$:t},n){let r;this.parts=[];let o=0,i=0;const a=e.length-1,s=this.parts,[c,l]=We(e,t);if(this.el=Ve.createElement(c,n),Fe.currentNode=this.el.content,2===t||3===t){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(r=Fe.nextNode())&&s.length<a;){if(1===r.nodeType){if(r.hasAttributes())for(const e of r.getAttributeNames())if(e.endsWith($e)){const t=l[i++],n=r.getAttribute(e).split(Ee),a=/([.?@])?(.*)/.exec(t);s.push({type:1,index:o,name:a[2],strings:n,ctor:"."===a[1]?Xe:"?"===a[1]?Ge:"@"===a[1]?Qe:Ye}),r.removeAttribute(e)}else e.startsWith(Ee)&&(s.push({type:6,index:o}),r.removeAttribute(e));if(Me.test(r.tagName)){const e=r.textContent.split(Ee),t=e.length-1;if(t>0){r.textContent=ve?ve.emptyScript:"";for(let n=0;n<t;n++)r.append(e[n],Ce()),Fe.nextNode(),s.push({type:2,index:++o});r.append(e[t],Ce())}}}else if(8===r.nodeType)if(r.data===xe)s.push({type:2,index:o});else{let e=-1;for(;-1!==(e=r.data.indexOf(Ee,e+1));)s.push({type:7,index:o}),e+=Ee.length-1}o++}}static createElement(e,t){const n=Se.createElement("template");return n.innerHTML=e,n}}function qe(e,t,n=e,r){if(t===Ue)return t;let o=void 0!==r?n._$Co?.[r]:n._$Cl;const i=Oe(t)?void 0:t._$litDirective$;return o?.constructor!==i&&(o?._$AO?.(!1),void 0===i?o=void 0:(o=new i(e),o._$AT(e,n,r)),void 0!==r?(n._$Co??=[])[r]=o:n._$Cl=o),void 0!==o&&(t=qe(e,o._$AS(e,t.values),o,r)),t}class Je{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:n}=this._$AD,r=(e?.creationScope??Se).importNode(t,!0);Fe.currentNode=r;let o=Fe.nextNode(),i=0,a=0,s=n[0];for(;void 0!==s;){if(i===s.index){let t;2===s.type?t=new Ke(o,o.nextSibling,this,e):1===s.type?t=new s.ctor(o,s.name,s.strings,this,e):6===s.type&&(t=new Ze(o,this,e)),this._$AV.push(t),s=n[++a]}i!==s?.index&&(o=Fe.nextNode(),i++)}return Fe.currentNode=Se,r}p(e){let t=0;for(const n of this._$AV)void 0!==n&&(void 0!==n.strings?(n._$AI(e,n,t),t+=n.strings.length-2):n._$AI(e[t])),t++}}class Ke{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,n,r){this.type=2,this._$AH=Be,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=n,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=qe(this,e,t),Oe(e)?e===Be||null==e||""===e?(this._$AH!==Be&&this._$AR(),this._$AH=Be):e!==this._$AH&&e!==Ue&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):(e=>ke(e)||"function"==typeof e?.[Symbol.iterator])(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==Be&&Oe(this._$AH)?this._$AA.nextSibling.data=e:this.T(Se.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:n}=e,r="number"==typeof n?this._$AC(e):(void 0===n.el&&(n.el=Ve.createElement(He(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===r)this._$AH.p(t);else{const e=new Je(r,this),n=e.u(this.options);e.p(t),this.T(n),this._$AH=e}}_$AC(e){let t=ze.get(e.strings);return void 0===t&&ze.set(e.strings,t=new Ve(e)),t}k(e){ke(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let n,r=0;for(const o of e)r===t.length?t.push(n=new Ke(this.O(Ce()),this.O(Ce()),this,this.options)):n=t[r],n._$AI(o),r++;r<t.length&&(this._$AR(n&&n._$AB.nextSibling,r),t.length=r)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e&&e!==this._$AB;){const t=e.nextSibling;e.remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}}class Ye{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,n,r,o){this.type=1,this._$AH=Be,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=o,n.length>2||""!==n[0]||""!==n[1]?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=Be}_$AI(e,t=this,n,r){const o=this.strings;let i=!1;if(void 0===o)e=qe(this,e,t,0),i=!Oe(e)||e!==this._$AH&&e!==Ue,i&&(this._$AH=e);else{const r=e;let a,s;for(e=o[0],a=0;a<o.length-1;a++)s=qe(this,r[n+a],t,a),s===Ue&&(s=this._$AH[a]),i||=!Oe(s)||s!==this._$AH[a],s===Be?e=Be:e!==Be&&(e+=(s??"")+o[a+1]),this._$AH[a]=s}i&&!r&&this.j(e)}j(e){e===Be?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class Xe extends Ye{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===Be?void 0:e}}class Ge extends Ye{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==Be)}}class Qe extends Ye{constructor(e,t,n,r,o){super(e,t,n,r,o),this.type=5}_$AI(e,t=this){if((e=qe(this,e,t,0)??Be)===Ue)return;const n=this._$AH,r=e===Be&&n!==Be||e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive,o=e!==Be&&(n===Be||r);r&&this.element.removeEventListener(this.name,this,n),o&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class Ze{constructor(e,t,n){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(e){qe(this,e)}}const et=we.litHtmlPolyfillSupport;et?.(Ve,Ke),(we.litHtmlVersions??=[]).push("3.2.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class tt extends be{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,n)=>{const r=n?.renderBefore??t;let o=r._$litPart$;if(void 0===o){const e=n?.renderBefore??null;r._$litPart$=o=new Ke(t.insertBefore(Ce(),e),e,void 0,n??{})}return o._$AI(e),o})(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return Ue}}tt._$litElement$=!0,tt.finalized=!0,globalThis.litElementHydrateSupport?.({LitElement:tt});const nt=globalThis.litElementPolyfillSupport;nt?.({LitElement:tt}),(globalThis.litElementVersions??=[]).push("4.1.1");customElements.define("navigation-menu",class extends tt{render(){return De`
      <nav>
        <a href="/">Employee List</a>
        
        <a href="/add">Add Employee</a>
      </nav>
    `}createRenderRoot(){return this}});var rt=(()=>"function"==typeof Symbol&&Symbol.observable||"@@observable")(),ot=()=>Math.random().toString(36).substring(7).split("").join("."),it={INIT:`@@redux/INIT${ot()}`,REPLACE:`@@redux/REPLACE${ot()}`,PROBE_UNKNOWN_ACTION:()=>`@@redux/PROBE_UNKNOWN_ACTION${ot()}`};function at(e){if("object"!=typeof e||null===e)return!1;let t=e;for(;null!==Object.getPrototypeOf(t);)t=Object.getPrototypeOf(t);return Object.getPrototypeOf(e)===t||null===Object.getPrototypeOf(e)}function st(e){if(void 0===e)return"undefined";if(null===e)return"null";const t=typeof e;switch(t){case"boolean":case"string":case"number":case"symbol":case"function":return t}if(Array.isArray(e))return"array";if(function(e){return e instanceof Date||"function"==typeof e.toDateString&&"function"==typeof e.getDate&&"function"==typeof e.setDate}(e))return"date";if(function(e){return e instanceof Error||"string"==typeof e.message&&e.constructor&&"number"==typeof e.constructor.stackTraceLimit}(e))return"error";const n=function(e){return"function"==typeof e.constructor?e.constructor.name:null}(e);switch(n){case"Symbol":case"Promise":case"WeakMap":case"WeakSet":case"Map":case"Set":return n}return Object.prototype.toString.call(e).slice(8,-1).toLowerCase().replace(/\s/g,"")}function ct(e){let t=typeof e;return t=st(e),t}function lt(e,t,n){if("function"!=typeof e)throw new Error(`Expected the root reducer to be a function. Instead, received: '${ct(e)}'`);if("function"==typeof t&&"function"==typeof n||"function"==typeof n&&"function"==typeof arguments[3])throw new Error("It looks like you are passing several store enhancers to createStore(). This is not supported. Instead, compose them together to a single function. See https://redux.js.org/tutorials/fundamentals/part-4-store#creating-a-store-with-enhancers for an example.");if("function"==typeof t&&void 0===n&&(n=t,t=void 0),void 0!==n){if("function"!=typeof n)throw new Error(`Expected the enhancer to be a function. Instead, received: '${ct(n)}'`);return n(lt)(e,t)}let r=e,o=t,i=new Map,a=i,s=0,c=!1;function l(){a===i&&(a=new Map,i.forEach(((e,t)=>{a.set(t,e)})))}function d(){if(c)throw new Error("You may not call store.getState() while the reducer is executing. The reducer has already received the state as an argument. Pass it down from the top reducer instead of reading it from the store.");return o}function u(e){if("function"!=typeof e)throw new Error(`Expected the listener to be a function. Instead, received: '${ct(e)}'`);if(c)throw new Error("You may not call store.subscribe() while the reducer is executing. If you would like to be notified after the store has been updated, subscribe from a component and invoke store.getState() in the callback to access the latest state. See https://redux.js.org/api/store#subscribelistener for more details.");let t=!0;l();const n=s++;return a.set(n,e),function(){if(t){if(c)throw new Error("You may not unsubscribe from a store listener while the reducer is executing. See https://redux.js.org/api/store#subscribelistener for more details.");t=!1,l(),a.delete(n),i=null}}}function h(e){if(!at(e))throw new Error(`Actions must be plain objects. Instead, the actual type was: '${ct(e)}'. You may need to add middleware to your store setup to handle dispatching other values, such as 'redux-thunk' to handle dispatching functions. See https://redux.js.org/tutorials/fundamentals/part-4-store#middleware and https://redux.js.org/tutorials/fundamentals/part-6-async-logic#using-the-redux-thunk-middleware for examples.`);if(void 0===e.type)throw new Error('Actions may not have an undefined "type" property. You may have misspelled an action type string constant.');if("string"!=typeof e.type)throw new Error(`Action "type" property must be a string. Instead, the actual type was: '${ct(e.type)}'. Value was: '${e.type}' (stringified)`);if(c)throw new Error("Reducers may not dispatch actions.");try{c=!0,o=r(o,e)}finally{c=!1}return(i=a).forEach((e=>{e()})),e}h({type:it.INIT});return{dispatch:h,subscribe:u,getState:d,replaceReducer:function(e){if("function"!=typeof e)throw new Error(`Expected the nextReducer to be a function. Instead, received: '${ct(e)}`);r=e,h({type:it.REPLACE})},[rt]:function(){const e=u;return{subscribe(t){if("object"!=typeof t||null===t)throw new Error(`Expected the observer to be an object. Instead, received: '${ct(t)}'`);function n(){const e=t;e.next&&e.next(d())}n();return{unsubscribe:e(n)}},[rt](){return this}}}}}function dt(e){"undefined"!=typeof console&&"function"==typeof console.error&&console.error(e);try{throw new Error(e)}catch(e){}}function ut(e){const t=Object.keys(e),n={};for(let r=0;r<t.length;r++){const o=t[r];void 0===e[o]&&dt(`No reducer provided for key "${o}"`),"function"==typeof e[o]&&(n[o]=e[o])}const r=Object.keys(n);let o,i;o={};try{!function(e){Object.keys(e).forEach((t=>{const n=e[t];if(void 0===n(void 0,{type:it.INIT}))throw new Error(`The slice reducer for key "${t}" returned undefined during initialization. If the state passed to the reducer is undefined, you must explicitly return the initial state. The initial state may not be undefined. If you don't want to set a value for this reducer, you can use null instead of undefined.`);if(void 0===n(void 0,{type:it.PROBE_UNKNOWN_ACTION()}))throw new Error(`The slice reducer for key "${t}" returned undefined when probed with a random type. Don't try to handle '${it.INIT}' or other actions in "redux/*" namespace. They are considered private. Instead, you must return the current state for any unknown actions, unless it is undefined, in which case you must return the initial state, regardless of the action type. The initial state may not be undefined, but can be null.`)}))}(n)}catch(e){i=e}return function(e={},t){if(i)throw i;{const r=function(e,t,n,r){const o=Object.keys(t),i=n&&n.type===it.INIT?"preloadedState argument passed to createStore":"previous state received by the reducer";if(0===o.length)return"Store does not have a valid reducer. Make sure the argument passed to combineReducers is an object whose values are reducers.";if(!at(e))return`The ${i} has unexpected type of "${ct(e)}". Expected argument to be an object with the following keys: "${o.join('", "')}"`;const a=Object.keys(e).filter((e=>!t.hasOwnProperty(e)&&!r[e]));return a.forEach((e=>{r[e]=!0})),n&&n.type===it.REPLACE?void 0:a.length>0?`Unexpected ${a.length>1?"keys":"key"} "${a.join('", "')}" found in ${i}. Expected to find one of the known reducer keys instead: "${o.join('", "')}". Unexpected keys will be ignored.`:void 0}(e,n,t,o);r&&dt(r)}let a=!1;const s={};for(let o=0;o<r.length;o++){const i=r[o],c=n[i],l=e[i],d=c(l,t);if(void 0===d){const e=t&&t.type;throw new Error(`When called with an action of type ${e?`"${String(e)}"`:"(unknown type)"}, the slice reducer for key "${i}" returned undefined. To ignore an action, you must explicitly return the previous state. If you want this reducer to hold no value, you can return null instead of undefined.`)}s[i]=d,a=a||d!==l}return a=a||r.length!==Object.keys(e).length,a?s:e}}function ht(...e){return 0===e.length?e=>e:1===e.length?e[0]:e.reduce(((e,t)=>(...n)=>e(t(...n))))}function pt(e){return at(e)&&"type"in e&&"string"==typeof e.type}var ft=Symbol.for("immer-nothing"),mt=Symbol.for("immer-draftable"),yt=Symbol.for("immer-state"),gt=[function(e){return`The plugin for '${e}' has not been loaded into Immer. To enable the plugin, import and call \`enable${e}()\` when initializing your application.`},function(e){return`produce can only be called on things that are draftable: plain objects, arrays, Map, Set or classes that are marked with '[immerable]: true'. Got '${e}'`},"This object has been frozen and should not be mutated",function(e){return"Cannot use a proxy that has been revoked. Did you pass an object from inside an immer function to an async process? "+e},"An immer producer returned a new value *and* modified its draft. Either return a new value *or* modify the draft.","Immer forbids circular references","The first or second argument to `produce` must be a function","The third argument to `produce` must be a function or undefined","First argument to `createDraft` must be a plain object, an array, or an immerable object","First argument to `finishDraft` must be a draft returned by `createDraft`",function(e){return`'current' expects a draft, got: ${e}`},"Object.defineProperty() cannot be used on an Immer draft","Object.setPrototypeOf() cannot be used on an Immer draft","Immer only supports deleting array indices","Immer only supports setting array indices and the 'length' property",function(e){return`'original' expects a draft, got: ${e}`}];function bt(e,...t){{const n=gt[e],r="function"==typeof n?n.apply(null,t):n;throw new Error(`[Immer] ${r}`)}}var wt=Object.getPrototypeOf;function vt(e){return!!e&&!!e[yt]}function _t(e){return!!e&&(Et(e)||Array.isArray(e)||!!e[mt]||!!e.constructor?.[mt]||Ot(e)||kt(e))}var $t=Object.prototype.constructor.toString();function Et(e){if(!e||"object"!=typeof e)return!1;const t=wt(e);if(null===t)return!0;const n=Object.hasOwnProperty.call(t,"constructor")&&t.constructor;return n===Object||"function"==typeof n&&Function.toString.call(n)===$t}function xt(e,t){0===At(e)?Reflect.ownKeys(e).forEach((n=>{t(n,e[n],e)})):e.forEach(((n,r)=>t(r,n,e)))}function At(e){const t=e[yt];return t?t.type_:Array.isArray(e)?1:Ot(e)?2:kt(e)?3:0}function St(e,t){return 2===At(e)?e.has(t):Object.prototype.hasOwnProperty.call(e,t)}function Ct(e,t,n){const r=At(e);2===r?e.set(t,n):3===r?e.add(n):e[t]=n}function Ot(e){return e instanceof Map}function kt(e){return e instanceof Set}function Pt(e){return e.copy_||e.base_}function Nt(e,t){if(Ot(e))return new Map(e);if(kt(e))return new Set(e);if(Array.isArray(e))return Array.prototype.slice.call(e);const n=Et(e);if(!0===t||"class_only"===t&&!n){const t=Object.getOwnPropertyDescriptors(e);delete t[yt];let n=Reflect.ownKeys(t);for(let r=0;r<n.length;r++){const o=n[r],i=t[o];!1===i.writable&&(i.writable=!0,i.configurable=!0),(i.get||i.set)&&(t[o]={configurable:!0,writable:!0,enumerable:i.enumerable,value:e[o]})}return Object.create(wt(e),t)}{const t=wt(e);if(null!==t&&n)return{...e};const r=Object.create(t);return Object.assign(r,e)}}function Rt(e,t=!1){return jt(e)||vt(e)||!_t(e)||(At(e)>1&&(e.set=e.add=e.clear=e.delete=Tt),Object.freeze(e),t&&Object.entries(e).forEach((([e,t])=>Rt(t,!0)))),e}function Tt(){bt(2)}function jt(e){return Object.isFrozen(e)}var It,Lt={};function Mt(e){const t=Lt[e];return t||bt(0,e),t}function Dt(){return It}function Ut(e,t){t&&(Mt("Patches"),e.patches_=[],e.inversePatches_=[],e.patchListener_=t)}function Bt(e){zt(e),e.drafts_.forEach(Ht),e.drafts_=null}function zt(e){e===It&&(It=e.parent_)}function Ft(e){return It={drafts_:[],parent_:It,immer_:e,canAutoFreeze_:!0,unfinalizedDrafts_:0}}function Ht(e){const t=e[yt];0===t.type_||1===t.type_?t.revoke_():t.revoked_=!0}function Wt(e,t){t.unfinalizedDrafts_=t.drafts_.length;const n=t.drafts_[0];return void 0!==e&&e!==n?(n[yt].modified_&&(Bt(t),bt(4)),_t(e)&&(e=Vt(t,e),t.parent_||Jt(t,e)),t.patches_&&Mt("Patches").generateReplacementPatches_(n[yt].base_,e,t.patches_,t.inversePatches_)):e=Vt(t,n,[]),Bt(t),t.patches_&&t.patchListener_(t.patches_,t.inversePatches_),e!==ft?e:void 0}function Vt(e,t,n){if(jt(t))return t;const r=t[yt];if(!r)return xt(t,((o,i)=>qt(e,r,t,o,i,n))),t;if(r.scope_!==e)return t;if(!r.modified_)return Jt(e,r.base_,!0),r.base_;if(!r.finalized_){r.finalized_=!0,r.scope_.unfinalizedDrafts_--;const t=r.copy_;let o=t,i=!1;3===r.type_&&(o=new Set(t),t.clear(),i=!0),xt(o,((o,a)=>qt(e,r,t,o,a,n,i))),Jt(e,t,!1),n&&e.patches_&&Mt("Patches").generatePatches_(r,n,e.patches_,e.inversePatches_)}return r.copy_}function qt(e,t,n,r,o,i,a){if(o===n&&bt(5),vt(o)){const a=Vt(e,o,i&&t&&3!==t.type_&&!St(t.assigned_,r)?i.concat(r):void 0);if(Ct(n,r,a),!vt(a))return;e.canAutoFreeze_=!1}else a&&n.add(o);if(_t(o)&&!jt(o)){if(!e.immer_.autoFreeze_&&e.unfinalizedDrafts_<1)return;Vt(e,o),t&&t.scope_.parent_||"symbol"==typeof r||!Object.prototype.propertyIsEnumerable.call(n,r)||Jt(e,o)}}function Jt(e,t,n=!1){!e.parent_&&e.immer_.autoFreeze_&&e.canAutoFreeze_&&Rt(t,n)}var Kt={get(e,t){if(t===yt)return e;const n=Pt(e);if(!St(n,t))return function(e,t,n){const r=Gt(t,n);return r?"value"in r?r.value:r.get?.call(e.draft_):void 0}(e,n,t);const r=n[t];return e.finalized_||!_t(r)?r:r===Xt(e.base_,t)?(Zt(e),e.copy_[t]=en(r,e)):r},has:(e,t)=>t in Pt(e),ownKeys:e=>Reflect.ownKeys(Pt(e)),set(e,t,n){const r=Gt(Pt(e),t);if(r?.set)return r.set.call(e.draft_,n),!0;if(!e.modified_){const r=Xt(Pt(e),t),o=r?.[yt];if(o&&o.base_===n)return e.copy_[t]=n,e.assigned_[t]=!1,!0;if(function(e,t){return e===t?0!==e||1/e==1/t:e!=e&&t!=t}(n,r)&&(void 0!==n||St(e.base_,t)))return!0;Zt(e),Qt(e)}return e.copy_[t]===n&&(void 0!==n||t in e.copy_)||Number.isNaN(n)&&Number.isNaN(e.copy_[t])||(e.copy_[t]=n,e.assigned_[t]=!0),!0},deleteProperty:(e,t)=>(void 0!==Xt(e.base_,t)||t in e.base_?(e.assigned_[t]=!1,Zt(e),Qt(e)):delete e.assigned_[t],e.copy_&&delete e.copy_[t],!0),getOwnPropertyDescriptor(e,t){const n=Pt(e),r=Reflect.getOwnPropertyDescriptor(n,t);return r?{writable:!0,configurable:1!==e.type_||"length"!==t,enumerable:r.enumerable,value:n[t]}:r},defineProperty(){bt(11)},getPrototypeOf:e=>wt(e.base_),setPrototypeOf(){bt(12)}},Yt={};function Xt(e,t){const n=e[yt];return(n?Pt(n):e)[t]}function Gt(e,t){if(!(t in e))return;let n=wt(e);for(;n;){const e=Object.getOwnPropertyDescriptor(n,t);if(e)return e;n=wt(n)}}function Qt(e){e.modified_||(e.modified_=!0,e.parent_&&Qt(e.parent_))}function Zt(e){e.copy_||(e.copy_=Nt(e.base_,e.scope_.immer_.useStrictShallowCopy_))}xt(Kt,((e,t)=>{Yt[e]=function(){return arguments[0]=arguments[0][0],t.apply(this,arguments)}})),Yt.deleteProperty=function(e,t){return isNaN(parseInt(t))&&bt(13),Yt.set.call(this,e,t,void 0)},Yt.set=function(e,t,n){return"length"!==t&&isNaN(parseInt(t))&&bt(14),Kt.set.call(this,e[0],t,n,e[0])};function en(e,t){const n=Ot(e)?Mt("MapSet").proxyMap_(e,t):kt(e)?Mt("MapSet").proxySet_(e,t):function(e,t){const n=Array.isArray(e),r={type_:n?1:0,scope_:t?t.scope_:Dt(),modified_:!1,finalized_:!1,assigned_:{},parent_:t,base_:e,draft_:null,copy_:null,revoke_:null,isManual_:!1};let o=r,i=Kt;n&&(o=[r],i=Yt);const{revoke:a,proxy:s}=Proxy.revocable(o,i);return r.draft_=s,r.revoke_=a,s}(e,t);return(t?t.scope_:Dt()).drafts_.push(n),n}function tn(e){if(!_t(e)||jt(e))return e;const t=e[yt];let n;if(t){if(!t.modified_)return t.base_;t.finalized_=!0,n=Nt(e,t.scope_.immer_.useStrictShallowCopy_)}else n=Nt(e,!0);return xt(n,((e,t)=>{Ct(n,e,tn(t))})),t&&(t.finalized_=!1),n}var nn=new class{constructor(e){this.autoFreeze_=!0,this.useStrictShallowCopy_=!1,this.produce=(e,t,n)=>{if("function"==typeof e&&"function"!=typeof t){const n=t;t=e;const r=this;return function(e=n,...o){return r.produce(e,(e=>t.call(this,e,...o)))}}let r;if("function"!=typeof t&&bt(6),void 0!==n&&"function"!=typeof n&&bt(7),_t(e)){const o=Ft(this),i=en(e,void 0);let a=!0;try{r=t(i),a=!1}finally{a?Bt(o):zt(o)}return Ut(o,n),Wt(r,o)}if(!e||"object"!=typeof e){if(r=t(e),void 0===r&&(r=e),r===ft&&(r=void 0),this.autoFreeze_&&Rt(r,!0),n){const t=[],o=[];Mt("Patches").generateReplacementPatches_(e,r,t,o),n(t,o)}return r}bt(1,e)},this.produceWithPatches=(e,t)=>{if("function"==typeof e)return(t,...n)=>this.produceWithPatches(t,(t=>e(t,...n)));let n,r;const o=this.produce(e,t,((e,t)=>{n=e,r=t}));return[o,n,r]},"boolean"==typeof e?.autoFreeze&&this.setAutoFreeze(e.autoFreeze),"boolean"==typeof e?.useStrictShallowCopy&&this.setUseStrictShallowCopy(e.useStrictShallowCopy)}createDraft(e){_t(e)||bt(8),vt(e)&&(e=function(e){vt(e)||bt(10,e);return tn(e)}(e));const t=Ft(this),n=en(e,void 0);return n[yt].isManual_=!0,zt(t),n}finishDraft(e,t){const n=e&&e[yt];n&&n.isManual_||bt(9);const{scope_:r}=n;return Ut(r,t),Wt(void 0,r)}setAutoFreeze(e){this.autoFreeze_=e}setUseStrictShallowCopy(e){this.useStrictShallowCopy_=e}applyPatches(e,t){let n;for(n=t.length-1;n>=0;n--){const r=t[n];if(0===r.path.length&&"replace"===r.op){e=r.value;break}}n>-1&&(t=t.slice(n+1));const r=Mt("Patches").applyPatches_;return vt(e)?r(e,t):this.produce(e,(e=>r(e,t)))}},rn=nn.produce;function on(e){return({dispatch:t,getState:n})=>r=>o=>"function"==typeof o?o(t,n,e):r(o)}nn.produceWithPatches.bind(nn),nn.setAutoFreeze.bind(nn),nn.setUseStrictShallowCopy.bind(nn),nn.applyPatches.bind(nn),nn.createDraft.bind(nn),nn.finishDraft.bind(nn);var an=on(),sn=on,cn="undefined"!=typeof window&&window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__:function(){if(0!==arguments.length)return"object"==typeof arguments[0]?ht:ht.apply(null,arguments)};function ln(e,t){function n(...n){if(t){let r=t(...n);if(!r)throw new Error("prepareAction did not return an object");return{type:e,payload:r.payload,..."meta"in r&&{meta:r.meta},..."error"in r&&{error:r.error}}}return{type:e,payload:n[0]}}return n.toString=()=>`${e}`,n.type=e,n.match=t=>pt(t)&&t.type===e,n}function dn(e){return"function"==typeof e&&"type"in e&&(e=>e&&"function"==typeof e.match)(e)}function un(e,t){let n=0;return{measureTime(e){const t=Date.now();try{return e()}finally{const e=Date.now();n+=e-t}},warnIfExceeded(){n>e&&console.warn(`${t} took ${n}ms, which is more than the warning threshold of ${e}ms. \nIf your state or actions are very large, you may want to disable the middleware as it might cause too much of a slowdown in development mode. See https://redux-toolkit.js.org/api/getDefaultMiddleware for instructions.\nIt is disabled in production builds, so you don't need to worry about that.`)}}}var hn=class e extends Array{constructor(...t){super(...t),Object.setPrototypeOf(this,e.prototype)}static get[Symbol.species](){return e}concat(...e){return super.concat.apply(this,e)}prepend(...t){return 1===t.length&&Array.isArray(t[0])?new e(...t[0].concat(this)):new e(...t.concat(this))}};function pn(e){return _t(e)?rn(e,(()=>{})):e}function fn(e,t,n){return e.has(t)?e.get(t):e.set(t,n(t)).get(t)}function mn(e){return"object"!=typeof e||null==e||Object.isFrozen(e)}function yn(e,t,n){const r=gn(e,t,n);return{detectMutations:()=>bn(e,t,r,n)}}function gn(e,t=[],n,r="",o=new Set){const i={value:n};if(!e(n)&&!o.has(n)){o.add(n),i.children={};for(const o in n){const a=r?r+"."+o:o;t.length&&-1!==t.indexOf(a)||(i.children[o]=gn(e,t,n[o],a))}}return i}function bn(e,t=[],n,r,o=!1,i=""){const a=n?n.value:void 0,s=a===r;if(o&&!s&&!Number.isNaN(r))return{wasMutated:!0,path:i};if(e(a)||e(r))return{wasMutated:!1};const c={};for(let e in n.children)c[e]=!0;for(let e in r)c[e]=!0;const l=t.length>0;for(let o in c){const a=i?i+"."+o:o;if(l){if(t.some((e=>e instanceof RegExp?e.test(a):a===e)))continue}const c=bn(e,t,n.children[o],r[o],s,a);if(c.wasMutated)return c}return{wasMutated:!1}}function wn(e){const t=typeof e;return null==e||"string"===t||"boolean"===t||"number"===t||Array.isArray(e)||at(e)}function vn(e,t="",n=wn,r,o=[],i){let a;if(!n(e))return{keyPath:t||"<root>",value:e};if("object"!=typeof e||null===e)return!1;if(i?.has(e))return!1;const s=null!=r?r(e):Object.entries(e),c=o.length>0;for(const[e,l]of s){const s=t?t+"."+e:e;if(c){if(o.some((e=>e instanceof RegExp?e.test(s):s===e)))continue}if(!n(l))return{keyPath:s,value:l};if("object"==typeof l&&(a=vn(l,s,n,r,o,i),a))return a}return i&&_n(e)&&i.add(e),!1}function _n(e){if(!Object.isFrozen(e))return!1;for(const t of Object.values(e))if("object"==typeof t&&null!==t&&!_n(t))return!1;return!0}function $n(e){return"boolean"==typeof e}var En=()=>function(e){const{thunk:t=!0,immutableCheck:n=!0,serializableCheck:r=!0,actionCreatorCheck:o=!0}=e??{};let i=new hn;if(t&&($n(t)?i.push(an):i.push(sn(t.extraArgument))),n){let e={};$n(n)||(e=n),i.unshift(function(e={}){{let t=function(e,t,r,o){return JSON.stringify(e,n(t,o),r)},n=function(e,t){let n=[],r=[];return t||(t=function(e,t){return n[0]===t?"[Circular ~]":"[Circular ~."+r.slice(0,n.indexOf(t)).join(".")+"]"}),function(o,i){if(n.length>0){var a=n.indexOf(this);~a?n.splice(a+1):n.push(this),~a?r.splice(a,1/0,o):r.push(o),~n.indexOf(i)&&(i=t.call(this,o,i))}else n.push(i);return null==e?i:e.call(this,o,i)}},{isImmutable:r=mn,ignoredPaths:o,warnAfter:i=32}=e;const a=yn.bind(null,r,o);return({getState:e})=>{let n,r=e(),o=a(r);return s=>c=>{const l=un(i,"ImmutableStateInvariantMiddleware");l.measureTime((()=>{if(r=e(),n=o.detectMutations(),o=a(r),n.wasMutated)throw new Error(`A state mutation was detected between dispatches, in the path '${n.path||""}'.  This may cause incorrect behavior. (https://redux.js.org/style-guide/style-guide#do-not-mutate-state)`)}));const d=s(c);return l.measureTime((()=>{if(r=e(),n=o.detectMutations(),o=a(r),n.wasMutated)throw new Error(`A state mutation was detected inside a dispatch, in the path: ${n.path||""}. Take a look at the reducer(s) handling the action ${t(c)}. (https://redux.js.org/style-guide/style-guide#do-not-mutate-state)`)})),l.warnIfExceeded(),d}}}}(e))}if(r){let e={};$n(r)||(e=r),i.push(function(e={}){{const{isSerializable:t=wn,getEntries:n,ignoredActions:r=[],ignoredActionPaths:o=["meta.arg","meta.baseQueryMeta"],ignoredPaths:i=[],warnAfter:a=32,ignoreState:s=!1,ignoreActions:c=!1,disableCache:l=!1}=e,d=!l&&WeakSet?new WeakSet:void 0;return e=>l=>u=>{if(!pt(u))return l(u);const h=l(u),p=un(a,"SerializableStateInvariantMiddleware");return c||r.length&&-1!==r.indexOf(u.type)||p.measureTime((()=>{const e=vn(u,"",t,n,o,d);if(e){const{keyPath:t,value:n}=e;console.error(`A non-serializable value was detected in an action, in the path: \`${t}\`. Value:`,n,"\nTake a look at the logic that dispatched this action: ",u,"\n(See https://redux.js.org/faq/actions#why-should-type-be-a-string-or-at-least-serializable-why-should-my-action-types-be-constants)","\n(To allow non-serializable values see: https://redux-toolkit.js.org/usage/usage-guide#working-with-non-serializable-data)")}})),s||(p.measureTime((()=>{const r=vn(e.getState(),"",t,n,i,d);if(r){const{keyPath:e,value:t}=r;console.error(`A non-serializable value was detected in the state, in the path: \`${e}\`. Value:`,t,`\nTake a look at the reducer(s) handling this action type: ${u.type}.\n(See https://redux.js.org/faq/organizing-state#can-i-put-functions-promises-or-other-non-serializable-items-in-my-store-state)`)}})),p.warnIfExceeded()),h}}}(e))}if(o){let e={};$n(o)||(e=o),i.unshift(function(e={}){const{isActionCreator:t=dn}=e;return()=>e=>n=>(t(n)&&console.warn(function(e){const t=e?`${e}`.split("/"):[],n=t[t.length-1]||"actionCreator";return`Detected an action creator with type "${e||"unknown"}" being dispatched. \nMake sure you're calling the action creator before dispatching, i.e. \`dispatch(${n}())\` instead of \`dispatch(${n})\`. This is necessary even if the action has no payload.`}(n.type)),e(n))}(e))}return i},xn=e=>t=>{setTimeout(t,e)},An=e=>function(t){const{autoBatch:n=!0}=t??{};let r=new hn(e);return n&&r.push(((e={type:"raf"})=>t=>(...n)=>{const r=t(...n);let o=!0,i=!1,a=!1;const s=new Set,c="tick"===e.type?queueMicrotask:"raf"===e.type?"undefined"!=typeof window&&window.requestAnimationFrame?window.requestAnimationFrame:xn(10):"callback"===e.type?e.queueNotification:xn(e.timeout),l=()=>{a=!1,i&&(i=!1,s.forEach((e=>e())))};return Object.assign({},r,{subscribe(e){const t=r.subscribe((()=>o&&e()));return s.add(e),()=>{t(),s.delete(e)}},dispatch(e){try{return o=!e?.meta?.RTK_autoBatch,i=!o,i&&(a||(a=!0,c(l))),r.dispatch(e)}finally{o=!0}}})})("object"==typeof n?n:void 0)),r};function Sn(e){const t={},n=[];let r;const o={addCase(e,i){if(n.length>0)throw new Error("`builder.addCase` should only be called before calling `builder.addMatcher`");if(r)throw new Error("`builder.addCase` should only be called before calling `builder.addDefaultCase`");const a="string"==typeof e?e:e.type;if(!a)throw new Error("`builder.addCase` cannot be called with an empty action type");if(a in t)throw new Error(`\`builder.addCase\` cannot be called with two reducers for the same action type '${a}'`);return t[a]=i,o},addMatcher(e,t){if(r)throw new Error("`builder.addMatcher` should only be called before calling `builder.addDefaultCase`");return n.push({matcher:e,reducer:t}),o},addDefaultCase(e){if(r)throw new Error("`builder.addDefaultCase` can only be called once");return r=e,o}};return e(o),[t,n,r]}var Cn=Symbol.for("rtk-slice-createasyncthunk");function On(e,t){return`${e}/${t}`}function kn({creators:e}={}){const t=e?.asyncThunk?.[Cn];return function(e){const{name:n,reducerPath:r=n}=e;if(!n)throw new Error("`name` is a required option for createSlice");"undefined"!=typeof process&&void 0===e.initialState&&console.error("You must provide an `initialState` value that is not `undefined`. You may have misspelled `initialState`");const o=("function"==typeof e.reducers?e.reducers(function(){function e(e,t){return{_reducerDefinitionType:"asyncThunk",payloadCreator:e,...t}}return e.withTypes=()=>e,{reducer:e=>Object.assign({[e.name]:(...t)=>e(...t)}[e.name],{_reducerDefinitionType:"reducer"}),preparedReducer:(e,t)=>({_reducerDefinitionType:"reducerWithPrepare",prepare:e,reducer:t}),asyncThunk:e}}()):e.reducers)||{},i=Object.keys(o),a={sliceCaseReducersByName:{},sliceCaseReducersByType:{},actionCreators:{},sliceMatchers:[]},s={addCase(e,t){const n="string"==typeof e?e:e.type;if(!n)throw new Error("`context.addCase` cannot be called with an empty action type");if(n in a.sliceCaseReducersByType)throw new Error("`context.addCase` cannot be called with two reducers for the same action type: "+n);return a.sliceCaseReducersByType[n]=t,s},addMatcher:(e,t)=>(a.sliceMatchers.push({matcher:e,reducer:t}),s),exposeAction:(e,t)=>(a.actionCreators[e]=t,s),exposeCaseReducer:(e,t)=>(a.sliceCaseReducersByName[e]=t,s)};function c(){if("object"==typeof e.extraReducers)throw new Error("The object notation for `createSlice.extraReducers` has been removed. Please use the 'builder callback' notation instead: https://redux-toolkit.js.org/api/createSlice");const[t={},n=[],r]="function"==typeof e.extraReducers?Sn(e.extraReducers):[e.extraReducers],o={...t,...a.sliceCaseReducersByType};return function(e,t){if("object"==typeof t)throw new Error("The object notation for `createReducer` has been removed. Please use the 'builder callback' notation instead: https://redux-toolkit.js.org/api/createReducer");let n,[r,o,i]=Sn(t);if(function(e){return"function"==typeof e}(e))n=()=>pn(e());else{const t=pn(e);n=()=>t}function a(e=n(),t){let a=[r[t.type],...o.filter((({matcher:e})=>e(t))).map((({reducer:e})=>e))];return 0===a.filter((e=>!!e)).length&&(a=[i]),a.reduce(((e,n)=>{if(n){if(vt(e)){const r=n(e,t);return void 0===r?e:r}if(_t(e))return rn(e,(e=>n(e,t)));{const r=n(e,t);if(void 0===r){if(null===e)return e;throw Error("A case reducer on a non-draftable value must not return undefined")}return r}}return e}),e)}return a.getInitialState=n,a}(e.initialState,(e=>{for(let t in o)e.addCase(t,o[t]);for(let t of a.sliceMatchers)e.addMatcher(t.matcher,t.reducer);for(let t of n)e.addMatcher(t.matcher,t.reducer);r&&e.addDefaultCase(r)}))}i.forEach((r=>{const i=o[r],a={reducerName:r,type:On(n,r),createNotation:"function"==typeof e.reducers};!function(e){return"asyncThunk"===e._reducerDefinitionType}(i)?function({type:e,reducerName:t,createNotation:n},r,o){let i,a;if("reducer"in r){if(n&&!function(e){return"reducerWithPrepare"===e._reducerDefinitionType}(r))throw new Error("Please use the `create.preparedReducer` notation for prepared action creators with the `create` notation.");i=r.reducer,a=r.prepare}else i=r;o.addCase(e,i).exposeCaseReducer(t,i).exposeAction(t,a?ln(e,a):ln(e))}(a,i,s):function({type:e,reducerName:t},n,r,o){if(!o)throw new Error("Cannot use `create.asyncThunk` in the built-in `createSlice`. Use `buildCreateSlice({ creators: { asyncThunk: asyncThunkCreator } })` to create a customised version of `createSlice`.");const{payloadCreator:i,fulfilled:a,pending:s,rejected:c,settled:l,options:d}=n,u=o(e,i,d);r.exposeAction(t,u),a&&r.addCase(u.fulfilled,a);s&&r.addCase(u.pending,s);c&&r.addCase(u.rejected,c);l&&r.addMatcher(u.settled,l);r.exposeCaseReducer(t,{fulfilled:a||Nn,pending:s||Nn,rejected:c||Nn,settled:l||Nn})}(a,i,s,t)}));const l=e=>e,d=new Map;let u;function h(e,t){return u||(u=c()),u(e,t)}function p(){return u||(u=c()),u.getInitialState()}function f(t,n=!1){function r(e){let r=e[t];if(void 0===r){if(!n)throw new Error("selectSlice returned undefined for an uninjected slice reducer");r=p()}return r}function o(t=l){const r=fn(d,n,(()=>new WeakMap));return fn(r,t,(()=>{const r={};for(const[o,i]of Object.entries(e.selectors??{}))r[o]=Pn(i,t,p,n);return r}))}return{reducerPath:t,getSelectors:o,get selectors(){return o(r)},selectSlice:r}}const m={name:n,reducer:h,actions:a.actionCreators,caseReducers:a.sliceCaseReducersByName,getInitialState:p,...f(r),injectInto(e,{reducerPath:t,...n}={}){const o=t??r;return e.inject({reducerPath:o,reducer:h},n),{...m,...f(o,!0)}}};return m}}function Pn(e,t,n,r){function o(o,...i){let a=t(o);if(void 0===a){if(!r)throw new Error("selectState returned undefined for an uninjected slice reducer");a=n()}return e(a,...i)}return o.unwrapped=e,o}function Nn(){}const Rn=kn()({name:"employees",initialState:JSON.parse(localStorage.getItem("employees"))||[{id:"1",firstName:"Ahmet",lastName:"Sourtimes",dateOfEmployment:"22/02/2022",dateOfBirth:"22/03/1990",phoneNumber:"+90 532 123 45 45",email:"ahmet@sourtimes.org",department:"Analytics",position:"Junior"},{id:"2",firstName:"Ahmet",lastName:"Sourtimes",dateOfEmployment:"22/02/2022",dateOfBirth:"22/03/1990",phoneNumber:"+90 532 123 45 45",email:"ahmet@sourtimes.org",department:"Analytics",position:"Junior"},{id:"3",firstName:"Ahmet",lastName:"Sourtimes",dateOfEmployment:"22/02/2022",dateOfBirth:"22/03/1990",phoneNumber:"+90 532 123 45 45",email:"ahmet@sourtimes.org",department:"Analytics",position:"Junior"},{id:"4",firstName:"Ahmet",lastName:"Sourtimes",dateOfEmployment:"22/02/2022",dateOfBirth:"22/03/1990",phoneNumber:"+90 532 123 45 45",email:"ahmet@sourtimes.org",department:"Analytics",position:"Junior"},{id:"5",firstName:"Ahmet",lastName:"Sourtimes",dateOfEmployment:"22/02/2022",dateOfBirth:"22/03/1990",phoneNumber:"+90 532 123 45 45",email:"ahmet@sourtimes.org",department:"Analytics",position:"Junior"},{id:"6",firstName:"Ahmet",lastName:"Sourtimes",dateOfEmployment:"22/02/2022",dateOfBirth:"22/03/1990",phoneNumber:"+90 532 123 45 45",email:"ahmet@sourtimes.org",department:"Analytics",position:"Junior"},{id:"7",firstName:"Ahmet",lastName:"Sourtimes",dateOfEmployment:"22/02/2022",dateOfBirth:"22/03/1990",phoneNumber:"+90 532 123 45 45",email:"ahmet@sourtimes.org",department:"Analytics",position:"Junior"},{id:"8",firstName:"Ahmet",lastName:"Sourtimes",dateOfEmployment:"22/02/2022",dateOfBirth:"22/03/1990",phoneNumber:"+90 532 123 45 45",email:"ahmet@sourtimes.org",department:"Analytics",position:"Junior"}],reducers:{addEmployee:(e,t)=>{const n={...t.payload,id:Date.now().toString()};e.push(n),localStorage.setItem("employees",JSON.stringify(e))},updateEmployee:(e,t)=>{const n=e.findIndex((e=>e.id===t.payload.id));-1!==n&&(e[n]=t.payload,localStorage.setItem("employees",JSON.stringify(e)))},deleteEmployee:(e,t)=>{const n=e.filter((e=>e.id!==t.payload));return localStorage.setItem("employees",JSON.stringify(n)),n}}}),{addEmployee:Tn,updateEmployee:jn,deleteEmployee:In}=Rn.actions,Ln=function(e){const t=En(),{reducer:n,middleware:r,devTools:o=!0,preloadedState:i,enhancers:a}=e||{};let s,c;if("function"==typeof n)s=n;else{if(!at(n))throw new Error("`reducer` is a required argument, and must be a function or an object of functions that can be passed to combineReducers");s=ut(n)}if(r&&"function"!=typeof r)throw new Error("`middleware` field must be a callback");if("function"==typeof r){if(c=r(t),!Array.isArray(c))throw new Error("when using a middleware builder function, an array of middleware must be returned")}else c=t();if(c.some((e=>"function"!=typeof e)))throw new Error("each middleware provided to configureStore must be a function");let l=ht;o&&(l=cn({trace:!0,..."object"==typeof o&&o}));const d=function(...e){return t=>(n,r)=>{const o=t(n,r);let i=()=>{throw new Error("Dispatching while constructing your middleware is not allowed. Other middleware would not be applied to this dispatch.")};const a={getState:o.getState,dispatch:(e,...t)=>i(e,...t)},s=e.map((e=>e(a)));return i=ht(...s)(o.dispatch),{...o,dispatch:i}}}(...c),u=An(d);if(a&&"function"!=typeof a)throw new Error("`enhancers` field must be a callback");let h="function"==typeof a?a(u):u();if(!Array.isArray(h))throw new Error("`enhancers` callback must return an array");if(h.some((e=>"function"!=typeof e)))throw new Error("each enhancer provided to configureStore must be a function");return c.length&&!h.includes(d)&&console.error("middlewares were provided, but middleware enhancer was not included in final enhancers - make sure to call `getDefaultEnhancers`"),lt(s,i,l(...h))}({reducer:Rn.reducer}),Mn={en:{employeesLabel:"Employees",addNewButton:"Add New",employeeListHeader:"Employee List",firstName:"First Name",lastName:"Last Name",dateOfEmployment:"Date of Employment",dateOfBirth:"Date of Birth",phone:"Phone",email:"Email",department:"Department",position:"Position",actions:"Actions",emailLabel:"Email:",departmentLabel:"Department:",positionLabel:"Position:",editButton:"Edit",deleteButton:"Delete",addNewEmployee:"Add New Employee",updateEmployee:"Update Employee",saveButton:"Save",cancelButton:"Cancel",departmentOptions:{analytics:"Analytics",tech:"Tech"},positionOptions:{junior:"Junior",medior:"Mid Level",senior:"Senior"},yesButton:"Yes",noButton:"No",deleteConfirmation:"Are you sure you want to delete this employee?"},tr:{employeesLabel:"Personeller",addNewButton:"Yeni Ekle",employeeListHeader:"Personel Listesi",firstName:"Ad",lastName:"Soyad",dateOfEmployment:"İşe Alım Tarihi",dateOfBirth:"Doğum Tarihi",phone:"Telefon",email:"E-posta",department:"Departman",position:"Pozisyon",actions:"İşlemler",emailLabel:"E-posta:",departmentLabel:"Departman:",positionLabel:"Pozisyon:",editButton:"Düzenle",deleteButton:"Sil",addNewEmployee:"Yeni Personel Ekle",updateEmployee:"Personel Güncelle",saveButton:"Kaydet",cancelButton:"İptal",departmentOptions:{analytics:"Analitik",tech:"Teknoloji"},positionOptions:{junior:"Junior",medior:"Mid Level",senior:"Senior"},yesButton:"Evet",noButton:"Hayır",deleteConfirmation:"Bu personeli silmek istediğinize emin misiniz?"}},Dn=e=>{const t=document.documentElement.lang||"en";return e.split(".").reduce(((e,t)=>(e||{})[t]),Mn[t])||e};class Un extends tt{static properties={employee:{type:Object},isEditing:{type:Boolean}};static styles=ne`
    .modal {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: white;
      padding: 20px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.2);
      border-radius: 10px;
      text-align: center;

      width: 400px;
    }

    .modal h2 {
      color: #ff7f00;
      margin-bottom: 20px;
    }

    .form-group {
      text-align: left;
      margin-bottom: 15px;
    }



    .form-group label {
      display: block;
      font-weight: bold;
      margin-bottom: 5px;
    }

    .form-group input,
    .form-group select {
      width: 100%;
      padding: 8px;
      border: 1px solid #ccc;
      border-radius: 5px;
    }

    .buttons {
      display: flex;
      justify-content: space-between;
      margin-top: 20px;
    }

    .buttons button {
      padding: 10px 15px;
      border: none;
      cursor: pointer;
      border-radius: 5px;
    }

    .buttons .save {
      background: #ff7f00;
      color: white;
    }

    .buttons .cancel {
      background: #ddd;

    }
    @media (max-width: 480px) {
    .modal {
      width: 90%;
      padding: 15px;
    }
    
    .form-group input,
    .form-group select {
      font-size: 14px;
    }
    
    
    .buttons {
      flex-direction: column;
      gap: 10px;
    }
    
    .buttons button {
      width: 100%;
    }
  }
  `;constructor(){super(),this._resetEmployee(),this.isEditing=!1}connectedCallback(){super.connectedCallback(),this.employee?.id?this.isEditing=!0:this._resetEmployee()}render(){return De`
      <div class="modal">
        <h2>${this.isEditing?Dn("updateEmployee"):Dn("addNewEmployee")}</h2>
        <form @submit=${this._handleSubmit}>
          <div class="form-group">

            <label>${Dn("firstName")}</label>
            <input type="text" .value=${this.employee.firstName} @input=${e=>this._updateField(e,"firstName")} required />
          </div>
          <div class="form-group">
            <label>${Dn("lastName")}</label>
            <input type="text" .value=${this.employee.lastName} @input=${e=>this._updateField(e,"lastName")} required />
          </div>
          <div class="form-group">
            <label>${Dn("dateOfEmployment")}</label>
            <input type="date" .value=${this.employee.dateOfEmployment} @input=${e=>this._updateField(e,"dateOfEmployment")} required />
          </div>
          <div class="form-group">
            <label>${Dn("dateOfBirth")}</label>
            <input type="date" .value=${this.employee.dateOfBirth} @input=${e=>this._updateField(e,"dateOfBirth")} required />
          </div>
          <div class="form-group">
            <label>${Dn("phone")}</label>
            <input type="tel" .value=${this.employee.phone} @input=${e=>this._updateField(e,"phone")} required />
          </div>
          <div class="form-group">
            <label>${Dn("email")}</label>
            <input type="email" .value=${this.employee.email} @input=${e=>this._updateField(e,"email")} required />
          </div>
          <div class="form-group">
            <label>${Dn("department")}</label>
            <select @change=${e=>this._updateField(e,"department")}>
              <option value="Analytics" ?selected=${"Analytics"===this.employee.department}>
                ${Dn("departmentOptions.analytics")}
              </option>
              <option value="Tech" ?selected=${"Tech"===this.employee.department}>
                ${Dn("departmentOptions.tech")}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label>${Dn("position")}</label>
            <select @change=${e=>this._updateField(e,"position")}>
              <option value="Junior" ?selected=${"Junior"===this.employee.position}>
                ${Dn("positionOptions.junior")}
              </option>
              <option value="Medior" ?selected=${"Mid Level"===this.employee.position}>
                ${Dn("positionOptions.medior")}
              </option>
              <option value="Senior" ?selected=${"Senior"===this.employee.position}>
                ${Dn("positionOptions.senior")}
              </option>
            </select>
          </div>

          <div class="buttons">
            <button type="submit" class="save">${Dn((this.isEditing,"saveButton"))}</button>
            <button type="button" class="cancel" @click=${this._closeForm}>${Dn("cancelButton")}</button>
          </div>
        </form>
      </div>
    `}_updateField(e,t){this.employee={...this.employee,[t]:e.target.value}}_handleSubmit(e){e.preventDefault(),this.isEditing?Ln.dispatch(jn(this.employee)):Ln.dispatch(Tn({...this.employee,id:Date.now().toString()})),this.dispatchEvent(new Event("close",{bubbles:!0,composed:!0}))}_closeForm(){this.dispatchEvent(new Event("close",{bubbles:!0,composed:!0}))}_resetEmployee(){this.employee={id:null,firstName:"",lastName:"",dateOfEmployment:"",dateOfBirth:"",phone:"",email:"",department:"Development",position:"Junior"}}}customElements.define("employee-form",Un);class Bn extends tt{static properties={isOpen:{type:Boolean},message:{type:String},resolvePromise:{state:!0}};static styles=ne`
    .overlay {
      position: fixed;
      top: 0;
      left: 0;

      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 999;
    }

    .popup {
      background: white;
      padding: 20px;
      border-radius: 10px;
      text-align: center;
      width: 350px;
      box-shadow: 0px 2px 10px rgba(0,0,0,0.2);
    }

    .popup h2 {
      font-size: 18px;
      color: #ff7f00;
      margin-bottom: 15px;
    }

    .buttons {
      display: flex;
      justify-content: space-between;
      margin-top: 20px;
    }



    .buttons button {
      padding: 10px 15px;
      border: none;
      cursor: pointer;
      border-radius: 5px;
    }

    .buttons .confirm {
      background: #ff7f00;

      color: white;
    }

    .buttons .cancel {
      background: #ddd;
    }
    @media (max-width: 480px) {
    .popup {
      width: 90%;
      padding: 15px;
    }
    
    .buttons {
      flex-direction: column;
    }
  }
  `;constructor(){super(),this.isOpen=!1}open(e){return this.message=e,this.isOpen=!0,new Promise((e=>{this.resolvePromise=e}))}close(e){this.isOpen=!1,this.resolvePromise(e)}render(){return this.isOpen?De`
      <div class="overlay">
        <div class="popup">
          <h2>${Dn("deleteConfirmation")}</h2>
          <div class="buttons">
            <button class="confirm" @click=${()=>this.close(!0)}>${Dn("yesButton")}</button>
            <button class="cancel" @click=${()=>this.close(!1)}>${Dn("noButton")}</button>
          </div>
        </div>
      </div>
    `:De``}}customElements.define("confirm-dialog",Bn);class zn extends tt{static properties={employees:{state:!0},searchTerm:{state:!0},viewMode:{state:!0},currentPage:{state:!0},selectedEmployee:{state:!0},isFormOpen:{state:!0},lang:{state:!0}};static styles=ne`


    :host {
        display: block;
        font-family: 'Arial', sans-serif;
        color: #333;
        background-color: #f8f8f8;
        padding-bottom: 50px;
      }
      .navbar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px;
        background-color: white;
        border-bottom: 2px solid #f5f5f5;
      }


      .navbar .left {
        font-weight: bold;
        font-size: 18px;
      
      }

      .navbar .right {
        display: flex;
        align-items: right;
        gap: 15px;
      }

      .navbar .right span {
        color: #ff7f00;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 5px;
      }
      .navbar .right .person {
        font-weight: bold;
      
      }

      .employee-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 24px;
        font-weight: bold;
        color: #ff7f00;
        padding: 20px;
    
        margin: 20px;
    
      }


      .language-switcher {
        display: flex;
        gap: 8px;
        cursor: pointer;
      }

      .flag {
        width: 24px;
        height: 16px;
        border: 1px solid #ddd;
        opacity: 0.7;
        transition: all 0.3s;
      }

      .flag.active {
        opacity: 1;
        border-color: #ff7f00;
      }
      .table-container {
        overflow-x: auto;
        padding: 0 20px;
      }

      .language-switcher {
        position: relative;
        display: inline-block;
      }

      .selected-language {
        display: flex;
        align-items: center;
        gap: 5px;
        cursor: pointer;
        padding: 5px;
        border-radius: 4px;
      }

      .selected-language:hover {
        background: #f5f5f5;
      }

      .language-dropdown {
        position: absolute;
        top: 100%;
        right: 0;
        background: white;
        border: 1px solid #ddd;
        border-radius: 4px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        display: none;
        z-index: 1000;
        min-width: 120px;
      }

      .language-dropdown.open {
        display: block;
      }

      .language-option {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 8px 12px;
        cursor: pointer;
      }

      .language-option:hover {
        background: #f8f8f8;
      }

      .flag-icon {
        width: 24px;
        height: 16px;
        object-fit: cover;
        border-radius: 2px;
      }

      @media (max-width: 780px) {
        table {
          min-width: 700px;
        }

        th:nth-child(4),
        td:nth-child(4),
        th:nth-child(5),
        td:nth-child(5) {
          display: none;
        }

        .navbar .right {
          gap: 10px;
        }

        .employee-header {
          margin: 10px;
          padding: 10px;
        }
      }
      @media (max-width: 780px) {
        table {
          min-width: 700px;
        }

        th:nth-child(4),
        td:nth-child(4),
        th:nth-child(5),
        td:nth-child(5) {
          display: none;
        }

        .navbar .right {
          gap: 10px;
        }

        .employee-header {
          margin: 10px;
          padding: 10px;
        }
      }

      @media (max-width: 768px) {
        table {
          width: 100%;
          overflow-x: auto;
          display: block;
        }
        
        .navbar .right {
          gap: 10px;
          flex-wrap: wrap;
        }
        
        .list-item {
          width: 100%;
          margin: 10px 0;
        }

        .employee-header {
          flex-direction: column;
          align-items: flex-start;
          gap: 15px;
        }
      }


    
    table {
      width: 95%;
      margin: auto;
      border-collapse: collapse;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }

    th, td {
      padding: 14px;
      border-bottom: 1px solid #ddd;
      text-align: left;
      font-size: 16px;
    }

    th {
      color: #ff7f00;
      font-weight: bold;
    }

    .material-icons {
      font-family: 'Material Icons';
      font-weight: normal;
      font-size: 20px;
      cursor: pointer;
    }

    .actions button {
      background: none;
      border: none;
      cursor: pointer;
      font-size: 16px;
      color: #ff7f00;
    }

    .pagination {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 20px;
      gap: 5px;
    }

    .pagination button {
      background: none;
      border: none;
      font-size: 16px;
      cursor: pointer;
      color: #ff7f00;
      padding: 10px 14px;
      border-radius: 50%;
      font-weight: bold;
    }

    .pagination button.active {
      background: #ff7f00;
      color: white;
    }

    .pagination .dots {
      font-size: 16px;
      color: #ff7f00;
      padding: 10px;
    }
  `;constructor(){super(),this.showLanguageDropdown=!1,this.lang=document.documentElement.lang||"en",this.employees=Ln.getState(),this.searchTerm="",this.viewMode="table",this.currentPage=1,this.selectedEmployee=null,this.isFormOpen=!1,this.unsubscribe=Ln.subscribe((()=>{this.employees=Ln.getState()}))}disconnectedCallback(){super.disconnectedCallback(),this.unsubscribe()}render(){const e=this._filterEmployees(),t=this._paginate(e);return De`
        <div class="navbar">
          <div class="left">ING</div>
          <div class="right">
            <span><span class="material-icons">person</span> ${Dn("employeesLabel")}</span>
            <span @click=${this._openAddForm}><span class="material-icons">add</span> ${Dn("addNewButton")}</span>
            
            <div class="language-switcher">
              
              <div class="selected-language" @click=${this._toggleLanguageDropdown}>
                <img src="/flags/${this.lang}.svg" class="flag-icon">
                <span class="material-icons">arrow_drop_down</span>
              </div>
              <div class="language-dropdown ${this.showLanguageDropdown?"open":""}">
                <div class="language-option" @click=${()=>this._changeLanguage("tr")}>
                  <img src="/flags/tr.svg" class="flag-icon">
                  <span>Türkçe</span>
                </div>
                <div class="language-option" @click=${()=>this._changeLanguage("en")}>
                  <img src="/flags/en.svg" class="flag-icon">
                  <span>English</span>
                </div>
            </div>
            </div>
          </div>
        </div>


        <div class="employee-header">
          <div>${Dn("employeeListHeader")}</div>
          <div class="icons">
            <span class="material-icons" @click=${this._setTableView}>view_list</span>
            <span class="material-icons" @click=${this._setListView}>grid_view</span>
          </div>
        </div>

  

        ${"table"===this.viewMode?this._renderTableView(t):this._renderListView(t)}

        ${this._renderPagination(e.length)}

        ${this.isFormOpen?De`<employee-form .employee=${this.selectedEmployee} @close=${this._closeForm}></employee-form>`:""}
        <confirm-dialog></confirm-dialog>
        
      `}_renderTableView(e){return De`
        <table>
          <tr>
            <th><input type="checkbox" /></th>
            <th>${Dn("firstName")}</th>
            <th>${Dn("lastName")}</th>
            <th>${Dn("dateOfEmployment")}</th>
            <th>${Dn("dateOfBirth")}</th>
            <th>${Dn("phone")}</th>
            <th>${Dn("email")}</th>
            <th>${Dn("department")}</th>
            <th>${Dn("position")}</th>
            <th>${Dn("actions")}</th>
          </tr>
          ${e.map((e=>De`
            <tr>
              <td><input type="checkbox" /></td>
              <td>${e.firstName}</td>
              <td>${e.lastName}</td>
              <td>${e.dateOfEmployment}</td>
              <td>${e.dateOfBirth}</td>
              <td>${e.phone}</td>
              <td>${e.email}</td>
              <td>${e.department}</td>
              <td>${e.position}</td>
              <td class="actions">
                <button @click=${()=>this._openEditForm(e)}>
                  <span class="material-icons">edit</span>
                </button>
                <button @click=${()=>this._confirmDelete(e.id)}>
                  <span class="material-icons">delete</span>
                </button>
              </td>
            </tr>
          `))}
        </table>
      `}_renderListView(e){return De`
        <div class="list-view">
          ${e.map((e=>De`
            <div class="list-item">
              <h3>${e.firstName} ${e.lastName}</h3>
              <p><strong>${Dn("emailLabel")}</strong> ${e.email}</p>
              <p><strong>${Dn("departmentLabel")}</strong> ${e.department}</p>
              <p><strong>${Dn("positionLabel")}</strong> ${e.position}</p>
              <div class="actions">
                <button @click=${()=>this._openEditForm(e)}>
                  <span class="material-icons">edit</span>
                </button>
                <button @click=${()=>this._confirmDelete(e.id)}>
                  <span class="material-icons">delete</span>
                </button>
              </div>
            </div>
          `))}
        </div>
      `}_renderPagination(e){const t=Math.ceil(e/5);return De`
        <div class="pagination">
          ${Array.from({length:t},((e,t)=>De`
            <button class="${this.currentPage===t+1?"active":""}" 
              @click=${()=>this._changePage(t+1)}>
              ${t+1}
            </button>
          `))}
        </div>
      `}_paginate(e){const t=7*(this.currentPage-1);return e.slice(t,t+7)}_changePage(e){e>0&&(this.currentPage=e,this.requestUpdate())}_filterEmployees(){return this.employees}_toggleLanguageDropdown(){this.showLanguageDropdown=!this.showLanguageDropdown}_changeLanguage(e){document.documentElement.lang=e,this.lang=e,this.showLanguageDropdown=!1,this.requestUpdate()}_openAddForm(){this.selectedEmployee=null,this.isFormOpen=!0}_openEditForm(e){this.selectedEmployee={...e},this.isFormOpen=!0}_closeForm(){this.isFormOpen=!1}_setTableView(){this.viewMode="table",this.requestUpdate()}_setListView(){this.viewMode="list",this.requestUpdate()}async _confirmDelete(e){const t=this.renderRoot.querySelector("confirm-dialog");if(!t)return void console.error("Confirm Dialog component not found!");await t.open("Are you sure you want to delete this employee?")&&Ln.dispatch(In(e))}}customElements.define("employee-list",zn),window.addEventListener("DOMContentLoaded",(()=>{const e=document.querySelector("#app");if(!e)return void console.error("no error");new X(e).setRoutes([{path:"/",component:"employee-list"},{path:"/add",component:"employee-form"},{path:"/edit/:id",component:"employee-form"},{path:"(.*)",redirect:"/"}])}));
//# sourceMappingURL=main.js.map
