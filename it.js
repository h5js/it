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
   * Promise, Generator, Async Function
   */
  var isPromise = bind(_isPrototypeOf, Promise.prototype);

  function isSyncFunction(any) {
    return isFunction(any) && Object.toString.call(any).substr(0, 9) === 'function ';
  }

  function isAsyncFunction(any) {
    return isFunction(any) && Object.toString.call(any).substr(0, 5) === 'async';
  }

  var isGeneratorFunction = function(any){
    return isFunction(any) && Object.toString.call(any).substr(0, 9) === 'function*';
  };

  var isGenerator = bind(_isPrototypeOf, getPrototype(function*(){}.prototype));



  /** 扩展支持: ----------------------------------------------------------------------------------------
   *
   */

  var reStacks = /(?:https?:\/\/\w+(?:(?:\.\w+)*(?::\d+))?)?(?:\/\w+(?:\.\w+)*)+(?:\?[^#]*)?(?:#.*)?:\d+:\d+/g;
  var reStack = /((?:https?:\/\/\w+(?:(?:\.\w+)*(?::\d+))?)?(?:\/\w+(?:\.\w+)*)+(?:\?[^#]*)?)(?:#.*)?:(\d+):\d+/;

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



  /** 运行机制: ----------------------------------------------------------------------------------------
   *
   */
  var go = bind(function (any) {
      if(isGeneratorFunction(any)) {
        any = new Promise(bind(this, any()));
      }
      else if(isGenerator(any)) {
        any = new Promise(bind(this, any));
      }
      else if(isFunction(any)) {
        any = any();
      }
      return any;
    },
    function (resolve, reject) {
      var me = this;
      var next = me.next.bind(me);
      goto(next);
      function goto(next, value) {
        var state;

        try {
          state = next(value);
          value = state.value;
          if (isPromise(value)) {
            value.then(goon, stop);
          }
          else if (isGenerator(value)) {
            new Promise(promise.bind(value)).then(goon, stop);
          }
          else {
            goon(value);
          }
        }
        catch (e) {
          reject(e);
        }

        function goon(value) {
          if (state.done) {
            resolve(value);
          }
          else {
            goto(next, value);
          }
        }

        function stop(error) {
          try {
            state = me.throw(error);
            goto(next, state.value);
          }
          catch (e) {
            reject(e);
          }
        }
      }
    }
  );

  /** 测试机制: ----------------------------------------------------------------------------------------
   *
   */

  var itProto = {
    log: log,
    delay: delay,
    should: actual
  };

  function newit(ident) {
    var me = create(itProto);
    me.ident = ident;
    function it(topic, func) {
      me.log(topic);
      return go(func(newit(ident + '  ')));
    }

    setPrototype(it, me);
    return it;
  }

  function delay(ms) {
    return new Promise(partial(setTimeout, [, ms]));
  }

  function actual(value) {
    var me = create(assertProto);
    me.topic = statement(Error());
    me.ident = this.ident;
    me.actual = value;
    me.args = piece(arguments, 1);
    return me;
  }

  var assertProto = {
    get be() {return this},
    get ok() {
      var me = this;
      me.op = 'ok';
      me.assert = me.actual;
      report(me);
      return nop;
    }
  };

  /** 报告输出: ----------------------------------------------------------------------------------------
   *
   */
  var ident = partial(replace, [, /^/gm]);
  function idents(args, blank) {
    args[0] = ident(args[0], blank);
    return args;
  }

  function log() {
    var args = idents(arguments, this.ident);
    apply(console.log, console, args);
  }

  function okey() {
    var args = idents(stylize('okey', arguments), this.ident);
    apply(console.log, console, args);
  }

  function fail() {
    var args = idents(stylize('fail', arguments), this.ident);
    apply(console.log, console, args);
  }

  function note() {
    var args = idents(stylize('note', arguments), this.ident);
    apply(console.log, console, args);
  }

  var ops = {
    ok: ['not ok', 'ok'],
    equal: ['not equal to', 'equal to', 1],
    equiv: ['not equivalent to', 'equivalent to', 1],
    same: ['not be same as', 'be same as', 1]
  };

  function report(me) {
    var topic = me.topic;
    var assert = !!me.assert ^ !!me._not;
    var op = ops[me.op];
    if (assert) {
      call(okey, me, topic);
    }
    else {
      call(fail, me, topic);
      topic = 'expected ' + toJson(me.actual) + ' ' + op[!me._not & 1];
      if (op[2]) {
        topic += ' ' + toJson(me.value);
      }
      topic = ident(topic, '  ');
      call(note, me, topic);
    }
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
    this.it = newit('');
    get = function (path) {
      var http = new XMLHttpRequest;
      http.open('GET', path, false);
      http.send();
      return http.status / 100 ^ 2 ? '' : http.responseText;
    };

    styles = {
      okey: { icon: '%c✓ ', color: 'lime'},
      fail: { icon: '%c✖ ', color: 'tomato'},
      note: { icon: '%c', color: 'yellow'}
    };

    stylize = function(key, args) {
      args[0] = styles[key].icon + args[0];
      splice(args, 1, 0, 'color:'+styles[key].color);
      return args;
    };
  }
  else {
    module.exports = newit('');
    var fs = require('fs');
    get = function (path) {
      return fs.readFileSync(path, {encoding: 'utf-8'});
    };

    styles = {
      okey: '\x1b[32m✓ ',
      fail: '\x1b[31m✖ ',
      note: '\x1b[33m'
    };

    stylize = function(key, args) {
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