/** it.js --------------------------------------------------------------------------------------------------------------
 * The most simplest test library in the world for JavaScript.
 */

(function (modulize, global, Function, Object, Number, String, Array, RegExp, Date, Error, Promise) {

  /** 基础支持: ----------------------------------------------------------------------------------------
   *
   */
  var undefined;

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

  var getPrototype = Object.getPrototypeOf;
  var setPrototype = Object.setPrototypeOf;
  var _isPrototypeOf = Object_prototype.isPrototypeOf;
  var isPrototypeOf = func(_isPrototypeOf);


  /** --------------------------------------------------------------------------
   * Number
   */
  var isInteger = Number.isInteger;

  /** --------------------------------------------------------------------------
   * String
   */
  var String_prototype = String.prototype;

  function isString(any) {
    return typeof any === 'string';
  }

  var trim = func(String_prototype.trim);
  var replace = func(String_prototype.replace);
  var match = func(String_prototype.match);
  var split = func(String_prototype.split);

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

  var getFunctionCode = func(String.toString);
  var GeneratorFunction_prototype = getPrototype(function*() {});
  var isGenerator = bind(_isPrototypeOf, GeneratorFunction_prototype.prototype);

  // var AsyncFunction_prototype = getPrototype(async function(){});

  var isNormalCode = bind(_test, /^function /);
  var isGeneratorCode = bind(_test, /^function\*/);
  var isAsyncCode = bind(_test, /^async function /);
  var isArrowCode = bind(_test, /^\(?\s*(?:[\w$]+(?:\s*,\s*[\w$]+)*\s*)?\)?\s*=>/);

  function isNormalFunction(any) {
    return isFunction(any) && isNormalCode(getFunctionCode(any));
  }

  function isArrowFunction(any) {
    return isFunction(any) && isArrowCode(getFunctionCode(any));
  }

  function isSyncFunction(any) {
    return isFunction(any) && ((any = getFunctionCode(any)) && isNormalCode(any) || isArrowCode(any));
  }

  var isGeneratorFunction = function (any) {
    return isPrototypeOf(GeneratorFunction_prototype, any) || isFunction(any) && isGeneratorCode(getFunctionCode(any));
  };

  function isAsyncFunction(any) {
    // return isPrototypeOf(AsyncFunction_prototype, any) || isFunction(any) && isAsyncCode(getFunctionCode(any));
    return isFunction(any) && isAsyncCode(getFunctionCode(any));
  }


  /** 扩展支持: ----------------------------------------------------------------------------------------
   *
   */
  var source;
  var reEval = /eval at run [^<]*<anonymous>/g;
  var reTraces = /(?:https?:\/\/[\w.-]+(?::\d+)?|)[\w./-]+(?:\?.*|):\d+:\d+/g;
  var reTrace = /((?:https?:\/\/[\w.-]+(?::\d+)?|)[\w./-]+(?:\?.*|)):(\d+):(\d+)/;
  /** 获取错误追踪信息 */
  function getTrace(err, level) {
    var trace = err.stack, ms, codes;
    if(source) {
      trace = replace(trace, reEval, source);
    }
    if (ms = match(trace, reTraces)) {
      if (!isInteger(level)) level = 0;
      if ((ms = ms[level]) && (ms = match(ms, reTrace))) {
        var path = ms[1], row = ms[2] - 1, col = ms[3] - 1;
        trace = {
          loc: ms[0],
          path: path,
          row: row,
          col: col
        };
        if ((codes = getCodes(path)) && row < codes.length) {
          trace.code = codes[row];
        }
        else {
          trace.code = '"unknown source code";'
        }
        return trace;
      }
    }
  }

  /**
   * purl(url, rel)
   *  计算相对路径并规格化
   */
  var reUrl = /^(https?:\/\/[\w-.]+(?::\d+)?|)([\w\/.-]+)(.*|)/;
  var reRel = /^(https?:\/\/[\w-.]+(?::\d+)?|)(\/(?:[\w.-]+\/)*)/;

  function purl(url, rel) {
    var ms = match(url, reUrl);
    if (ms && !ms[1] && (rel = match(rel, reRel))) {
      url = ms[2];
      if (url[0] !== '/') {
        url = rel[2] + url;
      }
      url = rel[1] + furl(url) + ms[3];
    }
    return url;
  }

  var reSlash = /\/+/;

  function furl(src) {
    var des = [];
    src = split(src, reSlash);
    for (var i = 0, l = src.length; i < l; i++) {
      var sym = src[i];
      if (des.length) {
        if (sym != '.') {
          var end = peak(des);
          if (sym != '..') {
            if (end == '.' && sym) pop(des);
            push(des, sym);
          }
          else if (end == '..') {
            push(des, sym);
          }
          else if (end) {
            pop(des);
          }
        }
      }
      else {
        push(des, sym);
      }
    }
    return join(des, '/');
  }

  /** 运行机制: ----------------------------------------------------------------------------------------
   *
   */
  function go(gen, limit) {
    return isGenerator(gen) ? new Promise(function (resolve, reject) {
      var state, timer;
      if (limit > 0) {
        timer = setTimeout(function () {
          gen.done = 1;
          reject(limit);
        }, limit);
      }

      next();

      function next(value) {
        try {
          state = gen.next(value);
        } catch (err) {
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
            clearTimeout(timer);
          }
        }
        else if (state.done) {
          clearTimeout(timer);
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
          } catch (err) {
            return reject(err);
          }
        }
      }
    }) : gen;
  }

  /** 测试机制: ----------------------------------------------------------------------------------------
   *
   */
  function newIt(ident, tick, life, ms) {
    it.tick = tick;
    it.life = life;
    it.ms = ms;
    it.ident = ident;
    it.its = [];
    it.asserts = [];


    return setPrototype(it, itProto);

    function it() {
      var tick = now(), life = it.life - (tick - it.tick);
      if(life <= 0)
        throw it.ms;  // 若上层 it 已超时，抛出超时异常给上层。

      var args = arguments;
      if(!args.length) return Promise.resolve();

      var ms = isInteger(args[0]) ? args[0] : isInteger(args[1]) ? args[1] : undefined;

      var topic = isString(args[0]) ? args[0] : undefined;
      if(topic !== undefined)
        print(it, '#;%s', topic);

      var any = isString(args[0]) ? isInteger(args[1]) ? args[2] : args[1] : isInteger(args[0]) ? args[1] : args[0];


      if(isFunction(any)) {
        if(life > ms) {
          life = ms;
        }
        var sub = newIt(ident + '  ', tick, life || ms, ms);
        push(it.its, sub);

        if(isGeneratorFunction(any) || isAsyncFunction(any)) {
          any = any(sub);
        }
        else if(any.length>1) {
          any = new Promise(function(resolve, reject){
            var timer = life || ms;
            if(timer !== undefined) {
              timer = setTimeout(function(){
                timer = null;
                reject(sub.ms);
              }, timer);
            }
            any(sub, done, to);

            function done(value) {
              timer = clearTimeout(timer);
              resolve(value);
            }

            function to(any){
              return function(){
                if(timer !== null)
                  return apply(any, this, arguments);
              }
            }
          }).then(fulfilled, rejected);
        }
        else {
          try {
            any = any(sub);
            any = fulfilled(any);
          }
          catch (err) {
            rejected(any = err);
          }
          return any;
        }
      }

      if(isGenerator(any)) {
        any = go(any, ms).then(fulfilled, rejected);
      }
      else if(isPromise(any)) {
        any = any.then(fulfilled, rejected);
      }
      else if(isFunction(any)){
      }
      else if( ms !== undefined ) {
        any = it.delay(ms, any).then(fulfilled, rejected);
      }

      return any;
    }

    /** 测试履约 */
    function fulfilled(value) {
      return value;
    }

    /** 测试被拒 */
    function rejected (err) {
      if (isInteger(err)) {   // 超时拒绝
        print(it, '#rr;Timeout %dms!#;', err);
      }
      else if (isError(err)) {  // 代码故障
        sorry(it, err);
      }
      else if (err === undefined) { // 静默异常
      }
      else {
        print(it, '#rr;%s#;', String(err));
      }
    }

  }

  /** it 原型: ----------------------------------------------------------------------------------------
   *
   */
  var itProto = {
    get begin() {
      this.trace = getTrace(Error(), 1);
    },
    get end() {
      var it = this, trace = it.trace, end = getTrace(Error(), 1);
      if (trace && end.path === trace.path) {
        var codes = getCodes(trace.path);
        if (codes.length) {
          codes = piece(codes, trace.row + 1, end.row).join('\n');
          if (codes) {
            codes = replace(codes, RegExp('^' + it.ident, 'gm'), '');
            print(it, '#ccc;%s#;', codes);
          }
        }
      }
      it.trace = null;
    },
    get as() {
      var it = this;
      var code = getTrace(Error(), 1);
      if (code) {
        code = replace(code.code, RegExp('^' + it.ident + '|\\s*\\bit\\.as\\b.*$', 'g'), '');
        print(it, '#ccc;%s#;', code);
      }
    },
    delay: delay,
    should: actual,
    sum: sum
  };

  function delay(ms, value) {
    var it = this;
    if (it.life) {
      var tick = now();
      var life = it.life - (tick - it.tick);
      if (life <= 0) throw it.ms;  //抛出超时静默异常，终止后续运行！
      if (ms > life) ms = life;
    }
    return new Promise(partial(setTimeout, [, ms, value]));
  }

  function actual(value) {
    var me = this;
    var assert = create(assertProto);
    push(me.asserts, assert);
    var trace = getTrace(Error(), 1);
    if (trace) {
      assert.topic = trim(trace.code);
      assert.loc = trace.loc;
    }
    else {
      assert.topic = 'unknown assert';
    }
    assert.ident = me.ident;
    assert.actual = value;
    assert.args = piece(arguments, 1);
    assert.ms = 0;
    assert.tick = now();
    return assert;
  }

  function sum() {
    var sum = sumit(this);
    var total = sum.total, done = sum.done, okey = sum.okey, fail = sum.fail, miss = sum.miss, ms = sum.ms;
    var doneRate = Math.floor(done/total*100);
    var okeyRate = Math.floor(okey/done*100);
    var failRate = Math.ceil(fail/done*100);
    var missRate = Math.ceil(miss/total*100);

    print(this, '#b;✈#; Total asserts: #b;%d#;, done: #%s;%d(%d％)#;, okey: #%s;%d(%d％)#;, fail: #%s;%d(%d％)#;, missing: #%s;%d(%d％)#; (in #b;%dms#;).',
      total, miss?'rr':'gg', done, doneRate, fail?'rr':'gg', okey, okeyRate, fail?'rr':'gg', fail, failRate, miss?'rr':'gg', miss, missRate, ms
    );
  }

  function sumit(it){
    var total, done = 0, okey = 0, fail = 0, miss = 0, ms = 0, i;
    var asserts = it.asserts, assert;
    for (i = 0; assert = asserts[i]; i++) {
      switch (assert.state) {
        case 1 :
          done++;
          okey++;
          break;
        case -1:
          done++;
          fail++;
          break;
        default:
          miss++;
      }
      ms += assert.ms;
    }
    total = i;

    var its = it.its;
    for(i = 0; i<its.length; i++) {
      var sub = sumit(its[i]);
      total += sub.total;
      done += sub.done;
      okey += sub.okey;
      fail += sub.fail;
      miss += sub.miss;
      ms += sub.ms;
    }

    return {
      total: total,
      done: done,
      okey: okey,
      fail: fail,
      miss: miss,
      ms: ms
    }
  }

  /** 断言原型: ----------------------------------------------------------------------------------------
   *
   */

  var assertProto = {
    /** assert chain: */
    get be() { return this },
    get should() { return this },
    get an() { return this },
    get of() { return this },
    get a() { return this },
    get and() { return this },
    get been() { return this },
    get have() { return this },
    get has() { return this },
    get with() { return this },
    get is() { return this },
    get which() { return this },
    get the() { return this },

    /** Negation logical: */
    get not() {
      var me = this;
      me._not = !me._not;
      return me;
    },

    /** Empty: */
    get undefined() { return be(this, this.actual === undefined, 'undefined') },
    get null() { return be(this, this.actual === null, 'null') },

    /** Boolean: */
    get boolean() { return be(this, typeof this.actual === 'boolean', 'boolean value') },
    get Boolean() { return be(this, this.actual instanceof Boolean, 'Boolean object') },
    get true() { return be(this, this.actual === true, 'true') },
    get false() { return be(this, this.actual === false, 'false') },
    get ok() { return be(this, this.actual, 'ok') },

    /** String: */
    get string() { return be(this, typeof this.actual === 'string', 'string value') },
    get String() { return be(this, this.actual instanceof String, 'String object') },

    /** Symbol: */
    get symbol() { return be(this, typeof this.actual === 'symbol', 'symbol value') },

    /** Number: */
    get number() { return be(this, typeof this.actual === 'number', 'number value') },
    get Number() { return be(this, this.actual instanceof Number, 'Number object') },
    get integer() { return be(this, Number.isInteger(this.actual), 'integer value') },
    get safeInteger() { return be(this, Number.isSafeInteger(this.actual), 'safe integer value') },
    get NaN() { return be(this, this.actual !== this.actual, 'NaN') },
    get finite() { return be(this, Number.isFinite(this.actual), 'finite number value') },

    /** Object */
    get object() { return be(this, isObject(this.actual), 'object') },
    get objective() { return be(this, isObjective(this.actual), 'objective') },

    instanceof: function (type) {
      // TODO
    },

    /** Function: */
    get function () { return be(this, isFunction(this.actual), 'function') },
    get SyncFunction() { return be(this, isSyncFunction(this.actual), 'Sync function') },
    get NormalFunction() { return be(this, isNormalFunction(this.actual), 'Normal function') },
    get ArrowFunction() { return be(this, isArrowFunction(this.actual), 'Arrow function') },
    get GeneratorFunction() { return be(this, isGeneratorFunction(this.actual), 'Generator function') },
    get AsyncFunction() { return be(this, isAsyncFunction(this.actual), 'Async function') },

    /** Built-in types: */
    get Date() { return be(this, this.actual instanceof Date, 'Date object') },
    get Error() { return be(this, isError(this.actual), 'Error object') },
    get RegExp() { return be(this, this.actual instanceof RegExp, 'RegExp object') },
    get Array() { return be(this, this.actual instanceof Array, 'Array object') },
    get Map() { return be(this, this.actual instanceof Map, 'Map object') },
    get Set() { return be(this, this.actual instanceof Set, 'Set object') },
    get ArrayBuffer() { return be(this, this.actual instanceof ArrayBuffer, 'ArrayBuffer object') },
    get Promise() { return be(this, this.actual instanceof Promise, 'Promise object') },
    get Generator() { return be(this, isGenerator(this.actual), 'Generator object') },

    /** Comparision: */
    equal: equal,
    equiv: equiv,
    same: same,

    /** exception: */
    throw: function (err) {
      var me = this;
      me.ms = now() - me.tick;
      var actual = me.actual;
      if (isFunction(actual)) {
        try {
          me.actual.apply(undefined, me.args);
          if (!(me.assert = me._not)) {
            me.note = 'expect' + NOT(me) + ' throw but not throw.';
          }
        } catch (e) {
          var message = e.message;
          if (err) {
            if (!(me.assert = (message === err) ^ me._not)) me.note = 'expect' + NOT(me) + ' throw ' + toJson(err) + ' but throw ' + toJson(message) + '.';
          }
          else {
            if (!(me.assert = !me._not)) me.note = 'expect' + NOT(me) + ' throw but throw ' + toJson(message) + '.';
          }
        }
        report(me);
      }
      else {
        sorry(me, Error('.throw() assert can be only used for function object!'), 1);
      }
    }

  };

  function NOT(me) { return me._not ? ' not' : '' }

  function be(me, assert, something) {
    me.ms = now() - me.tick;
    if (!(me.assert = !!assert ^ me._not)) me.note = 'expect ' + toJson(me.actual) + NOT(me) + ' be ' + something + '.';
    report(me);
    return nop;
  }

  function equal(value) {
    var me = this;
    me.ms = now() - me.tick;
    compare(me, me.actual == value, 'equal to', value);
  }

  function equiv(value) {
    var me = this;
    me.ms = now() - me.tick;
    compare(me, equiv(me.actual, value), 'equivalent to', value);

    function equiv(a, b) {
      if (isObject(a) && isObject(b)) {
        var akeys = [], ai = 0, bkeys = [], bi = 0;
        for (akeys[ai++] in a);
        for (bkeys[bi++] in b);
        if (ai !== bi)
          return false;
        for (var i = 0; i < ai; i++) {
          var key = akeys[i];
          if (seek(bkeys, key) < 0)
            return false;
          if (!equiv(a[key], b[key]))
            return false;
        }
        return true;
      }
      else {
        return a !== a && b !== b || a == b;
      }
    }
  }

  function same(value) {
    var me = this;
    me.ms = now() - me.tick;
    compare(me, me.actual === value, 'same to', value);
  }

  function compare(me, assert, op, value) {
    if (!(me.assert = !!assert ^ me._not)) me.note = 'expect ' + toJson(me.actual) + NOT(me) + ' ' + op + ' ' + toJson(value) + '.';
    report(me);
  }

  /** 报告输出: ----------------------------------------------------------------------------------------
   *
   */
  function report(me) {
    if (me.assert) {
      print(me, '#g;✔ %s#;', me.topic);
      me.state = 1;
    }
    else {
      print(me, '#r;✘ %s#;', me.topic);
      if (me.note) {
        print(me, '#rr;%s#;', ident(me.note, '  '));
      }
      if (me.loc) {
        print(me, '#rr;%s#;', ident(me.loc, '  '));
      }
      me.state = -1;
    }
  }

  /** 报告错误 */
  function sorry(me, err, level) {
    var trace = getTrace(err, level);
    err = err.toString();
    if (trace) {
      err += ident('\n' + trace.code + '\n' + dup(' ', trace.col) + '^' + '\nat ' + trace.loc, '  ');
    }
    print(me, '#r;⦸ %s#;', err);
    me.state = -1;
  }

  var ident = partial(replace, [, /^/gm]);

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

  var reVars = /%[sd]/g;
  var reColor = /#(\w\w?\w?|);/g;
  function print(me, s) {
    var args = piece(arguments, 1);
    if(isString(s)) {
      var length = args.length, i = 1;
      s = replace(s, reVars, function(s) {
        return i < length ? args[i++] : s;
      });

      args.length = 1;
      s = replace(s, reColor, function (s, color) {
        if(global.window) {
          s = '%c';
          push(args, colors[color] || '');
        }
        else {
          s = colors[color] || colors[''];
        }
        return s;
      });
    }
    args[0] = ident(s, me.ident);
    apply(console.log, console, args);
  }

  /** 运行环境: ----------------------------------------------------------------------------------------
   *
   */
  var cacheCode = {};

  function getCode(path) {
    var code;
    if (cacheCode.hasOwnProperty(path)) {
      code = cacheCode[path];
    }
    else {
      code = cacheCode[path] = get(path);
    }
    return code;
  }

  var cacheCodes = {};

  function getCodes(path) {
    var codes;
    if (cacheCodes.hasOwnProperty(path)) {
      codes = cacheCodes[path];
    }
    else {
      codes = cacheCodes[path] = getCode(path).split('\n');
    }
    return codes;
  }

  var it = newIt('');
  var get;
  var colors;

  if (global.window) {
    var script = document.scripts[document.scripts.length - 1];

    get = function (path) {
      var http = new XMLHttpRequest;
      http.open('GET', path, false);
      http.send();
      return http.status / 100 ^ 2 ? '' : http.responseText;
    };

    var cacheExports = {};
    var url = purl(script.getAttribute('src'), location.href);
    cacheExports[url] = it;

    global.require = function (url) {
      var exports;
      url = purl(url, getTrace(Error(), 1).path);
      if (cacheExports.hasOwnProperty(url)) {
        exports = cacheExports[url];
      }
      else {
        var code = getCode(url) + '\n//# sourceURL=' + url;
        var module = {exports: {}};
        exports = cacheExports[url] = modulize(module, module.exports, code);
      }
      return exports;
    };

    colors = {
      "": "",
      ddd: "color:black",
      dd: "color:dimgray",
      d: "color:darkgrey;font-weight:900",
      rrr: "color:darkred",
      rr: "color:red",
      r: "color:tomato;font-weight:900",
      yyy: "color:darkolivegreen",
      yy: "color:olive",
      y: "color:yellow;font-weight:900",
      ggg: "color:darkgreen",
      gg: "color:forestgreen",
      g: "color:lawngreen;font-weight:900",
      ccc: "color:teal",
      cc: "color:cyan",
      c: "color:cyan;font-weight:900",
      bbb: "color:darkblue",
      bb: "color:blue",
      b: "color:royalblue;font-weight:900",
      ppp: "color:purple",
      pp: "color:darkorchid",
      p: "color:magenta;font-weight:900",
      www: "color:dimgray",
      ww: "color:lightgrey",
      w: "color:ghostwhite;font-weight:900",
    }

    var name = script.getAttribute('name');
    if (name) global[name] = it;
    var files = script.getAttribute('files');
    if(files){
      files = split(files, /\s*,\s*/);
      go(run(location.href, files));
    }

  }
  else {
    var fs = require('fs');
    get = function (path) {
      return fs.readFileSync(path, {encoding: 'utf-8'});
    };

    colors = {
      '': '\x1b[0m',
      ddd: "\u001b[2m\u001b[30m",
      dd: "\u001b[0m\u001b[30m",
      d: "\u001b[1m\u001b[30m",
      rrr: "\u001b[2m\u001b[31m",
      rr: "\u001b[0m\u001b[31m",
      r: "\u001b[1m\u001b[31m",
      yyy: "\u001b[2m\u001b[33m",
      yy: "\u001b[0m\u001b[33m",
      y: "\u001b[1m\u001b[33m",
      ggg: "\u001b[2m\u001b[32m",
      gg: "\u001b[0m\u001b[32m",
      g: "\u001b[1m\u001b[32m",
      ccc: "\u001b[2m\u001b[36m",
      cc: "\u001b[0m\u001b[36m",
      c: "\u001b[1m\u001b[36m",
      bbb: "\u001b[2m\u001b[34m",
      bb: "\u001b[0m\u001b[34m",
      b: "\u001b[1m\u001b[34m",
      ppp: "\u001b[2m\u001b[35m",
      pp: "\u001b[0m\u001b[35m",
      p: "\u001b[1m\u001b[35m",
      www: "\u001b[2m\u001b[37m",
      ww: "\u001b[0m\u001b[37m",
      w: "\u001b[1m\u001b[37m"
    }

    it.go = function(files) {
      var trace = getTrace(Error(), 1);
      go(run(trace.path, files));
    }

    module.exports = it;
  }

  function* run(cwd, files) {
    try {
      for(var i=0, file; file = files[i]; i++) {
        file = purl(file, cwd);
        var code = getCode(file);
        if(global.window) {
          code += '\n//# sourceURL=' + file;
        }
        else {
          source = file;
        }
        yield eval.call(undefined, code);
      }
    }
    finally {
      source = '';
    }
  }


})(function modulize(module, exports) {
  'use strict';
  eval(arguments[2]);
  return module.exports;
}, this.window || global, Function, Object, Number, String, Array, RegExp, Date, Error, Promise);