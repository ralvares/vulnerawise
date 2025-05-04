(() => {
  var __defProp = Object.defineProperty;
  var __export = (target, all3) => {
    for (var name in all3)
      __defProp(target, name, { get: all3[name], enumerable: true });
  };

  // node_modules/axios/lib/helpers/bind.js
  function bind(fn, thisArg) {
    return function wrap() {
      return fn.apply(thisArg, arguments);
    };
  }

  // node_modules/axios/lib/utils.js
  var { toString } = Object.prototype;
  var { getPrototypeOf } = Object;
  var kindOf = /* @__PURE__ */ ((cache) => (thing) => {
    const str = toString.call(thing);
    return cache[str] || (cache[str] = str.slice(8, -1).toLowerCase());
  })(/* @__PURE__ */ Object.create(null));
  var kindOfTest = (type) => {
    type = type.toLowerCase();
    return (thing) => kindOf(thing) === type;
  };
  var typeOfTest = (type) => (thing) => typeof thing === type;
  var { isArray } = Array;
  var isUndefined = typeOfTest("undefined");
  function isBuffer(val) {
    return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor) && isFunction(val.constructor.isBuffer) && val.constructor.isBuffer(val);
  }
  var isArrayBuffer = kindOfTest("ArrayBuffer");
  function isArrayBufferView(val) {
    let result;
    if (typeof ArrayBuffer !== "undefined" && ArrayBuffer.isView) {
      result = ArrayBuffer.isView(val);
    } else {
      result = val && val.buffer && isArrayBuffer(val.buffer);
    }
    return result;
  }
  var isString = typeOfTest("string");
  var isFunction = typeOfTest("function");
  var isNumber = typeOfTest("number");
  var isObject = (thing) => thing !== null && typeof thing === "object";
  var isBoolean = (thing) => thing === true || thing === false;
  var isPlainObject = (val) => {
    if (kindOf(val) !== "object") {
      return false;
    }
    const prototype3 = getPrototypeOf(val);
    return (prototype3 === null || prototype3 === Object.prototype || Object.getPrototypeOf(prototype3) === null) && !(Symbol.toStringTag in val) && !(Symbol.iterator in val);
  };
  var isDate = kindOfTest("Date");
  var isFile = kindOfTest("File");
  var isBlob = kindOfTest("Blob");
  var isFileList = kindOfTest("FileList");
  var isStream = (val) => isObject(val) && isFunction(val.pipe);
  var isFormData = (thing) => {
    let kind;
    return thing && (typeof FormData === "function" && thing instanceof FormData || isFunction(thing.append) && ((kind = kindOf(thing)) === "formdata" || // detect form-data instance
    kind === "object" && isFunction(thing.toString) && thing.toString() === "[object FormData]"));
  };
  var isURLSearchParams = kindOfTest("URLSearchParams");
  var [isReadableStream, isRequest, isResponse, isHeaders] = ["ReadableStream", "Request", "Response", "Headers"].map(kindOfTest);
  var trim = (str) => str.trim ? str.trim() : str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
  function forEach(obj, fn, { allOwnKeys = false } = {}) {
    if (obj === null || typeof obj === "undefined") {
      return;
    }
    let i;
    let l;
    if (typeof obj !== "object") {
      obj = [obj];
    }
    if (isArray(obj)) {
      for (i = 0, l = obj.length; i < l; i++) {
        fn.call(null, obj[i], i, obj);
      }
    } else {
      const keys = allOwnKeys ? Object.getOwnPropertyNames(obj) : Object.keys(obj);
      const len = keys.length;
      let key;
      for (i = 0; i < len; i++) {
        key = keys[i];
        fn.call(null, obj[key], key, obj);
      }
    }
  }
  function findKey(obj, key) {
    key = key.toLowerCase();
    const keys = Object.keys(obj);
    let i = keys.length;
    let _key;
    while (i-- > 0) {
      _key = keys[i];
      if (key === _key.toLowerCase()) {
        return _key;
      }
    }
    return null;
  }
  var _global = (() => {
    if (typeof globalThis !== "undefined") return globalThis;
    return typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : global;
  })();
  var isContextDefined = (context) => !isUndefined(context) && context !== _global;
  function merge() {
    const { caseless } = isContextDefined(this) && this || {};
    const result = {};
    const assignValue = (val, key) => {
      const targetKey = caseless && findKey(result, key) || key;
      if (isPlainObject(result[targetKey]) && isPlainObject(val)) {
        result[targetKey] = merge(result[targetKey], val);
      } else if (isPlainObject(val)) {
        result[targetKey] = merge({}, val);
      } else if (isArray(val)) {
        result[targetKey] = val.slice();
      } else {
        result[targetKey] = val;
      }
    };
    for (let i = 0, l = arguments.length; i < l; i++) {
      arguments[i] && forEach(arguments[i], assignValue);
    }
    return result;
  }
  var extend = (a, b, thisArg, { allOwnKeys } = {}) => {
    forEach(b, (val, key) => {
      if (thisArg && isFunction(val)) {
        a[key] = bind(val, thisArg);
      } else {
        a[key] = val;
      }
    }, { allOwnKeys });
    return a;
  };
  var stripBOM = (content) => {
    if (content.charCodeAt(0) === 65279) {
      content = content.slice(1);
    }
    return content;
  };
  var inherits = (constructor, superConstructor, props, descriptors2) => {
    constructor.prototype = Object.create(superConstructor.prototype, descriptors2);
    constructor.prototype.constructor = constructor;
    Object.defineProperty(constructor, "super", {
      value: superConstructor.prototype
    });
    props && Object.assign(constructor.prototype, props);
  };
  var toFlatObject = (sourceObj, destObj, filter2, propFilter) => {
    let props;
    let i;
    let prop;
    const merged = {};
    destObj = destObj || {};
    if (sourceObj == null) return destObj;
    do {
      props = Object.getOwnPropertyNames(sourceObj);
      i = props.length;
      while (i-- > 0) {
        prop = props[i];
        if ((!propFilter || propFilter(prop, sourceObj, destObj)) && !merged[prop]) {
          destObj[prop] = sourceObj[prop];
          merged[prop] = true;
        }
      }
      sourceObj = filter2 !== false && getPrototypeOf(sourceObj);
    } while (sourceObj && (!filter2 || filter2(sourceObj, destObj)) && sourceObj !== Object.prototype);
    return destObj;
  };
  var endsWith = (str, searchString, position) => {
    str = String(str);
    if (position === void 0 || position > str.length) {
      position = str.length;
    }
    position -= searchString.length;
    const lastIndex = str.indexOf(searchString, position);
    return lastIndex !== -1 && lastIndex === position;
  };
  var toArray = (thing) => {
    if (!thing) return null;
    if (isArray(thing)) return thing;
    let i = thing.length;
    if (!isNumber(i)) return null;
    const arr = new Array(i);
    while (i-- > 0) {
      arr[i] = thing[i];
    }
    return arr;
  };
  var isTypedArray = /* @__PURE__ */ ((TypedArray) => {
    return (thing) => {
      return TypedArray && thing instanceof TypedArray;
    };
  })(typeof Uint8Array !== "undefined" && getPrototypeOf(Uint8Array));
  var forEachEntry = (obj, fn) => {
    const generator = obj && obj[Symbol.iterator];
    const iterator = generator.call(obj);
    let result;
    while ((result = iterator.next()) && !result.done) {
      const pair = result.value;
      fn.call(obj, pair[0], pair[1]);
    }
  };
  var matchAll = (regExp, str) => {
    let matches;
    const arr = [];
    while ((matches = regExp.exec(str)) !== null) {
      arr.push(matches);
    }
    return arr;
  };
  var isHTMLForm = kindOfTest("HTMLFormElement");
  var toCamelCase = (str) => {
    return str.toLowerCase().replace(
      /[-_\s]([a-z\d])(\w*)/g,
      function replacer(m, p1, p2) {
        return p1.toUpperCase() + p2;
      }
    );
  };
  var hasOwnProperty = (({ hasOwnProperty: hasOwnProperty2 }) => (obj, prop) => hasOwnProperty2.call(obj, prop))(Object.prototype);
  var isRegExp = kindOfTest("RegExp");
  var reduceDescriptors = (obj, reducer) => {
    const descriptors2 = Object.getOwnPropertyDescriptors(obj);
    const reducedDescriptors = {};
    forEach(descriptors2, (descriptor, name) => {
      let ret;
      if ((ret = reducer(descriptor, name, obj)) !== false) {
        reducedDescriptors[name] = ret || descriptor;
      }
    });
    Object.defineProperties(obj, reducedDescriptors);
  };
  var freezeMethods = (obj) => {
    reduceDescriptors(obj, (descriptor, name) => {
      if (isFunction(obj) && ["arguments", "caller", "callee"].indexOf(name) !== -1) {
        return false;
      }
      const value = obj[name];
      if (!isFunction(value)) return;
      descriptor.enumerable = false;
      if ("writable" in descriptor) {
        descriptor.writable = false;
        return;
      }
      if (!descriptor.set) {
        descriptor.set = () => {
          throw Error("Can not rewrite read-only method '" + name + "'");
        };
      }
    });
  };
  var toObjectSet = (arrayOrString, delimiter) => {
    const obj = {};
    const define = (arr) => {
      arr.forEach((value) => {
        obj[value] = true;
      });
    };
    isArray(arrayOrString) ? define(arrayOrString) : define(String(arrayOrString).split(delimiter));
    return obj;
  };
  var noop = () => {
  };
  var toFiniteNumber = (value, defaultValue) => {
    return value != null && Number.isFinite(value = +value) ? value : defaultValue;
  };
  function isSpecCompliantForm(thing) {
    return !!(thing && isFunction(thing.append) && thing[Symbol.toStringTag] === "FormData" && thing[Symbol.iterator]);
  }
  var toJSONObject = (obj) => {
    const stack = new Array(10);
    const visit = (source, i) => {
      if (isObject(source)) {
        if (stack.indexOf(source) >= 0) {
          return;
        }
        if (!("toJSON" in source)) {
          stack[i] = source;
          const target = isArray(source) ? [] : {};
          forEach(source, (value, key) => {
            const reducedValue = visit(value, i + 1);
            !isUndefined(reducedValue) && (target[key] = reducedValue);
          });
          stack[i] = void 0;
          return target;
        }
      }
      return source;
    };
    return visit(obj, 0);
  };
  var isAsyncFn = kindOfTest("AsyncFunction");
  var isThenable = (thing) => thing && (isObject(thing) || isFunction(thing)) && isFunction(thing.then) && isFunction(thing.catch);
  var _setImmediate = ((setImmediateSupported, postMessageSupported) => {
    if (setImmediateSupported) {
      return setImmediate;
    }
    return postMessageSupported ? ((token, callbacks) => {
      _global.addEventListener("message", ({ source, data }) => {
        if (source === _global && data === token) {
          callbacks.length && callbacks.shift()();
        }
      }, false);
      return (cb) => {
        callbacks.push(cb);
        _global.postMessage(token, "*");
      };
    })(`axios@${Math.random()}`, []) : (cb) => setTimeout(cb);
  })(
    typeof setImmediate === "function",
    isFunction(_global.postMessage)
  );
  var asap = typeof queueMicrotask !== "undefined" ? queueMicrotask.bind(_global) : typeof process !== "undefined" && process.nextTick || _setImmediate;
  var utils_default = {
    isArray,
    isArrayBuffer,
    isBuffer,
    isFormData,
    isArrayBufferView,
    isString,
    isNumber,
    isBoolean,
    isObject,
    isPlainObject,
    isReadableStream,
    isRequest,
    isResponse,
    isHeaders,
    isUndefined,
    isDate,
    isFile,
    isBlob,
    isRegExp,
    isFunction,
    isStream,
    isURLSearchParams,
    isTypedArray,
    isFileList,
    forEach,
    merge,
    extend,
    trim,
    stripBOM,
    inherits,
    toFlatObject,
    kindOf,
    kindOfTest,
    endsWith,
    toArray,
    forEachEntry,
    matchAll,
    isHTMLForm,
    hasOwnProperty,
    hasOwnProp: hasOwnProperty,
    // an alias to avoid ESLint no-prototype-builtins detection
    reduceDescriptors,
    freezeMethods,
    toObjectSet,
    toCamelCase,
    noop,
    toFiniteNumber,
    findKey,
    global: _global,
    isContextDefined,
    isSpecCompliantForm,
    toJSONObject,
    isAsyncFn,
    isThenable,
    setImmediate: _setImmediate,
    asap
  };

  // node_modules/axios/lib/core/AxiosError.js
  function AxiosError(message, code, config, request, response) {
    Error.call(this);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    } else {
      this.stack = new Error().stack;
    }
    this.message = message;
    this.name = "AxiosError";
    code && (this.code = code);
    config && (this.config = config);
    request && (this.request = request);
    if (response) {
      this.response = response;
      this.status = response.status ? response.status : null;
    }
  }
  utils_default.inherits(AxiosError, Error, {
    toJSON: function toJSON() {
      return {
        // Standard
        message: this.message,
        name: this.name,
        // Microsoft
        description: this.description,
        number: this.number,
        // Mozilla
        fileName: this.fileName,
        lineNumber: this.lineNumber,
        columnNumber: this.columnNumber,
        stack: this.stack,
        // Axios
        config: utils_default.toJSONObject(this.config),
        code: this.code,
        status: this.status
      };
    }
  });
  var prototype = AxiosError.prototype;
  var descriptors = {};
  [
    "ERR_BAD_OPTION_VALUE",
    "ERR_BAD_OPTION",
    "ECONNABORTED",
    "ETIMEDOUT",
    "ERR_NETWORK",
    "ERR_FR_TOO_MANY_REDIRECTS",
    "ERR_DEPRECATED",
    "ERR_BAD_RESPONSE",
    "ERR_BAD_REQUEST",
    "ERR_CANCELED",
    "ERR_NOT_SUPPORT",
    "ERR_INVALID_URL"
    // eslint-disable-next-line func-names
  ].forEach((code) => {
    descriptors[code] = { value: code };
  });
  Object.defineProperties(AxiosError, descriptors);
  Object.defineProperty(prototype, "isAxiosError", { value: true });
  AxiosError.from = (error, code, config, request, response, customProps) => {
    const axiosError = Object.create(prototype);
    utils_default.toFlatObject(error, axiosError, function filter2(obj) {
      return obj !== Error.prototype;
    }, (prop) => {
      return prop !== "isAxiosError";
    });
    AxiosError.call(axiosError, error.message, code, config, request, response);
    axiosError.cause = error;
    axiosError.name = error.name;
    customProps && Object.assign(axiosError, customProps);
    return axiosError;
  };
  var AxiosError_default = AxiosError;

  // node_modules/axios/lib/helpers/null.js
  var null_default = null;

  // node_modules/axios/lib/helpers/toFormData.js
  function isVisitable(thing) {
    return utils_default.isPlainObject(thing) || utils_default.isArray(thing);
  }
  function removeBrackets(key) {
    return utils_default.endsWith(key, "[]") ? key.slice(0, -2) : key;
  }
  function renderKey(path, key, dots) {
    if (!path) return key;
    return path.concat(key).map(function each(token, i) {
      token = removeBrackets(token);
      return !dots && i ? "[" + token + "]" : token;
    }).join(dots ? "." : "");
  }
  function isFlatArray(arr) {
    return utils_default.isArray(arr) && !arr.some(isVisitable);
  }
  var predicates = utils_default.toFlatObject(utils_default, {}, null, function filter(prop) {
    return /^is[A-Z]/.test(prop);
  });
  function toFormData(obj, formData, options) {
    if (!utils_default.isObject(obj)) {
      throw new TypeError("target must be an object");
    }
    formData = formData || new (null_default || FormData)();
    options = utils_default.toFlatObject(options, {
      metaTokens: true,
      dots: false,
      indexes: false
    }, false, function defined(option, source) {
      return !utils_default.isUndefined(source[option]);
    });
    const metaTokens = options.metaTokens;
    const visitor = options.visitor || defaultVisitor;
    const dots = options.dots;
    const indexes = options.indexes;
    const _Blob = options.Blob || typeof Blob !== "undefined" && Blob;
    const useBlob = _Blob && utils_default.isSpecCompliantForm(formData);
    if (!utils_default.isFunction(visitor)) {
      throw new TypeError("visitor must be a function");
    }
    function convertValue(value) {
      if (value === null) return "";
      if (utils_default.isDate(value)) {
        return value.toISOString();
      }
      if (!useBlob && utils_default.isBlob(value)) {
        throw new AxiosError_default("Blob is not supported. Use a Buffer instead.");
      }
      if (utils_default.isArrayBuffer(value) || utils_default.isTypedArray(value)) {
        return useBlob && typeof Blob === "function" ? new Blob([value]) : Buffer.from(value);
      }
      return value;
    }
    function defaultVisitor(value, key, path) {
      let arr = value;
      if (value && !path && typeof value === "object") {
        if (utils_default.endsWith(key, "{}")) {
          key = metaTokens ? key : key.slice(0, -2);
          value = JSON.stringify(value);
        } else if (utils_default.isArray(value) && isFlatArray(value) || (utils_default.isFileList(value) || utils_default.endsWith(key, "[]")) && (arr = utils_default.toArray(value))) {
          key = removeBrackets(key);
          arr.forEach(function each(el, index) {
            !(utils_default.isUndefined(el) || el === null) && formData.append(
              // eslint-disable-next-line no-nested-ternary
              indexes === true ? renderKey([key], index, dots) : indexes === null ? key : key + "[]",
              convertValue(el)
            );
          });
          return false;
        }
      }
      if (isVisitable(value)) {
        return true;
      }
      formData.append(renderKey(path, key, dots), convertValue(value));
      return false;
    }
    const stack = [];
    const exposedHelpers = Object.assign(predicates, {
      defaultVisitor,
      convertValue,
      isVisitable
    });
    function build(value, path) {
      if (utils_default.isUndefined(value)) return;
      if (stack.indexOf(value) !== -1) {
        throw Error("Circular reference detected in " + path.join("."));
      }
      stack.push(value);
      utils_default.forEach(value, function each(el, key) {
        const result = !(utils_default.isUndefined(el) || el === null) && visitor.call(
          formData,
          el,
          utils_default.isString(key) ? key.trim() : key,
          path,
          exposedHelpers
        );
        if (result === true) {
          build(el, path ? path.concat(key) : [key]);
        }
      });
      stack.pop();
    }
    if (!utils_default.isObject(obj)) {
      throw new TypeError("data must be an object");
    }
    build(obj);
    return formData;
  }
  var toFormData_default = toFormData;

  // node_modules/axios/lib/helpers/AxiosURLSearchParams.js
  function encode(str) {
    const charMap = {
      "!": "%21",
      "'": "%27",
      "(": "%28",
      ")": "%29",
      "~": "%7E",
      "%20": "+",
      "%00": "\0"
    };
    return encodeURIComponent(str).replace(/[!'()~]|%20|%00/g, function replacer(match) {
      return charMap[match];
    });
  }
  function AxiosURLSearchParams(params, options) {
    this._pairs = [];
    params && toFormData_default(params, this, options);
  }
  var prototype2 = AxiosURLSearchParams.prototype;
  prototype2.append = function append(name, value) {
    this._pairs.push([name, value]);
  };
  prototype2.toString = function toString2(encoder) {
    const _encode = encoder ? function(value) {
      return encoder.call(this, value, encode);
    } : encode;
    return this._pairs.map(function each(pair) {
      return _encode(pair[0]) + "=" + _encode(pair[1]);
    }, "").join("&");
  };
  var AxiosURLSearchParams_default = AxiosURLSearchParams;

  // node_modules/axios/lib/helpers/buildURL.js
  function encode2(val) {
    return encodeURIComponent(val).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
  }
  function buildURL(url, params, options) {
    if (!params) {
      return url;
    }
    const _encode = options && options.encode || encode2;
    if (utils_default.isFunction(options)) {
      options = {
        serialize: options
      };
    }
    const serializeFn = options && options.serialize;
    let serializedParams;
    if (serializeFn) {
      serializedParams = serializeFn(params, options);
    } else {
      serializedParams = utils_default.isURLSearchParams(params) ? params.toString() : new AxiosURLSearchParams_default(params, options).toString(_encode);
    }
    if (serializedParams) {
      const hashmarkIndex = url.indexOf("#");
      if (hashmarkIndex !== -1) {
        url = url.slice(0, hashmarkIndex);
      }
      url += (url.indexOf("?") === -1 ? "?" : "&") + serializedParams;
    }
    return url;
  }

  // node_modules/axios/lib/core/InterceptorManager.js
  var InterceptorManager = class {
    constructor() {
      this.handlers = [];
    }
    /**
     * Add a new interceptor to the stack
     *
     * @param {Function} fulfilled The function to handle `then` for a `Promise`
     * @param {Function} rejected The function to handle `reject` for a `Promise`
     *
     * @return {Number} An ID used to remove interceptor later
     */
    use(fulfilled, rejected, options) {
      this.handlers.push({
        fulfilled,
        rejected,
        synchronous: options ? options.synchronous : false,
        runWhen: options ? options.runWhen : null
      });
      return this.handlers.length - 1;
    }
    /**
     * Remove an interceptor from the stack
     *
     * @param {Number} id The ID that was returned by `use`
     *
     * @returns {Boolean} `true` if the interceptor was removed, `false` otherwise
     */
    eject(id) {
      if (this.handlers[id]) {
        this.handlers[id] = null;
      }
    }
    /**
     * Clear all interceptors from the stack
     *
     * @returns {void}
     */
    clear() {
      if (this.handlers) {
        this.handlers = [];
      }
    }
    /**
     * Iterate over all the registered interceptors
     *
     * This method is particularly useful for skipping over any
     * interceptors that may have become `null` calling `eject`.
     *
     * @param {Function} fn The function to call for each interceptor
     *
     * @returns {void}
     */
    forEach(fn) {
      utils_default.forEach(this.handlers, function forEachHandler(h) {
        if (h !== null) {
          fn(h);
        }
      });
    }
  };
  var InterceptorManager_default = InterceptorManager;

  // node_modules/axios/lib/defaults/transitional.js
  var transitional_default = {
    silentJSONParsing: true,
    forcedJSONParsing: true,
    clarifyTimeoutError: false
  };

  // node_modules/axios/lib/platform/browser/classes/URLSearchParams.js
  var URLSearchParams_default = typeof URLSearchParams !== "undefined" ? URLSearchParams : AxiosURLSearchParams_default;

  // node_modules/axios/lib/platform/browser/classes/FormData.js
  var FormData_default = typeof FormData !== "undefined" ? FormData : null;

  // node_modules/axios/lib/platform/browser/classes/Blob.js
  var Blob_default = typeof Blob !== "undefined" ? Blob : null;

  // node_modules/axios/lib/platform/browser/index.js
  var browser_default = {
    isBrowser: true,
    classes: {
      URLSearchParams: URLSearchParams_default,
      FormData: FormData_default,
      Blob: Blob_default
    },
    protocols: ["http", "https", "file", "blob", "url", "data"]
  };

  // node_modules/axios/lib/platform/common/utils.js
  var utils_exports = {};
  __export(utils_exports, {
    hasBrowserEnv: () => hasBrowserEnv,
    hasStandardBrowserEnv: () => hasStandardBrowserEnv,
    hasStandardBrowserWebWorkerEnv: () => hasStandardBrowserWebWorkerEnv,
    navigator: () => _navigator,
    origin: () => origin
  });
  var hasBrowserEnv = typeof window !== "undefined" && typeof document !== "undefined";
  var _navigator = typeof navigator === "object" && navigator || void 0;
  var hasStandardBrowserEnv = hasBrowserEnv && (!_navigator || ["ReactNative", "NativeScript", "NS"].indexOf(_navigator.product) < 0);
  var hasStandardBrowserWebWorkerEnv = (() => {
    return typeof WorkerGlobalScope !== "undefined" && // eslint-disable-next-line no-undef
    self instanceof WorkerGlobalScope && typeof self.importScripts === "function";
  })();
  var origin = hasBrowserEnv && window.location.href || "http://localhost";

  // node_modules/axios/lib/platform/index.js
  var platform_default = {
    ...utils_exports,
    ...browser_default
  };

  // node_modules/axios/lib/helpers/toURLEncodedForm.js
  function toURLEncodedForm(data, options) {
    return toFormData_default(data, new platform_default.classes.URLSearchParams(), Object.assign({
      visitor: function(value, key, path, helpers) {
        if (platform_default.isNode && utils_default.isBuffer(value)) {
          this.append(key, value.toString("base64"));
          return false;
        }
        return helpers.defaultVisitor.apply(this, arguments);
      }
    }, options));
  }

  // node_modules/axios/lib/helpers/formDataToJSON.js
  function parsePropPath(name) {
    return utils_default.matchAll(/\w+|\[(\w*)]/g, name).map((match) => {
      return match[0] === "[]" ? "" : match[1] || match[0];
    });
  }
  function arrayToObject(arr) {
    const obj = {};
    const keys = Object.keys(arr);
    let i;
    const len = keys.length;
    let key;
    for (i = 0; i < len; i++) {
      key = keys[i];
      obj[key] = arr[key];
    }
    return obj;
  }
  function formDataToJSON(formData) {
    function buildPath(path, value, target, index) {
      let name = path[index++];
      if (name === "__proto__") return true;
      const isNumericKey = Number.isFinite(+name);
      const isLast = index >= path.length;
      name = !name && utils_default.isArray(target) ? target.length : name;
      if (isLast) {
        if (utils_default.hasOwnProp(target, name)) {
          target[name] = [target[name], value];
        } else {
          target[name] = value;
        }
        return !isNumericKey;
      }
      if (!target[name] || !utils_default.isObject(target[name])) {
        target[name] = [];
      }
      const result = buildPath(path, value, target[name], index);
      if (result && utils_default.isArray(target[name])) {
        target[name] = arrayToObject(target[name]);
      }
      return !isNumericKey;
    }
    if (utils_default.isFormData(formData) && utils_default.isFunction(formData.entries)) {
      const obj = {};
      utils_default.forEachEntry(formData, (name, value) => {
        buildPath(parsePropPath(name), value, obj, 0);
      });
      return obj;
    }
    return null;
  }
  var formDataToJSON_default = formDataToJSON;

  // node_modules/axios/lib/defaults/index.js
  function stringifySafely(rawValue, parser, encoder) {
    if (utils_default.isString(rawValue)) {
      try {
        (parser || JSON.parse)(rawValue);
        return utils_default.trim(rawValue);
      } catch (e) {
        if (e.name !== "SyntaxError") {
          throw e;
        }
      }
    }
    return (encoder || JSON.stringify)(rawValue);
  }
  var defaults = {
    transitional: transitional_default,
    adapter: ["xhr", "http", "fetch"],
    transformRequest: [function transformRequest(data, headers) {
      const contentType = headers.getContentType() || "";
      const hasJSONContentType = contentType.indexOf("application/json") > -1;
      const isObjectPayload = utils_default.isObject(data);
      if (isObjectPayload && utils_default.isHTMLForm(data)) {
        data = new FormData(data);
      }
      const isFormData2 = utils_default.isFormData(data);
      if (isFormData2) {
        return hasJSONContentType ? JSON.stringify(formDataToJSON_default(data)) : data;
      }
      if (utils_default.isArrayBuffer(data) || utils_default.isBuffer(data) || utils_default.isStream(data) || utils_default.isFile(data) || utils_default.isBlob(data) || utils_default.isReadableStream(data)) {
        return data;
      }
      if (utils_default.isArrayBufferView(data)) {
        return data.buffer;
      }
      if (utils_default.isURLSearchParams(data)) {
        headers.setContentType("application/x-www-form-urlencoded;charset=utf-8", false);
        return data.toString();
      }
      let isFileList2;
      if (isObjectPayload) {
        if (contentType.indexOf("application/x-www-form-urlencoded") > -1) {
          return toURLEncodedForm(data, this.formSerializer).toString();
        }
        if ((isFileList2 = utils_default.isFileList(data)) || contentType.indexOf("multipart/form-data") > -1) {
          const _FormData = this.env && this.env.FormData;
          return toFormData_default(
            isFileList2 ? { "files[]": data } : data,
            _FormData && new _FormData(),
            this.formSerializer
          );
        }
      }
      if (isObjectPayload || hasJSONContentType) {
        headers.setContentType("application/json", false);
        return stringifySafely(data);
      }
      return data;
    }],
    transformResponse: [function transformResponse(data) {
      const transitional2 = this.transitional || defaults.transitional;
      const forcedJSONParsing = transitional2 && transitional2.forcedJSONParsing;
      const JSONRequested = this.responseType === "json";
      if (utils_default.isResponse(data) || utils_default.isReadableStream(data)) {
        return data;
      }
      if (data && utils_default.isString(data) && (forcedJSONParsing && !this.responseType || JSONRequested)) {
        const silentJSONParsing = transitional2 && transitional2.silentJSONParsing;
        const strictJSONParsing = !silentJSONParsing && JSONRequested;
        try {
          return JSON.parse(data);
        } catch (e) {
          if (strictJSONParsing) {
            if (e.name === "SyntaxError") {
              throw AxiosError_default.from(e, AxiosError_default.ERR_BAD_RESPONSE, this, null, this.response);
            }
            throw e;
          }
        }
      }
      return data;
    }],
    /**
     * A timeout in milliseconds to abort a request. If set to 0 (default) a
     * timeout is not created.
     */
    timeout: 0,
    xsrfCookieName: "XSRF-TOKEN",
    xsrfHeaderName: "X-XSRF-TOKEN",
    maxContentLength: -1,
    maxBodyLength: -1,
    env: {
      FormData: platform_default.classes.FormData,
      Blob: platform_default.classes.Blob
    },
    validateStatus: function validateStatus(status) {
      return status >= 200 && status < 300;
    },
    headers: {
      common: {
        "Accept": "application/json, text/plain, */*",
        "Content-Type": void 0
      }
    }
  };
  utils_default.forEach(["delete", "get", "head", "post", "put", "patch"], (method) => {
    defaults.headers[method] = {};
  });
  var defaults_default = defaults;

  // node_modules/axios/lib/helpers/parseHeaders.js
  var ignoreDuplicateOf = utils_default.toObjectSet([
    "age",
    "authorization",
    "content-length",
    "content-type",
    "etag",
    "expires",
    "from",
    "host",
    "if-modified-since",
    "if-unmodified-since",
    "last-modified",
    "location",
    "max-forwards",
    "proxy-authorization",
    "referer",
    "retry-after",
    "user-agent"
  ]);
  var parseHeaders_default = (rawHeaders) => {
    const parsed = {};
    let key;
    let val;
    let i;
    rawHeaders && rawHeaders.split("\n").forEach(function parser(line) {
      i = line.indexOf(":");
      key = line.substring(0, i).trim().toLowerCase();
      val = line.substring(i + 1).trim();
      if (!key || parsed[key] && ignoreDuplicateOf[key]) {
        return;
      }
      if (key === "set-cookie") {
        if (parsed[key]) {
          parsed[key].push(val);
        } else {
          parsed[key] = [val];
        }
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ", " + val : val;
      }
    });
    return parsed;
  };

  // node_modules/axios/lib/core/AxiosHeaders.js
  var $internals = Symbol("internals");
  function normalizeHeader(header) {
    return header && String(header).trim().toLowerCase();
  }
  function normalizeValue(value) {
    if (value === false || value == null) {
      return value;
    }
    return utils_default.isArray(value) ? value.map(normalizeValue) : String(value);
  }
  function parseTokens(str) {
    const tokens = /* @__PURE__ */ Object.create(null);
    const tokensRE = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
    let match;
    while (match = tokensRE.exec(str)) {
      tokens[match[1]] = match[2];
    }
    return tokens;
  }
  var isValidHeaderName = (str) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(str.trim());
  function matchHeaderValue(context, value, header, filter2, isHeaderNameFilter) {
    if (utils_default.isFunction(filter2)) {
      return filter2.call(this, value, header);
    }
    if (isHeaderNameFilter) {
      value = header;
    }
    if (!utils_default.isString(value)) return;
    if (utils_default.isString(filter2)) {
      return value.indexOf(filter2) !== -1;
    }
    if (utils_default.isRegExp(filter2)) {
      return filter2.test(value);
    }
  }
  function formatHeader(header) {
    return header.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (w, char, str) => {
      return char.toUpperCase() + str;
    });
  }
  function buildAccessors(obj, header) {
    const accessorName = utils_default.toCamelCase(" " + header);
    ["get", "set", "has"].forEach((methodName) => {
      Object.defineProperty(obj, methodName + accessorName, {
        value: function(arg1, arg2, arg3) {
          return this[methodName].call(this, header, arg1, arg2, arg3);
        },
        configurable: true
      });
    });
  }
  var AxiosHeaders = class {
    constructor(headers) {
      headers && this.set(headers);
    }
    set(header, valueOrRewrite, rewrite) {
      const self2 = this;
      function setHeader(_value, _header, _rewrite) {
        const lHeader = normalizeHeader(_header);
        if (!lHeader) {
          throw new Error("header name must be a non-empty string");
        }
        const key = utils_default.findKey(self2, lHeader);
        if (!key || self2[key] === void 0 || _rewrite === true || _rewrite === void 0 && self2[key] !== false) {
          self2[key || _header] = normalizeValue(_value);
        }
      }
      const setHeaders = (headers, _rewrite) => utils_default.forEach(headers, (_value, _header) => setHeader(_value, _header, _rewrite));
      if (utils_default.isPlainObject(header) || header instanceof this.constructor) {
        setHeaders(header, valueOrRewrite);
      } else if (utils_default.isString(header) && (header = header.trim()) && !isValidHeaderName(header)) {
        setHeaders(parseHeaders_default(header), valueOrRewrite);
      } else if (utils_default.isHeaders(header)) {
        for (const [key, value] of header.entries()) {
          setHeader(value, key, rewrite);
        }
      } else {
        header != null && setHeader(valueOrRewrite, header, rewrite);
      }
      return this;
    }
    get(header, parser) {
      header = normalizeHeader(header);
      if (header) {
        const key = utils_default.findKey(this, header);
        if (key) {
          const value = this[key];
          if (!parser) {
            return value;
          }
          if (parser === true) {
            return parseTokens(value);
          }
          if (utils_default.isFunction(parser)) {
            return parser.call(this, value, key);
          }
          if (utils_default.isRegExp(parser)) {
            return parser.exec(value);
          }
          throw new TypeError("parser must be boolean|regexp|function");
        }
      }
    }
    has(header, matcher) {
      header = normalizeHeader(header);
      if (header) {
        const key = utils_default.findKey(this, header);
        return !!(key && this[key] !== void 0 && (!matcher || matchHeaderValue(this, this[key], key, matcher)));
      }
      return false;
    }
    delete(header, matcher) {
      const self2 = this;
      let deleted = false;
      function deleteHeader(_header) {
        _header = normalizeHeader(_header);
        if (_header) {
          const key = utils_default.findKey(self2, _header);
          if (key && (!matcher || matchHeaderValue(self2, self2[key], key, matcher))) {
            delete self2[key];
            deleted = true;
          }
        }
      }
      if (utils_default.isArray(header)) {
        header.forEach(deleteHeader);
      } else {
        deleteHeader(header);
      }
      return deleted;
    }
    clear(matcher) {
      const keys = Object.keys(this);
      let i = keys.length;
      let deleted = false;
      while (i--) {
        const key = keys[i];
        if (!matcher || matchHeaderValue(this, this[key], key, matcher, true)) {
          delete this[key];
          deleted = true;
        }
      }
      return deleted;
    }
    normalize(format) {
      const self2 = this;
      const headers = {};
      utils_default.forEach(this, (value, header) => {
        const key = utils_default.findKey(headers, header);
        if (key) {
          self2[key] = normalizeValue(value);
          delete self2[header];
          return;
        }
        const normalized = format ? formatHeader(header) : String(header).trim();
        if (normalized !== header) {
          delete self2[header];
        }
        self2[normalized] = normalizeValue(value);
        headers[normalized] = true;
      });
      return this;
    }
    concat(...targets) {
      return this.constructor.concat(this, ...targets);
    }
    toJSON(asStrings) {
      const obj = /* @__PURE__ */ Object.create(null);
      utils_default.forEach(this, (value, header) => {
        value != null && value !== false && (obj[header] = asStrings && utils_default.isArray(value) ? value.join(", ") : value);
      });
      return obj;
    }
    [Symbol.iterator]() {
      return Object.entries(this.toJSON())[Symbol.iterator]();
    }
    toString() {
      return Object.entries(this.toJSON()).map(([header, value]) => header + ": " + value).join("\n");
    }
    get [Symbol.toStringTag]() {
      return "AxiosHeaders";
    }
    static from(thing) {
      return thing instanceof this ? thing : new this(thing);
    }
    static concat(first, ...targets) {
      const computed = new this(first);
      targets.forEach((target) => computed.set(target));
      return computed;
    }
    static accessor(header) {
      const internals = this[$internals] = this[$internals] = {
        accessors: {}
      };
      const accessors = internals.accessors;
      const prototype3 = this.prototype;
      function defineAccessor(_header) {
        const lHeader = normalizeHeader(_header);
        if (!accessors[lHeader]) {
          buildAccessors(prototype3, _header);
          accessors[lHeader] = true;
        }
      }
      utils_default.isArray(header) ? header.forEach(defineAccessor) : defineAccessor(header);
      return this;
    }
  };
  AxiosHeaders.accessor(["Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent", "Authorization"]);
  utils_default.reduceDescriptors(AxiosHeaders.prototype, ({ value }, key) => {
    let mapped = key[0].toUpperCase() + key.slice(1);
    return {
      get: () => value,
      set(headerValue) {
        this[mapped] = headerValue;
      }
    };
  });
  utils_default.freezeMethods(AxiosHeaders);
  var AxiosHeaders_default = AxiosHeaders;

  // node_modules/axios/lib/core/transformData.js
  function transformData(fns, response) {
    const config = this || defaults_default;
    const context = response || config;
    const headers = AxiosHeaders_default.from(context.headers);
    let data = context.data;
    utils_default.forEach(fns, function transform(fn) {
      data = fn.call(config, data, headers.normalize(), response ? response.status : void 0);
    });
    headers.normalize();
    return data;
  }

  // node_modules/axios/lib/cancel/isCancel.js
  function isCancel(value) {
    return !!(value && value.__CANCEL__);
  }

  // node_modules/axios/lib/cancel/CanceledError.js
  function CanceledError(message, config, request) {
    AxiosError_default.call(this, message == null ? "canceled" : message, AxiosError_default.ERR_CANCELED, config, request);
    this.name = "CanceledError";
  }
  utils_default.inherits(CanceledError, AxiosError_default, {
    __CANCEL__: true
  });
  var CanceledError_default = CanceledError;

  // node_modules/axios/lib/core/settle.js
  function settle(resolve, reject, response) {
    const validateStatus2 = response.config.validateStatus;
    if (!response.status || !validateStatus2 || validateStatus2(response.status)) {
      resolve(response);
    } else {
      reject(new AxiosError_default(
        "Request failed with status code " + response.status,
        [AxiosError_default.ERR_BAD_REQUEST, AxiosError_default.ERR_BAD_RESPONSE][Math.floor(response.status / 100) - 4],
        response.config,
        response.request,
        response
      ));
    }
  }

  // node_modules/axios/lib/helpers/parseProtocol.js
  function parseProtocol(url) {
    const match = /^([-+\w]{1,25})(:?\/\/|:)/.exec(url);
    return match && match[1] || "";
  }

  // node_modules/axios/lib/helpers/speedometer.js
  function speedometer(samplesCount, min) {
    samplesCount = samplesCount || 10;
    const bytes = new Array(samplesCount);
    const timestamps = new Array(samplesCount);
    let head = 0;
    let tail = 0;
    let firstSampleTS;
    min = min !== void 0 ? min : 1e3;
    return function push(chunkLength) {
      const now = Date.now();
      const startedAt = timestamps[tail];
      if (!firstSampleTS) {
        firstSampleTS = now;
      }
      bytes[head] = chunkLength;
      timestamps[head] = now;
      let i = tail;
      let bytesCount = 0;
      while (i !== head) {
        bytesCount += bytes[i++];
        i = i % samplesCount;
      }
      head = (head + 1) % samplesCount;
      if (head === tail) {
        tail = (tail + 1) % samplesCount;
      }
      if (now - firstSampleTS < min) {
        return;
      }
      const passed = startedAt && now - startedAt;
      return passed ? Math.round(bytesCount * 1e3 / passed) : void 0;
    };
  }
  var speedometer_default = speedometer;

  // node_modules/axios/lib/helpers/throttle.js
  function throttle(fn, freq) {
    let timestamp = 0;
    let threshold = 1e3 / freq;
    let lastArgs;
    let timer;
    const invoke = (args, now = Date.now()) => {
      timestamp = now;
      lastArgs = null;
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      fn.apply(null, args);
    };
    const throttled = (...args) => {
      const now = Date.now();
      const passed = now - timestamp;
      if (passed >= threshold) {
        invoke(args, now);
      } else {
        lastArgs = args;
        if (!timer) {
          timer = setTimeout(() => {
            timer = null;
            invoke(lastArgs);
          }, threshold - passed);
        }
      }
    };
    const flush = () => lastArgs && invoke(lastArgs);
    return [throttled, flush];
  }
  var throttle_default = throttle;

  // node_modules/axios/lib/helpers/progressEventReducer.js
  var progressEventReducer = (listener, isDownloadStream, freq = 3) => {
    let bytesNotified = 0;
    const _speedometer = speedometer_default(50, 250);
    return throttle_default((e) => {
      const loaded = e.loaded;
      const total = e.lengthComputable ? e.total : void 0;
      const progressBytes = loaded - bytesNotified;
      const rate = _speedometer(progressBytes);
      const inRange = loaded <= total;
      bytesNotified = loaded;
      const data = {
        loaded,
        total,
        progress: total ? loaded / total : void 0,
        bytes: progressBytes,
        rate: rate ? rate : void 0,
        estimated: rate && total && inRange ? (total - loaded) / rate : void 0,
        event: e,
        lengthComputable: total != null,
        [isDownloadStream ? "download" : "upload"]: true
      };
      listener(data);
    }, freq);
  };
  var progressEventDecorator = (total, throttled) => {
    const lengthComputable = total != null;
    return [(loaded) => throttled[0]({
      lengthComputable,
      total,
      loaded
    }), throttled[1]];
  };
  var asyncDecorator = (fn) => (...args) => utils_default.asap(() => fn(...args));

  // node_modules/axios/lib/helpers/isURLSameOrigin.js
  var isURLSameOrigin_default = platform_default.hasStandardBrowserEnv ? /* @__PURE__ */ ((origin2, isMSIE) => (url) => {
    url = new URL(url, platform_default.origin);
    return origin2.protocol === url.protocol && origin2.host === url.host && (isMSIE || origin2.port === url.port);
  })(
    new URL(platform_default.origin),
    platform_default.navigator && /(msie|trident)/i.test(platform_default.navigator.userAgent)
  ) : () => true;

  // node_modules/axios/lib/helpers/cookies.js
  var cookies_default = platform_default.hasStandardBrowserEnv ? (
    // Standard browser envs support document.cookie
    {
      write(name, value, expires, path, domain, secure) {
        const cookie = [name + "=" + encodeURIComponent(value)];
        utils_default.isNumber(expires) && cookie.push("expires=" + new Date(expires).toGMTString());
        utils_default.isString(path) && cookie.push("path=" + path);
        utils_default.isString(domain) && cookie.push("domain=" + domain);
        secure === true && cookie.push("secure");
        document.cookie = cookie.join("; ");
      },
      read(name) {
        const match = document.cookie.match(new RegExp("(^|;\\s*)(" + name + ")=([^;]*)"));
        return match ? decodeURIComponent(match[3]) : null;
      },
      remove(name) {
        this.write(name, "", Date.now() - 864e5);
      }
    }
  ) : (
    // Non-standard browser env (web workers, react-native) lack needed support.
    {
      write() {
      },
      read() {
        return null;
      },
      remove() {
      }
    }
  );

  // node_modules/axios/lib/helpers/isAbsoluteURL.js
  function isAbsoluteURL(url) {
    return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);
  }

  // node_modules/axios/lib/helpers/combineURLs.js
  function combineURLs(baseURL, relativeURL) {
    return relativeURL ? baseURL.replace(/\/?\/$/, "") + "/" + relativeURL.replace(/^\/+/, "") : baseURL;
  }

  // node_modules/axios/lib/core/buildFullPath.js
  function buildFullPath(baseURL, requestedURL, allowAbsoluteUrls) {
    let isRelativeUrl = !isAbsoluteURL(requestedURL);
    if (baseURL && (isRelativeUrl || allowAbsoluteUrls == false)) {
      return combineURLs(baseURL, requestedURL);
    }
    return requestedURL;
  }

  // node_modules/axios/lib/core/mergeConfig.js
  var headersToObject = (thing) => thing instanceof AxiosHeaders_default ? { ...thing } : thing;
  function mergeConfig(config1, config2) {
    config2 = config2 || {};
    const config = {};
    function getMergedValue(target, source, prop, caseless) {
      if (utils_default.isPlainObject(target) && utils_default.isPlainObject(source)) {
        return utils_default.merge.call({ caseless }, target, source);
      } else if (utils_default.isPlainObject(source)) {
        return utils_default.merge({}, source);
      } else if (utils_default.isArray(source)) {
        return source.slice();
      }
      return source;
    }
    function mergeDeepProperties(a, b, prop, caseless) {
      if (!utils_default.isUndefined(b)) {
        return getMergedValue(a, b, prop, caseless);
      } else if (!utils_default.isUndefined(a)) {
        return getMergedValue(void 0, a, prop, caseless);
      }
    }
    function valueFromConfig2(a, b) {
      if (!utils_default.isUndefined(b)) {
        return getMergedValue(void 0, b);
      }
    }
    function defaultToConfig2(a, b) {
      if (!utils_default.isUndefined(b)) {
        return getMergedValue(void 0, b);
      } else if (!utils_default.isUndefined(a)) {
        return getMergedValue(void 0, a);
      }
    }
    function mergeDirectKeys(a, b, prop) {
      if (prop in config2) {
        return getMergedValue(a, b);
      } else if (prop in config1) {
        return getMergedValue(void 0, a);
      }
    }
    const mergeMap = {
      url: valueFromConfig2,
      method: valueFromConfig2,
      data: valueFromConfig2,
      baseURL: defaultToConfig2,
      transformRequest: defaultToConfig2,
      transformResponse: defaultToConfig2,
      paramsSerializer: defaultToConfig2,
      timeout: defaultToConfig2,
      timeoutMessage: defaultToConfig2,
      withCredentials: defaultToConfig2,
      withXSRFToken: defaultToConfig2,
      adapter: defaultToConfig2,
      responseType: defaultToConfig2,
      xsrfCookieName: defaultToConfig2,
      xsrfHeaderName: defaultToConfig2,
      onUploadProgress: defaultToConfig2,
      onDownloadProgress: defaultToConfig2,
      decompress: defaultToConfig2,
      maxContentLength: defaultToConfig2,
      maxBodyLength: defaultToConfig2,
      beforeRedirect: defaultToConfig2,
      transport: defaultToConfig2,
      httpAgent: defaultToConfig2,
      httpsAgent: defaultToConfig2,
      cancelToken: defaultToConfig2,
      socketPath: defaultToConfig2,
      responseEncoding: defaultToConfig2,
      validateStatus: mergeDirectKeys,
      headers: (a, b, prop) => mergeDeepProperties(headersToObject(a), headersToObject(b), prop, true)
    };
    utils_default.forEach(Object.keys(Object.assign({}, config1, config2)), function computeConfigValue(prop) {
      const merge2 = mergeMap[prop] || mergeDeepProperties;
      const configValue = merge2(config1[prop], config2[prop], prop);
      utils_default.isUndefined(configValue) && merge2 !== mergeDirectKeys || (config[prop] = configValue);
    });
    return config;
  }

  // node_modules/axios/lib/helpers/resolveConfig.js
  var resolveConfig_default = (config) => {
    const newConfig = mergeConfig({}, config);
    let { data, withXSRFToken, xsrfHeaderName, xsrfCookieName, headers, auth } = newConfig;
    newConfig.headers = headers = AxiosHeaders_default.from(headers);
    newConfig.url = buildURL(buildFullPath(newConfig.baseURL, newConfig.url, newConfig.allowAbsoluteUrls), config.params, config.paramsSerializer);
    if (auth) {
      headers.set(
        "Authorization",
        "Basic " + btoa((auth.username || "") + ":" + (auth.password ? unescape(encodeURIComponent(auth.password)) : ""))
      );
    }
    let contentType;
    if (utils_default.isFormData(data)) {
      if (platform_default.hasStandardBrowserEnv || platform_default.hasStandardBrowserWebWorkerEnv) {
        headers.setContentType(void 0);
      } else if ((contentType = headers.getContentType()) !== false) {
        const [type, ...tokens] = contentType ? contentType.split(";").map((token) => token.trim()).filter(Boolean) : [];
        headers.setContentType([type || "multipart/form-data", ...tokens].join("; "));
      }
    }
    if (platform_default.hasStandardBrowserEnv) {
      withXSRFToken && utils_default.isFunction(withXSRFToken) && (withXSRFToken = withXSRFToken(newConfig));
      if (withXSRFToken || withXSRFToken !== false && isURLSameOrigin_default(newConfig.url)) {
        const xsrfValue = xsrfHeaderName && xsrfCookieName && cookies_default.read(xsrfCookieName);
        if (xsrfValue) {
          headers.set(xsrfHeaderName, xsrfValue);
        }
      }
    }
    return newConfig;
  };

  // node_modules/axios/lib/adapters/xhr.js
  var isXHRAdapterSupported = typeof XMLHttpRequest !== "undefined";
  var xhr_default = isXHRAdapterSupported && function(config) {
    return new Promise(function dispatchXhrRequest(resolve, reject) {
      const _config = resolveConfig_default(config);
      let requestData = _config.data;
      const requestHeaders = AxiosHeaders_default.from(_config.headers).normalize();
      let { responseType, onUploadProgress, onDownloadProgress } = _config;
      let onCanceled;
      let uploadThrottled, downloadThrottled;
      let flushUpload, flushDownload;
      function done() {
        flushUpload && flushUpload();
        flushDownload && flushDownload();
        _config.cancelToken && _config.cancelToken.unsubscribe(onCanceled);
        _config.signal && _config.signal.removeEventListener("abort", onCanceled);
      }
      let request = new XMLHttpRequest();
      request.open(_config.method.toUpperCase(), _config.url, true);
      request.timeout = _config.timeout;
      function onloadend() {
        if (!request) {
          return;
        }
        const responseHeaders = AxiosHeaders_default.from(
          "getAllResponseHeaders" in request && request.getAllResponseHeaders()
        );
        const responseData = !responseType || responseType === "text" || responseType === "json" ? request.responseText : request.response;
        const response = {
          data: responseData,
          status: request.status,
          statusText: request.statusText,
          headers: responseHeaders,
          config,
          request
        };
        settle(function _resolve(value) {
          resolve(value);
          done();
        }, function _reject(err) {
          reject(err);
          done();
        }, response);
        request = null;
      }
      if ("onloadend" in request) {
        request.onloadend = onloadend;
      } else {
        request.onreadystatechange = function handleLoad() {
          if (!request || request.readyState !== 4) {
            return;
          }
          if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf("file:") === 0)) {
            return;
          }
          setTimeout(onloadend);
        };
      }
      request.onabort = function handleAbort() {
        if (!request) {
          return;
        }
        reject(new AxiosError_default("Request aborted", AxiosError_default.ECONNABORTED, config, request));
        request = null;
      };
      request.onerror = function handleError() {
        reject(new AxiosError_default("Network Error", AxiosError_default.ERR_NETWORK, config, request));
        request = null;
      };
      request.ontimeout = function handleTimeout() {
        let timeoutErrorMessage = _config.timeout ? "timeout of " + _config.timeout + "ms exceeded" : "timeout exceeded";
        const transitional2 = _config.transitional || transitional_default;
        if (_config.timeoutErrorMessage) {
          timeoutErrorMessage = _config.timeoutErrorMessage;
        }
        reject(new AxiosError_default(
          timeoutErrorMessage,
          transitional2.clarifyTimeoutError ? AxiosError_default.ETIMEDOUT : AxiosError_default.ECONNABORTED,
          config,
          request
        ));
        request = null;
      };
      requestData === void 0 && requestHeaders.setContentType(null);
      if ("setRequestHeader" in request) {
        utils_default.forEach(requestHeaders.toJSON(), function setRequestHeader(val, key) {
          request.setRequestHeader(key, val);
        });
      }
      if (!utils_default.isUndefined(_config.withCredentials)) {
        request.withCredentials = !!_config.withCredentials;
      }
      if (responseType && responseType !== "json") {
        request.responseType = _config.responseType;
      }
      if (onDownloadProgress) {
        [downloadThrottled, flushDownload] = progressEventReducer(onDownloadProgress, true);
        request.addEventListener("progress", downloadThrottled);
      }
      if (onUploadProgress && request.upload) {
        [uploadThrottled, flushUpload] = progressEventReducer(onUploadProgress);
        request.upload.addEventListener("progress", uploadThrottled);
        request.upload.addEventListener("loadend", flushUpload);
      }
      if (_config.cancelToken || _config.signal) {
        onCanceled = (cancel) => {
          if (!request) {
            return;
          }
          reject(!cancel || cancel.type ? new CanceledError_default(null, config, request) : cancel);
          request.abort();
          request = null;
        };
        _config.cancelToken && _config.cancelToken.subscribe(onCanceled);
        if (_config.signal) {
          _config.signal.aborted ? onCanceled() : _config.signal.addEventListener("abort", onCanceled);
        }
      }
      const protocol = parseProtocol(_config.url);
      if (protocol && platform_default.protocols.indexOf(protocol) === -1) {
        reject(new AxiosError_default("Unsupported protocol " + protocol + ":", AxiosError_default.ERR_BAD_REQUEST, config));
        return;
      }
      request.send(requestData || null);
    });
  };

  // node_modules/axios/lib/helpers/composeSignals.js
  var composeSignals = (signals, timeout) => {
    const { length } = signals = signals ? signals.filter(Boolean) : [];
    if (timeout || length) {
      let controller = new AbortController();
      let aborted;
      const onabort = function(reason) {
        if (!aborted) {
          aborted = true;
          unsubscribe();
          const err = reason instanceof Error ? reason : this.reason;
          controller.abort(err instanceof AxiosError_default ? err : new CanceledError_default(err instanceof Error ? err.message : err));
        }
      };
      let timer = timeout && setTimeout(() => {
        timer = null;
        onabort(new AxiosError_default(`timeout ${timeout} of ms exceeded`, AxiosError_default.ETIMEDOUT));
      }, timeout);
      const unsubscribe = () => {
        if (signals) {
          timer && clearTimeout(timer);
          timer = null;
          signals.forEach((signal2) => {
            signal2.unsubscribe ? signal2.unsubscribe(onabort) : signal2.removeEventListener("abort", onabort);
          });
          signals = null;
        }
      };
      signals.forEach((signal2) => signal2.addEventListener("abort", onabort));
      const { signal } = controller;
      signal.unsubscribe = () => utils_default.asap(unsubscribe);
      return signal;
    }
  };
  var composeSignals_default = composeSignals;

  // node_modules/axios/lib/helpers/trackStream.js
  var streamChunk = function* (chunk, chunkSize) {
    let len = chunk.byteLength;
    if (!chunkSize || len < chunkSize) {
      yield chunk;
      return;
    }
    let pos = 0;
    let end;
    while (pos < len) {
      end = pos + chunkSize;
      yield chunk.slice(pos, end);
      pos = end;
    }
  };
  var readBytes = async function* (iterable, chunkSize) {
    for await (const chunk of readStream(iterable)) {
      yield* streamChunk(chunk, chunkSize);
    }
  };
  var readStream = async function* (stream) {
    if (stream[Symbol.asyncIterator]) {
      yield* stream;
      return;
    }
    const reader = stream.getReader();
    try {
      for (; ; ) {
        const { done, value } = await reader.read();
        if (done) {
          break;
        }
        yield value;
      }
    } finally {
      await reader.cancel();
    }
  };
  var trackStream = (stream, chunkSize, onProgress, onFinish) => {
    const iterator = readBytes(stream, chunkSize);
    let bytes = 0;
    let done;
    let _onFinish = (e) => {
      if (!done) {
        done = true;
        onFinish && onFinish(e);
      }
    };
    return new ReadableStream({
      async pull(controller) {
        try {
          const { done: done2, value } = await iterator.next();
          if (done2) {
            _onFinish();
            controller.close();
            return;
          }
          let len = value.byteLength;
          if (onProgress) {
            let loadedBytes = bytes += len;
            onProgress(loadedBytes);
          }
          controller.enqueue(new Uint8Array(value));
        } catch (err) {
          _onFinish(err);
          throw err;
        }
      },
      cancel(reason) {
        _onFinish(reason);
        return iterator.return();
      }
    }, {
      highWaterMark: 2
    });
  };

  // node_modules/axios/lib/adapters/fetch.js
  var isFetchSupported = typeof fetch === "function" && typeof Request === "function" && typeof Response === "function";
  var isReadableStreamSupported = isFetchSupported && typeof ReadableStream === "function";
  var encodeText = isFetchSupported && (typeof TextEncoder === "function" ? /* @__PURE__ */ ((encoder) => (str) => encoder.encode(str))(new TextEncoder()) : async (str) => new Uint8Array(await new Response(str).arrayBuffer()));
  var test = (fn, ...args) => {
    try {
      return !!fn(...args);
    } catch (e) {
      return false;
    }
  };
  var supportsRequestStream = isReadableStreamSupported && test(() => {
    let duplexAccessed = false;
    const hasContentType = new Request(platform_default.origin, {
      body: new ReadableStream(),
      method: "POST",
      get duplex() {
        duplexAccessed = true;
        return "half";
      }
    }).headers.has("Content-Type");
    return duplexAccessed && !hasContentType;
  });
  var DEFAULT_CHUNK_SIZE = 64 * 1024;
  var supportsResponseStream = isReadableStreamSupported && test(() => utils_default.isReadableStream(new Response("").body));
  var resolvers = {
    stream: supportsResponseStream && ((res) => res.body)
  };
  isFetchSupported && ((res) => {
    ["text", "arrayBuffer", "blob", "formData", "stream"].forEach((type) => {
      !resolvers[type] && (resolvers[type] = utils_default.isFunction(res[type]) ? (res2) => res2[type]() : (_, config) => {
        throw new AxiosError_default(`Response type '${type}' is not supported`, AxiosError_default.ERR_NOT_SUPPORT, config);
      });
    });
  })(new Response());
  var getBodyLength = async (body) => {
    if (body == null) {
      return 0;
    }
    if (utils_default.isBlob(body)) {
      return body.size;
    }
    if (utils_default.isSpecCompliantForm(body)) {
      const _request = new Request(platform_default.origin, {
        method: "POST",
        body
      });
      return (await _request.arrayBuffer()).byteLength;
    }
    if (utils_default.isArrayBufferView(body) || utils_default.isArrayBuffer(body)) {
      return body.byteLength;
    }
    if (utils_default.isURLSearchParams(body)) {
      body = body + "";
    }
    if (utils_default.isString(body)) {
      return (await encodeText(body)).byteLength;
    }
  };
  var resolveBodyLength = async (headers, body) => {
    const length = utils_default.toFiniteNumber(headers.getContentLength());
    return length == null ? getBodyLength(body) : length;
  };
  var fetch_default = isFetchSupported && (async (config) => {
    let {
      url,
      method,
      data,
      signal,
      cancelToken,
      timeout,
      onDownloadProgress,
      onUploadProgress,
      responseType,
      headers,
      withCredentials = "same-origin",
      fetchOptions
    } = resolveConfig_default(config);
    responseType = responseType ? (responseType + "").toLowerCase() : "text";
    let composedSignal = composeSignals_default([signal, cancelToken && cancelToken.toAbortSignal()], timeout);
    let request;
    const unsubscribe = composedSignal && composedSignal.unsubscribe && (() => {
      composedSignal.unsubscribe();
    });
    let requestContentLength;
    try {
      if (onUploadProgress && supportsRequestStream && method !== "get" && method !== "head" && (requestContentLength = await resolveBodyLength(headers, data)) !== 0) {
        let _request = new Request(url, {
          method: "POST",
          body: data,
          duplex: "half"
        });
        let contentTypeHeader;
        if (utils_default.isFormData(data) && (contentTypeHeader = _request.headers.get("content-type"))) {
          headers.setContentType(contentTypeHeader);
        }
        if (_request.body) {
          const [onProgress, flush] = progressEventDecorator(
            requestContentLength,
            progressEventReducer(asyncDecorator(onUploadProgress))
          );
          data = trackStream(_request.body, DEFAULT_CHUNK_SIZE, onProgress, flush);
        }
      }
      if (!utils_default.isString(withCredentials)) {
        withCredentials = withCredentials ? "include" : "omit";
      }
      const isCredentialsSupported = "credentials" in Request.prototype;
      request = new Request(url, {
        ...fetchOptions,
        signal: composedSignal,
        method: method.toUpperCase(),
        headers: headers.normalize().toJSON(),
        body: data,
        duplex: "half",
        credentials: isCredentialsSupported ? withCredentials : void 0
      });
      let response = await fetch(request);
      const isStreamResponse = supportsResponseStream && (responseType === "stream" || responseType === "response");
      if (supportsResponseStream && (onDownloadProgress || isStreamResponse && unsubscribe)) {
        const options = {};
        ["status", "statusText", "headers"].forEach((prop) => {
          options[prop] = response[prop];
        });
        const responseContentLength = utils_default.toFiniteNumber(response.headers.get("content-length"));
        const [onProgress, flush] = onDownloadProgress && progressEventDecorator(
          responseContentLength,
          progressEventReducer(asyncDecorator(onDownloadProgress), true)
        ) || [];
        response = new Response(
          trackStream(response.body, DEFAULT_CHUNK_SIZE, onProgress, () => {
            flush && flush();
            unsubscribe && unsubscribe();
          }),
          options
        );
      }
      responseType = responseType || "text";
      let responseData = await resolvers[utils_default.findKey(resolvers, responseType) || "text"](response, config);
      !isStreamResponse && unsubscribe && unsubscribe();
      return await new Promise((resolve, reject) => {
        settle(resolve, reject, {
          data: responseData,
          headers: AxiosHeaders_default.from(response.headers),
          status: response.status,
          statusText: response.statusText,
          config,
          request
        });
      });
    } catch (err) {
      unsubscribe && unsubscribe();
      if (err && err.name === "TypeError" && /fetch/i.test(err.message)) {
        throw Object.assign(
          new AxiosError_default("Network Error", AxiosError_default.ERR_NETWORK, config, request),
          {
            cause: err.cause || err
          }
        );
      }
      throw AxiosError_default.from(err, err && err.code, config, request);
    }
  });

  // node_modules/axios/lib/adapters/adapters.js
  var knownAdapters = {
    http: null_default,
    xhr: xhr_default,
    fetch: fetch_default
  };
  utils_default.forEach(knownAdapters, (fn, value) => {
    if (fn) {
      try {
        Object.defineProperty(fn, "name", { value });
      } catch (e) {
      }
      Object.defineProperty(fn, "adapterName", { value });
    }
  });
  var renderReason = (reason) => `- ${reason}`;
  var isResolvedHandle = (adapter) => utils_default.isFunction(adapter) || adapter === null || adapter === false;
  var adapters_default = {
    getAdapter: (adapters) => {
      adapters = utils_default.isArray(adapters) ? adapters : [adapters];
      const { length } = adapters;
      let nameOrAdapter;
      let adapter;
      const rejectedReasons = {};
      for (let i = 0; i < length; i++) {
        nameOrAdapter = adapters[i];
        let id;
        adapter = nameOrAdapter;
        if (!isResolvedHandle(nameOrAdapter)) {
          adapter = knownAdapters[(id = String(nameOrAdapter)).toLowerCase()];
          if (adapter === void 0) {
            throw new AxiosError_default(`Unknown adapter '${id}'`);
          }
        }
        if (adapter) {
          break;
        }
        rejectedReasons[id || "#" + i] = adapter;
      }
      if (!adapter) {
        const reasons = Object.entries(rejectedReasons).map(
          ([id, state]) => `adapter ${id} ` + (state === false ? "is not supported by the environment" : "is not available in the build")
        );
        let s = length ? reasons.length > 1 ? "since :\n" + reasons.map(renderReason).join("\n") : " " + renderReason(reasons[0]) : "as no adapter specified";
        throw new AxiosError_default(
          `There is no suitable adapter to dispatch the request ` + s,
          "ERR_NOT_SUPPORT"
        );
      }
      return adapter;
    },
    adapters: knownAdapters
  };

  // node_modules/axios/lib/core/dispatchRequest.js
  function throwIfCancellationRequested(config) {
    if (config.cancelToken) {
      config.cancelToken.throwIfRequested();
    }
    if (config.signal && config.signal.aborted) {
      throw new CanceledError_default(null, config);
    }
  }
  function dispatchRequest(config) {
    throwIfCancellationRequested(config);
    config.headers = AxiosHeaders_default.from(config.headers);
    config.data = transformData.call(
      config,
      config.transformRequest
    );
    if (["post", "put", "patch"].indexOf(config.method) !== -1) {
      config.headers.setContentType("application/x-www-form-urlencoded", false);
    }
    const adapter = adapters_default.getAdapter(config.adapter || defaults_default.adapter);
    return adapter(config).then(function onAdapterResolution(response) {
      throwIfCancellationRequested(config);
      response.data = transformData.call(
        config,
        config.transformResponse,
        response
      );
      response.headers = AxiosHeaders_default.from(response.headers);
      return response;
    }, function onAdapterRejection(reason) {
      if (!isCancel(reason)) {
        throwIfCancellationRequested(config);
        if (reason && reason.response) {
          reason.response.data = transformData.call(
            config,
            config.transformResponse,
            reason.response
          );
          reason.response.headers = AxiosHeaders_default.from(reason.response.headers);
        }
      }
      return Promise.reject(reason);
    });
  }

  // node_modules/axios/lib/env/data.js
  var VERSION = "1.8.4";

  // node_modules/axios/lib/helpers/validator.js
  var validators = {};
  ["object", "boolean", "number", "function", "string", "symbol"].forEach((type, i) => {
    validators[type] = function validator(thing) {
      return typeof thing === type || "a" + (i < 1 ? "n " : " ") + type;
    };
  });
  var deprecatedWarnings = {};
  validators.transitional = function transitional(validator, version, message) {
    function formatMessage(opt, desc) {
      return "[Axios v" + VERSION + "] Transitional option '" + opt + "'" + desc + (message ? ". " + message : "");
    }
    return (value, opt, opts) => {
      if (validator === false) {
        throw new AxiosError_default(
          formatMessage(opt, " has been removed" + (version ? " in " + version : "")),
          AxiosError_default.ERR_DEPRECATED
        );
      }
      if (version && !deprecatedWarnings[opt]) {
        deprecatedWarnings[opt] = true;
        console.warn(
          formatMessage(
            opt,
            " has been deprecated since v" + version + " and will be removed in the near future"
          )
        );
      }
      return validator ? validator(value, opt, opts) : true;
    };
  };
  validators.spelling = function spelling(correctSpelling) {
    return (value, opt) => {
      console.warn(`${opt} is likely a misspelling of ${correctSpelling}`);
      return true;
    };
  };
  function assertOptions(options, schema, allowUnknown) {
    if (typeof options !== "object") {
      throw new AxiosError_default("options must be an object", AxiosError_default.ERR_BAD_OPTION_VALUE);
    }
    const keys = Object.keys(options);
    let i = keys.length;
    while (i-- > 0) {
      const opt = keys[i];
      const validator = schema[opt];
      if (validator) {
        const value = options[opt];
        const result = value === void 0 || validator(value, opt, options);
        if (result !== true) {
          throw new AxiosError_default("option " + opt + " must be " + result, AxiosError_default.ERR_BAD_OPTION_VALUE);
        }
        continue;
      }
      if (allowUnknown !== true) {
        throw new AxiosError_default("Unknown option " + opt, AxiosError_default.ERR_BAD_OPTION);
      }
    }
  }
  var validator_default = {
    assertOptions,
    validators
  };

  // node_modules/axios/lib/core/Axios.js
  var validators2 = validator_default.validators;
  var Axios = class {
    constructor(instanceConfig) {
      this.defaults = instanceConfig;
      this.interceptors = {
        request: new InterceptorManager_default(),
        response: new InterceptorManager_default()
      };
    }
    /**
     * Dispatch a request
     *
     * @param {String|Object} configOrUrl The config specific for this request (merged with this.defaults)
     * @param {?Object} config
     *
     * @returns {Promise} The Promise to be fulfilled
     */
    async request(configOrUrl, config) {
      try {
        return await this._request(configOrUrl, config);
      } catch (err) {
        if (err instanceof Error) {
          let dummy = {};
          Error.captureStackTrace ? Error.captureStackTrace(dummy) : dummy = new Error();
          const stack = dummy.stack ? dummy.stack.replace(/^.+\n/, "") : "";
          try {
            if (!err.stack) {
              err.stack = stack;
            } else if (stack && !String(err.stack).endsWith(stack.replace(/^.+\n.+\n/, ""))) {
              err.stack += "\n" + stack;
            }
          } catch (e) {
          }
        }
        throw err;
      }
    }
    _request(configOrUrl, config) {
      if (typeof configOrUrl === "string") {
        config = config || {};
        config.url = configOrUrl;
      } else {
        config = configOrUrl || {};
      }
      config = mergeConfig(this.defaults, config);
      const { transitional: transitional2, paramsSerializer, headers } = config;
      if (transitional2 !== void 0) {
        validator_default.assertOptions(transitional2, {
          silentJSONParsing: validators2.transitional(validators2.boolean),
          forcedJSONParsing: validators2.transitional(validators2.boolean),
          clarifyTimeoutError: validators2.transitional(validators2.boolean)
        }, false);
      }
      if (paramsSerializer != null) {
        if (utils_default.isFunction(paramsSerializer)) {
          config.paramsSerializer = {
            serialize: paramsSerializer
          };
        } else {
          validator_default.assertOptions(paramsSerializer, {
            encode: validators2.function,
            serialize: validators2.function
          }, true);
        }
      }
      if (config.allowAbsoluteUrls !== void 0) {
      } else if (this.defaults.allowAbsoluteUrls !== void 0) {
        config.allowAbsoluteUrls = this.defaults.allowAbsoluteUrls;
      } else {
        config.allowAbsoluteUrls = true;
      }
      validator_default.assertOptions(config, {
        baseUrl: validators2.spelling("baseURL"),
        withXsrfToken: validators2.spelling("withXSRFToken")
      }, true);
      config.method = (config.method || this.defaults.method || "get").toLowerCase();
      let contextHeaders = headers && utils_default.merge(
        headers.common,
        headers[config.method]
      );
      headers && utils_default.forEach(
        ["delete", "get", "head", "post", "put", "patch", "common"],
        (method) => {
          delete headers[method];
        }
      );
      config.headers = AxiosHeaders_default.concat(contextHeaders, headers);
      const requestInterceptorChain = [];
      let synchronousRequestInterceptors = true;
      this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
        if (typeof interceptor.runWhen === "function" && interceptor.runWhen(config) === false) {
          return;
        }
        synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;
        requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
      });
      const responseInterceptorChain = [];
      this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
        responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
      });
      let promise;
      let i = 0;
      let len;
      if (!synchronousRequestInterceptors) {
        const chain = [dispatchRequest.bind(this), void 0];
        chain.unshift.apply(chain, requestInterceptorChain);
        chain.push.apply(chain, responseInterceptorChain);
        len = chain.length;
        promise = Promise.resolve(config);
        while (i < len) {
          promise = promise.then(chain[i++], chain[i++]);
        }
        return promise;
      }
      len = requestInterceptorChain.length;
      let newConfig = config;
      i = 0;
      while (i < len) {
        const onFulfilled = requestInterceptorChain[i++];
        const onRejected = requestInterceptorChain[i++];
        try {
          newConfig = onFulfilled(newConfig);
        } catch (error) {
          onRejected.call(this, error);
          break;
        }
      }
      try {
        promise = dispatchRequest.call(this, newConfig);
      } catch (error) {
        return Promise.reject(error);
      }
      i = 0;
      len = responseInterceptorChain.length;
      while (i < len) {
        promise = promise.then(responseInterceptorChain[i++], responseInterceptorChain[i++]);
      }
      return promise;
    }
    getUri(config) {
      config = mergeConfig(this.defaults, config);
      const fullPath = buildFullPath(config.baseURL, config.url, config.allowAbsoluteUrls);
      return buildURL(fullPath, config.params, config.paramsSerializer);
    }
  };
  utils_default.forEach(["delete", "get", "head", "options"], function forEachMethodNoData(method) {
    Axios.prototype[method] = function(url, config) {
      return this.request(mergeConfig(config || {}, {
        method,
        url,
        data: (config || {}).data
      }));
    };
  });
  utils_default.forEach(["post", "put", "patch"], function forEachMethodWithData(method) {
    function generateHTTPMethod(isForm) {
      return function httpMethod(url, data, config) {
        return this.request(mergeConfig(config || {}, {
          method,
          headers: isForm ? {
            "Content-Type": "multipart/form-data"
          } : {},
          url,
          data
        }));
      };
    }
    Axios.prototype[method] = generateHTTPMethod();
    Axios.prototype[method + "Form"] = generateHTTPMethod(true);
  });
  var Axios_default = Axios;

  // node_modules/axios/lib/cancel/CancelToken.js
  var CancelToken = class _CancelToken {
    constructor(executor) {
      if (typeof executor !== "function") {
        throw new TypeError("executor must be a function.");
      }
      let resolvePromise;
      this.promise = new Promise(function promiseExecutor(resolve) {
        resolvePromise = resolve;
      });
      const token = this;
      this.promise.then((cancel) => {
        if (!token._listeners) return;
        let i = token._listeners.length;
        while (i-- > 0) {
          token._listeners[i](cancel);
        }
        token._listeners = null;
      });
      this.promise.then = (onfulfilled) => {
        let _resolve;
        const promise = new Promise((resolve) => {
          token.subscribe(resolve);
          _resolve = resolve;
        }).then(onfulfilled);
        promise.cancel = function reject() {
          token.unsubscribe(_resolve);
        };
        return promise;
      };
      executor(function cancel(message, config, request) {
        if (token.reason) {
          return;
        }
        token.reason = new CanceledError_default(message, config, request);
        resolvePromise(token.reason);
      });
    }
    /**
     * Throws a `CanceledError` if cancellation has been requested.
     */
    throwIfRequested() {
      if (this.reason) {
        throw this.reason;
      }
    }
    /**
     * Subscribe to the cancel signal
     */
    subscribe(listener) {
      if (this.reason) {
        listener(this.reason);
        return;
      }
      if (this._listeners) {
        this._listeners.push(listener);
      } else {
        this._listeners = [listener];
      }
    }
    /**
     * Unsubscribe from the cancel signal
     */
    unsubscribe(listener) {
      if (!this._listeners) {
        return;
      }
      const index = this._listeners.indexOf(listener);
      if (index !== -1) {
        this._listeners.splice(index, 1);
      }
    }
    toAbortSignal() {
      const controller = new AbortController();
      const abort = (err) => {
        controller.abort(err);
      };
      this.subscribe(abort);
      controller.signal.unsubscribe = () => this.unsubscribe(abort);
      return controller.signal;
    }
    /**
     * Returns an object that contains a new `CancelToken` and a function that, when called,
     * cancels the `CancelToken`.
     */
    static source() {
      let cancel;
      const token = new _CancelToken(function executor(c) {
        cancel = c;
      });
      return {
        token,
        cancel
      };
    }
  };
  var CancelToken_default = CancelToken;

  // node_modules/axios/lib/helpers/spread.js
  function spread(callback) {
    return function wrap(arr) {
      return callback.apply(null, arr);
    };
  }

  // node_modules/axios/lib/helpers/isAxiosError.js
  function isAxiosError(payload) {
    return utils_default.isObject(payload) && payload.isAxiosError === true;
  }

  // node_modules/axios/lib/helpers/HttpStatusCode.js
  var HttpStatusCode = {
    Continue: 100,
    SwitchingProtocols: 101,
    Processing: 102,
    EarlyHints: 103,
    Ok: 200,
    Created: 201,
    Accepted: 202,
    NonAuthoritativeInformation: 203,
    NoContent: 204,
    ResetContent: 205,
    PartialContent: 206,
    MultiStatus: 207,
    AlreadyReported: 208,
    ImUsed: 226,
    MultipleChoices: 300,
    MovedPermanently: 301,
    Found: 302,
    SeeOther: 303,
    NotModified: 304,
    UseProxy: 305,
    Unused: 306,
    TemporaryRedirect: 307,
    PermanentRedirect: 308,
    BadRequest: 400,
    Unauthorized: 401,
    PaymentRequired: 402,
    Forbidden: 403,
    NotFound: 404,
    MethodNotAllowed: 405,
    NotAcceptable: 406,
    ProxyAuthenticationRequired: 407,
    RequestTimeout: 408,
    Conflict: 409,
    Gone: 410,
    LengthRequired: 411,
    PreconditionFailed: 412,
    PayloadTooLarge: 413,
    UriTooLong: 414,
    UnsupportedMediaType: 415,
    RangeNotSatisfiable: 416,
    ExpectationFailed: 417,
    ImATeapot: 418,
    MisdirectedRequest: 421,
    UnprocessableEntity: 422,
    Locked: 423,
    FailedDependency: 424,
    TooEarly: 425,
    UpgradeRequired: 426,
    PreconditionRequired: 428,
    TooManyRequests: 429,
    RequestHeaderFieldsTooLarge: 431,
    UnavailableForLegalReasons: 451,
    InternalServerError: 500,
    NotImplemented: 501,
    BadGateway: 502,
    ServiceUnavailable: 503,
    GatewayTimeout: 504,
    HttpVersionNotSupported: 505,
    VariantAlsoNegotiates: 506,
    InsufficientStorage: 507,
    LoopDetected: 508,
    NotExtended: 510,
    NetworkAuthenticationRequired: 511
  };
  Object.entries(HttpStatusCode).forEach(([key, value]) => {
    HttpStatusCode[value] = key;
  });
  var HttpStatusCode_default = HttpStatusCode;

  // node_modules/axios/lib/axios.js
  function createInstance(defaultConfig) {
    const context = new Axios_default(defaultConfig);
    const instance = bind(Axios_default.prototype.request, context);
    utils_default.extend(instance, Axios_default.prototype, context, { allOwnKeys: true });
    utils_default.extend(instance, context, null, { allOwnKeys: true });
    instance.create = function create(instanceConfig) {
      return createInstance(mergeConfig(defaultConfig, instanceConfig));
    };
    return instance;
  }
  var axios = createInstance(defaults_default);
  axios.Axios = Axios_default;
  axios.CanceledError = CanceledError_default;
  axios.CancelToken = CancelToken_default;
  axios.isCancel = isCancel;
  axios.VERSION = VERSION;
  axios.toFormData = toFormData_default;
  axios.AxiosError = AxiosError_default;
  axios.Cancel = axios.CanceledError;
  axios.all = function all(promises) {
    return Promise.all(promises);
  };
  axios.spread = spread;
  axios.isAxiosError = isAxiosError;
  axios.mergeConfig = mergeConfig;
  axios.AxiosHeaders = AxiosHeaders_default;
  axios.formToJSON = (thing) => formDataToJSON_default(utils_default.isHTMLForm(thing) ? new FormData(thing) : thing);
  axios.getAdapter = adapters_default.getAdapter;
  axios.HttpStatusCode = HttpStatusCode_default;
  axios.default = axios;
  var axios_default = axios;

  // node_modules/axios/index.js
  var {
    Axios: Axios2,
    AxiosError: AxiosError2,
    CanceledError: CanceledError2,
    isCancel: isCancel2,
    CancelToken: CancelToken2,
    VERSION: VERSION2,
    all: all2,
    Cancel,
    isAxiosError: isAxiosError2,
    spread: spread2,
    toFormData: toFormData2,
    AxiosHeaders: AxiosHeaders2,
    HttpStatusCode: HttpStatusCode2,
    formToJSON,
    getAdapter,
    mergeConfig: mergeConfig2
  } = axios_default;

  // ns-hugo-imp:/Users/ralvares/VulneraWise/assets/js/search.js
  var VulnerawiseSearch = class {
    constructor({ inputId, resultId, isModal = false, limit = 5 }) {
      this.input = document.getElementById(inputId);
      if (!this.input) return;
      this.resultId = resultId;
      this.isModal = isModal;
      this.limit = limit;
      this.resultContainer = document.getElementById(resultId);
      if (!this.resultContainer) {
        this.resultContainer = document.createElement("div");
        this.resultContainer.id = resultId;
        this.resultContainer.className = isModal ? "result-container px-3 space-y-2 absolute rounded-3xl top-12 -translate-x-1/2 left-1/2 min-w-[100%] bg-blue z-50" : "result-container p-3 space-y-2 absolute rounded-lg top-10 left-0 min-w-full bg-blue border-slate-700 border z-50";
        this.input.parentNode.appendChild(this.resultContainer);
      }
      this.debounceTimeout = null;
      this.lastResultsHtml = "";
      this.setupEvents();
    }
    getApiBaseUrl() {
      return document.querySelector('meta[name="api-base-url"]')?.content || "https://api.vulnerawise.ai";
    }
    buildQuery(input) {
      input = input.trim();
      const params = new URLSearchParams();
      if (/^CVE-\d{4}-\d+(,\s*CVE-\d{4}-\d+)*$/i.test(input)) {
        params.set("cve", input.toUpperCase().replace(/\s+/g, ""));
        return params.toString();
      }
      if (/(AND|OR|\(|\))/i.test(input)) {
        params.set("description", input);
        return params.toString();
      }
      const multiPattern = /(\w+)\s*=\s*([\w,-]+)/gi;
      let match;
      let desc = input;
      while ((match = multiPattern.exec(input)) !== null) {
        params.set(match[1].toLowerCase(), match[2]);
        desc = desc.replace(match[0], "").trim();
      }
      if (desc) params.set("description", desc);
      return params.toString();
    }
    async search(isAuto = false) {
      const query = this.input.value.trim();
      if (!query) {
        this.resultContainer.innerHTML = `<p class='px-5 rounded-lg text-black bg-red-200 border border-red-300 text-red-500'>Please enter a search query.</p>`;
        this.resultContainer.style.display = "block";
        return;
      }
      this.resultContainer.innerHTML = `<p>Searching...</p>`;
      this.resultContainer.style.display = "block";
      const apiQuery = this.buildQuery(query);
      const apiBase = this.getApiBaseUrl();
      let apiUrl = null;
      if (apiQuery) {
        apiUrl = `${apiBase}/v1/vuln?${apiQuery}&limit=${this.limit}`;
      } else {
        this.resultContainer.innerHTML = "";
        this.resultContainer.style.display = "none";
        return;
      }
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          if (response.status === 400) {
            if (this.lastResultsHtml) {
              this.resultContainer.innerHTML = this.lastResultsHtml;
            } else {
              this.resultContainer.innerHTML = `<p>No vulnerabilities found.</p>`;
            }
            return;
          }
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (!data.data || data.data.length === 0) {
          this.resultContainer.innerHTML = `<p>No vulnerabilities found.</p>`;
          this.lastResultsHtml = "";
          return;
        }
        const html = data.data.map((vul) => {
          const cve = vul.cve;
          const maturity = cve.impact?.exploit_maturity || "";
          let desc = cve.description || "";
          if (desc.length > 120) desc = desc.slice(0, 120) + "...";
          return `
          <div class="vulnerability cursor-pointer flex flex-col gap-1 p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors" onclick="window.location='/cves/${cve.id.toLowerCase()}/'">
            <div class="flex items-center gap-2">
              <span class="cve-id text-black dark:text-white font-poppins font-semibold text-[18px]">${cve.id}</span>
              <span class="font-poppins text-xs px-2 py-0.5 rounded-full bg-blue-200 dark:bg-blue-900 text-blue-900 dark:text-blue-200">Exploit Maturity: <span class="font-semibold">${maturity}</span></span>
            </div>
            <span class="font-poppins text-slate-700 dark:text-slate-300 text-sm mt-1 text-left block">${desc}</span>
          </div>
        `;
        }).join("");
        this.resultContainer.innerHTML = html;
        this.lastResultsHtml = html;
      } catch (error) {
        if (this.lastResultsHtml) {
          this.resultContainer.innerHTML = this.lastResultsHtml + `<p class='mt-2 text-red-500'>Error loading vulnerabilities: ${error.message}</p>`;
        } else {
          this.resultContainer.innerHTML = `<p>Error loading vulnerabilities: ${error.message}</p>`;
        }
      }
    }
    setupEvents() {
      this.input.addEventListener("keydown", (event2) => {
        if (event2.key === "Enter") {
          this.search(false);
        }
      });
      this.input.addEventListener("input", (event2) => {
        const value = this.input.value.trim();
        if (value.length >= 5) {
          clearTimeout(this.debounceTimeout);
          this.debounceTimeout = setTimeout(() => {
            this.search(true);
          }, 2e3);
        } else if (value.includes(" ")) {
          const afterSpace = value.split(/\s+/).slice(1).join(" ");
          if (afterSpace.length >= 3) {
            clearTimeout(this.debounceTimeout);
            this.debounceTimeout = setTimeout(() => {
              this.search(true);
            }, 2e3);
          } else {
            this.resultContainer.style.display = "none";
          }
        } else {
          this.resultContainer.style.display = "none";
        }
      });
      this.input.addEventListener("blur", () => {
        this.resultContainer.style.display = "none";
      });
      this.input.addEventListener("focus", () => {
        if (this.resultContainer.innerHTML.trim()) this.resultContainer.style.display = "block";
      });
    }
  };

  // <stdin>
  var Swiper = function() {
    "use strict";
    function e(e2) {
      return null !== e2 && "object" == typeof e2 && "constructor" in e2 && e2.constructor === Object;
    }
    function t(s2, a2) {
      void 0 === s2 && (s2 = {}), void 0 === a2 && (a2 = {}), Object.keys(a2).forEach((i2) => {
        void 0 === s2[i2] ? s2[i2] = a2[i2] : e(a2[i2]) && e(s2[i2]) && Object.keys(a2[i2]).length > 0 && t(s2[i2], a2[i2]);
      });
    }
    const s = {
      body: {},
      addEventListener() {
      },
      removeEventListener() {
      },
      activeElement: { blur() {
      }, nodeName: "" },
      querySelector: () => null,
      querySelectorAll: () => [],
      getElementById: () => null,
      createEvent: () => ({ initEvent() {
      } }),
      createElement: () => ({
        children: [],
        childNodes: [],
        style: {},
        setAttribute() {
        },
        getElementsByTagName: () => []
      }),
      createElementNS: () => ({}),
      importNode: () => null,
      location: {
        hash: "",
        host: "",
        hostname: "",
        href: "",
        origin: "",
        pathname: "",
        protocol: "",
        search: ""
      }
    };
    function a() {
      const e2 = "undefined" != typeof document ? document : {};
      return t(e2, s), e2;
    }
    const i = {
      document: s,
      navigator: { userAgent: "" },
      location: {
        hash: "",
        host: "",
        hostname: "",
        href: "",
        origin: "",
        pathname: "",
        protocol: "",
        search: ""
      },
      history: { replaceState() {
      }, pushState() {
      }, go() {
      }, back() {
      } },
      CustomEvent: function() {
        return this;
      },
      addEventListener() {
      },
      removeEventListener() {
      },
      getComputedStyle: () => ({ getPropertyValue: () => "" }),
      Image() {
      },
      Date() {
      },
      screen: {},
      setTimeout() {
      },
      clearTimeout() {
      },
      matchMedia: () => ({}),
      requestAnimationFrame: (e2) => "undefined" == typeof setTimeout ? (e2(), null) : setTimeout(e2, 0),
      cancelAnimationFrame(e2) {
        "undefined" != typeof setTimeout && clearTimeout(e2);
      }
    };
    function r() {
      const e2 = "undefined" != typeof window ? window : {};
      return t(e2, i), e2;
    }
    function n(e2) {
      return void 0 === e2 && (e2 = ""), e2.trim().split(" ").filter((e3) => !!e3.trim());
    }
    function l(e2, t2) {
      return void 0 === t2 && (t2 = 0), setTimeout(e2, t2);
    }
    function o() {
      return Date.now();
    }
    function d(e2, t2) {
      void 0 === t2 && (t2 = "x");
      const s2 = r();
      let a2, i2, n2;
      const l2 = function(e3) {
        const t3 = r();
        let s3;
        return t3.getComputedStyle && (s3 = t3.getComputedStyle(e3, null)), !s3 && e3.currentStyle && (s3 = e3.currentStyle), s3 || (s3 = e3.style), s3;
      }(e2);
      return s2.WebKitCSSMatrix ? (i2 = l2.transform || l2.webkitTransform, i2.split(",").length > 6 && (i2 = i2.split(", ").map((e3) => e3.replace(",", ".")).join(", ")), n2 = new s2.WebKitCSSMatrix("none" === i2 ? "" : i2)) : (n2 = l2.MozTransform || l2.OTransform || l2.MsTransform || l2.msTransform || l2.transform || l2.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,"), a2 = n2.toString().split(",")), "x" === t2 && (i2 = s2.WebKitCSSMatrix ? n2.m41 : 16 === a2.length ? parseFloat(a2[12]) : parseFloat(a2[4])), "y" === t2 && (i2 = s2.WebKitCSSMatrix ? n2.m42 : 16 === a2.length ? parseFloat(a2[13]) : parseFloat(a2[5])), i2 || 0;
    }
    function c(e2) {
      return "object" == typeof e2 && null !== e2 && e2.constructor && "Object" === Object.prototype.toString.call(e2).slice(8, -1);
    }
    function p() {
      const e2 = Object(arguments.length <= 0 ? void 0 : arguments[0]), t2 = ["__proto__", "constructor", "prototype"];
      for (let a2 = 1; a2 < arguments.length; a2 += 1) {
        const i2 = a2 < 0 || arguments.length <= a2 ? void 0 : arguments[a2];
        if (null != i2 && (s2 = i2, !("undefined" != typeof window && void 0 !== window.HTMLElement ? s2 instanceof HTMLElement : s2 && (1 === s2.nodeType || 11 === s2.nodeType)))) {
          const s3 = Object.keys(Object(i2)).filter((e3) => t2.indexOf(e3) < 0);
          for (let t3 = 0, a3 = s3.length; t3 < a3; t3 += 1) {
            const a4 = s3[t3], r2 = Object.getOwnPropertyDescriptor(i2, a4);
            void 0 !== r2 && r2.enumerable && (c(e2[a4]) && c(i2[a4]) ? i2[a4].__swiper__ ? e2[a4] = i2[a4] : p(e2[a4], i2[a4]) : !c(e2[a4]) && c(i2[a4]) ? (e2[a4] = {}, i2[a4].__swiper__ ? e2[a4] = i2[a4] : p(e2[a4], i2[a4])) : e2[a4] = i2[a4]);
          }
        }
      }
      var s2;
      return e2;
    }
    function u(e2, t2, s2) {
      e2.style.setProperty(t2, s2);
    }
    function m(e2) {
      let { swiper: t2, targetPosition: s2, side: a2 } = e2;
      const i2 = r(), n2 = -t2.translate;
      let l2, o2 = null;
      const d2 = t2.params.speed;
      t2.wrapperEl.style.scrollSnapType = "none", i2.cancelAnimationFrame(t2.cssModeFrameID);
      const c2 = s2 > n2 ? "next" : "prev", p2 = (e3, t3) => "next" === c2 && e3 >= t3 || "prev" === c2 && e3 <= t3, u2 = () => {
        l2 = (/* @__PURE__ */ new Date()).getTime(), null === o2 && (o2 = l2);
        const e3 = Math.max(Math.min((l2 - o2) / d2, 1), 0), r2 = 0.5 - Math.cos(e3 * Math.PI) / 2;
        let c3 = n2 + r2 * (s2 - n2);
        if (p2(c3, s2) && (c3 = s2), t2.wrapperEl.scrollTo({ [a2]: c3 }), p2(c3, s2))
          return t2.wrapperEl.style.overflow = "hidden", t2.wrapperEl.style.scrollSnapType = "", setTimeout(() => {
            t2.wrapperEl.style.overflow = "", t2.wrapperEl.scrollTo({ [a2]: c3 });
          }), void i2.cancelAnimationFrame(t2.cssModeFrameID);
        t2.cssModeFrameID = i2.requestAnimationFrame(u2);
      };
      u2();
    }
    function h(e2) {
      return e2.querySelector(".swiper-slide-transform") || e2.shadowRoot && e2.shadowRoot.querySelector(".swiper-slide-transform") || e2;
    }
    function f(e2, t2) {
      void 0 === t2 && (t2 = "");
      const s2 = [...e2.children];
      return e2 instanceof HTMLSlotElement && s2.push(...e2.assignedElements()), t2 ? s2.filter((e3) => e3.matches(t2)) : s2;
    }
    function g(e2) {
      try {
        return void console.warn(e2);
      } catch (e3) {
      }
    }
    function v(e2, t2) {
      void 0 === t2 && (t2 = []);
      const s2 = document.createElement(e2);
      return s2.classList.add(...Array.isArray(t2) ? t2 : n(t2)), s2;
    }
    function w(e2) {
      const t2 = r(), s2 = a(), i2 = e2.getBoundingClientRect(), n2 = s2.body, l2 = e2.clientTop || n2.clientTop || 0, o2 = e2.clientLeft || n2.clientLeft || 0, d2 = e2 === t2 ? t2.scrollY : e2.scrollTop, c2 = e2 === t2 ? t2.scrollX : e2.scrollLeft;
      return { top: i2.top + d2 - l2, left: i2.left + c2 - o2 };
    }
    function b(e2, t2) {
      return r().getComputedStyle(e2, null).getPropertyValue(t2);
    }
    function y(e2) {
      let t2, s2 = e2;
      if (s2) {
        for (t2 = 0; null !== (s2 = s2.previousSibling); )
          1 === s2.nodeType && (t2 += 1);
        return t2;
      }
    }
    function E(e2, t2) {
      const s2 = [];
      let a2 = e2.parentElement;
      for (; a2; )
        t2 ? a2.matches(t2) && s2.push(a2) : s2.push(a2), a2 = a2.parentElement;
      return s2;
    }
    function x(e2, t2) {
      t2 && e2.addEventListener("transitionend", function s2(a2) {
        a2.target === e2 && (t2.call(e2, a2), e2.removeEventListener("transitionend", s2));
      });
    }
    function S(e2, t2, s2) {
      const a2 = r();
      return s2 ? e2["width" === t2 ? "offsetWidth" : "offsetHeight"] + parseFloat(
        a2.getComputedStyle(e2, null).getPropertyValue("width" === t2 ? "margin-right" : "margin-top")
      ) + parseFloat(
        a2.getComputedStyle(e2, null).getPropertyValue(
          "width" === t2 ? "margin-left" : "margin-bottom"
        )
      ) : e2.offsetWidth;
    }
    function T(e2) {
      return (Array.isArray(e2) ? e2 : [e2]).filter((e3) => !!e3);
    }
    function M(e2) {
      return (t2) => Math.abs(t2) > 0 && e2.browser && e2.browser.need3dFix && Math.abs(t2) % 90 == 0 ? t2 + 1e-3 : t2;
    }
    let C, P, L;
    function I() {
      return C || (C = function() {
        const e2 = r(), t2 = a();
        return {
          smoothScroll: t2.documentElement && t2.documentElement.style && "scrollBehavior" in t2.documentElement.style,
          touch: !!("ontouchstart" in e2 || e2.DocumentTouch && t2 instanceof e2.DocumentTouch)
        };
      }()), C;
    }
    function z(e2) {
      return void 0 === e2 && (e2 = {}), P || (P = function(e3) {
        let { userAgent: t2 } = void 0 === e3 ? {} : e3;
        const s2 = I(), a2 = r(), i2 = a2.navigator.platform, n2 = t2 || a2.navigator.userAgent, l2 = { ios: false, android: false }, o2 = a2.screen.width, d2 = a2.screen.height, c2 = n2.match(/(Android);?[\s\/]+([\d.]+)?/);
        let p2 = n2.match(/(iPad).*OS\s([\d_]+)/);
        const u2 = n2.match(/(iPod)(.*OS\s([\d_]+))?/), m2 = !p2 && n2.match(/(iPhone\sOS|iOS)\s([\d_]+)/), h2 = "Win32" === i2;
        let f2 = "MacIntel" === i2;
        return !p2 && f2 && s2.touch && [
          "1024x1366",
          "1366x1024",
          "834x1194",
          "1194x834",
          "834x1112",
          "1112x834",
          "768x1024",
          "1024x768",
          "820x1180",
          "1180x820",
          "810x1080",
          "1080x810"
        ].indexOf(`${o2}x${d2}`) >= 0 && (p2 = n2.match(/(Version)\/([\d.]+)/), p2 || (p2 = [0, 1, "13_0_0"]), f2 = false), c2 && !h2 && (l2.os = "android", l2.android = true), (p2 || m2 || u2) && (l2.os = "ios", l2.ios = true), l2;
      }(e2)), P;
    }
    function A() {
      return L || (L = function() {
        const e2 = r(), t2 = z();
        let s2 = false;
        function a2() {
          const t3 = e2.navigator.userAgent.toLowerCase();
          return t3.indexOf("safari") >= 0 && t3.indexOf("chrome") < 0 && t3.indexOf("android") < 0;
        }
        if (a2()) {
          const t3 = String(e2.navigator.userAgent);
          if (t3.includes("Version/")) {
            const [e3, a3] = t3.split("Version/")[1].split(" ")[0].split(".").map((e4) => Number(e4));
            s2 = e3 < 16 || 16 === e3 && a3 < 2;
          }
        }
        const i2 = /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(
          e2.navigator.userAgent
        ), n2 = a2();
        return {
          isSafari: s2 || n2,
          needPerspectiveFix: s2,
          need3dFix: n2 || i2 && t2.ios,
          isWebView: i2
        };
      }()), L;
    }
    var $ = {
      on(e2, t2, s2) {
        const a2 = this;
        if (!a2.eventsListeners || a2.destroyed) return a2;
        if ("function" != typeof t2) return a2;
        const i2 = s2 ? "unshift" : "push";
        return e2.split(" ").forEach((e3) => {
          a2.eventsListeners[e3] || (a2.eventsListeners[e3] = []), a2.eventsListeners[e3][i2](t2);
        }), a2;
      },
      once(e2, t2, s2) {
        const a2 = this;
        if (!a2.eventsListeners || a2.destroyed) return a2;
        if ("function" != typeof t2) return a2;
        function i2() {
          a2.off(e2, i2), i2.__emitterProxy && delete i2.__emitterProxy;
          for (var s3 = arguments.length, r2 = new Array(s3), n2 = 0; n2 < s3; n2++)
            r2[n2] = arguments[n2];
          t2.apply(a2, r2);
        }
        return i2.__emitterProxy = t2, a2.on(e2, i2, s2);
      },
      onAny(e2, t2) {
        const s2 = this;
        if (!s2.eventsListeners || s2.destroyed) return s2;
        if ("function" != typeof e2) return s2;
        const a2 = t2 ? "unshift" : "push";
        return s2.eventsAnyListeners.indexOf(e2) < 0 && s2.eventsAnyListeners[a2](e2), s2;
      },
      offAny(e2) {
        const t2 = this;
        if (!t2.eventsListeners || t2.destroyed) return t2;
        if (!t2.eventsAnyListeners) return t2;
        const s2 = t2.eventsAnyListeners.indexOf(e2);
        return s2 >= 0 && t2.eventsAnyListeners.splice(s2, 1), t2;
      },
      off(e2, t2) {
        const s2 = this;
        return !s2.eventsListeners || s2.destroyed ? s2 : s2.eventsListeners ? (e2.split(" ").forEach((e3) => {
          void 0 === t2 ? s2.eventsListeners[e3] = [] : s2.eventsListeners[e3] && s2.eventsListeners[e3].forEach((a2, i2) => {
            (a2 === t2 || a2.__emitterProxy && a2.__emitterProxy === t2) && s2.eventsListeners[e3].splice(i2, 1);
          });
        }), s2) : s2;
      },
      emit() {
        const e2 = this;
        if (!e2.eventsListeners || e2.destroyed) return e2;
        if (!e2.eventsListeners) return e2;
        let t2, s2, a2;
        for (var i2 = arguments.length, r2 = new Array(i2), n2 = 0; n2 < i2; n2++)
          r2[n2] = arguments[n2];
        "string" == typeof r2[0] || Array.isArray(r2[0]) ? (t2 = r2[0], s2 = r2.slice(1, r2.length), a2 = e2) : (t2 = r2[0].events, s2 = r2[0].data, a2 = r2[0].context || e2), s2.unshift(a2);
        return (Array.isArray(t2) ? t2 : t2.split(" ")).forEach((t3) => {
          e2.eventsAnyListeners && e2.eventsAnyListeners.length && e2.eventsAnyListeners.forEach((e3) => {
            e3.apply(a2, [t3, ...s2]);
          }), e2.eventsListeners && e2.eventsListeners[t3] && e2.eventsListeners[t3].forEach((e3) => {
            e3.apply(a2, s2);
          });
        }), e2;
      }
    };
    const k = (e2, t2, s2) => {
      t2 && !e2.classList.contains(s2) ? e2.classList.add(s2) : !t2 && e2.classList.contains(s2) && e2.classList.remove(s2);
    };
    const O = (e2, t2, s2) => {
      t2 && !e2.classList.contains(s2) ? e2.classList.add(s2) : !t2 && e2.classList.contains(s2) && e2.classList.remove(s2);
    };
    const D = (e2, t2) => {
      if (!e2 || e2.destroyed || !e2.params) return;
      const s2 = t2.closest(
        e2.isElement ? "swiper-slide" : `.${e2.params.slideClass}`
      );
      if (s2) {
        let t3 = s2.querySelector(`.${e2.params.lazyPreloaderClass}`);
        !t3 && e2.isElement && (s2.shadowRoot ? t3 = s2.shadowRoot.querySelector(
          `.${e2.params.lazyPreloaderClass}`
        ) : requestAnimationFrame(() => {
          s2.shadowRoot && (t3 = s2.shadowRoot.querySelector(
            `.${e2.params.lazyPreloaderClass}`
          ), t3 && t3.remove());
        })), t3 && t3.remove();
      }
    }, G = (e2, t2) => {
      if (!e2.slides[t2]) return;
      const s2 = e2.slides[t2].querySelector('[loading="lazy"]');
      s2 && s2.removeAttribute("loading");
    }, H = (e2) => {
      if (!e2 || e2.destroyed || !e2.params) return;
      let t2 = e2.params.lazyPreloadPrevNext;
      const s2 = e2.slides.length;
      if (!s2 || !t2 || t2 < 0) return;
      t2 = Math.min(t2, s2);
      const a2 = "auto" === e2.params.slidesPerView ? e2.slidesPerViewDynamic() : Math.ceil(e2.params.slidesPerView), i2 = e2.activeIndex;
      if (e2.params.grid && e2.params.grid.rows > 1) {
        const s3 = i2, r3 = [s3 - t2];
        return r3.push(...Array.from({ length: t2 }).map((e3, t3) => s3 + a2 + t3)), void e2.slides.forEach((t3, s4) => {
          r3.includes(t3.column) && G(e2, s4);
        });
      }
      const r2 = i2 + a2 - 1;
      if (e2.params.rewind || e2.params.loop)
        for (let a3 = i2 - t2; a3 <= r2 + t2; a3 += 1) {
          const t3 = (a3 % s2 + s2) % s2;
          (t3 < i2 || t3 > r2) && G(e2, t3);
        }
      else
        for (let a3 = Math.max(i2 - t2, 0); a3 <= Math.min(r2 + t2, s2 - 1); a3 += 1)
          a3 !== i2 && (a3 > r2 || a3 < i2) && G(e2, a3);
    };
    var B = {
      updateSize: function() {
        const e2 = this;
        let t2, s2;
        const a2 = e2.el;
        t2 = void 0 !== e2.params.width && null !== e2.params.width ? e2.params.width : a2.clientWidth, s2 = void 0 !== e2.params.height && null !== e2.params.height ? e2.params.height : a2.clientHeight, 0 === t2 && e2.isHorizontal() || 0 === s2 && e2.isVertical() || (t2 = t2 - parseInt(b(a2, "padding-left") || 0, 10) - parseInt(b(a2, "padding-right") || 0, 10), s2 = s2 - parseInt(b(a2, "padding-top") || 0, 10) - parseInt(b(a2, "padding-bottom") || 0, 10), Number.isNaN(t2) && (t2 = 0), Number.isNaN(s2) && (s2 = 0), Object.assign(e2, {
          width: t2,
          height: s2,
          size: e2.isHorizontal() ? t2 : s2
        }));
      },
      updateSlides: function() {
        const e2 = this;
        function t2(t3, s3) {
          return parseFloat(t3.getPropertyValue(e2.getDirectionLabel(s3)) || 0);
        }
        const s2 = e2.params, {
          wrapperEl: a2,
          slidesEl: i2,
          size: r2,
          rtlTranslate: n2,
          wrongRTL: l2
        } = e2, o2 = e2.virtual && s2.virtual.enabled, d2 = o2 ? e2.virtual.slides.length : e2.slides.length, c2 = f(i2, `.${e2.params.slideClass}, swiper-slide`), p2 = o2 ? e2.virtual.slides.length : c2.length;
        let m2 = [];
        const h2 = [], g2 = [];
        let v2 = s2.slidesOffsetBefore;
        "function" == typeof v2 && (v2 = s2.slidesOffsetBefore.call(e2));
        let w2 = s2.slidesOffsetAfter;
        "function" == typeof w2 && (w2 = s2.slidesOffsetAfter.call(e2));
        const y2 = e2.snapGrid.length, E2 = e2.slidesGrid.length;
        let x2 = s2.spaceBetween, T2 = -v2, M2 = 0, C2 = 0;
        if (void 0 === r2) return;
        "string" == typeof x2 && x2.indexOf("%") >= 0 ? x2 = parseFloat(x2.replace("%", "")) / 100 * r2 : "string" == typeof x2 && (x2 = parseFloat(x2)), e2.virtualSize = -x2, c2.forEach((e3) => {
          n2 ? e3.style.marginLeft = "" : e3.style.marginRight = "", e3.style.marginBottom = "", e3.style.marginTop = "";
        }), s2.centeredSlides && s2.cssMode && (u(a2, "--swiper-centered-offset-before", ""), u(a2, "--swiper-centered-offset-after", ""));
        const P2 = s2.grid && s2.grid.rows > 1 && e2.grid;
        let L2;
        P2 ? e2.grid.initSlides(c2) : e2.grid && e2.grid.unsetSlides();
        const I2 = "auto" === s2.slidesPerView && s2.breakpoints && Object.keys(s2.breakpoints).filter(
          (e3) => void 0 !== s2.breakpoints[e3].slidesPerView
        ).length > 0;
        for (let a3 = 0; a3 < p2; a3 += 1) {
          let i3;
          if (L2 = 0, c2[a3] && (i3 = c2[a3]), P2 && e2.grid.updateSlide(a3, i3, c2), !c2[a3] || "none" !== b(i3, "display")) {
            if ("auto" === s2.slidesPerView) {
              I2 && (c2[a3].style[e2.getDirectionLabel("width")] = "");
              const r3 = getComputedStyle(i3), n3 = i3.style.transform, l3 = i3.style.webkitTransform;
              if (n3 && (i3.style.transform = "none"), l3 && (i3.style.webkitTransform = "none"), s2.roundLengths)
                L2 = e2.isHorizontal() ? S(i3, "width", true) : S(i3, "height", true);
              else {
                const e3 = t2(r3, "width"), s3 = t2(r3, "padding-left"), a4 = t2(r3, "padding-right"), n4 = t2(r3, "margin-left"), l4 = t2(r3, "margin-right"), o3 = r3.getPropertyValue("box-sizing");
                if (o3 && "border-box" === o3) L2 = e3 + n4 + l4;
                else {
                  const { clientWidth: t3, offsetWidth: r4 } = i3;
                  L2 = e3 + s3 + a4 + n4 + l4 + (r4 - t3);
                }
              }
              n3 && (i3.style.transform = n3), l3 && (i3.style.webkitTransform = l3), s2.roundLengths && (L2 = Math.floor(L2));
            } else
              L2 = (r2 - (s2.slidesPerView - 1) * x2) / s2.slidesPerView, s2.roundLengths && (L2 = Math.floor(L2)), c2[a3] && (c2[a3].style[e2.getDirectionLabel("width")] = `${L2}px`);
            c2[a3] && (c2[a3].swiperSlideSize = L2), g2.push(L2), s2.centeredSlides ? (T2 = T2 + L2 / 2 + M2 / 2 + x2, 0 === M2 && 0 !== a3 && (T2 = T2 - r2 / 2 - x2), 0 === a3 && (T2 = T2 - r2 / 2 - x2), Math.abs(T2) < 1e-3 && (T2 = 0), s2.roundLengths && (T2 = Math.floor(T2)), C2 % s2.slidesPerGroup == 0 && m2.push(T2), h2.push(T2)) : (s2.roundLengths && (T2 = Math.floor(T2)), (C2 - Math.min(e2.params.slidesPerGroupSkip, C2)) % e2.params.slidesPerGroup == 0 && m2.push(T2), h2.push(T2), T2 = T2 + L2 + x2), e2.virtualSize += L2 + x2, M2 = L2, C2 += 1;
          }
        }
        if (e2.virtualSize = Math.max(e2.virtualSize, r2) + w2, n2 && l2 && ("slide" === s2.effect || "coverflow" === s2.effect) && (a2.style.width = `${e2.virtualSize + x2}px`), s2.setWrapperSize && (a2.style[e2.getDirectionLabel("width")] = `${e2.virtualSize + x2}px`), P2 && e2.grid.updateWrapperSize(L2, m2), !s2.centeredSlides) {
          const t3 = [];
          for (let a3 = 0; a3 < m2.length; a3 += 1) {
            let i3 = m2[a3];
            s2.roundLengths && (i3 = Math.floor(i3)), m2[a3] <= e2.virtualSize - r2 && t3.push(i3);
          }
          m2 = t3, Math.floor(e2.virtualSize - r2) - Math.floor(m2[m2.length - 1]) > 1 && m2.push(e2.virtualSize - r2);
        }
        if (o2 && s2.loop) {
          const t3 = g2[0] + x2;
          if (s2.slidesPerGroup > 1) {
            const a3 = Math.ceil(
              (e2.virtual.slidesBefore + e2.virtual.slidesAfter) / s2.slidesPerGroup
            ), i3 = t3 * s2.slidesPerGroup;
            for (let e3 = 0; e3 < a3; e3 += 1) m2.push(m2[m2.length - 1] + i3);
          }
          for (let a3 = 0; a3 < e2.virtual.slidesBefore + e2.virtual.slidesAfter; a3 += 1)
            1 === s2.slidesPerGroup && m2.push(m2[m2.length - 1] + t3), h2.push(h2[h2.length - 1] + t3), e2.virtualSize += t3;
        }
        if (0 === m2.length && (m2 = [0]), 0 !== x2) {
          const t3 = e2.isHorizontal() && n2 ? "marginLeft" : e2.getDirectionLabel("marginRight");
          c2.filter(
            (e3, t4) => !(s2.cssMode && !s2.loop) || t4 !== c2.length - 1
          ).forEach((e3) => {
            e3.style[t3] = `${x2}px`;
          });
        }
        if (s2.centeredSlides && s2.centeredSlidesBounds) {
          let e3 = 0;
          g2.forEach((t4) => {
            e3 += t4 + (x2 || 0);
          }), e3 -= x2;
          const t3 = e3 > r2 ? e3 - r2 : 0;
          m2 = m2.map((e4) => e4 <= 0 ? -v2 : e4 > t3 ? t3 + w2 : e4);
        }
        if (s2.centerInsufficientSlides) {
          let e3 = 0;
          g2.forEach((t4) => {
            e3 += t4 + (x2 || 0);
          }), e3 -= x2;
          const t3 = (s2.slidesOffsetBefore || 0) + (s2.slidesOffsetAfter || 0);
          if (e3 + t3 < r2) {
            const s3 = (r2 - e3 - t3) / 2;
            m2.forEach((e4, t4) => {
              m2[t4] = e4 - s3;
            }), h2.forEach((e4, t4) => {
              h2[t4] = e4 + s3;
            });
          }
        }
        if (Object.assign(e2, {
          slides: c2,
          snapGrid: m2,
          slidesGrid: h2,
          slidesSizesGrid: g2
        }), s2.centeredSlides && s2.cssMode && !s2.centeredSlidesBounds) {
          u(a2, "--swiper-centered-offset-before", -m2[0] + "px"), u(
            a2,
            "--swiper-centered-offset-after",
            e2.size / 2 - g2[g2.length - 1] / 2 + "px"
          );
          const t3 = -e2.snapGrid[0], s3 = -e2.slidesGrid[0];
          e2.snapGrid = e2.snapGrid.map((e3) => e3 + t3), e2.slidesGrid = e2.slidesGrid.map((e3) => e3 + s3);
        }
        if (p2 !== d2 && e2.emit("slidesLengthChange"), m2.length !== y2 && (e2.params.watchOverflow && e2.checkOverflow(), e2.emit("snapGridLengthChange")), h2.length !== E2 && e2.emit("slidesGridLengthChange"), s2.watchSlidesProgress && e2.updateSlidesOffset(), e2.emit("slidesUpdated"), !(o2 || s2.cssMode || "slide" !== s2.effect && "fade" !== s2.effect)) {
          const t3 = `${s2.containerModifierClass}backface-hidden`, a3 = e2.el.classList.contains(t3);
          p2 <= s2.maxBackfaceHiddenSlides ? a3 || e2.el.classList.add(t3) : a3 && e2.el.classList.remove(t3);
        }
      },
      updateAutoHeight: function(e2) {
        const t2 = this, s2 = [], a2 = t2.virtual && t2.params.virtual.enabled;
        let i2, r2 = 0;
        "number" == typeof e2 ? t2.setTransition(e2) : true === e2 && t2.setTransition(t2.params.speed);
        const n2 = (e3) => a2 ? t2.slides[t2.getSlideIndexByData(e3)] : t2.slides[e3];
        if ("auto" !== t2.params.slidesPerView && t2.params.slidesPerView > 1)
          if (t2.params.centeredSlides)
            (t2.visibleSlides || []).forEach((e3) => {
              s2.push(e3);
            });
          else
            for (i2 = 0; i2 < Math.ceil(t2.params.slidesPerView); i2 += 1) {
              const e3 = t2.activeIndex + i2;
              if (e3 > t2.slides.length && !a2) break;
              s2.push(n2(e3));
            }
        else s2.push(n2(t2.activeIndex));
        for (i2 = 0; i2 < s2.length; i2 += 1)
          if (void 0 !== s2[i2]) {
            const e3 = s2[i2].offsetHeight;
            r2 = e3 > r2 ? e3 : r2;
          }
        (r2 || 0 === r2) && (t2.wrapperEl.style.height = `${r2}px`);
      },
      updateSlidesOffset: function() {
        const e2 = this, t2 = e2.slides, s2 = e2.isElement ? e2.isHorizontal() ? e2.wrapperEl.offsetLeft : e2.wrapperEl.offsetTop : 0;
        for (let a2 = 0; a2 < t2.length; a2 += 1)
          t2[a2].swiperSlideOffset = (e2.isHorizontal() ? t2[a2].offsetLeft : t2[a2].offsetTop) - s2 - e2.cssOverflowAdjustment();
      },
      updateSlidesProgress: function(e2) {
        void 0 === e2 && (e2 = this && this.translate || 0);
        const t2 = this, s2 = t2.params, { slides: a2, rtlTranslate: i2, snapGrid: r2 } = t2;
        if (0 === a2.length) return;
        void 0 === a2[0].swiperSlideOffset && t2.updateSlidesOffset();
        let n2 = -e2;
        i2 && (n2 = e2), t2.visibleSlidesIndexes = [], t2.visibleSlides = [];
        let l2 = s2.spaceBetween;
        "string" == typeof l2 && l2.indexOf("%") >= 0 ? l2 = parseFloat(l2.replace("%", "")) / 100 * t2.size : "string" == typeof l2 && (l2 = parseFloat(l2));
        for (let e3 = 0; e3 < a2.length; e3 += 1) {
          const o2 = a2[e3];
          let d2 = o2.swiperSlideOffset;
          s2.cssMode && s2.centeredSlides && (d2 -= a2[0].swiperSlideOffset);
          const c2 = (n2 + (s2.centeredSlides ? t2.minTranslate() : 0) - d2) / (o2.swiperSlideSize + l2), p2 = (n2 - r2[0] + (s2.centeredSlides ? t2.minTranslate() : 0) - d2) / (o2.swiperSlideSize + l2), u2 = -(n2 - d2), m2 = u2 + t2.slidesSizesGrid[e3], h2 = u2 >= 0 && u2 <= t2.size - t2.slidesSizesGrid[e3], f2 = u2 >= 0 && u2 < t2.size - 1 || m2 > 1 && m2 <= t2.size || u2 <= 0 && m2 >= t2.size;
          f2 && (t2.visibleSlides.push(o2), t2.visibleSlidesIndexes.push(e3)), k(o2, f2, s2.slideVisibleClass), k(o2, h2, s2.slideFullyVisibleClass), o2.progress = i2 ? -c2 : c2, o2.originalProgress = i2 ? -p2 : p2;
        }
      },
      updateProgress: function(e2) {
        const t2 = this;
        if (void 0 === e2) {
          const s3 = t2.rtlTranslate ? -1 : 1;
          e2 = t2 && t2.translate && t2.translate * s3 || 0;
        }
        const s2 = t2.params, a2 = t2.maxTranslate() - t2.minTranslate();
        let { progress: i2, isBeginning: r2, isEnd: n2, progressLoop: l2 } = t2;
        const o2 = r2, d2 = n2;
        if (0 === a2) i2 = 0, r2 = true, n2 = true;
        else {
          i2 = (e2 - t2.minTranslate()) / a2;
          const s3 = Math.abs(e2 - t2.minTranslate()) < 1, l3 = Math.abs(e2 - t2.maxTranslate()) < 1;
          r2 = s3 || i2 <= 0, n2 = l3 || i2 >= 1, s3 && (i2 = 0), l3 && (i2 = 1);
        }
        if (s2.loop) {
          const s3 = t2.getSlideIndexByData(0), a3 = t2.getSlideIndexByData(t2.slides.length - 1), i3 = t2.slidesGrid[s3], r3 = t2.slidesGrid[a3], n3 = t2.slidesGrid[t2.slidesGrid.length - 1], o3 = Math.abs(e2);
          l2 = o3 >= i3 ? (o3 - i3) / n3 : (o3 + n3 - r3) / n3, l2 > 1 && (l2 -= 1);
        }
        Object.assign(t2, {
          progress: i2,
          progressLoop: l2,
          isBeginning: r2,
          isEnd: n2
        }), (s2.watchSlidesProgress || s2.centeredSlides && s2.autoHeight) && t2.updateSlidesProgress(e2), r2 && !o2 && t2.emit("reachBeginning toEdge"), n2 && !d2 && t2.emit("reachEnd toEdge"), (o2 && !r2 || d2 && !n2) && t2.emit("fromEdge"), t2.emit("progress", i2);
      },
      updateSlidesClasses: function() {
        const e2 = this, { slides: t2, params: s2, slidesEl: a2, activeIndex: i2 } = e2, r2 = e2.virtual && s2.virtual.enabled, n2 = e2.grid && s2.grid && s2.grid.rows > 1, l2 = (e3) => f(a2, `.${s2.slideClass}${e3}, swiper-slide${e3}`)[0];
        let o2, d2, c2;
        if (r2)
          if (s2.loop) {
            let t3 = i2 - e2.virtual.slidesBefore;
            t3 < 0 && (t3 = e2.virtual.slides.length + t3), t3 >= e2.virtual.slides.length && (t3 -= e2.virtual.slides.length), o2 = l2(`[data-swiper-slide-index="${t3}"]`);
          } else o2 = l2(`[data-swiper-slide-index="${i2}"]`);
        else
          n2 ? (o2 = t2.filter((e3) => e3.column === i2)[0], c2 = t2.filter((e3) => e3.column === i2 + 1)[0], d2 = t2.filter((e3) => e3.column === i2 - 1)[0]) : o2 = t2[i2];
        o2 && (n2 || (c2 = function(e3, t3) {
          const s3 = [];
          for (; e3.nextElementSibling; ) {
            const a3 = e3.nextElementSibling;
            t3 ? a3.matches(t3) && s3.push(a3) : s3.push(a3), e3 = a3;
          }
          return s3;
        }(o2, `.${s2.slideClass}, swiper-slide`)[0], s2.loop && !c2 && (c2 = t2[0]), d2 = function(e3, t3) {
          const s3 = [];
          for (; e3.previousElementSibling; ) {
            const a3 = e3.previousElementSibling;
            t3 ? a3.matches(t3) && s3.push(a3) : s3.push(a3), e3 = a3;
          }
          return s3;
        }(o2, `.${s2.slideClass}, swiper-slide`)[0], s2.loop && 0 === !d2 && (d2 = t2[t2.length - 1]))), t2.forEach((e3) => {
          O(e3, e3 === o2, s2.slideActiveClass), O(e3, e3 === c2, s2.slideNextClass), O(e3, e3 === d2, s2.slidePrevClass);
        }), e2.emitSlidesClasses();
      },
      updateActiveIndex: function(e2) {
        const t2 = this, s2 = t2.rtlTranslate ? t2.translate : -t2.translate, {
          snapGrid: a2,
          params: i2,
          activeIndex: r2,
          realIndex: n2,
          snapIndex: l2
        } = t2;
        let o2, d2 = e2;
        const c2 = (e3) => {
          let s3 = e3 - t2.virtual.slidesBefore;
          return s3 < 0 && (s3 = t2.virtual.slides.length + s3), s3 >= t2.virtual.slides.length && (s3 -= t2.virtual.slides.length), s3;
        };
        if (void 0 === d2 && (d2 = function(e3) {
          const { slidesGrid: t3, params: s3 } = e3, a3 = e3.rtlTranslate ? e3.translate : -e3.translate;
          let i3;
          for (let e4 = 0; e4 < t3.length; e4 += 1)
            void 0 !== t3[e4 + 1] ? a3 >= t3[e4] && a3 < t3[e4 + 1] - (t3[e4 + 1] - t3[e4]) / 2 ? i3 = e4 : a3 >= t3[e4] && a3 < t3[e4 + 1] && (i3 = e4 + 1) : a3 >= t3[e4] && (i3 = e4);
          return s3.normalizeSlideIndex && (i3 < 0 || void 0 === i3) && (i3 = 0), i3;
        }(t2)), a2.indexOf(s2) >= 0)
          o2 = a2.indexOf(s2);
        else {
          const e3 = Math.min(i2.slidesPerGroupSkip, d2);
          o2 = e3 + Math.floor((d2 - e3) / i2.slidesPerGroup);
        }
        if (o2 >= a2.length && (o2 = a2.length - 1), d2 === r2 && !t2.params.loop)
          return void (o2 !== l2 && (t2.snapIndex = o2, t2.emit("snapIndexChange")));
        if (d2 === r2 && t2.params.loop && t2.virtual && t2.params.virtual.enabled)
          return void (t2.realIndex = c2(d2));
        const p2 = t2.grid && i2.grid && i2.grid.rows > 1;
        let u2;
        if (t2.virtual && i2.virtual.enabled && i2.loop) u2 = c2(d2);
        else if (p2) {
          const e3 = t2.slides.filter((e4) => e4.column === d2)[0];
          let s3 = parseInt(e3.getAttribute("data-swiper-slide-index"), 10);
          Number.isNaN(s3) && (s3 = Math.max(t2.slides.indexOf(e3), 0)), u2 = Math.floor(s3 / i2.grid.rows);
        } else if (t2.slides[d2]) {
          const e3 = t2.slides[d2].getAttribute("data-swiper-slide-index");
          u2 = e3 ? parseInt(e3, 10) : d2;
        } else u2 = d2;
        Object.assign(t2, {
          previousSnapIndex: l2,
          snapIndex: o2,
          previousRealIndex: n2,
          realIndex: u2,
          previousIndex: r2,
          activeIndex: d2
        }), t2.initialized && H(t2), t2.emit("activeIndexChange"), t2.emit("snapIndexChange"), (t2.initialized || t2.params.runCallbacksOnInit) && (n2 !== u2 && t2.emit("realIndexChange"), t2.emit("slideChange"));
      },
      updateClickedSlide: function(e2, t2) {
        const s2 = this, a2 = s2.params;
        let i2 = e2.closest(`.${a2.slideClass}, swiper-slide`);
        !i2 && s2.isElement && t2 && t2.length > 1 && t2.includes(e2) && [...t2.slice(t2.indexOf(e2) + 1, t2.length)].forEach((e3) => {
          !i2 && e3.matches && e3.matches(`.${a2.slideClass}, swiper-slide`) && (i2 = e3);
        });
        let r2, n2 = false;
        if (i2) {
          for (let e3 = 0; e3 < s2.slides.length; e3 += 1)
            if (s2.slides[e3] === i2) {
              n2 = true, r2 = e3;
              break;
            }
        }
        if (!i2 || !n2)
          return s2.clickedSlide = void 0, void (s2.clickedIndex = void 0);
        s2.clickedSlide = i2, s2.virtual && s2.params.virtual.enabled ? s2.clickedIndex = parseInt(
          i2.getAttribute("data-swiper-slide-index"),
          10
        ) : s2.clickedIndex = r2, a2.slideToClickedSlide && void 0 !== s2.clickedIndex && s2.clickedIndex !== s2.activeIndex && s2.slideToClickedSlide();
      }
    };
    var N = {
      getTranslate: function(e2) {
        void 0 === e2 && (e2 = this.isHorizontal() ? "x" : "y");
        const { params: t2, rtlTranslate: s2, translate: a2, wrapperEl: i2 } = this;
        if (t2.virtualTranslate) return s2 ? -a2 : a2;
        if (t2.cssMode) return a2;
        let r2 = d(i2, e2);
        return r2 += this.cssOverflowAdjustment(), s2 && (r2 = -r2), r2 || 0;
      },
      setTranslate: function(e2, t2) {
        const s2 = this, { rtlTranslate: a2, params: i2, wrapperEl: r2, progress: n2 } = s2;
        let l2, o2 = 0, d2 = 0;
        s2.isHorizontal() ? o2 = a2 ? -e2 : e2 : d2 = e2, i2.roundLengths && (o2 = Math.floor(o2), d2 = Math.floor(d2)), s2.previousTranslate = s2.translate, s2.translate = s2.isHorizontal() ? o2 : d2, i2.cssMode ? r2[s2.isHorizontal() ? "scrollLeft" : "scrollTop"] = s2.isHorizontal() ? -o2 : -d2 : i2.virtualTranslate || (s2.isHorizontal() ? o2 -= s2.cssOverflowAdjustment() : d2 -= s2.cssOverflowAdjustment(), r2.style.transform = `translate3d(${o2}px, ${d2}px, 0px)`);
        const c2 = s2.maxTranslate() - s2.minTranslate();
        l2 = 0 === c2 ? 0 : (e2 - s2.minTranslate()) / c2, l2 !== n2 && s2.updateProgress(e2), s2.emit("setTranslate", s2.translate, t2);
      },
      minTranslate: function() {
        return -this.snapGrid[0];
      },
      maxTranslate: function() {
        return -this.snapGrid[this.snapGrid.length - 1];
      },
      translateTo: function(e2, t2, s2, a2, i2) {
        void 0 === e2 && (e2 = 0), void 0 === t2 && (t2 = this.params.speed), void 0 === s2 && (s2 = true), void 0 === a2 && (a2 = true);
        const r2 = this, { params: n2, wrapperEl: l2 } = r2;
        if (r2.animating && n2.preventInteractionOnTransition) return false;
        const o2 = r2.minTranslate(), d2 = r2.maxTranslate();
        let c2;
        if (c2 = a2 && e2 > o2 ? o2 : a2 && e2 < d2 ? d2 : e2, r2.updateProgress(c2), n2.cssMode) {
          const e3 = r2.isHorizontal();
          if (0 === t2) l2[e3 ? "scrollLeft" : "scrollTop"] = -c2;
          else {
            if (!r2.support.smoothScroll)
              return m({ swiper: r2, targetPosition: -c2, side: e3 ? "left" : "top" }), true;
            l2.scrollTo({ [e3 ? "left" : "top"]: -c2, behavior: "smooth" });
          }
          return true;
        }
        return 0 === t2 ? (r2.setTransition(0), r2.setTranslate(c2), s2 && (r2.emit("beforeTransitionStart", t2, i2), r2.emit("transitionEnd"))) : (r2.setTransition(t2), r2.setTranslate(c2), s2 && (r2.emit("beforeTransitionStart", t2, i2), r2.emit("transitionStart")), r2.animating || (r2.animating = true, r2.onTranslateToWrapperTransitionEnd || (r2.onTranslateToWrapperTransitionEnd = function(e3) {
          r2 && !r2.destroyed && e3.target === this && (r2.wrapperEl.removeEventListener(
            "transitionend",
            r2.onTranslateToWrapperTransitionEnd
          ), r2.onTranslateToWrapperTransitionEnd = null, delete r2.onTranslateToWrapperTransitionEnd, r2.animating = false, s2 && r2.emit("transitionEnd"));
        }), r2.wrapperEl.addEventListener(
          "transitionend",
          r2.onTranslateToWrapperTransitionEnd
        ))), true;
      }
    };
    function X(e2) {
      let { swiper: t2, runCallbacks: s2, direction: a2, step: i2 } = e2;
      const { activeIndex: r2, previousIndex: n2 } = t2;
      let l2 = a2;
      if (l2 || (l2 = r2 > n2 ? "next" : r2 < n2 ? "prev" : "reset"), t2.emit(`transition${i2}`), s2 && r2 !== n2) {
        if ("reset" === l2) return void t2.emit(`slideResetTransition${i2}`);
        t2.emit(`slideChangeTransition${i2}`), "next" === l2 ? t2.emit(`slideNextTransition${i2}`) : t2.emit(`slidePrevTransition${i2}`);
      }
    }
    var Y = {
      slideTo: function(e2, t2, s2, a2, i2) {
        void 0 === e2 && (e2 = 0), void 0 === s2 && (s2 = true), "string" == typeof e2 && (e2 = parseInt(e2, 10));
        const r2 = this;
        let n2 = e2;
        n2 < 0 && (n2 = 0);
        const {
          params: l2,
          snapGrid: o2,
          slidesGrid: d2,
          previousIndex: c2,
          activeIndex: p2,
          rtlTranslate: u2,
          wrapperEl: h2,
          enabled: f2
        } = r2;
        if (!f2 && !a2 && !i2 || r2.destroyed || r2.animating && l2.preventInteractionOnTransition)
          return false;
        void 0 === t2 && (t2 = r2.params.speed);
        const g2 = Math.min(r2.params.slidesPerGroupSkip, n2);
        let v2 = g2 + Math.floor((n2 - g2) / r2.params.slidesPerGroup);
        v2 >= o2.length && (v2 = o2.length - 1);
        const w2 = -o2[v2];
        if (l2.normalizeSlideIndex)
          for (let e3 = 0; e3 < d2.length; e3 += 1) {
            const t3 = -Math.floor(100 * w2), s3 = Math.floor(100 * d2[e3]), a3 = Math.floor(100 * d2[e3 + 1]);
            void 0 !== d2[e3 + 1] ? t3 >= s3 && t3 < a3 - (a3 - s3) / 2 ? n2 = e3 : t3 >= s3 && t3 < a3 && (n2 = e3 + 1) : t3 >= s3 && (n2 = e3);
          }
        if (r2.initialized && n2 !== p2) {
          if (!r2.allowSlideNext && (u2 ? w2 > r2.translate && w2 > r2.minTranslate() : w2 < r2.translate && w2 < r2.minTranslate()))
            return false;
          if (!r2.allowSlidePrev && w2 > r2.translate && w2 > r2.maxTranslate() && (p2 || 0) !== n2)
            return false;
        }
        let b2;
        n2 !== (c2 || 0) && s2 && r2.emit("beforeSlideChangeStart"), r2.updateProgress(w2), b2 = n2 > p2 ? "next" : n2 < p2 ? "prev" : "reset";
        const y2 = r2.virtual && r2.params.virtual.enabled;
        if (!(y2 && i2) && (u2 && -w2 === r2.translate || !u2 && w2 === r2.translate))
          return r2.updateActiveIndex(n2), l2.autoHeight && r2.updateAutoHeight(), r2.updateSlidesClasses(), "slide" !== l2.effect && r2.setTranslate(w2), "reset" !== b2 && (r2.transitionStart(s2, b2), r2.transitionEnd(s2, b2)), false;
        if (l2.cssMode) {
          const e3 = r2.isHorizontal(), s3 = u2 ? w2 : -w2;
          if (0 === t2)
            y2 && (r2.wrapperEl.style.scrollSnapType = "none", r2._immediateVirtual = true), y2 && !r2._cssModeVirtualInitialSet && r2.params.initialSlide > 0 ? (r2._cssModeVirtualInitialSet = true, requestAnimationFrame(() => {
              h2[e3 ? "scrollLeft" : "scrollTop"] = s3;
            })) : h2[e3 ? "scrollLeft" : "scrollTop"] = s3, y2 && requestAnimationFrame(() => {
              r2.wrapperEl.style.scrollSnapType = "", r2._immediateVirtual = false;
            });
          else {
            if (!r2.support.smoothScroll)
              return m({ swiper: r2, targetPosition: s3, side: e3 ? "left" : "top" }), true;
            h2.scrollTo({ [e3 ? "left" : "top"]: s3, behavior: "smooth" });
          }
          return true;
        }
        return r2.setTransition(t2), r2.setTranslate(w2), r2.updateActiveIndex(n2), r2.updateSlidesClasses(), r2.emit("beforeTransitionStart", t2, a2), r2.transitionStart(s2, b2), 0 === t2 ? r2.transitionEnd(s2, b2) : r2.animating || (r2.animating = true, r2.onSlideToWrapperTransitionEnd || (r2.onSlideToWrapperTransitionEnd = function(e3) {
          r2 && !r2.destroyed && e3.target === this && (r2.wrapperEl.removeEventListener(
            "transitionend",
            r2.onSlideToWrapperTransitionEnd
          ), r2.onSlideToWrapperTransitionEnd = null, delete r2.onSlideToWrapperTransitionEnd, r2.transitionEnd(s2, b2));
        }), r2.wrapperEl.addEventListener(
          "transitionend",
          r2.onSlideToWrapperTransitionEnd
        )), true;
      },
      slideToLoop: function(e2, t2, s2, a2) {
        if (void 0 === e2 && (e2 = 0), void 0 === s2 && (s2 = true), "string" == typeof e2) {
          e2 = parseInt(e2, 10);
        }
        const i2 = this;
        if (i2.destroyed) return;
        void 0 === t2 && (t2 = i2.params.speed);
        const r2 = i2.grid && i2.params.grid && i2.params.grid.rows > 1;
        let n2 = e2;
        if (i2.params.loop)
          if (i2.virtual && i2.params.virtual.enabled) n2 += i2.virtual.slidesBefore;
          else {
            let e3;
            if (r2) {
              const t4 = n2 * i2.params.grid.rows;
              e3 = i2.slides.filter(
                (e4) => 1 * e4.getAttribute("data-swiper-slide-index") === t4
              )[0].column;
            } else e3 = i2.getSlideIndexByData(n2);
            const t3 = r2 ? Math.ceil(i2.slides.length / i2.params.grid.rows) : i2.slides.length, { centeredSlides: s3 } = i2.params;
            let l2 = i2.params.slidesPerView;
            "auto" === l2 ? l2 = i2.slidesPerViewDynamic() : (l2 = Math.ceil(parseFloat(i2.params.slidesPerView, 10)), s3 && l2 % 2 == 0 && (l2 += 1));
            let o2 = t3 - e3 < l2;
            if (s3 && (o2 = o2 || e3 < Math.ceil(l2 / 2)), a2 && s3 && "auto" !== i2.params.slidesPerView && !r2 && (o2 = false), o2) {
              const a3 = s3 ? e3 < i2.activeIndex ? "prev" : "next" : e3 - i2.activeIndex - 1 < i2.params.slidesPerView ? "next" : "prev";
              i2.loopFix({
                direction: a3,
                slideTo: true,
                activeSlideIndex: "next" === a3 ? e3 + 1 : e3 - t3 + 1,
                slideRealIndex: "next" === a3 ? i2.realIndex : void 0
              });
            }
            if (r2) {
              const e4 = n2 * i2.params.grid.rows;
              n2 = i2.slides.filter(
                (t4) => 1 * t4.getAttribute("data-swiper-slide-index") === e4
              )[0].column;
            } else n2 = i2.getSlideIndexByData(n2);
          }
        return requestAnimationFrame(() => {
          i2.slideTo(n2, t2, s2, a2);
        }), i2;
      },
      slideNext: function(e2, t2, s2) {
        void 0 === t2 && (t2 = true);
        const a2 = this, { enabled: i2, params: r2, animating: n2 } = a2;
        if (!i2 || a2.destroyed) return a2;
        void 0 === e2 && (e2 = a2.params.speed);
        let l2 = r2.slidesPerGroup;
        "auto" === r2.slidesPerView && 1 === r2.slidesPerGroup && r2.slidesPerGroupAuto && (l2 = Math.max(a2.slidesPerViewDynamic("current", true), 1));
        const o2 = a2.activeIndex < r2.slidesPerGroupSkip ? 1 : l2, d2 = a2.virtual && r2.virtual.enabled;
        if (r2.loop) {
          if (n2 && !d2 && r2.loopPreventsSliding) return false;
          if (a2.loopFix({ direction: "next" }), a2._clientLeft = a2.wrapperEl.clientLeft, a2.activeIndex === a2.slides.length - 1 && r2.cssMode)
            return requestAnimationFrame(() => {
              a2.slideTo(a2.activeIndex + o2, e2, t2, s2);
            }), true;
        }
        return r2.rewind && a2.isEnd ? a2.slideTo(0, e2, t2, s2) : a2.slideTo(a2.activeIndex + o2, e2, t2, s2);
      },
      slidePrev: function(e2, t2, s2) {
        void 0 === t2 && (t2 = true);
        const a2 = this, {
          params: i2,
          snapGrid: r2,
          slidesGrid: n2,
          rtlTranslate: l2,
          enabled: o2,
          animating: d2
        } = a2;
        if (!o2 || a2.destroyed) return a2;
        void 0 === e2 && (e2 = a2.params.speed);
        const c2 = a2.virtual && i2.virtual.enabled;
        if (i2.loop) {
          if (d2 && !c2 && i2.loopPreventsSliding) return false;
          a2.loopFix({ direction: "prev" }), a2._clientLeft = a2.wrapperEl.clientLeft;
        }
        function p2(e3) {
          return e3 < 0 ? -Math.floor(Math.abs(e3)) : Math.floor(e3);
        }
        const u2 = p2(l2 ? a2.translate : -a2.translate), m2 = r2.map((e3) => p2(e3));
        let h2 = r2[m2.indexOf(u2) - 1];
        if (void 0 === h2 && i2.cssMode) {
          let e3;
          r2.forEach((t3, s3) => {
            u2 >= t3 && (e3 = s3);
          }), void 0 !== e3 && (h2 = r2[e3 > 0 ? e3 - 1 : e3]);
        }
        let f2 = 0;
        if (void 0 !== h2 && (f2 = n2.indexOf(h2), f2 < 0 && (f2 = a2.activeIndex - 1), "auto" === i2.slidesPerView && 1 === i2.slidesPerGroup && i2.slidesPerGroupAuto && (f2 = f2 - a2.slidesPerViewDynamic("previous", true) + 1, f2 = Math.max(f2, 0))), i2.rewind && a2.isBeginning) {
          const i3 = a2.params.virtual && a2.params.virtual.enabled && a2.virtual ? a2.virtual.slides.length - 1 : a2.slides.length - 1;
          return a2.slideTo(i3, e2, t2, s2);
        }
        return i2.loop && 0 === a2.activeIndex && i2.cssMode ? (requestAnimationFrame(() => {
          a2.slideTo(f2, e2, t2, s2);
        }), true) : a2.slideTo(f2, e2, t2, s2);
      },
      slideReset: function(e2, t2, s2) {
        void 0 === t2 && (t2 = true);
        const a2 = this;
        if (!a2.destroyed)
          return void 0 === e2 && (e2 = a2.params.speed), a2.slideTo(a2.activeIndex, e2, t2, s2);
      },
      slideToClosest: function(e2, t2, s2, a2) {
        void 0 === t2 && (t2 = true), void 0 === a2 && (a2 = 0.5);
        const i2 = this;
        if (i2.destroyed) return;
        void 0 === e2 && (e2 = i2.params.speed);
        let r2 = i2.activeIndex;
        const n2 = Math.min(i2.params.slidesPerGroupSkip, r2), l2 = n2 + Math.floor((r2 - n2) / i2.params.slidesPerGroup), o2 = i2.rtlTranslate ? i2.translate : -i2.translate;
        if (o2 >= i2.snapGrid[l2]) {
          const e3 = i2.snapGrid[l2];
          o2 - e3 > (i2.snapGrid[l2 + 1] - e3) * a2 && (r2 += i2.params.slidesPerGroup);
        } else {
          const e3 = i2.snapGrid[l2 - 1];
          o2 - e3 <= (i2.snapGrid[l2] - e3) * a2 && (r2 -= i2.params.slidesPerGroup);
        }
        return r2 = Math.max(r2, 0), r2 = Math.min(r2, i2.slidesGrid.length - 1), i2.slideTo(r2, e2, t2, s2);
      },
      slideToClickedSlide: function() {
        const e2 = this;
        if (e2.destroyed) return;
        const { params: t2, slidesEl: s2 } = e2, a2 = "auto" === t2.slidesPerView ? e2.slidesPerViewDynamic() : t2.slidesPerView;
        let i2, r2 = e2.clickedIndex;
        const n2 = e2.isElement ? "swiper-slide" : `.${t2.slideClass}`;
        if (t2.loop) {
          if (e2.animating) return;
          i2 = parseInt(
            e2.clickedSlide.getAttribute("data-swiper-slide-index"),
            10
          ), t2.centeredSlides ? r2 < e2.loopedSlides - a2 / 2 || r2 > e2.slides.length - e2.loopedSlides + a2 / 2 ? (e2.loopFix(), r2 = e2.getSlideIndex(
            f(s2, `${n2}[data-swiper-slide-index="${i2}"]`)[0]
          ), l(() => {
            e2.slideTo(r2);
          })) : e2.slideTo(r2) : r2 > e2.slides.length - a2 ? (e2.loopFix(), r2 = e2.getSlideIndex(
            f(s2, `${n2}[data-swiper-slide-index="${i2}"]`)[0]
          ), l(() => {
            e2.slideTo(r2);
          })) : e2.slideTo(r2);
        } else e2.slideTo(r2);
      }
    };
    var R = {
      loopCreate: function(e2) {
        const t2 = this, { params: s2, slidesEl: a2 } = t2;
        if (!s2.loop || t2.virtual && t2.params.virtual.enabled) return;
        const i2 = () => {
          f(a2, `.${s2.slideClass}, swiper-slide`).forEach((e3, t3) => {
            e3.setAttribute("data-swiper-slide-index", t3);
          });
        }, r2 = t2.grid && s2.grid && s2.grid.rows > 1, n2 = s2.slidesPerGroup * (r2 ? s2.grid.rows : 1), l2 = t2.slides.length % n2 != 0, o2 = r2 && t2.slides.length % s2.grid.rows != 0, d2 = (e3) => {
          for (let a3 = 0; a3 < e3; a3 += 1) {
            const e4 = t2.isElement ? v("swiper-slide", [s2.slideBlankClass]) : v("div", [s2.slideClass, s2.slideBlankClass]);
            t2.slidesEl.append(e4);
          }
        };
        if (l2) {
          if (s2.loopAddBlankSlides) {
            d2(n2 - t2.slides.length % n2), t2.recalcSlides(), t2.updateSlides();
          } else
            g(
              "Swiper Loop Warning: The number of slides is not even to slidesPerGroup, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)"
            );
          i2();
        } else if (o2) {
          if (s2.loopAddBlankSlides) {
            d2(s2.grid.rows - t2.slides.length % s2.grid.rows), t2.recalcSlides(), t2.updateSlides();
          } else
            g(
              "Swiper Loop Warning: The number of slides is not even to grid.rows, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)"
            );
          i2();
        } else i2();
        t2.loopFix({
          slideRealIndex: e2,
          direction: s2.centeredSlides ? void 0 : "next"
        });
      },
      loopFix: function(e2) {
        let {
          slideRealIndex: t2,
          slideTo: s2 = true,
          direction: a2,
          setTranslate: i2,
          activeSlideIndex: r2,
          byController: n2,
          byMousewheel: l2
        } = void 0 === e2 ? {} : e2;
        const o2 = this;
        if (!o2.params.loop) return;
        o2.emit("beforeLoopFix");
        const {
          slides: d2,
          allowSlidePrev: c2,
          allowSlideNext: p2,
          slidesEl: u2,
          params: m2
        } = o2, { centeredSlides: h2 } = m2;
        if (o2.allowSlidePrev = true, o2.allowSlideNext = true, o2.virtual && m2.virtual.enabled)
          return s2 && (m2.centeredSlides || 0 !== o2.snapIndex ? m2.centeredSlides && o2.snapIndex < m2.slidesPerView ? o2.slideTo(o2.virtual.slides.length + o2.snapIndex, 0, false, true) : o2.snapIndex === o2.snapGrid.length - 1 && o2.slideTo(o2.virtual.slidesBefore, 0, false, true) : o2.slideTo(o2.virtual.slides.length, 0, false, true)), o2.allowSlidePrev = c2, o2.allowSlideNext = p2, void o2.emit("loopFix");
        let f2 = m2.slidesPerView;
        "auto" === f2 ? f2 = o2.slidesPerViewDynamic() : (f2 = Math.ceil(parseFloat(m2.slidesPerView, 10)), h2 && f2 % 2 == 0 && (f2 += 1));
        const v2 = m2.slidesPerGroupAuto ? f2 : m2.slidesPerGroup;
        let w2 = v2;
        w2 % v2 != 0 && (w2 += v2 - w2 % v2), w2 += m2.loopAdditionalSlides, o2.loopedSlides = w2;
        const b2 = o2.grid && m2.grid && m2.grid.rows > 1;
        d2.length < f2 + w2 ? g(
          "Swiper Loop Warning: The number of slides is not enough for loop mode, it will be disabled and not function properly. You need to add more slides (or make duplicates) or lower the values of slidesPerView and slidesPerGroup parameters"
        ) : b2 && "row" === m2.grid.fill && g(
          "Swiper Loop Warning: Loop mode is not compatible with grid.fill = `row`"
        );
        const y2 = [], E2 = [];
        let x2 = o2.activeIndex;
        void 0 === r2 ? r2 = o2.getSlideIndex(
          d2.filter((e3) => e3.classList.contains(m2.slideActiveClass))[0]
        ) : x2 = r2;
        const S2 = "next" === a2 || !a2, T2 = "prev" === a2 || !a2;
        let M2 = 0, C2 = 0;
        const P2 = b2 ? Math.ceil(d2.length / m2.grid.rows) : d2.length, L2 = (b2 ? d2[r2].column : r2) + (h2 && void 0 === i2 ? -f2 / 2 + 0.5 : 0);
        if (L2 < w2) {
          M2 = Math.max(w2 - L2, v2);
          for (let e3 = 0; e3 < w2 - L2; e3 += 1) {
            const t3 = e3 - Math.floor(e3 / P2) * P2;
            if (b2) {
              const e4 = P2 - t3 - 1;
              for (let t4 = d2.length - 1; t4 >= 0; t4 -= 1)
                d2[t4].column === e4 && y2.push(t4);
            } else y2.push(P2 - t3 - 1);
          }
        } else if (L2 + f2 > P2 - w2) {
          C2 = Math.max(L2 - (P2 - 2 * w2), v2);
          for (let e3 = 0; e3 < C2; e3 += 1) {
            const t3 = e3 - Math.floor(e3 / P2) * P2;
            b2 ? d2.forEach((e4, s3) => {
              e4.column === t3 && E2.push(s3);
            }) : E2.push(t3);
          }
        }
        if (o2.__preventObserver__ = true, requestAnimationFrame(() => {
          o2.__preventObserver__ = false;
        }), T2 && y2.forEach((e3) => {
          d2[e3].swiperLoopMoveDOM = true, u2.prepend(d2[e3]), d2[e3].swiperLoopMoveDOM = false;
        }), S2 && E2.forEach((e3) => {
          d2[e3].swiperLoopMoveDOM = true, u2.append(d2[e3]), d2[e3].swiperLoopMoveDOM = false;
        }), o2.recalcSlides(), "auto" === m2.slidesPerView ? o2.updateSlides() : b2 && (y2.length > 0 && T2 || E2.length > 0 && S2) && o2.slides.forEach((e3, t3) => {
          o2.grid.updateSlide(t3, e3, o2.slides);
        }), m2.watchSlidesProgress && o2.updateSlidesOffset(), s2) {
          if (y2.length > 0 && T2) {
            if (void 0 === t2) {
              const e3 = o2.slidesGrid[x2], t3 = o2.slidesGrid[x2 + M2] - e3;
              l2 ? o2.setTranslate(o2.translate - t3) : (o2.slideTo(x2 + Math.ceil(M2), 0, false, true), i2 && (o2.touchEventsData.startTranslate = o2.touchEventsData.startTranslate - t3, o2.touchEventsData.currentTranslate = o2.touchEventsData.currentTranslate - t3));
            } else if (i2) {
              const e3 = b2 ? y2.length / m2.grid.rows : y2.length;
              o2.slideTo(o2.activeIndex + e3, 0, false, true), o2.touchEventsData.currentTranslate = o2.translate;
            }
          } else if (E2.length > 0 && S2)
            if (void 0 === t2) {
              const e3 = o2.slidesGrid[x2], t3 = o2.slidesGrid[x2 - C2] - e3;
              l2 ? o2.setTranslate(o2.translate - t3) : (o2.slideTo(x2 - C2, 0, false, true), i2 && (o2.touchEventsData.startTranslate = o2.touchEventsData.startTranslate - t3, o2.touchEventsData.currentTranslate = o2.touchEventsData.currentTranslate - t3));
            } else {
              const e3 = b2 ? E2.length / m2.grid.rows : E2.length;
              o2.slideTo(o2.activeIndex - e3, 0, false, true);
            }
        }
        if (o2.allowSlidePrev = c2, o2.allowSlideNext = p2, o2.controller && o2.controller.control && !n2) {
          const e3 = {
            slideRealIndex: t2,
            direction: a2,
            setTranslate: i2,
            activeSlideIndex: r2,
            byController: true
          };
          Array.isArray(o2.controller.control) ? o2.controller.control.forEach((t3) => {
            !t3.destroyed && t3.params.loop && t3.loopFix({
              ...e3,
              slideTo: t3.params.slidesPerView === m2.slidesPerView && s2
            });
          }) : o2.controller.control instanceof o2.constructor && o2.controller.control.params.loop && o2.controller.control.loopFix({
            ...e3,
            slideTo: o2.controller.control.params.slidesPerView === m2.slidesPerView && s2
          });
        }
        o2.emit("loopFix");
      },
      loopDestroy: function() {
        const e2 = this, { params: t2, slidesEl: s2 } = e2;
        if (!t2.loop || e2.virtual && e2.params.virtual.enabled) return;
        e2.recalcSlides();
        const a2 = [];
        e2.slides.forEach((e3) => {
          const t3 = void 0 === e3.swiperSlideIndex ? 1 * e3.getAttribute("data-swiper-slide-index") : e3.swiperSlideIndex;
          a2[t3] = e3;
        }), e2.slides.forEach((e3) => {
          e3.removeAttribute("data-swiper-slide-index");
        }), a2.forEach((e3) => {
          s2.append(e3);
        }), e2.recalcSlides(), e2.slideTo(e2.realIndex, 0);
      }
    };
    function q(e2, t2, s2) {
      const a2 = r(), { params: i2 } = e2, n2 = i2.edgeSwipeDetection, l2 = i2.edgeSwipeThreshold;
      return !n2 || !(s2 <= l2 || s2 >= a2.innerWidth - l2) || "prevent" === n2 && (t2.preventDefault(), true);
    }
    function F(e2) {
      const t2 = this, s2 = a();
      let i2 = e2;
      i2.originalEvent && (i2 = i2.originalEvent);
      const n2 = t2.touchEventsData;
      if ("pointerdown" === i2.type) {
        if (null !== n2.pointerId && n2.pointerId !== i2.pointerId) return;
        n2.pointerId = i2.pointerId;
      } else
        "touchstart" === i2.type && 1 === i2.targetTouches.length && (n2.touchId = i2.targetTouches[0].identifier);
      if ("touchstart" === i2.type) return void q(t2, i2, i2.targetTouches[0].pageX);
      const { params: l2, touches: d2, enabled: c2 } = t2;
      if (!c2) return;
      if (!l2.simulateTouch && "mouse" === i2.pointerType) return;
      if (t2.animating && l2.preventInteractionOnTransition) return;
      !t2.animating && l2.cssMode && l2.loop && t2.loopFix();
      let p2 = i2.target;
      if ("wrapper" === l2.touchEventsTarget && !function(e3, t3) {
        const s3 = t3.contains(e3);
        if (!s3 && t3 instanceof HTMLSlotElement)
          return [...t3.assignedElements()].includes(e3);
        return s3;
      }(p2, t2.wrapperEl))
        return;
      if ("which" in i2 && 3 === i2.which) return;
      if ("button" in i2 && i2.button > 0) return;
      if (n2.isTouched && n2.isMoved) return;
      const u2 = !!l2.noSwipingClass && "" !== l2.noSwipingClass, m2 = i2.composedPath ? i2.composedPath() : i2.path;
      u2 && i2.target && i2.target.shadowRoot && m2 && (p2 = m2[0]);
      const h2 = l2.noSwipingSelector ? l2.noSwipingSelector : `.${l2.noSwipingClass}`, f2 = !(!i2.target || !i2.target.shadowRoot);
      if (l2.noSwiping && (f2 ? function(e3, t3) {
        return void 0 === t3 && (t3 = this), function t4(s3) {
          if (!s3 || s3 === a() || s3 === r()) return null;
          s3.assignedSlot && (s3 = s3.assignedSlot);
          const i3 = s3.closest(e3);
          return i3 || s3.getRootNode ? i3 || t4(s3.getRootNode().host) : null;
        }(t3);
      }(h2, p2) : p2.closest(h2)))
        return void (t2.allowClick = true);
      if (l2.swipeHandler && !p2.closest(l2.swipeHandler)) return;
      d2.currentX = i2.pageX, d2.currentY = i2.pageY;
      const g2 = d2.currentX, v2 = d2.currentY;
      if (!q(t2, i2, g2)) return;
      Object.assign(n2, {
        isTouched: true,
        isMoved: false,
        allowTouchCallbacks: true,
        isScrolling: void 0,
        startMoving: void 0
      }), d2.startX = g2, d2.startY = v2, n2.touchStartTime = o(), t2.allowClick = true, t2.updateSize(), t2.swipeDirection = void 0, l2.threshold > 0 && (n2.allowThresholdMove = false);
      let w2 = true;
      p2.matches(n2.focusableElements) && (w2 = false, "SELECT" === p2.nodeName && (n2.isTouched = false)), s2.activeElement && s2.activeElement.matches(n2.focusableElements) && s2.activeElement !== p2 && ("mouse" === i2.pointerType || "mouse" !== i2.pointerType && !p2.matches(n2.focusableElements)) && s2.activeElement.blur();
      const b2 = w2 && t2.allowTouchMove && l2.touchStartPreventDefault;
      !l2.touchStartForcePreventDefault && !b2 || p2.isContentEditable || i2.preventDefault(), l2.freeMode && l2.freeMode.enabled && t2.freeMode && t2.animating && !l2.cssMode && t2.freeMode.onTouchStart(), t2.emit("touchStart", i2);
    }
    function V(e2) {
      const t2 = a(), s2 = this, i2 = s2.touchEventsData, { params: r2, touches: n2, rtlTranslate: l2, enabled: d2 } = s2;
      if (!d2) return;
      if (!r2.simulateTouch && "mouse" === e2.pointerType) return;
      let c2, p2 = e2;
      if (p2.originalEvent && (p2 = p2.originalEvent), "pointermove" === p2.type) {
        if (null !== i2.touchId) return;
        if (p2.pointerId !== i2.pointerId) return;
      }
      if ("touchmove" === p2.type) {
        if (c2 = [...p2.changedTouches].filter(
          (e3) => e3.identifier === i2.touchId
        )[0], !c2 || c2.identifier !== i2.touchId)
          return;
      } else c2 = p2;
      if (!i2.isTouched)
        return void (i2.startMoving && i2.isScrolling && s2.emit("touchMoveOpposite", p2));
      const u2 = c2.pageX, m2 = c2.pageY;
      if (p2.preventedByNestedSwiper) return n2.startX = u2, void (n2.startY = m2);
      if (!s2.allowTouchMove)
        return p2.target.matches(i2.focusableElements) || (s2.allowClick = false), void (i2.isTouched && (Object.assign(n2, { startX: u2, startY: m2, currentX: u2, currentY: m2 }), i2.touchStartTime = o()));
      if (r2.touchReleaseOnEdges && !r2.loop) {
        if (s2.isVertical()) {
          if (m2 < n2.startY && s2.translate <= s2.maxTranslate() || m2 > n2.startY && s2.translate >= s2.minTranslate())
            return i2.isTouched = false, void (i2.isMoved = false);
        } else if (u2 < n2.startX && s2.translate <= s2.maxTranslate() || u2 > n2.startX && s2.translate >= s2.minTranslate())
          return;
      }
      if (t2.activeElement && t2.activeElement.matches(i2.focusableElements) && t2.activeElement !== p2.target && "mouse" !== p2.pointerType && t2.activeElement.blur(), t2.activeElement && p2.target === t2.activeElement && p2.target.matches(i2.focusableElements))
        return i2.isMoved = true, void (s2.allowClick = false);
      i2.allowTouchCallbacks && s2.emit("touchMove", p2), n2.previousX = n2.currentX, n2.previousY = n2.currentY, n2.currentX = u2, n2.currentY = m2;
      const h2 = n2.currentX - n2.startX, f2 = n2.currentY - n2.startY;
      if (s2.params.threshold && Math.sqrt(h2 ** 2 + f2 ** 2) < s2.params.threshold)
        return;
      if (void 0 === i2.isScrolling) {
        let e3;
        s2.isHorizontal() && n2.currentY === n2.startY || s2.isVertical() && n2.currentX === n2.startX ? i2.isScrolling = false : h2 * h2 + f2 * f2 >= 25 && (e3 = 180 * Math.atan2(Math.abs(f2), Math.abs(h2)) / Math.PI, i2.isScrolling = s2.isHorizontal() ? e3 > r2.touchAngle : 90 - e3 > r2.touchAngle);
      }
      if (i2.isScrolling && s2.emit("touchMoveOpposite", p2), void 0 === i2.startMoving && (n2.currentX === n2.startX && n2.currentY === n2.startY || (i2.startMoving = true)), i2.isScrolling || "touchmove" === p2.type && i2.preventTouchMoveFromPointerMove)
        return void (i2.isTouched = false);
      if (!i2.startMoving) return;
      s2.allowClick = false, !r2.cssMode && p2.cancelable && p2.preventDefault(), r2.touchMoveStopPropagation && !r2.nested && p2.stopPropagation();
      let g2 = s2.isHorizontal() ? h2 : f2, v2 = s2.isHorizontal() ? n2.currentX - n2.previousX : n2.currentY - n2.previousY;
      r2.oneWayMovement && (g2 = Math.abs(g2) * (l2 ? 1 : -1), v2 = Math.abs(v2) * (l2 ? 1 : -1)), n2.diff = g2, g2 *= r2.touchRatio, l2 && (g2 = -g2, v2 = -v2);
      const w2 = s2.touchesDirection;
      s2.swipeDirection = g2 > 0 ? "prev" : "next", s2.touchesDirection = v2 > 0 ? "prev" : "next";
      const b2 = s2.params.loop && !r2.cssMode, y2 = "next" === s2.touchesDirection && s2.allowSlideNext || "prev" === s2.touchesDirection && s2.allowSlidePrev;
      if (!i2.isMoved) {
        if (b2 && y2 && s2.loopFix({ direction: s2.swipeDirection }), i2.startTranslate = s2.getTranslate(), s2.setTransition(0), s2.animating) {
          const e3 = new window.CustomEvent("transitionend", {
            bubbles: true,
            cancelable: true,
            detail: { bySwiperTouchMove: true }
          });
          s2.wrapperEl.dispatchEvent(e3);
        }
        i2.allowMomentumBounce = false, !r2.grabCursor || true !== s2.allowSlideNext && true !== s2.allowSlidePrev || s2.setGrabCursor(true), s2.emit("sliderFirstMove", p2);
      }
      if ((/* @__PURE__ */ new Date()).getTime(), i2.isMoved && i2.allowThresholdMove && w2 !== s2.touchesDirection && b2 && y2 && Math.abs(g2) >= 1)
        return Object.assign(n2, {
          startX: u2,
          startY: m2,
          currentX: u2,
          currentY: m2,
          startTranslate: i2.currentTranslate
        }), i2.loopSwapReset = true, void (i2.startTranslate = i2.currentTranslate);
      s2.emit("sliderMove", p2), i2.isMoved = true, i2.currentTranslate = g2 + i2.startTranslate;
      let E2 = true, x2 = r2.resistanceRatio;
      if (r2.touchReleaseOnEdges && (x2 = 0), g2 > 0 ? (b2 && y2 && i2.allowThresholdMove && i2.currentTranslate > (r2.centeredSlides ? s2.minTranslate() - s2.slidesSizesGrid[s2.activeIndex + 1] - ("auto" !== r2.slidesPerView && s2.slides.length - r2.slidesPerView >= 2 ? s2.slidesSizesGrid[s2.activeIndex + 1] + s2.params.spaceBetween : 0) - s2.params.spaceBetween : s2.minTranslate()) && s2.loopFix({
        direction: "prev",
        setTranslate: true,
        activeSlideIndex: 0
      }), i2.currentTranslate > s2.minTranslate() && (E2 = false, r2.resistance && (i2.currentTranslate = s2.minTranslate() - 1 + (-s2.minTranslate() + i2.startTranslate + g2) ** x2))) : g2 < 0 && (b2 && y2 && i2.allowThresholdMove && i2.currentTranslate < (r2.centeredSlides ? s2.maxTranslate() + s2.slidesSizesGrid[s2.slidesSizesGrid.length - 1] + s2.params.spaceBetween + ("auto" !== r2.slidesPerView && s2.slides.length - r2.slidesPerView >= 2 ? s2.slidesSizesGrid[s2.slidesSizesGrid.length - 1] + s2.params.spaceBetween : 0) : s2.maxTranslate()) && s2.loopFix({
        direction: "next",
        setTranslate: true,
        activeSlideIndex: s2.slides.length - ("auto" === r2.slidesPerView ? s2.slidesPerViewDynamic() : Math.ceil(parseFloat(r2.slidesPerView, 10)))
      }), i2.currentTranslate < s2.maxTranslate() && (E2 = false, r2.resistance && (i2.currentTranslate = s2.maxTranslate() + 1 - (s2.maxTranslate() - i2.startTranslate - g2) ** x2))), E2 && (p2.preventedByNestedSwiper = true), !s2.allowSlideNext && "next" === s2.swipeDirection && i2.currentTranslate < i2.startTranslate && (i2.currentTranslate = i2.startTranslate), !s2.allowSlidePrev && "prev" === s2.swipeDirection && i2.currentTranslate > i2.startTranslate && (i2.currentTranslate = i2.startTranslate), s2.allowSlidePrev || s2.allowSlideNext || (i2.currentTranslate = i2.startTranslate), r2.threshold > 0) {
        if (!(Math.abs(g2) > r2.threshold || i2.allowThresholdMove))
          return void (i2.currentTranslate = i2.startTranslate);
        if (!i2.allowThresholdMove)
          return i2.allowThresholdMove = true, n2.startX = n2.currentX, n2.startY = n2.currentY, i2.currentTranslate = i2.startTranslate, void (n2.diff = s2.isHorizontal() ? n2.currentX - n2.startX : n2.currentY - n2.startY);
      }
      r2.followFinger && !r2.cssMode && ((r2.freeMode && r2.freeMode.enabled && s2.freeMode || r2.watchSlidesProgress) && (s2.updateActiveIndex(), s2.updateSlidesClasses()), r2.freeMode && r2.freeMode.enabled && s2.freeMode && s2.freeMode.onTouchMove(), s2.updateProgress(i2.currentTranslate), s2.setTranslate(i2.currentTranslate));
    }
    function _(e2) {
      const t2 = this, s2 = t2.touchEventsData;
      let a2, i2 = e2;
      i2.originalEvent && (i2 = i2.originalEvent);
      if ("touchend" === i2.type || "touchcancel" === i2.type) {
        if (a2 = [...i2.changedTouches].filter(
          (e3) => e3.identifier === s2.touchId
        )[0], !a2 || a2.identifier !== s2.touchId)
          return;
      } else {
        if (null !== s2.touchId) return;
        if (i2.pointerId !== s2.pointerId) return;
        a2 = i2;
      }
      if (["pointercancel", "pointerout", "pointerleave", "contextmenu"].includes(
        i2.type
      )) {
        if (!(["pointercancel", "contextmenu"].includes(i2.type) && (t2.browser.isSafari || t2.browser.isWebView)))
          return;
      }
      s2.pointerId = null, s2.touchId = null;
      const {
        params: r2,
        touches: n2,
        rtlTranslate: d2,
        slidesGrid: c2,
        enabled: p2
      } = t2;
      if (!p2) return;
      if (!r2.simulateTouch && "mouse" === i2.pointerType) return;
      if (s2.allowTouchCallbacks && t2.emit("touchEnd", i2), s2.allowTouchCallbacks = false, !s2.isTouched)
        return s2.isMoved && r2.grabCursor && t2.setGrabCursor(false), s2.isMoved = false, void (s2.startMoving = false);
      r2.grabCursor && s2.isMoved && s2.isTouched && (true === t2.allowSlideNext || true === t2.allowSlidePrev) && t2.setGrabCursor(false);
      const u2 = o(), m2 = u2 - s2.touchStartTime;
      if (t2.allowClick) {
        const e3 = i2.path || i2.composedPath && i2.composedPath();
        t2.updateClickedSlide(e3 && e3[0] || i2.target, e3), t2.emit("tap click", i2), m2 < 300 && u2 - s2.lastClickTime < 300 && t2.emit("doubleTap doubleClick", i2);
      }
      if (s2.lastClickTime = o(), l(() => {
        t2.destroyed || (t2.allowClick = true);
      }), !s2.isTouched || !s2.isMoved || !t2.swipeDirection || 0 === n2.diff && !s2.loopSwapReset || s2.currentTranslate === s2.startTranslate && !s2.loopSwapReset)
        return s2.isTouched = false, s2.isMoved = false, void (s2.startMoving = false);
      let h2;
      if (s2.isTouched = false, s2.isMoved = false, s2.startMoving = false, h2 = r2.followFinger ? d2 ? t2.translate : -t2.translate : -s2.currentTranslate, r2.cssMode)
        return;
      if (r2.freeMode && r2.freeMode.enabled)
        return void t2.freeMode.onTouchEnd({ currentPos: h2 });
      const f2 = h2 >= -t2.maxTranslate() && !t2.params.loop;
      let g2 = 0, v2 = t2.slidesSizesGrid[0];
      for (let e3 = 0; e3 < c2.length; e3 += e3 < r2.slidesPerGroupSkip ? 1 : r2.slidesPerGroup) {
        const t3 = e3 < r2.slidesPerGroupSkip - 1 ? 1 : r2.slidesPerGroup;
        void 0 !== c2[e3 + t3] ? (f2 || h2 >= c2[e3] && h2 < c2[e3 + t3]) && (g2 = e3, v2 = c2[e3 + t3] - c2[e3]) : (f2 || h2 >= c2[e3]) && (g2 = e3, v2 = c2[c2.length - 1] - c2[c2.length - 2]);
      }
      let w2 = null, b2 = null;
      r2.rewind && (t2.isBeginning ? b2 = r2.virtual && r2.virtual.enabled && t2.virtual ? t2.virtual.slides.length - 1 : t2.slides.length - 1 : t2.isEnd && (w2 = 0));
      const y2 = (h2 - c2[g2]) / v2, E2 = g2 < r2.slidesPerGroupSkip - 1 ? 1 : r2.slidesPerGroup;
      if (m2 > r2.longSwipesMs) {
        if (!r2.longSwipes) return void t2.slideTo(t2.activeIndex);
        "next" === t2.swipeDirection && (y2 >= r2.longSwipesRatio ? t2.slideTo(r2.rewind && t2.isEnd ? w2 : g2 + E2) : t2.slideTo(g2)), "prev" === t2.swipeDirection && (y2 > 1 - r2.longSwipesRatio ? t2.slideTo(g2 + E2) : null !== b2 && y2 < 0 && Math.abs(y2) > r2.longSwipesRatio ? t2.slideTo(b2) : t2.slideTo(g2));
      } else {
        if (!r2.shortSwipes) return void t2.slideTo(t2.activeIndex);
        t2.navigation && (i2.target === t2.navigation.nextEl || i2.target === t2.navigation.prevEl) ? i2.target === t2.navigation.nextEl ? t2.slideTo(g2 + E2) : t2.slideTo(g2) : ("next" === t2.swipeDirection && t2.slideTo(null !== w2 ? w2 : g2 + E2), "prev" === t2.swipeDirection && t2.slideTo(null !== b2 ? b2 : g2));
      }
    }
    function W() {
      const e2 = this, { params: t2, el: s2 } = e2;
      if (s2 && 0 === s2.offsetWidth) return;
      t2.breakpoints && e2.setBreakpoint();
      const { allowSlideNext: a2, allowSlidePrev: i2, snapGrid: r2 } = e2, n2 = e2.virtual && e2.params.virtual.enabled;
      e2.allowSlideNext = true, e2.allowSlidePrev = true, e2.updateSize(), e2.updateSlides(), e2.updateSlidesClasses();
      const l2 = n2 && t2.loop;
      !("auto" === t2.slidesPerView || t2.slidesPerView > 1) || !e2.isEnd || e2.isBeginning || e2.params.centeredSlides || l2 ? e2.params.loop && !n2 ? e2.slideToLoop(e2.realIndex, 0, false, true) : e2.slideTo(e2.activeIndex, 0, false, true) : e2.slideTo(e2.slides.length - 1, 0, false, true), e2.autoplay && e2.autoplay.running && e2.autoplay.paused && (clearTimeout(e2.autoplay.resizeTimeout), e2.autoplay.resizeTimeout = setTimeout(() => {
        e2.autoplay && e2.autoplay.running && e2.autoplay.paused && e2.autoplay.resume();
      }, 500)), e2.allowSlidePrev = i2, e2.allowSlideNext = a2, e2.params.watchOverflow && r2 !== e2.snapGrid && e2.checkOverflow();
    }
    function j(e2) {
      const t2 = this;
      t2.enabled && (t2.allowClick || (t2.params.preventClicks && e2.preventDefault(), t2.params.preventClicksPropagation && t2.animating && (e2.stopPropagation(), e2.stopImmediatePropagation())));
    }
    function U() {
      const e2 = this, { wrapperEl: t2, rtlTranslate: s2, enabled: a2 } = e2;
      if (!a2) return;
      let i2;
      e2.previousTranslate = e2.translate, e2.isHorizontal() ? e2.translate = -t2.scrollLeft : e2.translate = -t2.scrollTop, 0 === e2.translate && (e2.translate = 0), e2.updateActiveIndex(), e2.updateSlidesClasses();
      const r2 = e2.maxTranslate() - e2.minTranslate();
      i2 = 0 === r2 ? 0 : (e2.translate - e2.minTranslate()) / r2, i2 !== e2.progress && e2.updateProgress(s2 ? -e2.translate : e2.translate), e2.emit("setTranslate", e2.translate, false);
    }
    function K(e2) {
      const t2 = this;
      D(t2, e2.target), t2.params.cssMode || "auto" !== t2.params.slidesPerView && !t2.params.autoHeight || t2.update();
    }
    function Z() {
      const e2 = this;
      e2.documentTouchHandlerProceeded || (e2.documentTouchHandlerProceeded = true, e2.params.touchReleaseOnEdges && (e2.el.style.touchAction = "auto"));
    }
    const Q = (e2, t2) => {
      const s2 = a(), { params: i2, el: r2, wrapperEl: n2, device: l2 } = e2, o2 = !!i2.nested, d2 = "on" === t2 ? "addEventListener" : "removeEventListener", c2 = t2;
      r2 && "string" != typeof r2 && (s2[d2]("touchstart", e2.onDocumentTouchStart, { passive: false, capture: o2 }), r2[d2]("touchstart", e2.onTouchStart, { passive: false }), r2[d2]("pointerdown", e2.onTouchStart, { passive: false }), s2[d2]("touchmove", e2.onTouchMove, { passive: false, capture: o2 }), s2[d2]("pointermove", e2.onTouchMove, { passive: false, capture: o2 }), s2[d2]("touchend", e2.onTouchEnd, { passive: true }), s2[d2]("pointerup", e2.onTouchEnd, { passive: true }), s2[d2]("pointercancel", e2.onTouchEnd, { passive: true }), s2[d2]("touchcancel", e2.onTouchEnd, { passive: true }), s2[d2]("pointerout", e2.onTouchEnd, { passive: true }), s2[d2]("pointerleave", e2.onTouchEnd, { passive: true }), s2[d2]("contextmenu", e2.onTouchEnd, { passive: true }), (i2.preventClicks || i2.preventClicksPropagation) && r2[d2]("click", e2.onClick, true), i2.cssMode && n2[d2]("scroll", e2.onScroll), i2.updateOnWindowResize ? e2[c2](
        l2.ios || l2.android ? "resize orientationchange observerUpdate" : "resize observerUpdate",
        W,
        true
      ) : e2[c2]("observerUpdate", W, true), r2[d2]("load", e2.onLoad, { capture: true }));
    };
    const J = (e2, t2) => e2.grid && t2.grid && t2.grid.rows > 1;
    var ee = {
      init: true,
      direction: "horizontal",
      oneWayMovement: false,
      swiperElementNodeName: "SWIPER-CONTAINER",
      touchEventsTarget: "wrapper",
      initialSlide: 0,
      speed: 300,
      cssMode: false,
      updateOnWindowResize: true,
      resizeObserver: true,
      nested: false,
      createElements: false,
      eventsPrefix: "swiper",
      enabled: true,
      focusableElements: "input, select, option, textarea, button, video, label",
      width: null,
      height: null,
      preventInteractionOnTransition: false,
      userAgent: null,
      url: null,
      edgeSwipeDetection: false,
      edgeSwipeThreshold: 20,
      autoHeight: false,
      setWrapperSize: false,
      virtualTranslate: false,
      effect: "slide",
      breakpoints: void 0,
      breakpointsBase: "window",
      spaceBetween: 0,
      slidesPerView: 1,
      slidesPerGroup: 1,
      slidesPerGroupSkip: 0,
      slidesPerGroupAuto: false,
      centeredSlides: false,
      centeredSlidesBounds: false,
      slidesOffsetBefore: 0,
      slidesOffsetAfter: 0,
      normalizeSlideIndex: true,
      centerInsufficientSlides: false,
      watchOverflow: true,
      roundLengths: false,
      touchRatio: 1,
      touchAngle: 45,
      simulateTouch: true,
      shortSwipes: true,
      longSwipes: true,
      longSwipesRatio: 0.5,
      longSwipesMs: 300,
      followFinger: true,
      allowTouchMove: true,
      threshold: 5,
      touchMoveStopPropagation: false,
      touchStartPreventDefault: true,
      touchStartForcePreventDefault: false,
      touchReleaseOnEdges: false,
      uniqueNavElements: true,
      resistance: true,
      resistanceRatio: 0.85,
      watchSlidesProgress: false,
      grabCursor: false,
      preventClicks: true,
      preventClicksPropagation: true,
      slideToClickedSlide: false,
      loop: false,
      loopAddBlankSlides: true,
      loopAdditionalSlides: 0,
      loopPreventsSliding: true,
      rewind: false,
      allowSlidePrev: true,
      allowSlideNext: true,
      swipeHandler: null,
      noSwiping: true,
      noSwipingClass: "swiper-no-swiping",
      noSwipingSelector: null,
      passiveListeners: true,
      maxBackfaceHiddenSlides: 10,
      containerModifierClass: "swiper-",
      slideClass: "swiper-slide",
      slideBlankClass: "swiper-slide-blank",
      slideActiveClass: "swiper-slide-active",
      slideVisibleClass: "swiper-slide-visible",
      slideFullyVisibleClass: "swiper-slide-fully-visible",
      slideNextClass: "swiper-slide-next",
      slidePrevClass: "swiper-slide-prev",
      wrapperClass: "swiper-wrapper",
      lazyPreloaderClass: "swiper-lazy-preloader",
      lazyPreloadPrevNext: 0,
      runCallbacksOnInit: true,
      _emitClasses: false
    };
    function te(e2, t2) {
      return function(s2) {
        void 0 === s2 && (s2 = {});
        const a2 = Object.keys(s2)[0], i2 = s2[a2];
        "object" == typeof i2 && null !== i2 ? (true === e2[a2] && (e2[a2] = { enabled: true }), "navigation" === a2 && e2[a2] && e2[a2].enabled && !e2[a2].prevEl && !e2[a2].nextEl && (e2[a2].auto = true), ["pagination", "scrollbar"].indexOf(a2) >= 0 && e2[a2] && e2[a2].enabled && !e2[a2].el && (e2[a2].auto = true), a2 in e2 && "enabled" in i2 ? ("object" != typeof e2[a2] || "enabled" in e2[a2] || (e2[a2].enabled = true), e2[a2] || (e2[a2] = { enabled: false }), p(t2, s2)) : p(t2, s2)) : p(t2, s2);
      };
    }
    const se = {
      eventsEmitter: $,
      update: B,
      translate: N,
      transition: {
        setTransition: function(e2, t2) {
          const s2 = this;
          s2.params.cssMode || (s2.wrapperEl.style.transitionDuration = `${e2}ms`, s2.wrapperEl.style.transitionDelay = 0 === e2 ? "0ms" : ""), s2.emit("setTransition", e2, t2);
        },
        transitionStart: function(e2, t2) {
          void 0 === e2 && (e2 = true);
          const s2 = this, { params: a2 } = s2;
          a2.cssMode || (a2.autoHeight && s2.updateAutoHeight(), X({ swiper: s2, runCallbacks: e2, direction: t2, step: "Start" }));
        },
        transitionEnd: function(e2, t2) {
          void 0 === e2 && (e2 = true);
          const s2 = this, { params: a2 } = s2;
          s2.animating = false, a2.cssMode || (s2.setTransition(0), X({ swiper: s2, runCallbacks: e2, direction: t2, step: "End" }));
        }
      },
      slide: Y,
      loop: R,
      grabCursor: {
        setGrabCursor: function(e2) {
          const t2 = this;
          if (!t2.params.simulateTouch || t2.params.watchOverflow && t2.isLocked || t2.params.cssMode)
            return;
          const s2 = "container" === t2.params.touchEventsTarget ? t2.el : t2.wrapperEl;
          t2.isElement && (t2.__preventObserver__ = true), s2.style.cursor = "move", s2.style.cursor = e2 ? "grabbing" : "grab", t2.isElement && requestAnimationFrame(() => {
            t2.__preventObserver__ = false;
          });
        },
        unsetGrabCursor: function() {
          const e2 = this;
          e2.params.watchOverflow && e2.isLocked || e2.params.cssMode || (e2.isElement && (e2.__preventObserver__ = true), e2["container" === e2.params.touchEventsTarget ? "el" : "wrapperEl"].style.cursor = "", e2.isElement && requestAnimationFrame(() => {
            e2.__preventObserver__ = false;
          }));
        }
      },
      events: {
        attachEvents: function() {
          const e2 = this, { params: t2 } = e2;
          e2.onTouchStart = F.bind(e2), e2.onTouchMove = V.bind(e2), e2.onTouchEnd = _.bind(e2), e2.onDocumentTouchStart = Z.bind(e2), t2.cssMode && (e2.onScroll = U.bind(e2)), e2.onClick = j.bind(e2), e2.onLoad = K.bind(e2), Q(e2, "on");
        },
        detachEvents: function() {
          Q(this, "off");
        }
      },
      breakpoints: {
        setBreakpoint: function() {
          const e2 = this, { realIndex: t2, initialized: s2, params: a2, el: i2 } = e2, r2 = a2.breakpoints;
          if (!r2 || r2 && 0 === Object.keys(r2).length) return;
          const n2 = e2.getBreakpoint(r2, e2.params.breakpointsBase, e2.el);
          if (!n2 || e2.currentBreakpoint === n2) return;
          const l2 = (n2 in r2 ? r2[n2] : void 0) || e2.originalParams, o2 = J(e2, a2), d2 = J(e2, l2), c2 = e2.params.grabCursor, u2 = l2.grabCursor, m2 = a2.enabled;
          o2 && !d2 ? (i2.classList.remove(
            `${a2.containerModifierClass}grid`,
            `${a2.containerModifierClass}grid-column`
          ), e2.emitContainerClasses()) : !o2 && d2 && (i2.classList.add(`${a2.containerModifierClass}grid`), (l2.grid.fill && "column" === l2.grid.fill || !l2.grid.fill && "column" === a2.grid.fill) && i2.classList.add(`${a2.containerModifierClass}grid-column`), e2.emitContainerClasses()), c2 && !u2 ? e2.unsetGrabCursor() : !c2 && u2 && e2.setGrabCursor(), ["navigation", "pagination", "scrollbar"].forEach((t3) => {
            if (void 0 === l2[t3]) return;
            const s3 = a2[t3] && a2[t3].enabled, i3 = l2[t3] && l2[t3].enabled;
            s3 && !i3 && e2[t3].disable(), !s3 && i3 && e2[t3].enable();
          });
          const h2 = l2.direction && l2.direction !== a2.direction, f2 = a2.loop && (l2.slidesPerView !== a2.slidesPerView || h2), g2 = a2.loop;
          h2 && s2 && e2.changeDirection(), p(e2.params, l2);
          const v2 = e2.params.enabled, w2 = e2.params.loop;
          Object.assign(e2, {
            allowTouchMove: e2.params.allowTouchMove,
            allowSlideNext: e2.params.allowSlideNext,
            allowSlidePrev: e2.params.allowSlidePrev
          }), m2 && !v2 ? e2.disable() : !m2 && v2 && e2.enable(), e2.currentBreakpoint = n2, e2.emit("_beforeBreakpoint", l2), s2 && (f2 ? (e2.loopDestroy(), e2.loopCreate(t2), e2.updateSlides()) : !g2 && w2 ? (e2.loopCreate(t2), e2.updateSlides()) : g2 && !w2 && e2.loopDestroy()), e2.emit("breakpoint", l2);
        },
        getBreakpoint: function(e2, t2, s2) {
          if (void 0 === t2 && (t2 = "window"), !e2 || "container" === t2 && !s2)
            return;
          let a2 = false;
          const i2 = r(), n2 = "window" === t2 ? i2.innerHeight : s2.clientHeight, l2 = Object.keys(e2).map((e3) => {
            if ("string" == typeof e3 && 0 === e3.indexOf("@")) {
              const t3 = parseFloat(e3.substr(1));
              return { value: n2 * t3, point: e3 };
            }
            return { value: e3, point: e3 };
          });
          l2.sort((e3, t3) => parseInt(e3.value, 10) - parseInt(t3.value, 10));
          for (let e3 = 0; e3 < l2.length; e3 += 1) {
            const { point: r2, value: n3 } = l2[e3];
            "window" === t2 ? i2.matchMedia(`(min-width: ${n3}px)`).matches && (a2 = r2) : n3 <= s2.clientWidth && (a2 = r2);
          }
          return a2 || "max";
        }
      },
      checkOverflow: {
        checkOverflow: function() {
          const e2 = this, { isLocked: t2, params: s2 } = e2, { slidesOffsetBefore: a2 } = s2;
          if (a2) {
            const t3 = e2.slides.length - 1, s3 = e2.slidesGrid[t3] + e2.slidesSizesGrid[t3] + 2 * a2;
            e2.isLocked = e2.size > s3;
          } else e2.isLocked = 1 === e2.snapGrid.length;
          true === s2.allowSlideNext && (e2.allowSlideNext = !e2.isLocked), true === s2.allowSlidePrev && (e2.allowSlidePrev = !e2.isLocked), t2 && t2 !== e2.isLocked && (e2.isEnd = false), t2 !== e2.isLocked && e2.emit(e2.isLocked ? "lock" : "unlock");
        }
      },
      classes: {
        addClasses: function() {
          const e2 = this, { classNames: t2, params: s2, rtl: a2, el: i2, device: r2 } = e2, n2 = function(e3, t3) {
            const s3 = [];
            return e3.forEach((e4) => {
              "object" == typeof e4 ? Object.keys(e4).forEach((a3) => {
                e4[a3] && s3.push(t3 + a3);
              }) : "string" == typeof e4 && s3.push(t3 + e4);
            }), s3;
          }(
            [
              "initialized",
              s2.direction,
              { "free-mode": e2.params.freeMode && s2.freeMode.enabled },
              { autoheight: s2.autoHeight },
              { rtl: a2 },
              { grid: s2.grid && s2.grid.rows > 1 },
              {
                "grid-column": s2.grid && s2.grid.rows > 1 && "column" === s2.grid.fill
              },
              { android: r2.android },
              { ios: r2.ios },
              { "css-mode": s2.cssMode },
              { centered: s2.cssMode && s2.centeredSlides },
              { "watch-progress": s2.watchSlidesProgress }
            ],
            s2.containerModifierClass
          );
          t2.push(...n2), i2.classList.add(...t2), e2.emitContainerClasses();
        },
        removeClasses: function() {
          const { el: e2, classNames: t2 } = this;
          e2 && "string" != typeof e2 && (e2.classList.remove(...t2), this.emitContainerClasses());
        }
      }
    }, ae = {};
    class ie {
      constructor() {
        let e2, t2;
        for (var s2 = arguments.length, i2 = new Array(s2), r2 = 0; r2 < s2; r2++)
          i2[r2] = arguments[r2];
        1 === i2.length && i2[0].constructor && "Object" === Object.prototype.toString.call(i2[0]).slice(8, -1) ? t2 = i2[0] : [e2, t2] = i2, t2 || (t2 = {}), t2 = p({}, t2), e2 && !t2.el && (t2.el = e2);
        const n2 = a();
        if (t2.el && "string" == typeof t2.el && n2.querySelectorAll(t2.el).length > 1) {
          const e3 = [];
          return n2.querySelectorAll(t2.el).forEach((s3) => {
            const a2 = p({}, t2, { el: s3 });
            e3.push(new ie(a2));
          }), e3;
        }
        const l2 = this;
        l2.__swiper__ = true, l2.support = I(), l2.device = z({ userAgent: t2.userAgent }), l2.browser = A(), l2.eventsListeners = {}, l2.eventsAnyListeners = [], l2.modules = [...l2.__modules__], t2.modules && Array.isArray(t2.modules) && l2.modules.push(...t2.modules);
        const o2 = {};
        l2.modules.forEach((e3) => {
          e3({
            params: t2,
            swiper: l2,
            extendParams: te(t2, o2),
            on: l2.on.bind(l2),
            once: l2.once.bind(l2),
            off: l2.off.bind(l2),
            emit: l2.emit.bind(l2)
          });
        });
        const d2 = p({}, ee, o2);
        return l2.params = p({}, d2, ae, t2), l2.originalParams = p({}, l2.params), l2.passedParams = p({}, t2), l2.params && l2.params.on && Object.keys(l2.params.on).forEach((e3) => {
          l2.on(e3, l2.params.on[e3]);
        }), l2.params && l2.params.onAny && l2.onAny(l2.params.onAny), Object.assign(l2, {
          enabled: l2.params.enabled,
          el: e2,
          classNames: [],
          slides: [],
          slidesGrid: [],
          snapGrid: [],
          slidesSizesGrid: [],
          isHorizontal: () => "horizontal" === l2.params.direction,
          isVertical: () => "vertical" === l2.params.direction,
          activeIndex: 0,
          realIndex: 0,
          isBeginning: true,
          isEnd: false,
          translate: 0,
          previousTranslate: 0,
          progress: 0,
          velocity: 0,
          animating: false,
          cssOverflowAdjustment() {
            return Math.trunc(this.translate / 2 ** 23) * 2 ** 23;
          },
          allowSlideNext: l2.params.allowSlideNext,
          allowSlidePrev: l2.params.allowSlidePrev,
          touchEventsData: {
            isTouched: void 0,
            isMoved: void 0,
            allowTouchCallbacks: void 0,
            touchStartTime: void 0,
            isScrolling: void 0,
            currentTranslate: void 0,
            startTranslate: void 0,
            allowThresholdMove: void 0,
            focusableElements: l2.params.focusableElements,
            lastClickTime: 0,
            clickTimeout: void 0,
            velocities: [],
            allowMomentumBounce: void 0,
            startMoving: void 0,
            pointerId: null,
            touchId: null
          },
          allowClick: true,
          allowTouchMove: l2.params.allowTouchMove,
          touches: { startX: 0, startY: 0, currentX: 0, currentY: 0, diff: 0 },
          imagesToLoad: [],
          imagesLoaded: 0
        }), l2.emit("_swiper"), l2.params.init && l2.init(), l2;
      }
      getDirectionLabel(e2) {
        return this.isHorizontal() ? e2 : {
          width: "height",
          "margin-top": "margin-left",
          "margin-bottom ": "margin-right",
          "margin-left": "margin-top",
          "margin-right": "margin-bottom",
          "padding-left": "padding-top",
          "padding-right": "padding-bottom",
          marginRight: "marginBottom"
        }[e2];
      }
      getSlideIndex(e2) {
        const { slidesEl: t2, params: s2 } = this, a2 = y(f(t2, `.${s2.slideClass}, swiper-slide`)[0]);
        return y(e2) - a2;
      }
      getSlideIndexByData(e2) {
        return this.getSlideIndex(
          this.slides.filter(
            (t2) => 1 * t2.getAttribute("data-swiper-slide-index") === e2
          )[0]
        );
      }
      recalcSlides() {
        const { slidesEl: e2, params: t2 } = this;
        this.slides = f(e2, `.${t2.slideClass}, swiper-slide`);
      }
      enable() {
        const e2 = this;
        e2.enabled || (e2.enabled = true, e2.params.grabCursor && e2.setGrabCursor(), e2.emit("enable"));
      }
      disable() {
        const e2 = this;
        e2.enabled && (e2.enabled = false, e2.params.grabCursor && e2.unsetGrabCursor(), e2.emit("disable"));
      }
      setProgress(e2, t2) {
        const s2 = this;
        e2 = Math.min(Math.max(e2, 0), 1);
        const a2 = s2.minTranslate(), i2 = (s2.maxTranslate() - a2) * e2 + a2;
        s2.translateTo(i2, void 0 === t2 ? 0 : t2), s2.updateActiveIndex(), s2.updateSlidesClasses();
      }
      emitContainerClasses() {
        const e2 = this;
        if (!e2.params._emitClasses || !e2.el) return;
        const t2 = e2.el.className.split(" ").filter(
          (t3) => 0 === t3.indexOf("swiper") || 0 === t3.indexOf(e2.params.containerModifierClass)
        );
        e2.emit("_containerClasses", t2.join(" "));
      }
      getSlideClasses(e2) {
        const t2 = this;
        return t2.destroyed ? "" : e2.className.split(" ").filter(
          (e3) => 0 === e3.indexOf("swiper-slide") || 0 === e3.indexOf(t2.params.slideClass)
        ).join(" ");
      }
      emitSlidesClasses() {
        const e2 = this;
        if (!e2.params._emitClasses || !e2.el) return;
        const t2 = [];
        e2.slides.forEach((s2) => {
          const a2 = e2.getSlideClasses(s2);
          t2.push({ slideEl: s2, classNames: a2 }), e2.emit("_slideClass", s2, a2);
        }), e2.emit("_slideClasses", t2);
      }
      slidesPerViewDynamic(e2, t2) {
        void 0 === e2 && (e2 = "current"), void 0 === t2 && (t2 = false);
        const {
          params: s2,
          slides: a2,
          slidesGrid: i2,
          slidesSizesGrid: r2,
          size: n2,
          activeIndex: l2
        } = this;
        let o2 = 1;
        if ("number" == typeof s2.slidesPerView) return s2.slidesPerView;
        if (s2.centeredSlides) {
          let e3, t3 = a2[l2] ? Math.ceil(a2[l2].swiperSlideSize) : 0;
          for (let s3 = l2 + 1; s3 < a2.length; s3 += 1)
            a2[s3] && !e3 && (t3 += Math.ceil(a2[s3].swiperSlideSize), o2 += 1, t3 > n2 && (e3 = true));
          for (let s3 = l2 - 1; s3 >= 0; s3 -= 1)
            a2[s3] && !e3 && (t3 += a2[s3].swiperSlideSize, o2 += 1, t3 > n2 && (e3 = true));
        } else if ("current" === e2)
          for (let e3 = l2 + 1; e3 < a2.length; e3 += 1) {
            (t2 ? i2[e3] + r2[e3] - i2[l2] < n2 : i2[e3] - i2[l2] < n2) && (o2 += 1);
          }
        else
          for (let e3 = l2 - 1; e3 >= 0; e3 -= 1) {
            i2[l2] - i2[e3] < n2 && (o2 += 1);
          }
        return o2;
      }
      update() {
        const e2 = this;
        if (!e2 || e2.destroyed) return;
        const { snapGrid: t2, params: s2 } = e2;
        function a2() {
          const t3 = e2.rtlTranslate ? -1 * e2.translate : e2.translate, s3 = Math.min(Math.max(t3, e2.maxTranslate()), e2.minTranslate());
          e2.setTranslate(s3), e2.updateActiveIndex(), e2.updateSlidesClasses();
        }
        let i2;
        if (s2.breakpoints && e2.setBreakpoint(), [...e2.el.querySelectorAll('[loading="lazy"]')].forEach((t3) => {
          t3.complete && D(e2, t3);
        }), e2.updateSize(), e2.updateSlides(), e2.updateProgress(), e2.updateSlidesClasses(), s2.freeMode && s2.freeMode.enabled && !s2.cssMode)
          a2(), s2.autoHeight && e2.updateAutoHeight();
        else {
          if (("auto" === s2.slidesPerView || s2.slidesPerView > 1) && e2.isEnd && !s2.centeredSlides) {
            const t3 = e2.virtual && s2.virtual.enabled ? e2.virtual.slides : e2.slides;
            i2 = e2.slideTo(t3.length - 1, 0, false, true);
          } else i2 = e2.slideTo(e2.activeIndex, 0, false, true);
          i2 || a2();
        }
        s2.watchOverflow && t2 !== e2.snapGrid && e2.checkOverflow(), e2.emit("update");
      }
      changeDirection(e2, t2) {
        void 0 === t2 && (t2 = true);
        const s2 = this, a2 = s2.params.direction;
        return e2 || (e2 = "horizontal" === a2 ? "vertical" : "horizontal"), e2 === a2 || "horizontal" !== e2 && "vertical" !== e2 || (s2.el.classList.remove(`${s2.params.containerModifierClass}${a2}`), s2.el.classList.add(`${s2.params.containerModifierClass}${e2}`), s2.emitContainerClasses(), s2.params.direction = e2, s2.slides.forEach((t3) => {
          "vertical" === e2 ? t3.style.width = "" : t3.style.height = "";
        }), s2.emit("changeDirection"), t2 && s2.update()), s2;
      }
      changeLanguageDirection(e2) {
        const t2 = this;
        t2.rtl && "rtl" === e2 || !t2.rtl && "ltr" === e2 || (t2.rtl = "rtl" === e2, t2.rtlTranslate = "horizontal" === t2.params.direction && t2.rtl, t2.rtl ? (t2.el.classList.add(`${t2.params.containerModifierClass}rtl`), t2.el.dir = "rtl") : (t2.el.classList.remove(`${t2.params.containerModifierClass}rtl`), t2.el.dir = "ltr"), t2.update());
      }
      mount(e2) {
        const t2 = this;
        if (t2.mounted) return true;
        let s2 = e2 || t2.params.el;
        if ("string" == typeof s2 && (s2 = document.querySelector(s2)), !s2)
          return false;
        s2.swiper = t2, s2.parentNode && s2.parentNode.host && s2.parentNode.host.nodeName === t2.params.swiperElementNodeName.toUpperCase() && (t2.isElement = true);
        const a2 = () => `.${(t2.params.wrapperClass || "").trim().split(" ").join(".")}`;
        let i2 = (() => {
          if (s2 && s2.shadowRoot && s2.shadowRoot.querySelector) {
            return s2.shadowRoot.querySelector(a2());
          }
          return f(s2, a2())[0];
        })();
        return !i2 && t2.params.createElements && (i2 = v("div", t2.params.wrapperClass), s2.append(i2), f(s2, `.${t2.params.slideClass}`).forEach((e3) => {
          i2.append(e3);
        })), Object.assign(t2, {
          el: s2,
          wrapperEl: i2,
          slidesEl: t2.isElement && !s2.parentNode.host.slideSlots ? s2.parentNode.host : i2,
          hostEl: t2.isElement ? s2.parentNode.host : s2,
          mounted: true,
          rtl: "rtl" === s2.dir.toLowerCase() || "rtl" === b(s2, "direction"),
          rtlTranslate: "horizontal" === t2.params.direction && ("rtl" === s2.dir.toLowerCase() || "rtl" === b(s2, "direction")),
          wrongRTL: "-webkit-box" === b(i2, "display")
        }), true;
      }
      init(e2) {
        const t2 = this;
        if (t2.initialized) return t2;
        if (false === t2.mount(e2)) return t2;
        t2.emit("beforeInit"), t2.params.breakpoints && t2.setBreakpoint(), t2.addClasses(), t2.updateSize(), t2.updateSlides(), t2.params.watchOverflow && t2.checkOverflow(), t2.params.grabCursor && t2.enabled && t2.setGrabCursor(), t2.params.loop && t2.virtual && t2.params.virtual.enabled ? t2.slideTo(
          t2.params.initialSlide + t2.virtual.slidesBefore,
          0,
          t2.params.runCallbacksOnInit,
          false,
          true
        ) : t2.slideTo(
          t2.params.initialSlide,
          0,
          t2.params.runCallbacksOnInit,
          false,
          true
        ), t2.params.loop && t2.loopCreate(), t2.attachEvents();
        const s2 = [...t2.el.querySelectorAll('[loading="lazy"]')];
        return t2.isElement && s2.push(...t2.hostEl.querySelectorAll('[loading="lazy"]')), s2.forEach((e3) => {
          e3.complete ? D(t2, e3) : e3.addEventListener("load", (e4) => {
            D(t2, e4.target);
          });
        }), H(t2), t2.initialized = true, H(t2), t2.emit("init"), t2.emit("afterInit"), t2;
      }
      destroy(e2, t2) {
        void 0 === e2 && (e2 = true), void 0 === t2 && (t2 = true);
        const s2 = this, { params: a2, el: i2, wrapperEl: r2, slides: n2 } = s2;
        return void 0 === s2.params || s2.destroyed || (s2.emit("beforeDestroy"), s2.initialized = false, s2.detachEvents(), a2.loop && s2.loopDestroy(), t2 && (s2.removeClasses(), i2 && "string" != typeof i2 && i2.removeAttribute("style"), r2 && r2.removeAttribute("style"), n2 && n2.length && n2.forEach((e3) => {
          e3.classList.remove(
            a2.slideVisibleClass,
            a2.slideFullyVisibleClass,
            a2.slideActiveClass,
            a2.slideNextClass,
            a2.slidePrevClass
          ), e3.removeAttribute("style"), e3.removeAttribute("data-swiper-slide-index");
        })), s2.emit("destroy"), Object.keys(s2.eventsListeners).forEach((e3) => {
          s2.off(e3);
        }), false !== e2 && (s2.el && "string" != typeof s2.el && (s2.el.swiper = null), function(e3) {
          const t3 = e3;
          Object.keys(t3).forEach((e4) => {
            try {
              t3[e4] = null;
            } catch (e5) {
            }
            try {
              delete t3[e4];
            } catch (e5) {
            }
          });
        }(s2)), s2.destroyed = true), null;
      }
      static extendDefaults(e2) {
        p(ae, e2);
      }
      static get extendedDefaults() {
        return ae;
      }
      static get defaults() {
        return ee;
      }
      static installModule(e2) {
        ie.prototype.__modules__ || (ie.prototype.__modules__ = []);
        const t2 = ie.prototype.__modules__;
        "function" == typeof e2 && t2.indexOf(e2) < 0 && t2.push(e2);
      }
      static use(e2) {
        return Array.isArray(e2) ? (e2.forEach((e3) => ie.installModule(e3)), ie) : (ie.installModule(e2), ie);
      }
    }
    function re(e2, t2, s2, a2) {
      return e2.params.createElements && Object.keys(a2).forEach((i2) => {
        if (!s2[i2] && true === s2.auto) {
          let r2 = f(e2.el, `.${a2[i2]}`)[0];
          r2 || (r2 = v("div", a2[i2]), r2.className = a2[i2], e2.el.append(r2)), s2[i2] = r2, t2[i2] = r2;
        }
      }), s2;
    }
    function ne(e2) {
      return void 0 === e2 && (e2 = ""), `.${e2.trim().replace(/([\.:!+\/])/g, "\\$1").replace(/ /g, ".")}`;
    }
    function le(e2) {
      const t2 = this, { params: s2, slidesEl: a2 } = t2;
      s2.loop && t2.loopDestroy();
      const i2 = (e3) => {
        if ("string" == typeof e3) {
          const t3 = document.createElement("div");
          t3.innerHTML = e3, a2.append(t3.children[0]), t3.innerHTML = "";
        } else a2.append(e3);
      };
      if ("object" == typeof e2 && "length" in e2)
        for (let t3 = 0; t3 < e2.length; t3 += 1) e2[t3] && i2(e2[t3]);
      else i2(e2);
      t2.recalcSlides(), s2.loop && t2.loopCreate(), s2.observer && !t2.isElement || t2.update();
    }
    function oe(e2) {
      const t2 = this, { params: s2, activeIndex: a2, slidesEl: i2 } = t2;
      s2.loop && t2.loopDestroy();
      let r2 = a2 + 1;
      const n2 = (e3) => {
        if ("string" == typeof e3) {
          const t3 = document.createElement("div");
          t3.innerHTML = e3, i2.prepend(t3.children[0]), t3.innerHTML = "";
        } else i2.prepend(e3);
      };
      if ("object" == typeof e2 && "length" in e2) {
        for (let t3 = 0; t3 < e2.length; t3 += 1) e2[t3] && n2(e2[t3]);
        r2 = a2 + e2.length;
      } else n2(e2);
      t2.recalcSlides(), s2.loop && t2.loopCreate(), s2.observer && !t2.isElement || t2.update(), t2.slideTo(r2, 0, false);
    }
    function de(e2, t2) {
      const s2 = this, { params: a2, activeIndex: i2, slidesEl: r2 } = s2;
      let n2 = i2;
      a2.loop && (n2 -= s2.loopedSlides, s2.loopDestroy(), s2.recalcSlides());
      const l2 = s2.slides.length;
      if (e2 <= 0) return void s2.prependSlide(t2);
      if (e2 >= l2) return void s2.appendSlide(t2);
      let o2 = n2 > e2 ? n2 + 1 : n2;
      const d2 = [];
      for (let t3 = l2 - 1; t3 >= e2; t3 -= 1) {
        const e3 = s2.slides[t3];
        e3.remove(), d2.unshift(e3);
      }
      if ("object" == typeof t2 && "length" in t2) {
        for (let e3 = 0; e3 < t2.length; e3 += 1) t2[e3] && r2.append(t2[e3]);
        o2 = n2 > e2 ? n2 + t2.length : n2;
      } else r2.append(t2);
      for (let e3 = 0; e3 < d2.length; e3 += 1) r2.append(d2[e3]);
      s2.recalcSlides(), a2.loop && s2.loopCreate(), a2.observer && !s2.isElement || s2.update(), a2.loop ? s2.slideTo(o2 + s2.loopedSlides, 0, false) : s2.slideTo(o2, 0, false);
    }
    function ce(e2) {
      const t2 = this, { params: s2, activeIndex: a2 } = t2;
      let i2 = a2;
      s2.loop && (i2 -= t2.loopedSlides, t2.loopDestroy());
      let r2, n2 = i2;
      if ("object" == typeof e2 && "length" in e2) {
        for (let s3 = 0; s3 < e2.length; s3 += 1)
          r2 = e2[s3], t2.slides[r2] && t2.slides[r2].remove(), r2 < n2 && (n2 -= 1);
        n2 = Math.max(n2, 0);
      } else
        r2 = e2, t2.slides[r2] && t2.slides[r2].remove(), r2 < n2 && (n2 -= 1), n2 = Math.max(n2, 0);
      t2.recalcSlides(), s2.loop && t2.loopCreate(), s2.observer && !t2.isElement || t2.update(), s2.loop ? t2.slideTo(n2 + t2.loopedSlides, 0, false) : t2.slideTo(n2, 0, false);
    }
    function pe() {
      const e2 = this, t2 = [];
      for (let s2 = 0; s2 < e2.slides.length; s2 += 1) t2.push(s2);
      e2.removeSlide(t2);
    }
    function ue(e2) {
      const {
        effect: t2,
        swiper: s2,
        on: a2,
        setTranslate: i2,
        setTransition: r2,
        overwriteParams: n2,
        perspective: l2,
        recreateShadows: o2,
        getEffectParams: d2
      } = e2;
      let c2;
      a2("beforeInit", () => {
        if (s2.params.effect !== t2) return;
        s2.classNames.push(`${s2.params.containerModifierClass}${t2}`), l2 && l2() && s2.classNames.push(`${s2.params.containerModifierClass}3d`);
        const e3 = n2 ? n2() : {};
        Object.assign(s2.params, e3), Object.assign(s2.originalParams, e3);
      }), a2("setTranslate", () => {
        s2.params.effect === t2 && i2();
      }), a2("setTransition", (e3, a3) => {
        s2.params.effect === t2 && r2(a3);
      }), a2("transitionEnd", () => {
        if (s2.params.effect === t2 && o2) {
          if (!d2 || !d2().slideShadows) return;
          s2.slides.forEach((e3) => {
            e3.querySelectorAll(
              ".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left"
            ).forEach((e4) => e4.remove());
          }), o2();
        }
      }), a2("virtualUpdate", () => {
        s2.params.effect === t2 && (s2.slides.length || (c2 = true), requestAnimationFrame(() => {
          c2 && s2.slides && s2.slides.length && (i2(), c2 = false);
        }));
      });
    }
    function me(e2, t2) {
      const s2 = h(t2);
      return s2 !== t2 && (s2.style.backfaceVisibility = "hidden", s2.style["-webkit-backface-visibility"] = "hidden"), s2;
    }
    function he(e2) {
      let { swiper: t2, duration: s2, transformElements: a2, allSlides: i2 } = e2;
      const { activeIndex: r2 } = t2;
      if (t2.params.virtualTranslate && 0 !== s2) {
        let e3, s3 = false;
        e3 = i2 ? a2 : a2.filter((e4) => {
          const s4 = e4.classList.contains("swiper-slide-transform") ? ((e5) => {
            if (!e5.parentElement)
              return t2.slides.filter(
                (t3) => t3.shadowRoot && t3.shadowRoot === e5.parentNode
              )[0];
            return e5.parentElement;
          })(e4) : e4;
          return t2.getSlideIndex(s4) === r2;
        }), e3.forEach((e4) => {
          x(e4, () => {
            if (s3) return;
            if (!t2 || t2.destroyed) return;
            s3 = true, t2.animating = false;
            const e5 = new window.CustomEvent("transitionend", {
              bubbles: true,
              cancelable: true
            });
            t2.wrapperEl.dispatchEvent(e5);
          });
        });
      }
    }
    function fe(e2, t2, s2) {
      const a2 = `swiper-slide-shadow${s2 ? `-${s2}` : ""}${e2 ? ` swiper-slide-shadow-${e2}` : ""}`, i2 = h(t2);
      let r2 = i2.querySelector(`.${a2.split(" ").join(".")}`);
      return r2 || (r2 = v("div", a2.split(" ")), i2.append(r2)), r2;
    }
    Object.keys(se).forEach((e2) => {
      Object.keys(se[e2]).forEach((t2) => {
        ie.prototype[t2] = se[e2][t2];
      });
    }), ie.use([
      function(e2) {
        let { swiper: t2, on: s2, emit: a2 } = e2;
        const i2 = r();
        let n2 = null, l2 = null;
        const o2 = () => {
          t2 && !t2.destroyed && t2.initialized && (a2("beforeResize"), a2("resize"));
        }, d2 = () => {
          t2 && !t2.destroyed && t2.initialized && a2("orientationchange");
        };
        s2("init", () => {
          t2.params.resizeObserver && void 0 !== i2.ResizeObserver ? t2 && !t2.destroyed && t2.initialized && (n2 = new ResizeObserver((e3) => {
            l2 = i2.requestAnimationFrame(() => {
              const { width: s3, height: a3 } = t2;
              let i3 = s3, r2 = a3;
              e3.forEach((e4) => {
                let { contentBoxSize: s4, contentRect: a4, target: n3 } = e4;
                n3 && n3 !== t2.el || (i3 = a4 ? a4.width : (s4[0] || s4).inlineSize, r2 = a4 ? a4.height : (s4[0] || s4).blockSize);
              }), i3 === s3 && r2 === a3 || o2();
            });
          }), n2.observe(t2.el)) : (i2.addEventListener("resize", o2), i2.addEventListener("orientationchange", d2));
        }), s2("destroy", () => {
          l2 && i2.cancelAnimationFrame(l2), n2 && n2.unobserve && t2.el && (n2.unobserve(t2.el), n2 = null), i2.removeEventListener("resize", o2), i2.removeEventListener("orientationchange", d2);
        });
      },
      function(e2) {
        let { swiper: t2, extendParams: s2, on: a2, emit: i2 } = e2;
        const n2 = [], l2 = r(), o2 = function(e3, s3) {
          void 0 === s3 && (s3 = {});
          const a3 = new (l2.MutationObserver || l2.WebkitMutationObserver)(
            (e4) => {
              if (t2.__preventObserver__) return;
              if (1 === e4.length) return void i2("observerUpdate", e4[0]);
              const s4 = function() {
                i2("observerUpdate", e4[0]);
              };
              l2.requestAnimationFrame ? l2.requestAnimationFrame(s4) : l2.setTimeout(s4, 0);
            }
          );
          a3.observe(e3, {
            attributes: void 0 === s3.attributes || s3.attributes,
            childList: t2.isElement || (void 0 === s3.childList || s3).childList,
            characterData: void 0 === s3.characterData || s3.characterData
          }), n2.push(a3);
        };
        s2({ observer: false, observeParents: false, observeSlideChildren: false }), a2("init", () => {
          if (t2.params.observer) {
            if (t2.params.observeParents) {
              const e3 = E(t2.hostEl);
              for (let t3 = 0; t3 < e3.length; t3 += 1) o2(e3[t3]);
            }
            o2(t2.hostEl, { childList: t2.params.observeSlideChildren }), o2(t2.wrapperEl, { attributes: false });
          }
        }), a2("destroy", () => {
          n2.forEach((e3) => {
            e3.disconnect();
          }), n2.splice(0, n2.length);
        });
      }
    ]);
    const ge = [
      function(e2) {
        let t2, { swiper: s2, extendParams: i2, on: r2, emit: n2 } = e2;
        i2({
          virtual: {
            enabled: false,
            slides: [],
            cache: true,
            renderSlide: null,
            renderExternal: null,
            renderExternalUpdate: true,
            addSlidesBefore: 0,
            addSlidesAfter: 0
          }
        });
        const l2 = a();
        s2.virtual = {
          cache: {},
          from: void 0,
          to: void 0,
          slides: [],
          offset: 0,
          slidesGrid: []
        };
        const o2 = l2.createElement("div");
        function d2(e3, t3) {
          const a2 = s2.params.virtual;
          if (a2.cache && s2.virtual.cache[t3]) return s2.virtual.cache[t3];
          let i3;
          return a2.renderSlide ? (i3 = a2.renderSlide.call(s2, e3, t3), "string" == typeof i3 && (o2.innerHTML = i3, i3 = o2.children[0])) : i3 = s2.isElement ? v("swiper-slide") : v("div", s2.params.slideClass), i3.setAttribute("data-swiper-slide-index", t3), a2.renderSlide || (i3.innerHTML = e3), a2.cache && (s2.virtual.cache[t3] = i3), i3;
        }
        function c2(e3, t3) {
          const {
            slidesPerView: a2,
            slidesPerGroup: i3,
            centeredSlides: r3,
            loop: l3,
            initialSlide: o3
          } = s2.params;
          if (t3 && !l3 && o3 > 0) return;
          const { addSlidesBefore: c3, addSlidesAfter: p2 } = s2.params.virtual, { from: u2, to: m2, slides: h2, slidesGrid: g2, offset: v2 } = s2.virtual;
          s2.params.cssMode || s2.updateActiveIndex();
          const w2 = s2.activeIndex || 0;
          let b2, y2, E2;
          b2 = s2.rtlTranslate ? "right" : s2.isHorizontal() ? "left" : "top", r3 ? (y2 = Math.floor(a2 / 2) + i3 + p2, E2 = Math.floor(a2 / 2) + i3 + c3) : (y2 = a2 + (i3 - 1) + p2, E2 = (l3 ? a2 : i3) + c3);
          let x2 = w2 - E2, S2 = w2 + y2;
          l3 || (x2 = Math.max(x2, 0), S2 = Math.min(S2, h2.length - 1));
          let T2 = (s2.slidesGrid[x2] || 0) - (s2.slidesGrid[0] || 0);
          function M2() {
            s2.updateSlides(), s2.updateProgress(), s2.updateSlidesClasses(), n2("virtualUpdate");
          }
          if (l3 && w2 >= E2 ? (x2 -= E2, r3 || (T2 += s2.slidesGrid[0])) : l3 && w2 < E2 && (x2 = -E2, r3 && (T2 += s2.slidesGrid[0])), Object.assign(s2.virtual, {
            from: x2,
            to: S2,
            offset: T2,
            slidesGrid: s2.slidesGrid,
            slidesBefore: E2,
            slidesAfter: y2
          }), u2 === x2 && m2 === S2 && !e3)
            return s2.slidesGrid !== g2 && T2 !== v2 && s2.slides.forEach((e4) => {
              e4.style[b2] = T2 - Math.abs(s2.cssOverflowAdjustment()) + "px";
            }), s2.updateProgress(), void n2("virtualUpdate");
          if (s2.params.virtual.renderExternal)
            return s2.params.virtual.renderExternal.call(s2, {
              offset: T2,
              from: x2,
              to: S2,
              slides: function() {
                const e4 = [];
                for (let t4 = x2; t4 <= S2; t4 += 1) e4.push(h2[t4]);
                return e4;
              }()
            }), void (s2.params.virtual.renderExternalUpdate ? M2() : n2("virtualUpdate"));
          const C2 = [], P2 = [], L2 = (e4) => {
            let t4 = e4;
            return e4 < 0 ? t4 = h2.length + e4 : t4 >= h2.length && (t4 -= h2.length), t4;
          };
          if (e3)
            s2.slides.filter((e4) => e4.matches(`.${s2.params.slideClass}, swiper-slide`)).forEach((e4) => {
              e4.remove();
            });
          else
            for (let e4 = u2; e4 <= m2; e4 += 1)
              if (e4 < x2 || e4 > S2) {
                const t4 = L2(e4);
                s2.slides.filter(
                  (e5) => e5.matches(
                    `.${s2.params.slideClass}[data-swiper-slide-index="${t4}"], swiper-slide[data-swiper-slide-index="${t4}"]`
                  )
                ).forEach((e5) => {
                  e5.remove();
                });
              }
          const I2 = l3 ? -h2.length : 0, z2 = l3 ? 2 * h2.length : h2.length;
          for (let t4 = I2; t4 < z2; t4 += 1)
            if (t4 >= x2 && t4 <= S2) {
              const s3 = L2(t4);
              void 0 === m2 || e3 ? P2.push(s3) : (t4 > m2 && P2.push(s3), t4 < u2 && C2.push(s3));
            }
          if (P2.forEach((e4) => {
            s2.slidesEl.append(d2(h2[e4], e4));
          }), l3)
            for (let e4 = C2.length - 1; e4 >= 0; e4 -= 1) {
              const t4 = C2[e4];
              s2.slidesEl.prepend(d2(h2[t4], t4));
            }
          else
            C2.sort((e4, t4) => t4 - e4), C2.forEach((e4) => {
              s2.slidesEl.prepend(d2(h2[e4], e4));
            });
          f(s2.slidesEl, ".swiper-slide, swiper-slide").forEach((e4) => {
            e4.style[b2] = T2 - Math.abs(s2.cssOverflowAdjustment()) + "px";
          }), M2();
        }
        r2("beforeInit", () => {
          if (!s2.params.virtual.enabled) return;
          let e3;
          if (void 0 === s2.passedParams.virtual.slides) {
            const t3 = [...s2.slidesEl.children].filter(
              (e4) => e4.matches(`.${s2.params.slideClass}, swiper-slide`)
            );
            t3 && t3.length && (s2.virtual.slides = [...t3], e3 = true, t3.forEach((e4, t4) => {
              e4.setAttribute("data-swiper-slide-index", t4), s2.virtual.cache[t4] = e4, e4.remove();
            }));
          }
          e3 || (s2.virtual.slides = s2.params.virtual.slides), s2.classNames.push(`${s2.params.containerModifierClass}virtual`), s2.params.watchSlidesProgress = true, s2.originalParams.watchSlidesProgress = true, c2(false, true);
        }), r2("setTranslate", () => {
          s2.params.virtual.enabled && (s2.params.cssMode && !s2._immediateVirtual ? (clearTimeout(t2), t2 = setTimeout(() => {
            c2();
          }, 100)) : c2());
        }), r2("init update resize", () => {
          s2.params.virtual.enabled && s2.params.cssMode && u(s2.wrapperEl, "--swiper-virtual-size", `${s2.virtualSize}px`);
        }), Object.assign(s2.virtual, {
          appendSlide: function(e3) {
            if ("object" == typeof e3 && "length" in e3)
              for (let t3 = 0; t3 < e3.length; t3 += 1)
                e3[t3] && s2.virtual.slides.push(e3[t3]);
            else s2.virtual.slides.push(e3);
            c2(true);
          },
          prependSlide: function(e3) {
            const t3 = s2.activeIndex;
            let a2 = t3 + 1, i3 = 1;
            if (Array.isArray(e3)) {
              for (let t4 = 0; t4 < e3.length; t4 += 1)
                e3[t4] && s2.virtual.slides.unshift(e3[t4]);
              a2 = t3 + e3.length, i3 = e3.length;
            } else s2.virtual.slides.unshift(e3);
            if (s2.params.virtual.cache) {
              const e4 = s2.virtual.cache, t4 = {};
              Object.keys(e4).forEach((s3) => {
                const a3 = e4[s3], r3 = a3.getAttribute("data-swiper-slide-index");
                r3 && a3.setAttribute(
                  "data-swiper-slide-index",
                  parseInt(r3, 10) + i3
                ), t4[parseInt(s3, 10) + i3] = a3;
              }), s2.virtual.cache = t4;
            }
            c2(true), s2.slideTo(a2, 0);
          },
          removeSlide: function(e3) {
            if (null == e3) return;
            let t3 = s2.activeIndex;
            if (Array.isArray(e3))
              for (let a2 = e3.length - 1; a2 >= 0; a2 -= 1)
                s2.params.virtual.cache && (delete s2.virtual.cache[e3[a2]], Object.keys(s2.virtual.cache).forEach((t4) => {
                  t4 > e3 && (s2.virtual.cache[t4 - 1] = s2.virtual.cache[t4], s2.virtual.cache[t4 - 1].setAttribute(
                    "data-swiper-slide-index",
                    t4 - 1
                  ), delete s2.virtual.cache[t4]);
                })), s2.virtual.slides.splice(e3[a2], 1), e3[a2] < t3 && (t3 -= 1), t3 = Math.max(t3, 0);
            else
              s2.params.virtual.cache && (delete s2.virtual.cache[e3], Object.keys(s2.virtual.cache).forEach((t4) => {
                t4 > e3 && (s2.virtual.cache[t4 - 1] = s2.virtual.cache[t4], s2.virtual.cache[t4 - 1].setAttribute(
                  "data-swiper-slide-index",
                  t4 - 1
                ), delete s2.virtual.cache[t4]);
              })), s2.virtual.slides.splice(e3, 1), e3 < t3 && (t3 -= 1), t3 = Math.max(t3, 0);
            c2(true), s2.slideTo(t3, 0);
          },
          removeAllSlides: function() {
            s2.virtual.slides = [], s2.params.virtual.cache && (s2.virtual.cache = {}), c2(true), s2.slideTo(0, 0);
          },
          update: c2
        });
      },
      function(e2) {
        let { swiper: t2, extendParams: s2, on: i2, emit: n2 } = e2;
        const l2 = a(), o2 = r();
        function d2(e3) {
          if (!t2.enabled) return;
          const { rtlTranslate: s3 } = t2;
          let a2 = e3;
          a2.originalEvent && (a2 = a2.originalEvent);
          const i3 = a2.keyCode || a2.charCode, r2 = t2.params.keyboard.pageUpDown, d3 = r2 && 33 === i3, c3 = r2 && 34 === i3, p3 = 37 === i3, u2 = 39 === i3, m2 = 38 === i3, h2 = 40 === i3;
          if (!t2.allowSlideNext && (t2.isHorizontal() && u2 || t2.isVertical() && h2 || c3))
            return false;
          if (!t2.allowSlidePrev && (t2.isHorizontal() && p3 || t2.isVertical() && m2 || d3))
            return false;
          if (!(a2.shiftKey || a2.altKey || a2.ctrlKey || a2.metaKey || l2.activeElement && l2.activeElement.nodeName && ("input" === l2.activeElement.nodeName.toLowerCase() || "textarea" === l2.activeElement.nodeName.toLowerCase()))) {
            if (t2.params.keyboard.onlyInViewport && (d3 || c3 || p3 || u2 || m2 || h2)) {
              let e4 = false;
              if (E(t2.el, `.${t2.params.slideClass}, swiper-slide`).length > 0 && 0 === E(t2.el, `.${t2.params.slideActiveClass}`).length)
                return;
              const a3 = t2.el, i4 = a3.clientWidth, r3 = a3.clientHeight, n3 = o2.innerWidth, l3 = o2.innerHeight, d4 = w(a3);
              s3 && (d4.left -= a3.scrollLeft);
              const c4 = [
                [d4.left, d4.top],
                [d4.left + i4, d4.top],
                [d4.left, d4.top + r3],
                [d4.left + i4, d4.top + r3]
              ];
              for (let t3 = 0; t3 < c4.length; t3 += 1) {
                const s4 = c4[t3];
                if (s4[0] >= 0 && s4[0] <= n3 && s4[1] >= 0 && s4[1] <= l3) {
                  if (0 === s4[0] && 0 === s4[1]) continue;
                  e4 = true;
                }
              }
              if (!e4) return;
            }
            t2.isHorizontal() ? ((d3 || c3 || p3 || u2) && (a2.preventDefault ? a2.preventDefault() : a2.returnValue = false), ((c3 || u2) && !s3 || (d3 || p3) && s3) && t2.slideNext(), ((d3 || p3) && !s3 || (c3 || u2) && s3) && t2.slidePrev()) : ((d3 || c3 || m2 || h2) && (a2.preventDefault ? a2.preventDefault() : a2.returnValue = false), (c3 || h2) && t2.slideNext(), (d3 || m2) && t2.slidePrev()), n2("keyPress", i3);
          }
        }
        function c2() {
          t2.keyboard.enabled || (l2.addEventListener("keydown", d2), t2.keyboard.enabled = true);
        }
        function p2() {
          t2.keyboard.enabled && (l2.removeEventListener("keydown", d2), t2.keyboard.enabled = false);
        }
        t2.keyboard = { enabled: false }, s2({ keyboard: { enabled: false, onlyInViewport: true, pageUpDown: true } }), i2("init", () => {
          t2.params.keyboard.enabled && c2();
        }), i2("destroy", () => {
          t2.keyboard.enabled && p2();
        }), Object.assign(t2.keyboard, { enable: c2, disable: p2 });
      },
      function(e2) {
        let { swiper: t2, extendParams: s2, on: a2, emit: i2 } = e2;
        const n2 = r();
        let d2;
        s2({
          mousewheel: {
            enabled: false,
            releaseOnEdges: false,
            invert: false,
            forceToAxis: false,
            sensitivity: 1,
            eventsTarget: "container",
            thresholdDelta: null,
            thresholdTime: null,
            noMousewheelClass: "swiper-no-mousewheel"
          }
        }), t2.mousewheel = { enabled: false };
        let c2, p2 = o();
        const u2 = [];
        function m2() {
          t2.enabled && (t2.mouseEntered = true);
        }
        function h2() {
          t2.enabled && (t2.mouseEntered = false);
        }
        function f2(e3) {
          return !(t2.params.mousewheel.thresholdDelta && e3.delta < t2.params.mousewheel.thresholdDelta) && !(t2.params.mousewheel.thresholdTime && o() - p2 < t2.params.mousewheel.thresholdTime) && (e3.delta >= 6 && o() - p2 < 60 || (e3.direction < 0 ? t2.isEnd && !t2.params.loop || t2.animating || (t2.slideNext(), i2("scroll", e3.raw)) : t2.isBeginning && !t2.params.loop || t2.animating || (t2.slidePrev(), i2("scroll", e3.raw)), p2 = new n2.Date().getTime(), false));
        }
        function g2(e3) {
          let s3 = e3, a3 = true;
          if (!t2.enabled) return;
          if (e3.target.closest(`.${t2.params.mousewheel.noMousewheelClass}`))
            return;
          const r2 = t2.params.mousewheel;
          t2.params.cssMode && s3.preventDefault();
          let n3 = t2.el;
          "container" !== t2.params.mousewheel.eventsTarget && (n3 = document.querySelector(t2.params.mousewheel.eventsTarget));
          const p3 = n3 && n3.contains(s3.target);
          if (!t2.mouseEntered && !p3 && !r2.releaseOnEdges) return true;
          s3.originalEvent && (s3 = s3.originalEvent);
          let m3 = 0;
          const h3 = t2.rtlTranslate ? -1 : 1, g3 = function(e4) {
            let t3 = 0, s4 = 0, a4 = 0, i3 = 0;
            return "detail" in e4 && (s4 = e4.detail), "wheelDelta" in e4 && (s4 = -e4.wheelDelta / 120), "wheelDeltaY" in e4 && (s4 = -e4.wheelDeltaY / 120), "wheelDeltaX" in e4 && (t3 = -e4.wheelDeltaX / 120), "axis" in e4 && e4.axis === e4.HORIZONTAL_AXIS && (t3 = s4, s4 = 0), a4 = 10 * t3, i3 = 10 * s4, "deltaY" in e4 && (i3 = e4.deltaY), "deltaX" in e4 && (a4 = e4.deltaX), e4.shiftKey && !a4 && (a4 = i3, i3 = 0), (a4 || i3) && e4.deltaMode && (1 === e4.deltaMode ? (a4 *= 40, i3 *= 40) : (a4 *= 800, i3 *= 800)), a4 && !t3 && (t3 = a4 < 1 ? -1 : 1), i3 && !s4 && (s4 = i3 < 1 ? -1 : 1), { spinX: t3, spinY: s4, pixelX: a4, pixelY: i3 };
          }(s3);
          if (r2.forceToAxis)
            if (t2.isHorizontal()) {
              if (!(Math.abs(g3.pixelX) > Math.abs(g3.pixelY))) return true;
              m3 = -g3.pixelX * h3;
            } else {
              if (!(Math.abs(g3.pixelY) > Math.abs(g3.pixelX))) return true;
              m3 = -g3.pixelY;
            }
          else
            m3 = Math.abs(g3.pixelX) > Math.abs(g3.pixelY) ? -g3.pixelX * h3 : -g3.pixelY;
          if (0 === m3) return true;
          r2.invert && (m3 = -m3);
          let v3 = t2.getTranslate() + m3 * r2.sensitivity;
          if (v3 >= t2.minTranslate() && (v3 = t2.minTranslate()), v3 <= t2.maxTranslate() && (v3 = t2.maxTranslate()), a3 = !!t2.params.loop || !(v3 === t2.minTranslate() || v3 === t2.maxTranslate()), a3 && t2.params.nested && s3.stopPropagation(), t2.params.freeMode && t2.params.freeMode.enabled) {
            const e4 = { time: o(), delta: Math.abs(m3), direction: Math.sign(m3) }, a4 = c2 && e4.time < c2.time + 500 && e4.delta <= c2.delta && e4.direction === c2.direction;
            if (!a4) {
              c2 = void 0;
              let n4 = t2.getTranslate() + m3 * r2.sensitivity;
              const o2 = t2.isBeginning, p4 = t2.isEnd;
              if (n4 >= t2.minTranslate() && (n4 = t2.minTranslate()), n4 <= t2.maxTranslate() && (n4 = t2.maxTranslate()), t2.setTransition(0), t2.setTranslate(n4), t2.updateProgress(), t2.updateActiveIndex(), t2.updateSlidesClasses(), (!o2 && t2.isBeginning || !p4 && t2.isEnd) && t2.updateSlidesClasses(), t2.params.loop && t2.loopFix({
                direction: e4.direction < 0 ? "next" : "prev",
                byMousewheel: true
              }), t2.params.freeMode.sticky) {
                clearTimeout(d2), d2 = void 0, u2.length >= 15 && u2.shift();
                const s4 = u2.length ? u2[u2.length - 1] : void 0, a5 = u2[0];
                if (u2.push(e4), s4 && (e4.delta > s4.delta || e4.direction !== s4.direction))
                  u2.splice(0);
                else if (u2.length >= 15 && e4.time - a5.time < 500 && a5.delta - e4.delta >= 1 && e4.delta <= 6) {
                  const s5 = m3 > 0 ? 0.8 : 0.2;
                  c2 = e4, u2.splice(0), d2 = l(() => {
                    !t2.destroyed && t2.params && t2.slideToClosest(t2.params.speed, true, void 0, s5);
                  }, 0);
                }
                d2 || (d2 = l(() => {
                  if (t2.destroyed || !t2.params) return;
                  c2 = e4, u2.splice(0), t2.slideToClosest(t2.params.speed, true, void 0, 0.5);
                }, 500));
              }
              if (a4 || i2("scroll", s3), t2.params.autoplay && t2.params.autoplayDisableOnInteraction && t2.autoplay.stop(), r2.releaseOnEdges && (n4 === t2.minTranslate() || n4 === t2.maxTranslate()))
                return true;
            }
          } else {
            const s4 = {
              time: o(),
              delta: Math.abs(m3),
              direction: Math.sign(m3),
              raw: e3
            };
            u2.length >= 2 && u2.shift();
            const a4 = u2.length ? u2[u2.length - 1] : void 0;
            if (u2.push(s4), a4 ? (s4.direction !== a4.direction || s4.delta > a4.delta || s4.time > a4.time + 150) && f2(s4) : f2(s4), function(e4) {
              const s5 = t2.params.mousewheel;
              if (e4.direction < 0) {
                if (t2.isEnd && !t2.params.loop && s5.releaseOnEdges) return true;
              } else if (t2.isBeginning && !t2.params.loop && s5.releaseOnEdges)
                return true;
              return false;
            }(s4))
              return true;
          }
          return s3.preventDefault ? s3.preventDefault() : s3.returnValue = false, false;
        }
        function v2(e3) {
          let s3 = t2.el;
          "container" !== t2.params.mousewheel.eventsTarget && (s3 = document.querySelector(t2.params.mousewheel.eventsTarget)), s3[e3]("mouseenter", m2), s3[e3]("mouseleave", h2), s3[e3]("wheel", g2);
        }
        function w2() {
          return t2.params.cssMode ? (t2.wrapperEl.removeEventListener("wheel", g2), true) : !t2.mousewheel.enabled && (v2("addEventListener"), t2.mousewheel.enabled = true, true);
        }
        function b2() {
          return t2.params.cssMode ? (t2.wrapperEl.addEventListener(event, g2), true) : !!t2.mousewheel.enabled && (v2("removeEventListener"), t2.mousewheel.enabled = false, true);
        }
        a2("init", () => {
          !t2.params.mousewheel.enabled && t2.params.cssMode && b2(), t2.params.mousewheel.enabled && w2();
        }), a2("destroy", () => {
          t2.params.cssMode && w2(), t2.mousewheel.enabled && b2();
        }), Object.assign(t2.mousewheel, { enable: w2, disable: b2 });
      },
      function(e2) {
        let { swiper: t2, extendParams: s2, on: a2, emit: i2 } = e2;
        function r2(e3) {
          let s3;
          return e3 && "string" == typeof e3 && t2.isElement && (s3 = t2.el.querySelector(e3) || t2.hostEl.querySelector(e3), s3) ? s3 : (e3 && ("string" == typeof e3 && (s3 = [...document.querySelectorAll(e3)]), t2.params.uniqueNavElements && "string" == typeof e3 && s3 && s3.length > 1 && 1 === t2.el.querySelectorAll(e3).length ? s3 = t2.el.querySelector(e3) : s3 && 1 === s3.length && (s3 = s3[0])), e3 && !s3 ? e3 : s3);
        }
        function n2(e3, s3) {
          const a3 = t2.params.navigation;
          (e3 = T(e3)).forEach((e4) => {
            e4 && (e4.classList[s3 ? "add" : "remove"](...a3.disabledClass.split(" ")), "BUTTON" === e4.tagName && (e4.disabled = s3), t2.params.watchOverflow && t2.enabled && e4.classList[t2.isLocked ? "add" : "remove"](a3.lockClass));
          });
        }
        function l2() {
          const { nextEl: e3, prevEl: s3 } = t2.navigation;
          if (t2.params.loop) return n2(s3, false), void n2(e3, false);
          n2(s3, t2.isBeginning && !t2.params.rewind), n2(e3, t2.isEnd && !t2.params.rewind);
        }
        function o2(e3) {
          e3.preventDefault(), (!t2.isBeginning || t2.params.loop || t2.params.rewind) && (t2.slidePrev(), i2("navigationPrev"));
        }
        function d2(e3) {
          e3.preventDefault(), (!t2.isEnd || t2.params.loop || t2.params.rewind) && (t2.slideNext(), i2("navigationNext"));
        }
        function c2() {
          const e3 = t2.params.navigation;
          if (t2.params.navigation = re(
            t2,
            t2.originalParams.navigation,
            t2.params.navigation,
            { nextEl: "swiper-button-next", prevEl: "swiper-button-prev" }
          ), !e3.nextEl && !e3.prevEl)
            return;
          let s3 = r2(e3.nextEl), a3 = r2(e3.prevEl);
          Object.assign(t2.navigation, { nextEl: s3, prevEl: a3 }), s3 = T(s3), a3 = T(a3);
          const i3 = (s4, a4) => {
            s4 && s4.addEventListener("click", "next" === a4 ? d2 : o2), !t2.enabled && s4 && s4.classList.add(...e3.lockClass.split(" "));
          };
          s3.forEach((e4) => i3(e4, "next")), a3.forEach((e4) => i3(e4, "prev"));
        }
        function p2() {
          let { nextEl: e3, prevEl: s3 } = t2.navigation;
          e3 = T(e3), s3 = T(s3);
          const a3 = (e4, s4) => {
            e4.removeEventListener("click", "next" === s4 ? d2 : o2), e4.classList.remove(...t2.params.navigation.disabledClass.split(" "));
          };
          e3.forEach((e4) => a3(e4, "next")), s3.forEach((e4) => a3(e4, "prev"));
        }
        s2({
          navigation: {
            nextEl: null,
            prevEl: null,
            hideOnClick: false,
            disabledClass: "swiper-button-disabled",
            hiddenClass: "swiper-button-hidden",
            lockClass: "swiper-button-lock",
            navigationDisabledClass: "swiper-navigation-disabled"
          }
        }), t2.navigation = { nextEl: null, prevEl: null }, a2("init", () => {
          false === t2.params.navigation.enabled ? u2() : (c2(), l2());
        }), a2("toEdge fromEdge lock unlock", () => {
          l2();
        }), a2("destroy", () => {
          p2();
        }), a2("enable disable", () => {
          let { nextEl: e3, prevEl: s3 } = t2.navigation;
          e3 = T(e3), s3 = T(s3), t2.enabled ? l2() : [...e3, ...s3].filter((e4) => !!e4).forEach(
            (e4) => e4.classList.add(t2.params.navigation.lockClass)
          );
        }), a2("click", (e3, s3) => {
          let { nextEl: a3, prevEl: r3 } = t2.navigation;
          a3 = T(a3), r3 = T(r3);
          const n3 = s3.target;
          let l3 = r3.includes(n3) || a3.includes(n3);
          if (t2.isElement && !l3) {
            const e4 = s3.path || s3.composedPath && s3.composedPath();
            e4 && (l3 = e4.find((e5) => a3.includes(e5) || r3.includes(e5)));
          }
          if (t2.params.navigation.hideOnClick && !l3) {
            if (t2.pagination && t2.params.pagination && t2.params.pagination.clickable && (t2.pagination.el === n3 || t2.pagination.el.contains(n3)))
              return;
            let e4;
            a3.length ? e4 = a3[0].classList.contains(t2.params.navigation.hiddenClass) : r3.length && (e4 = r3[0].classList.contains(t2.params.navigation.hiddenClass)), i2(true === e4 ? "navigationShow" : "navigationHide"), [...a3, ...r3].filter((e5) => !!e5).forEach(
              (e5) => e5.classList.toggle(t2.params.navigation.hiddenClass)
            );
          }
        });
        const u2 = () => {
          t2.el.classList.add(
            ...t2.params.navigation.navigationDisabledClass.split(" ")
          ), p2();
        };
        Object.assign(t2.navigation, {
          enable: () => {
            t2.el.classList.remove(
              ...t2.params.navigation.navigationDisabledClass.split(" ")
            ), c2(), l2();
          },
          disable: u2,
          update: l2,
          init: c2,
          destroy: p2
        });
      },
      function(e2) {
        let { swiper: t2, extendParams: s2, on: a2, emit: i2 } = e2;
        const r2 = "swiper-pagination";
        let n2;
        s2({
          pagination: {
            el: null,
            bulletElement: "span",
            clickable: false,
            hideOnClick: false,
            renderBullet: null,
            renderProgressbar: null,
            renderFraction: null,
            renderCustom: null,
            progressbarOpposite: false,
            type: "bullets",
            dynamicBullets: false,
            dynamicMainBullets: 1,
            formatFractionCurrent: (e3) => e3,
            formatFractionTotal: (e3) => e3,
            bulletClass: `${r2}-bullet`,
            bulletActiveClass: `${r2}-bullet-active`,
            modifierClass: `${r2}-`,
            currentClass: `${r2}-current`,
            totalClass: `${r2}-total`,
            hiddenClass: `${r2}-hidden`,
            progressbarFillClass: `${r2}-progressbar-fill`,
            progressbarOppositeClass: `${r2}-progressbar-opposite`,
            clickableClass: `${r2}-clickable`,
            lockClass: `${r2}-lock`,
            horizontalClass: `${r2}-horizontal`,
            verticalClass: `${r2}-vertical`,
            paginationDisabledClass: `${r2}-disabled`
          }
        }), t2.pagination = { el: null, bullets: [] };
        let l2 = 0;
        function o2() {
          return !t2.params.pagination.el || !t2.pagination.el || Array.isArray(t2.pagination.el) && 0 === t2.pagination.el.length;
        }
        function d2(e3, s3) {
          const { bulletActiveClass: a3 } = t2.params.pagination;
          e3 && (e3 = e3[("prev" === s3 ? "previous" : "next") + "ElementSibling"]) && (e3.classList.add(`${a3}-${s3}`), (e3 = e3[("prev" === s3 ? "previous" : "next") + "ElementSibling"]) && e3.classList.add(`${a3}-${s3}-${s3}`));
        }
        function c2(e3) {
          const s3 = e3.target.closest(ne(t2.params.pagination.bulletClass));
          if (!s3) return;
          e3.preventDefault();
          const a3 = y(s3) * t2.params.slidesPerGroup;
          if (t2.params.loop) {
            if (t2.realIndex === a3) return;
            const e4 = (i3 = t2.realIndex, r3 = a3, n3 = t2.slides.length, (r3 %= n3) == 1 + (i3 %= n3) ? "next" : r3 === i3 - 1 ? "previous" : void 0);
            "next" === e4 ? t2.slideNext() : "previous" === e4 ? t2.slidePrev() : t2.slideToLoop(a3);
          } else t2.slideTo(a3);
          var i3, r3, n3;
        }
        function p2() {
          const e3 = t2.rtl, s3 = t2.params.pagination;
          if (o2()) return;
          let a3, r3, c3 = t2.pagination.el;
          c3 = T(c3);
          const p3 = t2.virtual && t2.params.virtual.enabled ? t2.virtual.slides.length : t2.slides.length, u3 = t2.params.loop ? Math.ceil(p3 / t2.params.slidesPerGroup) : t2.snapGrid.length;
          if (t2.params.loop ? (r3 = t2.previousRealIndex || 0, a3 = t2.params.slidesPerGroup > 1 ? Math.floor(t2.realIndex / t2.params.slidesPerGroup) : t2.realIndex) : void 0 !== t2.snapIndex ? (a3 = t2.snapIndex, r3 = t2.previousSnapIndex) : (r3 = t2.previousIndex || 0, a3 = t2.activeIndex || 0), "bullets" === s3.type && t2.pagination.bullets && t2.pagination.bullets.length > 0) {
            const i3 = t2.pagination.bullets;
            let o3, p4, u4;
            if (s3.dynamicBullets && (n2 = S(i3[0], t2.isHorizontal() ? "width" : "height", true), c3.forEach((e4) => {
              e4.style[t2.isHorizontal() ? "width" : "height"] = n2 * (s3.dynamicMainBullets + 4) + "px";
            }), s3.dynamicMainBullets > 1 && void 0 !== r3 && (l2 += a3 - (r3 || 0), l2 > s3.dynamicMainBullets - 1 ? l2 = s3.dynamicMainBullets - 1 : l2 < 0 && (l2 = 0)), o3 = Math.max(a3 - l2, 0), p4 = o3 + (Math.min(i3.length, s3.dynamicMainBullets) - 1), u4 = (p4 + o3) / 2), i3.forEach((e4) => {
              const t3 = [
                ...[
                  "",
                  "-next",
                  "-next-next",
                  "-prev",
                  "-prev-prev",
                  "-main"
                ].map((e5) => `${s3.bulletActiveClass}${e5}`)
              ].map(
                (e5) => "string" == typeof e5 && e5.includes(" ") ? e5.split(" ") : e5
              ).flat();
              e4.classList.remove(...t3);
            }), c3.length > 1)
              i3.forEach((e4) => {
                const i4 = y(e4);
                i4 === a3 ? e4.classList.add(...s3.bulletActiveClass.split(" ")) : t2.isElement && e4.setAttribute("part", "bullet"), s3.dynamicBullets && (i4 >= o3 && i4 <= p4 && e4.classList.add(
                  ...`${s3.bulletActiveClass}-main`.split(" ")
                ), i4 === o3 && d2(e4, "prev"), i4 === p4 && d2(e4, "next"));
              });
            else {
              const e4 = i3[a3];
              if (e4 && e4.classList.add(...s3.bulletActiveClass.split(" ")), t2.isElement && i3.forEach((e5, t3) => {
                e5.setAttribute("part", t3 === a3 ? "bullet-active" : "bullet");
              }), s3.dynamicBullets) {
                const e5 = i3[o3], t3 = i3[p4];
                for (let e6 = o3; e6 <= p4; e6 += 1)
                  i3[e6] && i3[e6].classList.add(
                    ...`${s3.bulletActiveClass}-main`.split(" ")
                  );
                d2(e5, "prev"), d2(t3, "next");
              }
            }
            if (s3.dynamicBullets) {
              const a4 = Math.min(i3.length, s3.dynamicMainBullets + 4), r4 = (n2 * a4 - n2) / 2 - u4 * n2, l3 = e3 ? "right" : "left";
              i3.forEach((e4) => {
                e4.style[t2.isHorizontal() ? l3 : "top"] = `${r4}px`;
              });
            }
          }
          c3.forEach((e4, r4) => {
            if ("fraction" === s3.type && (e4.querySelectorAll(ne(s3.currentClass)).forEach((e5) => {
              e5.textContent = s3.formatFractionCurrent(a3 + 1);
            }), e4.querySelectorAll(ne(s3.totalClass)).forEach((e5) => {
              e5.textContent = s3.formatFractionTotal(u3);
            })), "progressbar" === s3.type) {
              let i3;
              i3 = s3.progressbarOpposite ? t2.isHorizontal() ? "vertical" : "horizontal" : t2.isHorizontal() ? "horizontal" : "vertical";
              const r5 = (a3 + 1) / u3;
              let n3 = 1, l3 = 1;
              "horizontal" === i3 ? n3 = r5 : l3 = r5, e4.querySelectorAll(ne(s3.progressbarFillClass)).forEach((e5) => {
                e5.style.transform = `translate3d(0,0,0) scaleX(${n3}) scaleY(${l3})`, e5.style.transitionDuration = `${t2.params.speed}ms`;
              });
            }
            "custom" === s3.type && s3.renderCustom ? (e4.innerHTML = s3.renderCustom(t2, a3 + 1, u3), 0 === r4 && i2("paginationRender", e4)) : (0 === r4 && i2("paginationRender", e4), i2("paginationUpdate", e4)), t2.params.watchOverflow && t2.enabled && e4.classList[t2.isLocked ? "add" : "remove"](s3.lockClass);
          });
        }
        function u2() {
          const e3 = t2.params.pagination;
          if (o2()) return;
          const s3 = t2.virtual && t2.params.virtual.enabled ? t2.virtual.slides.length : t2.grid && t2.params.grid.rows > 1 ? t2.slides.length / Math.ceil(t2.params.grid.rows) : t2.slides.length;
          let a3 = t2.pagination.el;
          a3 = T(a3);
          let r3 = "";
          if ("bullets" === e3.type) {
            let a4 = t2.params.loop ? Math.ceil(s3 / t2.params.slidesPerGroup) : t2.snapGrid.length;
            t2.params.freeMode && t2.params.freeMode.enabled && a4 > s3 && (a4 = s3);
            for (let s4 = 0; s4 < a4; s4 += 1)
              e3.renderBullet ? r3 += e3.renderBullet.call(t2, s4, e3.bulletClass) : r3 += `<${e3.bulletElement} ${t2.isElement ? 'part="bullet"' : ""} class="${e3.bulletClass}"></${e3.bulletElement}>`;
          }
          "fraction" === e3.type && (r3 = e3.renderFraction ? e3.renderFraction.call(t2, e3.currentClass, e3.totalClass) : `<span class="${e3.currentClass}"></span> / <span class="${e3.totalClass}"></span>`), "progressbar" === e3.type && (r3 = e3.renderProgressbar ? e3.renderProgressbar.call(t2, e3.progressbarFillClass) : `<span class="${e3.progressbarFillClass}"></span>`), t2.pagination.bullets = [], a3.forEach((s4) => {
            "custom" !== e3.type && (s4.innerHTML = r3 || ""), "bullets" === e3.type && t2.pagination.bullets.push(
              ...s4.querySelectorAll(ne(e3.bulletClass))
            );
          }), "custom" !== e3.type && i2("paginationRender", a3[0]);
        }
        function m2() {
          t2.params.pagination = re(
            t2,
            t2.originalParams.pagination,
            t2.params.pagination,
            { el: "swiper-pagination" }
          );
          const e3 = t2.params.pagination;
          if (!e3.el) return;
          let s3;
          "string" == typeof e3.el && t2.isElement && (s3 = t2.el.querySelector(e3.el)), s3 || "string" != typeof e3.el || (s3 = [...document.querySelectorAll(e3.el)]), s3 || (s3 = e3.el), s3 && 0 !== s3.length && (t2.params.uniqueNavElements && "string" == typeof e3.el && Array.isArray(s3) && s3.length > 1 && (s3 = [...t2.el.querySelectorAll(e3.el)], s3.length > 1 && (s3 = s3.filter((e4) => E(e4, ".swiper")[0] === t2.el)[0])), Array.isArray(s3) && 1 === s3.length && (s3 = s3[0]), Object.assign(t2.pagination, { el: s3 }), s3 = T(s3), s3.forEach((s4) => {
            "bullets" === e3.type && e3.clickable && s4.classList.add(...(e3.clickableClass || "").split(" ")), s4.classList.add(e3.modifierClass + e3.type), s4.classList.add(
              t2.isHorizontal() ? e3.horizontalClass : e3.verticalClass
            ), "bullets" === e3.type && e3.dynamicBullets && (s4.classList.add(`${e3.modifierClass}${e3.type}-dynamic`), l2 = 0, e3.dynamicMainBullets < 1 && (e3.dynamicMainBullets = 1)), "progressbar" === e3.type && e3.progressbarOpposite && s4.classList.add(e3.progressbarOppositeClass), e3.clickable && s4.addEventListener("click", c2), t2.enabled || s4.classList.add(e3.lockClass);
          }));
        }
        function h2() {
          const e3 = t2.params.pagination;
          if (o2()) return;
          let s3 = t2.pagination.el;
          s3 && (s3 = T(s3), s3.forEach((s4) => {
            s4.classList.remove(e3.hiddenClass), s4.classList.remove(e3.modifierClass + e3.type), s4.classList.remove(
              t2.isHorizontal() ? e3.horizontalClass : e3.verticalClass
            ), e3.clickable && (s4.classList.remove(...(e3.clickableClass || "").split(" ")), s4.removeEventListener("click", c2));
          })), t2.pagination.bullets && t2.pagination.bullets.forEach(
            (t3) => t3.classList.remove(...e3.bulletActiveClass.split(" "))
          );
        }
        a2("changeDirection", () => {
          if (!t2.pagination || !t2.pagination.el) return;
          const e3 = t2.params.pagination;
          let { el: s3 } = t2.pagination;
          s3 = T(s3), s3.forEach((s4) => {
            s4.classList.remove(e3.horizontalClass, e3.verticalClass), s4.classList.add(
              t2.isHorizontal() ? e3.horizontalClass : e3.verticalClass
            );
          });
        }), a2("init", () => {
          false === t2.params.pagination.enabled ? f2() : (m2(), u2(), p2());
        }), a2("activeIndexChange", () => {
          void 0 === t2.snapIndex && p2();
        }), a2("snapIndexChange", () => {
          p2();
        }), a2("snapGridLengthChange", () => {
          u2(), p2();
        }), a2("destroy", () => {
          h2();
        }), a2("enable disable", () => {
          let { el: e3 } = t2.pagination;
          e3 && (e3 = T(e3), e3.forEach(
            (e4) => e4.classList[t2.enabled ? "remove" : "add"](
              t2.params.pagination.lockClass
            )
          ));
        }), a2("lock unlock", () => {
          p2();
        }), a2("click", (e3, s3) => {
          const a3 = s3.target, r3 = T(t2.pagination.el);
          if (t2.params.pagination.el && t2.params.pagination.hideOnClick && r3 && r3.length > 0 && !a3.classList.contains(t2.params.pagination.bulletClass)) {
            if (t2.navigation && (t2.navigation.nextEl && a3 === t2.navigation.nextEl || t2.navigation.prevEl && a3 === t2.navigation.prevEl))
              return;
            const e4 = r3[0].classList.contains(t2.params.pagination.hiddenClass);
            i2(true === e4 ? "paginationShow" : "paginationHide"), r3.forEach(
              (e5) => e5.classList.toggle(t2.params.pagination.hiddenClass)
            );
          }
        });
        const f2 = () => {
          t2.el.classList.add(t2.params.pagination.paginationDisabledClass);
          let { el: e3 } = t2.pagination;
          e3 && (e3 = T(e3), e3.forEach(
            (e4) => e4.classList.add(t2.params.pagination.paginationDisabledClass)
          )), h2();
        };
        Object.assign(t2.pagination, {
          enable: () => {
            t2.el.classList.remove(t2.params.pagination.paginationDisabledClass);
            let { el: e3 } = t2.pagination;
            e3 && (e3 = T(e3), e3.forEach(
              (e4) => e4.classList.remove(t2.params.pagination.paginationDisabledClass)
            )), m2(), u2(), p2();
          },
          disable: f2,
          render: u2,
          update: p2,
          init: m2,
          destroy: h2
        });
      },
      function(e2) {
        let { swiper: t2, extendParams: s2, on: i2, emit: r2 } = e2;
        const o2 = a();
        let d2, c2, p2, u2, m2 = false, h2 = null, f2 = null;
        function g2() {
          if (!t2.params.scrollbar.el || !t2.scrollbar.el) return;
          const { scrollbar: e3, rtlTranslate: s3 } = t2, { dragEl: a2, el: i3 } = e3, r3 = t2.params.scrollbar, n2 = t2.params.loop ? t2.progressLoop : t2.progress;
          let l2 = c2, o3 = (p2 - c2) * n2;
          s3 ? (o3 = -o3, o3 > 0 ? (l2 = c2 - o3, o3 = 0) : -o3 + c2 > p2 && (l2 = p2 + o3)) : o3 < 0 ? (l2 = c2 + o3, o3 = 0) : o3 + c2 > p2 && (l2 = p2 - o3), t2.isHorizontal() ? (a2.style.transform = `translate3d(${o3}px, 0, 0)`, a2.style.width = `${l2}px`) : (a2.style.transform = `translate3d(0px, ${o3}px, 0)`, a2.style.height = `${l2}px`), r3.hide && (clearTimeout(h2), i3.style.opacity = 1, h2 = setTimeout(() => {
            i3.style.opacity = 0, i3.style.transitionDuration = "400ms";
          }, 1e3));
        }
        function b2() {
          if (!t2.params.scrollbar.el || !t2.scrollbar.el) return;
          const { scrollbar: e3 } = t2, { dragEl: s3, el: a2 } = e3;
          s3.style.width = "", s3.style.height = "", p2 = t2.isHorizontal() ? a2.offsetWidth : a2.offsetHeight, u2 = t2.size / (t2.virtualSize + t2.params.slidesOffsetBefore - (t2.params.centeredSlides ? t2.snapGrid[0] : 0)), c2 = "auto" === t2.params.scrollbar.dragSize ? p2 * u2 : parseInt(t2.params.scrollbar.dragSize, 10), t2.isHorizontal() ? s3.style.width = `${c2}px` : s3.style.height = `${c2}px`, a2.style.display = u2 >= 1 ? "none" : "", t2.params.scrollbar.hide && (a2.style.opacity = 0), t2.params.watchOverflow && t2.enabled && e3.el.classList[t2.isLocked ? "add" : "remove"](
            t2.params.scrollbar.lockClass
          );
        }
        function y2(e3) {
          return t2.isHorizontal() ? e3.clientX : e3.clientY;
        }
        function E2(e3) {
          const { scrollbar: s3, rtlTranslate: a2 } = t2, { el: i3 } = s3;
          let r3;
          r3 = (y2(e3) - w(i3)[t2.isHorizontal() ? "left" : "top"] - (null !== d2 ? d2 : c2 / 2)) / (p2 - c2), r3 = Math.max(Math.min(r3, 1), 0), a2 && (r3 = 1 - r3);
          const n2 = t2.minTranslate() + (t2.maxTranslate() - t2.minTranslate()) * r3;
          t2.updateProgress(n2), t2.setTranslate(n2), t2.updateActiveIndex(), t2.updateSlidesClasses();
        }
        function x2(e3) {
          const s3 = t2.params.scrollbar, { scrollbar: a2, wrapperEl: i3 } = t2, { el: n2, dragEl: l2 } = a2;
          m2 = true, d2 = e3.target === l2 ? y2(e3) - e3.target.getBoundingClientRect()[t2.isHorizontal() ? "left" : "top"] : null, e3.preventDefault(), e3.stopPropagation(), i3.style.transitionDuration = "100ms", l2.style.transitionDuration = "100ms", E2(e3), clearTimeout(f2), n2.style.transitionDuration = "0ms", s3.hide && (n2.style.opacity = 1), t2.params.cssMode && (t2.wrapperEl.style["scroll-snap-type"] = "none"), r2("scrollbarDragStart", e3);
        }
        function S2(e3) {
          const { scrollbar: s3, wrapperEl: a2 } = t2, { el: i3, dragEl: n2 } = s3;
          m2 && (e3.preventDefault && e3.cancelable ? e3.preventDefault() : e3.returnValue = false, E2(e3), a2.style.transitionDuration = "0ms", i3.style.transitionDuration = "0ms", n2.style.transitionDuration = "0ms", r2("scrollbarDragMove", e3));
        }
        function M2(e3) {
          const s3 = t2.params.scrollbar, { scrollbar: a2, wrapperEl: i3 } = t2, { el: n2 } = a2;
          m2 && (m2 = false, t2.params.cssMode && (t2.wrapperEl.style["scroll-snap-type"] = "", i3.style.transitionDuration = ""), s3.hide && (clearTimeout(f2), f2 = l(() => {
            n2.style.opacity = 0, n2.style.transitionDuration = "400ms";
          }, 1e3)), r2("scrollbarDragEnd", e3), s3.snapOnRelease && t2.slideToClosest());
        }
        function C2(e3) {
          const { scrollbar: s3, params: a2 } = t2, i3 = s3.el;
          if (!i3) return;
          const r3 = i3, n2 = !!a2.passiveListeners && { passive: false, capture: false }, l2 = !!a2.passiveListeners && { passive: true, capture: false };
          if (!r3) return;
          const d3 = "on" === e3 ? "addEventListener" : "removeEventListener";
          r3[d3]("pointerdown", x2, n2), o2[d3]("pointermove", S2, n2), o2[d3]("pointerup", M2, l2);
        }
        function P2() {
          const { scrollbar: e3, el: s3 } = t2;
          t2.params.scrollbar = re(
            t2,
            t2.originalParams.scrollbar,
            t2.params.scrollbar,
            { el: "swiper-scrollbar" }
          );
          const a2 = t2.params.scrollbar;
          if (!a2.el) return;
          let i3, r3;
          if ("string" == typeof a2.el && t2.isElement && (i3 = t2.el.querySelector(a2.el)), i3 || "string" != typeof a2.el)
            i3 || (i3 = a2.el);
          else if (i3 = o2.querySelectorAll(a2.el), !i3.length) return;
          t2.params.uniqueNavElements && "string" == typeof a2.el && i3.length > 1 && 1 === s3.querySelectorAll(a2.el).length && (i3 = s3.querySelector(a2.el)), i3.length > 0 && (i3 = i3[0]), i3.classList.add(
            t2.isHorizontal() ? a2.horizontalClass : a2.verticalClass
          ), i3 && (r3 = i3.querySelector(ne(t2.params.scrollbar.dragClass)), r3 || (r3 = v("div", t2.params.scrollbar.dragClass), i3.append(r3))), Object.assign(e3, { el: i3, dragEl: r3 }), a2.draggable && t2.params.scrollbar.el && t2.scrollbar.el && C2("on"), i3 && i3.classList[t2.enabled ? "remove" : "add"](
            ...n(t2.params.scrollbar.lockClass)
          );
        }
        function L2() {
          const e3 = t2.params.scrollbar, s3 = t2.scrollbar.el;
          s3 && s3.classList.remove(
            ...n(t2.isHorizontal() ? e3.horizontalClass : e3.verticalClass)
          ), t2.params.scrollbar.el && t2.scrollbar.el && C2("off");
        }
        s2({
          scrollbar: {
            el: null,
            dragSize: "auto",
            hide: false,
            draggable: false,
            snapOnRelease: true,
            lockClass: "swiper-scrollbar-lock",
            dragClass: "swiper-scrollbar-drag",
            scrollbarDisabledClass: "swiper-scrollbar-disabled",
            horizontalClass: "swiper-scrollbar-horizontal",
            verticalClass: "swiper-scrollbar-vertical"
          }
        }), t2.scrollbar = { el: null, dragEl: null }, i2("changeDirection", () => {
          if (!t2.scrollbar || !t2.scrollbar.el) return;
          const e3 = t2.params.scrollbar;
          let { el: s3 } = t2.scrollbar;
          s3 = T(s3), s3.forEach((s4) => {
            s4.classList.remove(e3.horizontalClass, e3.verticalClass), s4.classList.add(
              t2.isHorizontal() ? e3.horizontalClass : e3.verticalClass
            );
          });
        }), i2("init", () => {
          false === t2.params.scrollbar.enabled ? I2() : (P2(), b2(), g2());
        }), i2("update resize observerUpdate lock unlock changeDirection", () => {
          b2();
        }), i2("setTranslate", () => {
          g2();
        }), i2("setTransition", (e3, s3) => {
          !function(e4) {
            t2.params.scrollbar.el && t2.scrollbar.el && (t2.scrollbar.dragEl.style.transitionDuration = `${e4}ms`);
          }(s3);
        }), i2("enable disable", () => {
          const { el: e3 } = t2.scrollbar;
          e3 && e3.classList[t2.enabled ? "remove" : "add"](
            ...n(t2.params.scrollbar.lockClass)
          );
        }), i2("destroy", () => {
          L2();
        });
        const I2 = () => {
          t2.el.classList.add(...n(t2.params.scrollbar.scrollbarDisabledClass)), t2.scrollbar.el && t2.scrollbar.el.classList.add(
            ...n(t2.params.scrollbar.scrollbarDisabledClass)
          ), L2();
        };
        Object.assign(t2.scrollbar, {
          enable: () => {
            t2.el.classList.remove(
              ...n(t2.params.scrollbar.scrollbarDisabledClass)
            ), t2.scrollbar.el && t2.scrollbar.el.classList.remove(
              ...n(t2.params.scrollbar.scrollbarDisabledClass)
            ), P2(), b2(), g2();
          },
          disable: I2,
          updateSize: b2,
          setTranslate: g2,
          init: P2,
          destroy: L2
        });
      },
      function(e2) {
        let { swiper: t2, extendParams: s2, on: a2 } = e2;
        s2({ parallax: { enabled: false } });
        const i2 = "[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]", r2 = (e3, s3) => {
          const { rtl: a3 } = t2, i3 = a3 ? -1 : 1, r3 = e3.getAttribute("data-swiper-parallax") || "0";
          let n3 = e3.getAttribute("data-swiper-parallax-x"), l2 = e3.getAttribute("data-swiper-parallax-y");
          const o2 = e3.getAttribute("data-swiper-parallax-scale"), d2 = e3.getAttribute("data-swiper-parallax-opacity"), c2 = e3.getAttribute("data-swiper-parallax-rotate");
          if (n3 || l2 ? (n3 = n3 || "0", l2 = l2 || "0") : t2.isHorizontal() ? (n3 = r3, l2 = "0") : (l2 = r3, n3 = "0"), n3 = n3.indexOf("%") >= 0 ? parseInt(n3, 10) * s3 * i3 + "%" : n3 * s3 * i3 + "px", l2 = l2.indexOf("%") >= 0 ? parseInt(l2, 10) * s3 + "%" : l2 * s3 + "px", null != d2) {
            const t3 = d2 - (d2 - 1) * (1 - Math.abs(s3));
            e3.style.opacity = t3;
          }
          let p2 = `translate3d(${n3}, ${l2}, 0px)`;
          if (null != o2) {
            p2 += ` scale(${o2 - (o2 - 1) * (1 - Math.abs(s3))})`;
          }
          if (c2 && null != c2) {
            p2 += ` rotate(${c2 * s3 * -1}deg)`;
          }
          e3.style.transform = p2;
        }, n2 = () => {
          const {
            el: e3,
            slides: s3,
            progress: a3,
            snapGrid: n3,
            isElement: l2
          } = t2, o2 = f(e3, i2);
          t2.isElement && o2.push(...f(t2.hostEl, i2)), o2.forEach((e4) => {
            r2(e4, a3);
          }), s3.forEach((e4, s4) => {
            let l3 = e4.progress;
            t2.params.slidesPerGroup > 1 && "auto" !== t2.params.slidesPerView && (l3 += Math.ceil(s4 / 2) - a3 * (n3.length - 1)), l3 = Math.min(Math.max(l3, -1), 1), e4.querySelectorAll(`${i2}, [data-swiper-parallax-rotate]`).forEach((e5) => {
              r2(e5, l3);
            });
          });
        };
        a2("beforeInit", () => {
          t2.params.parallax.enabled && (t2.params.watchSlidesProgress = true, t2.originalParams.watchSlidesProgress = true);
        }), a2("init", () => {
          t2.params.parallax.enabled && n2();
        }), a2("setTranslate", () => {
          t2.params.parallax.enabled && n2();
        }), a2("setTransition", (e3, s3) => {
          t2.params.parallax.enabled && function(e4) {
            void 0 === e4 && (e4 = t2.params.speed);
            const { el: s4, hostEl: a3 } = t2, r3 = [...s4.querySelectorAll(i2)];
            t2.isElement && r3.push(...a3.querySelectorAll(i2)), r3.forEach((t3) => {
              let s5 = parseInt(
                t3.getAttribute("data-swiper-parallax-duration"),
                10
              ) || e4;
              0 === e4 && (s5 = 0), t3.style.transitionDuration = `${s5}ms`;
            });
          }(s3);
        });
      },
      function(e2) {
        let { swiper: t2, extendParams: s2, on: a2, emit: i2 } = e2;
        const n2 = r();
        s2({
          zoom: {
            enabled: false,
            limitToOriginalSize: false,
            maxRatio: 3,
            minRatio: 1,
            toggle: true,
            containerClass: "swiper-zoom-container",
            zoomedSlideClass: "swiper-slide-zoomed"
          }
        }), t2.zoom = { enabled: false };
        let l2, o2, c2 = 1, p2 = false;
        const u2 = [], m2 = {
          originX: 0,
          originY: 0,
          slideEl: void 0,
          slideWidth: void 0,
          slideHeight: void 0,
          imageEl: void 0,
          imageWrapEl: void 0,
          maxRatio: 3
        }, h2 = {
          isTouched: void 0,
          isMoved: void 0,
          currentX: void 0,
          currentY: void 0,
          minX: void 0,
          minY: void 0,
          maxX: void 0,
          maxY: void 0,
          width: void 0,
          height: void 0,
          startX: void 0,
          startY: void 0,
          touchesStart: {},
          touchesCurrent: {}
        }, g2 = {
          x: void 0,
          y: void 0,
          prevPositionX: void 0,
          prevPositionY: void 0,
          prevTime: void 0
        };
        let v2, b2 = 1;
        function y2() {
          if (u2.length < 2) return 1;
          const e3 = u2[0].pageX, t3 = u2[0].pageY, s3 = u2[1].pageX, a3 = u2[1].pageY;
          return Math.sqrt((s3 - e3) ** 2 + (a3 - t3) ** 2);
        }
        function x2() {
          const e3 = t2.params.zoom, s3 = m2.imageWrapEl.getAttribute("data-swiper-zoom") || e3.maxRatio;
          if (e3.limitToOriginalSize && m2.imageEl && m2.imageEl.naturalWidth) {
            const e4 = m2.imageEl.naturalWidth / m2.imageEl.offsetWidth;
            return Math.min(e4, s3);
          }
          return s3;
        }
        function S2(e3) {
          const s3 = t2.isElement ? "swiper-slide" : `.${t2.params.slideClass}`;
          return !!e3.target.matches(s3) || t2.slides.filter((t3) => t3.contains(e3.target)).length > 0;
        }
        function T2(e3) {
          if ("mouse" === e3.pointerType && u2.splice(0, u2.length), !S2(e3)) return;
          const s3 = t2.params.zoom;
          if (l2 = false, o2 = false, u2.push(e3), !(u2.length < 2)) {
            if (l2 = true, m2.scaleStart = y2(), !m2.slideEl) {
              m2.slideEl = e3.target.closest(
                `.${t2.params.slideClass}, swiper-slide`
              ), m2.slideEl || (m2.slideEl = t2.slides[t2.activeIndex]);
              let a3 = m2.slideEl.querySelector(`.${s3.containerClass}`);
              if (a3 && (a3 = a3.querySelectorAll(
                "picture, img, svg, canvas, .swiper-zoom-target"
              )[0]), m2.imageEl = a3, m2.imageWrapEl = a3 ? E(m2.imageEl, `.${s3.containerClass}`)[0] : void 0, !m2.imageWrapEl)
                return void (m2.imageEl = void 0);
              m2.maxRatio = x2();
            }
            if (m2.imageEl) {
              const [e4, t3] = function() {
                if (u2.length < 2) return { x: null, y: null };
                const e5 = m2.imageEl.getBoundingClientRect();
                return [
                  (u2[0].pageX + (u2[1].pageX - u2[0].pageX) / 2 - e5.x - n2.scrollX) / c2,
                  (u2[0].pageY + (u2[1].pageY - u2[0].pageY) / 2 - e5.y - n2.scrollY) / c2
                ];
              }();
              m2.originX = e4, m2.originY = t3, m2.imageEl.style.transitionDuration = "0ms";
            }
            p2 = true;
          }
        }
        function M2(e3) {
          if (!S2(e3)) return;
          const s3 = t2.params.zoom, a3 = t2.zoom, i3 = u2.findIndex((t3) => t3.pointerId === e3.pointerId);
          i3 >= 0 && (u2[i3] = e3), u2.length < 2 || (o2 = true, m2.scaleMove = y2(), m2.imageEl && (a3.scale = m2.scaleMove / m2.scaleStart * c2, a3.scale > m2.maxRatio && (a3.scale = m2.maxRatio - 1 + (a3.scale - m2.maxRatio + 1) ** 0.5), a3.scale < s3.minRatio && (a3.scale = s3.minRatio + 1 - (s3.minRatio - a3.scale + 1) ** 0.5), m2.imageEl.style.transform = `translate3d(0,0,0) scale(${a3.scale})`));
        }
        function C2(e3) {
          if (!S2(e3)) return;
          if ("mouse" === e3.pointerType && "pointerout" === e3.type) return;
          const s3 = t2.params.zoom, a3 = t2.zoom, i3 = u2.findIndex((t3) => t3.pointerId === e3.pointerId);
          i3 >= 0 && u2.splice(i3, 1), l2 && o2 && (l2 = false, o2 = false, m2.imageEl && (a3.scale = Math.max(Math.min(a3.scale, m2.maxRatio), s3.minRatio), m2.imageEl.style.transitionDuration = `${t2.params.speed}ms`, m2.imageEl.style.transform = `translate3d(0,0,0) scale(${a3.scale})`, c2 = a3.scale, p2 = false, a3.scale > 1 && m2.slideEl ? m2.slideEl.classList.add(`${s3.zoomedSlideClass}`) : a3.scale <= 1 && m2.slideEl && m2.slideEl.classList.remove(`${s3.zoomedSlideClass}`), 1 === a3.scale && (m2.originX = 0, m2.originY = 0, m2.slideEl = void 0)));
        }
        function P2() {
          t2.touchEventsData.preventTouchMoveFromPointerMove = false;
        }
        function L2(e3) {
          if (!S2(e3) || !function(e4) {
            const s4 = `.${t2.params.zoom.containerClass}`;
            return !!e4.target.matches(s4) || [...t2.hostEl.querySelectorAll(s4)].filter(
              (t3) => t3.contains(e4.target)
            ).length > 0;
          }(e3))
            return;
          const s3 = t2.zoom;
          if (!m2.imageEl) return;
          if (!h2.isTouched || !m2.slideEl) return;
          h2.isMoved || (h2.width = m2.imageEl.offsetWidth || m2.imageEl.clientWidth, h2.height = m2.imageEl.offsetHeight || m2.imageEl.clientHeight, h2.startX = d(m2.imageWrapEl, "x") || 0, h2.startY = d(m2.imageWrapEl, "y") || 0, m2.slideWidth = m2.slideEl.offsetWidth, m2.slideHeight = m2.slideEl.offsetHeight, m2.imageWrapEl.style.transitionDuration = "0ms");
          const a3 = h2.width * s3.scale, i3 = h2.height * s3.scale;
          h2.minX = Math.min(m2.slideWidth / 2 - a3 / 2, 0), h2.maxX = -h2.minX, h2.minY = Math.min(m2.slideHeight / 2 - i3 / 2, 0), h2.maxY = -h2.minY, h2.touchesCurrent.x = u2.length > 0 ? u2[0].pageX : e3.pageX, h2.touchesCurrent.y = u2.length > 0 ? u2[0].pageY : e3.pageY;
          if (Math.max(
            Math.abs(h2.touchesCurrent.x - h2.touchesStart.x),
            Math.abs(h2.touchesCurrent.y - h2.touchesStart.y)
          ) > 5 && (t2.allowClick = false), !h2.isMoved && !p2) {
            if (t2.isHorizontal() && (Math.floor(h2.minX) === Math.floor(h2.startX) && h2.touchesCurrent.x < h2.touchesStart.x || Math.floor(h2.maxX) === Math.floor(h2.startX) && h2.touchesCurrent.x > h2.touchesStart.x))
              return h2.isTouched = false, void P2();
            if (!t2.isHorizontal() && (Math.floor(h2.minY) === Math.floor(h2.startY) && h2.touchesCurrent.y < h2.touchesStart.y || Math.floor(h2.maxY) === Math.floor(h2.startY) && h2.touchesCurrent.y > h2.touchesStart.y))
              return h2.isTouched = false, void P2();
          }
          e3.cancelable && e3.preventDefault(), e3.stopPropagation(), clearTimeout(v2), t2.touchEventsData.preventTouchMoveFromPointerMove = true, v2 = setTimeout(() => {
            t2.destroyed || P2();
          }), h2.isMoved = true;
          const r2 = (s3.scale - c2) / (m2.maxRatio - t2.params.zoom.minRatio), { originX: n3, originY: l3 } = m2;
          h2.currentX = h2.touchesCurrent.x - h2.touchesStart.x + h2.startX + r2 * (h2.width - 2 * n3), h2.currentY = h2.touchesCurrent.y - h2.touchesStart.y + h2.startY + r2 * (h2.height - 2 * l3), h2.currentX < h2.minX && (h2.currentX = h2.minX + 1 - (h2.minX - h2.currentX + 1) ** 0.8), h2.currentX > h2.maxX && (h2.currentX = h2.maxX - 1 + (h2.currentX - h2.maxX + 1) ** 0.8), h2.currentY < h2.minY && (h2.currentY = h2.minY + 1 - (h2.minY - h2.currentY + 1) ** 0.8), h2.currentY > h2.maxY && (h2.currentY = h2.maxY - 1 + (h2.currentY - h2.maxY + 1) ** 0.8), g2.prevPositionX || (g2.prevPositionX = h2.touchesCurrent.x), g2.prevPositionY || (g2.prevPositionY = h2.touchesCurrent.y), g2.prevTime || (g2.prevTime = Date.now()), g2.x = (h2.touchesCurrent.x - g2.prevPositionX) / (Date.now() - g2.prevTime) / 2, g2.y = (h2.touchesCurrent.y - g2.prevPositionY) / (Date.now() - g2.prevTime) / 2, Math.abs(h2.touchesCurrent.x - g2.prevPositionX) < 2 && (g2.x = 0), Math.abs(h2.touchesCurrent.y - g2.prevPositionY) < 2 && (g2.y = 0), g2.prevPositionX = h2.touchesCurrent.x, g2.prevPositionY = h2.touchesCurrent.y, g2.prevTime = Date.now(), m2.imageWrapEl.style.transform = `translate3d(${h2.currentX}px, ${h2.currentY}px,0)`;
        }
        function I2() {
          const e3 = t2.zoom;
          m2.slideEl && t2.activeIndex !== t2.slides.indexOf(m2.slideEl) && (m2.imageEl && (m2.imageEl.style.transform = "translate3d(0,0,0) scale(1)"), m2.imageWrapEl && (m2.imageWrapEl.style.transform = "translate3d(0,0,0)"), m2.slideEl.classList.remove(`${t2.params.zoom.zoomedSlideClass}`), e3.scale = 1, c2 = 1, m2.slideEl = void 0, m2.imageEl = void 0, m2.imageWrapEl = void 0, m2.originX = 0, m2.originY = 0);
        }
        function z2(e3) {
          const s3 = t2.zoom, a3 = t2.params.zoom;
          if (!m2.slideEl) {
            e3 && e3.target && (m2.slideEl = e3.target.closest(
              `.${t2.params.slideClass}, swiper-slide`
            )), m2.slideEl || (t2.params.virtual && t2.params.virtual.enabled && t2.virtual ? m2.slideEl = f(
              t2.slidesEl,
              `.${t2.params.slideActiveClass}`
            )[0] : m2.slideEl = t2.slides[t2.activeIndex]);
            let s4 = m2.slideEl.querySelector(`.${a3.containerClass}`);
            s4 && (s4 = s4.querySelectorAll(
              "picture, img, svg, canvas, .swiper-zoom-target"
            )[0]), m2.imageEl = s4, m2.imageWrapEl = s4 ? E(m2.imageEl, `.${a3.containerClass}`)[0] : void 0;
          }
          if (!m2.imageEl || !m2.imageWrapEl) return;
          let i3, r2, l3, o3, d2, p3, u3, g3, v3, b3, y3, S3, T3, M3, C3, P3, L3, I3;
          t2.params.cssMode && (t2.wrapperEl.style.overflow = "hidden", t2.wrapperEl.style.touchAction = "none"), m2.slideEl.classList.add(`${a3.zoomedSlideClass}`), void 0 === h2.touchesStart.x && e3 ? (i3 = e3.pageX, r2 = e3.pageY) : (i3 = h2.touchesStart.x, r2 = h2.touchesStart.y);
          const z3 = "number" == typeof e3 ? e3 : null;
          1 === c2 && z3 && (i3 = void 0, r2 = void 0, h2.touchesStart.x = void 0, h2.touchesStart.y = void 0);
          const A3 = x2();
          s3.scale = z3 || A3, c2 = z3 || A3, !e3 || 1 === c2 && z3 ? (u3 = 0, g3 = 0) : (L3 = m2.slideEl.offsetWidth, I3 = m2.slideEl.offsetHeight, l3 = w(m2.slideEl).left + n2.scrollX, o3 = w(m2.slideEl).top + n2.scrollY, d2 = l3 + L3 / 2 - i3, p3 = o3 + I3 / 2 - r2, v3 = m2.imageEl.offsetWidth || m2.imageEl.clientWidth, b3 = m2.imageEl.offsetHeight || m2.imageEl.clientHeight, y3 = v3 * s3.scale, S3 = b3 * s3.scale, T3 = Math.min(L3 / 2 - y3 / 2, 0), M3 = Math.min(I3 / 2 - S3 / 2, 0), C3 = -T3, P3 = -M3, u3 = d2 * s3.scale, g3 = p3 * s3.scale, u3 < T3 && (u3 = T3), u3 > C3 && (u3 = C3), g3 < M3 && (g3 = M3), g3 > P3 && (g3 = P3)), z3 && 1 === s3.scale && (m2.originX = 0, m2.originY = 0), m2.imageWrapEl.style.transitionDuration = "300ms", m2.imageWrapEl.style.transform = `translate3d(${u3}px, ${g3}px,0)`, m2.imageEl.style.transitionDuration = "300ms", m2.imageEl.style.transform = `translate3d(0,0,0) scale(${s3.scale})`;
        }
        function A2() {
          const e3 = t2.zoom, s3 = t2.params.zoom;
          if (!m2.slideEl) {
            t2.params.virtual && t2.params.virtual.enabled && t2.virtual ? m2.slideEl = f(t2.slidesEl, `.${t2.params.slideActiveClass}`)[0] : m2.slideEl = t2.slides[t2.activeIndex];
            let e4 = m2.slideEl.querySelector(`.${s3.containerClass}`);
            e4 && (e4 = e4.querySelectorAll(
              "picture, img, svg, canvas, .swiper-zoom-target"
            )[0]), m2.imageEl = e4, m2.imageWrapEl = e4 ? E(m2.imageEl, `.${s3.containerClass}`)[0] : void 0;
          }
          m2.imageEl && m2.imageWrapEl && (t2.params.cssMode && (t2.wrapperEl.style.overflow = "", t2.wrapperEl.style.touchAction = ""), e3.scale = 1, c2 = 1, h2.touchesStart.x = void 0, h2.touchesStart.y = void 0, m2.imageWrapEl.style.transitionDuration = "300ms", m2.imageWrapEl.style.transform = "translate3d(0,0,0)", m2.imageEl.style.transitionDuration = "300ms", m2.imageEl.style.transform = "translate3d(0,0,0) scale(1)", m2.slideEl.classList.remove(`${s3.zoomedSlideClass}`), m2.slideEl = void 0, m2.originX = 0, m2.originY = 0);
        }
        function $2(e3) {
          const s3 = t2.zoom;
          s3.scale && 1 !== s3.scale ? A2() : z2(e3);
        }
        function k2() {
          return {
            passiveListener: !!t2.params.passiveListeners && {
              passive: true,
              capture: false
            },
            activeListenerWithCapture: !t2.params.passiveListeners || {
              passive: false,
              capture: true
            }
          };
        }
        function O2() {
          const e3 = t2.zoom;
          if (e3.enabled) return;
          e3.enabled = true;
          const { passiveListener: s3, activeListenerWithCapture: a3 } = k2();
          t2.wrapperEl.addEventListener("pointerdown", T2, s3), t2.wrapperEl.addEventListener("pointermove", M2, a3), ["pointerup", "pointercancel", "pointerout"].forEach((e4) => {
            t2.wrapperEl.addEventListener(e4, C2, s3);
          }), t2.wrapperEl.addEventListener("pointermove", L2, a3);
        }
        function D2() {
          const e3 = t2.zoom;
          if (!e3.enabled) return;
          e3.enabled = false;
          const { passiveListener: s3, activeListenerWithCapture: a3 } = k2();
          t2.wrapperEl.removeEventListener("pointerdown", T2, s3), t2.wrapperEl.removeEventListener("pointermove", M2, a3), ["pointerup", "pointercancel", "pointerout"].forEach((e4) => {
            t2.wrapperEl.removeEventListener(e4, C2, s3);
          }), t2.wrapperEl.removeEventListener("pointermove", L2, a3);
        }
        Object.defineProperty(t2.zoom, "scale", {
          get: () => b2,
          set(e3) {
            if (b2 !== e3) {
              const t3 = m2.imageEl, s3 = m2.slideEl;
              i2("zoomChange", e3, t3, s3);
            }
            b2 = e3;
          }
        }), a2("init", () => {
          t2.params.zoom.enabled && O2();
        }), a2("destroy", () => {
          D2();
        }), a2("touchStart", (e3, s3) => {
          t2.zoom.enabled && function(e4) {
            const s4 = t2.device;
            if (!m2.imageEl) return;
            if (h2.isTouched) return;
            s4.android && e4.cancelable && e4.preventDefault(), h2.isTouched = true;
            const a3 = u2.length > 0 ? u2[0] : e4;
            h2.touchesStart.x = a3.pageX, h2.touchesStart.y = a3.pageY;
          }(s3);
        }), a2("touchEnd", (e3, s3) => {
          t2.zoom.enabled && function() {
            const e4 = t2.zoom;
            if (!m2.imageEl) return;
            if (!h2.isTouched || !h2.isMoved)
              return h2.isTouched = false, void (h2.isMoved = false);
            h2.isTouched = false, h2.isMoved = false;
            let s4 = 300, a3 = 300;
            const i3 = g2.x * s4, r2 = h2.currentX + i3, n3 = g2.y * a3, l3 = h2.currentY + n3;
            0 !== g2.x && (s4 = Math.abs((r2 - h2.currentX) / g2.x)), 0 !== g2.y && (a3 = Math.abs((l3 - h2.currentY) / g2.y));
            const o3 = Math.max(s4, a3);
            h2.currentX = r2, h2.currentY = l3;
            const d2 = h2.width * e4.scale, c3 = h2.height * e4.scale;
            h2.minX = Math.min(m2.slideWidth / 2 - d2 / 2, 0), h2.maxX = -h2.minX, h2.minY = Math.min(m2.slideHeight / 2 - c3 / 2, 0), h2.maxY = -h2.minY, h2.currentX = Math.max(Math.min(h2.currentX, h2.maxX), h2.minX), h2.currentY = Math.max(Math.min(h2.currentY, h2.maxY), h2.minY), m2.imageWrapEl.style.transitionDuration = `${o3}ms`, m2.imageWrapEl.style.transform = `translate3d(${h2.currentX}px, ${h2.currentY}px,0)`;
          }();
        }), a2("doubleTap", (e3, s3) => {
          !t2.animating && t2.params.zoom.enabled && t2.zoom.enabled && t2.params.zoom.toggle && $2(s3);
        }), a2("transitionEnd", () => {
          t2.zoom.enabled && t2.params.zoom.enabled && I2();
        }), a2("slideChange", () => {
          t2.zoom.enabled && t2.params.zoom.enabled && t2.params.cssMode && I2();
        }), Object.assign(t2.zoom, {
          enable: O2,
          disable: D2,
          in: z2,
          out: A2,
          toggle: $2
        });
      },
      function(e2) {
        let { swiper: t2, extendParams: s2, on: a2 } = e2;
        function i2(e3, t3) {
          const s3 = /* @__PURE__ */ function() {
            let e4, t4, s4;
            return (a4, i4) => {
              for (t4 = -1, e4 = a4.length; e4 - t4 > 1; )
                s4 = e4 + t4 >> 1, a4[s4] <= i4 ? t4 = s4 : e4 = s4;
              return e4;
            };
          }();
          let a3, i3;
          return this.x = e3, this.y = t3, this.lastIndex = e3.length - 1, this.interpolate = function(e4) {
            return e4 ? (i3 = s3(this.x, e4), a3 = i3 - 1, (e4 - this.x[a3]) * (this.y[i3] - this.y[a3]) / (this.x[i3] - this.x[a3]) + this.y[a3]) : 0;
          }, this;
        }
        function r2() {
          t2.controller.control && t2.controller.spline && (t2.controller.spline = void 0, delete t2.controller.spline);
        }
        s2({ controller: { control: void 0, inverse: false, by: "slide" } }), t2.controller = { control: void 0 }, a2("beforeInit", () => {
          if ("undefined" != typeof window && ("string" == typeof t2.params.controller.control || t2.params.controller.control instanceof HTMLElement)) {
            ("string" == typeof t2.params.controller.control ? [...document.querySelectorAll(t2.params.controller.control)] : [t2.params.controller.control]).forEach((e3) => {
              if (t2.controller.control || (t2.controller.control = []), e3 && e3.swiper)
                t2.controller.control.push(e3.swiper);
              else if (e3) {
                const s3 = `${t2.params.eventsPrefix}init`, a3 = (i3) => {
                  t2.controller.control.push(i3.detail[0]), t2.update(), e3.removeEventListener(s3, a3);
                };
                e3.addEventListener(s3, a3);
              }
            });
          } else t2.controller.control = t2.params.controller.control;
        }), a2("update", () => {
          r2();
        }), a2("resize", () => {
          r2();
        }), a2("observerUpdate", () => {
          r2();
        }), a2("setTranslate", (e3, s3, a3) => {
          t2.controller.control && !t2.controller.control.destroyed && t2.controller.setTranslate(s3, a3);
        }), a2("setTransition", (e3, s3, a3) => {
          t2.controller.control && !t2.controller.control.destroyed && t2.controller.setTransition(s3, a3);
        }), Object.assign(t2.controller, {
          setTranslate: function(e3, s3) {
            const a3 = t2.controller.control;
            let r3, n2;
            const l2 = t2.constructor;
            function o2(e4) {
              if (e4.destroyed) return;
              const s4 = t2.rtlTranslate ? -t2.translate : t2.translate;
              "slide" === t2.params.controller.by && (!function(e5) {
                t2.controller.spline = t2.params.loop ? new i2(t2.slidesGrid, e5.slidesGrid) : new i2(t2.snapGrid, e5.snapGrid);
              }(e4), n2 = -t2.controller.spline.interpolate(-s4)), n2 && "container" !== t2.params.controller.by || (r3 = (e4.maxTranslate() - e4.minTranslate()) / (t2.maxTranslate() - t2.minTranslate()), !Number.isNaN(r3) && Number.isFinite(r3) || (r3 = 1), n2 = (s4 - t2.minTranslate()) * r3 + e4.minTranslate()), t2.params.controller.inverse && (n2 = e4.maxTranslate() - n2), e4.updateProgress(n2), e4.setTranslate(n2, t2), e4.updateActiveIndex(), e4.updateSlidesClasses();
            }
            if (Array.isArray(a3))
              for (let e4 = 0; e4 < a3.length; e4 += 1)
                a3[e4] !== s3 && a3[e4] instanceof l2 && o2(a3[e4]);
            else a3 instanceof l2 && s3 !== a3 && o2(a3);
          },
          setTransition: function(e3, s3) {
            const a3 = t2.constructor, i3 = t2.controller.control;
            let r3;
            function n2(s4) {
              s4.destroyed || (s4.setTransition(e3, t2), 0 !== e3 && (s4.transitionStart(), s4.params.autoHeight && l(() => {
                s4.updateAutoHeight();
              }), x(s4.wrapperEl, () => {
                i3 && s4.transitionEnd();
              })));
            }
            if (Array.isArray(i3))
              for (r3 = 0; r3 < i3.length; r3 += 1)
                i3[r3] !== s3 && i3[r3] instanceof a3 && n2(i3[r3]);
            else i3 instanceof a3 && s3 !== i3 && n2(i3);
          }
        });
      },
      function(e2) {
        let { swiper: t2, extendParams: s2, on: i2 } = e2;
        s2({
          a11y: {
            enabled: true,
            notificationClass: "swiper-notification",
            prevSlideMessage: "Previous slide",
            nextSlideMessage: "Next slide",
            firstSlideMessage: "This is the first slide",
            lastSlideMessage: "This is the last slide",
            paginationBulletMessage: "Go to slide {{index}}",
            slideLabelMessage: "{{index}} / {{slidesLength}}",
            containerMessage: null,
            containerRoleDescriptionMessage: null,
            containerRole: null,
            itemRoleDescriptionMessage: null,
            slideRole: "group",
            id: null,
            scrollOnFocus: true
          }
        }), t2.a11y = { clicked: false };
        let r2, n2, l2 = null, o2 = (/* @__PURE__ */ new Date()).getTime();
        function d2(e3) {
          const t3 = l2;
          0 !== t3.length && (t3.innerHTML = "", t3.innerHTML = e3);
        }
        function c2(e3) {
          (e3 = T(e3)).forEach((e4) => {
            e4.setAttribute("tabIndex", "0");
          });
        }
        function p2(e3) {
          (e3 = T(e3)).forEach((e4) => {
            e4.setAttribute("tabIndex", "-1");
          });
        }
        function u2(e3, t3) {
          (e3 = T(e3)).forEach((e4) => {
            e4.setAttribute("role", t3);
          });
        }
        function m2(e3, t3) {
          (e3 = T(e3)).forEach((e4) => {
            e4.setAttribute("aria-roledescription", t3);
          });
        }
        function h2(e3, t3) {
          (e3 = T(e3)).forEach((e4) => {
            e4.setAttribute("aria-label", t3);
          });
        }
        function f2(e3) {
          (e3 = T(e3)).forEach((e4) => {
            e4.setAttribute("aria-disabled", true);
          });
        }
        function g2(e3) {
          (e3 = T(e3)).forEach((e4) => {
            e4.setAttribute("aria-disabled", false);
          });
        }
        function w2(e3) {
          if (13 !== e3.keyCode && 32 !== e3.keyCode) return;
          const s3 = t2.params.a11y, a2 = e3.target;
          if (!t2.pagination || !t2.pagination.el || a2 !== t2.pagination.el && !t2.pagination.el.contains(e3.target) || e3.target.matches(ne(t2.params.pagination.bulletClass))) {
            if (t2.navigation && t2.navigation.prevEl && t2.navigation.nextEl) {
              const e4 = T(t2.navigation.prevEl);
              T(t2.navigation.nextEl).includes(a2) && (t2.isEnd && !t2.params.loop || t2.slideNext(), t2.isEnd ? d2(s3.lastSlideMessage) : d2(s3.nextSlideMessage)), e4.includes(a2) && (t2.isBeginning && !t2.params.loop || t2.slidePrev(), t2.isBeginning ? d2(s3.firstSlideMessage) : d2(s3.prevSlideMessage));
            }
            t2.pagination && a2.matches(ne(t2.params.pagination.bulletClass)) && a2.click();
          }
        }
        function b2() {
          return t2.pagination && t2.pagination.bullets && t2.pagination.bullets.length;
        }
        function E2() {
          return b2() && t2.params.pagination.clickable;
        }
        const x2 = (e3, t3, s3) => {
          c2(e3), "BUTTON" !== e3.tagName && (u2(e3, "button"), e3.addEventListener("keydown", w2)), h2(e3, s3), function(e4, t4) {
            (e4 = T(e4)).forEach((e5) => {
              e5.setAttribute("aria-controls", t4);
            });
          }(e3, t3);
        }, S2 = (e3) => {
          n2 && n2 !== e3.target && !n2.contains(e3.target) && (r2 = true), t2.a11y.clicked = true;
        }, M2 = () => {
          r2 = false, requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              t2.destroyed || (t2.a11y.clicked = false);
            });
          });
        }, C2 = (e3) => {
          o2 = (/* @__PURE__ */ new Date()).getTime();
        }, P2 = (e3) => {
          if (t2.a11y.clicked || !t2.params.a11y.scrollOnFocus) return;
          if ((/* @__PURE__ */ new Date()).getTime() - o2 < 100) return;
          const s3 = e3.target.closest(`.${t2.params.slideClass}, swiper-slide`);
          if (!s3 || !t2.slides.includes(s3)) return;
          n2 = s3;
          const a2 = t2.slides.indexOf(s3) === t2.activeIndex, i3 = t2.params.watchSlidesProgress && t2.visibleSlides && t2.visibleSlides.includes(s3);
          a2 || i3 || e3.sourceCapabilities && e3.sourceCapabilities.firesTouchEvents || (t2.isHorizontal() ? t2.el.scrollLeft = 0 : t2.el.scrollTop = 0, requestAnimationFrame(() => {
            r2 || (t2.params.loop ? t2.slideToLoop(
              parseInt(s3.getAttribute("data-swiper-slide-index")),
              0
            ) : t2.slideTo(t2.slides.indexOf(s3), 0), r2 = false);
          }));
        }, L2 = () => {
          const e3 = t2.params.a11y;
          e3.itemRoleDescriptionMessage && m2(t2.slides, e3.itemRoleDescriptionMessage), e3.slideRole && u2(t2.slides, e3.slideRole);
          const s3 = t2.slides.length;
          e3.slideLabelMessage && t2.slides.forEach((a2, i3) => {
            const r3 = t2.params.loop ? parseInt(a2.getAttribute("data-swiper-slide-index"), 10) : i3;
            h2(
              a2,
              e3.slideLabelMessage.replace(/\{\{index\}\}/, r3 + 1).replace(/\{\{slidesLength\}\}/, s3)
            );
          });
        }, I2 = () => {
          const e3 = t2.params.a11y;
          t2.el.append(l2);
          const s3 = t2.el;
          e3.containerRoleDescriptionMessage && m2(s3, e3.containerRoleDescriptionMessage), e3.containerMessage && h2(s3, e3.containerMessage), e3.containerRole && u2(s3, e3.containerRole);
          const i3 = t2.wrapperEl, r3 = e3.id || i3.getAttribute("id") || `swiper-wrapper-${n3 = 16, void 0 === n3 && (n3 = 16), "x".repeat(n3).replace(/x/g, () => Math.round(16 * Math.random()).toString(16))}`;
          var n3;
          const o3 = t2.params.autoplay && t2.params.autoplay.enabled ? "off" : "polite";
          var d3;
          d3 = r3, T(i3).forEach((e4) => {
            e4.setAttribute("id", d3);
          }), function(e4, t3) {
            (e4 = T(e4)).forEach((e5) => {
              e5.setAttribute("aria-live", t3);
            });
          }(i3, o3), L2();
          let { nextEl: c3, prevEl: p3 } = t2.navigation ? t2.navigation : {};
          if (c3 = T(c3), p3 = T(p3), c3 && c3.forEach((t3) => x2(t3, r3, e3.nextSlideMessage)), p3 && p3.forEach((t3) => x2(t3, r3, e3.prevSlideMessage)), E2()) {
            T(t2.pagination.el).forEach((e4) => {
              e4.addEventListener("keydown", w2);
            });
          }
          a().addEventListener("visibilitychange", C2), t2.el.addEventListener("focus", P2, true), t2.el.addEventListener("focus", P2, true), t2.el.addEventListener("pointerdown", S2, true), t2.el.addEventListener("pointerup", M2, true);
        };
        i2("beforeInit", () => {
          l2 = v("span", t2.params.a11y.notificationClass), l2.setAttribute("aria-live", "assertive"), l2.setAttribute("aria-atomic", "true");
        }), i2("afterInit", () => {
          t2.params.a11y.enabled && I2();
        }), i2(
          "slidesLengthChange snapGridLengthChange slidesGridLengthChange",
          () => {
            t2.params.a11y.enabled && L2();
          }
        ), i2("fromEdge toEdge afterInit lock unlock", () => {
          t2.params.a11y.enabled && function() {
            if (t2.params.loop || t2.params.rewind || !t2.navigation) return;
            const { nextEl: e3, prevEl: s3 } = t2.navigation;
            s3 && (t2.isBeginning ? (f2(s3), p2(s3)) : (g2(s3), c2(s3))), e3 && (t2.isEnd ? (f2(e3), p2(e3)) : (g2(e3), c2(e3)));
          }();
        }), i2("paginationUpdate", () => {
          t2.params.a11y.enabled && function() {
            const e3 = t2.params.a11y;
            b2() && t2.pagination.bullets.forEach((s3) => {
              t2.params.pagination.clickable && (c2(s3), t2.params.pagination.renderBullet || (u2(s3, "button"), h2(
                s3,
                e3.paginationBulletMessage.replace(
                  /\{\{index\}\}/,
                  y(s3) + 1
                )
              ))), s3.matches(ne(t2.params.pagination.bulletActiveClass)) ? s3.setAttribute("aria-current", "true") : s3.removeAttribute("aria-current");
            });
          }();
        }), i2("destroy", () => {
          t2.params.a11y.enabled && function() {
            l2 && l2.remove();
            let { nextEl: e3, prevEl: s3 } = t2.navigation ? t2.navigation : {};
            e3 = T(e3), s3 = T(s3), e3 && e3.forEach((e4) => e4.removeEventListener("keydown", w2)), s3 && s3.forEach((e4) => e4.removeEventListener("keydown", w2)), E2() && T(t2.pagination.el).forEach((e4) => {
              e4.removeEventListener("keydown", w2);
            });
            a().removeEventListener("visibilitychange", C2), t2.el && "string" != typeof t2.el && (t2.el.removeEventListener("focus", P2, true), t2.el.removeEventListener("pointerdown", S2, true), t2.el.removeEventListener("pointerup", M2, true));
          }();
        });
      },
      function(e2) {
        let { swiper: t2, extendParams: s2, on: a2 } = e2;
        s2({
          history: {
            enabled: false,
            root: "",
            replaceState: false,
            key: "slides",
            keepQuery: false
          }
        });
        let i2 = false, n2 = {};
        const l2 = (e3) => e3.toString().replace(/\s+/g, "-").replace(/[^\w-]+/g, "").replace(/--+/g, "-").replace(/^-+/, "").replace(/-+$/, ""), o2 = (e3) => {
          const t3 = r();
          let s3;
          s3 = e3 ? new URL(e3) : t3.location;
          const a3 = s3.pathname.slice(1).split("/").filter((e4) => "" !== e4), i3 = a3.length;
          return { key: a3[i3 - 2], value: a3[i3 - 1] };
        }, d2 = (e3, s3) => {
          const a3 = r();
          if (!i2 || !t2.params.history.enabled) return;
          let n3;
          n3 = t2.params.url ? new URL(t2.params.url) : a3.location;
          const o3 = t2.virtual && t2.params.virtual.enabled ? t2.slidesEl.querySelector(`[data-swiper-slide-index="${s3}"]`) : t2.slides[s3];
          let d3 = l2(o3.getAttribute("data-history"));
          if (t2.params.history.root.length > 0) {
            let s4 = t2.params.history.root;
            "/" === s4[s4.length - 1] && (s4 = s4.slice(0, s4.length - 1)), d3 = `${s4}/${e3 ? `${e3}/` : ""}${d3}`;
          } else n3.pathname.includes(e3) || (d3 = `${e3 ? `${e3}/` : ""}${d3}`);
          t2.params.history.keepQuery && (d3 += n3.search);
          const c3 = a3.history.state;
          c3 && c3.value === d3 || (t2.params.history.replaceState ? a3.history.replaceState({ value: d3 }, null, d3) : a3.history.pushState({ value: d3 }, null, d3));
        }, c2 = (e3, s3, a3) => {
          if (s3)
            for (let i3 = 0, r2 = t2.slides.length; i3 < r2; i3 += 1) {
              const r3 = t2.slides[i3];
              if (l2(r3.getAttribute("data-history")) === s3) {
                const s4 = t2.getSlideIndex(r3);
                t2.slideTo(s4, e3, a3);
              }
            }
          else t2.slideTo(0, e3, a3);
        }, p2 = () => {
          n2 = o2(t2.params.url), c2(t2.params.speed, n2.value, false);
        };
        a2("init", () => {
          t2.params.history.enabled && (() => {
            const e3 = r();
            if (t2.params.history) {
              if (!e3.history || !e3.history.pushState)
                return t2.params.history.enabled = false, void (t2.params.hashNavigation.enabled = true);
              i2 = true, n2 = o2(t2.params.url), n2.key || n2.value ? (c2(0, n2.value, t2.params.runCallbacksOnInit), t2.params.history.replaceState || e3.addEventListener("popstate", p2)) : t2.params.history.replaceState || e3.addEventListener("popstate", p2);
            }
          })();
        }), a2("destroy", () => {
          t2.params.history.enabled && (() => {
            const e3 = r();
            t2.params.history.replaceState || e3.removeEventListener("popstate", p2);
          })();
        }), a2("transitionEnd _freeModeNoMomentumRelease", () => {
          i2 && d2(t2.params.history.key, t2.activeIndex);
        }), a2("slideChange", () => {
          i2 && t2.params.cssMode && d2(t2.params.history.key, t2.activeIndex);
        });
      },
      function(e2) {
        let { swiper: t2, extendParams: s2, emit: i2, on: n2 } = e2, l2 = false;
        const o2 = a(), d2 = r();
        s2({
          hashNavigation: {
            enabled: false,
            replaceState: false,
            watchState: false,
            getSlideIndex(e3, s3) {
              if (t2.virtual && t2.params.virtual.enabled) {
                const e4 = t2.slides.filter(
                  (e5) => e5.getAttribute("data-hash") === s3
                )[0];
                if (!e4) return 0;
                return parseInt(e4.getAttribute("data-swiper-slide-index"), 10);
              }
              return t2.getSlideIndex(
                f(
                  t2.slidesEl,
                  `.${t2.params.slideClass}[data-hash="${s3}"], swiper-slide[data-hash="${s3}"]`
                )[0]
              );
            }
          }
        });
        const c2 = () => {
          i2("hashChange");
          const e3 = o2.location.hash.replace("#", ""), s3 = t2.virtual && t2.params.virtual.enabled ? t2.slidesEl.querySelector(
            `[data-swiper-slide-index="${t2.activeIndex}"]`
          ) : t2.slides[t2.activeIndex];
          if (e3 !== (s3 ? s3.getAttribute("data-hash") : "")) {
            const s4 = t2.params.hashNavigation.getSlideIndex(t2, e3);
            if (void 0 === s4 || Number.isNaN(s4)) return;
            t2.slideTo(s4);
          }
        }, p2 = () => {
          if (!l2 || !t2.params.hashNavigation.enabled) return;
          const e3 = t2.virtual && t2.params.virtual.enabled ? t2.slidesEl.querySelector(
            `[data-swiper-slide-index="${t2.activeIndex}"]`
          ) : t2.slides[t2.activeIndex], s3 = e3 ? e3.getAttribute("data-hash") || e3.getAttribute("data-history") : "";
          t2.params.hashNavigation.replaceState && d2.history && d2.history.replaceState ? (d2.history.replaceState(null, null, `#${s3}` || ""), i2("hashSet")) : (o2.location.hash = s3 || "", i2("hashSet"));
        };
        n2("init", () => {
          t2.params.hashNavigation.enabled && (() => {
            if (!t2.params.hashNavigation.enabled || t2.params.history && t2.params.history.enabled)
              return;
            l2 = true;
            const e3 = o2.location.hash.replace("#", "");
            if (e3) {
              const s3 = 0, a2 = t2.params.hashNavigation.getSlideIndex(t2, e3);
              t2.slideTo(a2 || 0, s3, t2.params.runCallbacksOnInit, true);
            }
            t2.params.hashNavigation.watchState && d2.addEventListener("hashchange", c2);
          })();
        }), n2("destroy", () => {
          t2.params.hashNavigation.enabled && t2.params.hashNavigation.watchState && d2.removeEventListener("hashchange", c2);
        }), n2("transitionEnd _freeModeNoMomentumRelease", () => {
          l2 && p2();
        }), n2("slideChange", () => {
          l2 && t2.params.cssMode && p2();
        });
      },
      function(e2) {
        let t2, s2, { swiper: i2, extendParams: r2, on: n2, emit: l2, params: o2 } = e2;
        i2.autoplay = { running: false, paused: false, timeLeft: 0 }, r2({
          autoplay: {
            enabled: false,
            delay: 3e3,
            waitForTransition: true,
            disableOnInteraction: false,
            stopOnLastSlide: false,
            reverseDirection: false,
            pauseOnMouseEnter: false
          }
        });
        let d2, c2, p2, u2, m2, h2, f2, g2, v2 = o2 && o2.autoplay ? o2.autoplay.delay : 3e3, w2 = o2 && o2.autoplay ? o2.autoplay.delay : 3e3, b2 = (/* @__PURE__ */ new Date()).getTime();
        function y2(e3) {
          i2 && !i2.destroyed && i2.wrapperEl && e3.target === i2.wrapperEl && (i2.wrapperEl.removeEventListener("transitionend", y2), g2 || e3.detail && e3.detail.bySwiperTouchMove || C2());
        }
        const E2 = () => {
          if (i2.destroyed || !i2.autoplay.running) return;
          i2.autoplay.paused ? c2 = true : c2 && (w2 = d2, c2 = false);
          const e3 = i2.autoplay.paused ? d2 : b2 + w2 - (/* @__PURE__ */ new Date()).getTime();
          i2.autoplay.timeLeft = e3, l2("autoplayTimeLeft", e3, e3 / v2), s2 = requestAnimationFrame(() => {
            E2();
          });
        }, x2 = (e3) => {
          if (i2.destroyed || !i2.autoplay.running) return;
          cancelAnimationFrame(s2), E2();
          let a2 = void 0 === e3 ? i2.params.autoplay.delay : e3;
          v2 = i2.params.autoplay.delay, w2 = i2.params.autoplay.delay;
          const r3 = (() => {
            let e4;
            if (e4 = i2.virtual && i2.params.virtual.enabled ? i2.slides.filter(
              (e5) => e5.classList.contains("swiper-slide-active")
            )[0] : i2.slides[i2.activeIndex], !e4)
              return;
            return parseInt(e4.getAttribute("data-swiper-autoplay"), 10);
          })();
          !Number.isNaN(r3) && r3 > 0 && void 0 === e3 && (a2 = r3, v2 = r3, w2 = r3), d2 = a2;
          const n3 = i2.params.speed, o3 = () => {
            i2 && !i2.destroyed && (i2.params.autoplay.reverseDirection ? !i2.isBeginning || i2.params.loop || i2.params.rewind ? (i2.slidePrev(n3, true, true), l2("autoplay")) : i2.params.autoplay.stopOnLastSlide || (i2.slideTo(i2.slides.length - 1, n3, true, true), l2("autoplay")) : !i2.isEnd || i2.params.loop || i2.params.rewind ? (i2.slideNext(n3, true, true), l2("autoplay")) : i2.params.autoplay.stopOnLastSlide || (i2.slideTo(0, n3, true, true), l2("autoplay")), i2.params.cssMode && (b2 = (/* @__PURE__ */ new Date()).getTime(), requestAnimationFrame(() => {
              x2();
            })));
          };
          return a2 > 0 ? (clearTimeout(t2), t2 = setTimeout(() => {
            o3();
          }, a2)) : requestAnimationFrame(() => {
            o3();
          }), a2;
        }, S2 = () => {
          b2 = (/* @__PURE__ */ new Date()).getTime(), i2.autoplay.running = true, x2(), l2("autoplayStart");
        }, T2 = () => {
          i2.autoplay.running = false, clearTimeout(t2), cancelAnimationFrame(s2), l2("autoplayStop");
        }, M2 = (e3, s3) => {
          if (i2.destroyed || !i2.autoplay.running) return;
          clearTimeout(t2), e3 || (f2 = true);
          const a2 = () => {
            l2("autoplayPause"), i2.params.autoplay.waitForTransition ? i2.wrapperEl.addEventListener("transitionend", y2) : C2();
          };
          if (i2.autoplay.paused = true, s3)
            return h2 && (d2 = i2.params.autoplay.delay), h2 = false, void a2();
          const r3 = d2 || i2.params.autoplay.delay;
          d2 = r3 - ((/* @__PURE__ */ new Date()).getTime() - b2), i2.isEnd && d2 < 0 && !i2.params.loop || (d2 < 0 && (d2 = 0), a2());
        }, C2 = () => {
          i2.isEnd && d2 < 0 && !i2.params.loop || i2.destroyed || !i2.autoplay.running || (b2 = (/* @__PURE__ */ new Date()).getTime(), f2 ? (f2 = false, x2(d2)) : x2(), i2.autoplay.paused = false, l2("autoplayResume"));
        }, P2 = () => {
          if (i2.destroyed || !i2.autoplay.running) return;
          const e3 = a();
          "hidden" === e3.visibilityState && (f2 = true, M2(true)), "visible" === e3.visibilityState && C2();
        }, L2 = (e3) => {
          "mouse" === e3.pointerType && (f2 = true, g2 = true, i2.animating || i2.autoplay.paused || M2(true));
        }, I2 = (e3) => {
          "mouse" === e3.pointerType && (g2 = false, i2.autoplay.paused && C2());
        };
        n2("init", () => {
          i2.params.autoplay.enabled && (i2.params.autoplay.pauseOnMouseEnter && (i2.el.addEventListener("pointerenter", L2), i2.el.addEventListener("pointerleave", I2)), a().addEventListener("visibilitychange", P2), S2());
        }), n2("destroy", () => {
          i2.el && "string" != typeof i2.el && (i2.el.removeEventListener("pointerenter", L2), i2.el.removeEventListener("pointerleave", I2)), a().removeEventListener("visibilitychange", P2), i2.autoplay.running && T2();
        }), n2("_freeModeStaticRelease", () => {
          (u2 || f2) && C2();
        }), n2("_freeModeNoMomentumRelease", () => {
          i2.params.autoplay.disableOnInteraction ? T2() : M2(true, true);
        }), n2("beforeTransitionStart", (e3, t3, s3) => {
          !i2.destroyed && i2.autoplay.running && (s3 || !i2.params.autoplay.disableOnInteraction ? M2(true, true) : T2());
        }), n2("sliderFirstMove", () => {
          !i2.destroyed && i2.autoplay.running && (i2.params.autoplay.disableOnInteraction ? T2() : (p2 = true, u2 = false, f2 = false, m2 = setTimeout(() => {
            f2 = true, u2 = true, M2(true);
          }, 200)));
        }), n2("touchEnd", () => {
          if (!i2.destroyed && i2.autoplay.running && p2) {
            if (clearTimeout(m2), clearTimeout(t2), i2.params.autoplay.disableOnInteraction)
              return u2 = false, void (p2 = false);
            u2 && i2.params.cssMode && C2(), u2 = false, p2 = false;
          }
        }), n2("slideChange", () => {
          !i2.destroyed && i2.autoplay.running && (h2 = true);
        }), Object.assign(i2.autoplay, { start: S2, stop: T2, pause: M2, resume: C2 });
      },
      function(e2) {
        let { swiper: t2, extendParams: s2, on: i2 } = e2;
        s2({
          thumbs: {
            swiper: null,
            multipleActiveThumbs: true,
            autoScrollOffset: 0,
            slideThumbActiveClass: "swiper-slide-thumb-active",
            thumbsContainerClass: "swiper-thumbs"
          }
        });
        let r2 = false, n2 = false;
        function l2() {
          const e3 = t2.thumbs.swiper;
          if (!e3 || e3.destroyed) return;
          const s3 = e3.clickedIndex, a2 = e3.clickedSlide;
          if (a2 && a2.classList.contains(t2.params.thumbs.slideThumbActiveClass))
            return;
          if (null == s3) return;
          let i3;
          i3 = e3.params.loop ? parseInt(e3.clickedSlide.getAttribute("data-swiper-slide-index"), 10) : s3, t2.params.loop ? t2.slideToLoop(i3) : t2.slideTo(i3);
        }
        function o2() {
          const { thumbs: e3 } = t2.params;
          if (r2) return false;
          r2 = true;
          const s3 = t2.constructor;
          if (e3.swiper instanceof s3)
            t2.thumbs.swiper = e3.swiper, Object.assign(t2.thumbs.swiper.originalParams, {
              watchSlidesProgress: true,
              slideToClickedSlide: false
            }), Object.assign(t2.thumbs.swiper.params, {
              watchSlidesProgress: true,
              slideToClickedSlide: false
            }), t2.thumbs.swiper.update();
          else if (c(e3.swiper)) {
            const a2 = Object.assign({}, e3.swiper);
            Object.assign(a2, {
              watchSlidesProgress: true,
              slideToClickedSlide: false
            }), t2.thumbs.swiper = new s3(a2), n2 = true;
          }
          return t2.thumbs.swiper.el.classList.add(
            t2.params.thumbs.thumbsContainerClass
          ), t2.thumbs.swiper.on("tap", l2), true;
        }
        function d2(e3) {
          const s3 = t2.thumbs.swiper;
          if (!s3 || s3.destroyed) return;
          const a2 = "auto" === s3.params.slidesPerView ? s3.slidesPerViewDynamic() : s3.params.slidesPerView;
          let i3 = 1;
          const r3 = t2.params.thumbs.slideThumbActiveClass;
          if (t2.params.slidesPerView > 1 && !t2.params.centeredSlides && (i3 = t2.params.slidesPerView), t2.params.thumbs.multipleActiveThumbs || (i3 = 1), i3 = Math.floor(i3), s3.slides.forEach((e4) => e4.classList.remove(r3)), s3.params.loop || s3.params.virtual && s3.params.virtual.enabled)
            for (let e4 = 0; e4 < i3; e4 += 1)
              f(
                s3.slidesEl,
                `[data-swiper-slide-index="${t2.realIndex + e4}"]`
              ).forEach((e5) => {
                e5.classList.add(r3);
              });
          else
            for (let e4 = 0; e4 < i3; e4 += 1)
              s3.slides[t2.realIndex + e4] && s3.slides[t2.realIndex + e4].classList.add(r3);
          const n3 = t2.params.thumbs.autoScrollOffset, l3 = n3 && !s3.params.loop;
          if (t2.realIndex !== s3.realIndex || l3) {
            const i4 = s3.activeIndex;
            let r4, o3;
            if (s3.params.loop) {
              const e4 = s3.slides.filter(
                (e5) => e5.getAttribute("data-swiper-slide-index") === `${t2.realIndex}`
              )[0];
              r4 = s3.slides.indexOf(e4), o3 = t2.activeIndex > t2.previousIndex ? "next" : "prev";
            } else r4 = t2.realIndex, o3 = r4 > t2.previousIndex ? "next" : "prev";
            l3 && (r4 += "next" === o3 ? n3 : -1 * n3), s3.visibleSlidesIndexes && s3.visibleSlidesIndexes.indexOf(r4) < 0 && (s3.params.centeredSlides ? r4 = r4 > i4 ? r4 - Math.floor(a2 / 2) + 1 : r4 + Math.floor(a2 / 2) - 1 : r4 > i4 && s3.params.slidesPerGroup, s3.slideTo(r4, e3 ? 0 : void 0));
          }
        }
        t2.thumbs = { swiper: null }, i2("beforeInit", () => {
          const { thumbs: e3 } = t2.params;
          if (e3 && e3.swiper)
            if ("string" == typeof e3.swiper || e3.swiper instanceof HTMLElement) {
              const s3 = a(), i3 = () => {
                const a2 = "string" == typeof e3.swiper ? s3.querySelector(e3.swiper) : e3.swiper;
                if (a2 && a2.swiper) e3.swiper = a2.swiper, o2(), d2(true);
                else if (a2) {
                  const s4 = `${t2.params.eventsPrefix}init`, i4 = (r4) => {
                    e3.swiper = r4.detail[0], a2.removeEventListener(s4, i4), o2(), d2(true), e3.swiper.update(), t2.update();
                  };
                  a2.addEventListener(s4, i4);
                }
                return a2;
              }, r3 = () => {
                if (t2.destroyed) return;
                i3() || requestAnimationFrame(r3);
              };
              requestAnimationFrame(r3);
            } else o2(), d2(true);
        }), i2("slideChange update resize observerUpdate", () => {
          d2();
        }), i2("setTransition", (e3, s3) => {
          const a2 = t2.thumbs.swiper;
          a2 && !a2.destroyed && a2.setTransition(s3);
        }), i2("beforeDestroy", () => {
          const e3 = t2.thumbs.swiper;
          e3 && !e3.destroyed && n2 && e3.destroy();
        }), Object.assign(t2.thumbs, { init: o2, update: d2 });
      },
      function(e2) {
        let { swiper: t2, extendParams: s2, emit: a2, once: i2 } = e2;
        s2({
          freeMode: {
            enabled: false,
            momentum: true,
            momentumRatio: 1,
            momentumBounce: true,
            momentumBounceRatio: 1,
            momentumVelocityRatio: 1,
            sticky: false,
            minimumVelocity: 0.02
          }
        }), Object.assign(t2, {
          freeMode: {
            onTouchStart: function() {
              if (t2.params.cssMode) return;
              const e3 = t2.getTranslate();
              t2.setTranslate(e3), t2.setTransition(0), t2.touchEventsData.velocities.length = 0, t2.freeMode.onTouchEnd({
                currentPos: t2.rtl ? t2.translate : -t2.translate
              });
            },
            onTouchMove: function() {
              if (t2.params.cssMode) return;
              const { touchEventsData: e3, touches: s3 } = t2;
              0 === e3.velocities.length && e3.velocities.push({
                position: s3[t2.isHorizontal() ? "startX" : "startY"],
                time: e3.touchStartTime
              }), e3.velocities.push({
                position: s3[t2.isHorizontal() ? "currentX" : "currentY"],
                time: o()
              });
            },
            onTouchEnd: function(e3) {
              let { currentPos: s3 } = e3;
              if (t2.params.cssMode) return;
              const {
                params: r2,
                wrapperEl: n2,
                rtlTranslate: l2,
                snapGrid: d2,
                touchEventsData: c2
              } = t2, p2 = o() - c2.touchStartTime;
              if (s3 < -t2.minTranslate()) t2.slideTo(t2.activeIndex);
              else if (s3 > -t2.maxTranslate())
                t2.slides.length < d2.length ? t2.slideTo(d2.length - 1) : t2.slideTo(t2.slides.length - 1);
              else {
                if (r2.freeMode.momentum) {
                  if (c2.velocities.length > 1) {
                    const e5 = c2.velocities.pop(), s5 = c2.velocities.pop(), a3 = e5.position - s5.position, i3 = e5.time - s5.time;
                    t2.velocity = a3 / i3, t2.velocity /= 2, Math.abs(t2.velocity) < r2.freeMode.minimumVelocity && (t2.velocity = 0), (i3 > 150 || o() - e5.time > 300) && (t2.velocity = 0);
                  } else t2.velocity = 0;
                  t2.velocity *= r2.freeMode.momentumVelocityRatio, c2.velocities.length = 0;
                  let e4 = 1e3 * r2.freeMode.momentumRatio;
                  const s4 = t2.velocity * e4;
                  let p3 = t2.translate + s4;
                  l2 && (p3 = -p3);
                  let u2, m2 = false;
                  const h2 = 20 * Math.abs(t2.velocity) * r2.freeMode.momentumBounceRatio;
                  let f2;
                  if (p3 < t2.maxTranslate())
                    r2.freeMode.momentumBounce ? (p3 + t2.maxTranslate() < -h2 && (p3 = t2.maxTranslate() - h2), u2 = t2.maxTranslate(), m2 = true, c2.allowMomentumBounce = true) : p3 = t2.maxTranslate(), r2.loop && r2.centeredSlides && (f2 = true);
                  else if (p3 > t2.minTranslate())
                    r2.freeMode.momentumBounce ? (p3 - t2.minTranslate() > h2 && (p3 = t2.minTranslate() + h2), u2 = t2.minTranslate(), m2 = true, c2.allowMomentumBounce = true) : p3 = t2.minTranslate(), r2.loop && r2.centeredSlides && (f2 = true);
                  else if (r2.freeMode.sticky) {
                    let e5;
                    for (let t3 = 0; t3 < d2.length; t3 += 1)
                      if (d2[t3] > -p3) {
                        e5 = t3;
                        break;
                      }
                    p3 = Math.abs(d2[e5] - p3) < Math.abs(d2[e5 - 1] - p3) || "next" === t2.swipeDirection ? d2[e5] : d2[e5 - 1], p3 = -p3;
                  }
                  if (f2 && i2("transitionEnd", () => {
                    t2.loopFix();
                  }), 0 !== t2.velocity) {
                    if (e4 = l2 ? Math.abs((-p3 - t2.translate) / t2.velocity) : Math.abs((p3 - t2.translate) / t2.velocity), r2.freeMode.sticky) {
                      const s5 = Math.abs((l2 ? -p3 : p3) - t2.translate), a3 = t2.slidesSizesGrid[t2.activeIndex];
                      e4 = s5 < a3 ? r2.speed : s5 < 2 * a3 ? 1.5 * r2.speed : 2.5 * r2.speed;
                    }
                  } else if (r2.freeMode.sticky) return void t2.slideToClosest();
                  r2.freeMode.momentumBounce && m2 ? (t2.updateProgress(u2), t2.setTransition(e4), t2.setTranslate(p3), t2.transitionStart(true, t2.swipeDirection), t2.animating = true, x(n2, () => {
                    t2 && !t2.destroyed && c2.allowMomentumBounce && (a2("momentumBounce"), t2.setTransition(r2.speed), setTimeout(() => {
                      t2.setTranslate(u2), x(n2, () => {
                        t2 && !t2.destroyed && t2.transitionEnd();
                      });
                    }, 0));
                  })) : t2.velocity ? (a2("_freeModeNoMomentumRelease"), t2.updateProgress(p3), t2.setTransition(e4), t2.setTranslate(p3), t2.transitionStart(true, t2.swipeDirection), t2.animating || (t2.animating = true, x(n2, () => {
                    t2 && !t2.destroyed && t2.transitionEnd();
                  }))) : t2.updateProgress(p3), t2.updateActiveIndex(), t2.updateSlidesClasses();
                } else {
                  if (r2.freeMode.sticky) return void t2.slideToClosest();
                  r2.freeMode && a2("_freeModeNoMomentumRelease");
                }
                (!r2.freeMode.momentum || p2 >= r2.longSwipesMs) && (a2("_freeModeStaticRelease"), t2.updateProgress(), t2.updateActiveIndex(), t2.updateSlidesClasses());
              }
            }
          }
        });
      },
      function(e2) {
        let t2, s2, a2, i2, { swiper: r2, extendParams: n2, on: l2 } = e2;
        n2({ grid: { rows: 1, fill: "column" } });
        const o2 = () => {
          let e3 = r2.params.spaceBetween;
          return "string" == typeof e3 && e3.indexOf("%") >= 0 ? e3 = parseFloat(e3.replace("%", "")) / 100 * r2.size : "string" == typeof e3 && (e3 = parseFloat(e3)), e3;
        };
        l2("init", () => {
          i2 = r2.params.grid && r2.params.grid.rows > 1;
        }), l2("update", () => {
          const { params: e3, el: t3 } = r2, s3 = e3.grid && e3.grid.rows > 1;
          i2 && !s3 ? (t3.classList.remove(
            `${e3.containerModifierClass}grid`,
            `${e3.containerModifierClass}grid-column`
          ), a2 = 1, r2.emitContainerClasses()) : !i2 && s3 && (t3.classList.add(`${e3.containerModifierClass}grid`), "column" === e3.grid.fill && t3.classList.add(`${e3.containerModifierClass}grid-column`), r2.emitContainerClasses()), i2 = s3;
        }), r2.grid = {
          initSlides: (e3) => {
            const { slidesPerView: i3 } = r2.params, { rows: n3, fill: l3 } = r2.params.grid, o3 = r2.virtual && r2.params.virtual.enabled ? r2.virtual.slides.length : e3.length;
            a2 = Math.floor(o3 / n3), t2 = Math.floor(o3 / n3) === o3 / n3 ? o3 : Math.ceil(o3 / n3) * n3, "auto" !== i3 && "row" === l3 && (t2 = Math.max(t2, i3 * n3)), s2 = t2 / n3;
          },
          unsetSlides: () => {
            r2.slides && r2.slides.forEach((e3) => {
              e3.swiperSlideGridSet && (e3.style.height = "", e3.style[r2.getDirectionLabel("margin-top")] = "");
            });
          },
          updateSlide: (e3, i3, n3) => {
            const { slidesPerGroup: l3 } = r2.params, d2 = o2(), { rows: c2, fill: p2 } = r2.params.grid, u2 = r2.virtual && r2.params.virtual.enabled ? r2.virtual.slides.length : n3.length;
            let m2, h2, f2;
            if ("row" === p2 && l3 > 1) {
              const s3 = Math.floor(e3 / (l3 * c2)), a3 = e3 - c2 * l3 * s3, r3 = 0 === s3 ? l3 : Math.min(Math.ceil((u2 - s3 * c2 * l3) / c2), l3);
              f2 = Math.floor(a3 / r3), h2 = a3 - f2 * r3 + s3 * l3, m2 = h2 + f2 * t2 / c2, i3.style.order = m2;
            } else
              "column" === p2 ? (h2 = Math.floor(e3 / c2), f2 = e3 - h2 * c2, (h2 > a2 || h2 === a2 && f2 === c2 - 1) && (f2 += 1, f2 >= c2 && (f2 = 0, h2 += 1))) : (f2 = Math.floor(e3 / s2), h2 = e3 - f2 * s2);
            i3.row = f2, i3.column = h2, i3.style.height = `calc((100% - ${(c2 - 1) * d2}px) / ${c2})`, i3.style[r2.getDirectionLabel("margin-top")] = 0 !== f2 ? d2 && `${d2}px` : "", i3.swiperSlideGridSet = true;
          },
          updateWrapperSize: (e3, s3) => {
            const { centeredSlides: a3, roundLengths: i3 } = r2.params, n3 = o2(), { rows: l3 } = r2.params.grid;
            if (r2.virtualSize = (e3 + n3) * t2, r2.virtualSize = Math.ceil(r2.virtualSize / l3) - n3, r2.params.cssMode || (r2.wrapperEl.style[r2.getDirectionLabel("width")] = `${r2.virtualSize + n3}px`), a3) {
              const e4 = [];
              for (let t3 = 0; t3 < s3.length; t3 += 1) {
                let a4 = s3[t3];
                i3 && (a4 = Math.floor(a4)), s3[t3] < r2.virtualSize + s3[0] && e4.push(a4);
              }
              s3.splice(0, s3.length), s3.push(...e4);
            }
          }
        };
      },
      function(e2) {
        let { swiper: t2 } = e2;
        Object.assign(t2, {
          appendSlide: le.bind(t2),
          prependSlide: oe.bind(t2),
          addSlide: de.bind(t2),
          removeSlide: ce.bind(t2),
          removeAllSlides: pe.bind(t2)
        });
      },
      function(e2) {
        let { swiper: t2, extendParams: s2, on: a2 } = e2;
        s2({ fadeEffect: { crossFade: false } }), ue({
          effect: "fade",
          swiper: t2,
          on: a2,
          setTranslate: () => {
            const { slides: e3 } = t2;
            t2.params.fadeEffect;
            for (let s3 = 0; s3 < e3.length; s3 += 1) {
              const e4 = t2.slides[s3];
              let a3 = -e4.swiperSlideOffset;
              t2.params.virtualTranslate || (a3 -= t2.translate);
              let i2 = 0;
              t2.isHorizontal() || (i2 = a3, a3 = 0);
              const r2 = t2.params.fadeEffect.crossFade ? Math.max(1 - Math.abs(e4.progress), 0) : 1 + Math.min(Math.max(e4.progress, -1), 0), n2 = me(0, e4);
              n2.style.opacity = r2, n2.style.transform = `translate3d(${a3}px, ${i2}px, 0px)`;
            }
          },
          setTransition: (e3) => {
            const s3 = t2.slides.map((e4) => h(e4));
            s3.forEach((t3) => {
              t3.style.transitionDuration = `${e3}ms`;
            }), he({
              swiper: t2,
              duration: e3,
              transformElements: s3,
              allSlides: true
            });
          },
          overwriteParams: () => ({
            slidesPerView: 1,
            slidesPerGroup: 1,
            watchSlidesProgress: true,
            spaceBetween: 0,
            virtualTranslate: !t2.params.cssMode
          })
        });
      },
      function(e2) {
        let { swiper: t2, extendParams: s2, on: a2 } = e2;
        s2({
          cubeEffect: {
            slideShadows: true,
            shadow: true,
            shadowOffset: 20,
            shadowScale: 0.94
          }
        });
        const i2 = (e3, t3, s3) => {
          let a3 = s3 ? e3.querySelector(".swiper-slide-shadow-left") : e3.querySelector(".swiper-slide-shadow-top"), i3 = s3 ? e3.querySelector(".swiper-slide-shadow-right") : e3.querySelector(".swiper-slide-shadow-bottom");
          a3 || (a3 = v(
            "div",
            ("swiper-slide-shadow-cube swiper-slide-shadow-" + (s3 ? "left" : "top")).split(" ")
          ), e3.append(a3)), i3 || (i3 = v(
            "div",
            ("swiper-slide-shadow-cube swiper-slide-shadow-" + (s3 ? "right" : "bottom")).split(" ")
          ), e3.append(i3)), a3 && (a3.style.opacity = Math.max(-t3, 0)), i3 && (i3.style.opacity = Math.max(t3, 0));
        };
        ue({
          effect: "cube",
          swiper: t2,
          on: a2,
          setTranslate: () => {
            const {
              el: e3,
              wrapperEl: s3,
              slides: a3,
              width: r2,
              height: n2,
              rtlTranslate: l2,
              size: o2,
              browser: d2
            } = t2, c2 = M(t2), p2 = t2.params.cubeEffect, u2 = t2.isHorizontal(), m2 = t2.virtual && t2.params.virtual.enabled;
            let h2, f2 = 0;
            p2.shadow && (u2 ? (h2 = t2.wrapperEl.querySelector(".swiper-cube-shadow"), h2 || (h2 = v("div", "swiper-cube-shadow"), t2.wrapperEl.append(h2)), h2.style.height = `${r2}px`) : (h2 = e3.querySelector(".swiper-cube-shadow"), h2 || (h2 = v("div", "swiper-cube-shadow"), e3.append(h2))));
            for (let e4 = 0; e4 < a3.length; e4 += 1) {
              const t3 = a3[e4];
              let s4 = e4;
              m2 && (s4 = parseInt(t3.getAttribute("data-swiper-slide-index"), 10));
              let r3 = 90 * s4, n3 = Math.floor(r3 / 360);
              l2 && (r3 = -r3, n3 = Math.floor(-r3 / 360));
              const d3 = Math.max(Math.min(t3.progress, 1), -1);
              let h3 = 0, g3 = 0, v2 = 0;
              s4 % 4 == 0 ? (h3 = 4 * -n3 * o2, v2 = 0) : (s4 - 1) % 4 == 0 ? (h3 = 0, v2 = 4 * -n3 * o2) : (s4 - 2) % 4 == 0 ? (h3 = o2 + 4 * n3 * o2, v2 = o2) : (s4 - 3) % 4 == 0 && (h3 = -o2, v2 = 3 * o2 + 4 * o2 * n3), l2 && (h3 = -h3), u2 || (g3 = h3, h3 = 0);
              const w2 = `rotateX(${c2(u2 ? 0 : -r3)}deg) rotateY(${c2(u2 ? r3 : 0)}deg) translate3d(${h3}px, ${g3}px, ${v2}px)`;
              d3 <= 1 && d3 > -1 && (f2 = 90 * s4 + 90 * d3, l2 && (f2 = 90 * -s4 - 90 * d3)), t3.style.transform = w2, p2.slideShadows && i2(t3, d3, u2);
            }
            if (s3.style.transformOrigin = `50% 50% -${o2 / 2}px`, s3.style["-webkit-transform-origin"] = `50% 50% -${o2 / 2}px`, p2.shadow)
              if (u2)
                h2.style.transform = `translate3d(0px, ${r2 / 2 + p2.shadowOffset}px, ${-r2 / 2}px) rotateX(89.99deg) rotateZ(0deg) scale(${p2.shadowScale})`;
              else {
                const e4 = Math.abs(f2) - 90 * Math.floor(Math.abs(f2) / 90), t3 = 1.5 - (Math.sin(2 * e4 * Math.PI / 360) / 2 + Math.cos(2 * e4 * Math.PI / 360) / 2), s4 = p2.shadowScale, a4 = p2.shadowScale / t3, i3 = p2.shadowOffset;
                h2.style.transform = `scale3d(${s4}, 1, ${a4}) translate3d(0px, ${n2 / 2 + i3}px, ${-n2 / 2 / a4}px) rotateX(-89.99deg)`;
              }
            const g2 = (d2.isSafari || d2.isWebView) && d2.needPerspectiveFix ? -o2 / 2 : 0;
            s3.style.transform = `translate3d(0px,0,${g2}px) rotateX(${c2(t2.isHorizontal() ? 0 : f2)}deg) rotateY(${c2(t2.isHorizontal() ? -f2 : 0)}deg)`, s3.style.setProperty("--swiper-cube-translate-z", `${g2}px`);
          },
          setTransition: (e3) => {
            const { el: s3, slides: a3 } = t2;
            if (a3.forEach((t3) => {
              t3.style.transitionDuration = `${e3}ms`, t3.querySelectorAll(
                ".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left"
              ).forEach((t4) => {
                t4.style.transitionDuration = `${e3}ms`;
              });
            }), t2.params.cubeEffect.shadow && !t2.isHorizontal()) {
              const t3 = s3.querySelector(".swiper-cube-shadow");
              t3 && (t3.style.transitionDuration = `${e3}ms`);
            }
          },
          recreateShadows: () => {
            const e3 = t2.isHorizontal();
            t2.slides.forEach((t3) => {
              const s3 = Math.max(Math.min(t3.progress, 1), -1);
              i2(t3, s3, e3);
            });
          },
          getEffectParams: () => t2.params.cubeEffect,
          perspective: () => true,
          overwriteParams: () => ({
            slidesPerView: 1,
            slidesPerGroup: 1,
            watchSlidesProgress: true,
            resistanceRatio: 0,
            spaceBetween: 0,
            centeredSlides: false,
            virtualTranslate: true
          })
        });
      },
      function(e2) {
        let { swiper: t2, extendParams: s2, on: a2 } = e2;
        s2({ flipEffect: { slideShadows: true, limitRotation: true } });
        const i2 = (e3, s3) => {
          let a3 = t2.isHorizontal() ? e3.querySelector(".swiper-slide-shadow-left") : e3.querySelector(".swiper-slide-shadow-top"), i3 = t2.isHorizontal() ? e3.querySelector(".swiper-slide-shadow-right") : e3.querySelector(".swiper-slide-shadow-bottom");
          a3 || (a3 = fe("flip", e3, t2.isHorizontal() ? "left" : "top")), i3 || (i3 = fe("flip", e3, t2.isHorizontal() ? "right" : "bottom")), a3 && (a3.style.opacity = Math.max(-s3, 0)), i3 && (i3.style.opacity = Math.max(s3, 0));
        };
        ue({
          effect: "flip",
          swiper: t2,
          on: a2,
          setTranslate: () => {
            const { slides: e3, rtlTranslate: s3 } = t2, a3 = t2.params.flipEffect, r2 = M(t2);
            for (let n2 = 0; n2 < e3.length; n2 += 1) {
              const l2 = e3[n2];
              let o2 = l2.progress;
              t2.params.flipEffect.limitRotation && (o2 = Math.max(Math.min(l2.progress, 1), -1));
              const d2 = l2.swiperSlideOffset;
              let c2 = -180 * o2, p2 = 0, u2 = t2.params.cssMode ? -d2 - t2.translate : -d2, m2 = 0;
              t2.isHorizontal() ? s3 && (c2 = -c2) : (m2 = u2, u2 = 0, p2 = -c2, c2 = 0), l2.style.zIndex = -Math.abs(Math.round(o2)) + e3.length, a3.slideShadows && i2(l2, o2);
              const h2 = `translate3d(${u2}px, ${m2}px, 0px) rotateX(${r2(p2)}deg) rotateY(${r2(c2)}deg)`;
              me(0, l2).style.transform = h2;
            }
          },
          setTransition: (e3) => {
            const s3 = t2.slides.map((e4) => h(e4));
            s3.forEach((t3) => {
              t3.style.transitionDuration = `${e3}ms`, t3.querySelectorAll(
                ".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left"
              ).forEach((t4) => {
                t4.style.transitionDuration = `${e3}ms`;
              });
            }), he({ swiper: t2, duration: e3, transformElements: s3 });
          },
          recreateShadows: () => {
            t2.params.flipEffect, t2.slides.forEach((e3) => {
              let s3 = e3.progress;
              t2.params.flipEffect.limitRotation && (s3 = Math.max(Math.min(e3.progress, 1), -1)), i2(e3, s3);
            });
          },
          getEffectParams: () => t2.params.flipEffect,
          perspective: () => true,
          overwriteParams: () => ({
            slidesPerView: 1,
            slidesPerGroup: 1,
            watchSlidesProgress: true,
            spaceBetween: 0,
            virtualTranslate: !t2.params.cssMode
          })
        });
      },
      function(e2) {
        let { swiper: t2, extendParams: s2, on: a2 } = e2;
        s2({
          coverflowEffect: {
            rotate: 50,
            stretch: 0,
            depth: 100,
            scale: 1,
            modifier: 1,
            slideShadows: true
          }
        }), ue({
          effect: "coverflow",
          swiper: t2,
          on: a2,
          setTranslate: () => {
            const { width: e3, height: s3, slides: a3, slidesSizesGrid: i2 } = t2, r2 = t2.params.coverflowEffect, n2 = t2.isHorizontal(), l2 = t2.translate, o2 = n2 ? e3 / 2 - l2 : s3 / 2 - l2, d2 = n2 ? r2.rotate : -r2.rotate, c2 = r2.depth, p2 = M(t2);
            for (let e4 = 0, t3 = a3.length; e4 < t3; e4 += 1) {
              const t4 = a3[e4], s4 = i2[e4], l3 = (o2 - t4.swiperSlideOffset - s4 / 2) / s4, u2 = "function" == typeof r2.modifier ? r2.modifier(l3) : l3 * r2.modifier;
              let m2 = n2 ? d2 * u2 : 0, h2 = n2 ? 0 : d2 * u2, f2 = -c2 * Math.abs(u2), g2 = r2.stretch;
              "string" == typeof g2 && -1 !== g2.indexOf("%") && (g2 = parseFloat(r2.stretch) / 100 * s4);
              let v2 = n2 ? 0 : g2 * u2, w2 = n2 ? g2 * u2 : 0, b2 = 1 - (1 - r2.scale) * Math.abs(u2);
              Math.abs(w2) < 1e-3 && (w2 = 0), Math.abs(v2) < 1e-3 && (v2 = 0), Math.abs(f2) < 1e-3 && (f2 = 0), Math.abs(m2) < 1e-3 && (m2 = 0), Math.abs(h2) < 1e-3 && (h2 = 0), Math.abs(b2) < 1e-3 && (b2 = 0);
              const y2 = `translate3d(${w2}px,${v2}px,${f2}px)  rotateX(${p2(h2)}deg) rotateY(${p2(m2)}deg) scale(${b2})`;
              if (me(0, t4).style.transform = y2, t4.style.zIndex = 1 - Math.abs(Math.round(u2)), r2.slideShadows) {
                let e5 = n2 ? t4.querySelector(".swiper-slide-shadow-left") : t4.querySelector(".swiper-slide-shadow-top"), s5 = n2 ? t4.querySelector(".swiper-slide-shadow-right") : t4.querySelector(".swiper-slide-shadow-bottom");
                e5 || (e5 = fe("coverflow", t4, n2 ? "left" : "top")), s5 || (s5 = fe("coverflow", t4, n2 ? "right" : "bottom")), e5 && (e5.style.opacity = u2 > 0 ? u2 : 0), s5 && (s5.style.opacity = -u2 > 0 ? -u2 : 0);
              }
            }
          },
          setTransition: (e3) => {
            t2.slides.map((e4) => h(e4)).forEach((t3) => {
              t3.style.transitionDuration = `${e3}ms`, t3.querySelectorAll(
                ".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left"
              ).forEach((t4) => {
                t4.style.transitionDuration = `${e3}ms`;
              });
            });
          },
          perspective: () => true,
          overwriteParams: () => ({ watchSlidesProgress: true })
        });
      },
      function(e2) {
        let { swiper: t2, extendParams: s2, on: a2 } = e2;
        s2({
          creativeEffect: {
            limitProgress: 1,
            shadowPerProgress: false,
            progressMultiplier: 1,
            perspective: true,
            prev: {
              translate: [0, 0, 0],
              rotate: [0, 0, 0],
              opacity: 1,
              scale: 1
            },
            next: {
              translate: [0, 0, 0],
              rotate: [0, 0, 0],
              opacity: 1,
              scale: 1
            }
          }
        });
        const i2 = (e3) => "string" == typeof e3 ? e3 : `${e3}px`;
        ue({
          effect: "creative",
          swiper: t2,
          on: a2,
          setTranslate: () => {
            const { slides: e3, wrapperEl: s3, slidesSizesGrid: a3 } = t2, r2 = t2.params.creativeEffect, { progressMultiplier: n2 } = r2, l2 = t2.params.centeredSlides, o2 = M(t2);
            if (l2) {
              const e4 = a3[0] / 2 - t2.params.slidesOffsetBefore || 0;
              s3.style.transform = `translateX(calc(50% - ${e4}px))`;
            }
            for (let s4 = 0; s4 < e3.length; s4 += 1) {
              const a4 = e3[s4], d2 = a4.progress, c2 = Math.min(
                Math.max(a4.progress, -r2.limitProgress),
                r2.limitProgress
              );
              let p2 = c2;
              l2 || (p2 = Math.min(
                Math.max(a4.originalProgress, -r2.limitProgress),
                r2.limitProgress
              ));
              const u2 = a4.swiperSlideOffset, m2 = [t2.params.cssMode ? -u2 - t2.translate : -u2, 0, 0], h2 = [0, 0, 0];
              let f2 = false;
              t2.isHorizontal() || (m2[1] = m2[0], m2[0] = 0);
              let g2 = {
                translate: [0, 0, 0],
                rotate: [0, 0, 0],
                scale: 1,
                opacity: 1
              };
              c2 < 0 ? (g2 = r2.next, f2 = true) : c2 > 0 && (g2 = r2.prev, f2 = true), m2.forEach((e4, t3) => {
                m2[t3] = `calc(${e4}px + (${i2(g2.translate[t3])} * ${Math.abs(c2 * n2)}))`;
              }), h2.forEach((e4, t3) => {
                let s5 = g2.rotate[t3] * Math.abs(c2 * n2);
                h2[t3] = s5;
              }), a4.style.zIndex = -Math.abs(Math.round(d2)) + e3.length;
              const v2 = m2.join(", "), w2 = `rotateX(${o2(h2[0])}deg) rotateY(${o2(h2[1])}deg) rotateZ(${o2(h2[2])}deg)`, b2 = p2 < 0 ? `scale(${1 + (1 - g2.scale) * p2 * n2})` : `scale(${1 - (1 - g2.scale) * p2 * n2})`, y2 = p2 < 0 ? 1 + (1 - g2.opacity) * p2 * n2 : 1 - (1 - g2.opacity) * p2 * n2, E2 = `translate3d(${v2}) ${w2} ${b2}`;
              if (f2 && g2.shadow || !f2) {
                let e4 = a4.querySelector(".swiper-slide-shadow");
                if (!e4 && g2.shadow && (e4 = fe("creative", a4)), e4) {
                  const t3 = r2.shadowPerProgress ? c2 * (1 / r2.limitProgress) : c2;
                  e4.style.opacity = Math.min(Math.max(Math.abs(t3), 0), 1);
                }
              }
              const x2 = me(0, a4);
              x2.style.transform = E2, x2.style.opacity = y2, g2.origin && (x2.style.transformOrigin = g2.origin);
            }
          },
          setTransition: (e3) => {
            const s3 = t2.slides.map((e4) => h(e4));
            s3.forEach((t3) => {
              t3.style.transitionDuration = `${e3}ms`, t3.querySelectorAll(".swiper-slide-shadow").forEach((t4) => {
                t4.style.transitionDuration = `${e3}ms`;
              });
            }), he({ swiper: t2, duration: e3, transformElements: s3, allSlides: true });
          },
          perspective: () => t2.params.creativeEffect.perspective,
          overwriteParams: () => ({
            watchSlidesProgress: true,
            virtualTranslate: !t2.params.cssMode
          })
        });
      },
      function(e2) {
        let { swiper: t2, extendParams: s2, on: a2 } = e2;
        s2({
          cardsEffect: {
            slideShadows: true,
            rotate: true,
            perSlideRotate: 2,
            perSlideOffset: 8
          }
        }), ue({
          effect: "cards",
          swiper: t2,
          on: a2,
          setTranslate: () => {
            const { slides: e3, activeIndex: s3, rtlTranslate: a3 } = t2, i2 = t2.params.cardsEffect, { startTranslate: r2, isTouched: n2 } = t2.touchEventsData, l2 = a3 ? -t2.translate : t2.translate;
            for (let o2 = 0; o2 < e3.length; o2 += 1) {
              const d2 = e3[o2], c2 = d2.progress, p2 = Math.min(Math.max(c2, -4), 4);
              let u2 = d2.swiperSlideOffset;
              t2.params.centeredSlides && !t2.params.cssMode && (t2.wrapperEl.style.transform = `translateX(${t2.minTranslate()}px)`), t2.params.centeredSlides && t2.params.cssMode && (u2 -= e3[0].swiperSlideOffset);
              let m2 = t2.params.cssMode ? -u2 - t2.translate : -u2, h2 = 0;
              const f2 = -100 * Math.abs(p2);
              let g2 = 1, v2 = -i2.perSlideRotate * p2, w2 = i2.perSlideOffset - 0.75 * Math.abs(p2);
              const b2 = t2.virtual && t2.params.virtual.enabled ? t2.virtual.from + o2 : o2, y2 = (b2 === s3 || b2 === s3 - 1) && p2 > 0 && p2 < 1 && (n2 || t2.params.cssMode) && l2 < r2, E2 = (b2 === s3 || b2 === s3 + 1) && p2 < 0 && p2 > -1 && (n2 || t2.params.cssMode) && l2 > r2;
              if (y2 || E2) {
                const e4 = (1 - Math.abs((Math.abs(p2) - 0.5) / 0.5)) ** 0.5;
                v2 += -28 * p2 * e4, g2 += -0.5 * e4, w2 += 96 * e4, h2 = -25 * e4 * Math.abs(p2) + "%";
              }
              if (m2 = p2 < 0 ? `calc(${m2}px ${a3 ? "-" : "+"} (${w2 * Math.abs(p2)}%))` : p2 > 0 ? `calc(${m2}px ${a3 ? "-" : "+"} (-${w2 * Math.abs(p2)}%))` : `${m2}px`, !t2.isHorizontal()) {
                const e4 = h2;
                h2 = m2, m2 = e4;
              }
              const x2 = p2 < 0 ? "" + (1 + (1 - g2) * p2) : "" + (1 - (1 - g2) * p2), S2 = `
        translate3d(${m2}, ${h2}, ${f2}px)
        rotateZ(${i2.rotate ? a3 ? -v2 : v2 : 0}deg)
        scale(${x2})
      `;
              if (i2.slideShadows) {
                let e4 = d2.querySelector(".swiper-slide-shadow");
                e4 || (e4 = fe("cards", d2)), e4 && (e4.style.opacity = Math.min(
                  Math.max((Math.abs(p2) - 0.5) / 0.5, 0),
                  1
                ));
              }
              d2.style.zIndex = -Math.abs(Math.round(c2)) + e3.length;
              me(0, d2).style.transform = S2;
            }
          },
          setTransition: (e3) => {
            const s3 = t2.slides.map((e4) => h(e4));
            s3.forEach((t3) => {
              t3.style.transitionDuration = `${e3}ms`, t3.querySelectorAll(".swiper-slide-shadow").forEach((t4) => {
                t4.style.transitionDuration = `${e3}ms`;
              });
            }), he({ swiper: t2, duration: e3, transformElements: s3 });
          },
          perspective: () => true,
          overwriteParams: () => ({
            watchSlidesProgress: true,
            virtualTranslate: !t2.params.cssMode
          })
        });
      }
    ];
    return ie.use(ge), ie;
  }();
  document.addEventListener("DOMContentLoaded", () => {
    const signupForm = document.getElementById("signup-form");
    const loginForm = document.getElementById("login-form");
    const forgotPw = document.getElementById("forgot-password");
    const resetPw = document.getElementById("reset-password");
    const baseUrl = document.querySelector('meta[name="site-base-url"]')?.content;
    const baseApiUrl = "http://localhost:3001";
    function handleMessageBox(messageBox) {
      return {
        show: (text) => {
          messageBox.textContent = text;
          messageBox.classList.remove("translate-y-40");
        },
        hide: () => {
          messageBox.textContent = "";
          messageBox.classList.add("translate-y-40");
        },
        tempShow: (text, duration = 3e3) => {
          messageBox.textContent = text;
          messageBox.classList.remove("translate-y-40");
          setTimeout(() => {
            messageBox.textContent = "";
            messageBox.classList.add("translate-y-40");
          }, duration);
        }
      };
    }
    if (signupForm) {
      const messageBox = handleMessageBox(document.getElementById("signup-message"));
      signupForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const form = e.target;
        const data = {
          firstName: form.firstName.value,
          lastName: form.lastName.value,
          email: form.email.value,
          company: form.company.value,
          password: form.password.value,
          confirmPassword: form.confirmPassword.value
        };
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.#-])[A-Za-z\d@$!%*?&.#-]{8,}$/;
        if (data.password !== data.confirmPassword) {
          messageBox.tempShow("Passwords do not match.");
          return;
        }
        if (!passwordRegex.test(data.password)) {
          messageBox.tempShow("Password must be at least 8 characters long, contain one uppercase letter, one lowercase letter, one number, and one special character.");
          return;
        }
        messageBox.show("Loading...");
        try {
          const res = await axios_default.post(`${baseApiUrl}/signup`, { ...data, baseUrl });
          messageBox.tempShow(res.data.message || "Signup successful!");
          form.reset();
        } catch (err) {
          messageBox.tempShow(err.response?.data?.error || "Signup failed");
        }
      });
    }
    if (loginForm) {
      const messageBox = handleMessageBox(document.getElementById("login-message"));
      loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const form = e.target;
        const data = {
          email: form.email.value,
          password: form.password.value
        };
        const rememberMe = form.rememberMe.checked;
        messageBox.show("Loading...");
        try {
          const res = await axios_default.post(`${baseApiUrl}/login`, data);
          messageBox.tempShow(`Welcome, ${res.data.user.firstName.toUpperCase()}!`);
          if (rememberMe) {
            const expiry = Date.now() + 30 * 24 * 60 * 60 * 1e3;
            const userWithExpiry = { user: res.data.user, expiry };
            localStorage.setItem("rememberedUser", JSON.stringify(userWithExpiry));
          } else {
            sessionStorage.setItem("user", JSON.stringify(res.data.user));
          }
          setTimeout(() => {
            window.location.href = baseUrl;
          }, 1500);
        } catch (err) {
          messageBox.tempShow(err.response?.data?.error || "Login failed");
        }
      });
    }
    if (forgotPw) {
      forgotPw.addEventListener("submit", async (e) => {
        const messageBox = handleMessageBox(document.getElementById("forget-message"));
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        messageBox.show("Loading...");
        try {
          const res = await axios_default.post(`${baseApiUrl}/forgot-password`, { email, baseUrl });
          messageBox.tempShow("Password reset link sent to email.");
          form.reset();
        } catch (err) {
          messageBox.tempShow(err.response?.data?.error || "Something went wrong");
        }
      });
    }
    if (resetPw) {
      resetPw.addEventListener("submit", async (e) => {
        const messageBox = handleMessageBox(document.getElementById("reset-message"));
        e.preventDefault();
        const password = resetPw.password.value;
        const confirmPassword = resetPw.confirmPassword.value;
        const token = new URLSearchParams(window.location.search).get("token");
        const email = new URLSearchParams(window.location.search).get("email");
        if (password !== confirmPassword) {
          messageBox.tempShow("Passwords don't match!");
          return;
        }
        const strongPasswordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.#-])[A-Za-z\d@$!%*?&.#-]{8,}$/;
        if (!strongPasswordPattern.test(password)) {
          messageBox.tempShow("Password must contain at least 8 characters, one uppercase letter, one number, and one special character.");
          return;
        }
        messageBox.show("Loading...");
        try {
          const res = await axios_default.post(`${baseApiUrl}/reset-password`, {
            token,
            email,
            password
          });
          messageBox.tempShow(res.data.message);
          window.location.href = `${baseUrl}/login`;
        } catch (err) {
          messageBox.tempShow(err.response?.data?.error || "Error resetting password");
        }
      });
    }
  });
  document.addEventListener("DOMContentLoaded", function() {
    const sidebarContainer = document.querySelector(".sidebar-container");
    const sidebarOpener = document.querySelector(".sidebar-opener");
    const siderbarCloser = document.querySelector(".sidebar-closer");
    const overlay = document.querySelector(".mobile-menu-overlay");
    const dialogue = document.getElementById("dialogue");
    const dialogueOpener = document.getElementById("openDialogue");
    const dialogueCloser = document.getElementById("closeDialogue");
    const scrollSection = document.getElementById("codeSection");
    const openSearch = document.querySelector(".openSearch");
    const searchContainer = document.querySelector(".searchContainer");
    const closeSearch = document.querySelector(".searchClose");
    const baseUrl = document.querySelector('meta[name="site-base-url"]')?.content;
    const remembered = JSON.parse(localStorage.getItem("rememberedUser"));
    const prose = document.querySelector(".prose");
    const floatingSearchMain = document.getElementById("floatingSearchMain");
    let user, scrollInterval;
    var swiper = new Swiper(".mySwiper", {
      slidesPerView: 1,
      spaceBetween: 10,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: false,
        type: "none",
        // disables dots
        renderBullet: function() {
          return "";
        }
      },
      autoplay: {
        delay: 4e3,
        // slower autoplay
        disableOnInteraction: false
      },
      breakpoints: {
        768: {
          slidesPerView: 2,
          spaceBetween: 10
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 24
        }
      }
    });
    var heroSwiper = new Swiper(".heroSwiper", {
      loop: true,
      autoplay: {
        delay: 5e3
      }
    });
    var blogSwiper = new Swiper(".blogSwiper", {
      pagination: {
        el: ".swiper-pagination"
      },
      slidesPerView: 1,
      spaceBetween: 10,
      breakpoints: {
        768: {
          slidesPerView: 2,
          spaceBetween: 20
        }
      }
    });
    var loginSwiper = new Swiper(".auth-swiper", {
      loop: true,
      autoplay: {
        delay: 5e3
      },
      navigation: {
        nextEl: ".next",
        prevEl: ".prev"
      },
      pagination: {
        el: ".auth-pagination"
      }
    });
    AOS.init();
    if (sidebarContainer) {
      let enableCollapsibles = function() {
        const buttons = document.querySelectorAll(
          ".hextra-sidebar-collapsible-button"
        );
        buttons.forEach(function(button) {
          button.addEventListener("click", function(e) {
            e.preventDefault();
            const list = button.parentElement.parentElement;
            if (list) {
              list.classList.toggle("open");
            }
          });
        });
      }, scrollToActiveItem = function() {
        const sidebarScrollbar = document.querySelector(
          "aside.sidebar-container > .hextra-scrollbar"
        );
        const activeItems = document.querySelectorAll(".sidebar-active-item");
        const visibleActiveItem = Array.from(activeItems).find(
          function(activeItem) {
            return activeItem.getBoundingClientRect().height > 0;
          }
        );
        if (!visibleActiveItem) {
          return;
        }
        const yOffset = visibleActiveItem.clientHeight;
        const yDistance = visibleActiveItem.getBoundingClientRect().top - sidebarScrollbar.getBoundingClientRect().top;
        sidebarScrollbar.scrollTo({
          behavior: "instant",
          top: yDistance - yOffset
        });
      }, toggleSidebar = function() {
        sidebarContainer.classList.toggle(
          "max-md:[transform:translate3d(-100%,0,0)]"
        );
        sidebarContainer.classList.toggle(
          "max-md:[transform:translate3d(0,0,0)]"
        );
      };
      scrollToActiveItem();
      enableCollapsibles();
      const overlayClasses = [
        "fixed",
        "inset-0",
        "z-10",
        "bg-slate-50",
        "dark:bg-main",
        "opacity-50"
      ];
      overlay.classList.add("bg-transparent");
      overlay.classList.remove("hidden", ...overlayClasses);
      sidebarOpener.addEventListener("click", (e) => {
        e.preventDefault();
        toggleSidebar();
        if (overlay.classList.contains("bg-transparent")) {
          overlay.classList.add(...overlayClasses);
          overlay.classList.remove("bg-transparent");
        } else {
          overlay.classList.remove(...overlayClasses);
          overlay.classList.add("bg-transparent");
        }
      });
      siderbarCloser.addEventListener("click", (e) => {
        e.preventDefault();
        toggleSidebar();
        if (overlay.classList.contains("bg-transparent")) {
          overlay.classList.add(...overlayClasses);
          overlay.classList.remove("bg-transparent");
        } else {
          overlay.classList.remove(...overlayClasses);
          overlay.classList.add("bg-transparent");
        }
      });
      overlay.addEventListener("click", (e) => {
        e.preventDefault();
        toggleSidebar();
        overlay.classList.remove(...overlayClasses);
        overlay.classList.add("bg-transparent");
      });
    }
    if (dialogue) {
      dialogueOpener.addEventListener("click", () => {
        dialogue.classList.remove("hidden");
        dialogue.classList.add("flex");
        dialogue.classList.remove("opacity-0");
        dialogue.firstElementChild.classList.remove("scale-50");
        dialogue.firstElementChild.classList.add("scale-100");
      });
      dialogueCloser.addEventListener("click", () => {
        dialogue.classList.remove("flex");
        dialogue.classList.add("hidden");
      });
    }
    if (scrollSection) {
      let startAutoScroll = function() {
        scrollInterval = setInterval(() => {
          scrollSection.scrollTop += 1;
          if (scrollSection.scrollTop >= scrollSection.scrollHeight - scrollSection.clientHeight) {
            scrollSection.scrollTop = 0;
          }
        }, 70);
      }, stopAutoScroll = function() {
        clearInterval(scrollInterval);
      };
      startAutoScroll();
      scrollSection.addEventListener("mouseenter", stopAutoScroll);
      scrollSection.addEventListener("mouseleave", startAutoScroll);
    }
    const links = document.querySelectorAll(".divAnchor");
    links.forEach((link) => {
      link.addEventListener("click", () => {
        clickedId = link.id;
        const url = link.getAttribute("data-url");
        window.location.href = url;
      });
    });
    if (openSearch) {
      openSearch.addEventListener("click", () => {
        searchContainer.classList.remove("hidden");
        document.getElementsByTagName("body")[0].dataset.scroll = "false";
      });
    }
    ;
    if (closeSearch) {
      closeSearch.addEventListener("click", () => {
        searchContainer.classList.add("hidden");
        document.getElementsByTagName("body")[0].dataset.scroll = "true";
      });
    }
    ;
    if (remembered && remembered.expiry > Date.now()) {
      user = remembered.user;
      sessionStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("rememberedUser");
      const sessionUser = sessionStorage.getItem("user");
      if (sessionUser) {
        user = JSON.parse(sessionUser);
      }
    }
    ;
    if (prose) {
      document.querySelectorAll(".prose table:not(.lntable)").forEach((table) => {
        table.classList.add("fixed-table");
      });
    }
    ;
    new VulnerawiseSearch({ inputId: "floatingSearchMain", resultId: "floatingSearchMainResults", isModal: false });
    new VulnerawiseSearch({ inputId: "floatingSearch", resultId: "floatingSearchResults", isModal: true });
    const floatingSearchMainResults = document.getElementById("floatingSearchMainResults");
    if (floatingSearchMainResults) {
      floatingSearchMainResults.style.display = "none";
    }
    if (floatingSearchMain) {
      floatingSearchMain.addEventListener("blur", function() {
        const results = document.getElementById("floatingSearchMainResults");
        if (results) results.style.display = "none";
      });
      floatingSearchMain.addEventListener("focus", function() {
        const results = document.getElementById("floatingSearchMainResults");
        if (results && results.innerHTML.trim()) results.style.display = "block";
      });
    }
  });
  function _array_like_to_array(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
    return arr2;
  }
  function _array_without_holes(arr) {
    if (Array.isArray(arr)) return _array_like_to_array(arr);
  }
  function _iterable_to_array(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
  }
  function _non_iterable_spread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _to_consumable_array(arr) {
    return _array_without_holes(arr) || _iterable_to_array(arr) || _unsupported_iterable_to_array(arr) || _non_iterable_spread();
  }
  function _unsupported_iterable_to_array(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _array_like_to_array(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _array_like_to_array(o, minLen);
  }
  (function() {
    var triggers = document.querySelectorAll("[data-dialog-target]");
    var dialogs = document.querySelectorAll("[data-dialog]");
    var backdrops = document.querySelectorAll("[data-dialog-backdrop]");
    var closeTriggers = document.querySelectorAll("[data-dialog-close]");
    if (triggers && dialogs && backdrops) {
      Array.from(triggers).forEach(function(trigger) {
        return Array.from(dialogs).forEach(function(dialog) {
          return Array.from(backdrops).forEach(function(backdrop) {
            if (trigger.dataset.dialogTarget === dialog.dataset.dialog && backdrop.dataset.dialogBackdrop === dialog.dataset.dialog) {
              var _dialog_classList, _dialog_classList1;
              var mountDialog = function mountDialog2() {
                var _dialog_classList2, _dialog_classList12;
                isDialogOpen = true;
                backdrop.classList.toggle("pointer-events-none");
                backdrop.classList.toggle("opacity-0");
                (_dialog_classList2 = dialog.classList).remove.apply(_dialog_classList2, _to_consumable_array(unmountClasses));
                (_dialog_classList12 = dialog.classList).add.apply(_dialog_classList12, _to_consumable_array(mountClasses));
              };
              var unmountDialog = function unmountDialog2() {
                var _dialog_classList2, _dialog_classList12;
                isDialogOpen = false;
                backdrop.classList.toggle("pointer-events-none");
                backdrop.classList.toggle("opacity-0");
                (_dialog_classList2 = dialog.classList).remove.apply(_dialog_classList2, _to_consumable_array(mountClasses));
                (_dialog_classList12 = dialog.classList).add.apply(_dialog_classList12, _to_consumable_array(unmountClasses));
              };
              var mountValue = dialog.dataset.dialogMount || "opacity-1 translate-y-0";
              var unmountValue = dialog.dataset.dialogUnmount || "opacity-0 -translate-y-14";
              var transitionValue = dialog.dataset.dialogTransition || "transition-all duration-300";
              var mountClasses = mountValue.split(" ");
              var unmountClasses = unmountValue.split(" ");
              var transitionClasses = transitionValue.split(" ");
              var isDialogOpen = false;
              (_dialog_classList = dialog.classList).add.apply(_dialog_classList, _to_consumable_array(unmountClasses));
              if (!backdrop.hasAttribute("tabindex")) backdrop.setAttribute("tabindex", 0);
              if (transitionValue !== "false") (_dialog_classList1 = dialog.classList).add.apply(_dialog_classList1, _to_consumable_array(transitionClasses));
              if (dialog.className.includes(unmountValue) && !backdrop.className.includes("pointer-events-none opacity-0")) {
                backdrop.classList.add("pointer-events-none");
                backdrop.classList.add("opacity-0");
              }
              trigger.addEventListener("click", function() {
                return dialog.className.includes(unmountValue) ? mountDialog() : unmountDialog();
              });
              backdrop.addEventListener("click", function(param) {
                var target = param.target;
                var _target_dataset, _target_dataset1;
                if ((target === null || target === void 0 ? void 0 : (_target_dataset = target.dataset) === null || _target_dataset === void 0 ? void 0 : _target_dataset.dialogBackdrop) && (target === null || target === void 0 ? void 0 : (_target_dataset1 = target.dataset) === null || _target_dataset1 === void 0 ? void 0 : _target_dataset1.dialogBackdropClose)) unmountDialog();
              });
              document.addEventListener("keyup", function(param) {
                var key = param.key;
                return key === "Escape" && isDialogOpen ? unmountDialog() : null;
              });
              Array.from(closeTriggers).forEach(function(close) {
                return close.addEventListener("click", function() {
                  return isDialogOpen ? unmountDialog() : null;
                });
              });
            }
          });
        });
      });
    }
  })();
})();
