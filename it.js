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

  var indexOf = func(String_prototype.indexOf);
  var replace = func(String_prototype.replace);

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

  var reStacks = /(?:https?:\/\/\w+(?:(?:\.\w+)*(?::\d+))?)?(?:\/\w+(?:\.\w+)*)+(?:\?[^#]*)?(?:#.*)?:\d+:\d+/g;
  var reStack = /((?:https?:\/\/\w+(?:(?:\.\w+)*(?::\d+))?)?(?:\/\w+(?:\.\w+)*)+(?:\?[^#]*)?)(?:#.*)?:(\d+):(\d+)/;

  function statement(clue) {
    var ms = clue.stack.match(reStacks);
    if (ms && ms.length > 1 && (ms = ms[1].match(reStack))) {
      var path = ms[1], i = ms[2] - 1;
      var lines = fetch(path);
      clue = lines[i++].trim();
      while (clue.slice(-1) !== ';' && i < lines.length) {
        clue += lines[i++].trim();
      }
    }
    else {
      clue = 'Unknown code';
    }
    return clue;
  }

  function flaw(err) {
    var ms = err.stack.match(reStack);
    err = err.toString();
    if (ms) {
      var path = ms[1], l = ms[2] - 1, c = ms[3] - 0;
      var lines = fetch(path);
      err += ident('\n' + lines[l] + '\n' + Array(c).join(' ') + '^' + '\nat ' + ms[0], '  ');
    }
    return err;
  }

  /** 运行机制: ----------------------------------------------------------------------------------------
   *
   */
  function go(gen, timeout, error) {
    return isGenerator(gen) ? new Promise(function (resolve, reject) {
      var state, timer;
      if (timeout) {
        timer = setTimeout(function () {
          gen.done = 1;
          if (error)
            reject(error);
        }, timeout);
      }

      next();

      function next(value) {
        try {
          state = gen.next(value);
        }
        catch (e) {
          return reject(e);
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
            // next(state.value);
            goon(state.value);
          }
          catch (e) {
            return reject(e);
          }
        }
      }
    }) : gen;
  }

  /** 测试机制: ----------------------------------------------------------------------------------------
   *
   */
  var defaultTimeout = 2000;
  var defaultPeriod = 10;

  function newIt(ident, upt, upms) {
    var me = create(itProto);
    me.ident = ident;

    function it(topic, any, ms) {
      var t = now(), err;
      if(upms) {
        var left = upms - (t - upt);
        if(left<=0) return;  // 已超时，不再进行测试
        if(!ms) {
          ms = left;
        }
        else if(ms>left) {
          ms = left;
        }
      }
      else if(ms) {
        err = ms;
      }
      me.t = t;
      me.ms = ms;
      me.log(topic);
      it = newIt(me.ident + '  ', t, ms);
      if (isGeneratorFunction(any)) {
        if(ms) {
          any = (go(any(it), ms, err));
        }
        else {
          any = go(any(it));
        }
        any.then(bind(done, it), bind(fault, it)); // .catch(bind(fault, it));
      }
      else if (isAsyncFunction(any)) {
        any = any(it).then(bind(done, it), bind(fault, it));  //.catch(bind(fault, it));
      }
      else if (isFunction(any)) {
        try {
          any = any(it);
          call(done, it);
        }
        catch (e) {
          call(fault, it, e);
        }
      }
      else if (isGenerator(any)) {
        if(ms) {
          any = go(any, ms, err);
        }
        else {
          any = go(any);
        }
        any.then(bind(done, it), bind(fault, it));  //.catch(bind(fault, it));
      }
      return any;
    }

    return setPrototype(bind(it, me), me);
  }

  function done(value) {
    var me = this, ms = now() - me.zero;
    if(ms >= defaultPeriod) {
      call(mark, me, ms + ' ms');
    }
    return value;
  }

  function fault(e) {
    if(isInteger(e)) {
      call(out, this, 'timeout ' + e + 'ms !');
    }
    else if(isError(e)) {
      call(error, this, flaw(e));
    }
    else if(e === undefined) {
    }
    else {
      call(error, this, String(e));
    }
  }

  /** it 原型: ----------------------------------------------------------------------------------------
   *
   */

  var itProto = {
    log: log,
    delay: delay,
    should: actual
  };

  function delay(ms) {
    var me = this;
    if(me.ms) {
      var t = now();
      var left = me.ms - (t - me.t);
      if(left<=0) throw undefined;  //抛出静默异常，终止后续运行！
      if(ms>left) ms = left;
    }
    return new Promise(partial(setTimeout, [, ms])).then(function(value){
      if(me.ms) {
        var t = now();
        var left = me.ms - (t - me.t);
        if(left<=0) throw undefined;  //抛出静默异常，终止后续运行！
      }
      return value;
    });
  }

  function actual(value) {
    var me = create(assertProto);
    me.topic = statement(Error());
    me.ident = this.ident;
    me.actual = value;
    me.args = piece(arguments, 1);
    return me;
  }

  /** 断言原型: ----------------------------------------------------------------------------------------
   *
   */

  var assertProto = {
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
      var me = this;
      if(!(me.assert = me.actual ^ me._not))
        me.note = 'expect ' + toJson(me.actual) + (me._not ? ' not' : '') + ' be true.';
      report(me);
      return nop;
    },

    get false() {
      var me = this;
      if(!(me.assert = !me.actual ^ me._not))
        me.note = 'expect ' + toJson(me.actual) + (me._not ? ' not' : '') + ' be false.';
      report(me);
      return nop;
    },

    get ok() {
      var me = this;
      if(!(me.assert = me.actual ^ me._not))
        me.note = 'expect ' + toJson(me.actual) + NOT(me) + ' be ok.';
      report(me);
      return nop;
    },

    equal: function (value) {
      var me = this;
      if( !(me.assert = (me.actual == value) ^ me._not))
        me.note = 'expect ' + toJson(me.actual) + NOT(me) + ' equal to ' + toJson(value) + ' .';
      report(me);
    },

    throw: function(err) {
      var me = this;
      try{
        me.actual.apply(undefined, me.args);
        if(!(me.assert = me._not)){
          me.note = 'expect' + NOT(me) + ' throw but not throw.';
        }
      }
      catch(e) {
        var message = e.message;
        if(err) {
          if(!(me.assert = (message === err) ^ me._not))
            me.note = 'expect' + NOT(me) + ' throw ' + toJson(err) + ' but throw ' + toJson(message) + '.';
        }
        else {
          if(!(me.assert = !me._not))
            me.note = 'expect' + NOT(me) + ' throw but throw ' + toJson(message) + '.';
        }
      }
      report(me);
    }

  };

  function NOT(me) { return me._not ? ' not' : ''; }
  /** 报告输出: ----------------------------------------------------------------------------------------
   *
   */
  function report(me) {
    if(me.assert) {
      call(okey, me, me.topic);
    }
    else {
      call(fail, me, me.topic);
      if(me.note) {
        call(note, me, ident(me.note, '  '));
      }
    }
    // var topic = me.topic;
    // var assert = !!me.assert ^ !!me._not;
    // var op = ops[me.op];
    // if (assert) {
    //   call(okey, me, topic);
    // }
    // else {
    //   call(fail, me, topic);
    //   topic = 'expected ' + toJson(me.actual) + ' ' + op[!me._not & 1];
    //   if (op[2]) {
    //     topic += ' ' + toJson(me.value);
    //   }
    //   topic = ident(topic, '  ');
    //   call(note, me, topic);
    // }
  }

  var ident = partial(replace, [, /^/gm]);

  function idents(args, blank) {
    args[0] = ident(args[0], blank);
    return args;
  }

  function print(type, args) {
    apply(console.log, console, idents(stylize(type, args), this.ident));
  }

  function log() {
    call(print, this, 'log', arguments);
  }

  function okey() {
    call(print, this, 'okey', arguments);
  }

  function fail() {
    call(print, this, 'fail', arguments);
  }

  function note() {
    call(print, this, 'note', arguments);
  }

  function mark() {
    call(print, this, 'mark', arguments);
  }

  function out() {
    call(print, this, 'out', arguments);
  }

  function error() {
    call(print, this, 'error', arguments);
  }

  var ops = {
    ok: ['not ok', 'ok'],
    equal: ['not equal to', 'equal to', 1],
    equiv: ['not equivalent to', 'equivalent to', 1],
    same: ['not be same as', 'be same as', 1]
  };

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

  function fetch(path) {
    var lines;
    if (!(lines = files[path])) {
      lines = files[path] = get(path).split('\n');
    }
    return lines;
  }

})();