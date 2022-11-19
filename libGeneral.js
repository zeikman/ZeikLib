/**
 * libGeneral.js (21 Jun, 2016)
 * @namespace libGeneral
 * @version 1.0.0
 */
window.libGeneral = (function() {
  var defaultNoCaps = ['of','a','the','and','an','am','or','nor','but','is','if','then','else',
                      'when','at','from','by','on','off','for','in','out','to','into','with'];

  var libGeneral = {
    /**
     * Return true if null
     * @memberof libGeneral
     * @instance
     * @param {*} input - Input to check whether is equal to null
     * @param {Boolean} [identical=false] - Whether to check identically equal or not
     * @returns {Boolean} True if null
     * @example
     * // true
     * libGeneral.isNull(null);
     * // false
     * libGeneral.isNull('not null');
     */
    isNull: function(input, identical) {
      if (typeof identical == 'boolean' && identical) { return input === null; }
      else {
        if (typeof input == 'string') { input = input.toLowerCase(); }
        if (input === null || input == 'null') { return true; }
        return false;
      }
    },

    /**
     * Return true if undefined
     * @memberof libGeneral
     * @instance
     * @param {*} input - Input to check whether is equal to undefined
     * @param {Boolean} [identical=false] - Whether to check identically equal or not
     * @returns {Boolean} True if undefined
     * @example
     * // true
     * libGeneral.isUndefined(undefined);
     * // false
     * libGeneral.isUndefined('not undefined');
     */
    isUndefined: function(input, identical) {
      if (typeof identical == 'boolean' && identical) { return input === undefined; }
      else {
        if (typeof input == 'string') { input = input.toLowerCase(); }
        if (input === undefined || input == 'undefined') { return true; }
        return false;
      }
    },

    /**
     * Return true if empty string
     * @memberof libGeneral
     * @instance
     * @param {*} input - Input to check whether is identically equal to emptryy string
     * @returns {Boolean} True if empty string
     * @example
     * // true
     * libGeneral.isEmptyString('');
     * // false
     * libGeneral.isEmptyString('not empty string');
     */
    isEmptyString: function(input) { return input === ''; },

    /**
     * Return true if zero
     * @memberof libGeneral
     * @instance
     * @param {*} input - Input to check whether is identically equal to emptryy string
     * @returns {Boolean} True if zero
     * @example
     * // true
     * libGeneral.isZero(0);
     * // false
     * libGeneral.isZero(0.01);
     */
    isZero: function(input) { return Number(input) === 0; },

    /**
     * Return true if input is unset
     * @memberof libGeneral
     * @instance
     * @param {*} input - Input to check whether is unset
     * @param {Boolean} [trim=false] - Whether to trim input or not
     * @example
     * // true
     * libGeneral.isUnset('');
     * libGeneral.isUnset(null);
     * libGeneral.isUnset(undefined);
     * // false
     * libGeneral.isUnset('set');
     * libGeneral.isUnset(1);
     */
    isUnset: function(input, trim) {
      if (typeof trim == 'boolean' && trim && typeof input == 'string') { input = input.trim(); }
      if (libGeneral.isNull(input) || libGeneral.isUndefined(input) || libGeneral.isEmptyString(input)) { return true; }
      return false;
    },

    /**
     * Return null if [srcVal] is equal to [cmpVal], else [srcVal]
     * @memberof libGeneral
     * @instance
     * @param {*} srcVal - Source value to compare
     * @param {*} cmpVal - Value to be compare with source value
     * @param {Boolean} [identical] - If True, compare both values identically (value & data type)
     * @example
     * // null
     * libGeneral.nullIf(0, '0');
     * // 0 (digit)
     * libGeneral.nullIf(0, '0', true);
     */
    nullIf: function(srcVal, cmpVal, identical) {
      if (typeof identical == 'boolean' && identical) { return srcVal === cmpVal ? null : srcVal; }
      else { return srcVal == cmpVal ? null : srcVal; }
    },

    /**
     * Return [returnVal] if [srcVal] is equal to [cmpVal], else [srcVal]
     * @memberof libGeneral
     * @instance
     * @param {*} srcVal - Source value to compare
     * @param {*} cmpVal - Value to be compare with source value
     * @param {*} returnVal - Value to be return if srcVal and cmpVal are equal or identical
     * @param {Boolean} [identical] - If True, compare both values identically (value & data type)
     * @example
     * // 'hello'
     * libGeneral.returnValIf(0, '0', 'hello');
     * // 0 (digit)
     * libGeneral.returnValIf(0, '0', 'world', true);
     */
    returnValIf: function(srcVal, cmpVal, returnVal, identical) {
      if (identical && typeof identical == 'boolean') { return srcVal === cmpVal ? returnVal : srcVal; }
      else { return srcVal == cmpVal ? returnVal : srcVal; }
    },

    /* Compare two items
     *
     * Reference:
     *  - http://stackoverflow.com/questions/359494/does-it-matter-which-equals-operator-vs-i-use-in-javascript-comparisons
     *
     * Parameter:
     *    x - x
     *
     * TODO: Can enhance to compare multiple value if an Array is provided
     *     logical operator &&_||_!
     *     Please re-write
     */
    // compare: function(item, compareItem, identical) {
    //   /*
    //    * === : identity
    //    * == : equality
    //    */
    //   if (typeof item != typeof compareItem && typeof compareItem === 'object') {
    //     if (compareItem.operator == '||') {
    //       for (i = 0; i < compareItem.values.length; i++) {
    //         if (identical && typeof identical == 'boolean') {
    //           if (item === compareItem.values[i]) { return true; }
    //         } else {
    //           if (item == compareItem.values[i]) { return true; }
    //         }
    //       }
    //       return false;
    //     } else if (compareItem.operator == '&&') {
    //       for (i = 0; i < compareItem.values.length; i++) {
    //         if (identical && typeof identical == 'boolean') {
    //           if (item !== compareItem.values[i]) { return false; }
    //         } else {
    //           if (item != compareItem.values[i]) { return false; }
    //         }
    //       }
    //       return true;
    //     } else {
    //       window.alert("Error: Invalid 'operator' !");
    //       return false;
    //     }
    //   } else {
    //     if (identical && typeof identical == 'boolean') {
    //       if (compareItem == 'null') {
    //         if (item === null) { return true; }
    //         else { return false; }
    //       } else if (compareItem == 'undefined') {
    //         if (item === undefined) { return true; }
    //         else { return false; }
    //       } else {
    //         if (item === compareItem) { return true; }
    //         else { return false; }
    //       }
    //     } else {
    //       if (compareItem == 'null') {
    //         if (item === null) { return true; }
    //         else { return false; }
    //       } else if (compareItem == 'undefined') {
    //         if (item === undefined) { return true; }
    //         else { return false; }
    //       } else {
    //         if (item == compareItem) { return true; }
    //         else { return false; }
    //       }
    //     }
    //   }
    // },

    /* if a timeout has been registered before then cancel it so that we can setup a fresh timeout */
    // debounce: function debounce(delay, callback) {
    //   var timeout = null;
    //   return function () {
    //     if (timeout) {
    //       clearTimeout(timeout);
    //     }
    //     var args = arguments;
    //     timeout = setTimeout(function () {
    //       callback.apply(null, args);
    //       timeout = null;
    //     }, delay);
    //   };
    // },

    /**
     * Convert string to TitleCase
     * @memberof libGeneral
     * @instance
     * @param {String} str - text string
     * @example
     * // 'Hello World'
     * libGeneral.toTitleCase('hello world');
     * libGeneral.toTitleCase('HELLO WORLD');
     */
    /*
     * Reference:
     *  - http://stackoverflow.com/questions/196972/convert-string-to-title-case-with-javascript
     */
    toTitleCase: function(str) {
      if (str) return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
      return str;
    },

    /**
     * Return object length
     * @memberof libGeneral
     * @instance
     * @param {Object} obj - Object
     * @example
     * // 3
     * libGeneral.objLength([1, 2, 3]);
     * libGeneral.objLength({a:1, b:2, c:3});
     */
    objLength: function(obj) {
      return Object.keys(obj).length;
    },

    /**
     * Check whether 'str' contains 'checkStr' or not, case-sensitive
     * @memberof libGeneral
     * @instance
     * @param {String} str - Source string
     * @param {String} checkStr - String to be check within source string
     * @example
     * // true
     * libGeneral.stringContains('hello', 'hello world');
     * // false
     * libGeneral.stringContains('Hello', 'hello world');
     */
    stringContains: function(str, checkStr/*, caseSensitive*/) {
      str = String(str);
      checkStr = String(checkStr);
      if (checkStr.indexOf(str) > -1) { return true; }
      else { return false; }
    },

    /**
     * Desc
     * @memberof libGeneral
     * @instance
     * @param {String} str - str
     * @param {String} search - str
     * @param {String} replace - str
     * @see [Stack Overflow - How to replace all occurrences of a string in JavaScript?]{@link http://stackoverflow.com/questions/1144783/how-to-replace-all-occurrences-of-a-string-in-javascript}
     * @example
     * // 'Test abc yo yo abc'
     * libGeneral.stringReplaceAll('Test abc test test abc', 'test', 'yo');
     */
    stringReplaceAll: function(str, search, replacement) {
      // return str.replace(new RegExp(search, 'g'), replacement);
      return str.split(search).join(replacement);
    },

    /**
     * Debounce function
     * @memberof libGeneral
     * @instance
     * @param {Function} fn - callback function
     * @param {Number} delay - delay timing
     * @see [Reference]{@link https://remysharp.com/2010/07/21/throttling-function-calls}
     * @example
     * libGeneral.debounce(function(), 500);
     */
    debounce: function(fn, delay) {
      var timer = null;
      return function() {
        var context = this, args = arguments;
        window.clearTimeout(timer);
        timer = window.setTimeout(function() {
          fn.apply(context, args);
        }, delay);
      };
    },

    /* if "delay" milliseconds have expired since the previous call then propagate this call to "callback" */
    // throttle: function throttle(callback, delay) {
    //   var previousCall = new Date().getTime();
    //   return function() {
    //     var time = new Date().getTime();
    //     if ((time - previousCall) >= delay) {
    //       previousCall = time;
    //       callback.apply(null, arguments);
    //     }
    //   };
    // },

    /**
     * Throttle function
     * @memberof libGeneral
     * @instance
     * @param {Function} fn - callback function
     * @param {Number} delay - delay timing
     * @param {} scope - x
     * @see [Reference]{@link https://remysharp.com/2010/07/21/throttling-function-calls}
     * @example
     * libGeneral.throttle(function() {}, 500);
     */
    throttle: function(fn, threshhold, scope) {
      threshhold = threshhold || (threshhold = 250);
      var last = null, deferTimer = null;
      return function() {
        var context = scope || this;
        var now = + (new Date()), args = arguments;
        if (last && now < last + threshhold) {
          // hold on to it
          window.clearTimeout(deferTimer);
          deferTimer = window.setTimeout(function() {
            last = now;
            fn.apply(context, args);
          }, threshhold);
        } else {
          last = now;
          fn.apply(context, args);
        }
      };
    },

    /**
     * Once function
     * @memberof libGeneral
     * @instance
     * @param {Function} fn - function to be run only once
     * @param {} context - x
     * @see [Reference]{@link http://davidwalsh.name/javascript-once}
     * @example
     * libGeneral.once(function());
     */
    once: function(fn, context) {
      var result;
      return function() {
        if (fn) {
          result = fn.apply(context || this.arguments, arguments);
          fn = null;
        }
        return result;
      };
    },

    /**
     * jQuery AJAX POST XHR request
     * @memberof libGeneral
     * @instance
     * @param {} url - x
     * @param {} data - x
     * @param {} dataType - x
     * @param {} successCallback - x
     */
    // ajaxPOST: function(url, data, dataType, successCallback) {
    //   if (url === undefined) {
    //     msgInfo('Function ajaxPOST() error', 'url undefined');
    //     return;
    //   }
    //   if (dataType === undefined) {
    //     msgInfo('Function ajaxPOST() error', 'Please specified data type !');
    //     return;
    //   }
    //   if (data === undefined) { data = []; }
    //   if (successCallback === undefined) {
    //     successCallback = function(result) { return result; };
    //   }
    //   $.ajax({
    //     type: 'POST',
    //     url: url,
    //     data: data,
    //     success: successCallback,
    //     dataType: dataType
    //   });
    // },

    /**
     * jQuery AJAX Get XHR request
     * @memberof libGeneral
     * @instance
     * @param {} url - x
     * @param {} data - x
     * @param {} dataType - x
     */
    // ajaxGET: function(url, data, dataType, successCallback) {
    //   if (url === undefined) {
    //     window.alert('Function ajaxGET() error: url param undefined !');
    //     return;
    //   }
    //   if (dataType === undefined) {
    //     window.alert('Function ajaxGET() error: Please specified data type !');
    //     return;
    //   }
    //   if (data === undefined) { data = []; }
    //   if (successCallback === undefined) {
    //     successCallback = function(result) { return result; };
    //   }
    //   $.ajax({
    //     // type: 'GET',
    //     url: url,
    //     data: data,
    //     success: successCallback,
    //     dataType: dataType
    //   });
    // },

    /**
     * Check whether is a valid keyboard input
     * @memberof libGeneral
     * @instance
     * @param {Object} keyDownEvent - Key event object
     * @returns {Boolean} True if valid
     * @example
     * // true
     * libGeneral.isValidKeyboardInput(<keyDownEvent>('A' => 65));
     * // false
     * libGeneral.isValidKeyboardInput(<keyDownEvent>('Enter' => 13));
     */
    //  * - http://davidwalsh.name/dijit-intermediatechanges
    //  * - https://dojotoolkit.org/reference-guide/1.10/dojo/keys.html
    isValidKeyboardInput: function(keyDownEvent) {
      /*
       * ctrlKey
       * altKey
       * shiftKey
       * metaKey
       */
      /*console.log(keyDownEvent.keyCode);*/
      // console.log(keyDownEvent.ctrlKey);
      // console.log(keyDownEvent.altKey);
      // console.log(keyDownEvent.shiftKey);
      // console.log(keyDownEvent.metaKey);

      var keys = {
    		// summary:
    		//		Definitions for common key values.  Client code should test keyCode against these named constants,
    		//		as the actual codes can vary by browser.
    		BACKSPACE: 8,
    		TAB: 9,
    		CLEAR: 12,
    		ENTER: 13,
    		SHIFT: 16,
    		CTRL: 17,
    		ALT: 18,
    		// META: has('webkit') ? 91 : 224, // the apple key on macs
    		PAUSE: 19,
    		CAPS_LOCK: 20,
    		ESCAPE: 27,
    		SPACE: 32,
    		PAGE_UP: 33,
    		PAGE_DOWN: 34,
    		END: 35,
    		HOME: 36,
    		LEFT_ARROW: 37,
    		UP_ARROW: 38,
    		RIGHT_ARROW: 39,
    		DOWN_ARROW: 40,
    		INSERT: 45,
    		DELETE: 46,
    		HELP: 47,
    		LEFT_WINDOW: 91,
    		RIGHT_WINDOW: 92,
    		SELECT: 93,
    		NUMPAD_0: 96,
    		NUMPAD_1: 97,
    		NUMPAD_2: 98,
    		NUMPAD_3: 99,
    		NUMPAD_4: 100,
    		NUMPAD_5: 101,
    		NUMPAD_6: 102,
    		NUMPAD_7: 103,
    		NUMPAD_8: 104,
    		NUMPAD_9: 105,
    		NUMPAD_MULTIPLY: 106,
    		NUMPAD_PLUS: 107,
    		NUMPAD_ENTER: 108,
    		NUMPAD_MINUS: 109,
    		NUMPAD_PERIOD: 110,
    		NUMPAD_DIVIDE: 111,
    		F1: 112,
    		F2: 113,
    		F3: 114,
    		F4: 115,
    		F5: 116,
    		F6: 117,
    		F7: 118,
    		F8: 119,
    		F9: 120,
    		F10: 121,
    		F11: 122,
    		F12: 123,
    		F13: 124,
    		F14: 125,
    		F15: 126,
    		NUM_LOCK: 144,
    		SCROLL_LOCK: 145,
    		UP_DPAD: 175,
    		DOWN_DPAD: 176,
    		LEFT_DPAD: 177,
    		RIGHT_DPAD: 178
    		// virtual key mapping
    		/*copyKey: has("mac") && !has("air") ? (has("safari") ? 91 : 224 ) : 17*/
      };

      switch(keyDownEvent.keyCode) {
        /*case keys.BACKSPACE:*/
        case keys.TAB:
        case keys.CLEAR:
        case keys.ENTER:
        case keys.SHIFT:
        case keys.CTRL:
        case keys.ALT:
        // case keys.META: // the CMD key on Macs
        case keys.PAUSE:
        case keys.CAPS_LOCK:
        case keys.ESCAPE:
        /*case keys.SPACE:*/
        case keys.PAGE_UP:
        case keys.PAGE_DOWN:
        case keys.END:
        case keys.HOME:
        case keys.LEFT_ARROW:
        case keys.UP_ARROW:
        case keys.RIGHT_ARROW:
        case keys.DOWN_ARROW:
        case keys.INSERT:
        case keys.DELETE:
        case keys.HELP:
        case keys.LEFT_WINDOW:
        case keys.RIGHT_WINDOW:
        case keys.SELECT:
        /*case keys.NUMPAD_0: case keys.NUMPAD_1: case keys.NUMPAD_2: case keys.NUMPAD_3: case keys.NUMPAD_4:
        case keys.NUMPAD_5: case keys.NUMPAD_6: case keys.NUMPAD_7: case keys.NUMPAD_8: case keys.NUMPAD_9:*/
        case keys.NUMPAD_MULTIPLY:
        case keys.NUMPAD_PLUS:
        case keys.NUMPAD_ENTER:
        case keys.NUMPAD_MINUS:
        case keys.NUMPAD_PERIOD:
        case keys.NUMPAD_DIVIDE:
        case keys.F1: case keys.F2: case keys.F3: case keys.F4: case keys.F5:
        case keys.F6: case keys.F7: case keys.F8: case keys.F9: case keys.F10:
        case keys.F11: case keys.F12: case keys.F13: case keys.F14: case keys.F15:
        case keys.NUM_LOCK:
        case keys.SCROLL_LOCK:
        case keys.copyKey: return false;
        default: return true;
      }
    },

    /*
     *
     */
    clearFormInput: function(form) {
      $(form).clearHiddenFields(); // clear hidden fields
      $(form).trigger('reset'); // clear input fields
      $(form).clearForm(); // clear dropdown fields

      if ($(form + ' .jqx-checkbox').length > 0) {
        $(form + ' .jqx-checkbox').jqxCheckBox({ checked: false }); // NOTE: resolved jqxCheckBox clearing
      }
      if ($(form + ' .jqx-datetimeinput').length > 0) {
        setTimeout(function() {
          $(form + ' .jqx-datetimeinput').val(null); // NOTE: resolved jqxDateTimeInput set to null
        }, 100);
      }
    },

    show: function() {
      var args = arguments[0];
      var defaultMethod = 'fade';
      var defaultTiming = 200;
      var defaultFunction = function() {};
      if (typeof arguments[1] == 'function') { defaultFunction = arguments[1]; }

      switch (typeof args) {
        case 'string':
          if ($(args).length > 0) { $(args).fadeIn(defaultTiming, defaultFunction); }
          break;
        case 'object':
          if ($(args.id).length > 0) {
            if (args.duration) { defaultTiming = args.duration }
            if (args.method) {
              switch (args.method) {
                case 'fade':
                  if (args.options) { $(args.id).fadeIn(args.options, defaultFunction); }
                  else { $(args.id).fadeIn(defaultTiming, defaultFunction); }
                  break;
                case 'slide':
                  if (args.options) { $(args.id).slideDown(args.options, defaultFunction); }
                  else { $(args.id).slideDown(defaultTiming, defaultFunction); }
                  break;
                default: break;
              }
            } else {
              if (args.options) { $(args.id).fadeIn(args.options, defaultFunction); }
              else { $(args.id).fadeIn(defaultTiming, defaultFunction); }
            }
          } else {
            if (args.options) { $(args).fadeIn(args.options, defaultFunction); }
            else { $(args).fadeIn(defaultTiming, defaultFunction); }
          }
          break;
        default: break;
      }
    },

    hide: function() {
      var args = arguments[0];
      var defaultMethod = 'fade';
      var defaultTiming = 200;
      var defaultFunction = function() {};
      if (typeof arguments[1] == 'function') { defaultFunction = arguments[1]; }

      switch (typeof args) {
        case 'string':
          if ($(args).length > 0) { $(args).fadeOut(defaultTiming, defaultFunction); }
          break;
        case 'object':
          if ($(args.id).length > 0) {
            if (args.duration) { defaultTiming = args.duration }
            if (args.method) {
              switch (args.method) {
                case 'fade':
                  if (args.options) { $(args.id).fadeOut(args.options, defaultFunction); }
                  else { $(args.id).fadeOut(defaultTiming, defaultFunction); }
                  break;
                case 'slide':
                  if (args.options) { $(args.id).slideUp(args.options, defaultFunction); }
                  else { $(args.id).slideUp(defaultTiming, defaultFunction); }
                  break;
                default: break;
              }
            } else {
              if (args.options) { $(args.id).fadeOut(args.options, defaultFunction); }
              else { $(args.id).fadeOut(defaultTiming, defaultFunction); }
            }
          } else {
            if (args.options) { $(args).fadeOut(args.options, defaultFunction); }
            else { $(args).fadeOut(defaultTiming, defaultFunction); }
          }
          break;
        default: break;
      }
    },

    executeFunctionByName: function(functionName, context, args) {
      if (typeof args == 'undefined') { args = Array.prototype.slice.call(arguments, 2); }
      var namespaces = functionName.split(".");
      var func = namespaces.pop();
      for (var i = 0; i < namespaces.length; i++) {

          context = context[namespaces[i]];
      }
      return context[func].apply(context, args);
    },

    // NOTE: https://medium.com/@Farzad_YZ/3-ways-to-clone-objects-in-javascript-f752d148054d
    objectClone: function(src, method) {
      if (typeof method == 'undefined') { method = 'jquery'; }

      switch (method) {
      case 'jsoncopy': return JSON.parse(JSON.stringify(src)); break;
      case 'objectassign': return Object.assign({}, src); break;
      case 'iteration':
        var target = {};
        for (var prop in src) {
        if (src.hasOwnProperty(prop)) {
          target[prop] = src[prop];
        }
        }
        return target;
        break;
      default: // jquery - deep copy
        return $.extend(true, {}, src);
        break;
      }
    },

    // NOTE: https://stackoverflow.com/questions/15997879/get-the-index-of-the-object-inside-an-array-matching-a-condition
    objArrFindIndex: function(objArr, keyName, keyValue) {
      // a = [
      //   {prop1:"abc",prop2:"qwe"},
      //   {prop1:"bnmb",prop2:"yutu"},
      //   {prop1:"zxvz",prop2:"qwrq"}];
      //
      // index = a.findIndex(x => x['prop2'] == "yutu");
      //
      // console.log(index);
      return objArr.findIndex(x => x[keyName] == keyValue);
    }

    /* Get item from array with identifier specified
     *
     * Parameter:
     *    identifier - key identifier
     *    value - identifier value
     *    objectArray - Object Array [{ key: 'value', ... }, ...]
     */
    // this.getItem = function(identifier/*string*/, value/*string/number*/, objectArray/*object array*/) {
    //   var result = $.grep(objectArray, function(obj) {
    //     return obj[identifier].toString() == value.toString();
    //   });
    //   if (result.length === 0) {
    //     msgInfo('Error', 'Object not found !');
    //   } else if (result.length == 1) {
    //     return result[0];
    //   } else {
    //     msgInfo('Logic Error', 'Please check function getObject() !');
    //   }
    //   return false;
    // };

    /* Insert iframe
     * @memberof libGeneral
     * @instance
     * Parameter:
     *    frameAttr - iframe attribute { key: value, ... }
     *    parentID - if specified, append iframe to element[id="parentID"]
     */
    // createIframe: function(frameAttr/*object*/, parentId/*string(Optional)*/) {
    //   var iframe = '<iframe';
    //   if (parentId) {
    //     if ($(parentId).length) {
    //       $.each(frameAttr, function(key, value) {
    //         iframe += ' '+key+'="'+value+'"';
    //       });
    //       iframe += ' />';
    //       $(iframe).appendTo(parentId);
    //       return true;
    //     } else {
    //       msgInfo('Error', 'Element[id="'+parentId+'"] do not found !');
    //       return false;
    //     }
    //   } else {
    //     $.each(frameAttr, function(key, value) {
    //       iframe += ' '+key+'="'+value+'"';
    //     });
    //     iframe += ' />';
    //     return iframe;
    //   }
    // },

    /* Remove iframe
     * @memberof libGeneral
     * @instance
     * Parameter:
     *    iframeId - iframe ID
     */
    // removeIframe: function(iframeId/*string*/) {
    //   if ($(iframeId).length) {
    //     $(iframeId).remove();
    //     return true;
    //   } else {
    //     msgInfo('Error', 'Iframe [id="'+iframeId+'"] do not found !');
    //     return false;
    //   }
    // }

    /* Convert array/object array into string
     * @memberof libGeneral
     * @instance
     * Parameters:
     *    input - number/string/object array
     *    separator - string to separate each element of the input [default: ',']
     */
    // convertString: function(input/*array*/, separator/*string(Optional)*/) {
    //   var isArray = Array.isArray(input);
    //   if (isArray) {
    //     return input.join(separator);
    //   } else {
    //     var str = '';
    //     separator = separator ? separator : ',';
    //     $.each(input, function(key, value) {
    //       str = str + key + '=' + value + separator;
    //     });
    //     return str.substring(0, str.length - 1);
    //   }
    // },

    /* Convert text to proper case
     *
     * NOTE: This function will be replace by string.js from stringjs.com
     *
     * Parameter:
     *    str - text to convert
     *    capitaliseMethod - capitalise method [propercase/allcap]
     *    noCapsList - custom noCaps list
     *
     * Reference:
     *    - http://stackoverflow.com/a/15126861
     */
    // capitalise: function(str/*string*/, capitaliseMethod/*string*/, noCapsList/*array*/)  {
    //   var noCaps = noCapsList ? noCapsList : defaultNoCaps;
    //   switch (capitaliseMethod) {
    //     case 'all':
    //       return str.toUpperCase();
    //     case 'firstletter':
    //       return str.charAt(0).toUpperCase() + str.slice(1);
    //     case 'propercase':
    //       return str.replace(/\w\S*/g, function(txt, offset) {
    //         if (offset !== 0 && noCaps.indexOf(txt.toLowerCase()) != -1) {
    //           return txt.toLowerCase();
    //         }
    //         return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    //       });
    //     default:
    //       return str;
    //   }
    // },

    /* Find child element by selector in parent element
     *
     * NOTE: This function will be deprecated.
     *
     * Parameter:
     *    child - child element selector
     *    parent - parent element selector
     */
    // findElement: function(child/*string*/, parent/*string*/) {
    //   return $(parent).find(child);
    // },

    /*
     * Resize inserted iframe height
     *
     * NOTE: This function will be deprecated.
     *    This function is only usable for iframe that contains only one fielset
     *    element.
     *
     * Parameter:
     *    iframe - current iframe element
     * ------------------------------------------------------------------------------
     * * !! Caution !!                                *
     * * You should not overwrite or call this function manually !!         *
     * ------------------------------------------------------------------------------
     */
    // _iframeLoaded: function(iframe) {
    //   var fieldset = $(iframe.contentWindow.document.body).find('fieldset');
    //   /*iframe.height = iframe.contentWindow.document.body.scrollHeight;*/
    //   iframe.height = fieldset.outerHeight() + 15;
    // }
  };
  return libGeneral;
}());
