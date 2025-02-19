function t(t,e){void 0===e&&(e={});for(var n=function(t){for(var e=[],n=0;n<t.length;){var r=t[n];if("*"!==r&&"+"!==r&&"?"!==r)if("\\"!==r)if("{"!==r)if("}"!==r)if(":"!==r)if("("!==r)e.push({type:"CHAR",index:n,value:t[n++]});else{var i=1,o="";if("?"===t[a=n+1])throw new TypeError('Pattern cannot start with "?" at '.concat(a));for(;a<t.length;)if("\\"!==t[a]){if(")"===t[a]){if(0==--i){a++;break}}else if("("===t[a]&&(i++,"?"!==t[a+1]))throw new TypeError("Capturing groups are not allowed at ".concat(a));o+=t[a++]}else o+=t[a++]+t[a++];if(i)throw new TypeError("Unbalanced pattern at ".concat(n));if(!o)throw new TypeError("Missing pattern at ".concat(n));e.push({type:"PATTERN",index:n,value:o}),n=a}else{for(var s="",a=n+1;a<t.length;){var c=t.charCodeAt(a);if(!(c>=48&&c<=57||c>=65&&c<=90||c>=97&&c<=122||95===c))break;s+=t[a++]}if(!s)throw new TypeError("Missing parameter name at ".concat(n));e.push({type:"NAME",index:n,value:s}),n=a}else e.push({type:"CLOSE",index:n,value:t[n++]});else e.push({type:"OPEN",index:n,value:t[n++]});else e.push({type:"ESCAPED_CHAR",index:n++,value:t[n++]});else e.push({type:"MODIFIER",index:n,value:t[n++]})}return e.push({type:"END",index:n,value:""}),e}(t),i=e.prefixes,o=void 0===i?"./":i,s=e.delimiter,a=void 0===s?"/#?":s,c=[],u=0,l=0,d="",h=function(t){if(l<n.length&&n[l].type===t)return n[l++].value},f=function(t){var e=h(t);if(void 0!==e)return e;var r=n[l],i=r.type,o=r.index;throw new TypeError("Unexpected ".concat(i," at ").concat(o,", expected ").concat(t))},p=function(){for(var t,e="";t=h("CHAR")||h("ESCAPED_CHAR");)e+=t;return e},m=function(t){var e=c[c.length-1],n=t||(e&&"string"==typeof e?e:"");if(e&&!n)throw new TypeError('Must have text between two parameters, missing text after "'.concat(e.name,'"'));return!n||function(t){for(var e=0,n=a;e<n.length;e++){var r=n[e];if(t.indexOf(r)>-1)return!0}return!1}(n)?"[^".concat(r(a),"]+?"):"(?:(?!".concat(r(n),")[^").concat(r(a),"])+?")};l<n.length;){var y=h("CHAR"),b=h("NAME"),w=h("PATTERN");if(b||w){var g=y||"";-1===o.indexOf(g)&&(d+=g,g=""),d&&(c.push(d),d=""),c.push({name:b||u++,prefix:g,suffix:"",pattern:w||m(g),modifier:h("MODIFIER")||""})}else{var v=y||h("ESCAPED_CHAR");if(v)d+=v;else if(d&&(c.push(d),d=""),h("OPEN")){g=p();var x=h("NAME")||"",$=h("PATTERN")||"",E=p();f("CLOSE"),c.push({name:x||($?u++:""),pattern:x&&!$?m(g):$,prefix:g,suffix:E,modifier:h("MODIFIER")||""})}else f("END")}}return c}function e(e,r){return n(t(e,r),r)}function n(t,e){void 0===e&&(e={});var n=i(e),r=e.encode,o=void 0===r?function(t){return t}:r,s=e.validate,a=void 0===s||s,c=t.map((function(t){if("object"==typeof t)return new RegExp("^(?:".concat(t.pattern,")$"),n)}));return function(e){for(var n="",r=0;r<t.length;r++){var i=t[r];if("string"!=typeof i){var s=e?e[i.name]:void 0,u="?"===i.modifier||"*"===i.modifier,l="*"===i.modifier||"+"===i.modifier;if(Array.isArray(s)){if(!l)throw new TypeError('Expected "'.concat(i.name,'" to not repeat, but got an array'));if(0===s.length){if(u)continue;throw new TypeError('Expected "'.concat(i.name,'" to not be empty'))}for(var d=0;d<s.length;d++){var h=o(s[d],i);if(a&&!c[r].test(h))throw new TypeError('Expected all "'.concat(i.name,'" to match "').concat(i.pattern,'", but got "').concat(h,'"'));n+=i.prefix+h+i.suffix}}else if("string"!=typeof s&&"number"!=typeof s){if(!u){var f=l?"an array":"a string";throw new TypeError('Expected "'.concat(i.name,'" to be ').concat(f))}}else{h=o(String(s),i);if(a&&!c[r].test(h))throw new TypeError('Expected "'.concat(i.name,'" to match "').concat(i.pattern,'", but got "').concat(h,'"'));n+=i.prefix+h+i.suffix}}else n+=i}return n}}function r(t){return t.replace(/([.+*?=^!:${}()[\]|/\\])/g,"\\$1")}function i(t){return t&&t.sensitive?"":"i"}function o(e,n,o){return function(t,e,n){void 0===n&&(n={});for(var o=n.strict,s=void 0!==o&&o,a=n.start,c=void 0===a||a,u=n.end,l=void 0===u||u,d=n.encode,h=void 0===d?function(t){return t}:d,f=n.delimiter,p=void 0===f?"/#?":f,m=n.endsWith,y="[".concat(r(void 0===m?"":m),"]|$"),b="[".concat(r(p),"]"),w=c?"^":"",g=0,v=t;g<v.length;g++){var x=v[g];if("string"==typeof x)w+=r(h(x));else{var $=r(h(x.prefix)),E=r(h(x.suffix));if(x.pattern)if(e&&e.push(x),$||E)if("+"===x.modifier||"*"===x.modifier){var S="*"===x.modifier?"?":"";w+="(?:".concat($,"((?:").concat(x.pattern,")(?:").concat(E).concat($,"(?:").concat(x.pattern,"))*)").concat(E,")").concat(S)}else w+="(?:".concat($,"(").concat(x.pattern,")").concat(E,")").concat(x.modifier);else{if("+"===x.modifier||"*"===x.modifier)throw new TypeError('Can not repeat "'.concat(x.name,'" without a prefix and suffix'));w+="(".concat(x.pattern,")").concat(x.modifier)}else w+="(?:".concat($).concat(E,")").concat(x.modifier)}}if(l)s||(w+="".concat(b,"?")),w+=n.endsWith?"(?=".concat(y,")"):"$";else{var k=t[t.length-1],O="string"==typeof k?b.indexOf(k[k.length-1])>-1:void 0===k;s||(w+="(?:".concat(b,"(?=").concat(y,"))?")),O||(w+="(?=".concat(b,"|").concat(y,")"))}return new RegExp(w,i(n))}(t(e,o),n,o)}function s(t,e,n){return t instanceof RegExp?function(t,e){if(!e)return t;for(var n=/\((?:\?<(.*?)>)?(?!\?)/g,r=0,i=n.exec(t.source);i;)e.push({name:i[1]||r++,prefix:"",suffix:"",modifier:"",pattern:""}),i=n.exec(t.source);return t}(t,e):Array.isArray(t)?function(t,e,n){var r=t.map((function(t){return s(t,e,n).source}));return new RegExp("(?:".concat(r.join("|"),")"),i(n))}(t,e,n):o(t,e,n)}function a(t){return"object"==typeof t&&!!t}function c(t){return"function"==typeof t}function u(t){return"string"==typeof t}function l(t=[]){return Array.isArray(t)?t:[t]}function d(t){return`[Vaadin.Router] ${t}`}!function(t,e){t&&!t.getElementById("livereloadscript")&&((e=t.createElement("script")).async=1,e.src="//"+(self.location.host||"localhost").split(":")[0]+":35729/livereload.js?snipver=1",e.id="livereloadscript",t.getElementsByTagName("head")[0].appendChild(e))}(self.document);class h extends Error{code;context;constructor(t){super(d(`Page not found (${t.pathname})`)),this.context=t,this.code=404}}const f=Symbol("NotFoundResult");function p(t){return new h(t)}function m(t){return(Array.isArray(t)?t[0]:t)??""}function y(t){return m(t?.path)}const b=new Map;function w(t){try{return decodeURIComponent(t)}catch{return t}}b.set("|false",{keys:[],pattern:/(?:)/u});var g=function(t,e,n=!1,r=[],i){const o=`${t}|${String(n)}`,a=m(e);let c=b.get(o);if(!c){const e=[];c={keys:e,pattern:s(t,e,{end:n,strict:""===t})},b.set(o,c)}const u=c.pattern.exec(a);if(!u)return null;const l={...i};for(let t=1;t<u.length;t++){const e=c.keys[t-1],n=e.name,r=u[t];void 0===r&&Object.hasOwn(l,n)||("+"===e.modifier||"*"===e.modifier?l[n]=r?r.split(/[/?#]/u).map(w):[]:l[n]=r?w(r):r)}return{keys:[...r,...c.keys],params:l,path:u[0]}};var v=function t(e,n,r,i,o){let s,a,c=0,u=y(e);return u.startsWith("/")&&(r&&(u=u.substring(1)),r=!0),{next(l){if(e===l)return{done:!0,value:void 0};e.i??=function(t){return Array.isArray(t)&&t.length>0?t:void 0}(e.children);const d=e.i??[],h=!e.i&&!e.children;if(!s&&(s=g(u,n,h,i,o),s))return{value:{keys:s.keys,params:s.params,path:s.path,route:e}};if(s&&d.length>0)for(;c<d.length;){if(!a){const i=d[c];i.parent=e;let o=s.path.length;o>0&&"/"===n.charAt(o)&&(o+=1),a=t(i,n.substring(o),r,s.keys,s.params)}const i=a.next(l);if(!i.done)return{done:!1,value:i.value};a=null,c+=1}return{done:!0,value:void 0}}}};function x(t){if(c(t.route.action))return t.route.action(t)}class $ extends Error{code;context;constructor(t,e){let n=`Path '${t.pathname}' is not properly resolved due to an error.`;const r=y(t.route);r&&(n+=` Resolution had failed on route: '${r}'`),super(n,e),this.code=e?.code,this.context=t}warn(){console.warn(this.message)}}class E{baseUrl;#t;errorHandler;resolveRoute;#e;constructor(t,{baseUrl:e="",context:n,errorHandler:r,resolveRoute:i=x}={}){if(Object(t)!==t)throw new TypeError("Invalid routes");this.baseUrl=e,this.errorHandler=r,this.resolveRoute=i,Array.isArray(t)?this.#e={i:t,m:!0,action:()=>{},path:""}:this.#e={...t,parent:void 0},this.#t={...n,hash:"",next:async()=>f,params:{},pathname:"",resolver:this,route:this.#e,search:"",chain:[]}}get root(){return this.#e}get context(){return this.#t}get v(){return this.baseUrl?new URL(this.baseUrl,document.baseURI||document.URL).href.replace(/[^/]*$/u,""):""}getRoutes(){return[...this.#e.i??[]]}removeRoutes(){this.#e.i=[]}async resolve(t){const e=this,n={...this.#t,...u(t)?{pathname:t}:t,next:c},r=v(this.#e,this.S(n.pathname)??n.pathname,!!this.baseUrl),i=this.resolveRoute;let o=null,s=null,a=n;async function c(t=!1,u=o?.value?.route,l){const d=null===l?o?.value?.route:void 0;if(o=s??r.next(d),s=null,!t&&(o.done||!function(t,e){let n=t;for(;n;)if(n=n.parent,n===e)return!0;return!1}(o.value.route,u)))return s=o,f;if(o.done)throw p(n);a={...n,params:o.value.params,route:o.value.route,chain:a.chain?.slice()},function(t,e){const{path:n,route:r}=e;if(r&&!r.m){const e={path:n,route:r};if(r.parent&&t.chain)for(let e=t.chain.length-1;e>=0&&t.chain[e].route!==r.parent;e--)t.chain.pop();t.chain?.push(e)}}(a,o.value);const h=await i(a);return null!=h&&h!==f?(a.result=(m=h)&&"object"==typeof m&&"next"in m&&"params"in m&&"result"in m&&"route"in m?h.result:h,e.#t=a,a):await c(t,u,h);var m}try{return await c(!0,this.#e)}catch(t){const e=t instanceof h?t:new $(a,{code:500,cause:t});if(this.errorHandler)return a.result=this.errorHandler(e),a;throw t}}setRoutes(t){this.#e.i=[...l(t)]}S(t){if(!this.baseUrl)return t;const e=this.v,n=t.startsWith("/")?new URL(e).origin+t:`./${t}`,r=new URL(n,e).href;return r.startsWith(e)?r.slice(e.length):void 0}addRoutes(t){return this.#e.i=[...this.#e.i??[],...l(t)],this.getRoutes()}}function S(t,e,n,r){const i=e.name??r?.(e);if(i&&(t.has(i)?t.get(i)?.push(e):t.set(i,[e])),Array.isArray(n))for(const i of n)i.parent=e,S(t,i,i.i??i.children,r)}function k(t,e){const n=t.get(e);if(n){if(n.length>1)throw new Error(`Duplicate route with name "${e}". Try seting unique 'name' route properties.`);return n[0]}}var O=function(e,r={}){if(!(e instanceof E))throw new TypeError("An instance of Resolver is expected");const i=new Map,o=new Map;return(s,a)=>{let c=k(o,s);if(!c&&(o.clear(),S(o,e.root,e.root.i,r.cacheKeyProvider),c=k(o,s),!c))throw new Error(`Route "${s}" not found`);let l=c.fullPath?i.get(c.fullPath):void 0;if(!l){let e=y(c),n=c.parent;for(;n;){const t=y(n);t&&(e=`${t.replace(/\/$/u,"")}/${e.replace(/^\//u,"")}`),n=n.parent}const r=t(e),o=Object.create(null);for(const t of r)u(t)||(o[t.name]=!0);l={keys:o,tokens:r},i.set(e,l),c.fullPath=e}let d=n(l.tokens,{encode:encodeURIComponent,...r})(a)||"/";if(r.stringifyQueryParams&&a){const t={};for(const[e,n]of Object.entries(a))!(e in l.keys)&&n&&(t[e]=n);const e=r.stringifyQueryParams(t);e&&(d+=e.startsWith("?")?e:`?${e}`)}return d}};const A=/\/\*[\*!]\s+vaadin-dev-mode:start([\s\S]*)vaadin-dev-mode:end\s+\*\*\//i,j=window.Vaadin&&window.Vaadin.Flow&&window.Vaadin.Flow.clients;function N(t,e){if("function"!=typeof t)return;const n=A.exec(t.toString());if(n)try{t=new Function(n[1])}catch(t){console.log("vaadin-development-mode-detector: uncommentAndRun() failed",t)}return t(e)}window.Vaadin=window.Vaadin||{};const C=function(t,e){if(window.Vaadin.developmentMode)return N(t,e)};function _(){
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

  vaadin-dev-mode:end **/}void 0===window.Vaadin.developmentMode&&(window.Vaadin.developmentMode=function(){try{return!!localStorage.getItem("vaadin.developmentmode.force")||["localhost","127.0.0.1"].indexOf(window.location.hostname)>=0&&(j?!(j&&Object.keys(j).map((t=>j[t])).filter((t=>t.productionMode)).length>0):!N((function(){return!0})))}catch(t){return!1}}());!function(t,e=(window.Vaadin??={})){e.registrations??=[],e.registrations.push({is:"@vaadin/router",version:"2.0.0"})}(),C(_);var T=async function(t,e){return t.classList.add(e),await new Promise((n=>{if((t=>{const e=getComputedStyle(t).getPropertyValue("animation-name");return e&&"none"!==e})(t)){const r=t.getBoundingClientRect(),i=`height: ${r.bottom-r.top}px; width: ${r.right-r.left}px`;t.setAttribute("style",`position: absolute; ${i}`),((t,e)=>{const n=()=>{t.removeEventListener("animationend",n),e()};t.addEventListener("animationend",n)})(t,(()=>{t.classList.remove(e),t.removeAttribute("style"),n()}))}else t.classList.remove(e),n()}))};function P(t){if(!t||!u(t.path))throw new Error(d('Expected route config to be an object with a "path" string property, or an array of such objects'));if(!(c(t.action)||Array.isArray(t.children)||c(t.children)||u(t.component)||u(t.redirect)))throw new Error(d(`Expected route config "${t.path}" to include either "component, redirect" or "action" function but none found.`));t.redirect&&["bundle","component"].forEach((e=>{e in t&&console.warn(d(`Route config "${String(t.path)}" has both "redirect" and "${e}" properties, and "redirect" will always override the latter. Did you mean to only use "${e}"?`))}))}function R(t){l(t).forEach((t=>P(t)))}function M(t,e){const n=e.v;return n?new URL(t.replace(/^\//u,""),n).pathname:t}function I(t){return t.map((t=>t.path)).reduce(((t,e)=>e.length?`${t.replace(/\/$/u,"")}/${e.replace(/^\//u,"")}`:t),"")}function D({chain:t=[],hash:n="",params:r={},pathname:i="",redirectFrom:o,resolver:s,search:a=""},c){const u=t.map((t=>t.route));return{baseUrl:s?.baseUrl??"",getUrl:(n={})=>s?M(e(function(t){return I(t.map((t=>t.route)))}(t))({...r,...n}),s):"",hash:n,params:r,pathname:i,redirectFrom:o,route:c??(Array.isArray(u)?u.at(-1):void 0)??null,routes:u,search:a,searchParams:new URLSearchParams(a)}}function B(t,e){const n={...t.params};return{redirect:{from:t.pathname,params:n,pathname:e}}}function L(t,e,...n){if("function"==typeof t)return t.apply(e,n)}function z(t,e,...n){return r=>r&&a(r)&&("cancel"in r||"redirect"in r)?r:L(e?.[t],e,...n)}function U(t,e){return!window.dispatchEvent(new CustomEvent(`vaadin-router-${t}`,{cancelable:"go"===t,detail:e}))}function F(t){if(t instanceof Element)return t.nodeName.toLowerCase()}function J(t){if(t.defaultPrevented)return;if(0!==t.button)return;if(t.shiftKey||t.ctrlKey||t.altKey||t.metaKey)return;let e=t.target;const n=t instanceof MouseEvent?t.composedPath():t.path??[];for(let t=0;t<n.length;t++){const r=n[t];if("nodeName"in r&&"a"===r.nodeName.toLowerCase()){e=r;break}}for(;e&&e instanceof Node&&"a"!==F(e);)e=e.parentNode;if(!e||"a"!==F(e))return;const r=e;if(r.target&&"_self"!==r.target.toLowerCase())return;if(r.hasAttribute("download"))return;if(r.hasAttribute("router-ignore"))return;if(r.pathname===window.location.pathname&&""!==r.hash)return;const i=r.origin||function(t){const{port:e,protocol:n}=t;return`${n}//${"http:"===n&&"80"===e||"https:"===n&&"443"===e?t.hostname:t.host}`}(r);if(i!==window.location.origin)return;const{hash:o,pathname:s,search:a}=r;U("go",{hash:o,pathname:s,search:a})&&t instanceof MouseEvent&&(t.preventDefault(),"click"===t.type&&window.scrollTo(0,0))}function H(t){if("vaadin-router-ignore"===t.state)return;const{hash:e,pathname:n,search:r}=window.location;U("go",{hash:e,pathname:n,search:r})}let W=[];const q={CLICK:{activate(){window.document.addEventListener("click",J)},inactivate(){window.document.removeEventListener("click",J)}},POPSTATE:{activate(){window.addEventListener("popstate",H)},inactivate(){window.removeEventListener("popstate",H)}}};function Y(t=[]){W.forEach((t=>t.inactivate())),t.forEach((t=>t.activate())),W=t}function V(){return{cancel:!0}}const K={A:-1,params:{},route:{m:!0,children:[],path:"",action(){}},pathname:"",next:async()=>f};class G extends E{location=D({resolver:this});ready=Promise.resolve(this.location);#n=new WeakSet;#r=new WeakSet;#i=this.#o.bind(this);#s=0;#a;N;#c;#u=null;#l=null;constructor(t,e){const n=document.head.querySelector("base"),r=n?.getAttribute("href");super([],{baseUrl:r?new URL(r,document.URL).href.replace(/[^/]*$/u,""):void 0,...e,resolveRoute:async t=>await this.#d(t)}),Y(Object.values(q)),this.setOutlet(t),this.subscribe()}async#d(t){const{route:e}=t;if(c(e.children)){let n=await e.children(function({next:t,...e}){return e}(t));c(e.children)||({children:n}=e),function(t,e){if(!Array.isArray(t)&&!a(t))throw new Error(d(`Incorrect "children" value for the route ${String(e.path)}: expected array or object, but got ${String(t)}`));const n=l(t);n.forEach((t=>P(t))),e.i=n}(n,e)}const n={component:t=>{const e=document.createElement(t);return this.#r.add(e),e},prevent:V,redirect:e=>B(t,e)};return await Promise.resolve().then((async()=>{if(this.#h(t))return await L(e.action,e,t,n)})).then((t=>null==t||"object"!=typeof t&&"symbol"!=typeof t||!(t instanceof HTMLElement||t===f||a(t)&&"redirect"in t)?u(e.redirect)?n.redirect(e.redirect):void 0:t)).then((t=>null!=t?t:u(e.component)?n.component(e.component):void 0))}setOutlet(t){t&&this.#f(t),this.#a=t}getOutlet(){return this.#a}async setRoutes(t,e=!1){return this.N=void 0,this.#c=void 0,R(t),super.setRoutes(t),e||this.#o(),await this.ready}addRoutes(t){return R(t),super.addRoutes(t)}async render(t,e=!1){this.#s+=1;const n=this.#s,r={...K,...u(t)?{hash:"",search:"",pathname:t}:t,A:n};return this.ready=this.#p(r,e),await this.ready}async#p(t,e){const{A:n}=t;try{const r=await this.resolve(t),i=await this.#m(r);if(!this.#h(i))return this.location;const o=this.N;if(i===o)return this.#y(o,!0),this.location;if(this.location=D(i),e&&this.#y(i,1===n),U("location-changed",{router:this,location:this.location}),i.C)return this.#b(i,o),this.N=i,this.location;this.#w(i,o);const s=this.#g(i);if(this.#v(i),this.#x(i,o),await s,this.#h(i))return this.#$(),this.N=i,this.location}catch(r){if(n===this.#s){e&&this.#y(this.context);for(const t of this.#a?.children??[])t.remove();throw this.location=D(Object.assign(t,{resolver:this})),U("error",{router:this,error:r,...t}),r}}return this.location}async#m(t,e=t){const n=await this.#E(e),r=n!==e?n:t,i=M(I(n.chain??[]),this)===n.pathname,o=async(t,e=t.route,n)=>{const r=await t.next(!1,e,n);return null===r||r===f?i?t:null!=e.parent?await o(t,e.parent,r):r:r},s=await o(n);if(null==s||s===f)throw p(r);return s!==n?await this.#m(r,s):await this.#S(n)}async#E(t){const{result:e}=t;if(e instanceof HTMLElement)return function(t,e){if(e.location=D(t),t.chain){const n=t.chain.map((t=>t.route)).indexOf(t.route);t.chain[n].element=e}}(t,e),t;if(e&&"redirect"in e){const n=await this.#k(e.redirect,t.R,t.A);return await this.#E(n)}throw e instanceof Error?e:new Error(d(`Invalid route resolution result for path "${t.pathname}". Expected redirect object or HTML element, but got: "${function(t){if("object"!=typeof t)return String(t);const[e="Unknown"]=/ (.*)\]$/u.exec(String(t))??[];return"Object"===e||"Array"===e?`${e} ${JSON.stringify(t)}`:e}(e)}". Double check the action return value for the route.`))}async#S(t){return await this.#O(t).then((async e=>e===this.N||e===t?e:await this.#m(e)))}async#O(t){const e=this.N??{},n=e.chain??[],r=t.chain??[];let i=Promise.resolve(void 0);const o=e=>B(t,e);if(t.M=0,t.C=!1,n.length){for(let e=0;e<Math.min(n.length,r.length)&&(n[e].route===r[e].route&&(n[e].path===r[e].path||n[e].element===r[e].element)&&this.#A(n[e].element,r[e].element));t.M++,e++);if(t.C=r.length===n.length&&t.M===r.length&&this.#A(t.result,e.result),t.C){for(let e=r.length-1;e>=0;e--)i=this.#j(i,t,{prevent:V},n[e]);for(let e=0;e<r.length;e++)i=this.#N(i,t,{prevent:V,redirect:o},r[e]),n[e].element.location=D(t,n[e].route)}else for(let e=n.length-1;e>=t.M;e--)i=this.#j(i,t,{prevent:V},n[e])}if(!t.C)for(let e=0;e<r.length;e++)e<t.M?e<n.length&&n[e].element&&(n[e].element.location=D(t,n[e].route)):(i=this.#N(i,t,{prevent:V,redirect:o},r[e]),r[e].element&&(r[e].element.location=D(t,r[e].route)));return await i.then((async e=>{if(e&&a(e)){if("cancel"in e&&this.N)return this.N.A=t.A,this.N;if("redirect"in e)return await this.#k(e.redirect,t.R,t.A)}return t}))}async#j(t,e,n,r){const i=D(e);let o=await t;if(this.#h(e)){o=z("onBeforeLeave",r.element,i,n,this)(o)}if(!a(o)||!("redirect"in o))return o}async#N(t,e,n,r){const i=D(e,r.route),o=await t;if(this.#h(e)){return z("onBeforeEnter",r.element,i,n,this)(o)}}#A(t,e){return t instanceof Element&&e instanceof Element&&(this.#r.has(t)&&this.#r.has(e)?t.localName===e.localName:t===e)}#h(t){return t.A===this.#s}async#k(t,e=0,n=0){if(e>256)throw new Error(d(`Too many redirects when rendering ${t.from}`));return await this.resolve({...K,pathname:this.urlForPath(t.pathname,t.params),redirectFrom:t.from,R:e+1,A:n})}#f(t=this.#a){if(!(t instanceof Element||t instanceof DocumentFragment))throw new TypeError(d(`Expected router outlet to be a valid DOM Element | DocumentFragment (but got ${t})`))}#y({pathname:t,search:e="",hash:n=""},r){if(window.location.pathname!==t||window.location.search!==e||window.location.hash!==n){const i=r?"replaceState":"pushState";window.history[i](null,document.title,t+e+n),window.dispatchEvent(new PopStateEvent("popstate",{state:"vaadin-router-ignore"}))}}#b(t,e){let n=this.#a;for(let r=0;r<(t.M??0);r++){const i=e?.chain?.[r].element;if(i){if(i.parentNode!==n)break;t.chain[r].element=i,n=i}}return n}#w(t,e){this.#f(),this.#C();const n=this.#b(t,e);this.#u=[],this.#l=Array.from(n?.children??[]).filter((e=>this.#n.has(e)&&e!==t.result));let r=n;for(let e=t.M??0;e<(t.chain?.length??0);e++){const i=t.chain[e].element;i&&(r?.appendChild(i),this.#n.add(i),r===n&&this.#u.push(i),r=i)}}#$(){if(this.#l)for(const t of this.#l)t.remove();this.#l=null,this.#u=null}#C(){if(this.#l&&this.#u){for(const t of this.#u)t.remove();this.#l=null,this.#u=null}}#x(t,e){if(e?.chain&&null!=t.M)for(let n=e.chain.length-1;n>=t.M&&this.#h(t);n--){const r=e.chain[n].element;if(r)try{const e=D(t);L(r.onAfterLeave,r,e,{},this)}finally{if(this.#l?.includes(r))for(const t of r.children)t.remove()}}}#v(t){if(t.chain&&null!=t.M)for(let e=t.M;e<t.chain.length&&this.#h(t);e++){const n=t.chain[e].element;if(n){const r=D(t,t.chain[e].route);L(n.onAfterEnter,n,r,{},this)}}}async#g(t){const e=this.#l?.[0],n=this.#u?.[0],r=[],{chain:i=[]}=t;let o;for(let t=i.length-1;t>=0;t--)if(i[t].route.animate){o=i[t].route.animate;break}if(e&&n&&o){const t=a(o)&&o.leave?o.leave:"leaving",i=a(o)&&o.enter?o.enter:"entering";r.push(T(e,t)),r.push(T(n,i))}return await Promise.all(r),t}subscribe(){window.addEventListener("vaadin-router-go",this.#i)}unsubscribe(){window.removeEventListener("vaadin-router-go",this.#i)}#o(t){const{pathname:e,search:n,hash:r}=t instanceof CustomEvent?t.detail:window.location;u(this.S(e))&&(t?.preventDefault&&t.preventDefault(),this.render({pathname:e,search:n,hash:r},!0))}static setTriggers(...t){Y(t)}urlForName(t,e){return this.#c||(this.#c=O(this,{cacheKeyProvider:t=>"component"in t&&"string"==typeof t.component?t.component:void 0})),M(this.#c(t,e??void 0),this)}urlForPath(t,n){return M(e(t)(n??void 0),this)}static go(t){const{pathname:e,search:n,hash:r}=u(t)?new URL(t,"http://a"):t;return U("go",{pathname:e,search:n,hash:r})}}
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Z=globalThis,Q=Z.ShadowRoot&&(void 0===Z.ShadyCSS||Z.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,X=Symbol(),tt=new WeakMap;let et=class{constructor(t,e,n){if(this._$cssResult$=!0,n!==X)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(Q&&void 0===t){const n=void 0!==e&&1===e.length;n&&(t=tt.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),n&&tt.set(e,t))}return t}toString(){return this.cssText}};const nt=(t,...e)=>{const n=1===t.length?t[0]:e.reduce(((e,n,r)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(n)+t[r+1]),t[0]);return new et(n,t,X)},rt=Q?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const n of t.cssRules)e+=n.cssText;return(t=>new et("string"==typeof t?t:t+"",void 0,X))(e)})(t):t
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */,{is:it,defineProperty:ot,getOwnPropertyDescriptor:st,getOwnPropertyNames:at,getOwnPropertySymbols:ct,getPrototypeOf:ut}=Object,lt=globalThis,dt=lt.trustedTypes,ht=dt?dt.emptyScript:"",ft=lt.reactiveElementPolyfillSupport,pt=(t,e)=>t,mt={toAttribute(t,e){switch(e){case Boolean:t=t?ht:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let n=t;switch(e){case Boolean:n=null!==t;break;case Number:n=null===t?null:Number(t);break;case Object:case Array:try{n=JSON.parse(t)}catch(t){n=null}}return n}},yt=(t,e)=>!it(t,e),bt={attribute:!0,type:String,converter:mt,reflect:!1,hasChanged:yt};Symbol.metadata??=Symbol("metadata"),lt.litPropertyMetadata??=new WeakMap;class wt extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=bt){if(e.state&&(e.attribute=!1),this._$Ei(),this.elementProperties.set(t,e),!e.noAccessor){const n=Symbol(),r=this.getPropertyDescriptor(t,n,e);void 0!==r&&ot(this.prototype,t,r)}}static getPropertyDescriptor(t,e,n){const{get:r,set:i}=st(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get(){return r?.call(this)},set(e){const o=r?.call(this);i.call(this,e),this.requestUpdate(t,o,n)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??bt}static _$Ei(){if(this.hasOwnProperty(pt("elementProperties")))return;const t=ut(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(pt("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(pt("properties"))){const t=this.properties,e=[...at(t),...ct(t)];for(const n of e)this.createProperty(n,t[n])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,n]of e)this.elementProperties.set(t,n)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const n=this._$Eu(t,e);void 0!==n&&this._$Eh.set(n,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const n=new Set(t.flat(1/0).reverse());for(const t of n)e.unshift(rt(t))}else void 0!==t&&e.push(rt(t));return e}static _$Eu(t,e){const n=e.attribute;return!1===n?void 0:"string"==typeof n?n:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach((t=>t(this)))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const n of e.keys())this.hasOwnProperty(n)&&(t.set(n,this[n]),delete this[n]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,e)=>{if(Q)t.adoptedStyleSheets=e.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet));else for(const n of e){const e=document.createElement("style"),r=Z.litNonce;void 0!==r&&e.setAttribute("nonce",r),e.textContent=n.cssText,t.appendChild(e)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach((t=>t.hostConnected?.()))}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach((t=>t.hostDisconnected?.()))}attributeChangedCallback(t,e,n){this._$AK(t,n)}_$EC(t,e){const n=this.constructor.elementProperties.get(t),r=this.constructor._$Eu(t,n);if(void 0!==r&&!0===n.reflect){const i=(void 0!==n.converter?.toAttribute?n.converter:mt).toAttribute(e,n.type);this._$Em=t,null==i?this.removeAttribute(r):this.setAttribute(r,i),this._$Em=null}}_$AK(t,e){const n=this.constructor,r=n._$Eh.get(t);if(void 0!==r&&this._$Em!==r){const t=n.getPropertyOptions(r),i="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:mt;this._$Em=r,this[r]=i.fromAttribute(e,t.type),this._$Em=null}}requestUpdate(t,e,n){if(void 0!==t){if(n??=this.constructor.getPropertyOptions(t),!(n.hasChanged??yt)(this[t],e))return;this.P(t,e,n)}!1===this.isUpdatePending&&(this._$ES=this._$ET())}P(t,e,n){this._$AL.has(t)||this._$AL.set(t,e),!0===n.reflect&&this._$Em!==t&&(this._$Ej??=new Set).add(t)}async _$ET(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,n]of t)!0!==n.wrapped||this._$AL.has(e)||void 0===this[e]||this.P(e,this[e],n)}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach((t=>t.hostUpdate?.())),this.update(e)):this._$EU()}catch(e){throw t=!1,this._$EU(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach((t=>t.hostUpdated?.())),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Ej&&=this._$Ej.forEach((t=>this._$EC(t,this[t]))),this._$EU()}updated(t){}firstUpdated(t){}}wt.elementStyles=[],wt.shadowRootOptions={mode:"open"},wt[pt("elementProperties")]=new Map,wt[pt("finalized")]=new Map,ft?.({ReactiveElement:wt}),(lt.reactiveElementVersions??=[]).push("2.0.4");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const gt=globalThis,vt=gt.trustedTypes,xt=vt?vt.createPolicy("lit-html",{createHTML:t=>t}):void 0,$t="$lit$",Et=`lit$${Math.random().toFixed(9).slice(2)}$`,St="?"+Et,kt=`<${St}>`,Ot=document,At=()=>Ot.createComment(""),jt=t=>null===t||"object"!=typeof t&&"function"!=typeof t,Nt=Array.isArray,Ct="[ \t\n\f\r]",_t=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Tt=/-->/g,Pt=/>/g,Rt=RegExp(`>|${Ct}(?:([^\\s"'>=/]+)(${Ct}*=${Ct}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),Mt=/'/g,It=/"/g,Dt=/^(?:script|style|textarea|title)$/i,Bt=(t=>(e,...n)=>({_$litType$:t,strings:e,values:n}))(1),Lt=Symbol.for("lit-noChange"),zt=Symbol.for("lit-nothing"),Ut=new WeakMap,Ft=Ot.createTreeWalker(Ot,129);function Jt(t,e){if(!Nt(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==xt?xt.createHTML(e):e}const Ht=(t,e)=>{const n=t.length-1,r=[];let i,o=2===e?"<svg>":3===e?"<math>":"",s=_t;for(let e=0;e<n;e++){const n=t[e];let a,c,u=-1,l=0;for(;l<n.length&&(s.lastIndex=l,c=s.exec(n),null!==c);)l=s.lastIndex,s===_t?"!--"===c[1]?s=Tt:void 0!==c[1]?s=Pt:void 0!==c[2]?(Dt.test(c[2])&&(i=RegExp("</"+c[2],"g")),s=Rt):void 0!==c[3]&&(s=Rt):s===Rt?">"===c[0]?(s=i??_t,u=-1):void 0===c[1]?u=-2:(u=s.lastIndex-c[2].length,a=c[1],s=void 0===c[3]?Rt:'"'===c[3]?It:Mt):s===It||s===Mt?s=Rt:s===Tt||s===Pt?s=_t:(s=Rt,i=void 0);const d=s===Rt&&t[e+1].startsWith("/>")?" ":"";o+=s===_t?n+kt:u>=0?(r.push(a),n.slice(0,u)+$t+n.slice(u)+Et+d):n+Et+(-2===u?e:d)}return[Jt(t,o+(t[n]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),r]};class Wt{constructor({strings:t,_$litType$:e},n){let r;this.parts=[];let i=0,o=0;const s=t.length-1,a=this.parts,[c,u]=Ht(t,e);if(this.el=Wt.createElement(c,n),Ft.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(r=Ft.nextNode())&&a.length<s;){if(1===r.nodeType){if(r.hasAttributes())for(const t of r.getAttributeNames())if(t.endsWith($t)){const e=u[o++],n=r.getAttribute(t).split(Et),s=/([.?@])?(.*)/.exec(e);a.push({type:1,index:i,name:s[2],strings:n,ctor:"."===s[1]?Gt:"?"===s[1]?Zt:"@"===s[1]?Qt:Kt}),r.removeAttribute(t)}else t.startsWith(Et)&&(a.push({type:6,index:i}),r.removeAttribute(t));if(Dt.test(r.tagName)){const t=r.textContent.split(Et),e=t.length-1;if(e>0){r.textContent=vt?vt.emptyScript:"";for(let n=0;n<e;n++)r.append(t[n],At()),Ft.nextNode(),a.push({type:2,index:++i});r.append(t[e],At())}}}else if(8===r.nodeType)if(r.data===St)a.push({type:2,index:i});else{let t=-1;for(;-1!==(t=r.data.indexOf(Et,t+1));)a.push({type:7,index:i}),t+=Et.length-1}i++}}static createElement(t,e){const n=Ot.createElement("template");return n.innerHTML=t,n}}function qt(t,e,n=t,r){if(e===Lt)return e;let i=void 0!==r?n._$Co?.[r]:n._$Cl;const o=jt(e)?void 0:e._$litDirective$;return i?.constructor!==o&&(i?._$AO?.(!1),void 0===o?i=void 0:(i=new o(t),i._$AT(t,n,r)),void 0!==r?(n._$Co??=[])[r]=i:n._$Cl=i),void 0!==i&&(e=qt(t,i._$AS(t,e.values),i,r)),e}class Yt{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:n}=this._$AD,r=(t?.creationScope??Ot).importNode(e,!0);Ft.currentNode=r;let i=Ft.nextNode(),o=0,s=0,a=n[0];for(;void 0!==a;){if(o===a.index){let e;2===a.type?e=new Vt(i,i.nextSibling,this,t):1===a.type?e=new a.ctor(i,a.name,a.strings,this,t):6===a.type&&(e=new Xt(i,this,t)),this._$AV.push(e),a=n[++s]}o!==a?.index&&(i=Ft.nextNode(),o++)}return Ft.currentNode=Ot,r}p(t){let e=0;for(const n of this._$AV)void 0!==n&&(void 0!==n.strings?(n._$AI(t,n,e),e+=n.strings.length-2):n._$AI(t[e])),e++}}class Vt{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,n,r){this.type=2,this._$AH=zt,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=n,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=qt(this,t,e),jt(t)?t===zt||null==t||""===t?(this._$AH!==zt&&this._$AR(),this._$AH=zt):t!==this._$AH&&t!==Lt&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>Nt(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==zt&&jt(this._$AH)?this._$AA.nextSibling.data=t:this.T(Ot.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:n}=t,r="number"==typeof n?this._$AC(t):(void 0===n.el&&(n.el=Wt.createElement(Jt(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===r)this._$AH.p(e);else{const t=new Yt(r,this),n=t.u(this.options);t.p(e),this.T(n),this._$AH=t}}_$AC(t){let e=Ut.get(t.strings);return void 0===e&&Ut.set(t.strings,e=new Wt(t)),e}k(t){Nt(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let n,r=0;for(const i of t)r===e.length?e.push(n=new Vt(this.O(At()),this.O(At()),this,this.options)):n=e[r],n._$AI(i),r++;r<e.length&&(this._$AR(n&&n._$AB.nextSibling,r),e.length=r)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class Kt{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,n,r,i){this.type=1,this._$AH=zt,this._$AN=void 0,this.element=t,this.name=e,this._$AM=r,this.options=i,n.length>2||""!==n[0]||""!==n[1]?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=zt}_$AI(t,e=this,n,r){const i=this.strings;let o=!1;if(void 0===i)t=qt(this,t,e,0),o=!jt(t)||t!==this._$AH&&t!==Lt,o&&(this._$AH=t);else{const r=t;let s,a;for(t=i[0],s=0;s<i.length-1;s++)a=qt(this,r[n+s],e,s),a===Lt&&(a=this._$AH[s]),o||=!jt(a)||a!==this._$AH[s],a===zt?t=zt:t!==zt&&(t+=(a??"")+i[s+1]),this._$AH[s]=a}o&&!r&&this.j(t)}j(t){t===zt?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class Gt extends Kt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===zt?void 0:t}}class Zt extends Kt{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==zt)}}class Qt extends Kt{constructor(t,e,n,r,i){super(t,e,n,r,i),this.type=5}_$AI(t,e=this){if((t=qt(this,t,e,0)??zt)===Lt)return;const n=this._$AH,r=t===zt&&n!==zt||t.capture!==n.capture||t.once!==n.once||t.passive!==n.passive,i=t!==zt&&(n===zt||r);r&&this.element.removeEventListener(this.name,this,n),i&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class Xt{constructor(t,e,n){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(t){qt(this,t)}}const te=gt.litHtmlPolyfillSupport;te?.(Wt,Vt),(gt.litHtmlVersions??=[]).push("3.2.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class ee extends wt{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,n)=>{const r=n?.renderBefore??e;let i=r._$litPart$;if(void 0===i){const t=n?.renderBefore??null;r._$litPart$=i=new Vt(e.insertBefore(At(),t),t,void 0,n??{})}return i._$AI(t),i})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return Lt}}ee._$litElement$=!0,ee.finalized=!0,globalThis.litElementHydrateSupport?.({LitElement:ee});const ne=globalThis.litElementPolyfillSupport;ne?.({LitElement:ee}),(globalThis.litElementVersions??=[]).push("4.1.1");customElements.define("navigation-menu",class extends ee{render(){return Bt`
      <nav>
        <a href="/">Employee List</a>
        
        <a href="/add">Add Employee</a>
      </nav>
    `}createRenderRoot(){return this}});var re=(()=>"function"==typeof Symbol&&Symbol.observable||"@@observable")(),ie=()=>Math.random().toString(36).substring(7).split("").join("."),oe={INIT:`@@redux/INIT${ie()}`,REPLACE:`@@redux/REPLACE${ie()}`,PROBE_UNKNOWN_ACTION:()=>`@@redux/PROBE_UNKNOWN_ACTION${ie()}`};function se(t){if("object"!=typeof t||null===t)return!1;let e=t;for(;null!==Object.getPrototypeOf(e);)e=Object.getPrototypeOf(e);return Object.getPrototypeOf(t)===e||null===Object.getPrototypeOf(t)}function ae(t){if(void 0===t)return"undefined";if(null===t)return"null";const e=typeof t;switch(e){case"boolean":case"string":case"number":case"symbol":case"function":return e}if(Array.isArray(t))return"array";if(function(t){return t instanceof Date||"function"==typeof t.toDateString&&"function"==typeof t.getDate&&"function"==typeof t.setDate}(t))return"date";if(function(t){return t instanceof Error||"string"==typeof t.message&&t.constructor&&"number"==typeof t.constructor.stackTraceLimit}(t))return"error";const n=function(t){return"function"==typeof t.constructor?t.constructor.name:null}(t);switch(n){case"Symbol":case"Promise":case"WeakMap":case"WeakSet":case"Map":case"Set":return n}return Object.prototype.toString.call(t).slice(8,-1).toLowerCase().replace(/\s/g,"")}function ce(t){let e=typeof t;return e=ae(t),e}function ue(t,e,n){if("function"!=typeof t)throw new Error(`Expected the root reducer to be a function. Instead, received: '${ce(t)}'`);if("function"==typeof e&&"function"==typeof n||"function"==typeof n&&"function"==typeof arguments[3])throw new Error("It looks like you are passing several store enhancers to createStore(). This is not supported. Instead, compose them together to a single function. See https://redux.js.org/tutorials/fundamentals/part-4-store#creating-a-store-with-enhancers for an example.");if("function"==typeof e&&void 0===n&&(n=e,e=void 0),void 0!==n){if("function"!=typeof n)throw new Error(`Expected the enhancer to be a function. Instead, received: '${ce(n)}'`);return n(ue)(t,e)}let r=t,i=e,o=new Map,s=o,a=0,c=!1;function u(){s===o&&(s=new Map,o.forEach(((t,e)=>{s.set(e,t)})))}function l(){if(c)throw new Error("You may not call store.getState() while the reducer is executing. The reducer has already received the state as an argument. Pass it down from the top reducer instead of reading it from the store.");return i}function d(t){if("function"!=typeof t)throw new Error(`Expected the listener to be a function. Instead, received: '${ce(t)}'`);if(c)throw new Error("You may not call store.subscribe() while the reducer is executing. If you would like to be notified after the store has been updated, subscribe from a component and invoke store.getState() in the callback to access the latest state. See https://redux.js.org/api/store#subscribelistener for more details.");let e=!0;u();const n=a++;return s.set(n,t),function(){if(e){if(c)throw new Error("You may not unsubscribe from a store listener while the reducer is executing. See https://redux.js.org/api/store#subscribelistener for more details.");e=!1,u(),s.delete(n),o=null}}}function h(t){if(!se(t))throw new Error(`Actions must be plain objects. Instead, the actual type was: '${ce(t)}'. You may need to add middleware to your store setup to handle dispatching other values, such as 'redux-thunk' to handle dispatching functions. See https://redux.js.org/tutorials/fundamentals/part-4-store#middleware and https://redux.js.org/tutorials/fundamentals/part-6-async-logic#using-the-redux-thunk-middleware for examples.`);if(void 0===t.type)throw new Error('Actions may not have an undefined "type" property. You may have misspelled an action type string constant.');if("string"!=typeof t.type)throw new Error(`Action "type" property must be a string. Instead, the actual type was: '${ce(t.type)}'. Value was: '${t.type}' (stringified)`);if(c)throw new Error("Reducers may not dispatch actions.");try{c=!0,i=r(i,t)}finally{c=!1}return(o=s).forEach((t=>{t()})),t}h({type:oe.INIT});return{dispatch:h,subscribe:d,getState:l,replaceReducer:function(t){if("function"!=typeof t)throw new Error(`Expected the nextReducer to be a function. Instead, received: '${ce(t)}`);r=t,h({type:oe.REPLACE})},[re]:function(){const t=d;return{subscribe(e){if("object"!=typeof e||null===e)throw new Error(`Expected the observer to be an object. Instead, received: '${ce(e)}'`);function n(){const t=e;t.next&&t.next(l())}n();return{unsubscribe:t(n)}},[re](){return this}}}}}function le(t){"undefined"!=typeof console&&"function"==typeof console.error&&console.error(t);try{throw new Error(t)}catch(t){}}function de(t){const e=Object.keys(t),n={};for(let r=0;r<e.length;r++){const i=e[r];void 0===t[i]&&le(`No reducer provided for key "${i}"`),"function"==typeof t[i]&&(n[i]=t[i])}const r=Object.keys(n);let i,o;i={};try{!function(t){Object.keys(t).forEach((e=>{const n=t[e];if(void 0===n(void 0,{type:oe.INIT}))throw new Error(`The slice reducer for key "${e}" returned undefined during initialization. If the state passed to the reducer is undefined, you must explicitly return the initial state. The initial state may not be undefined. If you don't want to set a value for this reducer, you can use null instead of undefined.`);if(void 0===n(void 0,{type:oe.PROBE_UNKNOWN_ACTION()}))throw new Error(`The slice reducer for key "${e}" returned undefined when probed with a random type. Don't try to handle '${oe.INIT}' or other actions in "redux/*" namespace. They are considered private. Instead, you must return the current state for any unknown actions, unless it is undefined, in which case you must return the initial state, regardless of the action type. The initial state may not be undefined, but can be null.`)}))}(n)}catch(t){o=t}return function(t={},e){if(o)throw o;{const r=function(t,e,n,r){const i=Object.keys(e),o=n&&n.type===oe.INIT?"preloadedState argument passed to createStore":"previous state received by the reducer";if(0===i.length)return"Store does not have a valid reducer. Make sure the argument passed to combineReducers is an object whose values are reducers.";if(!se(t))return`The ${o} has unexpected type of "${ce(t)}". Expected argument to be an object with the following keys: "${i.join('", "')}"`;const s=Object.keys(t).filter((t=>!e.hasOwnProperty(t)&&!r[t]));return s.forEach((t=>{r[t]=!0})),n&&n.type===oe.REPLACE?void 0:s.length>0?`Unexpected ${s.length>1?"keys":"key"} "${s.join('", "')}" found in ${o}. Expected to find one of the known reducer keys instead: "${i.join('", "')}". Unexpected keys will be ignored.`:void 0}(t,n,e,i);r&&le(r)}let s=!1;const a={};for(let i=0;i<r.length;i++){const o=r[i],c=n[o],u=t[o],l=c(u,e);if(void 0===l){const t=e&&e.type;throw new Error(`When called with an action of type ${t?`"${String(t)}"`:"(unknown type)"}, the slice reducer for key "${o}" returned undefined. To ignore an action, you must explicitly return the previous state. If you want this reducer to hold no value, you can return null instead of undefined.`)}a[o]=l,s=s||l!==u}return s=s||r.length!==Object.keys(t).length,s?a:t}}function he(...t){return 0===t.length?t=>t:1===t.length?t[0]:t.reduce(((t,e)=>(...n)=>t(e(...n))))}function fe(t){return se(t)&&"type"in t&&"string"==typeof t.type}var pe=Symbol.for("immer-nothing"),me=Symbol.for("immer-draftable"),ye=Symbol.for("immer-state"),be=[function(t){return`The plugin for '${t}' has not been loaded into Immer. To enable the plugin, import and call \`enable${t}()\` when initializing your application.`},function(t){return`produce can only be called on things that are draftable: plain objects, arrays, Map, Set or classes that are marked with '[immerable]: true'. Got '${t}'`},"This object has been frozen and should not be mutated",function(t){return"Cannot use a proxy that has been revoked. Did you pass an object from inside an immer function to an async process? "+t},"An immer producer returned a new value *and* modified its draft. Either return a new value *or* modify the draft.","Immer forbids circular references","The first or second argument to `produce` must be a function","The third argument to `produce` must be a function or undefined","First argument to `createDraft` must be a plain object, an array, or an immerable object","First argument to `finishDraft` must be a draft returned by `createDraft`",function(t){return`'current' expects a draft, got: ${t}`},"Object.defineProperty() cannot be used on an Immer draft","Object.setPrototypeOf() cannot be used on an Immer draft","Immer only supports deleting array indices","Immer only supports setting array indices and the 'length' property",function(t){return`'original' expects a draft, got: ${t}`}];function we(t,...e){{const n=be[t],r="function"==typeof n?n.apply(null,e):n;throw new Error(`[Immer] ${r}`)}}var ge=Object.getPrototypeOf;function ve(t){return!!t&&!!t[ye]}function xe(t){return!!t&&(Ee(t)||Array.isArray(t)||!!t[me]||!!t.constructor?.[me]||je(t)||Ne(t))}var $e=Object.prototype.constructor.toString();function Ee(t){if(!t||"object"!=typeof t)return!1;const e=ge(t);if(null===e)return!0;const n=Object.hasOwnProperty.call(e,"constructor")&&e.constructor;return n===Object||"function"==typeof n&&Function.toString.call(n)===$e}function Se(t,e){0===ke(t)?Reflect.ownKeys(t).forEach((n=>{e(n,t[n],t)})):t.forEach(((n,r)=>e(r,n,t)))}function ke(t){const e=t[ye];return e?e.type_:Array.isArray(t)?1:je(t)?2:Ne(t)?3:0}function Oe(t,e){return 2===ke(t)?t.has(e):Object.prototype.hasOwnProperty.call(t,e)}function Ae(t,e,n){const r=ke(t);2===r?t.set(e,n):3===r?t.add(n):t[e]=n}function je(t){return t instanceof Map}function Ne(t){return t instanceof Set}function Ce(t){return t.copy_||t.base_}function _e(t,e){if(je(t))return new Map(t);if(Ne(t))return new Set(t);if(Array.isArray(t))return Array.prototype.slice.call(t);const n=Ee(t);if(!0===e||"class_only"===e&&!n){const e=Object.getOwnPropertyDescriptors(t);delete e[ye];let n=Reflect.ownKeys(e);for(let r=0;r<n.length;r++){const i=n[r],o=e[i];!1===o.writable&&(o.writable=!0,o.configurable=!0),(o.get||o.set)&&(e[i]={configurable:!0,writable:!0,enumerable:o.enumerable,value:t[i]})}return Object.create(ge(t),e)}{const e=ge(t);if(null!==e&&n)return{...t};const r=Object.create(e);return Object.assign(r,t)}}function Te(t,e=!1){return Re(t)||ve(t)||!xe(t)||(ke(t)>1&&(t.set=t.add=t.clear=t.delete=Pe),Object.freeze(t),e&&Object.entries(t).forEach((([t,e])=>Te(e,!0)))),t}function Pe(){we(2)}function Re(t){return Object.isFrozen(t)}var Me,Ie={};function De(t){const e=Ie[t];return e||we(0,t),e}function Be(){return Me}function Le(t,e){e&&(De("Patches"),t.patches_=[],t.inversePatches_=[],t.patchListener_=e)}function ze(t){Ue(t),t.drafts_.forEach(Je),t.drafts_=null}function Ue(t){t===Me&&(Me=t.parent_)}function Fe(t){return Me={drafts_:[],parent_:Me,immer_:t,canAutoFreeze_:!0,unfinalizedDrafts_:0}}function Je(t){const e=t[ye];0===e.type_||1===e.type_?e.revoke_():e.revoked_=!0}function He(t,e){e.unfinalizedDrafts_=e.drafts_.length;const n=e.drafts_[0];return void 0!==t&&t!==n?(n[ye].modified_&&(ze(e),we(4)),xe(t)&&(t=We(e,t),e.parent_||Ye(e,t)),e.patches_&&De("Patches").generateReplacementPatches_(n[ye].base_,t,e.patches_,e.inversePatches_)):t=We(e,n,[]),ze(e),e.patches_&&e.patchListener_(e.patches_,e.inversePatches_),t!==pe?t:void 0}function We(t,e,n){if(Re(e))return e;const r=e[ye];if(!r)return Se(e,((i,o)=>qe(t,r,e,i,o,n))),e;if(r.scope_!==t)return e;if(!r.modified_)return Ye(t,r.base_,!0),r.base_;if(!r.finalized_){r.finalized_=!0,r.scope_.unfinalizedDrafts_--;const e=r.copy_;let i=e,o=!1;3===r.type_&&(i=new Set(e),e.clear(),o=!0),Se(i,((i,s)=>qe(t,r,e,i,s,n,o))),Ye(t,e,!1),n&&t.patches_&&De("Patches").generatePatches_(r,n,t.patches_,t.inversePatches_)}return r.copy_}function qe(t,e,n,r,i,o,s){if(i===n&&we(5),ve(i)){const s=We(t,i,o&&e&&3!==e.type_&&!Oe(e.assigned_,r)?o.concat(r):void 0);if(Ae(n,r,s),!ve(s))return;t.canAutoFreeze_=!1}else s&&n.add(i);if(xe(i)&&!Re(i)){if(!t.immer_.autoFreeze_&&t.unfinalizedDrafts_<1)return;We(t,i),e&&e.scope_.parent_||"symbol"==typeof r||!Object.prototype.propertyIsEnumerable.call(n,r)||Ye(t,i)}}function Ye(t,e,n=!1){!t.parent_&&t.immer_.autoFreeze_&&t.canAutoFreeze_&&Te(e,n)}var Ve={get(t,e){if(e===ye)return t;const n=Ce(t);if(!Oe(n,e))return function(t,e,n){const r=Ze(e,n);return r?"value"in r?r.value:r.get?.call(t.draft_):void 0}(t,n,e);const r=n[e];return t.finalized_||!xe(r)?r:r===Ge(t.base_,e)?(Xe(t),t.copy_[e]=tn(r,t)):r},has:(t,e)=>e in Ce(t),ownKeys:t=>Reflect.ownKeys(Ce(t)),set(t,e,n){const r=Ze(Ce(t),e);if(r?.set)return r.set.call(t.draft_,n),!0;if(!t.modified_){const r=Ge(Ce(t),e),i=r?.[ye];if(i&&i.base_===n)return t.copy_[e]=n,t.assigned_[e]=!1,!0;if(function(t,e){return t===e?0!==t||1/t==1/e:t!=t&&e!=e}(n,r)&&(void 0!==n||Oe(t.base_,e)))return!0;Xe(t),Qe(t)}return t.copy_[e]===n&&(void 0!==n||e in t.copy_)||Number.isNaN(n)&&Number.isNaN(t.copy_[e])||(t.copy_[e]=n,t.assigned_[e]=!0),!0},deleteProperty:(t,e)=>(void 0!==Ge(t.base_,e)||e in t.base_?(t.assigned_[e]=!1,Xe(t),Qe(t)):delete t.assigned_[e],t.copy_&&delete t.copy_[e],!0),getOwnPropertyDescriptor(t,e){const n=Ce(t),r=Reflect.getOwnPropertyDescriptor(n,e);return r?{writable:!0,configurable:1!==t.type_||"length"!==e,enumerable:r.enumerable,value:n[e]}:r},defineProperty(){we(11)},getPrototypeOf:t=>ge(t.base_),setPrototypeOf(){we(12)}},Ke={};function Ge(t,e){const n=t[ye];return(n?Ce(n):t)[e]}function Ze(t,e){if(!(e in t))return;let n=ge(t);for(;n;){const t=Object.getOwnPropertyDescriptor(n,e);if(t)return t;n=ge(n)}}function Qe(t){t.modified_||(t.modified_=!0,t.parent_&&Qe(t.parent_))}function Xe(t){t.copy_||(t.copy_=_e(t.base_,t.scope_.immer_.useStrictShallowCopy_))}Se(Ve,((t,e)=>{Ke[t]=function(){return arguments[0]=arguments[0][0],e.apply(this,arguments)}})),Ke.deleteProperty=function(t,e){return isNaN(parseInt(e))&&we(13),Ke.set.call(this,t,e,void 0)},Ke.set=function(t,e,n){return"length"!==e&&isNaN(parseInt(e))&&we(14),Ve.set.call(this,t[0],e,n,t[0])};function tn(t,e){const n=je(t)?De("MapSet").proxyMap_(t,e):Ne(t)?De("MapSet").proxySet_(t,e):function(t,e){const n=Array.isArray(t),r={type_:n?1:0,scope_:e?e.scope_:Be(),modified_:!1,finalized_:!1,assigned_:{},parent_:e,base_:t,draft_:null,copy_:null,revoke_:null,isManual_:!1};let i=r,o=Ve;n&&(i=[r],o=Ke);const{revoke:s,proxy:a}=Proxy.revocable(i,o);return r.draft_=a,r.revoke_=s,a}(t,e);return(e?e.scope_:Be()).drafts_.push(n),n}function en(t){if(!xe(t)||Re(t))return t;const e=t[ye];let n;if(e){if(!e.modified_)return e.base_;e.finalized_=!0,n=_e(t,e.scope_.immer_.useStrictShallowCopy_)}else n=_e(t,!0);return Se(n,((t,e)=>{Ae(n,t,en(e))})),e&&(e.finalized_=!1),n}var nn=new class{constructor(t){this.autoFreeze_=!0,this.useStrictShallowCopy_=!1,this.produce=(t,e,n)=>{if("function"==typeof t&&"function"!=typeof e){const n=e;e=t;const r=this;return function(t=n,...i){return r.produce(t,(t=>e.call(this,t,...i)))}}let r;if("function"!=typeof e&&we(6),void 0!==n&&"function"!=typeof n&&we(7),xe(t)){const i=Fe(this),o=tn(t,void 0);let s=!0;try{r=e(o),s=!1}finally{s?ze(i):Ue(i)}return Le(i,n),He(r,i)}if(!t||"object"!=typeof t){if(r=e(t),void 0===r&&(r=t),r===pe&&(r=void 0),this.autoFreeze_&&Te(r,!0),n){const e=[],i=[];De("Patches").generateReplacementPatches_(t,r,e,i),n(e,i)}return r}we(1,t)},this.produceWithPatches=(t,e)=>{if("function"==typeof t)return(e,...n)=>this.produceWithPatches(e,(e=>t(e,...n)));let n,r;const i=this.produce(t,e,((t,e)=>{n=t,r=e}));return[i,n,r]},"boolean"==typeof t?.autoFreeze&&this.setAutoFreeze(t.autoFreeze),"boolean"==typeof t?.useStrictShallowCopy&&this.setUseStrictShallowCopy(t.useStrictShallowCopy)}createDraft(t){xe(t)||we(8),ve(t)&&(t=function(t){ve(t)||we(10,t);return en(t)}(t));const e=Fe(this),n=tn(t,void 0);return n[ye].isManual_=!0,Ue(e),n}finishDraft(t,e){const n=t&&t[ye];n&&n.isManual_||we(9);const{scope_:r}=n;return Le(r,e),He(void 0,r)}setAutoFreeze(t){this.autoFreeze_=t}setUseStrictShallowCopy(t){this.useStrictShallowCopy_=t}applyPatches(t,e){let n;for(n=e.length-1;n>=0;n--){const r=e[n];if(0===r.path.length&&"replace"===r.op){t=r.value;break}}n>-1&&(e=e.slice(n+1));const r=De("Patches").applyPatches_;return ve(t)?r(t,e):this.produce(t,(t=>r(t,e)))}},rn=nn.produce;function on(t){return({dispatch:e,getState:n})=>r=>i=>"function"==typeof i?i(e,n,t):r(i)}nn.produceWithPatches.bind(nn),nn.setAutoFreeze.bind(nn),nn.setUseStrictShallowCopy.bind(nn),nn.applyPatches.bind(nn),nn.createDraft.bind(nn),nn.finishDraft.bind(nn);var sn=on(),an=on,cn="undefined"!=typeof window&&window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__:function(){if(0!==arguments.length)return"object"==typeof arguments[0]?he:he.apply(null,arguments)};function un(t,e){function n(...n){if(e){let r=e(...n);if(!r)throw new Error("prepareAction did not return an object");return{type:t,payload:r.payload,..."meta"in r&&{meta:r.meta},..."error"in r&&{error:r.error}}}return{type:t,payload:n[0]}}return n.toString=()=>`${t}`,n.type=t,n.match=e=>fe(e)&&e.type===t,n}function ln(t){return"function"==typeof t&&"type"in t&&(t=>t&&"function"==typeof t.match)(t)}function dn(t,e){let n=0;return{measureTime(t){const e=Date.now();try{return t()}finally{const t=Date.now();n+=t-e}},warnIfExceeded(){n>t&&console.warn(`${e} took ${n}ms, which is more than the warning threshold of ${t}ms. \nIf your state or actions are very large, you may want to disable the middleware as it might cause too much of a slowdown in development mode. See https://redux-toolkit.js.org/api/getDefaultMiddleware for instructions.\nIt is disabled in production builds, so you don't need to worry about that.`)}}}var hn=class t extends Array{constructor(...e){super(...e),Object.setPrototypeOf(this,t.prototype)}static get[Symbol.species](){return t}concat(...t){return super.concat.apply(this,t)}prepend(...e){return 1===e.length&&Array.isArray(e[0])?new t(...e[0].concat(this)):new t(...e.concat(this))}};function fn(t){return xe(t)?rn(t,(()=>{})):t}function pn(t,e,n){return t.has(e)?t.get(e):t.set(e,n(e)).get(e)}function mn(t){return"object"!=typeof t||null==t||Object.isFrozen(t)}function yn(t,e,n){const r=bn(t,e,n);return{detectMutations:()=>wn(t,e,r,n)}}function bn(t,e=[],n,r="",i=new Set){const o={value:n};if(!t(n)&&!i.has(n)){i.add(n),o.children={};for(const i in n){const s=r?r+"."+i:i;e.length&&-1!==e.indexOf(s)||(o.children[i]=bn(t,e,n[i],s))}}return o}function wn(t,e=[],n,r,i=!1,o=""){const s=n?n.value:void 0,a=s===r;if(i&&!a&&!Number.isNaN(r))return{wasMutated:!0,path:o};if(t(s)||t(r))return{wasMutated:!1};const c={};for(let t in n.children)c[t]=!0;for(let t in r)c[t]=!0;const u=e.length>0;for(let i in c){const s=o?o+"."+i:i;if(u){if(e.some((t=>t instanceof RegExp?t.test(s):s===t)))continue}const c=wn(t,e,n.children[i],r[i],a,s);if(c.wasMutated)return c}return{wasMutated:!1}}function gn(t){const e=typeof t;return null==t||"string"===e||"boolean"===e||"number"===e||Array.isArray(t)||se(t)}function vn(t,e="",n=gn,r,i=[],o){let s;if(!n(t))return{keyPath:e||"<root>",value:t};if("object"!=typeof t||null===t)return!1;if(o?.has(t))return!1;const a=null!=r?r(t):Object.entries(t),c=i.length>0;for(const[t,u]of a){const a=e?e+"."+t:t;if(c){if(i.some((t=>t instanceof RegExp?t.test(a):a===t)))continue}if(!n(u))return{keyPath:a,value:u};if("object"==typeof u&&(s=vn(u,a,n,r,i,o),s))return s}return o&&xn(t)&&o.add(t),!1}function xn(t){if(!Object.isFrozen(t))return!1;for(const e of Object.values(t))if("object"==typeof e&&null!==e&&!xn(e))return!1;return!0}function $n(t){return"boolean"==typeof t}var En=()=>function(t){const{thunk:e=!0,immutableCheck:n=!0,serializableCheck:r=!0,actionCreatorCheck:i=!0}=t??{};let o=new hn;if(e&&($n(e)?o.push(sn):o.push(an(e.extraArgument))),n){let t={};$n(n)||(t=n),o.unshift(function(t={}){{let e=function(t,e,r,i){return JSON.stringify(t,n(e,i),r)},n=function(t,e){let n=[],r=[];return e||(e=function(t,e){return n[0]===e?"[Circular ~]":"[Circular ~."+r.slice(0,n.indexOf(e)).join(".")+"]"}),function(i,o){if(n.length>0){var s=n.indexOf(this);~s?n.splice(s+1):n.push(this),~s?r.splice(s,1/0,i):r.push(i),~n.indexOf(o)&&(o=e.call(this,i,o))}else n.push(o);return null==t?o:t.call(this,i,o)}},{isImmutable:r=mn,ignoredPaths:i,warnAfter:o=32}=t;const s=yn.bind(null,r,i);return({getState:t})=>{let n,r=t(),i=s(r);return a=>c=>{const u=dn(o,"ImmutableStateInvariantMiddleware");u.measureTime((()=>{if(r=t(),n=i.detectMutations(),i=s(r),n.wasMutated)throw new Error(`A state mutation was detected between dispatches, in the path '${n.path||""}'.  This may cause incorrect behavior. (https://redux.js.org/style-guide/style-guide#do-not-mutate-state)`)}));const l=a(c);return u.measureTime((()=>{if(r=t(),n=i.detectMutations(),i=s(r),n.wasMutated)throw new Error(`A state mutation was detected inside a dispatch, in the path: ${n.path||""}. Take a look at the reducer(s) handling the action ${e(c)}. (https://redux.js.org/style-guide/style-guide#do-not-mutate-state)`)})),u.warnIfExceeded(),l}}}}(t))}if(r){let t={};$n(r)||(t=r),o.push(function(t={}){{const{isSerializable:e=gn,getEntries:n,ignoredActions:r=[],ignoredActionPaths:i=["meta.arg","meta.baseQueryMeta"],ignoredPaths:o=[],warnAfter:s=32,ignoreState:a=!1,ignoreActions:c=!1,disableCache:u=!1}=t,l=!u&&WeakSet?new WeakSet:void 0;return t=>u=>d=>{if(!fe(d))return u(d);const h=u(d),f=dn(s,"SerializableStateInvariantMiddleware");return c||r.length&&-1!==r.indexOf(d.type)||f.measureTime((()=>{const t=vn(d,"",e,n,i,l);if(t){const{keyPath:e,value:n}=t;console.error(`A non-serializable value was detected in an action, in the path: \`${e}\`. Value:`,n,"\nTake a look at the logic that dispatched this action: ",d,"\n(See https://redux.js.org/faq/actions#why-should-type-be-a-string-or-at-least-serializable-why-should-my-action-types-be-constants)","\n(To allow non-serializable values see: https://redux-toolkit.js.org/usage/usage-guide#working-with-non-serializable-data)")}})),a||(f.measureTime((()=>{const r=vn(t.getState(),"",e,n,o,l);if(r){const{keyPath:t,value:e}=r;console.error(`A non-serializable value was detected in the state, in the path: \`${t}\`. Value:`,e,`\nTake a look at the reducer(s) handling this action type: ${d.type}.\n(See https://redux.js.org/faq/organizing-state#can-i-put-functions-promises-or-other-non-serializable-items-in-my-store-state)`)}})),f.warnIfExceeded()),h}}}(t))}if(i){let t={};$n(i)||(t=i),o.unshift(function(t={}){const{isActionCreator:e=ln}=t;return()=>t=>n=>(e(n)&&console.warn(function(t){const e=t?`${t}`.split("/"):[],n=e[e.length-1]||"actionCreator";return`Detected an action creator with type "${t||"unknown"}" being dispatched. \nMake sure you're calling the action creator before dispatching, i.e. \`dispatch(${n}())\` instead of \`dispatch(${n})\`. This is necessary even if the action has no payload.`}(n.type)),t(n))}(t))}return o},Sn=t=>e=>{setTimeout(e,t)},kn=t=>function(e){const{autoBatch:n=!0}=e??{};let r=new hn(t);return n&&r.push(((t={type:"raf"})=>e=>(...n)=>{const r=e(...n);let i=!0,o=!1,s=!1;const a=new Set,c="tick"===t.type?queueMicrotask:"raf"===t.type?"undefined"!=typeof window&&window.requestAnimationFrame?window.requestAnimationFrame:Sn(10):"callback"===t.type?t.queueNotification:Sn(t.timeout),u=()=>{s=!1,o&&(o=!1,a.forEach((t=>t())))};return Object.assign({},r,{subscribe(t){const e=r.subscribe((()=>i&&t()));return a.add(t),()=>{e(),a.delete(t)}},dispatch(t){try{return i=!t?.meta?.RTK_autoBatch,o=!i,o&&(s||(s=!0,c(u))),r.dispatch(t)}finally{i=!0}}})})("object"==typeof n?n:void 0)),r};function On(t){const e={},n=[];let r;const i={addCase(t,o){if(n.length>0)throw new Error("`builder.addCase` should only be called before calling `builder.addMatcher`");if(r)throw new Error("`builder.addCase` should only be called before calling `builder.addDefaultCase`");const s="string"==typeof t?t:t.type;if(!s)throw new Error("`builder.addCase` cannot be called with an empty action type");if(s in e)throw new Error(`\`builder.addCase\` cannot be called with two reducers for the same action type '${s}'`);return e[s]=o,i},addMatcher(t,e){if(r)throw new Error("`builder.addMatcher` should only be called before calling `builder.addDefaultCase`");return n.push({matcher:t,reducer:e}),i},addDefaultCase(t){if(r)throw new Error("`builder.addDefaultCase` can only be called once");return r=t,i}};return t(i),[e,n,r]}var An=Symbol.for("rtk-slice-createasyncthunk");function jn(t,e){return`${t}/${e}`}function Nn({creators:t}={}){const e=t?.asyncThunk?.[An];return function(t){const{name:n,reducerPath:r=n}=t;if(!n)throw new Error("`name` is a required option for createSlice");"undefined"!=typeof process&&void 0===t.initialState&&console.error("You must provide an `initialState` value that is not `undefined`. You may have misspelled `initialState`");const i=("function"==typeof t.reducers?t.reducers(function(){function t(t,e){return{_reducerDefinitionType:"asyncThunk",payloadCreator:t,...e}}return t.withTypes=()=>t,{reducer:t=>Object.assign({[t.name]:(...e)=>t(...e)}[t.name],{_reducerDefinitionType:"reducer"}),preparedReducer:(t,e)=>({_reducerDefinitionType:"reducerWithPrepare",prepare:t,reducer:e}),asyncThunk:t}}()):t.reducers)||{},o=Object.keys(i),s={sliceCaseReducersByName:{},sliceCaseReducersByType:{},actionCreators:{},sliceMatchers:[]},a={addCase(t,e){const n="string"==typeof t?t:t.type;if(!n)throw new Error("`context.addCase` cannot be called with an empty action type");if(n in s.sliceCaseReducersByType)throw new Error("`context.addCase` cannot be called with two reducers for the same action type: "+n);return s.sliceCaseReducersByType[n]=e,a},addMatcher:(t,e)=>(s.sliceMatchers.push({matcher:t,reducer:e}),a),exposeAction:(t,e)=>(s.actionCreators[t]=e,a),exposeCaseReducer:(t,e)=>(s.sliceCaseReducersByName[t]=e,a)};function c(){if("object"==typeof t.extraReducers)throw new Error("The object notation for `createSlice.extraReducers` has been removed. Please use the 'builder callback' notation instead: https://redux-toolkit.js.org/api/createSlice");const[e={},n=[],r]="function"==typeof t.extraReducers?On(t.extraReducers):[t.extraReducers],i={...e,...s.sliceCaseReducersByType};return function(t,e){if("object"==typeof e)throw new Error("The object notation for `createReducer` has been removed. Please use the 'builder callback' notation instead: https://redux-toolkit.js.org/api/createReducer");let n,[r,i,o]=On(e);if(function(t){return"function"==typeof t}(t))n=()=>fn(t());else{const e=fn(t);n=()=>e}function s(t=n(),e){let s=[r[e.type],...i.filter((({matcher:t})=>t(e))).map((({reducer:t})=>t))];return 0===s.filter((t=>!!t)).length&&(s=[o]),s.reduce(((t,n)=>{if(n){if(ve(t)){const r=n(t,e);return void 0===r?t:r}if(xe(t))return rn(t,(t=>n(t,e)));{const r=n(t,e);if(void 0===r){if(null===t)return t;throw Error("A case reducer on a non-draftable value must not return undefined")}return r}}return t}),t)}return s.getInitialState=n,s}(t.initialState,(t=>{for(let e in i)t.addCase(e,i[e]);for(let e of s.sliceMatchers)t.addMatcher(e.matcher,e.reducer);for(let e of n)t.addMatcher(e.matcher,e.reducer);r&&t.addDefaultCase(r)}))}o.forEach((r=>{const o=i[r],s={reducerName:r,type:jn(n,r),createNotation:"function"==typeof t.reducers};!function(t){return"asyncThunk"===t._reducerDefinitionType}(o)?function({type:t,reducerName:e,createNotation:n},r,i){let o,s;if("reducer"in r){if(n&&!function(t){return"reducerWithPrepare"===t._reducerDefinitionType}(r))throw new Error("Please use the `create.preparedReducer` notation for prepared action creators with the `create` notation.");o=r.reducer,s=r.prepare}else o=r;i.addCase(t,o).exposeCaseReducer(e,o).exposeAction(e,s?un(t,s):un(t))}(s,o,a):function({type:t,reducerName:e},n,r,i){if(!i)throw new Error("Cannot use `create.asyncThunk` in the built-in `createSlice`. Use `buildCreateSlice({ creators: { asyncThunk: asyncThunkCreator } })` to create a customised version of `createSlice`.");const{payloadCreator:o,fulfilled:s,pending:a,rejected:c,settled:u,options:l}=n,d=i(t,o,l);r.exposeAction(e,d),s&&r.addCase(d.fulfilled,s);a&&r.addCase(d.pending,a);c&&r.addCase(d.rejected,c);u&&r.addMatcher(d.settled,u);r.exposeCaseReducer(e,{fulfilled:s||_n,pending:a||_n,rejected:c||_n,settled:u||_n})}(s,o,a,e)}));const u=t=>t,l=new Map;let d;function h(t,e){return d||(d=c()),d(t,e)}function f(){return d||(d=c()),d.getInitialState()}function p(e,n=!1){function r(t){let r=t[e];if(void 0===r){if(!n)throw new Error("selectSlice returned undefined for an uninjected slice reducer");r=f()}return r}function i(e=u){const r=pn(l,n,(()=>new WeakMap));return pn(r,e,(()=>{const r={};for(const[i,o]of Object.entries(t.selectors??{}))r[i]=Cn(o,e,f,n);return r}))}return{reducerPath:e,getSelectors:i,get selectors(){return i(r)},selectSlice:r}}const m={name:n,reducer:h,actions:s.actionCreators,caseReducers:s.sliceCaseReducersByName,getInitialState:f,...p(r),injectInto(t,{reducerPath:e,...n}={}){const i=e??r;return t.inject({reducerPath:i,reducer:h},n),{...m,...p(i,!0)}}};return m}}function Cn(t,e,n,r){function i(i,...o){let s=e(i);if(void 0===s){if(!r)throw new Error("selectState returned undefined for an uninjected slice reducer");s=n()}return t(s,...o)}return i.unwrapped=t,i}function _n(){}const Tn=Nn()({name:"employees",initialState:JSON.parse(localStorage.getItem("employees"))||[{id:"1",firstName:"Ahmet",lastName:"Sourtimes",dateOfEmployment:"22/02/2022",dateOfBirth:"22/03/1990",phoneNumber:"+90 532 123 45 45",email:"ahmet@sourtimes.org",department:"Analytics",position:"Junior"},{id:"2",firstName:"Ahmet",lastName:"Sourtimes",dateOfEmployment:"22/02/2022",dateOfBirth:"22/03/1990",phoneNumber:"+90 532 123 45 45",email:"ahmet@sourtimes.org",department:"Analytics",position:"Junior"},{id:"3",firstName:"Ahmet",lastName:"Sourtimes",dateOfEmployment:"22/02/2022",dateOfBirth:"22/03/1990",phoneNumber:"+90 532 123 45 45",email:"ahmet@sourtimes.org",department:"Analytics",position:"Junior"},{id:"4",firstName:"Ahmet",lastName:"Sourtimes",dateOfEmployment:"22/02/2022",dateOfBirth:"22/03/1990",phoneNumber:"+90 532 123 45 45",email:"ahmet@sourtimes.org",department:"Analytics",position:"Junior"},{id:"5",firstName:"Ahmet",lastName:"Sourtimes",dateOfEmployment:"22/02/2022",dateOfBirth:"22/03/1990",phoneNumber:"+90 532 123 45 45",email:"ahmet@sourtimes.org",department:"Analytics",position:"Junior"},{id:"6",firstName:"Ahmet",lastName:"Sourtimes",dateOfEmployment:"22/02/2022",dateOfBirth:"22/03/1990",phoneNumber:"+90 532 123 45 45",email:"ahmet@sourtimes.org",department:"Analytics",position:"Junior"},{id:"7",firstName:"Ahmet",lastName:"Sourtimes",dateOfEmployment:"22/02/2022",dateOfBirth:"22/03/1990",phoneNumber:"+90 532 123 45 45",email:"ahmet@sourtimes.org",department:"Analytics",position:"Junior"},{id:"8",firstName:"Ahmet",lastName:"Sourtimes",dateOfEmployment:"22/02/2022",dateOfBirth:"22/03/1990",phoneNumber:"+90 532 123 45 45",email:"ahmet@sourtimes.org",department:"Analytics",position:"Junior"}],reducers:{addEmployee:(t,e)=>{const n={...e.payload,id:Date.now().toString()};t.push(n),localStorage.setItem("employees",JSON.stringify(t))},updateEmployee:(t,e)=>{const n=t.findIndex((t=>t.id===e.payload.id));-1!==n&&(t[n]=e.payload,localStorage.setItem("employees",JSON.stringify(t)))},deleteEmployee:(t,e)=>{const n=t.filter((t=>t.id!==e.payload));return localStorage.setItem("employees",JSON.stringify(n)),n}}}),{addEmployee:Pn,updateEmployee:Rn,deleteEmployee:Mn}=Tn.actions,In=function(t){const e=En(),{reducer:n,middleware:r,devTools:i=!0,preloadedState:o,enhancers:s}=t||{};let a,c;if("function"==typeof n)a=n;else{if(!se(n))throw new Error("`reducer` is a required argument, and must be a function or an object of functions that can be passed to combineReducers");a=de(n)}if(r&&"function"!=typeof r)throw new Error("`middleware` field must be a callback");if("function"==typeof r){if(c=r(e),!Array.isArray(c))throw new Error("when using a middleware builder function, an array of middleware must be returned")}else c=e();if(c.some((t=>"function"!=typeof t)))throw new Error("each middleware provided to configureStore must be a function");let u=he;i&&(u=cn({trace:!0,..."object"==typeof i&&i}));const l=function(...t){return e=>(n,r)=>{const i=e(n,r);let o=()=>{throw new Error("Dispatching while constructing your middleware is not allowed. Other middleware would not be applied to this dispatch.")};const s={getState:i.getState,dispatch:(t,...e)=>o(t,...e)},a=t.map((t=>t(s)));return o=he(...a)(i.dispatch),{...i,dispatch:o}}}(...c),d=kn(l);if(s&&"function"!=typeof s)throw new Error("`enhancers` field must be a callback");let h="function"==typeof s?s(d):d();if(!Array.isArray(h))throw new Error("`enhancers` callback must return an array");if(h.some((t=>"function"!=typeof t)))throw new Error("each enhancer provided to configureStore must be a function");return c.length&&!h.includes(l)&&console.error("middlewares were provided, but middleware enhancer was not included in final enhancers - make sure to call `getDefaultEnhancers`"),ue(a,o,u(...h))}({reducer:Tn.reducer}),Dn={en:{employeesLabel:"Employees",addNewButton:"Add New",employeeListHeader:"Employee List",firstName:"First Name",lastName:"Last Name",dateOfEmployment:"Date of Employment",dateOfBirth:"Date of Birth",phone:"Phone",email:"Email",department:"Department",position:"Position",actions:"Actions",emailLabel:"Email:",departmentLabel:"Department:",positionLabel:"Position:",editButton:"Edit",deleteButton:"Delete",addNewEmployee:"Add New Employee",updateEmployee:"Update Employee",saveButton:"Save",cancelButton:"Cancel",departmentOptions:{analytics:"Analytics",tech:"Tech"},positionOptions:{junior:"Junior",medior:"Mid Level",senior:"Senior"},yesButton:"Yes",noButton:"No",deleteConfirmation:"Are you sure you want to delete this employee?"},tr:{employeesLabel:"Personeller",addNewButton:"Yeni Ekle",employeeListHeader:"Personel Listesi",firstName:"Ad",lastName:"Soyad",dateOfEmployment:"İşe Alım Tarihi",dateOfBirth:"Doğum Tarihi",phone:"Telefon",email:"E-posta",department:"Departman",position:"Pozisyon",actions:"İşlemler",emailLabel:"E-posta:",departmentLabel:"Departman:",positionLabel:"Pozisyon:",editButton:"Düzenle",deleteButton:"Sil",addNewEmployee:"Yeni Personel Ekle",updateEmployee:"Personel Güncelle",saveButton:"Kaydet",cancelButton:"İptal",departmentOptions:{analytics:"Analitik",tech:"Teknoloji"},positionOptions:{junior:"Junior",medior:"Mid Level",senior:"Senior"},yesButton:"Evet",noButton:"Hayır",deleteConfirmation:"Bu personeli silmek istediğinize emin misiniz?"}},Bn=t=>{const e=document.documentElement.lang||"en";return t.split(".").reduce(((t,e)=>(t||{})[e]),Dn[e])||t};class Ln extends ee{static properties={employee:{type:Object},isEditing:{type:Boolean}};static styles=nt`
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
  `;constructor(){super(),this._resetEmployee(),this.isEditing=!1}connectedCallback(){super.connectedCallback(),this.employee?.id?this.isEditing=!0:this._resetEmployee()}render(){return Bt`
      <div class="modal">
        <h2>${this.isEditing?Bn("updateEmployee"):Bn("addNewEmployee")}</h2>
        <form @submit=${this._handleSubmit}>
          <div class="form-group">

            <label>${Bn("firstName")}</label>
            <input type="text" .value=${this.employee.firstName} @input=${t=>this._updateField(t,"firstName")} required />
          </div>
          <div class="form-group">
            <label>${Bn("lastName")}</label>
            <input type="text" .value=${this.employee.lastName} @input=${t=>this._updateField(t,"lastName")} required />
          </div>
          <div class="form-group">
            <label>${Bn("dateOfEmployment")}</label>
            <input type="date" .value=${this.employee.dateOfEmployment} @input=${t=>this._updateField(t,"dateOfEmployment")} required />
          </div>
          <div class="form-group">
            <label>${Bn("dateOfBirth")}</label>
            <input type="date" .value=${this.employee.dateOfBirth} @input=${t=>this._updateField(t,"dateOfBirth")} required />
          </div>
          <div class="form-group">
            <label>${Bn("phone")}</label>
            <input type="tel" .value=${this.employee.phone} @input=${t=>this._updateField(t,"phone")} required />
          </div>
          <div class="form-group">
            <label>${Bn("email")}</label>
            <input type="email" .value=${this.employee.email} @input=${t=>this._updateField(t,"email")} required />
          </div>
          <div class="form-group">
            <label>${Bn("department")}</label>
            <select @change=${t=>this._updateField(t,"department")}>
              <option value="Analytics" ?selected=${"Analytics"===this.employee.department}>
                ${Bn("departmentOptions.analytics")}
              </option>
              <option value="Tech" ?selected=${"Tech"===this.employee.department}>
                ${Bn("departmentOptions.tech")}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label>${Bn("position")}</label>
            <select @change=${t=>this._updateField(t,"position")}>
              <option value="Junior" ?selected=${"Junior"===this.employee.position}>
                ${Bn("positionOptions.junior")}
              </option>
              <option value="Medior" ?selected=${"Mid Level"===this.employee.position}>
                ${Bn("positionOptions.medior")}
              </option>
              <option value="Senior" ?selected=${"Senior"===this.employee.position}>
                ${Bn("positionOptions.senior")}
              </option>
            </select>
          </div>

          <div class="buttons">
            <button type="submit" class="save">${Bn((this.isEditing,"saveButton"))}</button>
            <button type="button" class="cancel" @click=${this._closeForm}>${Bn("cancelButton")}</button>
          </div>
        </form>
      </div>
    `}_updateField(t,e){this.employee={...this.employee,[e]:t.target.value}}_handleSubmit(t){t.preventDefault(),this.isEditing?In.dispatch(Rn(this.employee)):In.dispatch(Pn({...this.employee,id:Date.now().toString()})),this.dispatchEvent(new Event("close",{bubbles:!0,composed:!0}))}_closeForm(){this.dispatchEvent(new Event("close",{bubbles:!0,composed:!0}))}_resetEmployee(){this.employee={id:null,firstName:"",lastName:"",dateOfEmployment:"",dateOfBirth:"",phone:"",email:"",department:"Development",position:"Junior"}}}customElements.define("employee-form",Ln);class zn extends ee{static properties={isOpen:{type:Boolean},message:{type:String},resolvePromise:{state:!0}};static styles=nt`
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
  `;constructor(){super(),this.isOpen=!1}open(t){return this.message=t,this.isOpen=!0,new Promise((t=>{this.resolvePromise=t}))}close(t){this.isOpen=!1,this.resolvePromise(t)}render(){return this.isOpen?Bt`
      <div class="overlay">
        <div class="popup">
          <h2>${Bn("deleteConfirmation")}</h2>
          <div class="buttons">
            <button class="confirm" @click=${()=>this.close(!0)}>${Bn("yesButton")}</button>
            <button class="cancel" @click=${()=>this.close(!1)}>${Bn("noButton")}</button>
          </div>
        </div>
      </div>
    `:Bt``}}customElements.define("confirm-dialog",zn);class Un extends ee{static properties={employees:{state:!0},searchTerm:{state:!0},viewMode:{state:!0},currentPage:{state:!0},selectedEmployee:{state:!0},isFormOpen:{state:!0},lang:{state:!0}};static styles=nt`


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
  `;constructor(){super(),this.showLanguageDropdown=!1,this.lang=document.documentElement.lang||"en",this.employees=In.getState(),this.searchTerm="",this.viewMode="table",this.currentPage=1,this.selectedEmployee=null,this.isFormOpen=!1,this.unsubscribe=In.subscribe((()=>{this.employees=In.getState()}))}disconnectedCallback(){super.disconnectedCallback(),this.unsubscribe()}render(){const t=this._filterEmployees(),e=this._paginate(t);return Bt`
        <div class="navbar">
          <div class="left">ING</div>
          <div class="right">
            <span><span class="material-icons">person</span> ${Bn("employeesLabel")}</span>
            <span @click=${this._openAddForm}><span class="material-icons">add</span> ${Bn("addNewButton")}</span>
            
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
          <div>${Bn("employeeListHeader")}</div>
          <div class="icons">
            <span class="material-icons" @click=${this._setTableView}>view_list</span>
            <span class="material-icons" @click=${this._setListView}>grid_view</span>
          </div>
        </div>

  

        ${"table"===this.viewMode?this._renderTableView(e):this._renderListView(e)}

        ${this._renderPagination(t.length)}

        ${this.isFormOpen?Bt`<employee-form .employee=${this.selectedEmployee} @close=${this._closeForm}></employee-form>`:""}
        <confirm-dialog></confirm-dialog>
        
      `}_renderTableView(t){return Bt`
        <table>
          <tr>
            <th><input type="checkbox" /></th>
            <th>${Bn("firstName")}</th>
            <th>${Bn("lastName")}</th>
            <th>${Bn("dateOfEmployment")}</th>
            <th>${Bn("dateOfBirth")}</th>
            <th>${Bn("phone")}</th>
            <th>${Bn("email")}</th>
            <th>${Bn("department")}</th>
            <th>${Bn("position")}</th>
            <th>${Bn("actions")}</th>
          </tr>
          ${t.map((t=>Bt`
            <tr>
              <td><input type="checkbox" /></td>
              <td>${t.firstName}</td>
              <td>${t.lastName}</td>
              <td>${t.dateOfEmployment}</td>
              <td>${t.dateOfBirth}</td>
              <td>${t.phone}</td>
              <td>${t.email}</td>
              <td>${t.department}</td>
              <td>${t.position}</td>
              <td class="actions">
                <button @click=${()=>this._openEditForm(t)}>
                  <span class="material-icons">edit</span>
                </button>
                <button @click=${()=>this._confirmDelete(t.id)}>
                  <span class="material-icons">delete</span>
                </button>
              </td>
            </tr>
          `))}
        </table>
      `}_renderListView(t){return Bt`
        <div class="list-view">
          ${t.map((t=>Bt`
            <div class="list-item">
              <h3>${t.firstName} ${t.lastName}</h3>
              <p><strong>${Bn("emailLabel")}</strong> ${t.email}</p>
              <p><strong>${Bn("departmentLabel")}</strong> ${t.department}</p>
              <p><strong>${Bn("positionLabel")}</strong> ${t.position}</p>
              <div class="actions">
                <button @click=${()=>this._openEditForm(t)}>
                  <span class="material-icons">edit</span>
                </button>
                <button @click=${()=>this._confirmDelete(t.id)}>
                  <span class="material-icons">delete</span>
                </button>
              </div>
            </div>
          `))}
        </div>
      `}_renderPagination(t){const e=Math.ceil(t/5);return Bt`
        <div class="pagination">
          ${Array.from({length:e},((t,e)=>Bt`
            <button class="${this.currentPage===e+1?"active":""}" 
              @click=${()=>this._changePage(e+1)}>
              ${e+1}
            </button>
          `))}
        </div>
      `}_paginate(t){const e=7*(this.currentPage-1);return t.slice(e,e+7)}_changePage(t){t>0&&(this.currentPage=t,this.requestUpdate())}_filterEmployees(){return this.employees}_toggleLanguageDropdown(){this.showLanguageDropdown=!this.showLanguageDropdown}_changeLanguage(t){document.documentElement.lang=t,this.lang=t,this.showLanguageDropdown=!1,this.requestUpdate()}_openAddForm(){this.selectedEmployee=null,this.isFormOpen=!0}_openEditForm(t){this.selectedEmployee={...t},this.isFormOpen=!0}_closeForm(){this.isFormOpen=!1}_setTableView(){this.viewMode="table",this.requestUpdate()}_setListView(){this.viewMode="list",this.requestUpdate()}async _confirmDelete(t){const e=this.renderRoot.querySelector("confirm-dialog");if(!e)return void console.error("Confirm Dialog component not found!");await e.open("Are you sure you want to delete this employee?")&&In.dispatch(Mn(t))}}customElements.define("employee-list",Un),window.addEventListener("DOMContentLoaded",(()=>{const t=document.querySelector("#app");if(!t)return void console.error("no error");new G(t).setRoutes([{path:"/",component:"employee-list"},{path:"/add",component:"employee-form"},{path:"/edit/:id",component:"employee-form"},{path:"(.*)",redirect:"/"}])}));
//# sourceMappingURL=bundle.js.map
