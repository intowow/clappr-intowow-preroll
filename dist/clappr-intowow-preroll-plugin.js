(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("clappr"));
	else if(typeof define === 'function' && define.amd)
		define(["clappr"], factory);
	else if(typeof exports === 'object')
		exports["ClapprIntowowPrerollPlugin"] = factory(require("clappr"));
	else
		root["ClapprIntowowPrerollPlugin"] = factory(root["Clappr"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_7__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
// source: https://github.com/mathiasbynens/small
var mp4 = exports.mp4 = 'data:video/mp4;base64, AAAAHGZ0eXBpc29tAAACAGlzb21pc28ybXA0MQAAAAhmcmVlAAAAGm1kYXQAAAGzABAHAAABthBgUYI9t+8AAAMNbW9vdgAAAGxtdmhkAAAAAMXMvvrFzL76AAAD6AAAACoAAQAAAQAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAABhpb2RzAAAAABCAgIAHAE/////+/wAAAiF0cmFrAAAAXHRraGQAAAAPxcy++sXMvvoAAAABAAAAAAAAACoAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAABAAAAAAAgAAAAIAAAAAAG9bWRpYQAAACBtZGhkAAAAAMXMvvrFzL76AAAAGAAAAAEVxwAAAAAALWhkbHIAAAAAAAAAAHZpZGUAAAAAAAAAAAAAAABWaWRlb0hhbmRsZXIAAAABaG1pbmYAAAAUdm1oZAAAAAEAAAAAAAAAAAAAACRkaW5mAAAAHGRyZWYAAAAAAAAAAQAAAAx1cmwgAAAAAQAAAShzdGJsAAAAxHN0c2QAAAAAAAAAAQAAALRtcDR2AAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAgACABIAAAASAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGP//AAAAXmVzZHMAAAAAA4CAgE0AAQAEgICAPyARAAAAAAMNQAAAAAAFgICALQAAAbABAAABtYkTAAABAAAAASAAxI2IAMUARAEUQwAAAbJMYXZjNTMuMzUuMAaAgIABAgAAABhzdHRzAAAAAAAAAAEAAAABAAAAAQAAABxzdHNjAAAAAAAAAAEAAAABAAAAAQAAAAEAAAAUc3RzegAAAAAAAAASAAAAAQAAABRzdGNvAAAAAAAAAAEAAAAsAAAAYHVkdGEAAABYbWV0YQAAAAAAAAAhaGRscgAAAAAAAAAAbWRpcmFwcGwAAAAAAAAAAAAAAAAraWxzdAAAACOpdG9vAAAAG2RhdGEAAAABAAAAAExhdmY1My4yMS4x';

// 1x1 black SVG pixel
var svg = exports.svg = 'data:image/svg+xml, <svg xmlns="http://www.w3.org/2000/svg" width="1" height="1" viewBox="0 0 1 1"><rect x="0" y="0" width="1" height="1" fill="#000000" /></svg>';

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (cb, secure, timeout) {
  var win = window,
      doc = document,
      el = 'script',
      timer = null;

  var onLoad = function onLoad(r) {
    win.clearTimeout(timer);
    if (typeof cb === 'function') cb(r);
  };

  if (win.google && win.google.ima) {
    onLoad(true);

    return;
  }

  var s = secure === true ? 'https:' : '';
  var first = doc.getElementsByTagName(el)[0];
  var script = doc.createElement(el);

  script.src = s + '//imasdk.googleapis.com/js/sdkloader/ima3.js';
  script.async = true;
  if (typeof cb === 'function') script.onload = function () {
    onLoad(true);
  };
  first.parentNode.insertBefore(script, first);
  if (timeout) {
    timer = win.setTimeout(function () {
      onLoad(false);
    }, timeout);
  }
};

module.exports = exports['default']; /**
                                      * Google IMA HTML5 SDK lazy loader.
                                      * @function
                                      * @param {function} The library loaded callback.
                                      * @param {boolean} Set to true to force HTTPS load protocol. (Default behaviour is to match current protocol)
                                      * @param {number} The load timeout in milliseconds
                                      */

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = "data:image/png;charset=utf-8;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo1OWRlYjE3My0zYTI3LTRmNDctOGM0ZC1jMTE2NGEyYzgzY2QiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RkIzMjA5MzgwOTI5MTFFNjlGQTNEODZBNkNDMDlDNzAiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RkIzMjA5MzcwOTI5MTFFNjlGQTNEODZBNkNDMDlDNzAiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo4NWQ0OTUzZS0yMGFkLTRhYzQtYjI2ZC1mMWRjZDkyYWQ4ZDAiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NTlkZWIxNzMtM2EyNy00ZjQ3LThjNGQtYzExNjRhMmM4M2NkIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+/cTp2QAAAmdJREFUeNpiTEpKamBgYKhnoDNgNjQ0PACkGYHYgd4Wg2iKLefiYGdwsbdlkBIXZXj45BlB9SxI7AYoXU+qhfbWlgxeAUEMXFzccPFDJ04T5WMYINrnMB9m5eUz6BuZMPz+/ZvhwpnTDNKycgy/f/1kOHPuPNE+JtrndhamDN5+AQwi4hJg/rYN6xgOHjnKUN/UBOavWbuOpKAmaDm6hSCwcPYMcLAG+3qDg/rg7p0Mb95/IGgxEx45kOWN6IIgS9+8fMGwZtlihm/fvjKERseCHQSKY7Dvd+5CiY666iqwPKE4RgcocQ5KrbevXWbYuHkLw/XbdxmuXjzPYG1ry2BqYQUP8rMXL8MtLSkuZpBXUmYwMDZh+PDqOUpqJ2QxhuVv3n1g+P3nL1ji4+cvDAy/vjNo6eqDfT99xkywHLKlIACSAzkO5GiQfkJBTTDYQRY4OLvCffvtx08MS0FpYNrEfjA7ISmFqDgmaLm8jBQ4zkE+Onj0OFZLQQnv+p37DA/v3QWr1VRRJNlihrlz56JYDjIQZDjItyCAzVKMUOLkIt1ibJaDDAf5Fp+loFQNk3v99i15FmOzHBS3B/buhiekB48eo1gKynIgcPXSBYZHz16A2YzAapEUC1H4ycnJKFUqyJL41Ay4JTw8vHCfguK4p7cX7EiyfYwv2EHBDPK1tp4B3FKQI5AtpdjHuHwOSt0mBnoM3NzcDFev34AHLzIgyWIishvRVSoxJRexgKTGBDUtJslyaltMtOW0sJgoy2llMUHLaWkxXstpbTFOy+lhMVbL6WUxhuX0tBjFchYG+gNw0xkgwABZmxWRtEwx8AAAAABJRU5ErkJggg=="

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(9)(false);
// imports


// module
exports.push([module.i, ".intowow-preroll-plugin[data-preroll] {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  text-align: left; }\n  .intowow-preroll-plugin[data-preroll] .preroll-container[data-preroll] {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%; }\n    .intowow-preroll-plugin[data-preroll] .preroll-container[data-preroll] .ima-container[data-preroll] {\n      position: absolute;\n      top: 0;\n      left: 0;\n      width: 100%;\n      height: 100%; }\n  .intowow-preroll-plugin[data-preroll] .preroll-overlay[data-preroll] {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    z-index: 1337;\n    cursor: pointer;\n    overflow: hidden;\n    display: none; }\n    .intowow-preroll-plugin[data-preroll] .preroll-overlay[data-preroll]:hover .preroll-overlay-icon[data-preroll] {\n      opacity: 1; }\n    .intowow-preroll-plugin[data-preroll] .preroll-overlay[data-preroll] .preroll-overlay-icon[data-preroll] {\n      position: relative;\n      width: 100%;\n      height: 25%;\n      top: 50%;\n      transform: translateY(-50%);\n      opacity: 0.75; }\n", ""]);

// exports


/***/ }),
/* 4 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = "<svg version=\"1.1\" id=\"svg-spinner\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\" viewBox=\"0 0 80 80\" xml:space=\"preserve\"><path id=\"spinner\" fill=\"#D43B11\" d=\"M40,72C22.4,72,8,57.6,8,40C8,22.4, 22.4,8,40,8c17.6,0,32,14.4,32,32c0,1.1-0.9,2-2,2 s-2-0.9-2-2c0-15.4-12.6-28-28-28S12,24.6,12,40s12.6, 28,28,28c1.1,0,2,0.9,2,2S41.1,72,40,72z\"><animateTransform attributeType=\"xml\" attributeName=\"transform\" type=\"rotate\" from=\"0 40 40\" to=\"360 40 40\" dur=\"0.6s\" repeatCount=\"indefinite\"></animateTransform></path></svg>"

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\"><path fill=\"#010101\" d=\"M1.425.35L14.575 8l-13.15 7.65V.35z\"></path></svg>"

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_7__;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _clappr = __webpack_require__(7);

var _style = __webpack_require__(3);

var _style2 = _interopRequireDefault(_style);

var _dummy = __webpack_require__(0);

var _imaLoader = __webpack_require__(1);

var _imaLoader2 = _interopRequireDefault(_imaLoader);

var _play = __webpack_require__(6);

var _play2 = _interopRequireDefault(_play);

var _loader = __webpack_require__(5);

var _loader2 = _interopRequireDefault(_loader);

var _ad_icon = __webpack_require__(2);

var _ad_icon2 = _interopRequireDefault(_ad_icon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // 01-play.svg icon from Clappr player
// http://articles.dappergentlemen.com/2015/01/13/svg-spinner/


var ClapprIntowowPrerollPlugin = function (_UICorePlugin) {
  _inherits(ClapprIntowowPrerollPlugin, _UICorePlugin);

  _createClass(ClapprIntowowPrerollPlugin, [{
    key: 'name',
    get: function get() {
      return 'intowow-preroll-plugin';
    }
  }, {
    key: 'attributes',
    get: function get() {
      return {
        'class': this.name,
        'data-preroll': ''
      };
    }
  }, {
    key: 'cfg',
    get: function get() {
      return this.options.intowowPrerollPlugin || {};
    }
  }]);

  function ClapprIntowowPrerollPlugin(core) {
    _classCallCheck(this, ClapprIntowowPrerollPlugin);

    var _this = _possibleConstructorReturn(this, (ClapprIntowowPrerollPlugin.__proto__ || Object.getPrototypeOf(ClapprIntowowPrerollPlugin)).call(this, core));

    _this._imaIsloading = false;
    _this._imaIsloaded = false;
    _this._imaLoadResult = false;
    _this._pluginIsReady = false;
    _this._controlsDisabled = false;
    _this._isLoadingContent = false;
    return _this;
  }

  _createClass(ClapprIntowowPrerollPlugin, [{
    key: 'bindEvents',
    value: function bindEvents() {
      this.listenTo(this.core.mediaControl, _clappr.Events.MEDIACONTROL_CONTAINERCHANGED, this._onMediaControlContainerChanged);
      this.listenTo(this.core, _clappr.Events.CORE_READY, this._onCoreReady);
      _clappr.Mediator.on(this.core.options.playerId + ':' + _clappr.Events.PLAYER_RESIZE, this._onPlayerResize, this);
    }
  }, {
    key: '_onMediaControlContainerChanged',
    value: function _onMediaControlContainerChanged() {
      this.core.mediaControl.container.$el.append(this.el);
    }
  }, {
    key: '_onCoreReady',
    value: function _onCoreReady() {
      // Since Clappr 0.2.84, "CORE_READY" event is trigerred after create container on load
      this._resetMaxDurationTimer();
      this._resetNonLinearTimer();
      this._resetPlugin();
      this._configure();
      this._loadImaSDK();
      this._initPlugin();
    }
  }, {
    key: '_onPlayerResize',
    value: function _onPlayerResize(evt) {
      // Signal player resize to ads manager
      this._adsManager && this._adsManager.resize(this._contentElement.offsetWidth, this._contentElement.offsetHeight, google.ima.ViewMode.NORMAL);
    }
  }, {
    key: '_pluginError',
    value: function _pluginError(msg) {
      var e = new Error(this.name + ': ' + msg);
      this._imaEvent('error', e);
      throw e;
    }
  }, {
    key: '_configure',
    value: function _configure() {
      this._placement = this.cfg.placement || false;
      this._passbackAdTagUrl = this.cfg.passbackAdTagUrl;
      this._autostart = false;
      this._events = _clappr.$.isPlainObject(this.cfg.events) ? this.cfg.events : {};
      this._vpaid = 2;
      this._nonLinearDuration = this.cfg.nonLinearDuration > 0 ? this.cfg.nonLinearDuration : 15000; // Default is 15 seconds
      this._imaLoadtimeout = this.cfg.imaLoadTimeout > 0 ? this.cfg.imaLoadTimeout : 6000; // Default is 6 seconds
      this._usePosterIcon = !!this.cfg.usePosterIcon;
      this._maxDuration = this.cfg.maxDuration > 0 ? this.cfg.maxDuration : false; // Default is disabled
      this._locale = this.cfg.locale ? this.cfg.locale : false; // Default is to not set custom locale
      this._disableLoader = this.cfg.disableLoader ? this.cfg.disableLoader : false; // Default is false (Loader is enabled)
      // TODO: Add an option which is an array of plugin name to disable
    }
  }, {
    key: '_resetPlugin',
    value: function _resetPlugin() {
      this._playVideoContentRequested = false;
    }
  }, {
    key: '_loadImaSDK',
    value: function _loadImaSDK() {
      var _this2 = this;

      // Ensure is lazy loaded once (only if tag is filled)
      if (this._imaIsloading || this._imaIsloaded || !this._placement) return;

      this._imaIsloading = true;
      (0, _imaLoader2.default)(function (result) {
        _this2._imaLoadResult = result;
        _this2._imaIsloading = false;
        _this2._imaIsloaded = true;
        _this2._initImaSDK();
      }, true, this._imaLoadtimeout);
    }
  }, {
    key: '_disableControls',
    value: function _disableControls() {
      this.core.disableMediaControl();
      this._posterPlugin && this._posterPlugin.disable();
      this._clickToPausePlugin && this._clickToPausePlugin.disable();
      this._container.stopListening();
      this._controlsDisabled = true;
    }
  }, {
    key: '_enableControls',
    value: function _enableControls() {
      if (this._controlsDisabled) {
        this._clickToPausePlugin && this._clickToPausePlugin.enable();
        this._posterPlugin && this._posterPlugin.enable();
        this.core.enableMediaControl();
        this._controlsDisabled = false;
      }
    }
  }, {
    key: '_initPlugin',
    value: function _initPlugin() {
      var _this3 = this;

      this._pluginIsReady = false;

      // Ensure not loading video content (after ad played)
      if (this._isLoadingContent) {
        this._isLoadingContent = false;
        this.$el.hide();

        return;
      }

      this._cleanup();

      // Get current playback. (To get playback element)
      this._playback = this.core.getCurrentPlayback();
      if (!this._playback) {
        this._pluginError('failed to get Clappr playback');
      }

      // Get current container. (To disable bindings during ad playback)
      this._container = this.core.getCurrentContainer();
      if (!this._container) {
        this._pluginError('failed to get Clappr current container');
      }

      // Ensure plugin configuration has VAST tag
      if (!this._placement) {
        // Handle content autoplay if no tag
        if (!this.options.autoPlay && this._autostart) {
          this._container.play();
        }

        return;
      }

      // Ensure playback is using HTML5 video element if mobile device
      if (this._playback.tagName !== 'video' && _clappr.Browser.isMobile) return;

      // Ensure browser can play video content. (Avoid to display an ad with nothing after)
      if (this._playback.name === 'no_op') return;

      this.$el.show();
      this._$clickOverlay.show();

      // Attempt to get poster plugin. (May interfere with media control)
      this._posterPlugin = this._container.getPlugin('poster');

      // Attempt to capture poster play svg icon
      if (this._posterPlugin && this._usePosterIcon) {
        var _svg = this._posterPlugin.$el.find('svg');
        if (_svg[0]) {
          this._playSvg = _svg[0];
        }
      }

      // Attempt to get click-to-pause plugin. (May interfere with advert click handling)
      this._clickToPausePlugin = this._container.getPlugin('click_to_pause');

      // Disable Clappr during ad playback
      process.nextTick(function () {
        return _this3._disableControls();
      });

      // Attempt to get error screen plugin. (May interfere with dummy source switch)
      this._errorScreenPlugin = this.core.getPlugin('error_screen');

      // Disable error screen plugin (will be re-enabled when source reloaded)
      this._errorScreenPlugin && this._errorScreenPlugin.disable();

      this._contentElement = this._playback.el;
      this._useDummyMp4Video = false;
      this._useBlackSvgPixel = false;

      var src = this._playback.el && this._playback.el.src;
      if (!src || src.length === 0) {
        // Ensure video element has one source loaded (expected by most of ad SDK libraries)
        // This is required if loaded source is a .m3u8 handled by hls.js playback (src is empty)
        this._playback.el.src = _dummy.mp4;
        this._useDummyMp4Video = true;
      } else if (this._playback.name === 'html5_video' && !this._playback.el.hasAttribute('poster')) {
        // Hide video source preview using a black 1 pixel video poster. (Smoother user experience on iOS/MacOSX)
        this._playback.el.poster = _dummy.svg;
        this._useBlackSvgPixel = true;
      }

      // Note that some ad SDK may also change the video element styles without properly restoring state after ad playback.
      // A possible enhancement could be also to backup element styles and restore them after ad playback.

      this._pluginIsReady = true;
      this._initImaSDK();
    }
  }, {
    key: '_createImaContainer',
    value: function _createImaContainer() {
      this._destroyImaContainer();
      // IMA does not clean ad container when finished
      // For the sake of simplicity, wrap into a <div> element
      if (this._adContainer) {
        this._imaContainer = (0, _clappr.$)("<div />").addClass("ima-container").attr('data-preroll', '')[0];
        this._adContainer.appendChild(this._imaContainer);
      }
    }
  }, {
    key: '_destroyImaContainer',
    value: function _destroyImaContainer() {
      if (this._imaContainer && this._adContainer) {
        this._adContainer.removeChild(this._imaContainer);
        delete this._imaContainer;
      }
    }
  }, {
    key: '_createAdDisplayContainer',
    value: function _createAdDisplayContainer() {
      this._createImaContainer();
      this._destroyAdDisplayContainer();
      this._adDisplayContainer = new google.ima.AdDisplayContainer(this._imaContainer, this._contentElement);
    }
  }, {
    key: '_destroyAdDisplayContainer',
    value: function _destroyAdDisplayContainer() {
      if (this._adDisplayContainer) {
        this._adDisplayContainer.destroy();
        delete this._adDisplayContainer;
      }
    }
  }, {
    key: '_vpaidMode',
    value: function _vpaidMode() {
      // For more details, read https://developers.google.com/interactive-media-ads/docs/sdks/html5/vpaid2js#enabling
      if (this._vpaid === 0) return google.ima.ImaSdkSettings.VpaidMode.DISABLED;

      if (this._vpaid > 1) return google.ima.ImaSdkSettings.VpaidMode.INSECURE;

      return google.ima.ImaSdkSettings.VpaidMode.ENABLED;
    }
  }, {
    key: '_initImaSDK',
    value: function _initImaSDK() {
      if (!this._imaIsloaded || !this._pluginIsReady) {
        return;
      }

      // Skip ad scenario if IMA SDK is not successfully loaded
      // May happen if user has ad blocker, or Google server unavailable
      if (!this._imaLoadResult) {
        this._imaEvent('error', new Error('Failed to load IMA SDK'));
        this._playVideoContent();

        return;
      }

      // Setup VPAID support
      google.ima.settings.setVpaidMode(this._vpaidMode());

      // Setup provided locale
      this._locale && google.ima.settings.setLocale(this._locale);

      this._setupOverlay();
    }
  }, {
    key: '_destroyAdsLoader',
    value: function _destroyAdsLoader() {
      if (this._adsLoader) {
        this._adsLoader.contentComplete();
        this._adsLoader.destroy();
        delete this._adsLoader;
      }
    }
  }, {
    key: '_loadIMARequest',
    value: function _loadIMARequest(adsRequest) {
      var _this4 = this;

      return new Promise(function (resolve, reject) {
        // Destroy any previously created ads loader instance
        // IMA guidelines are to use the same AdsLoader instance for the entire
        // lifecycle of your page, but Clappr may create a new video element if
        // configure() method is called with a source.
        _this4._destroyAdsLoader();
        _this4._adsLoader = new google.ima.AdsLoader(_this4._adDisplayContainer);
        _this4._adsLoader.getSettings().setDisableCustomPlaybackForIOS10Plus(true);
        _this4._adsLoader.addEventListener(google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED, function (e) {
          resolve(e);
        });
        _this4._adsLoader.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, function (e) {
          var error = new Error();
          error.event = e;
          reject(error);
        });

        adsRequest.linearAdSlotWidth = _this4._contentElement.offsetWidth;
        adsRequest.linearAdSlotHeight = _this4._contentElement.offsetHeight;
        adsRequest.nonLinearAdSlotWidth = _this4._contentElement.offsetWidth;
        adsRequest.nonLinearAdSlotHeight = _this4._contentElement.offsetHeight;
        // Assume playback is consented by user
        adsRequest.setAdWillAutoPlay(true);
        adsRequest.setAdWillPlayMuted(false);
        // requestAds() trigger _onAdsManagerLoaded() or _onAdError()
        _this4._adsLoader.requestAds(adsRequest);
      });
    }
  }, {
    key: '_destroyAdsManager',
    value: function _destroyAdsManager() {
      if (this._adsManager) {
        this._adsManager.destroy();
        delete this._adsManager;
      }
    }
  }, {
    key: '_requestAd',
    value: function _requestAd() {
      var _this5 = this;

      var render = function render(ad) {
        var adsRequest = new google.ima.AdsRequest();
        adsRequest.adTagUrl = ad.adTagUrl;
        adsRequest.adsResponse = ad.adsResponse;

        return _this5._loadIMARequest(adsRequest).then(function (event) {
          _this5._onAdsManagerLoaded(event, ad.eventListener);
        }, function (err) {
          var adErrorEvent = err.event;
          // google.ima.AdErrorEvent : https://developers.google.com/interactive-media-ads/docs/sdks/html5/v3/apis#ima.AdErrorEvent
          // google.ima.AdError : https://developers.google.com/interactive-media-ads/docs/sdks/html5/v3/apis#ima.AdError
          _this5._imaEvent('ad_error', adErrorEvent);
          throw err;
        });
      };

      window.intowow.cmd.push(function () {
        new Promise(function (resolve, reject) {
          resolve(window.intowow.load({
            placement: _this5._placement,
            timeout: _this5._imaLoadtimeout,
            source: _this5.core.options.source,
            render: render
          }));
        }).catch(function (err) {
          if (_this5._passbackAdTagUrl) {
            return render({
              adTagUrl: _this5._passbackAdTagUrl,
              eventListener: {
                emit: function emit() {}
              }
            });
          } else {
            throw err;
          }
        }).then(null, function () {
          _this5._playVideoContent();
        });
      });
    }
  }, {
    key: '_emitVideoEvent',
    value: function _emitVideoEvent(_ref) {
      var event = _ref.event,
          percentage = _ref.percentage,
          adDuration = _ref.adDuration,
          eventListener = _ref.eventListener;

      eventListener.emit(event, {
        duration: adDuration * percentage / 100,
        adDuration: adDuration,
        percentage: percentage
      });
    }
  }, {
    key: '_createWidgets',
    value: function _createWidgets() {
      var _this6 = this;

      var isVpaid = this._adsManager.getCurrentAd().getApiFramework() !== null;
      if (isVpaid) {
        return;
      }

      var isMobile = navigator.userAgent.indexOf('Mobi') !== -1;
      if (isMobile) {
        return;
      }

      var widgets = [{
        destroy: function destroy() {
          this.view.parentElement.removeChild(this.view);
          this.view.removeEventListener();
          delete this.view;
        },
        getView: function getView() {
          var scale = 1;
          this.view = document.createElement('div');
          Object.assign(this.view.style, {
            height: '20px',
            width: '20px',
            position: 'absolute',
            right: 0,
            top: 0,
            margin: '15px 35px',
            fontSize: 16 * scale + 'px',
            lineHeight: 12 * scale + 'pt',
            color: 'white'
          });
          this.view.innerText = '00:00';
          return this.view;
        },
        update: function update(_ref2) {
          var time = _ref2.time,
              volume = _ref2.volume;

          var progress = isNaN(time) ? 0 : Math.max(0, time);
          var min = '' + Math.floor(progress / 60);
          if (min.length === 1) {
            min = '0' + min;
          }

          var sec = '' + Math.floor(progress % 60);
          if (sec.length === 1) {
            sec = '0' + sec;
          }

          this.view.innerText = min + ':' + sec;
        }
      }];

      this._intowowWidgets = widgets;
      var overlay = this.$el[0];
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this._intowowWidgets[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var widget = _step.value;

          overlay.appendChild(widget.getView());
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      this._widgetTimer = setInterval(function () {
        var state = {
          time: _this6._adsManager.getRemainingTime(),
          volume: _this6._adsManager.getVolume()
        };
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = widgets[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var widget = _step2.value;

            widget.update(state);
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
              _iterator2.return();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }
      }, 200);

      var wrapper = document.createElement('div');
      var img = document.createElement('img');
      img.src = _ad_icon2.default;
      Object.assign(img.style, {
        width: '20px',
        height: '20px',
        position: 'absolute',
        right: '0',
        top: '0'
      });
      wrapper.appendChild(img);

      overlay.appendChild(wrapper);
    }
  }, {
    key: '_destroyWidgets',
    value: function _destroyWidgets() {
      if (!this._intowowWidgets) {
        return;
      }

      clearInterval(this._widgetTimer);

      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = this._intowowWidgets[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var widget = _step3.value;

          widget.destroy();
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3.return) {
            _iterator3.return();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }

      delete this._intowowWidgets;
    }
  }, {
    key: '_onAdError',
    value: function _onAdError(err) {
      console.error(err);
    }
  }, {
    key: '_onAdsManagerLoaded',
    value: function _onAdsManagerLoaded(adsManagerLoadedEvent, eventListener) {
      var _this7 = this;

      var adsRenderingSettings = new google.ima.AdsRenderingSettings();

      // Plugin will handle playback state when ad has completed
      adsRenderingSettings.restoreCustomPlaybackStateOnAdBreakComplete = false;

      // Destroy any previously created ads manager
      this._destroyAdsManager();

      this._adsManager = adsManagerLoadedEvent.getAdsManager(this._contentElement, adsRenderingSettings);

      var adDuration = 0;

      this._adsManager.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, function (e) {
        _this7._onAdError(e);
      });

      this._adsManager.addEventListener(google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED, function () {
        _this7._destroyWidgets();
        _this7._imaEvent('content_resume_requested');
        _this7._playVideoContent();
      });

      this._adsManager.addEventListener(google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED, function () {
        _this7._imaEvent('content_pause_requested');
      });

      this._adsManager.addEventListener(google.ima.AdEvent.Type.LOADED, function () {
        _this7._imaEvent('loaded');
      });

      this._adsManager.addEventListener(google.ima.AdEvent.Type.CLICK, function () {
        var duration = adDuration - _this7._adsManager.getRemainingTime() * 1000;
        _this7._emitVideoEvent({
          event: 'click',
          percentage: Math.ceil(duration / adDuration * 100),
          adDuration: adDuration,
          eventListener: eventListener
        });
        _this7._imaEvent('click');
      });

      this._adsManager.addEventListener(google.ima.AdEvent.Type.IMPRESSION, function () {
        adDuration = adDuration || Math.floor(1000 * _this7._adsManager.getRemainingTime());
        eventListener.emit('impression');
        _this7._imaEvent('impression');
      });

      this._adsManager.addEventListener(google.ima.AdEvent.Type.STARTED, function (e) {
        _this7._adsManager.setVolume(0.5);
        _this7._createWidgets();

        adDuration = adDuration || Math.floor(1000 * _this7._adsManager.getRemainingTime());
        if (!e.getAd().isLinear()) {
          // KNOWN ISSUE: non-linear ad is displayed *before* content for custom duration
          // FIXME: find a way to display it while playing content
          _this7._startNonLinearDurationTimer();
        } else {
          _this7._maxDuration && _this7._startMaxDurationTimer();
        }

        _this7._emitVideoEvent({
          event: 'video_view',
          percentage: 0,
          adDuration: adDuration,
          eventListener: eventListener
        });
        _this7._imaEvent('started');
      });

      this._adsManager.addEventListener(google.ima.AdEvent.Type.FIRST_QUARTILE, function () {
        _this7._emitVideoEvent({
          event: 'video_view',
          percentage: 25,
          adDuration: adDuration,
          eventListener: eventListener
        });
        _this7._imaEvent('first_quartile');
      });

      this._adsManager.addEventListener(google.ima.AdEvent.Type.MIDPOINT, function () {
        _this7._emitVideoEvent({
          event: 'video_view',
          percentage: 50,
          adDuration: adDuration,
          eventListener: eventListener
        });
        _this7._imaEvent('midpoint');
      });

      this._adsManager.addEventListener(google.ima.AdEvent.Type.THIRD_QUARTILE, function () {
        _this7._emitVideoEvent({
          event: 'video_view',
          percentage: 75,
          adDuration: adDuration,
          eventListener: eventListener
        });
        _this7._imaEvent('third_quartile');
      });

      this._adsManager.addEventListener(google.ima.AdEvent.Type.COMPLETE, function () {
        _this7._emitVideoEvent({
          event: 'video_view',
          percentage: 100,
          adDuration: adDuration,
          eventListener: eventListener
        });
        _this7._imaEvent('complete');
      });

      this._adsManager.addEventListener(google.ima.AdEvent.Type.PAUSED, function () {
        _this7._imaEvent('paused');
      });

      this._adsManager.addEventListener(google.ima.AdEvent.Type.RESUMED, function () {
        _this7._imaEvent('resumed');
      });

      this._adsManager.addEventListener(google.ima.AdEvent.Type.SKIPPED, function () {
        var duration = adDuration - _this7._adsManager.getRemainingTime() * 1000;
        _this7._emitVideoEvent({
          event: 'skip',
          percentage: Math.ceil(duration / adDuration * 100),
          adDuration: adDuration,
          eventListener: eventListener
        });
        _this7._imaEvent('skipped');
      });

      this._adsManager.addEventListener(google.ima.AdEvent.Type.USER_CLOSE, function () {
        _this7._imaEvent('user_close');
      });

      var volumeState;
      this._adsManager.addEventListener(google.ima.AdEvent.Type.VOLUME_CHANGED, function () {
        var newVolState = _this7._adsManager.getVolume() > 0 ? 'mute' : 'unmute';
        if (volumeState !== newVolState) {
          var duration = adDuration - _this7._adsManager.getRemainingTime() * 1000;
          _this7._emitVideoEvent({
            event: newVolState,
            percentage: Math.ceil(duration / adDuration * 100),
            adDuration: adDuration,
            eventListener: eventListener
          });
          volumeState = newVolState;
        }

        _this7._imaEvent('user_close');
      });

      this._playAds();
    }
  }, {
    key: '_onDurationTimeout',
    value: function _onDurationTimeout() {
      this._imaEvent('error', new Error('Maximum duration of ' + this._maxDuration + ' ms reached'));

      if (this._adsManager) {
        // Signal ads manager to stop and get back to content
        this._adsManager.stop();
      } else {
        // Should never happen
        this._cleanup();
        this._playVideoContent();
      }
    }
  }, {
    key: '_startMaxDurationTimer',
    value: function _startMaxDurationTimer() {
      var _this8 = this;

      this._maxDurationTimer = setTimeout(function () {
        _this8._onDurationTimeout();
      }, this._maxDuration);
    }
  }, {
    key: '_resetMaxDurationTimer',
    value: function _resetMaxDurationTimer() {
      if (typeof this._maxDurationTimer === 'number') {
        clearTimeout(this._maxDurationTimer);
        this._maxDurationTimer = undefined;
      }
    }
  }, {
    key: '_startNonLinearDurationTimer',
    value: function _startNonLinearDurationTimer() {
      var _this9 = this;

      this._nonLinearTimer = setTimeout(function () {
        _this9._playVideoContent();
      }, this._nonLinearDuration);
    }
  }, {
    key: '_resetNonLinearTimer',
    value: function _resetNonLinearTimer() {
      if (typeof this._nonLinearTimer === 'number') {
        clearTimeout(this._nonLinearTimer);
        this._nonLinearTimer = undefined;
      }
    }
  }, {
    key: '_imaEvent',
    value: function _imaEvent(eventName, e) {
      _clappr.$.isFunction(this._events[eventName]) && this._events[eventName](e);
    }
  }, {
    key: '_setupOverlay',
    value: function _setupOverlay() {
      var _this10 = this;

      // Ad start must be done as the result of a user action on mobile.
      // For more details, read https://developers.google.com/interactive-media-ads/docs/sdks/html5/mobile_video
      if (!this._autostart) {
        var startAd = function startAd(e) {
          try {
            _this10._clickOverlay.removeEventListener('click', startAd, false);
            e.preventDefault();
            e.stopPropagation();
          } catch (err) {}

          _this10._disableLoader || _this10._setOverlayIcon(_loader2.default);

          // Use playback "consent" feature to capture user action (Clappr 0.2.66 or greater)
          _this10._playback.consent();

          // Request ad
          _this10._createAdDisplayContainer();
          _this10._adDisplayContainer.initialize(); // Must be called on overlay click
          _this10._requestAd();
        };

        this._setOverlayIcon(this._playSvg || _play2.default);
        this._clickOverlay.addEventListener('click', startAd, false);

        return;
      }

      // Otherwise, request ad
      this._disableLoader || this._setOverlayIcon(_loader2.default);
      this._createAdDisplayContainer();
      this._adDisplayContainer.initialize();
      this._requestAd();
    }
  }, {
    key: '_playAds',
    value: function _playAds() {
      try {
        this._$clickOverlay.hide();
        this._adsManager.init(this._contentElement.offsetWidth, this._contentElement.offsetHeight, google.ima.ViewMode.NORMAL);
        this._adsManager.start();
      } catch (e) {
        // console.log('adsManager catched error', e)
        this._imaEvent('error', e);
        this._playVideoContent();
      }
    }
  }, {
    key: '_playVideoContent',
    value: function _playVideoContent() {
      var _this11 = this;

      // Ensure video content playback is not already requested
      // This may happen with VPAID unexpected AdError
      if (this._playVideoContentRequested) return;

      this._playVideoContentRequested = true;
      this._resetMaxDurationTimer();
      this._resetNonLinearTimer();

      this._imaEvent('content_resume');

      process.nextTick(function () {
        _this11._enableControls();
        _this11.$el.hide();

        // Ensure recycleVideo playback option is enabled with mobile devices (Clappr 0.2.66 or greater)
        var playbackOptions = _this11.core.options.playback || {};
        playbackOptions.recycleVideo = _clappr.Browser.isMobile;

        // Signal loading video content
        _this11._isLoadingContent = true;

        setTimeout(function () {
          _this11.core.configure({
            playback: playbackOptions,
            sources: _this11.core.options.sources,
            autoPlay: true // Assume playback has user consent
          });
        }, 100);
      });
    }
  }, {
    key: '_remove',
    value: function _remove() {
      if (this._$adContainer) {
        this._$adContainer.remove();
      }
      if (this._$clickOverlay) {
        this._$clickOverlay.remove();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      this._remove();
      this._$adContainer = (0, _clappr.$)("<div />").addClass("preroll-container").attr('data-preroll', '');
      this._$clickOverlay = (0, _clappr.$)("<div />").addClass("preroll-overlay").attr('data-preroll', '');
      this.$el.append(this._$adContainer);
      this.$el.append(this._$clickOverlay);
      this.$el.append(_clappr.Styler.getStyleFor(_style2.default));
      this._adContainer = this._$adContainer[0];
      this._clickOverlay = this._$clickOverlay[0];

      return this;
    }
  }, {
    key: '_setOverlayIcon',
    value: function _setOverlayIcon(icon) {
      var svg = this._$clickOverlay.find('svg');
      if (svg[0]) {
        this._$clickOverlay.find('svg').replaceWith(icon);
      } else {
        this._$clickOverlay.append(icon);
      }
      this._$clickOverlay.find('svg path').css('fill', '#fff');
      this._$clickOverlay.find('svg').addClass('preroll-overlay-icon').attr('data-preroll', '');
    }
  }, {
    key: '_cleanup',
    value: function _cleanup() {
      this._destroyAdsLoader();
      this._destroyAdDisplayContainer();
      this._destroyAdsManager();
      this._destroyImaContainer();
      this.$el.hide();
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      this._cleanup();
      _get(ClapprIntowowPrerollPlugin.prototype.__proto__ || Object.getPrototypeOf(ClapprIntowowPrerollPlugin.prototype), 'destroy', this).call(this);
    }
  }]);

  return ClapprIntowowPrerollPlugin;
}(_clappr.UICorePlugin);

exports.default = ClapprIntowowPrerollPlugin;
module.exports = exports['default'];
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ }),
/* 9 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ })
/******/ ]);
});