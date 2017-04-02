/** it.js --------------------------------------------------------------------------------------------------------------
 * The most simplest test library in the world for JavaScript.
 */

(function () {

  /** 基础支持: ----------------------------------------------------------------------------------------
   *
   */

  /** --------------------------------------------------------------------------
   * Function
   */
  var nop = Function.prototype;
  var _call = nop.call;
  var _apply = nop.apply;
  var _bind = nop.bind;
  var func = _call.bind(_bind, _call);
  var bind = func(_bind);
  var call = func(_call);
  var apply = func(_apply);

  function partial(func, vars) {
    return function () {
      var args = arguments;
      for (var i = 0; i < vars.length; i++) {
        if (i in vars) {
          splice(args, i, 0, vars[i]);
        }
      }
      return func.apply(this, args);
    }
  }

  function isFunction(any) {
    return typeof any === 'function';
  }

  /** --------------------------------------------------------------------------
   * Object
   */
  var Object_prototype = Object.prototype;
  var create = Object.create;

  function isObject(any) {
    return Object(any) === any;    // typeof any === 'object' && any !== nil;
  }

  function isObjective(any) {
    return isObject(any) && !isFunction(any);
  }

  var isInteger = Number.isInteger;

  var getPrototype = Object.getPrototypeOf;
  var setPrototype = Object.setPrototypeOf;
  var defineProperty = Object.defineProperty;
  var defineProperties = Object.defineProperties;
  var _isPrototypeOf = Object_prototype.isPrototypeOf;


  /** --------------------------------------------------------------------------
   * String
   */
  var String_prototype = String.prototype;

  function isString(any) {
    return typeof any === 'string';
  }

  var trim = func(String_prototype.trim);
  var indexOf = func(String_prototype.indexOf);
  var replace = func(String_prototype.replace);
  var match = func(String_prototype.match);

  function dup(x, n) {
    for (var dup = ''; n-- > 0;) dup += x;
    return dup;
  }

  /** --------------------------------------------------------------------------
   * Array
   */
  var Array_prototype = Array.prototype;
  var isArray = Array.isArray;
  var seek = func(Array_prototype.indexOf);
  var join = func(Array_prototype.join);
  var unite = func(Array_prototype.concat);
  var piece = func(Array_prototype.slice);
  var splice = func(Array_prototype.splice);
  var push = func(Array_prototype.push);
  var pop = func(Array_prototype.pop);

  function peak(ary) {
    return ary[ary.length - 1];
  }

  /** --------------------------------------------------------------------------
   * RegExp
   */
  var RegExp_prototype = RegExp.prototype;
  var _test = RegExp_prototype.test;

  /** --------------------------------------------------------------------------
   * Date
   */
  var now = Date.now;

  /** --------------------------------------------------------------------------
   * Error
   */
  var isError = bind(_isPrototypeOf, Error.prototype);

  /** --------------------------------------------------------------------------
   * Promise, Generator, Async Function
   */
  var isPromise = bind(_isPrototypeOf, Promise.prototype);
  var Generator_prototype = getPrototype(getPrototype(function*() {
  }()));
  var isGenerator = bind(_isPrototypeOf, Generator_prototype);

  function isSyncFunction(any) {
    return isFunction(any) && Object.toString.call(any).substr(0, 9) === 'function ';
  }

  function isAsyncFunction(any) {
    return isFunction(any) && Object.toString.call(any).substr(0, 5) === 'async';
  }

  var isGeneratorFunction = function (any) {
    return isFunction(any) && Object.toString.call(any).substr(0, 9) === 'function*';
  };


  /** 扩展支持: ----------------------------------------------------------------------------------------
   *
   */

  var reTraces = /(?:https?:\/\/\w+(?:(?:\.\w+)*(?::\d+))?)?(?:\/\w+(?:\.\w+)*)+(?:\?[^#]*)?(?:#.*)?:\d+:\d+/g;
  var reTrace = /((?:https?:\/\/\w+(?:(?:\.\w+)*(?::\d+))?)?(?:\/\w+(?:\.\w+)*)+(?:\?[^#]*)?)(?:#.*)?:(\d+):(\d+)/;

  /** 获取错误追踪信息 */
  function getTrace(err, level) {
    var ms, trace, lines;
    if (ms = match(err.stack, reTraces)) {
      if (!isInteger(level))
        level = 0;
      if ((ms = ms[level]) && (ms = match(ms, reTrace))) {
        var row = ms[2] - 1, col = ms[3] - 1;
        trace = {
          path: ms[0],
          row: row,
          col: col
        };
        if ((lines = fetchLines(ms[1])) && row < lines.length) {
          trace.code = lines[row];
        }
        else {
          trace.code = '"unknown source code";'
        }
        return trace;
      }
    }
  }

  /** 运行机制: ----------------------------------------------------------------------------------------
   *
   */
  function go(gen, ms) {
    return isGenerator(gen) ? new Promise(function (resolve, reject) {
      var state, timer;
      if (ms > 0) {
        timer = setTimeout(function () {
          gen.done = 1;
          reject(ms);
        }, ms);
      }

      next();

      function next(value) {
        try {
          state = gen.next(value);
        }
        catch (err) {
          return reject(err);
        }
        value = state.value;
        if (isGenerator(value)) {
          Object.setPrototypeOf(value, gen);
          go(value).then(goon, stop);
        }
        else if (isPromise(value)) {
          value.then(goon, stop);
        }
        else {
          goon(value);
        }
      }

      function goon(value) {
        if (gen.done) {
          if (!state.done) {
            state = gen.return();
            clearTimeout(gen.timer);
          }
        }
        else if (state.done) {
          gen.done = 1;
          resolve(value);
        }
        else {
          next(value);
        }
      }

      function stop(value) {
        if (gen.done) {
          if (!state.done) {
            state = gen.return();
            clearTimeout(timer);
          }
        }
        else {
          try {
            state = gen.throw(value);
            goon(state.value);
          }
          catch (err) {
            return reject(err);
          }
        }
      }
    }) : gen;
  }

  /** 测试机制: ----------------------------------------------------------------------------------------
   *
   */
  var slow = 10;

  function newIt(ident, upt, upms) {
    var me = create(itProto);
    me.ident = ident;

    function it(topic, any, ms) {
      var t = now(), err;
      if (upms) {
        var left = upms - (t - upt);
        if (left <= 0) return;  // 已超时，不再进行测试
        if (!ms) {
          ms = left;
        }
        else if (ms > left) {
          ms = left;
        }
      }
      else if (ms) {
        err = ms;
      }
      me.t = t;
      me.ms = ms;
      me.say('log', topic);
      it = newIt(me.ident + '  ', t, ms);
      if (isGeneratorFunction(any)) {
        if (ms) {
          any = (go(any(it), ms, err));
        }
        else {
          any = go(any(it));
        }
        any.then(bind(fulfilled, me), bind(rejected, me));
      }
      else if (isAsyncFunction(any)) {
        any = any(it).then(bind(fulfilled, me), bind(rejected, me));
      }
      else if (isFunction(any)) {
        try {
          any = any(it);
          call(fulfilled, me);
        }
        catch (err) {
          call(rejected, me, err);
        }
      }
      else if (isGenerator(any)) {
        if (ms) {
          any = go(any, ms, err);
        }
        else {
          any = go(any);
        }
        any.then(bind(fulfilled, it), bind(rejected, it));
      }
      return any;
    }

    return setPrototype(bind(it, me), me);
  }

  /** 测试履约 */
  function fulfilled(value) {
    var me = this, ms = now() - me.zero;
    if (ms >= slow) {
      me.say('mark', ms + 'ms');
    }
    return value;
  }

  /** 测试被拒 */
  function rejected(err) {
    var me = this;
    if (isInteger(err)) {   // 超时拒绝
      me.say('out', 'timeout ' + err + 'ms!');
    }
    else if (isError(err)) {  // 代码故障
      sorry(me, err);
    }
    else if (err === undefined) { // 静默异常
    }
    else {
      me.say('error', String(err));
    }
  }

  /** it 原型: ----------------------------------------------------------------------------------------
   *
   */

  var itProto = {
    say: say,
    delay: delay,
    should: actual
  };

  function delay(ms) {
    var me = this;
    if (me.ms) {
      var t = now();
      var left = me.ms - (t - me.t);
      if (left <= 0) throw undefined;  //抛出静默异常，终止后续运行！
      if (ms > left) ms = left;
    }
    return new Promise(partial(setTimeout, [, ms])).then(function (value) {
      if (me.ms) {
        var t = now();
        var left = me.ms - (t - me.t);
        if (left <= 0) throw undefined;  //抛出静默异常，终止后续运行！
      }
      return value;
    });
  }

  function actual(value) {
    var me = create(assertProto);
    var trace = getTrace(Error(), 1);
    if (trace) {
      me.topic = trim(trace.code);
      me.path = trace.path;
    }
    else {
      me.topic = 'unknown assert';
    }
    me.ident = this.ident;
    me.actual = value;
    me.args = piece(arguments, 1);
    return me;
  }

  /** 断言原型: ----------------------------------------------------------------------------------------
   *
   */

  var assertProto = {
    say: say,

    get be() {
      return this
    },

    get should() {
      return this;
    },

    get not() {
      var me = this;
      me._not = !me._not;
      return me;
    },

    get true() {
      return bool(this, this.actual, 'true');
    },

    get false() {
      return bool(this, !this.actual, 'false');
    },

    get ok() {
      return bool(this, this.actual, 'ok');
    },

    equal: function (value) {
      var me = this;
      if (!(me.assert = (me.actual == value) ^ me._not))
        me.note = 'expect ' + toJson(me.actual) + NOT(me) + ' equal to ' + toJson(value) + ' .';
      report(me);
    },

    throw: function (err) {
      var me = this, actual = me.actual;
      if (isFunction(actual)) {
        try {
          me.actual.apply(undefined, me.args);
          if (!(me.assert = me._not)) {
            me.note = 'expect' + NOT(me) + ' throw but not throw.';
          }
        }
        catch (e) {
          var message = e.message;
          if (err) {
            if (!(me.assert = (message === err) ^ me._not))
              me.note = 'expect' + NOT(me) + ' throw ' + toJson(err) + ' but throw ' + toJson(message) + '.';
          }
          else {
            if (!(me.assert = !me._not))
              me.note = 'expect' + NOT(me) + ' throw but throw ' + toJson(message) + '.';
          }
        }
        report(me);
      }
      else {
        sorry(me, Error('.throw() assert can be only used for function object!'), 1);
      }
    }

  };

  function bool(me, assert, word) {
    if (!(me.assert = assert ^ me._not))
      me.note = 'expect ' + toJson(me.actual) + NOT(me) + ' be ' + word + '.';
    report(me);
    return nop;
  }

  function NOT(me) {
    return me._not ? ' not' : '';
  }

  /** 报告输出: ----------------------------------------------------------------------------------------
   *
   */
  function report(me) {
    if (me.assert) {
      me.say('okey', me.topic);
    }
    else {
      me.say('fail', me.topic);
      if (me.note) {
        // call(note, me, ident(me.note, '  '));
        me.say('note', ident(me.note, '  '));
      }
      if (me.path) {
        me.say('note', ident(me.path, '  '));
      }
    }
  }

  /** 报告错误 */
  function sorry(me, err, level) {
    var trace = getTrace(err, level);
    err = err.toString();
    if (trace) {
      err += ident('\n' + trace.code + '\n' + dup(' ', trace.col) + '^' + '\nat ' + trace.path, '  ');
    }
    me.say('error', err);
  }

  var ident = partial(replace, [, /^/gm]);

  function say(type) {
    var args = stylize(type, piece(arguments,1));
    args[0] = ident(args[0], this.ident);
    apply(console.log, console, args);
  }

  var isIdx = bind(_test, /^\d+$/);
  var isIdentifier = bind(_test, /^[A-Za-z_$][\w$]*$/);

  function toJson(any) {
    var json, i, key;
    if (isFunction(any)) {
      json = any.toString();
    }
    else if (isArray(any)) {
      json = [];
      i = 0;
      for (key in any) {
        if (isIdx(key)) {
          json[i++] = toJson(any[key]);
        }
        else if (isIdentifier(key)) {
          json[i++] = key + ':' + toJson(any[key]);
        }
        else {
          json[i++] = JSON.stringify(key) + ":" + toJson(any[key]);
        }
      }
      json = '[' + join(json) + ']';
    }
    else if (isObject(any)) {
      json = [];
      i = 0;
      for (key in any) {
        if (isIdentifier(key)) {
          json[i++] = key + ':' + toJson(any[key]);
        }
        else {
          json[i++] = JSON.stringify(key) + ":" + toJson(any[key]);
        }
      }
      json = '{' + join(json) + '}';
    }
    else {
      json = JSON.stringify(any);
    }
    return json;
  }

  /** 运行环境: ----------------------------------------------------------------------------------------
   *
   */
  var get;
  var stylize, styles;

  if (this.window) {
    this.it = newIt('');
    get = function (path) {
      var http = new XMLHttpRequest;
      http.open('GET', path, false);
      http.send();
      return http.status / 100 ^ 2 ? '' : http.responseText;
    };

    //
    styles = {
      log: {icon: '%c', color: 'sliver'},
      okey: {icon: '%c✔ ', color: 'lime'},
      fail: {icon: '%c✘ ', color: 'tomato'},
      note: {icon: '%c', color: 'brown'},
      mark: {icon: '%c✈ ', color: 'royalblue'}, // ▶ ⚡ ♫ ♪ ✈
      out: {icon: '%c⤦ ', color: 'magenta'}, //purple magenta crimson plum
      error: {icon: '%c⦸ ', color: 'brown'}
    };

    stylize = function (key, args) {
      args[0] = styles[key].icon + args[0];
      splice(args, 1, 0, 'color:' + styles[key].color);
      return args;
    };
  }
  else {
    module.exports = newIt('');
    var fs = require('fs');
    get = function (path) {
      return fs.readFileSync(path, {encoding: 'utf-8'});
    };

    styles = {
      log: '\x1b[1m',
      okey: '\x1b[32m\x1b[1m✔ ',
      fail: '\x1b[31m\x1b[1m✘ ',
      note: '\x1b[31m',
      mark: '\x1b[34m\x1b[1m✈ ',
      out: '\x1b[35m⤦ ',
      error: '\x1b[31m⦸ '
    };

    stylize = function (key, args) {
      args[0] = styles[key] + args[0] + '\x1b[0m';
      return args;
    };
  }

  var files = {};

  function fetchLines(path) {
    var lines;
    if (!(lines = files[path])) {
      lines = files[path] = get(path).split('\n');
    }
    return lines;
  }

})();