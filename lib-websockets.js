var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all2) => {
  for (var name3 in all2)
    __defProp(target, name3, { get: all2[name3], enumerable: true });
};
var __copyProps = (to, from6, except, desc) => {
  if (from6 && typeof from6 === "object" || typeof from6 === "function") {
    for (let key of __getOwnPropNames(from6))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from6[key], enumerable: !(desc = __getOwnPropDesc(from6, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/ms/index.js
var require_ms = __commonJS({
  "node_modules/ms/index.js"(exports, module) {
    var s = 1e3;
    var m = s * 60;
    var h = m * 60;
    var d = h * 24;
    var w = d * 7;
    var y = d * 365.25;
    module.exports = function(val, options) {
      options = options || {};
      var type = typeof val;
      if (type === "string" && val.length > 0) {
        return parse(val);
      } else if (type === "number" && isFinite(val)) {
        return options.long ? fmtLong(val) : fmtShort(val);
      }
      throw new Error(
        "val is not a non-empty string or a valid number. val=" + JSON.stringify(val)
      );
    };
    function parse(str) {
      str = String(str);
      if (str.length > 100) {
        return;
      }
      var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
        str
      );
      if (!match) {
        return;
      }
      var n = parseFloat(match[1]);
      var type = (match[2] || "ms").toLowerCase();
      switch (type) {
        case "years":
        case "year":
        case "yrs":
        case "yr":
        case "y":
          return n * y;
        case "weeks":
        case "week":
        case "w":
          return n * w;
        case "days":
        case "day":
        case "d":
          return n * d;
        case "hours":
        case "hour":
        case "hrs":
        case "hr":
        case "h":
          return n * h;
        case "minutes":
        case "minute":
        case "mins":
        case "min":
        case "m":
          return n * m;
        case "seconds":
        case "second":
        case "secs":
        case "sec":
        case "s":
          return n * s;
        case "milliseconds":
        case "millisecond":
        case "msecs":
        case "msec":
        case "ms":
          return n;
        default:
          return void 0;
      }
    }
    function fmtShort(ms) {
      var msAbs = Math.abs(ms);
      if (msAbs >= d) {
        return Math.round(ms / d) + "d";
      }
      if (msAbs >= h) {
        return Math.round(ms / h) + "h";
      }
      if (msAbs >= m) {
        return Math.round(ms / m) + "m";
      }
      if (msAbs >= s) {
        return Math.round(ms / s) + "s";
      }
      return ms + "ms";
    }
    function fmtLong(ms) {
      var msAbs = Math.abs(ms);
      if (msAbs >= d) {
        return plural(ms, msAbs, d, "day");
      }
      if (msAbs >= h) {
        return plural(ms, msAbs, h, "hour");
      }
      if (msAbs >= m) {
        return plural(ms, msAbs, m, "minute");
      }
      if (msAbs >= s) {
        return plural(ms, msAbs, s, "second");
      }
      return ms + " ms";
    }
    function plural(ms, msAbs, n, name3) {
      var isPlural = msAbs >= n * 1.5;
      return Math.round(ms / n) + " " + name3 + (isPlural ? "s" : "");
    }
  }
});

// node_modules/debug/src/common.js
var require_common = __commonJS({
  "node_modules/debug/src/common.js"(exports, module) {
    function setup(env) {
      createDebug.debug = createDebug;
      createDebug.default = createDebug;
      createDebug.coerce = coerce4;
      createDebug.disable = disable;
      createDebug.enable = enable;
      createDebug.enabled = enabled;
      createDebug.humanize = require_ms();
      createDebug.destroy = destroy;
      Object.keys(env).forEach((key) => {
        createDebug[key] = env[key];
      });
      createDebug.names = [];
      createDebug.skips = [];
      createDebug.formatters = {};
      function selectColor(namespace) {
        let hash = 0;
        for (let i = 0; i < namespace.length; i++) {
          hash = (hash << 5) - hash + namespace.charCodeAt(i);
          hash |= 0;
        }
        return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
      }
      createDebug.selectColor = selectColor;
      function createDebug(namespace) {
        let prevTime;
        let enableOverride = null;
        let namespacesCache;
        let enabledCache;
        function debug2(...args) {
          if (!debug2.enabled) {
            return;
          }
          const self2 = debug2;
          const curr = Number(/* @__PURE__ */ new Date());
          const ms = curr - (prevTime || curr);
          self2.diff = ms;
          self2.prev = prevTime;
          self2.curr = curr;
          prevTime = curr;
          args[0] = createDebug.coerce(args[0]);
          if (typeof args[0] !== "string") {
            args.unshift("%O");
          }
          let index = 0;
          args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format3) => {
            if (match === "%%") {
              return "%";
            }
            index++;
            const formatter = createDebug.formatters[format3];
            if (typeof formatter === "function") {
              const val = args[index];
              match = formatter.call(self2, val);
              args.splice(index, 1);
              index--;
            }
            return match;
          });
          createDebug.formatArgs.call(self2, args);
          const logFn = self2.log || createDebug.log;
          logFn.apply(self2, args);
        }
        debug2.namespace = namespace;
        debug2.useColors = createDebug.useColors();
        debug2.color = createDebug.selectColor(namespace);
        debug2.extend = extend;
        debug2.destroy = createDebug.destroy;
        Object.defineProperty(debug2, "enabled", {
          enumerable: true,
          configurable: false,
          get: () => {
            if (enableOverride !== null) {
              return enableOverride;
            }
            if (namespacesCache !== createDebug.namespaces) {
              namespacesCache = createDebug.namespaces;
              enabledCache = createDebug.enabled(namespace);
            }
            return enabledCache;
          },
          set: (v) => {
            enableOverride = v;
          }
        });
        if (typeof createDebug.init === "function") {
          createDebug.init(debug2);
        }
        return debug2;
      }
      function extend(namespace, delimiter) {
        const newDebug = createDebug(this.namespace + (typeof delimiter === "undefined" ? ":" : delimiter) + namespace);
        newDebug.log = this.log;
        return newDebug;
      }
      function enable(namespaces) {
        createDebug.save(namespaces);
        createDebug.namespaces = namespaces;
        createDebug.names = [];
        createDebug.skips = [];
        let i;
        const split = (typeof namespaces === "string" ? namespaces : "").split(/[\s,]+/);
        const len = split.length;
        for (i = 0; i < len; i++) {
          if (!split[i]) {
            continue;
          }
          namespaces = split[i].replace(/\*/g, ".*?");
          if (namespaces[0] === "-") {
            createDebug.skips.push(new RegExp("^" + namespaces.slice(1) + "$"));
          } else {
            createDebug.names.push(new RegExp("^" + namespaces + "$"));
          }
        }
      }
      function disable() {
        const namespaces = [
          ...createDebug.names.map(toNamespace),
          ...createDebug.skips.map(toNamespace).map((namespace) => "-" + namespace)
        ].join(",");
        createDebug.enable("");
        return namespaces;
      }
      function enabled(name3) {
        if (name3[name3.length - 1] === "*") {
          return true;
        }
        let i;
        let len;
        for (i = 0, len = createDebug.skips.length; i < len; i++) {
          if (createDebug.skips[i].test(name3)) {
            return false;
          }
        }
        for (i = 0, len = createDebug.names.length; i < len; i++) {
          if (createDebug.names[i].test(name3)) {
            return true;
          }
        }
        return false;
      }
      function toNamespace(regexp) {
        return regexp.toString().substring(2, regexp.toString().length - 2).replace(/\.\*\?$/, "*");
      }
      function coerce4(val) {
        if (val instanceof Error) {
          return val.stack || val.message;
        }
        return val;
      }
      function destroy() {
        console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
      }
      createDebug.enable(createDebug.load());
      return createDebug;
    }
    module.exports = setup;
  }
});

// node_modules/debug/src/browser.js
var require_browser = __commonJS({
  "node_modules/debug/src/browser.js"(exports, module) {
    exports.formatArgs = formatArgs;
    exports.save = save;
    exports.load = load;
    exports.useColors = useColors;
    exports.storage = localstorage();
    exports.destroy = (() => {
      let warned = false;
      return () => {
        if (!warned) {
          warned = true;
          console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
        }
      };
    })();
    exports.colors = [
      "#0000CC",
      "#0000FF",
      "#0033CC",
      "#0033FF",
      "#0066CC",
      "#0066FF",
      "#0099CC",
      "#0099FF",
      "#00CC00",
      "#00CC33",
      "#00CC66",
      "#00CC99",
      "#00CCCC",
      "#00CCFF",
      "#3300CC",
      "#3300FF",
      "#3333CC",
      "#3333FF",
      "#3366CC",
      "#3366FF",
      "#3399CC",
      "#3399FF",
      "#33CC00",
      "#33CC33",
      "#33CC66",
      "#33CC99",
      "#33CCCC",
      "#33CCFF",
      "#6600CC",
      "#6600FF",
      "#6633CC",
      "#6633FF",
      "#66CC00",
      "#66CC33",
      "#9900CC",
      "#9900FF",
      "#9933CC",
      "#9933FF",
      "#99CC00",
      "#99CC33",
      "#CC0000",
      "#CC0033",
      "#CC0066",
      "#CC0099",
      "#CC00CC",
      "#CC00FF",
      "#CC3300",
      "#CC3333",
      "#CC3366",
      "#CC3399",
      "#CC33CC",
      "#CC33FF",
      "#CC6600",
      "#CC6633",
      "#CC9900",
      "#CC9933",
      "#CCCC00",
      "#CCCC33",
      "#FF0000",
      "#FF0033",
      "#FF0066",
      "#FF0099",
      "#FF00CC",
      "#FF00FF",
      "#FF3300",
      "#FF3333",
      "#FF3366",
      "#FF3399",
      "#FF33CC",
      "#FF33FF",
      "#FF6600",
      "#FF6633",
      "#FF9900",
      "#FF9933",
      "#FFCC00",
      "#FFCC33"
    ];
    function useColors() {
      if (typeof window !== "undefined" && window.process && (window.process.type === "renderer" || window.process.__nwjs)) {
        return true;
      }
      if (typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
        return false;
      }
      let m;
      return typeof document !== "undefined" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // Is firebug? http://stackoverflow.com/a/398120/376773
      typeof window !== "undefined" && window.console && (window.console.firebug || window.console.exception && window.console.table) || // Is firefox >= v31?
      // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
      typeof navigator !== "undefined" && navigator.userAgent && (m = navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)) && parseInt(m[1], 10) >= 31 || // Double check webkit in userAgent just in case we are in a worker
      typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
    }
    function formatArgs(args) {
      args[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + args[0] + (this.useColors ? "%c " : " ") + "+" + module.exports.humanize(this.diff);
      if (!this.useColors) {
        return;
      }
      const c = "color: " + this.color;
      args.splice(1, 0, c, "color: inherit");
      let index = 0;
      let lastC = 0;
      args[0].replace(/%[a-zA-Z%]/g, (match) => {
        if (match === "%%") {
          return;
        }
        index++;
        if (match === "%c") {
          lastC = index;
        }
      });
      args.splice(lastC, 0, c);
    }
    exports.log = console.debug || console.log || (() => {
    });
    function save(namespaces) {
      try {
        if (namespaces) {
          exports.storage.setItem("debug", namespaces);
        } else {
          exports.storage.removeItem("debug");
        }
      } catch (error) {
      }
    }
    function load() {
      let r;
      try {
        r = exports.storage.getItem("debug");
      } catch (error) {
      }
      if (!r && typeof process !== "undefined" && "env" in process) {
        r = process.env.DEBUG;
      }
      return r;
    }
    function localstorage() {
      try {
        return localStorage;
      } catch (error) {
      }
    }
    module.exports = require_common()(exports);
    var { formatters } = module.exports;
    formatters.j = function(v) {
      try {
        return JSON.stringify(v);
      } catch (error) {
        return "[UnexpectedJSONParseError]: " + error.message;
      }
    };
  }
});

// node_modules/event-iterator/lib/event-iterator.js
var require_event_iterator = __commonJS({
  "node_modules/event-iterator/lib/event-iterator.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var EventQueue = class {
      constructor() {
        this.pullQueue = [];
        this.pushQueue = [];
        this.eventHandlers = {};
        this.isPaused = false;
        this.isStopped = false;
      }
      push(value) {
        if (this.isStopped)
          return;
        const resolution = { value, done: false };
        if (this.pullQueue.length) {
          const placeholder = this.pullQueue.shift();
          if (placeholder)
            placeholder.resolve(resolution);
        } else {
          this.pushQueue.push(Promise.resolve(resolution));
          if (this.highWaterMark !== void 0 && this.pushQueue.length >= this.highWaterMark && !this.isPaused) {
            this.isPaused = true;
            if (this.eventHandlers.highWater) {
              this.eventHandlers.highWater();
            } else if (console) {
              console.warn(`EventIterator queue reached ${this.pushQueue.length} items`);
            }
          }
        }
      }
      stop() {
        if (this.isStopped)
          return;
        this.isStopped = true;
        this.remove();
        for (const placeholder of this.pullQueue) {
          placeholder.resolve({ value: void 0, done: true });
        }
        this.pullQueue.length = 0;
      }
      fail(error) {
        if (this.isStopped)
          return;
        this.isStopped = true;
        this.remove();
        if (this.pullQueue.length) {
          for (const placeholder of this.pullQueue) {
            placeholder.reject(error);
          }
          this.pullQueue.length = 0;
        } else {
          const rejection = Promise.reject(error);
          rejection.catch(() => {
          });
          this.pushQueue.push(rejection);
        }
      }
      remove() {
        Promise.resolve().then(() => {
          if (this.removeCallback)
            this.removeCallback();
        });
      }
      [Symbol.asyncIterator]() {
        return {
          next: (value) => {
            const result = this.pushQueue.shift();
            if (result) {
              if (this.lowWaterMark !== void 0 && this.pushQueue.length <= this.lowWaterMark && this.isPaused) {
                this.isPaused = false;
                if (this.eventHandlers.lowWater) {
                  this.eventHandlers.lowWater();
                }
              }
              return result;
            } else if (this.isStopped) {
              return Promise.resolve({ value: void 0, done: true });
            } else {
              return new Promise((resolve, reject) => {
                this.pullQueue.push({ resolve, reject });
              });
            }
          },
          return: () => {
            this.isStopped = true;
            this.pushQueue.length = 0;
            this.remove();
            return Promise.resolve({ value: void 0, done: true });
          }
        };
      }
    };
    var EventIterator2 = class {
      constructor(listen, { highWaterMark = 100, lowWaterMark = 1 } = {}) {
        const queue = new EventQueue();
        queue.highWaterMark = highWaterMark;
        queue.lowWaterMark = lowWaterMark;
        queue.removeCallback = listen({
          push: (value) => queue.push(value),
          stop: () => queue.stop(),
          fail: (error) => queue.fail(error),
          on: (event, fn) => {
            queue.eventHandlers[event] = fn;
          }
        }) || (() => {
        });
        this[Symbol.asyncIterator] = () => queue[Symbol.asyncIterator]();
        Object.freeze(this);
      }
    };
    exports.EventIterator = EventIterator2;
    exports.default = EventIterator2;
  }
});

// node_modules/event-iterator/lib/dom.js
var require_dom = __commonJS({
  "node_modules/event-iterator/lib/dom.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var event_iterator_1 = require_event_iterator();
    exports.EventIterator = event_iterator_1.EventIterator;
    function subscribe(event, options, evOptions) {
      return new event_iterator_1.EventIterator(({ push }) => {
        this.addEventListener(event, push, options);
        return () => this.removeEventListener(event, push, options);
      }, evOptions);
    }
    exports.subscribe = subscribe;
    exports.default = event_iterator_1.EventIterator;
  }
});

// node_modules/is-electron/index.js
var require_is_electron = __commonJS({
  "node_modules/is-electron/index.js"(exports, module) {
    function isElectron2() {
      if (typeof window !== "undefined" && typeof window.process === "object" && window.process.type === "renderer") {
        return true;
      }
      if (typeof process !== "undefined" && typeof process.versions === "object" && !!process.versions.electron) {
        return true;
      }
      if (typeof navigator === "object" && typeof navigator.userAgent === "string" && navigator.userAgent.indexOf("Electron") >= 0) {
        return true;
      }
      return false;
    }
    module.exports = isElectron2;
  }
});

// node_modules/@libp2p/interface-transport/dist/src/index.js
var symbol = Symbol.for("@libp2p/transport");
var FaultTolerance;
(function(FaultTolerance2) {
  FaultTolerance2[FaultTolerance2["FATAL_ALL"] = 0] = "FATAL_ALL";
  FaultTolerance2[FaultTolerance2["NO_FATAL"] = 1] = "NO_FATAL";
})(FaultTolerance || (FaultTolerance = {}));

// node_modules/@libp2p/interfaces/dist/src/errors.js
var AbortError = class _AbortError extends Error {
  code;
  type;
  constructor(message = "The operation was aborted") {
    super(message);
    this.code = _AbortError.code;
    this.type = _AbortError.type;
  }
  static code = "ABORT_ERR";
  static type = "aborted";
};

// node_modules/@libp2p/websockets/node_modules/@libp2p/logger/dist/src/index.js
var import_debug = __toESM(require_browser(), 1);

// node_modules/@libp2p/websockets/node_modules/multiformats/vendor/base-x.js
function base(ALPHABET, name3) {
  if (ALPHABET.length >= 255) {
    throw new TypeError("Alphabet too long");
  }
  var BASE_MAP = new Uint8Array(256);
  for (var j = 0; j < BASE_MAP.length; j++) {
    BASE_MAP[j] = 255;
  }
  for (var i = 0; i < ALPHABET.length; i++) {
    var x = ALPHABET.charAt(i);
    var xc = x.charCodeAt(0);
    if (BASE_MAP[xc] !== 255) {
      throw new TypeError(x + " is ambiguous");
    }
    BASE_MAP[xc] = i;
  }
  var BASE = ALPHABET.length;
  var LEADER = ALPHABET.charAt(0);
  var FACTOR = Math.log(BASE) / Math.log(256);
  var iFACTOR = Math.log(256) / Math.log(BASE);
  function encode11(source) {
    if (source instanceof Uint8Array)
      ;
    else if (ArrayBuffer.isView(source)) {
      source = new Uint8Array(source.buffer, source.byteOffset, source.byteLength);
    } else if (Array.isArray(source)) {
      source = Uint8Array.from(source);
    }
    if (!(source instanceof Uint8Array)) {
      throw new TypeError("Expected Uint8Array");
    }
    if (source.length === 0) {
      return "";
    }
    var zeroes = 0;
    var length3 = 0;
    var pbegin = 0;
    var pend = source.length;
    while (pbegin !== pend && source[pbegin] === 0) {
      pbegin++;
      zeroes++;
    }
    var size = (pend - pbegin) * iFACTOR + 1 >>> 0;
    var b58 = new Uint8Array(size);
    while (pbegin !== pend) {
      var carry = source[pbegin];
      var i2 = 0;
      for (var it1 = size - 1; (carry !== 0 || i2 < length3) && it1 !== -1; it1--, i2++) {
        carry += 256 * b58[it1] >>> 0;
        b58[it1] = carry % BASE >>> 0;
        carry = carry / BASE >>> 0;
      }
      if (carry !== 0) {
        throw new Error("Non-zero carry");
      }
      length3 = i2;
      pbegin++;
    }
    var it2 = size - length3;
    while (it2 !== size && b58[it2] === 0) {
      it2++;
    }
    var str = LEADER.repeat(zeroes);
    for (; it2 < size; ++it2) {
      str += ALPHABET.charAt(b58[it2]);
    }
    return str;
  }
  function decodeUnsafe(source) {
    if (typeof source !== "string") {
      throw new TypeError("Expected String");
    }
    if (source.length === 0) {
      return new Uint8Array();
    }
    var psz = 0;
    if (source[psz] === " ") {
      return;
    }
    var zeroes = 0;
    var length3 = 0;
    while (source[psz] === LEADER) {
      zeroes++;
      psz++;
    }
    var size = (source.length - psz) * FACTOR + 1 >>> 0;
    var b256 = new Uint8Array(size);
    while (source[psz]) {
      var carry = BASE_MAP[source.charCodeAt(psz)];
      if (carry === 255) {
        return;
      }
      var i2 = 0;
      for (var it3 = size - 1; (carry !== 0 || i2 < length3) && it3 !== -1; it3--, i2++) {
        carry += BASE * b256[it3] >>> 0;
        b256[it3] = carry % 256 >>> 0;
        carry = carry / 256 >>> 0;
      }
      if (carry !== 0) {
        throw new Error("Non-zero carry");
      }
      length3 = i2;
      psz++;
    }
    if (source[psz] === " ") {
      return;
    }
    var it4 = size - length3;
    while (it4 !== size && b256[it4] === 0) {
      it4++;
    }
    var vch = new Uint8Array(zeroes + (size - it4));
    var j2 = zeroes;
    while (it4 !== size) {
      vch[j2++] = b256[it4++];
    }
    return vch;
  }
  function decode13(string3) {
    var buffer = decodeUnsafe(string3);
    if (buffer) {
      return buffer;
    }
    throw new Error(`Non-${name3} character`);
  }
  return {
    encode: encode11,
    decodeUnsafe,
    decode: decode13
  };
}
var src = base;
var _brrp__multiformats_scope_baseX = src;
var base_x_default = _brrp__multiformats_scope_baseX;

// node_modules/@libp2p/websockets/node_modules/multiformats/src/bytes.js
var empty = new Uint8Array(0);
var coerce = (o) => {
  if (o instanceof Uint8Array && o.constructor.name === "Uint8Array")
    return o;
  if (o instanceof ArrayBuffer)
    return new Uint8Array(o);
  if (ArrayBuffer.isView(o)) {
    return new Uint8Array(o.buffer, o.byteOffset, o.byteLength);
  }
  throw new Error("Unknown type, must be binary type");
};

// node_modules/@libp2p/websockets/node_modules/multiformats/src/bases/base.js
var Encoder = class {
  /**
   * @param {Base} name
   * @param {Prefix} prefix
   * @param {(bytes:Uint8Array) => string} baseEncode
   */
  constructor(name3, prefix, baseEncode) {
    this.name = name3;
    this.prefix = prefix;
    this.baseEncode = baseEncode;
  }
  /**
   * @param {Uint8Array} bytes
   * @returns {API.Multibase<Prefix>}
   */
  encode(bytes) {
    if (bytes instanceof Uint8Array) {
      return `${this.prefix}${this.baseEncode(bytes)}`;
    } else {
      throw Error("Unknown type, must be binary type");
    }
  }
};
var Decoder = class {
  /**
   * @param {Base} name
   * @param {Prefix} prefix
   * @param {(text:string) => Uint8Array} baseDecode
   */
  constructor(name3, prefix, baseDecode) {
    this.name = name3;
    this.prefix = prefix;
    if (prefix.codePointAt(0) === void 0) {
      throw new Error("Invalid prefix character");
    }
    this.prefixCodePoint = /** @type {number} */
    prefix.codePointAt(0);
    this.baseDecode = baseDecode;
  }
  /**
   * @param {string} text
   */
  decode(text) {
    if (typeof text === "string") {
      if (text.codePointAt(0) !== this.prefixCodePoint) {
        throw Error(`Unable to decode multibase string ${JSON.stringify(text)}, ${this.name} decoder only supports inputs prefixed with ${this.prefix}`);
      }
      return this.baseDecode(text.slice(this.prefix.length));
    } else {
      throw Error("Can only multibase decode strings");
    }
  }
  /**
   * @template {string} OtherPrefix
   * @param {API.UnibaseDecoder<OtherPrefix>|ComposedDecoder<OtherPrefix>} decoder
   * @returns {ComposedDecoder<Prefix|OtherPrefix>}
   */
  or(decoder) {
    return or(this, decoder);
  }
};
var ComposedDecoder = class {
  /**
   * @param {Decoders<Prefix>} decoders
   */
  constructor(decoders2) {
    this.decoders = decoders2;
  }
  /**
   * @template {string} OtherPrefix
   * @param {API.UnibaseDecoder<OtherPrefix>|ComposedDecoder<OtherPrefix>} decoder
   * @returns {ComposedDecoder<Prefix|OtherPrefix>}
   */
  or(decoder) {
    return or(this, decoder);
  }
  /**
   * @param {string} input
   * @returns {Uint8Array}
   */
  decode(input) {
    const prefix = (
      /** @type {Prefix} */
      input[0]
    );
    const decoder = this.decoders[prefix];
    if (decoder) {
      return decoder.decode(input);
    } else {
      throw RangeError(`Unable to decode multibase string ${JSON.stringify(input)}, only inputs prefixed with ${Object.keys(this.decoders)} are supported`);
    }
  }
};
var or = (left, right) => new ComposedDecoder(
  /** @type {Decoders<L|R>} */
  {
    ...left.decoders || { [
      /** @type API.UnibaseDecoder<L> */
      left.prefix
    ]: left },
    ...right.decoders || { [
      /** @type API.UnibaseDecoder<R> */
      right.prefix
    ]: right }
  }
);
var Codec = class {
  /**
   * @param {Base} name
   * @param {Prefix} prefix
   * @param {(bytes:Uint8Array) => string} baseEncode
   * @param {(text:string) => Uint8Array} baseDecode
   */
  constructor(name3, prefix, baseEncode, baseDecode) {
    this.name = name3;
    this.prefix = prefix;
    this.baseEncode = baseEncode;
    this.baseDecode = baseDecode;
    this.encoder = new Encoder(name3, prefix, baseEncode);
    this.decoder = new Decoder(name3, prefix, baseDecode);
  }
  /**
   * @param {Uint8Array} input
   */
  encode(input) {
    return this.encoder.encode(input);
  }
  /**
   * @param {string} input
   */
  decode(input) {
    return this.decoder.decode(input);
  }
};
var from = ({ name: name3, prefix, encode: encode11, decode: decode13 }) => new Codec(name3, prefix, encode11, decode13);
var baseX = ({ prefix, name: name3, alphabet: alphabet3 }) => {
  const { encode: encode11, decode: decode13 } = base_x_default(alphabet3, name3);
  return from({
    prefix,
    name: name3,
    encode: encode11,
    /**
     * @param {string} text
     */
    decode: (text) => coerce(decode13(text))
  });
};
var decode = (string3, alphabet3, bitsPerChar, name3) => {
  const codes2 = {};
  for (let i = 0; i < alphabet3.length; ++i) {
    codes2[alphabet3[i]] = i;
  }
  let end = string3.length;
  while (string3[end - 1] === "=") {
    --end;
  }
  const out = new Uint8Array(end * bitsPerChar / 8 | 0);
  let bits = 0;
  let buffer = 0;
  let written = 0;
  for (let i = 0; i < end; ++i) {
    const value = codes2[string3[i]];
    if (value === void 0) {
      throw new SyntaxError(`Non-${name3} character`);
    }
    buffer = buffer << bitsPerChar | value;
    bits += bitsPerChar;
    if (bits >= 8) {
      bits -= 8;
      out[written++] = 255 & buffer >> bits;
    }
  }
  if (bits >= bitsPerChar || 255 & buffer << 8 - bits) {
    throw new SyntaxError("Unexpected end of data");
  }
  return out;
};
var encode = (data, alphabet3, bitsPerChar) => {
  const pad = alphabet3[alphabet3.length - 1] === "=";
  const mask = (1 << bitsPerChar) - 1;
  let out = "";
  let bits = 0;
  let buffer = 0;
  for (let i = 0; i < data.length; ++i) {
    buffer = buffer << 8 | data[i];
    bits += 8;
    while (bits > bitsPerChar) {
      bits -= bitsPerChar;
      out += alphabet3[mask & buffer >> bits];
    }
  }
  if (bits) {
    out += alphabet3[mask & buffer << bitsPerChar - bits];
  }
  if (pad) {
    while (out.length * bitsPerChar & 7) {
      out += "=";
    }
  }
  return out;
};
var rfc4648 = ({ name: name3, prefix, bitsPerChar, alphabet: alphabet3 }) => {
  return from({
    prefix,
    name: name3,
    encode(input) {
      return encode(input, alphabet3, bitsPerChar);
    },
    decode(input) {
      return decode(input, alphabet3, bitsPerChar, name3);
    }
  });
};

// node_modules/@libp2p/websockets/node_modules/multiformats/src/bases/base58.js
var base58btc = baseX({
  name: "base58btc",
  prefix: "z",
  alphabet: "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"
});
var base58flickr = baseX({
  name: "base58flickr",
  prefix: "Z",
  alphabet: "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ"
});

// node_modules/@libp2p/websockets/node_modules/multiformats/src/bases/base32.js
var base32 = rfc4648({
  prefix: "b",
  name: "base32",
  alphabet: "abcdefghijklmnopqrstuvwxyz234567",
  bitsPerChar: 5
});
var base32upper = rfc4648({
  prefix: "B",
  name: "base32upper",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567",
  bitsPerChar: 5
});
var base32pad = rfc4648({
  prefix: "c",
  name: "base32pad",
  alphabet: "abcdefghijklmnopqrstuvwxyz234567=",
  bitsPerChar: 5
});
var base32padupper = rfc4648({
  prefix: "C",
  name: "base32padupper",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567=",
  bitsPerChar: 5
});
var base32hex = rfc4648({
  prefix: "v",
  name: "base32hex",
  alphabet: "0123456789abcdefghijklmnopqrstuv",
  bitsPerChar: 5
});
var base32hexupper = rfc4648({
  prefix: "V",
  name: "base32hexupper",
  alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV",
  bitsPerChar: 5
});
var base32hexpad = rfc4648({
  prefix: "t",
  name: "base32hexpad",
  alphabet: "0123456789abcdefghijklmnopqrstuv=",
  bitsPerChar: 5
});
var base32hexpadupper = rfc4648({
  prefix: "T",
  name: "base32hexpadupper",
  alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV=",
  bitsPerChar: 5
});
var base32z = rfc4648({
  prefix: "h",
  name: "base32z",
  alphabet: "ybndrfg8ejkmcpqxot1uwisza345h769",
  bitsPerChar: 5
});

// node_modules/@libp2p/websockets/node_modules/multiformats/src/bases/base64.js
var base64 = rfc4648({
  prefix: "m",
  name: "base64",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
  bitsPerChar: 6
});
var base64pad = rfc4648({
  prefix: "M",
  name: "base64pad",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
  bitsPerChar: 6
});
var base64url = rfc4648({
  prefix: "u",
  name: "base64url",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_",
  bitsPerChar: 6
});
var base64urlpad = rfc4648({
  prefix: "U",
  name: "base64urlpad",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=",
  bitsPerChar: 6
});

// node_modules/@libp2p/websockets/node_modules/@libp2p/logger/dist/src/index.js
import_debug.default.formatters.b = (v) => {
  return v == null ? "undefined" : base58btc.baseEncode(v);
};
import_debug.default.formatters.t = (v) => {
  return v == null ? "undefined" : base32.baseEncode(v);
};
import_debug.default.formatters.m = (v) => {
  return v == null ? "undefined" : base64.baseEncode(v);
};
import_debug.default.formatters.p = (v) => {
  return v == null ? "undefined" : v.toString();
};
import_debug.default.formatters.c = (v) => {
  return v == null ? "undefined" : v.toString();
};
import_debug.default.formatters.k = (v) => {
  return v == null ? "undefined" : v.toString();
};
import_debug.default.formatters.a = (v) => {
  return v == null ? "undefined" : v.toString();
};
function createDisabledLogger(namespace) {
  const logger2 = () => {
  };
  logger2.enabled = false;
  logger2.color = "";
  logger2.diff = 0;
  logger2.log = () => {
  };
  logger2.namespace = namespace;
  logger2.destroy = () => true;
  logger2.extend = () => logger2;
  return logger2;
}
function logger(name3) {
  let trace = createDisabledLogger(`${name3}:trace`);
  if (import_debug.default.enabled(`${name3}:trace`) && import_debug.default.names.map((r) => r.toString()).find((n) => n.includes(":trace")) != null) {
    trace = (0, import_debug.default)(`${name3}:trace`);
  }
  return Object.assign((0, import_debug.default)(name3), {
    error: (0, import_debug.default)(`${name3}:error`),
    trace
  });
}

// node_modules/@multiformats/multiaddr/node_modules/@libp2p/interface/dist/src/errors.js
var CodeError = class extends Error {
  code;
  props;
  constructor(message, code3, props) {
    super(message);
    this.code = code3;
    this.name = props?.name ?? "CodeError";
    this.props = props ?? {};
  }
};

// node_modules/@multiformats/multiaddr/node_modules/multiformats/dist/src/bases/base58.js
var base58_exports = {};
__export(base58_exports, {
  base58btc: () => base58btc2,
  base58flickr: () => base58flickr2
});

// node_modules/@multiformats/multiaddr/node_modules/multiformats/dist/src/bytes.js
var empty2 = new Uint8Array(0);
function equals(aa, bb) {
  if (aa === bb)
    return true;
  if (aa.byteLength !== bb.byteLength) {
    return false;
  }
  for (let ii = 0; ii < aa.byteLength; ii++) {
    if (aa[ii] !== bb[ii]) {
      return false;
    }
  }
  return true;
}
function coerce2(o) {
  if (o instanceof Uint8Array && o.constructor.name === "Uint8Array")
    return o;
  if (o instanceof ArrayBuffer)
    return new Uint8Array(o);
  if (ArrayBuffer.isView(o)) {
    return new Uint8Array(o.buffer, o.byteOffset, o.byteLength);
  }
  throw new Error("Unknown type, must be binary type");
}
function fromString(str) {
  return new TextEncoder().encode(str);
}
function toString(b) {
  return new TextDecoder().decode(b);
}

// node_modules/@multiformats/multiaddr/node_modules/multiformats/dist/src/vendor/base-x.js
function base2(ALPHABET, name3) {
  if (ALPHABET.length >= 255) {
    throw new TypeError("Alphabet too long");
  }
  var BASE_MAP = new Uint8Array(256);
  for (var j = 0; j < BASE_MAP.length; j++) {
    BASE_MAP[j] = 255;
  }
  for (var i = 0; i < ALPHABET.length; i++) {
    var x = ALPHABET.charAt(i);
    var xc = x.charCodeAt(0);
    if (BASE_MAP[xc] !== 255) {
      throw new TypeError(x + " is ambiguous");
    }
    BASE_MAP[xc] = i;
  }
  var BASE = ALPHABET.length;
  var LEADER = ALPHABET.charAt(0);
  var FACTOR = Math.log(BASE) / Math.log(256);
  var iFACTOR = Math.log(256) / Math.log(BASE);
  function encode11(source) {
    if (source instanceof Uint8Array)
      ;
    else if (ArrayBuffer.isView(source)) {
      source = new Uint8Array(source.buffer, source.byteOffset, source.byteLength);
    } else if (Array.isArray(source)) {
      source = Uint8Array.from(source);
    }
    if (!(source instanceof Uint8Array)) {
      throw new TypeError("Expected Uint8Array");
    }
    if (source.length === 0) {
      return "";
    }
    var zeroes = 0;
    var length3 = 0;
    var pbegin = 0;
    var pend = source.length;
    while (pbegin !== pend && source[pbegin] === 0) {
      pbegin++;
      zeroes++;
    }
    var size = (pend - pbegin) * iFACTOR + 1 >>> 0;
    var b58 = new Uint8Array(size);
    while (pbegin !== pend) {
      var carry = source[pbegin];
      var i2 = 0;
      for (var it1 = size - 1; (carry !== 0 || i2 < length3) && it1 !== -1; it1--, i2++) {
        carry += 256 * b58[it1] >>> 0;
        b58[it1] = carry % BASE >>> 0;
        carry = carry / BASE >>> 0;
      }
      if (carry !== 0) {
        throw new Error("Non-zero carry");
      }
      length3 = i2;
      pbegin++;
    }
    var it2 = size - length3;
    while (it2 !== size && b58[it2] === 0) {
      it2++;
    }
    var str = LEADER.repeat(zeroes);
    for (; it2 < size; ++it2) {
      str += ALPHABET.charAt(b58[it2]);
    }
    return str;
  }
  function decodeUnsafe(source) {
    if (typeof source !== "string") {
      throw new TypeError("Expected String");
    }
    if (source.length === 0) {
      return new Uint8Array();
    }
    var psz = 0;
    if (source[psz] === " ") {
      return;
    }
    var zeroes = 0;
    var length3 = 0;
    while (source[psz] === LEADER) {
      zeroes++;
      psz++;
    }
    var size = (source.length - psz) * FACTOR + 1 >>> 0;
    var b256 = new Uint8Array(size);
    while (source[psz]) {
      var carry = BASE_MAP[source.charCodeAt(psz)];
      if (carry === 255) {
        return;
      }
      var i2 = 0;
      for (var it3 = size - 1; (carry !== 0 || i2 < length3) && it3 !== -1; it3--, i2++) {
        carry += BASE * b256[it3] >>> 0;
        b256[it3] = carry % 256 >>> 0;
        carry = carry / 256 >>> 0;
      }
      if (carry !== 0) {
        throw new Error("Non-zero carry");
      }
      length3 = i2;
      psz++;
    }
    if (source[psz] === " ") {
      return;
    }
    var it4 = size - length3;
    while (it4 !== size && b256[it4] === 0) {
      it4++;
    }
    var vch = new Uint8Array(zeroes + (size - it4));
    var j2 = zeroes;
    while (it4 !== size) {
      vch[j2++] = b256[it4++];
    }
    return vch;
  }
  function decode13(string3) {
    var buffer = decodeUnsafe(string3);
    if (buffer) {
      return buffer;
    }
    throw new Error(`Non-${name3} character`);
  }
  return {
    encode: encode11,
    decodeUnsafe,
    decode: decode13
  };
}
var src2 = base2;
var _brrp__multiformats_scope_baseX2 = src2;
var base_x_default2 = _brrp__multiformats_scope_baseX2;

// node_modules/@multiformats/multiaddr/node_modules/multiformats/dist/src/bases/base.js
var Encoder2 = class {
  name;
  prefix;
  baseEncode;
  constructor(name3, prefix, baseEncode) {
    this.name = name3;
    this.prefix = prefix;
    this.baseEncode = baseEncode;
  }
  encode(bytes) {
    if (bytes instanceof Uint8Array) {
      return `${this.prefix}${this.baseEncode(bytes)}`;
    } else {
      throw Error("Unknown type, must be binary type");
    }
  }
};
var Decoder2 = class {
  name;
  prefix;
  baseDecode;
  prefixCodePoint;
  constructor(name3, prefix, baseDecode) {
    this.name = name3;
    this.prefix = prefix;
    if (prefix.codePointAt(0) === void 0) {
      throw new Error("Invalid prefix character");
    }
    this.prefixCodePoint = prefix.codePointAt(0);
    this.baseDecode = baseDecode;
  }
  decode(text) {
    if (typeof text === "string") {
      if (text.codePointAt(0) !== this.prefixCodePoint) {
        throw Error(`Unable to decode multibase string ${JSON.stringify(text)}, ${this.name} decoder only supports inputs prefixed with ${this.prefix}`);
      }
      return this.baseDecode(text.slice(this.prefix.length));
    } else {
      throw Error("Can only multibase decode strings");
    }
  }
  or(decoder) {
    return or2(this, decoder);
  }
};
var ComposedDecoder2 = class {
  decoders;
  constructor(decoders2) {
    this.decoders = decoders2;
  }
  or(decoder) {
    return or2(this, decoder);
  }
  decode(input) {
    const prefix = input[0];
    const decoder = this.decoders[prefix];
    if (decoder != null) {
      return decoder.decode(input);
    } else {
      throw RangeError(`Unable to decode multibase string ${JSON.stringify(input)}, only inputs prefixed with ${Object.keys(this.decoders)} are supported`);
    }
  }
};
function or2(left, right) {
  return new ComposedDecoder2({
    ...left.decoders ?? { [left.prefix]: left },
    ...right.decoders ?? { [right.prefix]: right }
  });
}
var Codec2 = class {
  name;
  prefix;
  baseEncode;
  baseDecode;
  encoder;
  decoder;
  constructor(name3, prefix, baseEncode, baseDecode) {
    this.name = name3;
    this.prefix = prefix;
    this.baseEncode = baseEncode;
    this.baseDecode = baseDecode;
    this.encoder = new Encoder2(name3, prefix, baseEncode);
    this.decoder = new Decoder2(name3, prefix, baseDecode);
  }
  encode(input) {
    return this.encoder.encode(input);
  }
  decode(input) {
    return this.decoder.decode(input);
  }
};
function from2({ name: name3, prefix, encode: encode11, decode: decode13 }) {
  return new Codec2(name3, prefix, encode11, decode13);
}
function baseX2({ name: name3, prefix, alphabet: alphabet3 }) {
  const { encode: encode11, decode: decode13 } = base_x_default2(alphabet3, name3);
  return from2({
    prefix,
    name: name3,
    encode: encode11,
    decode: (text) => coerce2(decode13(text))
  });
}
function decode2(string3, alphabet3, bitsPerChar, name3) {
  const codes2 = {};
  for (let i = 0; i < alphabet3.length; ++i) {
    codes2[alphabet3[i]] = i;
  }
  let end = string3.length;
  while (string3[end - 1] === "=") {
    --end;
  }
  const out = new Uint8Array(end * bitsPerChar / 8 | 0);
  let bits = 0;
  let buffer = 0;
  let written = 0;
  for (let i = 0; i < end; ++i) {
    const value = codes2[string3[i]];
    if (value === void 0) {
      throw new SyntaxError(`Non-${name3} character`);
    }
    buffer = buffer << bitsPerChar | value;
    bits += bitsPerChar;
    if (bits >= 8) {
      bits -= 8;
      out[written++] = 255 & buffer >> bits;
    }
  }
  if (bits >= bitsPerChar || (255 & buffer << 8 - bits) !== 0) {
    throw new SyntaxError("Unexpected end of data");
  }
  return out;
}
function encode2(data, alphabet3, bitsPerChar) {
  const pad = alphabet3[alphabet3.length - 1] === "=";
  const mask = (1 << bitsPerChar) - 1;
  let out = "";
  let bits = 0;
  let buffer = 0;
  for (let i = 0; i < data.length; ++i) {
    buffer = buffer << 8 | data[i];
    bits += 8;
    while (bits > bitsPerChar) {
      bits -= bitsPerChar;
      out += alphabet3[mask & buffer >> bits];
    }
  }
  if (bits !== 0) {
    out += alphabet3[mask & buffer << bitsPerChar - bits];
  }
  if (pad) {
    while ((out.length * bitsPerChar & 7) !== 0) {
      out += "=";
    }
  }
  return out;
}
function rfc46482({ name: name3, prefix, bitsPerChar, alphabet: alphabet3 }) {
  return from2({
    prefix,
    name: name3,
    encode(input) {
      return encode2(input, alphabet3, bitsPerChar);
    },
    decode(input) {
      return decode2(input, alphabet3, bitsPerChar, name3);
    }
  });
}

// node_modules/@multiformats/multiaddr/node_modules/multiformats/dist/src/bases/base58.js
var base58btc2 = baseX2({
  name: "base58btc",
  prefix: "z",
  alphabet: "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"
});
var base58flickr2 = baseX2({
  name: "base58flickr",
  prefix: "Z",
  alphabet: "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ"
});

// node_modules/@multiformats/multiaddr/node_modules/multiformats/dist/src/bases/base32.js
var base32_exports = {};
__export(base32_exports, {
  base32: () => base322,
  base32hex: () => base32hex2,
  base32hexpad: () => base32hexpad2,
  base32hexpadupper: () => base32hexpadupper2,
  base32hexupper: () => base32hexupper2,
  base32pad: () => base32pad2,
  base32padupper: () => base32padupper2,
  base32upper: () => base32upper2,
  base32z: () => base32z2
});
var base322 = rfc46482({
  prefix: "b",
  name: "base32",
  alphabet: "abcdefghijklmnopqrstuvwxyz234567",
  bitsPerChar: 5
});
var base32upper2 = rfc46482({
  prefix: "B",
  name: "base32upper",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567",
  bitsPerChar: 5
});
var base32pad2 = rfc46482({
  prefix: "c",
  name: "base32pad",
  alphabet: "abcdefghijklmnopqrstuvwxyz234567=",
  bitsPerChar: 5
});
var base32padupper2 = rfc46482({
  prefix: "C",
  name: "base32padupper",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567=",
  bitsPerChar: 5
});
var base32hex2 = rfc46482({
  prefix: "v",
  name: "base32hex",
  alphabet: "0123456789abcdefghijklmnopqrstuv",
  bitsPerChar: 5
});
var base32hexupper2 = rfc46482({
  prefix: "V",
  name: "base32hexupper",
  alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV",
  bitsPerChar: 5
});
var base32hexpad2 = rfc46482({
  prefix: "t",
  name: "base32hexpad",
  alphabet: "0123456789abcdefghijklmnopqrstuv=",
  bitsPerChar: 5
});
var base32hexpadupper2 = rfc46482({
  prefix: "T",
  name: "base32hexpadupper",
  alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV=",
  bitsPerChar: 5
});
var base32z2 = rfc46482({
  prefix: "h",
  name: "base32z",
  alphabet: "ybndrfg8ejkmcpqxot1uwisza345h769",
  bitsPerChar: 5
});

// node_modules/@multiformats/multiaddr/node_modules/multiformats/dist/src/vendor/varint.js
var encode_1 = encode3;
var MSB = 128;
var REST = 127;
var MSBALL = ~REST;
var INT = Math.pow(2, 31);
function encode3(num, out, offset) {
  out = out || [];
  offset = offset || 0;
  var oldOffset = offset;
  while (num >= INT) {
    out[offset++] = num & 255 | MSB;
    num /= 128;
  }
  while (num & MSBALL) {
    out[offset++] = num & 255 | MSB;
    num >>>= 7;
  }
  out[offset] = num | 0;
  encode3.bytes = offset - oldOffset + 1;
  return out;
}
var decode3 = read;
var MSB$1 = 128;
var REST$1 = 127;
function read(buf, offset) {
  var res = 0, offset = offset || 0, shift = 0, counter = offset, b, l = buf.length;
  do {
    if (counter >= l) {
      read.bytes = 0;
      throw new RangeError("Could not decode varint");
    }
    b = buf[counter++];
    res += shift < 28 ? (b & REST$1) << shift : (b & REST$1) * Math.pow(2, shift);
    shift += 7;
  } while (b >= MSB$1);
  read.bytes = counter - offset;
  return res;
}
var N1 = Math.pow(2, 7);
var N2 = Math.pow(2, 14);
var N3 = Math.pow(2, 21);
var N4 = Math.pow(2, 28);
var N5 = Math.pow(2, 35);
var N6 = Math.pow(2, 42);
var N7 = Math.pow(2, 49);
var N8 = Math.pow(2, 56);
var N9 = Math.pow(2, 63);
var length = function(value) {
  return value < N1 ? 1 : value < N2 ? 2 : value < N3 ? 3 : value < N4 ? 4 : value < N5 ? 5 : value < N6 ? 6 : value < N7 ? 7 : value < N8 ? 8 : value < N9 ? 9 : 10;
};
var varint = {
  encode: encode_1,
  decode: decode3,
  encodingLength: length
};
var _brrp_varint = varint;
var varint_default = _brrp_varint;

// node_modules/@multiformats/multiaddr/node_modules/multiformats/dist/src/varint.js
function decode4(data, offset = 0) {
  const code3 = varint_default.decode(data, offset);
  return [code3, varint_default.decode.bytes];
}
function encodeTo(int, target, offset = 0) {
  varint_default.encode(int, target, offset);
  return target;
}
function encodingLength(int) {
  return varint_default.encodingLength(int);
}

// node_modules/@multiformats/multiaddr/node_modules/multiformats/dist/src/hashes/digest.js
function create(code3, digest3) {
  const size = digest3.byteLength;
  const sizeOffset = encodingLength(code3);
  const digestOffset = sizeOffset + encodingLength(size);
  const bytes = new Uint8Array(digestOffset + size);
  encodeTo(code3, bytes, 0);
  encodeTo(size, bytes, sizeOffset);
  bytes.set(digest3, digestOffset);
  return new Digest(code3, size, digest3, bytes);
}
function decode5(multihash) {
  const bytes = coerce2(multihash);
  const [code3, sizeOffset] = decode4(bytes);
  const [size, digestOffset] = decode4(bytes.subarray(sizeOffset));
  const digest3 = bytes.subarray(sizeOffset + digestOffset);
  if (digest3.byteLength !== size) {
    throw new Error("Incorrect length");
  }
  return new Digest(code3, size, digest3, bytes);
}
function equals2(a, b) {
  if (a === b) {
    return true;
  } else {
    const data = b;
    return a.code === data.code && a.size === data.size && data.bytes instanceof Uint8Array && equals(a.bytes, data.bytes);
  }
}
var Digest = class {
  code;
  size;
  digest;
  bytes;
  /**
   * Creates a multihash digest.
   */
  constructor(code3, size, digest3, bytes) {
    this.code = code3;
    this.size = size;
    this.digest = digest3;
    this.bytes = bytes;
  }
};

// node_modules/@multiformats/multiaddr/node_modules/multiformats/dist/src/cid.js
function format(link, base5) {
  const { bytes, version } = link;
  switch (version) {
    case 0:
      return toStringV0(bytes, baseCache(link), base5 ?? base58btc2.encoder);
    default:
      return toStringV1(bytes, baseCache(link), base5 ?? base322.encoder);
  }
}
var cache = /* @__PURE__ */ new WeakMap();
function baseCache(cid) {
  const baseCache3 = cache.get(cid);
  if (baseCache3 == null) {
    const baseCache4 = /* @__PURE__ */ new Map();
    cache.set(cid, baseCache4);
    return baseCache4;
  }
  return baseCache3;
}
var CID = class _CID {
  code;
  version;
  multihash;
  bytes;
  "/";
  /**
   * @param version - Version of the CID
   * @param code - Code of the codec content is encoded in, see https://github.com/multiformats/multicodec/blob/master/table.csv
   * @param multihash - (Multi)hash of the of the content.
   */
  constructor(version, code3, multihash, bytes) {
    this.code = code3;
    this.version = version;
    this.multihash = multihash;
    this.bytes = bytes;
    this["/"] = bytes;
  }
  /**
   * Signalling `cid.asCID === cid` has been replaced with `cid['/'] === cid.bytes`
   * please either use `CID.asCID(cid)` or switch to new signalling mechanism
   *
   * @deprecated
   */
  get asCID() {
    return this;
  }
  // ArrayBufferView
  get byteOffset() {
    return this.bytes.byteOffset;
  }
  // ArrayBufferView
  get byteLength() {
    return this.bytes.byteLength;
  }
  toV0() {
    switch (this.version) {
      case 0: {
        return this;
      }
      case 1: {
        const { code: code3, multihash } = this;
        if (code3 !== DAG_PB_CODE) {
          throw new Error("Cannot convert a non dag-pb CID to CIDv0");
        }
        if (multihash.code !== SHA_256_CODE) {
          throw new Error("Cannot convert non sha2-256 multihash CID to CIDv0");
        }
        return _CID.createV0(multihash);
      }
      default: {
        throw Error(`Can not convert CID version ${this.version} to version 0. This is a bug please report`);
      }
    }
  }
  toV1() {
    switch (this.version) {
      case 0: {
        const { code: code3, digest: digest3 } = this.multihash;
        const multihash = create(code3, digest3);
        return _CID.createV1(this.code, multihash);
      }
      case 1: {
        return this;
      }
      default: {
        throw Error(`Can not convert CID version ${this.version} to version 1. This is a bug please report`);
      }
    }
  }
  equals(other) {
    return _CID.equals(this, other);
  }
  static equals(self2, other) {
    const unknown = other;
    return unknown != null && self2.code === unknown.code && self2.version === unknown.version && equals2(self2.multihash, unknown.multihash);
  }
  toString(base5) {
    return format(this, base5);
  }
  toJSON() {
    return { "/": format(this) };
  }
  link() {
    return this;
  }
  [Symbol.toStringTag] = "CID";
  // Legacy
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return `CID(${this.toString()})`;
  }
  /**
   * Takes any input `value` and returns a `CID` instance if it was
   * a `CID` otherwise returns `null`. If `value` is instanceof `CID`
   * it will return value back. If `value` is not instance of this CID
   * class, but is compatible CID it will return new instance of this
   * `CID` class. Otherwise returns null.
   *
   * This allows two different incompatible versions of CID library to
   * co-exist and interop as long as binary interface is compatible.
   */
  static asCID(input) {
    if (input == null) {
      return null;
    }
    const value = input;
    if (value instanceof _CID) {
      return value;
    } else if (value["/"] != null && value["/"] === value.bytes || value.asCID === value) {
      const { version, code: code3, multihash, bytes } = value;
      return new _CID(version, code3, multihash, bytes ?? encodeCID(version, code3, multihash.bytes));
    } else if (value[cidSymbol] === true) {
      const { version, multihash, code: code3 } = value;
      const digest3 = decode5(multihash);
      return _CID.create(version, code3, digest3);
    } else {
      return null;
    }
  }
  /**
   * @param version - Version of the CID
   * @param code - Code of the codec content is encoded in, see https://github.com/multiformats/multicodec/blob/master/table.csv
   * @param digest - (Multi)hash of the of the content.
   */
  static create(version, code3, digest3) {
    if (typeof code3 !== "number") {
      throw new Error("String codecs are no longer supported");
    }
    if (!(digest3.bytes instanceof Uint8Array)) {
      throw new Error("Invalid digest");
    }
    switch (version) {
      case 0: {
        if (code3 !== DAG_PB_CODE) {
          throw new Error(`Version 0 CID must use dag-pb (code: ${DAG_PB_CODE}) block encoding`);
        } else {
          return new _CID(version, code3, digest3, digest3.bytes);
        }
      }
      case 1: {
        const bytes = encodeCID(version, code3, digest3.bytes);
        return new _CID(version, code3, digest3, bytes);
      }
      default: {
        throw new Error("Invalid version");
      }
    }
  }
  /**
   * Simplified version of `create` for CIDv0.
   */
  static createV0(digest3) {
    return _CID.create(0, DAG_PB_CODE, digest3);
  }
  /**
   * Simplified version of `create` for CIDv1.
   *
   * @param code - Content encoding format code.
   * @param digest - Multihash of the content.
   */
  static createV1(code3, digest3) {
    return _CID.create(1, code3, digest3);
  }
  /**
   * Decoded a CID from its binary representation. The byte array must contain
   * only the CID with no additional bytes.
   *
   * An error will be thrown if the bytes provided do not contain a valid
   * binary representation of a CID.
   */
  static decode(bytes) {
    const [cid, remainder] = _CID.decodeFirst(bytes);
    if (remainder.length !== 0) {
      throw new Error("Incorrect length");
    }
    return cid;
  }
  /**
   * Decoded a CID from its binary representation at the beginning of a byte
   * array.
   *
   * Returns an array with the first element containing the CID and the second
   * element containing the remainder of the original byte array. The remainder
   * will be a zero-length byte array if the provided bytes only contained a
   * binary CID representation.
   */
  static decodeFirst(bytes) {
    const specs = _CID.inspectBytes(bytes);
    const prefixSize = specs.size - specs.multihashSize;
    const multihashBytes = coerce2(bytes.subarray(prefixSize, prefixSize + specs.multihashSize));
    if (multihashBytes.byteLength !== specs.multihashSize) {
      throw new Error("Incorrect length");
    }
    const digestBytes = multihashBytes.subarray(specs.multihashSize - specs.digestSize);
    const digest3 = new Digest(specs.multihashCode, specs.digestSize, digestBytes, multihashBytes);
    const cid = specs.version === 0 ? _CID.createV0(digest3) : _CID.createV1(specs.codec, digest3);
    return [cid, bytes.subarray(specs.size)];
  }
  /**
   * Inspect the initial bytes of a CID to determine its properties.
   *
   * Involves decoding up to 4 varints. Typically this will require only 4 to 6
   * bytes but for larger multicodec code values and larger multihash digest
   * lengths these varints can be quite large. It is recommended that at least
   * 10 bytes be made available in the `initialBytes` argument for a complete
   * inspection.
   */
  static inspectBytes(initialBytes) {
    let offset = 0;
    const next = () => {
      const [i, length3] = decode4(initialBytes.subarray(offset));
      offset += length3;
      return i;
    };
    let version = next();
    let codec = DAG_PB_CODE;
    if (version === 18) {
      version = 0;
      offset = 0;
    } else {
      codec = next();
    }
    if (version !== 0 && version !== 1) {
      throw new RangeError(`Invalid CID version ${version}`);
    }
    const prefixSize = offset;
    const multihashCode = next();
    const digestSize = next();
    const size = offset + digestSize;
    const multihashSize = size - prefixSize;
    return { version, codec, multihashCode, digestSize, multihashSize, size };
  }
  /**
   * Takes cid in a string representation and creates an instance. If `base`
   * decoder is not provided will use a default from the configuration. It will
   * throw an error if encoding of the CID is not compatible with supplied (or
   * a default decoder).
   */
  static parse(source, base5) {
    const [prefix, bytes] = parseCIDtoBytes(source, base5);
    const cid = _CID.decode(bytes);
    if (cid.version === 0 && source[0] !== "Q") {
      throw Error("Version 0 CID string must not include multibase prefix");
    }
    baseCache(cid).set(prefix, source);
    return cid;
  }
};
function parseCIDtoBytes(source, base5) {
  switch (source[0]) {
    case "Q": {
      const decoder = base5 ?? base58btc2;
      return [
        base58btc2.prefix,
        decoder.decode(`${base58btc2.prefix}${source}`)
      ];
    }
    case base58btc2.prefix: {
      const decoder = base5 ?? base58btc2;
      return [base58btc2.prefix, decoder.decode(source)];
    }
    case base322.prefix: {
      const decoder = base5 ?? base322;
      return [base322.prefix, decoder.decode(source)];
    }
    default: {
      if (base5 == null) {
        throw Error("To parse non base32 or base58btc encoded CID multibase decoder must be provided");
      }
      return [source[0], base5.decode(source)];
    }
  }
}
function toStringV0(bytes, cache3, base5) {
  const { prefix } = base5;
  if (prefix !== base58btc2.prefix) {
    throw Error(`Cannot string encode V0 in ${base5.name} encoding`);
  }
  const cid = cache3.get(prefix);
  if (cid == null) {
    const cid2 = base5.encode(bytes).slice(1);
    cache3.set(prefix, cid2);
    return cid2;
  } else {
    return cid;
  }
}
function toStringV1(bytes, cache3, base5) {
  const { prefix } = base5;
  const cid = cache3.get(prefix);
  if (cid == null) {
    const cid2 = base5.encode(bytes);
    cache3.set(prefix, cid2);
    return cid2;
  } else {
    return cid;
  }
}
var DAG_PB_CODE = 112;
var SHA_256_CODE = 18;
function encodeCID(version, code3, multihash) {
  const codeOffset = encodingLength(version);
  const hashOffset = codeOffset + encodingLength(code3);
  const bytes = new Uint8Array(hashOffset + multihash.byteLength);
  encodeTo(version, bytes, 0);
  encodeTo(code3, bytes, codeOffset);
  bytes.set(multihash, hashOffset);
  return bytes;
}
var cidSymbol = Symbol.for("@ipld/js-cid/CID");

// node_modules/@multiformats/multiaddr/node_modules/uint8arrays/dist/src/equals.js
function equals3(a, b) {
  if (a === b) {
    return true;
  }
  if (a.byteLength !== b.byteLength) {
    return false;
  }
  for (let i = 0; i < a.byteLength; i++) {
    if (a[i] !== b[i]) {
      return false;
    }
  }
  return true;
}

// node_modules/@multiformats/multiaddr/node_modules/multiformats/dist/src/bases/base10.js
var base10_exports = {};
__export(base10_exports, {
  base10: () => base10
});
var base10 = baseX2({
  prefix: "9",
  name: "base10",
  alphabet: "0123456789"
});

// node_modules/@multiformats/multiaddr/node_modules/multiformats/dist/src/bases/base16.js
var base16_exports = {};
__export(base16_exports, {
  base16: () => base16,
  base16upper: () => base16upper
});
var base16 = rfc46482({
  prefix: "f",
  name: "base16",
  alphabet: "0123456789abcdef",
  bitsPerChar: 4
});
var base16upper = rfc46482({
  prefix: "F",
  name: "base16upper",
  alphabet: "0123456789ABCDEF",
  bitsPerChar: 4
});

// node_modules/@multiformats/multiaddr/node_modules/multiformats/dist/src/bases/base2.js
var base2_exports = {};
__export(base2_exports, {
  base2: () => base22
});
var base22 = rfc46482({
  prefix: "0",
  name: "base2",
  alphabet: "01",
  bitsPerChar: 1
});

// node_modules/@multiformats/multiaddr/node_modules/multiformats/dist/src/bases/base256emoji.js
var base256emoji_exports = {};
__export(base256emoji_exports, {
  base256emoji: () => base256emoji
});
var alphabet = Array.from("\u{1F680}\u{1FA90}\u2604\u{1F6F0}\u{1F30C}\u{1F311}\u{1F312}\u{1F313}\u{1F314}\u{1F315}\u{1F316}\u{1F317}\u{1F318}\u{1F30D}\u{1F30F}\u{1F30E}\u{1F409}\u2600\u{1F4BB}\u{1F5A5}\u{1F4BE}\u{1F4BF}\u{1F602}\u2764\u{1F60D}\u{1F923}\u{1F60A}\u{1F64F}\u{1F495}\u{1F62D}\u{1F618}\u{1F44D}\u{1F605}\u{1F44F}\u{1F601}\u{1F525}\u{1F970}\u{1F494}\u{1F496}\u{1F499}\u{1F622}\u{1F914}\u{1F606}\u{1F644}\u{1F4AA}\u{1F609}\u263A\u{1F44C}\u{1F917}\u{1F49C}\u{1F614}\u{1F60E}\u{1F607}\u{1F339}\u{1F926}\u{1F389}\u{1F49E}\u270C\u2728\u{1F937}\u{1F631}\u{1F60C}\u{1F338}\u{1F64C}\u{1F60B}\u{1F497}\u{1F49A}\u{1F60F}\u{1F49B}\u{1F642}\u{1F493}\u{1F929}\u{1F604}\u{1F600}\u{1F5A4}\u{1F603}\u{1F4AF}\u{1F648}\u{1F447}\u{1F3B6}\u{1F612}\u{1F92D}\u2763\u{1F61C}\u{1F48B}\u{1F440}\u{1F62A}\u{1F611}\u{1F4A5}\u{1F64B}\u{1F61E}\u{1F629}\u{1F621}\u{1F92A}\u{1F44A}\u{1F973}\u{1F625}\u{1F924}\u{1F449}\u{1F483}\u{1F633}\u270B\u{1F61A}\u{1F61D}\u{1F634}\u{1F31F}\u{1F62C}\u{1F643}\u{1F340}\u{1F337}\u{1F63B}\u{1F613}\u2B50\u2705\u{1F97A}\u{1F308}\u{1F608}\u{1F918}\u{1F4A6}\u2714\u{1F623}\u{1F3C3}\u{1F490}\u2639\u{1F38A}\u{1F498}\u{1F620}\u261D\u{1F615}\u{1F33A}\u{1F382}\u{1F33B}\u{1F610}\u{1F595}\u{1F49D}\u{1F64A}\u{1F639}\u{1F5E3}\u{1F4AB}\u{1F480}\u{1F451}\u{1F3B5}\u{1F91E}\u{1F61B}\u{1F534}\u{1F624}\u{1F33C}\u{1F62B}\u26BD\u{1F919}\u2615\u{1F3C6}\u{1F92B}\u{1F448}\u{1F62E}\u{1F646}\u{1F37B}\u{1F343}\u{1F436}\u{1F481}\u{1F632}\u{1F33F}\u{1F9E1}\u{1F381}\u26A1\u{1F31E}\u{1F388}\u274C\u270A\u{1F44B}\u{1F630}\u{1F928}\u{1F636}\u{1F91D}\u{1F6B6}\u{1F4B0}\u{1F353}\u{1F4A2}\u{1F91F}\u{1F641}\u{1F6A8}\u{1F4A8}\u{1F92C}\u2708\u{1F380}\u{1F37A}\u{1F913}\u{1F619}\u{1F49F}\u{1F331}\u{1F616}\u{1F476}\u{1F974}\u25B6\u27A1\u2753\u{1F48E}\u{1F4B8}\u2B07\u{1F628}\u{1F31A}\u{1F98B}\u{1F637}\u{1F57A}\u26A0\u{1F645}\u{1F61F}\u{1F635}\u{1F44E}\u{1F932}\u{1F920}\u{1F927}\u{1F4CC}\u{1F535}\u{1F485}\u{1F9D0}\u{1F43E}\u{1F352}\u{1F617}\u{1F911}\u{1F30A}\u{1F92F}\u{1F437}\u260E\u{1F4A7}\u{1F62F}\u{1F486}\u{1F446}\u{1F3A4}\u{1F647}\u{1F351}\u2744\u{1F334}\u{1F4A3}\u{1F438}\u{1F48C}\u{1F4CD}\u{1F940}\u{1F922}\u{1F445}\u{1F4A1}\u{1F4A9}\u{1F450}\u{1F4F8}\u{1F47B}\u{1F910}\u{1F92E}\u{1F3BC}\u{1F975}\u{1F6A9}\u{1F34E}\u{1F34A}\u{1F47C}\u{1F48D}\u{1F4E3}\u{1F942}");
var alphabetBytesToChars = alphabet.reduce((p, c, i) => {
  p[i] = c;
  return p;
}, []);
var alphabetCharsToBytes = alphabet.reduce((p, c, i) => {
  p[c.codePointAt(0)] = i;
  return p;
}, []);
function encode4(data) {
  return data.reduce((p, c) => {
    p += alphabetBytesToChars[c];
    return p;
  }, "");
}
function decode6(str) {
  const byts = [];
  for (const char of str) {
    const byt = alphabetCharsToBytes[char.codePointAt(0)];
    if (byt === void 0) {
      throw new Error(`Non-base256emoji character: ${char}`);
    }
    byts.push(byt);
  }
  return new Uint8Array(byts);
}
var base256emoji = from2({
  prefix: "\u{1F680}",
  name: "base256emoji",
  encode: encode4,
  decode: decode6
});

// node_modules/@multiformats/multiaddr/node_modules/multiformats/dist/src/bases/base36.js
var base36_exports = {};
__export(base36_exports, {
  base36: () => base36,
  base36upper: () => base36upper
});
var base36 = baseX2({
  prefix: "k",
  name: "base36",
  alphabet: "0123456789abcdefghijklmnopqrstuvwxyz"
});
var base36upper = baseX2({
  prefix: "K",
  name: "base36upper",
  alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"
});

// node_modules/@multiformats/multiaddr/node_modules/multiformats/dist/src/bases/base64.js
var base64_exports = {};
__export(base64_exports, {
  base64: () => base642,
  base64pad: () => base64pad2,
  base64url: () => base64url2,
  base64urlpad: () => base64urlpad2
});
var base642 = rfc46482({
  prefix: "m",
  name: "base64",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
  bitsPerChar: 6
});
var base64pad2 = rfc46482({
  prefix: "M",
  name: "base64pad",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
  bitsPerChar: 6
});
var base64url2 = rfc46482({
  prefix: "u",
  name: "base64url",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_",
  bitsPerChar: 6
});
var base64urlpad2 = rfc46482({
  prefix: "U",
  name: "base64urlpad",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=",
  bitsPerChar: 6
});

// node_modules/@multiformats/multiaddr/node_modules/multiformats/dist/src/bases/base8.js
var base8_exports = {};
__export(base8_exports, {
  base8: () => base8
});
var base8 = rfc46482({
  prefix: "7",
  name: "base8",
  alphabet: "01234567",
  bitsPerChar: 3
});

// node_modules/@multiformats/multiaddr/node_modules/multiformats/dist/src/bases/identity.js
var identity_exports = {};
__export(identity_exports, {
  identity: () => identity
});
var identity = from2({
  prefix: "\0",
  name: "identity",
  encode: (buf) => toString(buf),
  decode: (str) => fromString(str)
});

// node_modules/@multiformats/multiaddr/node_modules/multiformats/dist/src/codecs/json.js
var textEncoder = new TextEncoder();
var textDecoder = new TextDecoder();

// node_modules/@multiformats/multiaddr/node_modules/multiformats/dist/src/hashes/identity.js
var identity_exports2 = {};
__export(identity_exports2, {
  identity: () => identity2
});
var code = 0;
var name = "identity";
var encode5 = coerce2;
function digest(input) {
  return create(code, encode5(input));
}
var identity2 = { code, name, encode: encode5, digest };

// node_modules/@multiformats/multiaddr/node_modules/multiformats/dist/src/hashes/sha2-browser.js
var sha2_browser_exports = {};
__export(sha2_browser_exports, {
  sha256: () => sha256,
  sha512: () => sha512
});

// node_modules/@multiformats/multiaddr/node_modules/multiformats/dist/src/hashes/hasher.js
function from3({ name: name3, code: code3, encode: encode11 }) {
  return new Hasher(name3, code3, encode11);
}
var Hasher = class {
  name;
  code;
  encode;
  constructor(name3, code3, encode11) {
    this.name = name3;
    this.code = code3;
    this.encode = encode11;
  }
  digest(input) {
    if (input instanceof Uint8Array) {
      const result = this.encode(input);
      return result instanceof Uint8Array ? create(this.code, result) : result.then((digest3) => create(this.code, digest3));
    } else {
      throw Error("Unknown type, must be binary type");
    }
  }
};

// node_modules/@multiformats/multiaddr/node_modules/multiformats/dist/src/hashes/sha2-browser.js
function sha(name3) {
  return async (data) => new Uint8Array(await crypto.subtle.digest(name3, data));
}
var sha256 = from3({
  name: "sha2-256",
  code: 18,
  encode: sha("SHA-256")
});
var sha512 = from3({
  name: "sha2-512",
  code: 19,
  encode: sha("SHA-512")
});

// node_modules/@multiformats/multiaddr/node_modules/multiformats/dist/src/basics.js
var bases = { ...identity_exports, ...base2_exports, ...base8_exports, ...base10_exports, ...base16_exports, ...base32_exports, ...base36_exports, ...base58_exports, ...base64_exports, ...base256emoji_exports };
var hashes = { ...sha2_browser_exports, ...identity_exports2 };

// node_modules/@multiformats/multiaddr/node_modules/uint8arrays/dist/src/alloc.js
function allocUnsafe(size = 0) {
  return new Uint8Array(size);
}

// node_modules/@multiformats/multiaddr/node_modules/uint8arrays/dist/src/util/bases.js
function createCodec(name3, prefix, encode11, decode13) {
  return {
    name: name3,
    prefix,
    encoder: {
      name: name3,
      prefix,
      encode: encode11
    },
    decoder: {
      decode: decode13
    }
  };
}
var string = createCodec("utf8", "u", (buf) => {
  const decoder = new TextDecoder("utf8");
  return "u" + decoder.decode(buf);
}, (str) => {
  const encoder = new TextEncoder();
  return encoder.encode(str.substring(1));
});
var ascii = createCodec("ascii", "a", (buf) => {
  let string3 = "a";
  for (let i = 0; i < buf.length; i++) {
    string3 += String.fromCharCode(buf[i]);
  }
  return string3;
}, (str) => {
  str = str.substring(1);
  const buf = allocUnsafe(str.length);
  for (let i = 0; i < str.length; i++) {
    buf[i] = str.charCodeAt(i);
  }
  return buf;
});
var BASES = {
  utf8: string,
  "utf-8": string,
  hex: bases.base16,
  latin1: ascii,
  ascii,
  binary: ascii,
  ...bases
};
var bases_default = BASES;

// node_modules/@multiformats/multiaddr/node_modules/uint8arrays/dist/src/to-string.js
function toString2(array, encoding = "utf8") {
  const base5 = bases_default[encoding];
  if (base5 == null) {
    throw new Error(`Unsupported encoding "${encoding}"`);
  }
  return base5.encoder.encode(array).substring(1);
}

// node_modules/uint8-varint/node_modules/uint8arrays/dist/src/alloc.js
function allocUnsafe2(size = 0) {
  return new Uint8Array(size);
}

// node_modules/uint8-varint/dist/src/index.js
var N12 = Math.pow(2, 7);
var N22 = Math.pow(2, 14);
var N32 = Math.pow(2, 21);
var N42 = Math.pow(2, 28);
var N52 = Math.pow(2, 35);
var N62 = Math.pow(2, 42);
var N72 = Math.pow(2, 49);
var MSB2 = 128;
var REST2 = 127;
function encodingLength2(value) {
  if (value < N12) {
    return 1;
  }
  if (value < N22) {
    return 2;
  }
  if (value < N32) {
    return 3;
  }
  if (value < N42) {
    return 4;
  }
  if (value < N52) {
    return 5;
  }
  if (value < N62) {
    return 6;
  }
  if (value < N72) {
    return 7;
  }
  if (Number.MAX_SAFE_INTEGER != null && value > Number.MAX_SAFE_INTEGER) {
    throw new RangeError("Could not encode varint");
  }
  return 8;
}
function encodeUint8Array(value, buf, offset = 0) {
  switch (encodingLength2(value)) {
    case 8: {
      buf[offset++] = value & 255 | MSB2;
      value /= 128;
    }
    case 7: {
      buf[offset++] = value & 255 | MSB2;
      value /= 128;
    }
    case 6: {
      buf[offset++] = value & 255 | MSB2;
      value /= 128;
    }
    case 5: {
      buf[offset++] = value & 255 | MSB2;
      value /= 128;
    }
    case 4: {
      buf[offset++] = value & 255 | MSB2;
      value >>>= 7;
    }
    case 3: {
      buf[offset++] = value & 255 | MSB2;
      value >>>= 7;
    }
    case 2: {
      buf[offset++] = value & 255 | MSB2;
      value >>>= 7;
    }
    case 1: {
      buf[offset++] = value & 255;
      value >>>= 7;
      break;
    }
    default:
      throw new Error("unreachable");
  }
  return buf;
}
function encodeUint8ArrayList(value, buf, offset = 0) {
  switch (encodingLength2(value)) {
    case 8: {
      buf.set(offset++, value & 255 | MSB2);
      value /= 128;
    }
    case 7: {
      buf.set(offset++, value & 255 | MSB2);
      value /= 128;
    }
    case 6: {
      buf.set(offset++, value & 255 | MSB2);
      value /= 128;
    }
    case 5: {
      buf.set(offset++, value & 255 | MSB2);
      value /= 128;
    }
    case 4: {
      buf.set(offset++, value & 255 | MSB2);
      value >>>= 7;
    }
    case 3: {
      buf.set(offset++, value & 255 | MSB2);
      value >>>= 7;
    }
    case 2: {
      buf.set(offset++, value & 255 | MSB2);
      value >>>= 7;
    }
    case 1: {
      buf.set(offset++, value & 255);
      value >>>= 7;
      break;
    }
    default:
      throw new Error("unreachable");
  }
  return buf;
}
function decodeUint8Array(buf, offset) {
  let b = buf[offset];
  let res = 0;
  res += b & REST2;
  if (b < MSB2) {
    return res;
  }
  b = buf[offset + 1];
  res += (b & REST2) << 7;
  if (b < MSB2) {
    return res;
  }
  b = buf[offset + 2];
  res += (b & REST2) << 14;
  if (b < MSB2) {
    return res;
  }
  b = buf[offset + 3];
  res += (b & REST2) << 21;
  if (b < MSB2) {
    return res;
  }
  b = buf[offset + 4];
  res += (b & REST2) * N42;
  if (b < MSB2) {
    return res;
  }
  b = buf[offset + 5];
  res += (b & REST2) * N52;
  if (b < MSB2) {
    return res;
  }
  b = buf[offset + 6];
  res += (b & REST2) * N62;
  if (b < MSB2) {
    return res;
  }
  b = buf[offset + 7];
  res += (b & REST2) * N72;
  if (b < MSB2) {
    return res;
  }
  throw new RangeError("Could not decode varint");
}
function decodeUint8ArrayList(buf, offset) {
  let b = buf.get(offset);
  let res = 0;
  res += b & REST2;
  if (b < MSB2) {
    return res;
  }
  b = buf.get(offset + 1);
  res += (b & REST2) << 7;
  if (b < MSB2) {
    return res;
  }
  b = buf.get(offset + 2);
  res += (b & REST2) << 14;
  if (b < MSB2) {
    return res;
  }
  b = buf.get(offset + 3);
  res += (b & REST2) << 21;
  if (b < MSB2) {
    return res;
  }
  b = buf.get(offset + 4);
  res += (b & REST2) * N42;
  if (b < MSB2) {
    return res;
  }
  b = buf.get(offset + 5);
  res += (b & REST2) * N52;
  if (b < MSB2) {
    return res;
  }
  b = buf.get(offset + 6);
  res += (b & REST2) * N62;
  if (b < MSB2) {
    return res;
  }
  b = buf.get(offset + 7);
  res += (b & REST2) * N72;
  if (b < MSB2) {
    return res;
  }
  throw new RangeError("Could not decode varint");
}
function encode6(value, buf, offset = 0) {
  if (buf == null) {
    buf = allocUnsafe2(encodingLength2(value));
  }
  if (buf instanceof Uint8Array) {
    return encodeUint8Array(value, buf, offset);
  } else {
    return encodeUint8ArrayList(value, buf, offset);
  }
}
function decode7(buf, offset = 0) {
  if (buf instanceof Uint8Array) {
    return decodeUint8Array(buf, offset);
  } else {
    return decodeUint8ArrayList(buf, offset);
  }
}

// node_modules/@multiformats/multiaddr/node_modules/uint8arrays/dist/src/util/as-uint8array.js
function asUint8Array(buf) {
  return buf;
}

// node_modules/@multiformats/multiaddr/node_modules/uint8arrays/dist/src/concat.js
function concat(arrays, length3) {
  if (length3 == null) {
    length3 = arrays.reduce((acc, curr) => acc + curr.length, 0);
  }
  const output = allocUnsafe(length3);
  let offset = 0;
  for (const arr of arrays) {
    output.set(arr, offset);
    offset += arr.length;
  }
  return asUint8Array(output);
}

// node_modules/@chainsafe/is-ip/lib/parser.js
var Parser = class {
  index = 0;
  input = "";
  new(input) {
    this.index = 0;
    this.input = input;
    return this;
  }
  /** Run a parser, and restore the pre-parse state if it fails. */
  readAtomically(fn) {
    const index = this.index;
    const result = fn();
    if (result === void 0) {
      this.index = index;
    }
    return result;
  }
  /** Run a parser, but fail if the entire input wasn't consumed. Doesn't run atomically. */
  parseWith(fn) {
    const result = fn();
    if (this.index !== this.input.length) {
      return void 0;
    }
    return result;
  }
  /** Peek the next character from the input */
  peekChar() {
    if (this.index >= this.input.length) {
      return void 0;
    }
    return this.input[this.index];
  }
  /** Read the next character from the input */
  readChar() {
    if (this.index >= this.input.length) {
      return void 0;
    }
    return this.input[this.index++];
  }
  /** Read the next character from the input if it matches the target. */
  readGivenChar(target) {
    return this.readAtomically(() => {
      const char = this.readChar();
      if (char !== target) {
        return void 0;
      }
      return char;
    });
  }
  /**
   * Helper for reading separators in an indexed loop. Reads the separator
   * character iff index > 0, then runs the parser. When used in a loop,
   * the separator character will only be read on index > 0 (see
   * readIPv4Addr for an example)
   */
  readSeparator(sep, index, inner) {
    return this.readAtomically(() => {
      if (index > 0) {
        if (this.readGivenChar(sep) === void 0) {
          return void 0;
        }
      }
      return inner();
    });
  }
  /**
   * Read a number off the front of the input in the given radix, stopping
   * at the first non-digit character or eof. Fails if the number has more
   * digits than max_digits or if there is no number.
   */
  readNumber(radix, maxDigits, allowZeroPrefix, maxBytes) {
    return this.readAtomically(() => {
      let result = 0;
      let digitCount = 0;
      const leadingChar = this.peekChar();
      if (leadingChar === void 0) {
        return void 0;
      }
      const hasLeadingZero = leadingChar === "0";
      const maxValue = 2 ** (8 * maxBytes) - 1;
      while (true) {
        const digit = this.readAtomically(() => {
          const char = this.readChar();
          if (char === void 0) {
            return void 0;
          }
          const num = Number.parseInt(char, radix);
          if (Number.isNaN(num)) {
            return void 0;
          }
          return num;
        });
        if (digit === void 0) {
          break;
        }
        result *= radix;
        result += digit;
        if (result > maxValue) {
          return void 0;
        }
        digitCount += 1;
        if (maxDigits !== void 0) {
          if (digitCount > maxDigits) {
            return void 0;
          }
        }
      }
      if (digitCount === 0) {
        return void 0;
      } else if (!allowZeroPrefix && hasLeadingZero && digitCount > 1) {
        return void 0;
      } else {
        return result;
      }
    });
  }
  /** Read an IPv4 address. */
  readIPv4Addr() {
    return this.readAtomically(() => {
      const out = new Uint8Array(4);
      for (let i = 0; i < out.length; i++) {
        const ix = this.readSeparator(".", i, () => this.readNumber(10, 3, false, 1));
        if (ix === void 0) {
          return void 0;
        }
        out[i] = ix;
      }
      return out;
    });
  }
  /** Read an IPv6 Address. */
  readIPv6Addr() {
    const readGroups = (groups) => {
      for (let i = 0; i < groups.length / 2; i++) {
        const ix = i * 2;
        if (i < groups.length - 3) {
          const ipv4 = this.readSeparator(":", i, () => this.readIPv4Addr());
          if (ipv4 !== void 0) {
            groups[ix] = ipv4[0];
            groups[ix + 1] = ipv4[1];
            groups[ix + 2] = ipv4[2];
            groups[ix + 3] = ipv4[3];
            return [ix + 4, true];
          }
        }
        const group = this.readSeparator(":", i, () => this.readNumber(16, 4, true, 2));
        if (group === void 0) {
          return [ix, false];
        }
        groups[ix] = group >> 8;
        groups[ix + 1] = group & 255;
      }
      return [groups.length, false];
    };
    return this.readAtomically(() => {
      const head = new Uint8Array(16);
      const [headSize, headIp4] = readGroups(head);
      if (headSize === 16) {
        return head;
      }
      if (headIp4) {
        return void 0;
      }
      if (this.readGivenChar(":") === void 0) {
        return void 0;
      }
      if (this.readGivenChar(":") === void 0) {
        return void 0;
      }
      const tail = new Uint8Array(14);
      const limit = 16 - (headSize + 2);
      const [tailSize] = readGroups(tail.subarray(0, limit));
      head.set(tail.subarray(0, tailSize), 16 - tailSize);
      return head;
    });
  }
  /** Read an IP Address, either IPv4 or IPv6. */
  readIPAddr() {
    return this.readIPv4Addr() ?? this.readIPv6Addr();
  }
};

// node_modules/@chainsafe/is-ip/lib/parse.js
var MAX_IPV6_LENGTH = 45;
var MAX_IPV4_LENGTH = 15;
var parser = new Parser();
function parseIPv4(input) {
  if (input.length > MAX_IPV4_LENGTH) {
    return void 0;
  }
  return parser.new(input).parseWith(() => parser.readIPv4Addr());
}
function parseIPv6(input) {
  if (input.includes("%")) {
    input = input.split("%")[0];
  }
  if (input.length > MAX_IPV6_LENGTH) {
    return void 0;
  }
  return parser.new(input).parseWith(() => parser.readIPv6Addr());
}
function parseIP(input) {
  if (input.includes("%")) {
    input = input.split("%")[0];
  }
  if (input.length > MAX_IPV6_LENGTH) {
    return void 0;
  }
  return parser.new(input).parseWith(() => parser.readIPAddr());
}

// node_modules/@chainsafe/netmask/dist/src/ip.js
var maxIPv6Octet = parseInt("0xFFFF", 16);
var ipv4Prefix = new Uint8Array([
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  255,
  255
]);

// node_modules/@multiformats/multiaddr/node_modules/uint8arrays/dist/src/from-string.js
function fromString2(string3, encoding = "utf8") {
  const base5 = bases_default[encoding];
  if (base5 == null) {
    throw new Error(`Unsupported encoding "${encoding}"`);
  }
  return base5.decoder.decode(`${base5.prefix}${string3}`);
}

// node_modules/@chainsafe/is-ip/lib/is-ip.js
function isIPv4(input) {
  return Boolean(parseIPv4(input));
}
function isIPv6(input) {
  return Boolean(parseIPv6(input));
}
function isIP(input) {
  return Boolean(parseIP(input));
}

// node_modules/@multiformats/multiaddr/dist/src/ip.js
var isV4 = isIPv4;
var isV6 = isIPv6;
var toBytes = function(ip) {
  let offset = 0;
  ip = ip.toString().trim();
  if (isV4(ip)) {
    const bytes = new Uint8Array(offset + 4);
    ip.split(/\./g).forEach((byte) => {
      bytes[offset++] = parseInt(byte, 10) & 255;
    });
    return bytes;
  }
  if (isV6(ip)) {
    const sections = ip.split(":", 8);
    let i;
    for (i = 0; i < sections.length; i++) {
      const isv4 = isV4(sections[i]);
      let v4Buffer;
      if (isv4) {
        v4Buffer = toBytes(sections[i]);
        sections[i] = toString2(v4Buffer.slice(0, 2), "base16");
      }
      if (v4Buffer != null && ++i < 8) {
        sections.splice(i, 0, toString2(v4Buffer.slice(2, 4), "base16"));
      }
    }
    if (sections[0] === "") {
      while (sections.length < 8)
        sections.unshift("0");
    } else if (sections[sections.length - 1] === "") {
      while (sections.length < 8)
        sections.push("0");
    } else if (sections.length < 8) {
      for (i = 0; i < sections.length && sections[i] !== ""; i++)
        ;
      const argv = [i, 1];
      for (i = 9 - sections.length; i > 0; i--) {
        argv.push("0");
      }
      sections.splice.apply(sections, argv);
    }
    const bytes = new Uint8Array(offset + 16);
    for (i = 0; i < sections.length; i++) {
      const word = parseInt(sections[i], 16);
      bytes[offset++] = word >> 8 & 255;
      bytes[offset++] = word & 255;
    }
    return bytes;
  }
  throw new Error("invalid ip address");
};
var toString3 = function(buf, offset = 0, length3) {
  offset = ~~offset;
  length3 = length3 ?? buf.length - offset;
  const view = new DataView(buf.buffer);
  if (length3 === 4) {
    const result = [];
    for (let i = 0; i < length3; i++) {
      result.push(buf[offset + i]);
    }
    return result.join(".");
  }
  if (length3 === 16) {
    const result = [];
    for (let i = 0; i < length3; i += 2) {
      result.push(view.getUint16(offset + i).toString(16));
    }
    return result.join(":").replace(/(^|:)0(:0)*:0(:|$)/, "$1::$3").replace(/:{3,4}/, "::");
  }
  return "";
};

// node_modules/@multiformats/multiaddr/dist/src/protocols-table.js
var V = -1;
var names = {};
var codes = {};
var table = [
  [4, 32, "ip4"],
  [6, 16, "tcp"],
  [33, 16, "dccp"],
  [41, 128, "ip6"],
  [42, V, "ip6zone"],
  [43, 8, "ipcidr"],
  [53, V, "dns", true],
  [54, V, "dns4", true],
  [55, V, "dns6", true],
  [56, V, "dnsaddr", true],
  [132, 16, "sctp"],
  [273, 16, "udp"],
  [275, 0, "p2p-webrtc-star"],
  [276, 0, "p2p-webrtc-direct"],
  [277, 0, "p2p-stardust"],
  [280, 0, "webrtc-direct"],
  [281, 0, "webrtc"],
  [290, 0, "p2p-circuit"],
  [301, 0, "udt"],
  [302, 0, "utp"],
  [400, V, "unix", false, true],
  // `ipfs` is added before `p2p` for legacy support.
  // All text representations will default to `p2p`, but `ipfs` will
  // still be supported
  [421, V, "ipfs"],
  // `p2p` is the preferred name for 421, and is now the default
  [421, V, "p2p"],
  [443, 0, "https"],
  [444, 96, "onion"],
  [445, 296, "onion3"],
  [446, V, "garlic64"],
  [448, 0, "tls"],
  [449, V, "sni"],
  [460, 0, "quic"],
  [461, 0, "quic-v1"],
  [465, 0, "webtransport"],
  [466, V, "certhash"],
  [477, 0, "ws"],
  [478, 0, "wss"],
  [479, 0, "p2p-websocket-star"],
  [480, 0, "http"],
  [481, V, "http-path"],
  [777, V, "memory"]
];
table.forEach((row) => {
  const proto = createProtocol(...row);
  codes[proto.code] = proto;
  names[proto.name] = proto;
});
function createProtocol(code3, size, name3, resolvable, path) {
  return {
    code: code3,
    size,
    name: name3,
    resolvable: Boolean(resolvable),
    path: Boolean(path)
  };
}
function getProtocol(proto) {
  if (typeof proto === "number") {
    if (codes[proto] != null) {
      return codes[proto];
    }
    throw new Error(`no protocol with code: ${proto}`);
  } else if (typeof proto === "string") {
    if (names[proto] != null) {
      return names[proto];
    }
    throw new Error(`no protocol with name: ${proto}`);
  }
  throw new Error(`invalid protocol id type: ${typeof proto}`);
}

// node_modules/@multiformats/multiaddr/dist/src/convert.js
var ip4Protocol = getProtocol("ip4");
var ip6Protocol = getProtocol("ip6");
var ipcidrProtocol = getProtocol("ipcidr");
function convertToString(proto, buf) {
  const protocol = getProtocol(proto);
  switch (protocol.code) {
    case 4:
    case 41:
      return bytes2ip(buf);
    case 42:
      return bytes2str(buf);
    case 6:
    case 273:
    case 33:
    case 132:
      return bytes2port(buf).toString();
    case 53:
    case 54:
    case 55:
    case 56:
    case 400:
    case 449:
    case 777:
      return bytes2str(buf);
    case 421:
      return bytes2mh(buf);
    case 444:
      return bytes2onion(buf);
    case 445:
      return bytes2onion(buf);
    case 466:
      return bytes2mb(buf);
    case 481:
      return globalThis.encodeURIComponent(bytes2str(buf));
    default:
      return toString2(buf, "base16");
  }
}
function convertToBytes(proto, str) {
  const protocol = getProtocol(proto);
  switch (protocol.code) {
    case 4:
      return ip2bytes(str);
    case 41:
      return ip2bytes(str);
    case 42:
      return str2bytes(str);
    case 6:
    case 273:
    case 33:
    case 132:
      return port2bytes(parseInt(str, 10));
    case 53:
    case 54:
    case 55:
    case 56:
    case 400:
    case 449:
    case 777:
      return str2bytes(str);
    case 421:
      return mh2bytes(str);
    case 444:
      return onion2bytes(str);
    case 445:
      return onion32bytes(str);
    case 466:
      return mb2bytes(str);
    case 481:
      return str2bytes(globalThis.decodeURIComponent(str));
    default:
      return fromString2(str, "base16");
  }
}
var decoders = Object.values(bases).map((c) => c.decoder);
var anybaseDecoder = function() {
  let acc = decoders[0].or(decoders[1]);
  decoders.slice(2).forEach((d) => acc = acc.or(d));
  return acc;
}();
function ip2bytes(ipString) {
  if (!isIP(ipString)) {
    throw new Error("invalid ip address");
  }
  return toBytes(ipString);
}
function bytes2ip(ipBuff) {
  const ipString = toString3(ipBuff, 0, ipBuff.length);
  if (ipString == null) {
    throw new Error("ipBuff is required");
  }
  if (!isIP(ipString)) {
    throw new Error("invalid ip address");
  }
  return ipString;
}
function port2bytes(port) {
  const buf = new ArrayBuffer(2);
  const view = new DataView(buf);
  view.setUint16(0, port);
  return new Uint8Array(buf);
}
function bytes2port(buf) {
  const view = new DataView(buf.buffer);
  return view.getUint16(buf.byteOffset);
}
function str2bytes(str) {
  const buf = fromString2(str);
  const size = Uint8Array.from(encode6(buf.length));
  return concat([size, buf], size.length + buf.length);
}
function bytes2str(buf) {
  const size = decode7(buf);
  buf = buf.slice(encodingLength2(size));
  if (buf.length !== size) {
    throw new Error("inconsistent lengths");
  }
  return toString2(buf);
}
function mh2bytes(hash) {
  let mh;
  if (hash[0] === "Q" || hash[0] === "1") {
    mh = decode5(base58btc2.decode(`z${hash}`)).bytes;
  } else {
    mh = CID.parse(hash).multihash.bytes;
  }
  const size = Uint8Array.from(encode6(mh.length));
  return concat([size, mh], size.length + mh.length);
}
function mb2bytes(mbstr) {
  const mb = anybaseDecoder.decode(mbstr);
  const size = Uint8Array.from(encode6(mb.length));
  return concat([size, mb], size.length + mb.length);
}
function bytes2mb(buf) {
  const size = decode7(buf);
  const hash = buf.slice(encodingLength2(size));
  if (hash.length !== size) {
    throw new Error("inconsistent lengths");
  }
  return "u" + toString2(hash, "base64url");
}
function bytes2mh(buf) {
  const size = decode7(buf);
  const address = buf.slice(encodingLength2(size));
  if (address.length !== size) {
    throw new Error("inconsistent lengths");
  }
  return toString2(address, "base58btc");
}
function onion2bytes(str) {
  const addr = str.split(":");
  if (addr.length !== 2) {
    throw new Error(`failed to parse onion addr: ["'${addr.join('", "')}'"]' does not contain a port number`);
  }
  if (addr[0].length !== 16) {
    throw new Error(`failed to parse onion addr: ${addr[0]} not a Tor onion address.`);
  }
  const buf = base322.decode("b" + addr[0]);
  const port = parseInt(addr[1], 10);
  if (port < 1 || port > 65536) {
    throw new Error("Port number is not in range(1, 65536)");
  }
  const portBuf = port2bytes(port);
  return concat([buf, portBuf], buf.length + portBuf.length);
}
function onion32bytes(str) {
  const addr = str.split(":");
  if (addr.length !== 2) {
    throw new Error(`failed to parse onion addr: ["'${addr.join('", "')}'"]' does not contain a port number`);
  }
  if (addr[0].length !== 56) {
    throw new Error(`failed to parse onion addr: ${addr[0]} not a Tor onion3 address.`);
  }
  const buf = base322.decode(`b${addr[0]}`);
  const port = parseInt(addr[1], 10);
  if (port < 1 || port > 65536) {
    throw new Error("Port number is not in range(1, 65536)");
  }
  const portBuf = port2bytes(port);
  return concat([buf, portBuf], buf.length + portBuf.length);
}
function bytes2onion(buf) {
  const addrBytes = buf.slice(0, buf.length - 2);
  const portBytes = buf.slice(buf.length - 2);
  const addr = toString2(addrBytes, "base32");
  const port = bytes2port(portBytes);
  return `${addr}:${port}`;
}

// node_modules/@multiformats/multiaddr/dist/src/codec.js
function stringToMultiaddrParts(str) {
  str = cleanPath(str);
  const tuples = [];
  const stringTuples = [];
  let path = null;
  const parts = str.split("/").slice(1);
  if (parts.length === 1 && parts[0] === "") {
    return {
      bytes: new Uint8Array(),
      string: "/",
      tuples: [],
      stringTuples: [],
      path: null
    };
  }
  for (let p = 0; p < parts.length; p++) {
    const part = parts[p];
    const proto = getProtocol(part);
    if (proto.size === 0) {
      tuples.push([proto.code]);
      stringTuples.push([proto.code]);
      continue;
    }
    p++;
    if (p >= parts.length) {
      throw ParseError("invalid address: " + str);
    }
    if (proto.path === true) {
      path = cleanPath(parts.slice(p).join("/"));
      tuples.push([proto.code, convertToBytes(proto.code, path)]);
      stringTuples.push([proto.code, path]);
      break;
    }
    const bytes = convertToBytes(proto.code, parts[p]);
    tuples.push([proto.code, bytes]);
    stringTuples.push([proto.code, convertToString(proto.code, bytes)]);
  }
  return {
    string: stringTuplesToString(stringTuples),
    bytes: tuplesToBytes(tuples),
    tuples,
    stringTuples,
    path
  };
}
function bytesToMultiaddrParts(bytes) {
  const tuples = [];
  const stringTuples = [];
  let path = null;
  let i = 0;
  while (i < bytes.length) {
    const code3 = decode7(bytes, i);
    const n = encodingLength2(code3);
    const p = getProtocol(code3);
    const size = sizeForAddr(p, bytes.slice(i + n));
    if (size === 0) {
      tuples.push([code3]);
      stringTuples.push([code3]);
      i += n;
      continue;
    }
    const addr = bytes.slice(i + n, i + n + size);
    i += size + n;
    if (i > bytes.length) {
      throw ParseError("Invalid address Uint8Array: " + toString2(bytes, "base16"));
    }
    tuples.push([code3, addr]);
    const stringAddr = convertToString(code3, addr);
    stringTuples.push([code3, stringAddr]);
    if (p.path === true) {
      path = stringAddr;
      break;
    }
  }
  return {
    bytes: Uint8Array.from(bytes),
    string: stringTuplesToString(stringTuples),
    tuples,
    stringTuples,
    path
  };
}
function stringTuplesToString(tuples) {
  const parts = [];
  tuples.map((tup) => {
    const proto = getProtocol(tup[0]);
    parts.push(proto.name);
    if (tup.length > 1 && tup[1] != null) {
      parts.push(tup[1]);
    }
    return null;
  });
  return cleanPath(parts.join("/"));
}
function tuplesToBytes(tuples) {
  return concat(tuples.map((tup) => {
    const proto = getProtocol(tup[0]);
    let buf = Uint8Array.from(encode6(proto.code));
    if (tup.length > 1 && tup[1] != null) {
      buf = concat([buf, tup[1]]);
    }
    return buf;
  }));
}
function sizeForAddr(p, addr) {
  if (p.size > 0) {
    return p.size / 8;
  } else if (p.size === 0) {
    return 0;
  } else {
    const size = decode7(addr instanceof Uint8Array ? addr : Uint8Array.from(addr));
    return size + encodingLength2(size);
  }
}
function cleanPath(str) {
  return "/" + str.trim().split("/").filter((a) => a).join("/");
}
function ParseError(str) {
  return new Error("Error parsing address: " + str);
}

// node_modules/@multiformats/multiaddr/dist/src/multiaddr.js
var inspect = Symbol.for("nodejs.util.inspect.custom");
var symbol2 = Symbol.for("@multiformats/js-multiaddr/multiaddr");
var DNS_CODES = [
  getProtocol("dns").code,
  getProtocol("dns4").code,
  getProtocol("dns6").code,
  getProtocol("dnsaddr").code
];
var Multiaddr = class _Multiaddr {
  bytes;
  #string;
  #tuples;
  #stringTuples;
  #path;
  [symbol2] = true;
  constructor(addr) {
    if (addr == null) {
      addr = "";
    }
    let parts;
    if (addr instanceof Uint8Array) {
      parts = bytesToMultiaddrParts(addr);
    } else if (typeof addr === "string") {
      if (addr.length > 0 && addr.charAt(0) !== "/") {
        throw new Error(`multiaddr "${addr}" must start with a "/"`);
      }
      parts = stringToMultiaddrParts(addr);
    } else if (isMultiaddr(addr)) {
      parts = bytesToMultiaddrParts(addr.bytes);
    } else {
      throw new Error("addr must be a string, Buffer, or another Multiaddr");
    }
    this.bytes = parts.bytes;
    this.#string = parts.string;
    this.#tuples = parts.tuples;
    this.#stringTuples = parts.stringTuples;
    this.#path = parts.path;
  }
  toString() {
    return this.#string;
  }
  toJSON() {
    return this.toString();
  }
  toOptions() {
    let family;
    let transport;
    let host;
    let port;
    let zone = "";
    const tcp = getProtocol("tcp");
    const udp = getProtocol("udp");
    const ip4 = getProtocol("ip4");
    const ip6 = getProtocol("ip6");
    const dns6 = getProtocol("dns6");
    const ip6zone = getProtocol("ip6zone");
    for (const [code3, value] of this.stringTuples()) {
      if (code3 === ip6zone.code) {
        zone = `%${value ?? ""}`;
      }
      if (DNS_CODES.includes(code3)) {
        transport = tcp.name;
        port = 443;
        host = `${value ?? ""}${zone}`;
        family = code3 === dns6.code ? 6 : 4;
      }
      if (code3 === tcp.code || code3 === udp.code) {
        transport = getProtocol(code3).name;
        port = parseInt(value ?? "");
      }
      if (code3 === ip4.code || code3 === ip6.code) {
        transport = getProtocol(code3).name;
        host = `${value ?? ""}${zone}`;
        family = code3 === ip6.code ? 6 : 4;
      }
    }
    if (family == null || transport == null || host == null || port == null) {
      throw new Error('multiaddr must have a valid format: "/{ip4, ip6, dns4, dns6, dnsaddr}/{address}/{tcp, udp}/{port}".');
    }
    const opts = {
      family,
      host,
      transport,
      port
    };
    return opts;
  }
  protos() {
    return this.#tuples.map(([code3]) => Object.assign({}, getProtocol(code3)));
  }
  protoCodes() {
    return this.#tuples.map(([code3]) => code3);
  }
  protoNames() {
    return this.#tuples.map(([code3]) => getProtocol(code3).name);
  }
  tuples() {
    return this.#tuples;
  }
  stringTuples() {
    return this.#stringTuples;
  }
  encapsulate(addr) {
    addr = new _Multiaddr(addr);
    return new _Multiaddr(this.toString() + addr.toString());
  }
  decapsulate(addr) {
    const addrString = addr.toString();
    const s = this.toString();
    const i = s.lastIndexOf(addrString);
    if (i < 0) {
      throw new Error(`Address ${this.toString()} does not contain subaddress: ${addr.toString()}`);
    }
    return new _Multiaddr(s.slice(0, i));
  }
  decapsulateCode(code3) {
    const tuples = this.tuples();
    for (let i = tuples.length - 1; i >= 0; i--) {
      if (tuples[i][0] === code3) {
        return new _Multiaddr(tuplesToBytes(tuples.slice(0, i)));
      }
    }
    return this;
  }
  getPeerId() {
    try {
      let tuples = [];
      this.stringTuples().forEach(([code3, name3]) => {
        if (code3 === names.p2p.code) {
          tuples.push([code3, name3]);
        }
        if (code3 === names["p2p-circuit"].code) {
          tuples = [];
        }
      });
      const tuple = tuples.pop();
      if (tuple?.[1] != null) {
        const peerIdStr = tuple[1];
        if (peerIdStr[0] === "Q" || peerIdStr[0] === "1") {
          return toString2(base58btc2.decode(`z${peerIdStr}`), "base58btc");
        }
        return toString2(CID.parse(peerIdStr).multihash.bytes, "base58btc");
      }
      return null;
    } catch (e) {
      return null;
    }
  }
  getPath() {
    return this.#path;
  }
  equals(addr) {
    return equals3(this.bytes, addr.bytes);
  }
  async resolve(options) {
    const resolvableProto = this.protos().find((p) => p.resolvable);
    if (resolvableProto == null) {
      return [this];
    }
    const resolver = resolvers.get(resolvableProto.name);
    if (resolver == null) {
      throw new CodeError(`no available resolver for ${resolvableProto.name}`, "ERR_NO_AVAILABLE_RESOLVER");
    }
    const result = await resolver(this, options);
    return result.map((str) => multiaddr(str));
  }
  nodeAddress() {
    const options = this.toOptions();
    if (options.transport !== "tcp" && options.transport !== "udp") {
      throw new Error(`multiaddr must have a valid format - no protocol with name: "${options.transport}". Must have a valid transport protocol: "{tcp, udp}"`);
    }
    return {
      family: options.family,
      address: options.host,
      port: options.port
    };
  }
  isThinWaistAddress(addr) {
    const protos = (addr ?? this).protos();
    if (protos.length !== 2) {
      return false;
    }
    if (protos[0].code !== 4 && protos[0].code !== 41) {
      return false;
    }
    if (protos[1].code !== 6 && protos[1].code !== 273) {
      return false;
    }
    return true;
  }
  /**
   * Returns Multiaddr as a human-readable string
   * https://nodejs.org/api/util.html#utilinspectcustom
   *
   * @example
   * ```js
   * import { multiaddr } from '@multiformats/multiaddr'
   *
   * console.info(multiaddr('/ip4/127.0.0.1/tcp/4001'))
   * // 'Multiaddr(/ip4/127.0.0.1/tcp/4001)'
   * ```
   */
  [inspect]() {
    return `Multiaddr(${this.#string})`;
  }
};

// node_modules/@multiformats/multiaddr/dist/src/index.js
var resolvers = /* @__PURE__ */ new Map();
function isMultiaddr(value) {
  return Boolean(value?.[symbol2]);
}
function multiaddr(addr) {
  return new Multiaddr(addr);
}

// node_modules/@multiformats/multiaddr-to-uri/dist/src/index.js
function extractSNI(ma) {
  let sniProtoCode;
  try {
    sniProtoCode = getProtocol("sni").code;
  } catch (e) {
    return null;
  }
  for (const [proto, value] of ma) {
    if (proto === sniProtoCode && value !== void 0) {
      return value;
    }
  }
  return null;
}
function hasTLS(ma) {
  return ma.some(([proto, _]) => proto === getProtocol("tls").code);
}
function interpretNext(headProtoCode, headProtoVal, restMa) {
  const interpreter = interpreters[getProtocol(headProtoCode).name];
  if (interpreter === void 0) {
    throw new Error(`Can't interpret protocol ${getProtocol(headProtoCode).name}`);
  }
  const restVal = interpreter(headProtoVal, restMa);
  if (headProtoCode === getProtocol("ip6").code) {
    return `[${restVal}]`;
  }
  return restVal;
}
var interpreters = {
  ip4: (value, restMa) => value,
  ip6: (value, restMa) => {
    if (restMa.length === 0) {
      return value;
    }
    return `[${value}]`;
  },
  tcp: (value, restMa) => {
    const tailProto = restMa.pop();
    if (tailProto === void 0) {
      throw new Error("Unexpected end of multiaddr");
    }
    return `tcp://${interpretNext(tailProto[0], tailProto[1] ?? "", restMa)}:${value}`;
  },
  udp: (value, restMa) => {
    const tailProto = restMa.pop();
    if (tailProto === void 0) {
      throw new Error("Unexpected end of multiaddr");
    }
    return `udp://${interpretNext(tailProto[0], tailProto[1] ?? "", restMa)}:${value}`;
  },
  dnsaddr: (value, restMa) => value,
  dns4: (value, restMa) => value,
  dns6: (value, restMa) => value,
  dns: (value, restMa) => value,
  ipfs: (value, restMa) => {
    const tailProto = restMa.pop();
    if (tailProto === void 0) {
      throw new Error("Unexpected end of multiaddr");
    }
    return `${interpretNext(tailProto[0], tailProto[1] ?? "", restMa)}/ipfs/${value}`;
  },
  p2p: (value, restMa) => {
    const tailProto = restMa.pop();
    if (tailProto === void 0) {
      throw new Error("Unexpected end of multiaddr");
    }
    return `${interpretNext(tailProto[0], tailProto[1] ?? "", restMa)}/p2p/${value}`;
  },
  http: (value, restMa) => {
    const maHasTLS = hasTLS(restMa);
    const sni = extractSNI(restMa);
    if (maHasTLS && sni !== null) {
      return `https://${sni}`;
    }
    const protocol = maHasTLS ? "https://" : "http://";
    const tailProto = restMa.pop();
    if (tailProto === void 0) {
      throw new Error("Unexpected end of multiaddr");
    }
    let baseVal = interpretNext(tailProto[0], tailProto[1] ?? "", restMa);
    baseVal = baseVal.replace("tcp://", "");
    return `${protocol}${baseVal}`;
  },
  tls: (value, restMa) => {
    const tailProto = restMa.pop();
    if (tailProto === void 0) {
      throw new Error("Unexpected end of multiaddr");
    }
    return interpretNext(tailProto[0], tailProto[1] ?? "", restMa);
  },
  sni: (value, restMa) => {
    const tailProto = restMa.pop();
    if (tailProto === void 0) {
      throw new Error("Unexpected end of multiaddr");
    }
    return interpretNext(tailProto[0], tailProto[1] ?? "", restMa);
  },
  https: (value, restMa) => {
    const tailProto = restMa.pop();
    if (tailProto === void 0) {
      throw new Error("Unexpected end of multiaddr");
    }
    let baseVal = interpretNext(tailProto[0], tailProto[1] ?? "", restMa);
    baseVal = baseVal.replace("tcp://", "");
    return `https://${baseVal}`;
  },
  ws: (value, restMa) => {
    const maHasTLS = hasTLS(restMa);
    const sni = extractSNI(restMa);
    if (maHasTLS && sni !== null) {
      return `wss://${sni}`;
    }
    const protocol = maHasTLS ? "wss://" : "ws://";
    const tailProto = restMa.pop();
    if (tailProto === void 0) {
      throw new Error("Unexpected end of multiaddr");
    }
    let baseVal = interpretNext(tailProto[0], tailProto[1] ?? "", restMa);
    baseVal = baseVal.replace("tcp://", "");
    return `${protocol}${baseVal}`;
  },
  wss: (value, restMa) => {
    const tailProto = restMa.pop();
    if (tailProto === void 0) {
      throw new Error("Unexpected end of multiaddr");
    }
    let baseVal = interpretNext(tailProto[0], tailProto[1] ?? "", restMa);
    baseVal = baseVal.replace("tcp://", "");
    return `wss://${baseVal}`;
  },
  "p2p-websocket-star": (value, restMa) => {
    const tailProto = restMa.pop();
    if (tailProto === void 0) {
      throw new Error("Unexpected end of multiaddr");
    }
    return `${interpretNext(tailProto[0], tailProto[1] ?? "", restMa)}/p2p-websocket-star`;
  },
  "p2p-webrtc-star": (value, restMa) => {
    const tailProto = restMa.pop();
    if (tailProto === void 0) {
      throw new Error("Unexpected end of multiaddr");
    }
    return `${interpretNext(tailProto[0], tailProto[1] ?? "", restMa)}/p2p-webrtc-star`;
  },
  "p2p-webrtc-direct": (value, restMa) => {
    const tailProto = restMa.pop();
    if (tailProto === void 0) {
      throw new Error("Unexpected end of multiaddr");
    }
    return `${interpretNext(tailProto[0], tailProto[1] ?? "", restMa)}/p2p-webrtc-direct`;
  }
};
function multiaddrToUri(input, opts) {
  const ma = multiaddr(input);
  const parts = ma.stringTuples();
  const head = parts.pop();
  if (head === void 0) {
    throw new Error("Unexpected end of multiaddr");
  }
  const protocol = getProtocol(head[0]);
  const interpreter = interpreters[protocol.name];
  if (interpreter == null) {
    throw new Error(`No interpreter found for ${protocol.name}`);
  }
  let uri = interpreter(head[1] ?? "", parts);
  if (opts?.assumeHttp !== false && head[0] === getProtocol("tcp").code) {
    uri = uri.replace("tcp://", "http://");
    if (head[1] === "443" || head[1] === "80") {
      if (head[1] === "443") {
        uri = uri.replace("http://", "https://");
      }
      uri = uri.substring(0, uri.lastIndexOf(":"));
    }
  }
  return uri;
}

// node_modules/it-ws/dist/src/ready.js
var ready_default = async (socket) => {
  if (socket.readyState >= 2) {
    throw new Error("socket closed");
  }
  if (socket.readyState === 1) {
    return;
  }
  await new Promise((resolve, reject) => {
    function cleanup() {
      socket.removeEventListener("open", handleOpen);
      socket.removeEventListener("error", handleErr);
    }
    function handleOpen() {
      cleanup();
      resolve();
    }
    function handleErr(event) {
      cleanup();
      reject(event.error ?? new Error(`connect ECONNREFUSED ${socket.url}`));
    }
    socket.addEventListener("open", handleOpen);
    socket.addEventListener("error", handleErr);
  });
};

// node_modules/it-ws/dist/src/sink.js
var sink_default = (socket, options) => {
  options = options ?? {};
  options.closeOnEnd = options.closeOnEnd !== false;
  const sink = async (source) => {
    for await (const data of source) {
      try {
        await ready_default(socket);
      } catch (err) {
        if (err.message === "socket closed")
          break;
        throw err;
      }
      if (socket.readyState === socket.CLOSING || socket.readyState === socket.CLOSED) {
        break;
      }
      socket.send(data);
    }
    if (options.closeOnEnd != null && socket.readyState <= 1) {
      await new Promise((resolve, reject) => {
        socket.addEventListener("close", (event) => {
          if (event.wasClean || event.code === 1006) {
            resolve();
          } else {
            const err = Object.assign(new Error("ws error"), { event });
            reject(err);
          }
        });
        setTimeout(() => {
          socket.close();
        });
      });
    }
  };
  return sink;
};

// node_modules/it-ws/dist/src/source.js
var import_event_iterator = __toESM(require_dom(), 1);

// node_modules/it-ws/node_modules/multiformats/dist/src/bases/base10.js
var base10_exports2 = {};
__export(base10_exports2, {
  base10: () => base102
});

// node_modules/it-ws/node_modules/multiformats/dist/src/bytes.js
var empty3 = new Uint8Array(0);
function equals4(aa, bb) {
  if (aa === bb)
    return true;
  if (aa.byteLength !== bb.byteLength) {
    return false;
  }
  for (let ii = 0; ii < aa.byteLength; ii++) {
    if (aa[ii] !== bb[ii]) {
      return false;
    }
  }
  return true;
}
function coerce3(o) {
  if (o instanceof Uint8Array && o.constructor.name === "Uint8Array")
    return o;
  if (o instanceof ArrayBuffer)
    return new Uint8Array(o);
  if (ArrayBuffer.isView(o)) {
    return new Uint8Array(o.buffer, o.byteOffset, o.byteLength);
  }
  throw new Error("Unknown type, must be binary type");
}
function fromString3(str) {
  return new TextEncoder().encode(str);
}
function toString4(b) {
  return new TextDecoder().decode(b);
}

// node_modules/it-ws/node_modules/multiformats/dist/src/vendor/base-x.js
function base3(ALPHABET, name3) {
  if (ALPHABET.length >= 255) {
    throw new TypeError("Alphabet too long");
  }
  var BASE_MAP = new Uint8Array(256);
  for (var j = 0; j < BASE_MAP.length; j++) {
    BASE_MAP[j] = 255;
  }
  for (var i = 0; i < ALPHABET.length; i++) {
    var x = ALPHABET.charAt(i);
    var xc = x.charCodeAt(0);
    if (BASE_MAP[xc] !== 255) {
      throw new TypeError(x + " is ambiguous");
    }
    BASE_MAP[xc] = i;
  }
  var BASE = ALPHABET.length;
  var LEADER = ALPHABET.charAt(0);
  var FACTOR = Math.log(BASE) / Math.log(256);
  var iFACTOR = Math.log(256) / Math.log(BASE);
  function encode11(source) {
    if (source instanceof Uint8Array)
      ;
    else if (ArrayBuffer.isView(source)) {
      source = new Uint8Array(source.buffer, source.byteOffset, source.byteLength);
    } else if (Array.isArray(source)) {
      source = Uint8Array.from(source);
    }
    if (!(source instanceof Uint8Array)) {
      throw new TypeError("Expected Uint8Array");
    }
    if (source.length === 0) {
      return "";
    }
    var zeroes = 0;
    var length3 = 0;
    var pbegin = 0;
    var pend = source.length;
    while (pbegin !== pend && source[pbegin] === 0) {
      pbegin++;
      zeroes++;
    }
    var size = (pend - pbegin) * iFACTOR + 1 >>> 0;
    var b58 = new Uint8Array(size);
    while (pbegin !== pend) {
      var carry = source[pbegin];
      var i2 = 0;
      for (var it1 = size - 1; (carry !== 0 || i2 < length3) && it1 !== -1; it1--, i2++) {
        carry += 256 * b58[it1] >>> 0;
        b58[it1] = carry % BASE >>> 0;
        carry = carry / BASE >>> 0;
      }
      if (carry !== 0) {
        throw new Error("Non-zero carry");
      }
      length3 = i2;
      pbegin++;
    }
    var it2 = size - length3;
    while (it2 !== size && b58[it2] === 0) {
      it2++;
    }
    var str = LEADER.repeat(zeroes);
    for (; it2 < size; ++it2) {
      str += ALPHABET.charAt(b58[it2]);
    }
    return str;
  }
  function decodeUnsafe(source) {
    if (typeof source !== "string") {
      throw new TypeError("Expected String");
    }
    if (source.length === 0) {
      return new Uint8Array();
    }
    var psz = 0;
    if (source[psz] === " ") {
      return;
    }
    var zeroes = 0;
    var length3 = 0;
    while (source[psz] === LEADER) {
      zeroes++;
      psz++;
    }
    var size = (source.length - psz) * FACTOR + 1 >>> 0;
    var b256 = new Uint8Array(size);
    while (source[psz]) {
      var carry = BASE_MAP[source.charCodeAt(psz)];
      if (carry === 255) {
        return;
      }
      var i2 = 0;
      for (var it3 = size - 1; (carry !== 0 || i2 < length3) && it3 !== -1; it3--, i2++) {
        carry += BASE * b256[it3] >>> 0;
        b256[it3] = carry % 256 >>> 0;
        carry = carry / 256 >>> 0;
      }
      if (carry !== 0) {
        throw new Error("Non-zero carry");
      }
      length3 = i2;
      psz++;
    }
    if (source[psz] === " ") {
      return;
    }
    var it4 = size - length3;
    while (it4 !== size && b256[it4] === 0) {
      it4++;
    }
    var vch = new Uint8Array(zeroes + (size - it4));
    var j2 = zeroes;
    while (it4 !== size) {
      vch[j2++] = b256[it4++];
    }
    return vch;
  }
  function decode13(string3) {
    var buffer = decodeUnsafe(string3);
    if (buffer) {
      return buffer;
    }
    throw new Error(`Non-${name3} character`);
  }
  return {
    encode: encode11,
    decodeUnsafe,
    decode: decode13
  };
}
var src3 = base3;
var _brrp__multiformats_scope_baseX3 = src3;
var base_x_default3 = _brrp__multiformats_scope_baseX3;

// node_modules/it-ws/node_modules/multiformats/dist/src/bases/base.js
var Encoder3 = class {
  name;
  prefix;
  baseEncode;
  constructor(name3, prefix, baseEncode) {
    this.name = name3;
    this.prefix = prefix;
    this.baseEncode = baseEncode;
  }
  encode(bytes) {
    if (bytes instanceof Uint8Array) {
      return `${this.prefix}${this.baseEncode(bytes)}`;
    } else {
      throw Error("Unknown type, must be binary type");
    }
  }
};
var Decoder3 = class {
  name;
  prefix;
  baseDecode;
  prefixCodePoint;
  constructor(name3, prefix, baseDecode) {
    this.name = name3;
    this.prefix = prefix;
    if (prefix.codePointAt(0) === void 0) {
      throw new Error("Invalid prefix character");
    }
    this.prefixCodePoint = prefix.codePointAt(0);
    this.baseDecode = baseDecode;
  }
  decode(text) {
    if (typeof text === "string") {
      if (text.codePointAt(0) !== this.prefixCodePoint) {
        throw Error(`Unable to decode multibase string ${JSON.stringify(text)}, ${this.name} decoder only supports inputs prefixed with ${this.prefix}`);
      }
      return this.baseDecode(text.slice(this.prefix.length));
    } else {
      throw Error("Can only multibase decode strings");
    }
  }
  or(decoder) {
    return or3(this, decoder);
  }
};
var ComposedDecoder3 = class {
  decoders;
  constructor(decoders2) {
    this.decoders = decoders2;
  }
  or(decoder) {
    return or3(this, decoder);
  }
  decode(input) {
    const prefix = input[0];
    const decoder = this.decoders[prefix];
    if (decoder != null) {
      return decoder.decode(input);
    } else {
      throw RangeError(`Unable to decode multibase string ${JSON.stringify(input)}, only inputs prefixed with ${Object.keys(this.decoders)} are supported`);
    }
  }
};
function or3(left, right) {
  return new ComposedDecoder3({
    ...left.decoders ?? { [left.prefix]: left },
    ...right.decoders ?? { [right.prefix]: right }
  });
}
var Codec3 = class {
  name;
  prefix;
  baseEncode;
  baseDecode;
  encoder;
  decoder;
  constructor(name3, prefix, baseEncode, baseDecode) {
    this.name = name3;
    this.prefix = prefix;
    this.baseEncode = baseEncode;
    this.baseDecode = baseDecode;
    this.encoder = new Encoder3(name3, prefix, baseEncode);
    this.decoder = new Decoder3(name3, prefix, baseDecode);
  }
  encode(input) {
    return this.encoder.encode(input);
  }
  decode(input) {
    return this.decoder.decode(input);
  }
};
function from4({ name: name3, prefix, encode: encode11, decode: decode13 }) {
  return new Codec3(name3, prefix, encode11, decode13);
}
function baseX3({ name: name3, prefix, alphabet: alphabet3 }) {
  const { encode: encode11, decode: decode13 } = base_x_default3(alphabet3, name3);
  return from4({
    prefix,
    name: name3,
    encode: encode11,
    decode: (text) => coerce3(decode13(text))
  });
}
function decode8(string3, alphabet3, bitsPerChar, name3) {
  const codes2 = {};
  for (let i = 0; i < alphabet3.length; ++i) {
    codes2[alphabet3[i]] = i;
  }
  let end = string3.length;
  while (string3[end - 1] === "=") {
    --end;
  }
  const out = new Uint8Array(end * bitsPerChar / 8 | 0);
  let bits = 0;
  let buffer = 0;
  let written = 0;
  for (let i = 0; i < end; ++i) {
    const value = codes2[string3[i]];
    if (value === void 0) {
      throw new SyntaxError(`Non-${name3} character`);
    }
    buffer = buffer << bitsPerChar | value;
    bits += bitsPerChar;
    if (bits >= 8) {
      bits -= 8;
      out[written++] = 255 & buffer >> bits;
    }
  }
  if (bits >= bitsPerChar || (255 & buffer << 8 - bits) !== 0) {
    throw new SyntaxError("Unexpected end of data");
  }
  return out;
}
function encode7(data, alphabet3, bitsPerChar) {
  const pad = alphabet3[alphabet3.length - 1] === "=";
  const mask = (1 << bitsPerChar) - 1;
  let out = "";
  let bits = 0;
  let buffer = 0;
  for (let i = 0; i < data.length; ++i) {
    buffer = buffer << 8 | data[i];
    bits += 8;
    while (bits > bitsPerChar) {
      bits -= bitsPerChar;
      out += alphabet3[mask & buffer >> bits];
    }
  }
  if (bits !== 0) {
    out += alphabet3[mask & buffer << bitsPerChar - bits];
  }
  if (pad) {
    while ((out.length * bitsPerChar & 7) !== 0) {
      out += "=";
    }
  }
  return out;
}
function rfc46483({ name: name3, prefix, bitsPerChar, alphabet: alphabet3 }) {
  return from4({
    prefix,
    name: name3,
    encode(input) {
      return encode7(input, alphabet3, bitsPerChar);
    },
    decode(input) {
      return decode8(input, alphabet3, bitsPerChar, name3);
    }
  });
}

// node_modules/it-ws/node_modules/multiformats/dist/src/bases/base10.js
var base102 = baseX3({
  prefix: "9",
  name: "base10",
  alphabet: "0123456789"
});

// node_modules/it-ws/node_modules/multiformats/dist/src/bases/base16.js
var base16_exports2 = {};
__export(base16_exports2, {
  base16: () => base162,
  base16upper: () => base16upper2
});
var base162 = rfc46483({
  prefix: "f",
  name: "base16",
  alphabet: "0123456789abcdef",
  bitsPerChar: 4
});
var base16upper2 = rfc46483({
  prefix: "F",
  name: "base16upper",
  alphabet: "0123456789ABCDEF",
  bitsPerChar: 4
});

// node_modules/it-ws/node_modules/multiformats/dist/src/bases/base2.js
var base2_exports2 = {};
__export(base2_exports2, {
  base2: () => base23
});
var base23 = rfc46483({
  prefix: "0",
  name: "base2",
  alphabet: "01",
  bitsPerChar: 1
});

// node_modules/it-ws/node_modules/multiformats/dist/src/bases/base256emoji.js
var base256emoji_exports2 = {};
__export(base256emoji_exports2, {
  base256emoji: () => base256emoji2
});
var alphabet2 = Array.from("\u{1F680}\u{1FA90}\u2604\u{1F6F0}\u{1F30C}\u{1F311}\u{1F312}\u{1F313}\u{1F314}\u{1F315}\u{1F316}\u{1F317}\u{1F318}\u{1F30D}\u{1F30F}\u{1F30E}\u{1F409}\u2600\u{1F4BB}\u{1F5A5}\u{1F4BE}\u{1F4BF}\u{1F602}\u2764\u{1F60D}\u{1F923}\u{1F60A}\u{1F64F}\u{1F495}\u{1F62D}\u{1F618}\u{1F44D}\u{1F605}\u{1F44F}\u{1F601}\u{1F525}\u{1F970}\u{1F494}\u{1F496}\u{1F499}\u{1F622}\u{1F914}\u{1F606}\u{1F644}\u{1F4AA}\u{1F609}\u263A\u{1F44C}\u{1F917}\u{1F49C}\u{1F614}\u{1F60E}\u{1F607}\u{1F339}\u{1F926}\u{1F389}\u{1F49E}\u270C\u2728\u{1F937}\u{1F631}\u{1F60C}\u{1F338}\u{1F64C}\u{1F60B}\u{1F497}\u{1F49A}\u{1F60F}\u{1F49B}\u{1F642}\u{1F493}\u{1F929}\u{1F604}\u{1F600}\u{1F5A4}\u{1F603}\u{1F4AF}\u{1F648}\u{1F447}\u{1F3B6}\u{1F612}\u{1F92D}\u2763\u{1F61C}\u{1F48B}\u{1F440}\u{1F62A}\u{1F611}\u{1F4A5}\u{1F64B}\u{1F61E}\u{1F629}\u{1F621}\u{1F92A}\u{1F44A}\u{1F973}\u{1F625}\u{1F924}\u{1F449}\u{1F483}\u{1F633}\u270B\u{1F61A}\u{1F61D}\u{1F634}\u{1F31F}\u{1F62C}\u{1F643}\u{1F340}\u{1F337}\u{1F63B}\u{1F613}\u2B50\u2705\u{1F97A}\u{1F308}\u{1F608}\u{1F918}\u{1F4A6}\u2714\u{1F623}\u{1F3C3}\u{1F490}\u2639\u{1F38A}\u{1F498}\u{1F620}\u261D\u{1F615}\u{1F33A}\u{1F382}\u{1F33B}\u{1F610}\u{1F595}\u{1F49D}\u{1F64A}\u{1F639}\u{1F5E3}\u{1F4AB}\u{1F480}\u{1F451}\u{1F3B5}\u{1F91E}\u{1F61B}\u{1F534}\u{1F624}\u{1F33C}\u{1F62B}\u26BD\u{1F919}\u2615\u{1F3C6}\u{1F92B}\u{1F448}\u{1F62E}\u{1F646}\u{1F37B}\u{1F343}\u{1F436}\u{1F481}\u{1F632}\u{1F33F}\u{1F9E1}\u{1F381}\u26A1\u{1F31E}\u{1F388}\u274C\u270A\u{1F44B}\u{1F630}\u{1F928}\u{1F636}\u{1F91D}\u{1F6B6}\u{1F4B0}\u{1F353}\u{1F4A2}\u{1F91F}\u{1F641}\u{1F6A8}\u{1F4A8}\u{1F92C}\u2708\u{1F380}\u{1F37A}\u{1F913}\u{1F619}\u{1F49F}\u{1F331}\u{1F616}\u{1F476}\u{1F974}\u25B6\u27A1\u2753\u{1F48E}\u{1F4B8}\u2B07\u{1F628}\u{1F31A}\u{1F98B}\u{1F637}\u{1F57A}\u26A0\u{1F645}\u{1F61F}\u{1F635}\u{1F44E}\u{1F932}\u{1F920}\u{1F927}\u{1F4CC}\u{1F535}\u{1F485}\u{1F9D0}\u{1F43E}\u{1F352}\u{1F617}\u{1F911}\u{1F30A}\u{1F92F}\u{1F437}\u260E\u{1F4A7}\u{1F62F}\u{1F486}\u{1F446}\u{1F3A4}\u{1F647}\u{1F351}\u2744\u{1F334}\u{1F4A3}\u{1F438}\u{1F48C}\u{1F4CD}\u{1F940}\u{1F922}\u{1F445}\u{1F4A1}\u{1F4A9}\u{1F450}\u{1F4F8}\u{1F47B}\u{1F910}\u{1F92E}\u{1F3BC}\u{1F975}\u{1F6A9}\u{1F34E}\u{1F34A}\u{1F47C}\u{1F48D}\u{1F4E3}\u{1F942}");
var alphabetBytesToChars2 = alphabet2.reduce((p, c, i) => {
  p[i] = c;
  return p;
}, []);
var alphabetCharsToBytes2 = alphabet2.reduce((p, c, i) => {
  p[c.codePointAt(0)] = i;
  return p;
}, []);
function encode8(data) {
  return data.reduce((p, c) => {
    p += alphabetBytesToChars2[c];
    return p;
  }, "");
}
function decode9(str) {
  const byts = [];
  for (const char of str) {
    const byt = alphabetCharsToBytes2[char.codePointAt(0)];
    if (byt === void 0) {
      throw new Error(`Non-base256emoji character: ${char}`);
    }
    byts.push(byt);
  }
  return new Uint8Array(byts);
}
var base256emoji2 = from4({
  prefix: "\u{1F680}",
  name: "base256emoji",
  encode: encode8,
  decode: decode9
});

// node_modules/it-ws/node_modules/multiformats/dist/src/bases/base32.js
var base32_exports2 = {};
__export(base32_exports2, {
  base32: () => base323,
  base32hex: () => base32hex3,
  base32hexpad: () => base32hexpad3,
  base32hexpadupper: () => base32hexpadupper3,
  base32hexupper: () => base32hexupper3,
  base32pad: () => base32pad3,
  base32padupper: () => base32padupper3,
  base32upper: () => base32upper3,
  base32z: () => base32z3
});
var base323 = rfc46483({
  prefix: "b",
  name: "base32",
  alphabet: "abcdefghijklmnopqrstuvwxyz234567",
  bitsPerChar: 5
});
var base32upper3 = rfc46483({
  prefix: "B",
  name: "base32upper",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567",
  bitsPerChar: 5
});
var base32pad3 = rfc46483({
  prefix: "c",
  name: "base32pad",
  alphabet: "abcdefghijklmnopqrstuvwxyz234567=",
  bitsPerChar: 5
});
var base32padupper3 = rfc46483({
  prefix: "C",
  name: "base32padupper",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567=",
  bitsPerChar: 5
});
var base32hex3 = rfc46483({
  prefix: "v",
  name: "base32hex",
  alphabet: "0123456789abcdefghijklmnopqrstuv",
  bitsPerChar: 5
});
var base32hexupper3 = rfc46483({
  prefix: "V",
  name: "base32hexupper",
  alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV",
  bitsPerChar: 5
});
var base32hexpad3 = rfc46483({
  prefix: "t",
  name: "base32hexpad",
  alphabet: "0123456789abcdefghijklmnopqrstuv=",
  bitsPerChar: 5
});
var base32hexpadupper3 = rfc46483({
  prefix: "T",
  name: "base32hexpadupper",
  alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV=",
  bitsPerChar: 5
});
var base32z3 = rfc46483({
  prefix: "h",
  name: "base32z",
  alphabet: "ybndrfg8ejkmcpqxot1uwisza345h769",
  bitsPerChar: 5
});

// node_modules/it-ws/node_modules/multiformats/dist/src/bases/base36.js
var base36_exports2 = {};
__export(base36_exports2, {
  base36: () => base362,
  base36upper: () => base36upper2
});
var base362 = baseX3({
  prefix: "k",
  name: "base36",
  alphabet: "0123456789abcdefghijklmnopqrstuvwxyz"
});
var base36upper2 = baseX3({
  prefix: "K",
  name: "base36upper",
  alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"
});

// node_modules/it-ws/node_modules/multiformats/dist/src/bases/base58.js
var base58_exports2 = {};
__export(base58_exports2, {
  base58btc: () => base58btc3,
  base58flickr: () => base58flickr3
});
var base58btc3 = baseX3({
  name: "base58btc",
  prefix: "z",
  alphabet: "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"
});
var base58flickr3 = baseX3({
  name: "base58flickr",
  prefix: "Z",
  alphabet: "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ"
});

// node_modules/it-ws/node_modules/multiformats/dist/src/bases/base64.js
var base64_exports2 = {};
__export(base64_exports2, {
  base64: () => base643,
  base64pad: () => base64pad3,
  base64url: () => base64url3,
  base64urlpad: () => base64urlpad3
});
var base643 = rfc46483({
  prefix: "m",
  name: "base64",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
  bitsPerChar: 6
});
var base64pad3 = rfc46483({
  prefix: "M",
  name: "base64pad",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
  bitsPerChar: 6
});
var base64url3 = rfc46483({
  prefix: "u",
  name: "base64url",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_",
  bitsPerChar: 6
});
var base64urlpad3 = rfc46483({
  prefix: "U",
  name: "base64urlpad",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=",
  bitsPerChar: 6
});

// node_modules/it-ws/node_modules/multiformats/dist/src/bases/base8.js
var base8_exports2 = {};
__export(base8_exports2, {
  base8: () => base82
});
var base82 = rfc46483({
  prefix: "7",
  name: "base8",
  alphabet: "01234567",
  bitsPerChar: 3
});

// node_modules/it-ws/node_modules/multiformats/dist/src/bases/identity.js
var identity_exports3 = {};
__export(identity_exports3, {
  identity: () => identity3
});
var identity3 = from4({
  prefix: "\0",
  name: "identity",
  encode: (buf) => toString4(buf),
  decode: (str) => fromString3(str)
});

// node_modules/it-ws/node_modules/multiformats/dist/src/codecs/json.js
var textEncoder2 = new TextEncoder();
var textDecoder2 = new TextDecoder();

// node_modules/it-ws/node_modules/multiformats/dist/src/hashes/identity.js
var identity_exports4 = {};
__export(identity_exports4, {
  identity: () => identity4
});

// node_modules/it-ws/node_modules/multiformats/dist/src/vendor/varint.js
var encode_12 = encode9;
var MSB3 = 128;
var REST3 = 127;
var MSBALL2 = ~REST3;
var INT2 = Math.pow(2, 31);
function encode9(num, out, offset) {
  out = out || [];
  offset = offset || 0;
  var oldOffset = offset;
  while (num >= INT2) {
    out[offset++] = num & 255 | MSB3;
    num /= 128;
  }
  while (num & MSBALL2) {
    out[offset++] = num & 255 | MSB3;
    num >>>= 7;
  }
  out[offset] = num | 0;
  encode9.bytes = offset - oldOffset + 1;
  return out;
}
var decode10 = read2;
var MSB$12 = 128;
var REST$12 = 127;
function read2(buf, offset) {
  var res = 0, offset = offset || 0, shift = 0, counter = offset, b, l = buf.length;
  do {
    if (counter >= l) {
      read2.bytes = 0;
      throw new RangeError("Could not decode varint");
    }
    b = buf[counter++];
    res += shift < 28 ? (b & REST$12) << shift : (b & REST$12) * Math.pow(2, shift);
    shift += 7;
  } while (b >= MSB$12);
  read2.bytes = counter - offset;
  return res;
}
var N13 = Math.pow(2, 7);
var N23 = Math.pow(2, 14);
var N33 = Math.pow(2, 21);
var N43 = Math.pow(2, 28);
var N53 = Math.pow(2, 35);
var N63 = Math.pow(2, 42);
var N73 = Math.pow(2, 49);
var N82 = Math.pow(2, 56);
var N92 = Math.pow(2, 63);
var length2 = function(value) {
  return value < N13 ? 1 : value < N23 ? 2 : value < N33 ? 3 : value < N43 ? 4 : value < N53 ? 5 : value < N63 ? 6 : value < N73 ? 7 : value < N82 ? 8 : value < N92 ? 9 : 10;
};
var varint2 = {
  encode: encode_12,
  decode: decode10,
  encodingLength: length2
};
var _brrp_varint2 = varint2;
var varint_default2 = _brrp_varint2;

// node_modules/it-ws/node_modules/multiformats/dist/src/varint.js
function decode11(data, offset = 0) {
  const code3 = varint_default2.decode(data, offset);
  return [code3, varint_default2.decode.bytes];
}
function encodeTo2(int, target, offset = 0) {
  varint_default2.encode(int, target, offset);
  return target;
}
function encodingLength3(int) {
  return varint_default2.encodingLength(int);
}

// node_modules/it-ws/node_modules/multiformats/dist/src/hashes/digest.js
function create2(code3, digest3) {
  const size = digest3.byteLength;
  const sizeOffset = encodingLength3(code3);
  const digestOffset = sizeOffset + encodingLength3(size);
  const bytes = new Uint8Array(digestOffset + size);
  encodeTo2(code3, bytes, 0);
  encodeTo2(size, bytes, sizeOffset);
  bytes.set(digest3, digestOffset);
  return new Digest2(code3, size, digest3, bytes);
}
function decode12(multihash) {
  const bytes = coerce3(multihash);
  const [code3, sizeOffset] = decode11(bytes);
  const [size, digestOffset] = decode11(bytes.subarray(sizeOffset));
  const digest3 = bytes.subarray(sizeOffset + digestOffset);
  if (digest3.byteLength !== size) {
    throw new Error("Incorrect length");
  }
  return new Digest2(code3, size, digest3, bytes);
}
function equals5(a, b) {
  if (a === b) {
    return true;
  } else {
    const data = b;
    return a.code === data.code && a.size === data.size && data.bytes instanceof Uint8Array && equals4(a.bytes, data.bytes);
  }
}
var Digest2 = class {
  code;
  size;
  digest;
  bytes;
  /**
   * Creates a multihash digest.
   */
  constructor(code3, size, digest3, bytes) {
    this.code = code3;
    this.size = size;
    this.digest = digest3;
    this.bytes = bytes;
  }
};

// node_modules/it-ws/node_modules/multiformats/dist/src/hashes/identity.js
var code2 = 0;
var name2 = "identity";
var encode10 = coerce3;
function digest2(input) {
  return create2(code2, encode10(input));
}
var identity4 = { code: code2, name: name2, encode: encode10, digest: digest2 };

// node_modules/it-ws/node_modules/multiformats/dist/src/hashes/sha2-browser.js
var sha2_browser_exports2 = {};
__export(sha2_browser_exports2, {
  sha256: () => sha2562,
  sha512: () => sha5122
});

// node_modules/it-ws/node_modules/multiformats/dist/src/hashes/hasher.js
function from5({ name: name3, code: code3, encode: encode11 }) {
  return new Hasher2(name3, code3, encode11);
}
var Hasher2 = class {
  name;
  code;
  encode;
  constructor(name3, code3, encode11) {
    this.name = name3;
    this.code = code3;
    this.encode = encode11;
  }
  digest(input) {
    if (input instanceof Uint8Array) {
      const result = this.encode(input);
      return result instanceof Uint8Array ? create2(this.code, result) : result.then((digest3) => create2(this.code, digest3));
    } else {
      throw Error("Unknown type, must be binary type");
    }
  }
};

// node_modules/it-ws/node_modules/multiformats/dist/src/hashes/sha2-browser.js
function sha2(name3) {
  return async (data) => new Uint8Array(await crypto.subtle.digest(name3, data));
}
var sha2562 = from5({
  name: "sha2-256",
  code: 18,
  encode: sha2("SHA-256")
});
var sha5122 = from5({
  name: "sha2-512",
  code: 19,
  encode: sha2("SHA-512")
});

// node_modules/it-ws/node_modules/multiformats/dist/src/cid.js
function format2(link, base5) {
  const { bytes, version } = link;
  switch (version) {
    case 0:
      return toStringV02(bytes, baseCache2(link), base5 ?? base58btc3.encoder);
    default:
      return toStringV12(bytes, baseCache2(link), base5 ?? base323.encoder);
  }
}
var cache2 = /* @__PURE__ */ new WeakMap();
function baseCache2(cid) {
  const baseCache3 = cache2.get(cid);
  if (baseCache3 == null) {
    const baseCache4 = /* @__PURE__ */ new Map();
    cache2.set(cid, baseCache4);
    return baseCache4;
  }
  return baseCache3;
}
var CID2 = class _CID {
  code;
  version;
  multihash;
  bytes;
  "/";
  /**
   * @param version - Version of the CID
   * @param code - Code of the codec content is encoded in, see https://github.com/multiformats/multicodec/blob/master/table.csv
   * @param multihash - (Multi)hash of the of the content.
   */
  constructor(version, code3, multihash, bytes) {
    this.code = code3;
    this.version = version;
    this.multihash = multihash;
    this.bytes = bytes;
    this["/"] = bytes;
  }
  /**
   * Signalling `cid.asCID === cid` has been replaced with `cid['/'] === cid.bytes`
   * please either use `CID.asCID(cid)` or switch to new signalling mechanism
   *
   * @deprecated
   */
  get asCID() {
    return this;
  }
  // ArrayBufferView
  get byteOffset() {
    return this.bytes.byteOffset;
  }
  // ArrayBufferView
  get byteLength() {
    return this.bytes.byteLength;
  }
  toV0() {
    switch (this.version) {
      case 0: {
        return this;
      }
      case 1: {
        const { code: code3, multihash } = this;
        if (code3 !== DAG_PB_CODE2) {
          throw new Error("Cannot convert a non dag-pb CID to CIDv0");
        }
        if (multihash.code !== SHA_256_CODE2) {
          throw new Error("Cannot convert non sha2-256 multihash CID to CIDv0");
        }
        return _CID.createV0(multihash);
      }
      default: {
        throw Error(`Can not convert CID version ${this.version} to version 0. This is a bug please report`);
      }
    }
  }
  toV1() {
    switch (this.version) {
      case 0: {
        const { code: code3, digest: digest3 } = this.multihash;
        const multihash = create2(code3, digest3);
        return _CID.createV1(this.code, multihash);
      }
      case 1: {
        return this;
      }
      default: {
        throw Error(`Can not convert CID version ${this.version} to version 1. This is a bug please report`);
      }
    }
  }
  equals(other) {
    return _CID.equals(this, other);
  }
  static equals(self2, other) {
    const unknown = other;
    return unknown != null && self2.code === unknown.code && self2.version === unknown.version && equals5(self2.multihash, unknown.multihash);
  }
  toString(base5) {
    return format2(this, base5);
  }
  toJSON() {
    return { "/": format2(this) };
  }
  link() {
    return this;
  }
  [Symbol.toStringTag] = "CID";
  // Legacy
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return `CID(${this.toString()})`;
  }
  /**
   * Takes any input `value` and returns a `CID` instance if it was
   * a `CID` otherwise returns `null`. If `value` is instanceof `CID`
   * it will return value back. If `value` is not instance of this CID
   * class, but is compatible CID it will return new instance of this
   * `CID` class. Otherwise returns null.
   *
   * This allows two different incompatible versions of CID library to
   * co-exist and interop as long as binary interface is compatible.
   */
  static asCID(input) {
    if (input == null) {
      return null;
    }
    const value = input;
    if (value instanceof _CID) {
      return value;
    } else if (value["/"] != null && value["/"] === value.bytes || value.asCID === value) {
      const { version, code: code3, multihash, bytes } = value;
      return new _CID(version, code3, multihash, bytes ?? encodeCID2(version, code3, multihash.bytes));
    } else if (value[cidSymbol2] === true) {
      const { version, multihash, code: code3 } = value;
      const digest3 = decode12(multihash);
      return _CID.create(version, code3, digest3);
    } else {
      return null;
    }
  }
  /**
   * @param version - Version of the CID
   * @param code - Code of the codec content is encoded in, see https://github.com/multiformats/multicodec/blob/master/table.csv
   * @param digest - (Multi)hash of the of the content.
   */
  static create(version, code3, digest3) {
    if (typeof code3 !== "number") {
      throw new Error("String codecs are no longer supported");
    }
    if (!(digest3.bytes instanceof Uint8Array)) {
      throw new Error("Invalid digest");
    }
    switch (version) {
      case 0: {
        if (code3 !== DAG_PB_CODE2) {
          throw new Error(`Version 0 CID must use dag-pb (code: ${DAG_PB_CODE2}) block encoding`);
        } else {
          return new _CID(version, code3, digest3, digest3.bytes);
        }
      }
      case 1: {
        const bytes = encodeCID2(version, code3, digest3.bytes);
        return new _CID(version, code3, digest3, bytes);
      }
      default: {
        throw new Error("Invalid version");
      }
    }
  }
  /**
   * Simplified version of `create` for CIDv0.
   */
  static createV0(digest3) {
    return _CID.create(0, DAG_PB_CODE2, digest3);
  }
  /**
   * Simplified version of `create` for CIDv1.
   *
   * @param code - Content encoding format code.
   * @param digest - Multihash of the content.
   */
  static createV1(code3, digest3) {
    return _CID.create(1, code3, digest3);
  }
  /**
   * Decoded a CID from its binary representation. The byte array must contain
   * only the CID with no additional bytes.
   *
   * An error will be thrown if the bytes provided do not contain a valid
   * binary representation of a CID.
   */
  static decode(bytes) {
    const [cid, remainder] = _CID.decodeFirst(bytes);
    if (remainder.length !== 0) {
      throw new Error("Incorrect length");
    }
    return cid;
  }
  /**
   * Decoded a CID from its binary representation at the beginning of a byte
   * array.
   *
   * Returns an array with the first element containing the CID and the second
   * element containing the remainder of the original byte array. The remainder
   * will be a zero-length byte array if the provided bytes only contained a
   * binary CID representation.
   */
  static decodeFirst(bytes) {
    const specs = _CID.inspectBytes(bytes);
    const prefixSize = specs.size - specs.multihashSize;
    const multihashBytes = coerce3(bytes.subarray(prefixSize, prefixSize + specs.multihashSize));
    if (multihashBytes.byteLength !== specs.multihashSize) {
      throw new Error("Incorrect length");
    }
    const digestBytes = multihashBytes.subarray(specs.multihashSize - specs.digestSize);
    const digest3 = new Digest2(specs.multihashCode, specs.digestSize, digestBytes, multihashBytes);
    const cid = specs.version === 0 ? _CID.createV0(digest3) : _CID.createV1(specs.codec, digest3);
    return [cid, bytes.subarray(specs.size)];
  }
  /**
   * Inspect the initial bytes of a CID to determine its properties.
   *
   * Involves decoding up to 4 varints. Typically this will require only 4 to 6
   * bytes but for larger multicodec code values and larger multihash digest
   * lengths these varints can be quite large. It is recommended that at least
   * 10 bytes be made available in the `initialBytes` argument for a complete
   * inspection.
   */
  static inspectBytes(initialBytes) {
    let offset = 0;
    const next = () => {
      const [i, length3] = decode11(initialBytes.subarray(offset));
      offset += length3;
      return i;
    };
    let version = next();
    let codec = DAG_PB_CODE2;
    if (version === 18) {
      version = 0;
      offset = 0;
    } else {
      codec = next();
    }
    if (version !== 0 && version !== 1) {
      throw new RangeError(`Invalid CID version ${version}`);
    }
    const prefixSize = offset;
    const multihashCode = next();
    const digestSize = next();
    const size = offset + digestSize;
    const multihashSize = size - prefixSize;
    return { version, codec, multihashCode, digestSize, multihashSize, size };
  }
  /**
   * Takes cid in a string representation and creates an instance. If `base`
   * decoder is not provided will use a default from the configuration. It will
   * throw an error if encoding of the CID is not compatible with supplied (or
   * a default decoder).
   */
  static parse(source, base5) {
    const [prefix, bytes] = parseCIDtoBytes2(source, base5);
    const cid = _CID.decode(bytes);
    if (cid.version === 0 && source[0] !== "Q") {
      throw Error("Version 0 CID string must not include multibase prefix");
    }
    baseCache2(cid).set(prefix, source);
    return cid;
  }
};
function parseCIDtoBytes2(source, base5) {
  switch (source[0]) {
    case "Q": {
      const decoder = base5 ?? base58btc3;
      return [
        base58btc3.prefix,
        decoder.decode(`${base58btc3.prefix}${source}`)
      ];
    }
    case base58btc3.prefix: {
      const decoder = base5 ?? base58btc3;
      return [base58btc3.prefix, decoder.decode(source)];
    }
    case base323.prefix: {
      const decoder = base5 ?? base323;
      return [base323.prefix, decoder.decode(source)];
    }
    default: {
      if (base5 == null) {
        throw Error("To parse non base32 or base58btc encoded CID multibase decoder must be provided");
      }
      return [source[0], base5.decode(source)];
    }
  }
}
function toStringV02(bytes, cache3, base5) {
  const { prefix } = base5;
  if (prefix !== base58btc3.prefix) {
    throw Error(`Cannot string encode V0 in ${base5.name} encoding`);
  }
  const cid = cache3.get(prefix);
  if (cid == null) {
    const cid2 = base5.encode(bytes).slice(1);
    cache3.set(prefix, cid2);
    return cid2;
  } else {
    return cid;
  }
}
function toStringV12(bytes, cache3, base5) {
  const { prefix } = base5;
  const cid = cache3.get(prefix);
  if (cid == null) {
    const cid2 = base5.encode(bytes);
    cache3.set(prefix, cid2);
    return cid2;
  } else {
    return cid;
  }
}
var DAG_PB_CODE2 = 112;
var SHA_256_CODE2 = 18;
function encodeCID2(version, code3, multihash) {
  const codeOffset = encodingLength3(version);
  const hashOffset = codeOffset + encodingLength3(code3);
  const bytes = new Uint8Array(hashOffset + multihash.byteLength);
  encodeTo2(version, bytes, 0);
  encodeTo2(code3, bytes, codeOffset);
  bytes.set(multihash, hashOffset);
  return bytes;
}
var cidSymbol2 = Symbol.for("@ipld/js-cid/CID");

// node_modules/it-ws/node_modules/multiformats/dist/src/basics.js
var bases2 = { ...identity_exports3, ...base2_exports2, ...base8_exports2, ...base10_exports2, ...base16_exports2, ...base32_exports2, ...base36_exports2, ...base58_exports2, ...base64_exports2, ...base256emoji_exports2 };
var hashes2 = { ...sha2_browser_exports2, ...identity_exports4 };

// node_modules/it-ws/node_modules/uint8arrays/dist/src/alloc.js
function allocUnsafe3(size = 0) {
  return new Uint8Array(size);
}

// node_modules/it-ws/node_modules/uint8arrays/dist/src/util/bases.js
function createCodec2(name3, prefix, encode11, decode13) {
  return {
    name: name3,
    prefix,
    encoder: {
      name: name3,
      prefix,
      encode: encode11
    },
    decoder: {
      decode: decode13
    }
  };
}
var string2 = createCodec2("utf8", "u", (buf) => {
  const decoder = new TextDecoder("utf8");
  return "u" + decoder.decode(buf);
}, (str) => {
  const encoder = new TextEncoder();
  return encoder.encode(str.substring(1));
});
var ascii2 = createCodec2("ascii", "a", (buf) => {
  let string3 = "a";
  for (let i = 0; i < buf.length; i++) {
    string3 += String.fromCharCode(buf[i]);
  }
  return string3;
}, (str) => {
  str = str.substring(1);
  const buf = allocUnsafe3(str.length);
  for (let i = 0; i < str.length; i++) {
    buf[i] = str.charCodeAt(i);
  }
  return buf;
});
var BASES2 = {
  utf8: string2,
  "utf-8": string2,
  hex: bases2.base16,
  latin1: ascii2,
  ascii: ascii2,
  binary: ascii2,
  ...bases2
};
var bases_default2 = BASES2;

// node_modules/it-ws/node_modules/uint8arrays/dist/src/from-string.js
function fromString4(string3, encoding = "utf8") {
  const base5 = bases_default2[encoding];
  if (base5 == null) {
    throw new Error(`Unsupported encoding "${encoding}"`);
  }
  return base5.decoder.decode(`${base5.prefix}${string3}`);
}

// node_modules/it-ws/dist/src/source.js
function isArrayBuffer(obj) {
  return obj instanceof ArrayBuffer || obj?.constructor?.name === "ArrayBuffer" && typeof obj?.byteLength === "number";
}
var source_default = (socket) => {
  socket.binaryType = "arraybuffer";
  const connected = async () => {
    await new Promise((resolve, reject) => {
      if (isConnected) {
        resolve();
        return;
      }
      if (connError != null) {
        reject(connError);
        return;
      }
      const cleanUp = (cont) => {
        socket.removeEventListener("open", onOpen);
        socket.removeEventListener("error", onError);
        cont();
      };
      const onOpen = () => {
        cleanUp(resolve);
      };
      const onError = (event) => {
        cleanUp(() => {
          reject(event.error ?? new Error(`connect ECONNREFUSED ${socket.url}`));
        });
      };
      socket.addEventListener("open", onOpen);
      socket.addEventListener("error", onError);
    });
  };
  const source = async function* () {
    const messages = new import_event_iterator.EventIterator(({ push, stop, fail }) => {
      const onMessage = (event) => {
        let data = null;
        if (typeof event.data === "string") {
          data = fromString4(event.data);
        }
        if (isArrayBuffer(event.data)) {
          data = new Uint8Array(event.data);
        }
        if (event.data instanceof Uint8Array) {
          data = event.data;
        }
        if (data == null) {
          return;
        }
        push(data);
      };
      const onError = (event) => {
        fail(event.error ?? new Error("Socket error"));
      };
      socket.addEventListener("message", onMessage);
      socket.addEventListener("error", onError);
      socket.addEventListener("close", stop);
      return () => {
        socket.removeEventListener("message", onMessage);
        socket.removeEventListener("error", onError);
        socket.removeEventListener("close", stop);
      };
    }, { highWaterMark: Infinity });
    await connected();
    for await (const chunk of messages) {
      yield isArrayBuffer(chunk) ? new Uint8Array(chunk) : chunk;
    }
  }();
  let isConnected = socket.readyState === 1;
  let connError;
  socket.addEventListener("open", () => {
    isConnected = true;
    connError = null;
  });
  socket.addEventListener("close", () => {
    isConnected = false;
    connError = null;
  });
  socket.addEventListener("error", (event) => {
    if (!isConnected) {
      connError = event.error ?? new Error(`connect ECONNREFUSED ${socket.url}`);
    }
  });
  return Object.assign(source, {
    connected
  });
};

// node_modules/it-ws/dist/src/duplex.js
var duplex_default = (socket, options) => {
  options = options ?? {};
  const connectedSource = source_default(socket);
  let remoteAddress = options.remoteAddress;
  let remotePort = options.remotePort;
  if (socket.url != null) {
    try {
      const url = new URL(socket.url);
      remoteAddress = url.hostname;
      remotePort = parseInt(url.port, 10);
    } catch {
    }
  }
  if (remoteAddress == null || remotePort == null) {
    throw new Error("Remote connection did not have address and/or port");
  }
  const duplex = {
    sink: sink_default(socket, options),
    source: connectedSource,
    connected: async () => {
      await connectedSource.connected();
    },
    close: async () => {
      if (socket.readyState === socket.CONNECTING || socket.readyState === socket.OPEN) {
        await new Promise((resolve) => {
          socket.addEventListener("close", () => {
            resolve();
          });
          socket.close();
        });
      }
    },
    destroy: () => {
      if (socket.terminate != null) {
        socket.terminate();
      } else {
        socket.close();
      }
    },
    remoteAddress,
    remotePort,
    socket
  };
  return duplex;
};

// node_modules/it-ws/dist/src/web-socket.browser.js
var web_socket_browser_default = WebSocket;

// node_modules/it-ws/dist/src/ws-url.js
var map = { "http:": "ws:", "https:": "wss:" };
var defaultProtocol = "ws:";
var ws_url_default = (url, location) => {
  if (url.startsWith("//")) {
    url = `${location?.protocol ?? defaultProtocol}${url}`;
  }
  if (url.startsWith("/") && location != null) {
    const proto = location.protocol ?? defaultProtocol;
    const host = location.host;
    const port = location.port != null && host?.endsWith(`:${location.port}`) !== true ? `:${location.port}` : "";
    url = `${proto}//${host}${port}${url}`;
  }
  const wsUrl = new URL(url);
  for (const [httpProto, wsProto] of Object.entries(map)) {
    if (wsUrl.protocol === httpProto) {
      wsUrl.protocol = wsProto;
    }
  }
  return wsUrl;
};

// node_modules/it-ws/dist/src/client.js
function connect(addr, opts) {
  const location = typeof window === "undefined" ? void 0 : window.location;
  opts = opts ?? {};
  const url = ws_url_default(addr, location);
  const socket = new web_socket_browser_default(url.toString(), opts.websocket);
  return duplex_default(socket, opts);
}

// node_modules/p-defer/index.js
function pDefer() {
  const deferred = {};
  deferred.promise = new Promise((resolve, reject) => {
    deferred.resolve = resolve;
    deferred.reject = reject;
  });
  return deferred;
}

// node_modules/wherearewe/src/index.js
var import_is_electron = __toESM(require_is_electron(), 1);
var isEnvWithDom = typeof window === "object" && typeof document === "object" && document.nodeType === 9;
var isElectron = (0, import_is_electron.default)();
var isBrowser = isEnvWithDom && !isElectron;
var isNode = typeof globalThis.process !== "undefined" && typeof globalThis.process.release !== "undefined" && globalThis.process.release.name === "node" && !isElectron;
var isWebWorker = typeof importScripts === "function" && typeof self !== "undefined" && typeof WorkerGlobalScope !== "undefined" && self instanceof WorkerGlobalScope;
var isTest = typeof globalThis.process !== "undefined" && typeof globalThis.process.env !== "undefined" && globalThis.process.env["NODE" + (() => "_")() + "ENV"] === "test";
var isReactNative = typeof navigator !== "undefined" && navigator.product === "ReactNative";

// node_modules/@multiformats/mafmt/dist/src/index.js
var DNS4 = base4("dns4");
var DNS6 = base4("dns6");
var DNSADDR = base4("dnsaddr");
var DNS = or4(base4("dns"), DNSADDR, DNS4, DNS6);
var IP = or4(base4("ip4"), base4("ip6"));
var TCP = or4(and(IP, base4("tcp")), and(DNS, base4("tcp")));
var UDP = and(IP, base4("udp"));
var UTP = and(UDP, base4("utp"));
var QUIC = and(UDP, base4("quic"));
var QUICV1 = and(UDP, base4("quic-v1"));
var _WebSockets = or4(and(TCP, base4("ws")), and(DNS, base4("ws")));
var WebSockets = or4(and(_WebSockets, base4("p2p")), _WebSockets);
var _WebSocketsSecure = or4(and(TCP, base4("wss")), and(DNS, base4("wss")), and(TCP, base4("tls"), base4("ws")), and(DNS, base4("tls"), base4("ws")));
var WebSocketsSecure = or4(and(_WebSocketsSecure, base4("p2p")), _WebSocketsSecure);
var HTTP = or4(and(TCP, base4("http")), and(IP, base4("http")), and(DNS, base4("http")));
var HTTPS = or4(and(TCP, base4("https")), and(IP, base4("https")), and(DNS, base4("https")));
var _WebRTCDirect = and(UDP, base4("webrtc-direct"), base4("certhash"));
var WebRTCDirect = or4(and(_WebRTCDirect, base4("p2p")), _WebRTCDirect);
var _WebTransport = and(QUICV1, base4("webtransport"), base4("certhash"), base4("certhash"));
var WebTransport = or4(and(_WebTransport, base4("p2p")), _WebTransport);
var P2PWebRTCStar = or4(and(WebSockets, base4("p2p-webrtc-star"), base4("p2p")), and(WebSocketsSecure, base4("p2p-webrtc-star"), base4("p2p")), and(WebSockets, base4("p2p-webrtc-star")), and(WebSocketsSecure, base4("p2p-webrtc-star")));
var WebSocketStar = or4(and(WebSockets, base4("p2p-websocket-star"), base4("p2p")), and(WebSocketsSecure, base4("p2p-websocket-star"), base4("p2p")), and(WebSockets, base4("p2p-websocket-star")), and(WebSocketsSecure, base4("p2p-websocket-star")));
var P2PWebRTCDirect = or4(and(HTTP, base4("p2p-webrtc-direct"), base4("p2p")), and(HTTPS, base4("p2p-webrtc-direct"), base4("p2p")), and(HTTP, base4("p2p-webrtc-direct")), and(HTTPS, base4("p2p-webrtc-direct")));
var Reliable = or4(_WebSockets, _WebSocketsSecure, HTTP, HTTPS, P2PWebRTCStar, P2PWebRTCDirect, TCP, UTP, QUIC, DNS, WebRTCDirect, WebTransport);
var Stardust = or4(and(Reliable, base4("p2p-stardust"), base4("p2p")), and(Reliable, base4("p2p-stardust")));
var _P2P = or4(and(Reliable, base4("p2p")), P2PWebRTCStar, P2PWebRTCDirect, WebRTCDirect, WebTransport, base4("p2p"));
var _Circuit = or4(and(_P2P, base4("p2p-circuit"), _P2P), and(_P2P, base4("p2p-circuit")), and(base4("p2p-circuit"), _P2P), and(Reliable, base4("p2p-circuit")), and(base4("p2p-circuit"), Reliable), base4("p2p-circuit"));
var CircuitRecursive = () => or4(and(_Circuit, CircuitRecursive), _Circuit);
var Circuit = CircuitRecursive();
var P2P = or4(and(Circuit, _P2P, Circuit), and(_P2P, Circuit), and(Circuit, _P2P), Circuit, _P2P);
var WebRTC = or4(and(Circuit, base4("webrtc"), base4("p2p")), and(Circuit, base4("webrtc")), and(Reliable, base4("webrtc"), base4("p2p")), and(Reliable, base4("webrtc")), base4("webrtc"));
function makeMatchesFunction(partialMatch) {
  function matches(a) {
    let ma;
    try {
      ma = multiaddr(a);
    } catch (err) {
      return false;
    }
    const out = partialMatch(ma.protoNames());
    if (out === null) {
      return false;
    }
    if (out === true || out === false) {
      return out;
    }
    return out.length === 0;
  }
  return matches;
}
function and(...args) {
  function partialMatch(a) {
    if (a.length < args.length) {
      return null;
    }
    let out = a;
    args.some((arg) => {
      out = typeof arg === "function" ? arg().partialMatch(a) : arg.partialMatch(a);
      if (Array.isArray(out)) {
        a = out;
      }
      if (out === null) {
        return true;
      }
      return false;
    });
    return out;
  }
  return {
    toString: function() {
      return "{ " + args.join(" ") + " }";
    },
    input: args,
    matches: makeMatchesFunction(partialMatch),
    partialMatch
  };
}
function or4(...args) {
  function partialMatch(a) {
    let out = null;
    args.some((arg) => {
      const res = typeof arg === "function" ? arg().partialMatch(a) : arg.partialMatch(a);
      if (res != null) {
        out = res;
        return true;
      }
      return false;
    });
    return out;
  }
  const result = {
    toString: function() {
      return "{ " + args.join(" ") + " }";
    },
    input: args,
    matches: makeMatchesFunction(partialMatch),
    partialMatch
  };
  return result;
}
function base4(n) {
  const name3 = n;
  function matches(a) {
    let ma;
    try {
      ma = multiaddr(a);
    } catch (err) {
      return false;
    }
    const pnames = ma.protoNames();
    if (pnames.length === 1 && pnames[0] === name3) {
      return true;
    }
    return false;
  }
  function partialMatch(protos) {
    if (protos.length === 0) {
      return null;
    }
    if (protos[0] === name3) {
      return protos.slice(1);
    }
    return null;
  }
  return {
    toString: function() {
      return name3;
    },
    matches,
    partialMatch
  };
}

// node_modules/@libp2p/websockets/dist/src/constants.js
var CODE_P2P = 421;
var CODE_CIRCUIT = 290;
var CLOSE_TIMEOUT = 2e3;

// node_modules/@libp2p/websockets/dist/src/filters.js
function all(multiaddrs) {
  return multiaddrs.filter((ma) => {
    if (ma.protoCodes().includes(CODE_CIRCUIT)) {
      return false;
    }
    const testMa = ma.decapsulateCode(CODE_P2P);
    return WebSockets.matches(testMa) || WebSocketsSecure.matches(testMa);
  });
}
function wss(multiaddrs) {
  return multiaddrs.filter((ma) => {
    if (ma.protoCodes().includes(CODE_CIRCUIT)) {
      return false;
    }
    const testMa = ma.decapsulateCode(CODE_P2P);
    return WebSocketsSecure.matches(testMa);
  });
}

// node_modules/@libp2p/websockets/dist/src/listener.browser.js
function createListener() {
  throw new Error("WebSocket Servers can not be created in the browser!");
}

// node_modules/get-iterator/dist/src/index.js
function getIterator(obj) {
  if (obj != null) {
    if (typeof obj[Symbol.iterator] === "function") {
      return obj[Symbol.iterator]();
    }
    if (typeof obj[Symbol.asyncIterator] === "function") {
      return obj[Symbol.asyncIterator]();
    }
    if (typeof obj.next === "function") {
      return obj;
    }
  }
  throw new Error("argument is not an iterator or iterable");
}

// node_modules/abortable-iterator/dist/src/abort-error.js
var AbortError2 = class extends Error {
  type;
  code;
  constructor(message, code3, name3) {
    super(message ?? "The operation was aborted");
    this.type = "aborted";
    this.code = code3 ?? "ABORT_ERR";
    this.name = name3 ?? "AbortError";
  }
};

// node_modules/abortable-iterator/dist/src/index.js
function abortableSource(source, signal, options) {
  const opts = options ?? {};
  const iterator = getIterator(source);
  async function* abortable() {
    let nextAbortHandler;
    const abortHandler = () => {
      if (nextAbortHandler != null)
        nextAbortHandler();
    };
    signal.addEventListener("abort", abortHandler);
    while (true) {
      let result;
      try {
        if (signal.aborted) {
          const { abortMessage, abortCode, abortName } = opts;
          throw new AbortError2(abortMessage, abortCode, abortName);
        }
        const abort = new Promise((resolve, reject) => {
          nextAbortHandler = () => {
            const { abortMessage, abortCode, abortName } = opts;
            reject(new AbortError2(abortMessage, abortCode, abortName));
          };
        });
        result = await Promise.race([abort, iterator.next()]);
        nextAbortHandler = null;
      } catch (err) {
        signal.removeEventListener("abort", abortHandler);
        const isKnownAborter = err.type === "aborted" && signal.aborted;
        if (isKnownAborter && opts.onAbort != null) {
          opts.onAbort(source);
        }
        if (typeof iterator.return === "function") {
          try {
            const p = iterator.return();
            if (p instanceof Promise) {
              p.catch((err2) => {
                if (opts.onReturnError != null) {
                  opts.onReturnError(err2);
                }
              });
            }
          } catch (err2) {
            if (opts.onReturnError != null) {
              opts.onReturnError(err2);
            }
          }
        }
        if (isKnownAborter && opts.returnOnAbort === true) {
          return;
        }
        throw err;
      }
      if (result.done === true) {
        break;
      }
      yield result.value;
    }
    signal.removeEventListener("abort", abortHandler);
  }
  return abortable();
}

// node_modules/p-timeout/index.js
var TimeoutError = class extends Error {
  constructor(message) {
    super(message);
    this.name = "TimeoutError";
  }
};
var AbortError3 = class extends Error {
  constructor(message) {
    super();
    this.name = "AbortError";
    this.message = message;
  }
};
var getDOMException = (errorMessage) => globalThis.DOMException === void 0 ? new AbortError3(errorMessage) : new DOMException(errorMessage);
var getAbortedReason = (signal) => {
  const reason = signal.reason === void 0 ? getDOMException("This operation was aborted.") : signal.reason;
  return reason instanceof Error ? reason : getDOMException(reason);
};
function pTimeout(promise, options) {
  const {
    milliseconds,
    fallback,
    message,
    customTimers = { setTimeout, clearTimeout }
  } = options;
  let timer;
  const wrappedPromise = new Promise((resolve, reject) => {
    if (typeof milliseconds !== "number" || Math.sign(milliseconds) !== 1) {
      throw new TypeError(`Expected \`milliseconds\` to be a positive number, got \`${milliseconds}\``);
    }
    if (options.signal) {
      const { signal } = options;
      if (signal.aborted) {
        reject(getAbortedReason(signal));
      }
      signal.addEventListener("abort", () => {
        reject(getAbortedReason(signal));
      });
    }
    if (milliseconds === Number.POSITIVE_INFINITY) {
      promise.then(resolve, reject);
      return;
    }
    const timeoutError = new TimeoutError();
    timer = customTimers.setTimeout.call(void 0, () => {
      if (fallback) {
        try {
          resolve(fallback());
        } catch (error) {
          reject(error);
        }
        return;
      }
      if (typeof promise.cancel === "function") {
        promise.cancel();
      }
      if (message === false) {
        resolve();
      } else if (message instanceof Error) {
        reject(message);
      } else {
        timeoutError.message = message ?? `Promise timed out after ${milliseconds} milliseconds`;
        reject(timeoutError);
      }
    }, milliseconds);
    (async () => {
      try {
        resolve(await promise);
      } catch (error) {
        reject(error);
      }
    })();
  });
  const cancelablePromise = wrappedPromise.finally(() => {
    cancelablePromise.clear();
  });
  cancelablePromise.clear = () => {
    customTimers.clearTimeout.call(void 0, timer);
    timer = void 0;
  };
  return cancelablePromise;
}

// node_modules/@libp2p/websockets/dist/src/socket-to-conn.js
var log = logger("libp2p:websockets:socket");
function socketToMaConn(stream, remoteAddr, options) {
  options = options ?? {};
  const maConn = {
    async sink(source) {
      if (options?.signal != null) {
        source = abortableSource(source, options.signal);
      }
      try {
        await stream.sink(source);
      } catch (err) {
        if (err.type !== "aborted") {
          log.error(err);
        }
      }
    },
    source: options.signal != null ? abortableSource(stream.source, options.signal) : stream.source,
    remoteAddr,
    timeline: { open: Date.now() },
    async close() {
      const start = Date.now();
      try {
        await pTimeout(stream.close(), {
          milliseconds: CLOSE_TIMEOUT
        });
      } catch (err) {
        const { host, port } = maConn.remoteAddr.toOptions();
        log("timeout closing stream to %s:%s after %dms, destroying it manually", host, port, Date.now() - start);
        stream.destroy();
      } finally {
        maConn.timeline.close = Date.now();
      }
    }
  };
  stream.socket.addEventListener("close", () => {
    if (maConn.timeline.close == null) {
      maConn.timeline.close = Date.now();
    }
  }, { once: true });
  return maConn;
}

// node_modules/@libp2p/websockets/dist/src/index.js
var log2 = logger("libp2p:websockets");
var WebSockets2 = class {
  init;
  constructor(init) {
    this.init = init;
  }
  [Symbol.toStringTag] = "@libp2p/websockets";
  [symbol] = true;
  async dial(ma, options) {
    log2("dialing %s", ma);
    options = options ?? {};
    const socket = await this._connect(ma, options);
    const maConn = socketToMaConn(socket, ma);
    log2("new outbound connection %s", maConn.remoteAddr);
    const conn = await options.upgrader.upgradeOutbound(maConn);
    log2("outbound connection %s upgraded", maConn.remoteAddr);
    return conn;
  }
  async _connect(ma, options) {
    if (options?.signal?.aborted === true) {
      throw new AbortError();
    }
    const cOpts = ma.toOptions();
    log2("dialing %s:%s", cOpts.host, cOpts.port);
    const errorPromise = pDefer();
    const errfn = (err) => {
      log2.error("connection error:", err);
      errorPromise.reject(err);
    };
    const rawSocket = connect(multiaddrToUri(ma), this.init);
    if (rawSocket.socket.on != null) {
      rawSocket.socket.on("error", errfn);
    } else {
      rawSocket.socket.onerror = errfn;
    }
    if (options.signal == null) {
      await Promise.race([rawSocket.connected(), errorPromise.promise]);
      log2("connected %s", ma);
      return rawSocket;
    }
    let onAbort;
    const abort = new Promise((resolve, reject) => {
      onAbort = () => {
        reject(new AbortError());
        rawSocket.close().catch((err) => {
          log2.error("error closing raw socket", err);
        });
      };
      if (options?.signal?.aborted === true) {
        onAbort();
        return;
      }
      options?.signal?.addEventListener("abort", onAbort);
    });
    try {
      await Promise.race([abort, errorPromise.promise, rawSocket.connected()]);
    } finally {
      if (onAbort != null) {
        options?.signal?.removeEventListener("abort", onAbort);
      }
    }
    log2("connected %s", ma);
    return rawSocket;
  }
  /**
   * Creates a Websockets listener. The provided `handler` function will be called
   * anytime a new incoming Connection has been successfully upgraded via
   * `upgrader.upgradeInbound`
   */
  createListener(options) {
    return createListener({ ...this.init, ...options });
  }
  /**
   * Takes a list of `Multiaddr`s and returns only valid Websockets addresses.
   * By default, in a browser environment only DNS+WSS multiaddr is accepted,
   * while in a Node.js environment DNS+{WS, WSS} multiaddrs are accepted.
   */
  filter(multiaddrs) {
    multiaddrs = Array.isArray(multiaddrs) ? multiaddrs : [multiaddrs];
    if (this.init?.filter != null) {
      return this.init?.filter(multiaddrs);
    }
    if (isBrowser || isWebWorker) {
      return wss(multiaddrs);
    }
    return all(multiaddrs);
  }
};
function webSockets(init = {}) {
  return () => {
    return new WebSockets2(init);
  };
}
export {
  webSockets
};
