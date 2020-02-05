/*!
 * 
 * magical-parser v1.0.0       Wed Feb 05 2020 10:47:39 GMT+0200 (Eastern European Standard Time)
 * by Mohammed Samir       ms.2052001@gmail.com
 * https://github.com/scicave/magical-parser#readme
 * 
 * Copyright: 2020 NTNU;
 * License: Apache
 * 
 * Build: d6cd9c37a7d1b6dc4a54
 *    
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["MagicalParser"] = factory();
	else
		root["MagicalParser"] = factory();
})(window, function() {
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/Node.js":
/*!*********************!*\
  !*** ./src/Node.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Node; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
   sNode stands for structural node, used to represent the structure of the input text.,,,
   you can use the result (which is tree node of sNode with particular properities to do incredible things),
   it is used as a parse in mathpackage: {<https://github.com/ms2052001/mathpackage>}
*/
var Node =
/*#__PURE__*/
function () {
  /**
   * @param {string} type is a on of these
   *  'id', 'func', 'num', 'bool_op', 'binray_op', 'bool', op = {'+', '-', '*', '/', '^', '=', ...}
   * 
   * @param {*} args array of sNode
   * @param {*} attributes object contains attributes names and values.
   */
  function Node(type) {
    var args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    var attributes = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    _classCallCheck(this, Node);

    Object.assign(this, attributes);
    this.args = args instanceof Array ? args : [args];
    this.type = type; // if (type === 'op') {
    //    let boolOps = ['and', 'or', 'xor', 'not', '&&', '||', '!'];
    //    if (this.__contains(this.name, ...boolOps)) {
    //       this.type = 'bool_op';
    //    }
    //    else if (this.name == ' ==') {
    //       this.type = 'assign_op';
    //    }
    //    else {
    //       this.type = type;
    //    }
    // } else {
    //    this.type = type;
    // }
    // if (this.type === 'id') {
    //    if (this.name === 'true' || this.name === 'false') {
    //       this.type = 'bool';
    //    }
    // }
  }

  _createClass(Node, [{
    key: "calls",
    value: function calls(type) {
      var argsCount = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.args.length;
      var type_ = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.type;
      return (this.type === type || this.type === 'func' && this.name === type || this.type === 'op' && this.name === type) && this.args.length === argsCount && this.type === type_;
    }
  }, {
    key: "isLiteral",
    get: function get() {
      return this.type === 'literal';
    }
  }]);

  return Node;
}();



/***/ }),

/***/ "./src/Parser.js":
/*!***********************!*\
  !*** ./src/Parser.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Parser; });
/* harmony import */ var _environments_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./environments.js */ "./src/environments.js");
/* harmony import */ var _Node_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Node.js */ "./src/Node.js");
/* harmony import */ var _global_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./global.js */ "./src/global.js");
/* harmony import */ var _operators_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./operators.js */ "./src/operators.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * here is the flow chart of the algorithms::: {<https://www.lucidchart.com/invitations/accept/1c02df38-de1b-48da-8942-652652d373ea>}
 * 
 * options include:
 * functions:: if is is applied the expr " 1 + rg(2)" will be considered as " 1 + rg*(2)", thus rg is constants, here we sill consider the functions you insert in addtion to the common functions such as ['sin', 'cos', ...]
 *
 * operators search regex at regexr.com "https://regexr.com/4tbfe"

 */
// import sNode from './sNode';





var Parser =
/*#__PURE__*/
function () {
  function Parser() {
    var env = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'math';
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Parser);

    this.setEnvironment(env, options);
    this.__randomNameNum = 0;
    this.__realPos = 0;
  } //#region getter, setter


  _createClass(Parser, [{
    key: "setEnvironment",
    value: function setEnvironment(env, options) {
      this._environment = env;
      this._options = _objectSpread({
        nameTest: '[_a-zA-Z]+\\d*',
        scope: [],
        forbiddenChars: [],
        operator: [],
        suffixOperators: [],
        prefixOperators: [],
        separators: [],
        blocks: []
      }, _environments_js__WEBPACK_IMPORTED_MODULE_0__["default"].get(env));
      if (options) this.options = options; /// adjustments and computations will occur here
    }
  }, {
    key: "setOperator",
    value: function setOperator(op, type) {
      if (!type) {
        if (op instanceof _operators_js__WEBPACK_IMPORTED_MODULE_3__["operator"]) {
          type = 'operators';
        } else if (op instanceof _operators_js__WEBPACK_IMPORTED_MODULE_3__["suffixOperator"]) {
          type = 'suffixOperator';
        } else if (op instanceof _operators_js__WEBPACK_IMPORTED_MODULE_3__["prefixOperator"]) {
          type = 'prefixOperator';
        } else if (op instanceof _operators_js__WEBPACK_IMPORTED_MODULE_3__["separator"]) {
          type = 'separator';
        } else {
          return undefined;
        }
      }

      var found = false,
          arr = this.options[type];
      this.options.all[type] = this.options.all[type].replace(new RegExp(" \\(@(".concat(op.regex, "),#(\\d*)\\) ")), function (match, name, index) {
        // you are trying to add a n already existed operator,
        found = true;
        Object.assign(op, arr[parseInt(index)]);
        arr.splice(parseInt(index), 1);
        arr.push(op);
        return " (@".concat(op.regex, ",#").concat(arr.length, ") ");
      });

      if (!found) {
        arr.push(op);
        this.options.all[type] += "(@".concat(op.name, ",#").concat(arr.length, ") ");
      }
    }
  }, {
    key: "removeOperator",
    value: function removeOperator(name, type) {
      var _this = this;

      this.options.all[type] = this.options.all[type].replace(new RegExp(" \\(@(".concat(name, "),#(\\d*)\\) ")), function (match, name, index) {
        // you are trying to add a n already existed operator,
        _this.options[type].splice(parseInt(index), 1);

        return "";
      });
    } //#endregion

    /**
     * 
     * @param {string} str the string to be parsed 
     * @param {object} options if you want to override the aleardy existing options
     * @param {array} operations 
     */

  }, {
    key: "parse",
    value: function parse(str) {
      var operations = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var options = this.options;
      var forbiddenChars = options.forbiddenChars;
      var snode;
      operations = operations instanceof Map ? operations : new Map();
      this.__clonedStr = str;
      this.__realPos = 0; //#region pre codes
      // checking errors

      for (var i = 0; i < forbiddenChars.length; i++) {
        if (Object(_global_js__WEBPACK_IMPORTED_MODULE_2__["contains"])(str, forbiddenChars[i])) Object(_global_js__WEBPACK_IMPORTED_MODULE_2__["sendError"])('forbidden char ' + forbiddenChars[i]);
      }

      if (options.autoMultSign) {
        /// var( => var*( /// -.023 var => -.023 var /// -564.012345(...) => -564.012345*(...)
        str = str.replace(new RegExp('((?:-?\\d+\\.?\\d*)|(?:-?\\d*\\.?\\d+))\\s*(\\(|' + options.nameTest + ')', 'g'), '$1 * $2'); /// the code beneath will be exuted in replacing funcName##funcArgsName## with funcName##funcArgsName##
        // str = str.replace(new RegExp(`(${options.nameTest})\\s*\\(`, 'g'), (match, g) => {
        // });
      } // if empty of characters


      str = str.replace(/^\s*$/, function () {
        snode = new _Node_js__WEBPACK_IMPORTED_MODULE_1__["default"]('');
      });
      if (snode) return snode;
      str = this.__parseBlocks(str, operations); // after processing brackets, search for functions

      str = str.replace(new RegExp("(".concat(options.nameTest, ")\\s*(##").concat(options.nameTest, "##)"), 'g'), function (match, name, args) {
        if (options.all.prefixOperators.search(new RegExp(" \\(@(".concat(name, "),#(\\d*)\\) "))) > -1) {
          // let _arg = operations.get(args);
          // let sn = new sNode('prefixOperator', _arg, { name });
          // operations.set(name, sn);
          return match;
        } else {
          var _args = operations.get(args);

          if (_args.calls('()')) {
            if (options.vars.find(function (a) {
              return a === name;
            })) {
              var _sn = new _Node_js__WEBPACK_IMPORTED_MODULE_1__["default"]('operator', [new _Node_js__WEBPACK_IMPORTED_MODULE_1__["default"]('var', [], {
                name: name
              }), _args], {
                name: '*'
              });

              operations.set(args, _sn);
              return name + ' * ' + args;
            }

            var sn = new _Node_js__WEBPACK_IMPORTED_MODULE_1__["default"]('implementFunction', _args.args, {
              name: name
            });
            operations.set(args, sn);
            return args; /// replace "name  ##funcArrgsName##" with "##funcArrgsName##" + setting the value to the corresponding key in "operations"
          } else {
            return match;
          }
        }
      });
      str = this.__parseOpertors(str, operations); //#endregion

      this.__parse(str, options, operations, {
        parseBlocks: false,
        parseOperators: false
      });
    }
  }, {
    key: "__parse",
    value: function __parse(str, options, operations) {
      var _this2 = this;

      var subOptions = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
      subOptions = _objectSpread({
        parseBlocks: true,
        parseOperators: true
      }, subOptions); /// or use Object.assign

      var snode;

      if (subOptions.parseBLocks) {
        str = this.__parseBlocks(str, operations);
      }

      if (subOptions.parseOperators) {
        str = this.__parseBlocks(str, operations);
      } //#region final codes
      // if empty of characters


      str = str.replace(/^\s*$/, function () {
        snode = new _Node_js__WEBPACK_IMPORTED_MODULE_1__["default"]('');
      });
      if (snode) return snode; // if name of operation

      str = str.replace(new RegExp("^\\s*(##".concat(options.nameTest, "##)\\s*$")), function (match, opName) {
        snode = operations.get(opName).sNode;
      });
      if (snode) return snode; // something.abc.funcName(arg1, ...)

      str = str.replace(new RegExp("^\\s*(".concat(options.nameTest, "\\s*\\.\\s*)+(?:(").concat(options.nameTest, ")\\s*(##").concat(options.nameTest, "##))\\s*$")), function (match, pathTOme, funcName, funcArgs) {
        var args = operations.get(funcArgs);

        if (options.all.prefixOperators.search(new RegExp(" \\(@(".concat(name, "),#(\\d*)\\) "))) > -1) {
          var _arg = operations.get(args);

          var sn = new _Node_js__WEBPACK_IMPORTED_MODULE_1__["default"]('prefixOperator', _arg, {
            name: name
          });
          operations.set(name, sn);
        } else if (args.sNode.calls('()')) {
          var func;

          var extension = _this2.parse(pathTOme, operations);

          func = new _Node_js__WEBPACK_IMPORTED_MODULE_1__["default"]('implementFunction', args.sNode.args, {
            name: funcName
          }); // args.sNode.args the args of the bracket  it may be one or more;

          snode = new _Node_js__WEBPACK_IMPORTED_MODULE_1__["default"]('.', [extension, func], {
            dotType: 'function',
            fullName: pathTOme + funcName
          });
        }
      });
      if (snode) return snode; //something.id

      str = str.replace(/^\s*(.*)\.(\$\$[_a-zA-z]+\d*\$\$)\s*$/, function (match, pathTOme, id) {
        if (match) {
          snode = new _Node_js__WEBPACK_IMPORTED_MODULE_1__["default"]('.', [_this2.parse(first, operations), new _Node_js__WEBPACK_IMPORTED_MODULE_1__["default"]('id', [], {
            name: id
          })], {
            dotType: 'id',
            extension: match
          });
        }
      });
      if (snode) return snode; // if literal, number or variable or bool {true or false}, ...

      str = str.replace(/^\s*(([_a-zA-z]+)\d*)\s*$/, function (match, value, notNum) {
        if (match) {
          snode = new _Node_js__WEBPACK_IMPORTED_MODULE_1__["default"](notNum ? 'id' : 'num', [], {
            value: value
          });
        }
      });
      if (snode) return snode;
      str = str.replace(/^(-?\d+\.?\d*)|(-?\d*\.?\d+)$/, function (match, value, notNum) {
        if (match) {
          snode = new _Node_js__WEBPACK_IMPORTED_MODULE_1__["default"](notNum ? 'id' : 'num', [], {
            value: value
          });
        }
      });
      if (snode) return snode;
      throw new Error('invalid script.\n' + str); // this shouldn't happen in ordinary cases, but this line of code is here for avoiding any flaw out of measurements
      //#endregion
    }
  }, {
    key: "__parseBlocks",
    value: function __parseBlocks(str, options, operations) {
      var _this3 = this;

      //#region brackets
      var that = this;
      var blocks = options.blocks;

      var __parseBlock__ = function __parseBlock__(index, str_) {
        //// checking error,,, this ill be done on handling bracket's content, so don't do for this. 
        var name = Object(_global_js__WEBPACK_IMPORTED_MODULE_2__["getRandomName"])(); // let str_ = str.slice(index.opening, index.closing); /// cut the text from the next sibiling of the opening char until the current closingChar index

        var b = blocks.openedBlock.ref;
        var searchingTxt = b.openingChar + str_ + b.closingChar;
        str = str.replace(searchingTxt, name); // if the replacement is global or not, there will no be any problem unless the developer using this library set a block with the same features as the bolck of our operation name.

        var snChild;

        if (b.handleContent) {
          snChild = that.parse(str_); /// here you are parsing new string with no operations yet. /// getting the sNode from the string inside this bracket block with the same procedures, there is no need to pass operations as argument
        } else {
          snChild = new _Node_js__WEBPACK_IMPORTED_MODULE_1__["default"]('undefined', [], {
            content: str_
          }); /// getting the sNode from the string inside this bracket block with the same procedures, there is no need to pass operations as argument
        }

        var sn = new _Node_js__WEBPACK_IMPORTED_MODULE_1__["default"]('block', [snChild], {
          openingChar: b.openingChar,
          closingChar: b.closingChar,
          name: b.name
        });
        operations.set(name, sn);
        b.opened = false;
        blocks.openedBlock = null; // reset

        return index.closing + (name.length - searchingTxt.length); /// new_i /// setting the index, as the string may shrink or be taller, it depends on the length of the name
      };

      var __parseBlocks__ = function __parseBlocks__() {
        var i_intial = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

        for (var i = i_intial; i < str.length; i++) {
          if (_this3.__realPos || _this3.__realPos === 0) _this3.__realPos += 1; // dealing with the intial str be fore the parsing process

          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = blocks.values[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var b = _step.value;

              /// if a block is opened, closing has the priority, unless, opening has the priority::: you can notice this in ***Mohammed***, if you check the opening char first the num will increase to 2, thus the block will not be closed,,, and an error will occur.
              if (blocks.openedBlock) {
                if (str.slice(i, i + b.closingChar.length) === b.closingChar) {
                  if (b !== options.blocks.openedBlock.ref) {
                    var iof = options.blocks.openedBlock.ref.openingChar.indexOf(b.openingChar);

                    if (iof > -1) {
                      // options.blocks.openedBlock.ref.openingChar  contains  b.closingChar::: for example *** contains **, you can use these blocks formatting typing, **Mohammed** will be bold.
                      options.blocks.openedBlock.mayCloseAt = {
                        ref: b,
                        index: i,
                        iof: iof
                      };
                    } else {
                      b.num--;
                    }
                  } else {
                    b.num--;
                  }
                } else if (str.slice(i, i + b.openingChar.length) === b.openingChar) {
                  b.num++;
                  i += b.openingChar.length - 1; // -1 here as for loop will add 1 to i, I want to set the index just after the opening char 

                  _this3.__realPos += b.openingChar.length - 1;
                }
              } else {
                if (str.slice(i, i + b.openingChar.length) === b.openingChar) {
                  b.num++;
                  i += b.openingChar.length - 1; // -1 here as for loop will add 1 to i, I want to set the index just after the opening char 

                  _this3.__realPos += b.openingChar.length - 1; // if (!blocks.openedBlock) { /// if not open, then open

                  b.opened = true;
                  blocks.openedBlock = {
                    ref: b,
                    index: i
                  }; // }
                } else if (str.slice(i, i + b.closingChar.length) === b.closingChar) {
                  b.num--;
                }
              } /// when a bracket is close, but not opened. e.g. ::: " 1+2-5) "


              if (b.num < 0) {
                if (b.mustOpen) {
                  Object(_global_js__WEBPACK_IMPORTED_MODULE_2__["sendError"])('closing a block not opened.');
                } else {
                  b.num = 0;
                }
              } /// if true, the bracket's block is defined.


              if (b.num === 0 && b.opened) {
                /// may other brackets' num be zero, as it does not exist or as it is closed but it closed inside the block that we are setting,,, e.g.::: " 1+2({1,2,3}^-1) "
                var index = {
                  opening: blocks.openedBlock.index + blocks.openedBlock.ref.openingChar.length,
                  closing: i
                };

                var _str = str.slice(index.opening, index.closing);

                if (_global_js__WEBPACK_IMPORTED_MODULE_2__["checker"].check(_str, b.contentTest)) {
                  i = __parseBlock__(index, _str); /// __parseBlock__ returns the new_i
                } else {
                  b.num++; // the considered closingChar found is not compatible, so continue shearching for another closing char
                }
              }
            }
          } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                _iterator["return"]();
              }
            } finally {
              if (_didIteratorError) {
                throw _iteratorError;
              }
            }
          }
        }
      };

      __parseBlocks__(); /// after finishing looping searching for brackets blocks, oooops, what is this?!!!, oh, the bracket is not closed. send an error


      if (blocks.openedBlock) {
        if (blocks.openedBlock.mayCloseAt) {
          var index = {
            opening: blocks.openedBlock.index + // blocks.openedBlock.mayCloseAt.ref.openingChar.length +    this will be added later
            blocks.openedBlock.mayCloseAt.iof,
            closing: blocks.openedBlock.mayCloseAt.index
          }; /// the openingChar can be for another block e.g.::: (( and (,when we close with )) the blocks is ((content)), otherwise if we close with ) our block is (content) and the second "(" is the first char in the content 

          blocks.openedBlock.ref.opened = false;
          blocks.openedBlock.ref.num = 0;
          blocks.openedBlock = {
            ref: blocks.openedBlock.mayCloseAt.ref,
            index: index.opening
          };
          index.opening += blocks.openedBlock.mayCloseAt.ref.openingChar.length;

          var _str = str.slice(index.opening, index.closing);

          this.__realPos = str.length - 1 - index.closing;
          var new_i;

          if (_global_js__WEBPACK_IMPORTED_MODULE_2__["checker"].check(_str, blocks.openedBlock.mayCloseAt.ref.contentTest)) {
            new_i = __parseBlock__(index, _str); /// __parseBlock__ returns the new_i

            __parseBlocks__(new_i);
          } else {
            if (blocks.openedBlock.ref.mustClose) {
              Object(_global_js__WEBPACK_IMPORTED_MODULE_2__["sendError"])('block is not closed.', this.__realPos);
            } // the considered closingChar found is not compatible as content failed at the test, so continue shearching for another closing char
            // so start just after the openingChar of the openedBlock.ref,,, 
            // new_i = index.opening;


            this.__realPos -= _str.length;

            __parseBlocks__(index.opening);
          }
        } else {
          if (blocks.openedBlock.ref.mustClose) {
            Object(_global_js__WEBPACK_IMPORTED_MODULE_2__["sendError"])('block is not closed.', this.__realPos);
          } else {
            var _new_i = blocks.openedBlock.index + blocks.openedBlock.ref.openingChar.length;

            this.__realPos -= str.length - 1 - _new_i;
            blocks.openedBlock.ref.opened = false;
            blocks.openedBlock = null;

            __parseBlocks__(_new_i);
          }
        }
      } //#endregion


      return str;
    }
  }, {
    key: "__parseOperators",
    value: function __parseOperators(str, options, operations) {
      /// RegExp: (var or num or block)(suffix)(op)(prefix)(var or num or block)
      /// ((?:[a-zA-Z_]+\d*)|(?:-?\d+\.?\d*)|(?:-?\d*\.?\d+))\s*((?:\+\+))?\s*((?:\+))\s*((?:\+\+|\+|\-))?\s*((?:[a-zA-Z_]+\d*)|(?:\d+\.?\d*)|(?:\d*\.?\d+))
      //#region separators
      //if (!_contains(str, ...operators)) str = str.replace(/\s/g, '');
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = options.separators[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var s = _step2.value;

          if (new RegExp(s.regex).test(str)) {
            var _name9 = this.__get;
            var args = [];
            var strs = str.split(s);
            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
              for (var _iterator3 = strs[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                var str_ = _step3.value;
                args.push(this.parse(str_, operations));
              }
            } catch (err) {
              _didIteratorError3 = true;
              _iteratorError3 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
                  _iterator3["return"]();
                }
              } finally {
                if (_didIteratorError3) {
                  throw _iteratorError3;
                }
              }
            }

            operations.set(_name9, new _Node_js__WEBPACK_IMPORTED_MODULE_1__["default"]('separator', args, {
              name: s,
              length: args.length
            }));
          }
        } //#endregion
        //#region preparing ofr parsing process

      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
            _iterator2["return"]();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      var argTest = "".concat(options.nameTest, "|").concat(options.numTest, "|##").concat(options.nameTest, "##");
      var search = new RegExp("^\\s*(".concat(options.allRegex.suffixOperators, ")?\\s*(").concat(options.allRegex.operators, ")\\s*(").concat(options.allRegex.prefixOperators, ")?\\s*(").concat(argTest, ")\\s*")),
          intialSearch = new RegExp("^\\s*(".concat(options.allRegex.prefixOperators, ")?\\s*(").concat(argTest, ")")),
          finalSearch = new RegExp("^\\s*(".concat(options.allRegex.suffixOperators, ")\\s*$"));
      var _str = '',
          prevArg = {
        name: null,
        sn: null
      }; //#endregion
      //#region searchong for operators and parsing process
      /// intial replacement

      str = str.replace(intialSearch, function (match, prefix, arg) {
        if (prefix) {
          var _a = arg,
              b = 'prefixOperator',
              c = prefix;

          if (!isNaN(_a)) {
            /// number
            var _name = Object(_global_js__WEBPACK_IMPORTED_MODULE_2__["getRandomName"])();

            var sn = new _Node_js__WEBPACK_IMPORTED_MODULE_1__["default"](b, new _Node_js__WEBPACK_IMPORTED_MODULE_1__["default"]('number', [], {
              value: parseInt(_a)
            }), {
              name: c
            });
            operations.set(_name, sn);
            prevArg = {
              name: _name,
              sn: sn
            };
          } else {
            var found = false;

            _a.replace("##".concat(options.nameTest, "##"), function () {
              found = true;
            });

            if (found) {
              /// operations
              var _sn2 = new _Node_js__WEBPACK_IMPORTED_MODULE_1__["default"](b, operations.get(_a), /// you can get it from operations but let's store it into prevArg.sn to speed our code a litte bit.
              {
                name: c
              });

              operations.set(_a, _sn2);
              prevArg.sn = {
                name: _a,
                sn: _sn2
              };
            } else {
              /// varName
              var _name2 = Object(_global_js__WEBPACK_IMPORTED_MODULE_2__["getRandomName"])();

              var _sn3 = new _Node_js__WEBPACK_IMPORTED_MODULE_1__["default"](b, new _Node_js__WEBPACK_IMPORTED_MODULE_1__["default"]('variable', [], {
                name: _a
              }), {
                name: c
              });

              operations.set(_name2, _sn3);
              prevArg = {
                name: _name2,
                sn: _sn3
              };
            }
          }
        } else {
          var _found = false;
          arg.replace("##".concat(options.nameTest, "##"), function () {
            _found = true;
          });

          if (_found) {
            prevArg = {
              name: arg,
              sn: operations.get(arg)
            };
          } else {
            prevArg = {
              name: arg
            };
          }
        }

        return '';
      });
      var a;

      while (a !== str) {
        a = str; /// if replacement is not implemented, str will sstill the same and while loop will close

        str = str.replace(search, function (match, suffix, op, prefix, arg) {
          if (!op) {
            Object(_global_js__WEBPACK_IMPORTED_MODULE_2__["sendError"])('operators', 'invalid operators', str, null);
          }

          if (suffix) {
            for (var i = 0; i < options.suffixOperators.length; i++) {
              if (options.suffixOperators[i].regex.test(suffix)) {
                /// creating an operations with type of  prefix operator,,, its arg is the prev arg
                var _a2 = prevArg.name,
                    b = 'suffixOperator',
                    c = suffix;

                if (!isNaN(_a2)) {
                  /// number
                  var _name3 = Object(_global_js__WEBPACK_IMPORTED_MODULE_2__["getRandomName"])();

                  var sn = new _Node_js__WEBPACK_IMPORTED_MODULE_1__["default"](b, new _Node_js__WEBPACK_IMPORTED_MODULE_1__["default"]('number', [], {
                    value: parseInt(_a2)
                  }), {
                    name: c
                  });
                  operations.set(_name3, sn);
                  prevArg = {
                    name: _name3,
                    sn: sn
                  };
                } else {
                  var found = false;

                  _a2.replace("##".concat(options.nameTest, "##"), function () {
                    found = true;
                  });

                  if (found) {
                    /// operations
                    var _sn4 = new _Node_js__WEBPACK_IMPORTED_MODULE_1__["default"](b, prevArg.sn, /// you can get it from operations but let's store it into prevArg.sn to speed our code a litte bit.
                    {
                      name: c
                    });

                    operations.set(_a2, _sn4);
                    prevArg.sn = _sn4;
                  } else {
                    /// varName
                    var _name4 = Object(_global_js__WEBPACK_IMPORTED_MODULE_2__["getRandomName"])();

                    var _sn5 = new _Node_js__WEBPACK_IMPORTED_MODULE_1__["default"](b, new _Node_js__WEBPACK_IMPORTED_MODULE_1__["default"]('variable', [], {
                      name: _a2
                    }), {
                      name: c
                    });

                    operations.set(_name4, _sn5);
                    prevArg = {
                      name: _name4,
                      sn: _sn5
                    };
                  }
                }
              }
            }
          }

          _str += prevArg.name + ' ' + op + ' ';

          if (prefix) {
            var _a3 = arg,
                _b = 'prefixOperator',
                _c = prefix;

            if (!isNaN(_a3)) {
              /// number
              var _name5 = Object(_global_js__WEBPACK_IMPORTED_MODULE_2__["getRandomName"])();

              var _sn6 = new _Node_js__WEBPACK_IMPORTED_MODULE_1__["default"](_b, new _Node_js__WEBPACK_IMPORTED_MODULE_1__["default"]('number', [], {
                value: parseInt(_a3)
              }), {
                name: _c
              });

              operations.set(_name5, _sn6);
              prevArg = {
                name: _name5,
                sn: _sn6
              };
            } else {
              var _found2 = false;

              _a3.replace("##".concat(options.nameTest, "##"), function () {
                _found2 = true;
              });

              if (_found2) {
                /// operations
                var _sn7 = new _Node_js__WEBPACK_IMPORTED_MODULE_1__["default"](_b, operations.get(_a3), /// you can get it from operations but let's store it into prevArg.sn to speed our code a litte bit.
                {
                  name: _c
                });

                operations.set(_a3, _sn7);
                prevArg.sn = {
                  name: _a3,
                  sn: _sn7
                };
              } else {
                /// varName
                var _name6 = Object(_global_js__WEBPACK_IMPORTED_MODULE_2__["getRandomName"])();

                var _sn8 = new _Node_js__WEBPACK_IMPORTED_MODULE_1__["default"](_b, new _Node_js__WEBPACK_IMPORTED_MODULE_1__["default"]('variable', [], {
                  name: _a3
                }), {
                  name: _c
                });

                operations.set(_name6, _sn8);
                prevArg = {
                  name: _name6,
                  sn: _sn8
                };
              }
            }
          } else {
            var _found3 = false;
            arg.replace("##".concat(options.nameTest, "##"), function () {
              _found3 = true;
            });

            if (_found3) {
              prevArg = {
                name: arg,
                sn: operations.get(arg)
              };
            } else {
              prevArg = {
                name: arg
              };
            }
          }

          return '';
        });
      } // final search


      if (str !== '') {
        str = str.replace(finalSearch, function (match, suffix) {
          var a = prevArg.name,
              b = 'suffixOperator',
              c = suffix;

          if (!isNaN(a)) {
            /// number
            var _name7 = Object(_global_js__WEBPACK_IMPORTED_MODULE_2__["getRandomName"])();

            var sn = new _Node_js__WEBPACK_IMPORTED_MODULE_1__["default"](b, new _Node_js__WEBPACK_IMPORTED_MODULE_1__["default"]('number', [], {
              value: parseInt(a)
            }), {
              name: c
            });
            operations.set(_name7, sn);
            prevArg = {
              name: _name7,
              sn: sn
            };
          } else {
            var found = false;
            a.replace("##".concat(options.nameTest, "##"), function () {
              found = true;
            });

            if (found) {
              /// operations
              var _sn9 = new _Node_js__WEBPACK_IMPORTED_MODULE_1__["default"](b, prevArg.sn, /// you can get it from operations but let's store it into prevArg.sn to speed our code a litte bit.
              {
                name: c
              });

              operations.set(a, _sn9);
              prevArg.sn = {
                name: a,
                sn: _sn9
              };
            } else {
              /// varName
              var _name8 = Object(_global_js__WEBPACK_IMPORTED_MODULE_2__["getRandomName"])();

              var _sn10 = new _Node_js__WEBPACK_IMPORTED_MODULE_1__["default"](b, new _Node_js__WEBPACK_IMPORTED_MODULE_1__["default"]('variable', [], {
                name: a
              }), {
                name: c
              });

              operations.set(_name8, _sn10);
              prevArg = {
                name: _name8,
                sn: _sn10
              };
            }
          }

          _str += prevArg.name;
          return '';
        });
        if (str !== '') Object(_global_js__WEBPACK_IMPORTED_MODULE_2__["sendError"])('operators', 'invalid suffix operator at the end', '', null);
      } //#endregion


      return _str;
    }
  }, {
    key: "environment",
    get: function get() {
      return this._environment;
    },
    set: function set(env) {
      console.Error('You can not set environment property directly, use setEnvironment instead.');
    }
  }, {
    key: "options",
    get: function get() {
      return this._options;
    },
    set: function set(options) {
      options = Object.assign(this._options, options); /// make this._options a reference for options

      Object(_global_js__WEBPACK_IMPORTED_MODULE_2__["prepareOptions"])(options);
    }
  }]);

  return Parser;
}();



/***/ }),

/***/ "./src/blocks.js":
/*!***********************!*\
  !*** ./src/blocks.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return block; });
/* harmony import */ var _global_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./global.js */ "./src/global.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// for exmaple brackets and quotations
//{ openingChar: '{', closingChar: '}', num: 0, opened: false }


var block =
/*#__PURE__*/
function () {
  function block() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, block);

    options = _objectSpread({}, options);
    Object.assign(this, options); // these properties are deprecated and algorithms was enhanced :._.:
    // this.opened = false; 
    // this.num = 0;
  }

  _createClass(block, [{
    key: "id",
    get: function get() {
      return this._id;
    },
    set: function set(val) {
      if (val instanceof RegExp) {
        this._id = val;
        this.regex = val;
        this.regexStr = val.toString().slice(1, -1);
      } else if (val instanceof Object) {
        this._id = val;

        if (val.openingChar && val.closingChar) {
          val.contentTest = val.contentTest || 'all';

          if (val.contentTest instanceof RegExp) {
            val.contentTest = val.contentTest.toString().slice(1, -1);
          } else if (val.contentTest === 'all') {
            val.contentTest = '.*?';
          } else {
            val.contentTest = Object(_global_js__WEBPACK_IMPORTED_MODULE_0__["regSpecialChars"])(val.contentTest);
          }

          this.regexStr = "".concat(Object(_global_js__WEBPACK_IMPORTED_MODULE_0__["regSpecialChars"])(val.openingChar), "(").concat(val.contentTest, ")").concat(Object(_global_js__WEBPACK_IMPORTED_MODULE_0__["regSpecialChars"])(val.closingChar));
          this.regex = new RegExp(this.regexStr);
        }
      } else {
        this._id = val;
        this.regex = new RegExp(Object(_global_js__WEBPACK_IMPORTED_MODULE_0__["regSpecialChars"])(val));
        this.regexStr = val.toString();
      }
    }
  }, {
    key: "contentTest",
    get: function get() {
      return this._contentTest || 'all';
    },
    set: function set(val) {
      this._contentTest = val;
    }
  }]);

  return block;
}();



/***/ }),

/***/ "./src/customParsers/index.js":
/*!************************************!*\
  !*** ./src/customParsers/index.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./math.js */ "./src/customParsers/math.js");

/* harmony default export */ __webpack_exports__["default"] = ({
  Math: _math_js__WEBPACK_IMPORTED_MODULE_0__["default"]
});

/***/ }),

/***/ "./src/customParsers/math.js":
/*!***********************************!*\
  !*** ./src/customParsers/math.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return CustomMathParser; });
/* harmony import */ var _operators_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../operators.js */ "./src/operators.js");
/* harmony import */ var _blocks_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../blocks.js */ "./src/blocks.js");
/* harmony import */ var _Node_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Node.js */ "./src/Node.js");
/* harmony import */ var _global_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../global.js */ "./src/global.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }






var CustomMathParser =
/*#__PURE__*/
function () {
  function CustomMathParser(options) {
    _classCallCheck(this, CustomMathParser);

    this._options = {
      autoMultSign: true,
      vars: [],
      /// to be used in this case ::: ' 1 + var(2-5)' which is the same as ' 1+ var*(2-5)'
      nameTest: '[a-zA-Z_]+\\d*',
      numTest: '\\d+\\.?\\d*|\\d*\\.?\\d+',
      prefixOperators: [new _operators_js__WEBPACK_IMPORTED_MODULE_0__["prefixOperator"]({
        id: '+'
      }), new _operators_js__WEBPACK_IMPORTED_MODULE_0__["prefixOperator"]({
        id: '-'
      })],
      suffixOperators: [new _operators_js__WEBPACK_IMPORTED_MODULE_0__["suffixOperator"]({
        id: '!'
      }), new _operators_js__WEBPACK_IMPORTED_MODULE_0__["suffixOperator"]({
        id: 'deg'
      }), new _operators_js__WEBPACK_IMPORTED_MODULE_0__["suffixOperator"]({
        id: 'rad'
      })],
      operators: [new _operators_js__WEBPACK_IMPORTED_MODULE_0__["operator"]({
        id: '^',
        zIndex: 10
      }), // the first operator to process
      new _operators_js__WEBPACK_IMPORTED_MODULE_0__["operator"]({
        id: '*',
        zIndex: 9
      }), new _operators_js__WEBPACK_IMPORTED_MODULE_0__["operator"]({
        id: '/',
        zIndex: 9
      }), new _operators_js__WEBPACK_IMPORTED_MODULE_0__["operator"]({
        id: 'mod',
        zIndex: 9
      }), new _operators_js__WEBPACK_IMPORTED_MODULE_0__["operator"]({
        id: '+',
        zIndex: 7
      }), new _operators_js__WEBPACK_IMPORTED_MODULE_0__["operator"]({
        id: '-',
        zIndex: 7
      }), new _operators_js__WEBPACK_IMPORTED_MODULE_0__["operator"]({
        id: '>>',
        zIndex: 6
      }), new _operators_js__WEBPACK_IMPORTED_MODULE_0__["operator"]({
        id: '<<',
        zIndex: 6
      }), new _operators_js__WEBPACK_IMPORTED_MODULE_0__["operator"]({
        id: '>=',
        zIndex: 5
      }), new _operators_js__WEBPACK_IMPORTED_MODULE_0__["operator"]({
        id: '<=',
        zIndex: 5
      }), new _operators_js__WEBPACK_IMPORTED_MODULE_0__["operator"]({
        id: '!=',
        zIndex: 5
      }), new _operators_js__WEBPACK_IMPORTED_MODULE_0__["operator"]({
        id: '<',
        zIndex: 5
      }), new _operators_js__WEBPACK_IMPORTED_MODULE_0__["operator"]({
        id: '>',
        zIndex: 5
      }), new _operators_js__WEBPACK_IMPORTED_MODULE_0__["operator"]({
        id: '==',
        zIndex: 5
      }), new _operators_js__WEBPACK_IMPORTED_MODULE_0__["operator"]({
        id: '&',
        zIndex: 4
      }), new _operators_js__WEBPACK_IMPORTED_MODULE_0__["operator"]({
        id: 'band',
        zIndex: 4
      }), new _operators_js__WEBPACK_IMPORTED_MODULE_0__["operator"]({
        id: '|',
        zIndex: 4
      }), new _operators_js__WEBPACK_IMPORTED_MODULE_0__["operator"]({
        id: 'bor',
        zIndex: 4
      }), new _operators_js__WEBPACK_IMPORTED_MODULE_0__["operator"]({
        id: 'bxor',
        zIndex: 4
      }), new _operators_js__WEBPACK_IMPORTED_MODULE_0__["operator"]({
        id: 'constrain',
        zIndex: 4
      }), new _operators_js__WEBPACK_IMPORTED_MODULE_0__["operator"]({
        id: 'in',
        zIndex: 3
      }), new _operators_js__WEBPACK_IMPORTED_MODULE_0__["operator"]({
        id: 'out',
        zIndex: 3
      }), new _operators_js__WEBPACK_IMPORTED_MODULE_0__["operator"]({
        id: 'xnor',
        zIndex: 1
      }), new _operators_js__WEBPACK_IMPORTED_MODULE_0__["operator"]({
        id: 'xor',
        zIndex: 1
      }), new _operators_js__WEBPACK_IMPORTED_MODULE_0__["operator"]({
        id: 'nand',
        zIndex: 1
      }), new _operators_js__WEBPACK_IMPORTED_MODULE_0__["operator"]({
        id: 'nor',
        zIndex: 1
      }), new _operators_js__WEBPACK_IMPORTED_MODULE_0__["operator"]({
        id: 'or',
        zIndex: 1
      }), new _operators_js__WEBPACK_IMPORTED_MODULE_0__["operator"]({
        id: 'and',
        zIndex: 1
      }), new _operators_js__WEBPACK_IMPORTED_MODULE_0__["operator"]({
        id: '||',
        zIndex: 1
      }), new _operators_js__WEBPACK_IMPORTED_MODULE_0__["operator"]({
        id: '&&',
        zIndex: 1
      }), new _operators_js__WEBPACK_IMPORTED_MODULE_0__["operator"]({
        id: '=',
        zIndex: 0
      }) // the last operator to be applied
      ],
      separators: [new _operators_js__WEBPACK_IMPORTED_MODULE_0__["separator"]({
        id: ';'
      }), new _operators_js__WEBPACK_IMPORTED_MODULE_0__["separator"]({
        id: ','
      })],
      blocks: [new _blocks_js__WEBPACK_IMPORTED_MODULE_1__["default"]({
        id: {
          openingChar: '{',
          closingChar: '}'
        }
      }), /// multiNodable used to know whether or not the bracket block can have multiNode seperated be something like comma ","
      new _blocks_js__WEBPACK_IMPORTED_MODULE_1__["default"]({
        id: {
          openingChar: '[',
          closingChar: ']'
        }
      }), new _blocks_js__WEBPACK_IMPORTED_MODULE_1__["default"]({
        id: {
          openingChar: '(',
          closingChar: ')'
        }
      }), new _blocks_js__WEBPACK_IMPORTED_MODULE_1__["default"]({
        id: {
          openingChar: '"',
          closingChar: '"'
        }
      }), new _blocks_js__WEBPACK_IMPORTED_MODULE_1__["default"]({
        id: {
          openingChar: "'",
          closingChar: "'"
        }
      })],
      forbiddenChars: []
    };
    this.options = options;
  }

  _createClass(CustomMathParser, [{
    key: "parse",
    value: function parse(str) {
      var operations = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var options = this.options;
      operations = operations instanceof Map ? operations : new Map(); //#region pre codes

      for (var i = 0; i < options.forbiddenChars.length; i++) {
        if (Object(_global_js__WEBPACK_IMPORTED_MODULE_3__["contains"])(str, options.forbiddenChars[i])) Object(_global_js__WEBPACK_IMPORTED_MODULE_3__["sendError"])('forbiddenSymbol', 'forbidden symbol.');
      } // if empty


      str = str.replace(/\s+/g, function () {
        return ' ';
      }); //#endregion

      return this.__parse(str, options, operations);
    }
  }, {
    key: "__parse",
    value: function __parse(str, options, operations) {
      var subOptions = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
      var snode;
      subOptions = _objectSpread({
        parseBlocks: true,
        parseOperators: true
      }, subOptions); /// or use Object.assign
      //#region parsing
      // if empty of characters

      str = str.replace(/^\s*$/, function () {
        snode = new _Node_js__WEBPACK_IMPORTED_MODULE_2__["default"]('');
      });
      if (snode) return snode;

      if (subOptions.parseBlocks) {
        str = this.__parseBlocks(str, options, operations);
      }

      if (subOptions.parseOperators) {
        str = this.__parseOperators(str, options, operations);
      } //#endregion
      //#region the last thing in str,,, number or name or operationName 
      // if name of operation


      str = str.replace(/^\s*(.*)\s*$/, '$1'); /// if number

      if (!isNaN(str)) {
        snode = new _Node_js__WEBPACK_IMPORTED_MODULE_2__["default"]('number', [], {
          value: parseFloat(str)
        });
      } // if operation name


      str = str.replace(options.operationTestReg, function (opName) {
        snode = operations.get(opName);
      });
      if (snode) return snode; // if literal (variable) or bool {true or false}, ...

      str = str.replace(options.nameTestReg, function (name) {
        snode = new _Node_js__WEBPACK_IMPORTED_MODULE_2__["default"]('variable', [], {
          name: name
        });
      });
      if (snode) return snode; //#endregion
      // this shouldn't happen in ordinary cases, but this line of code is here for avoiding any flaw out of measurements

      throw new Error('invalid script.\n' + str);
    }
    /**
     * this modified version of __parseBlocks is much better and faster,,, we have gotten rid of if statements and varaible and alot of code that are redundant
     */

  }, {
    key: "__parseBlocks",
    value: function __parseBlocks(str, options, operations) {
      var _this = this;

      //#region brackets
      var blocks = options.blocks;
      var b;

      var repBlock = function repBlock(match, content) {
        var name = Object(_global_js__WEBPACK_IMPORTED_MODULE_3__["getRandomName"])();
        var sn = new _Node_js__WEBPACK_IMPORTED_MODULE_2__["default"]('block', [_this.__parse(content, options, operations)], {
          id: b.id
        });
        operations.set(name, sn);
        return name;
      };

      for (var i = 0; i < blocks.values.length; i++) {
        b = blocks.values[i];
        str = str.replace(b.regex, repBlock);
      } //#endregion


      return str;
    }
  }, {
    key: "__parseOperators",
    value: function __parseOperators(str, options, operations) {
      /// RegExp: (var or num or block)(suffix)(op)(prefix)(var or num or block)
      /// ((?:[a-zA-Z_]+\d*)|(?:-?\d+\.?\d*)|(?:-?\d*\.?\d+))\s*((?:\+\+))?\s*((?:\+))\s*((?:\+\+|\+|\-))?\s*((?:[a-zA-Z_]+\d*)|(?:\d+\.?\d*)|(?:\d*\.?\d+))
      //#region separators
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = options.separators[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var s = _step.value;

          if (Object(_global_js__WEBPACK_IMPORTED_MODULE_3__["contains"])(str, s.id)) {
            var name = this.__get;
            var args = [];
            var strs = str.split(s);
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
              for (var _iterator2 = strs[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                var str_ = _step2.value;
                args.push(this.__parse(str_, options, operations));
              }
            } catch (err) {
              _didIteratorError2 = true;
              _iteratorError2 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
                  _iterator2["return"]();
                }
              } finally {
                if (_didIteratorError2) {
                  throw _iteratorError2;
                }
              }
            }

            operations.set(name, new _Node_js__WEBPACK_IMPORTED_MODULE_2__["default"]('separator', args, {
              name: s.id,
              length: args.length
            }));
          }
        } //#endregion
        //#region preparing for parsing process

      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      var _str = '',
          prevArg = {
        name: null,
        sn: null
      }; //#endregion
      //#region searching for operators and parsing suffix and prefix
      /// intial replacement

      str = str.replace(options.opIntialTestReg, function (match, prefix, arg) {
        if (prefix) {
          var a = arg,
              b = 'prefixOperator',
              c = prefix;

          if (!isNaN(a)) {
            /// number
            var name = Object(_global_js__WEBPACK_IMPORTED_MODULE_3__["getRandomName"])();
            var sn = new _Node_js__WEBPACK_IMPORTED_MODULE_2__["default"](b, new _Node_js__WEBPACK_IMPORTED_MODULE_2__["default"]('number', [], {
              value: parseInt(a)
            }), {
              name: c
            });
            operations.set(name, sn);
            prevArg = {
              name: name,
              sn: sn
            };
          } else {
            var found = false;
            a.replace(options.operationTestReg, function () {
              found = true;
            });

            if (found) {
              /// operations
              var _sn = new _Node_js__WEBPACK_IMPORTED_MODULE_2__["default"](b, operations.get(a), /// you can get it from operations but let's store it into prevArg.sn to speed our code a litte bit.
              {
                name: c
              });

              operations.set(a, _sn);
              prevArg.sn = {
                name: a,
                sn: _sn
              };
            } else {
              /// varName
              var _name = Object(_global_js__WEBPACK_IMPORTED_MODULE_3__["getRandomName"])();

              var _sn2 = new _Node_js__WEBPACK_IMPORTED_MODULE_2__["default"](b, new _Node_js__WEBPACK_IMPORTED_MODULE_2__["default"]('variable', [], {
                name: a
              }), {
                name: c
              });

              operations.set(_name, _sn2);
              prevArg = {
                name: _name,
                sn: _sn2
              };
            }
          }
        } else {
          var _found = false;
          arg.replace(options.operationTestReg, function () {
            _found = true;
          });

          if (_found) {
            prevArg = {
              name: arg,
              sn: operations.get(arg)
            };
          } else {
            prevArg = {
              name: arg
            };
          }
        }

        return '';
      });
      var end = false; // inner search for operators

      while (!end) {
        end = true; /// if replacement is not implemented, str will sstill the same and while loop will close

        str = str.replace(options.opTestReg, function (match, suffix, op, prefix, arg) {
          if (!op) {
            Object(_global_js__WEBPACK_IMPORTED_MODULE_3__["sendError"])('operators', 'invalid operators', str, null);
          }

          if (suffix) {
            /// creating an operations with type of  prefix operator,,, its arg is the prev arg
            var a = prevArg.name,
                b = 'suffixOperator',
                c = suffix;

            if (!isNaN(a)) {
              /// number
              var name = Object(_global_js__WEBPACK_IMPORTED_MODULE_3__["getRandomName"])();
              var sn = new _Node_js__WEBPACK_IMPORTED_MODULE_2__["default"](b, new _Node_js__WEBPACK_IMPORTED_MODULE_2__["default"]('number', [], {
                value: parseInt(a)
              }), {
                name: c
              });
              operations.set(name, sn);
              prevArg = {
                name: name,
                sn: sn
              };
            } else {
              var found = false;
              a.replace(options.operationTestReg, function () {
                found = true;
              });

              if (found) {
                /// operations
                var _sn3 = new _Node_js__WEBPACK_IMPORTED_MODULE_2__["default"](b, prevArg.sn, /// you can get it from operations but let's store it into prevArg.sn to speed our code a litte bit.
                {
                  name: c
                });

                operations.set(a, _sn3);
                prevArg.sn = _sn3;
              } else {
                /// varName
                var _name2 = Object(_global_js__WEBPACK_IMPORTED_MODULE_3__["getRandomName"])();

                var _sn4 = new _Node_js__WEBPACK_IMPORTED_MODULE_2__["default"](b, new _Node_js__WEBPACK_IMPORTED_MODULE_2__["default"]('variable', [], {
                  name: a
                }), {
                  name: c
                });

                operations.set(_name2, _sn4);
                prevArg = {
                  name: _name2,
                  sn: _sn4
                };
              }
            }
          }

          _str += prevArg.name + ' ' + op + ' ';

          if (prefix) {
            var _a = arg,
                _b = 'prefixOperator',
                _c = prefix;

            if (!isNaN(_a)) {
              /// number
              var _name3 = Object(_global_js__WEBPACK_IMPORTED_MODULE_3__["getRandomName"])();

              var _sn5 = new _Node_js__WEBPACK_IMPORTED_MODULE_2__["default"](_b, new _Node_js__WEBPACK_IMPORTED_MODULE_2__["default"]('number', [], {
                value: parseInt(_a)
              }), {
                name: _c
              });

              operations.set(_name3, _sn5);
              prevArg = {
                name: _name3,
                sn: _sn5
              };
            } else {
              var _found2 = false;

              _a.replace(options.operationTestReg, function () {
                _found2 = true;
              });

              if (_found2) {
                /// operations
                var _sn6 = new _Node_js__WEBPACK_IMPORTED_MODULE_2__["default"](_b, operations.get(_a), /// you can get it from operations but let's store it into prevArg.sn to speed our code a litte bit.
                {
                  name: _c
                });

                operations.set(_a, _sn6);
                prevArg.sn = {
                  name: _a,
                  sn: _sn6
                };
              } else {
                /// varName
                var _name4 = Object(_global_js__WEBPACK_IMPORTED_MODULE_3__["getRandomName"])();

                var _sn7 = new _Node_js__WEBPACK_IMPORTED_MODULE_2__["default"](_b, new _Node_js__WEBPACK_IMPORTED_MODULE_2__["default"]('variable', [], {
                  name: _a
                }), {
                  name: _c
                });

                operations.set(_name4, _sn7);
                prevArg = {
                  name: _name4,
                  sn: _sn7
                };
              }
            }
          } else {
            var _found3 = false;
            arg.replace(options.operationTestReg, function () {
              _found3 = true;
            });

            if (_found3) {
              prevArg = {
                name: arg,
                sn: operations.get(arg)
              };
            } else {
              prevArg = {
                name: arg
              };
            }
          }

          end = false;
          return '';
        });
      } // final search


      if (str !== '') {
        str = str.replace(options.opFinalTestReg, function (match, suffix) {
          var a = prevArg.name,
              b = 'suffixOperator',
              c = suffix;

          if (!isNaN(a)) {
            /// number
            var name = Object(_global_js__WEBPACK_IMPORTED_MODULE_3__["getRandomName"])();
            var sn = new _Node_js__WEBPACK_IMPORTED_MODULE_2__["default"](b, new _Node_js__WEBPACK_IMPORTED_MODULE_2__["default"]('number', [], {
              value: parseInt(a)
            }), {
              name: c
            });
            operations.set(name, sn);
            prevArg = {
              name: name,
              sn: sn
            };
          } else {
            var found = false;
            a.replace(options.operationTestReg, function () {
              found = true;
            });

            if (found) {
              /// operations
              var _sn8 = new _Node_js__WEBPACK_IMPORTED_MODULE_2__["default"](b, prevArg.sn, /// you can get it from operations but let's store it into prevArg.sn to speed our code a litte bit.
              {
                name: c
              });

              operations.set(a, _sn8);
              prevArg.sn = {
                name: a,
                sn: _sn8
              };
            } else {
              /// varName
              var _name5 = Object(_global_js__WEBPACK_IMPORTED_MODULE_3__["getRandomName"])();

              var _sn9 = new _Node_js__WEBPACK_IMPORTED_MODULE_2__["default"](b, new _Node_js__WEBPACK_IMPORTED_MODULE_2__["default"]('variable', [], {
                name: a
              }), {
                name: c
              });

              operations.set(_name5, _sn9);
              prevArg = {
                name: _name5,
                sn: _sn9
              };
            }
          }

          _str += prevArg.name;
          return '';
        });
        if (str !== '') Object(_global_js__WEBPACK_IMPORTED_MODULE_3__["sendError"])('operators', 'invalid suffix operator at the end', '', null);
      } else {
        _str += prevArg.name;
      } //#endregion
      //#region parsing operators


      for (var i = 0; i < options.operators.length; i++) {
        end = false;

        while (!end) {
          end = true;

          if (Object(_global_js__WEBPACK_IMPORTED_MODULE_3__["contains"])(_str, options.operators[i].id)) {
            _str = _str.replace(new RegExp("(".concat(options.argTest, ")\\s*(").concat(options.operators[i].regexStr, ")\\s*(").concat(options.argTest, ")")), function (match, g1, op, g2) {
              //#region argument for the operator
              var arg1, arg2;

              if (!isNaN(g1)) {
                /// number
                arg1 = new _Node_js__WEBPACK_IMPORTED_MODULE_2__["default"]('number', [], {
                  value: parseInt(g1)
                });
              } else {
                var found = false;
                g1.replace(options.operationTestReg, function () {
                  // operation
                  arg1 = operations.get(g1);
                  found = true;
                });

                if (!found) {
                  /// varName
                  arg1 = new _Node_js__WEBPACK_IMPORTED_MODULE_2__["default"]('variable', [], {
                    name: g1
                  });
                }
              }

              if (!isNaN(g2)) {
                /// number
                arg2 = new _Node_js__WEBPACK_IMPORTED_MODULE_2__["default"]('number', [], {
                  value: parseInt(g2)
                });
              } else {
                var _found4 = false;
                g2.replace(options.operationTestReg, function () {
                  // operation
                  arg2 = operations.get(g2);
                  _found4 = true;
                });

                if (!_found4) {
                  /// varName
                  arg2 = new _Node_js__WEBPACK_IMPORTED_MODULE_2__["default"]('variable', [], {
                    name: g2
                  });
                }
              } //#endregion


              var name = Object(_global_js__WEBPACK_IMPORTED_MODULE_3__["getRandomName"])();
              operations.set(name, new _Node_js__WEBPACK_IMPORTED_MODULE_2__["default"]('operator', [arg1, arg2], {
                name: op
              }));
              end = false;
              return name;
            });
          } /// if the operator is not found,,, end the while loop.

        }
      } //#endregion


      return _str;
    }
  }, {
    key: "options",
    get: function get() {
      return this._options;
    },
    set: function set(options) {
      options = Object.assign(this._options, options);
      Object(_global_js__WEBPACK_IMPORTED_MODULE_3__["prepareOptions"])(options);
    }
  }]);

  return CustomMathParser;
}();



/***/ }),

/***/ "./src/environments.js":
/*!*****************************!*\
  !*** ./src/environments.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _operators_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./operators.js */ "./src/operators.js");
/* harmony import */ var _blocks_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./blocks.js */ "./src/blocks.js");


/* harmony default export */ __webpack_exports__["default"] = (new Map([
/**
 * [key is env, value is options]
 */
['new', {
  nameTest: '[a-zA-Z_]+\\d*',
  numTest: '\\d+\\.?\\d*|\\d*\\.?\\d+',
  operators: [],
  suffixOperators: [],
  prefixOperators: [],
  blocks: []
}], ["math", {
  nameTest: '[a-zA-Z_]+\\d*',
  numTest: '\\d+\\.?\\d*|\\d*\\.?\\d+',
  autoMultSign: true,
  vars: [],
  /// to be used in this case ::: ' 1 + var(2-5)' which is the same as ' 1+ var*(2-5)'
  prefixOperators: [new _operators_js__WEBPACK_IMPORTED_MODULE_0__["prefixOperator"]({
    name: '!'
  }), new _operators_js__WEBPACK_IMPORTED_MODULE_0__["prefixOperator"]({
    name: 'not'
  }), new _operators_js__WEBPACK_IMPORTED_MODULE_0__["prefixOperator"]({
    name: '~'
  }), new _operators_js__WEBPACK_IMPORTED_MODULE_0__["prefixOperator"]({
    name: '++'
  }), new _operators_js__WEBPACK_IMPORTED_MODULE_0__["prefixOperator"]({
    name: '--'
  }), new _operators_js__WEBPACK_IMPORTED_MODULE_0__["prefixOperator"]({
    name: '+'
  }), new _operators_js__WEBPACK_IMPORTED_MODULE_0__["prefixOperator"]({
    name: '-'
  }), new _operators_js__WEBPACK_IMPORTED_MODULE_0__["prefixOperator"]({
    name: 'bnot'
  })],
  suffixOperators: [new _operators_js__WEBPACK_IMPORTED_MODULE_0__["suffixOperator"]({
    name: '!'
  }), new _operators_js__WEBPACK_IMPORTED_MODULE_0__["suffixOperator"]({
    name: '++'
  }), new _operators_js__WEBPACK_IMPORTED_MODULE_0__["suffixOperator"]({
    name: '--'
  })],
  operators: [new _operators_js__WEBPACK_IMPORTED_MODULE_0__["operator"]({
    name: '^',
    zIndex: 10
  }), // the first operator to process
  new _operators_js__WEBPACK_IMPORTED_MODULE_0__["operator"]({
    name: '*',
    zIndex: 9
  }), new _operators_js__WEBPACK_IMPORTED_MODULE_0__["operator"]({
    name: '/',
    zIndex: 9
  }), new _operators_js__WEBPACK_IMPORTED_MODULE_0__["operator"]({
    name: 'mod',
    zIndex: 8
  }), new _operators_js__WEBPACK_IMPORTED_MODULE_0__["operator"]({
    name: '+',
    zIndex: 7
  }), new _operators_js__WEBPACK_IMPORTED_MODULE_0__["operator"]({
    name: '-',
    zIndex: 7
  }), new _operators_js__WEBPACK_IMPORTED_MODULE_0__["operator"]({
    name: '>>',
    zIndex: 6
  }), new _operators_js__WEBPACK_IMPORTED_MODULE_0__["operator"]({
    name: '<<',
    zIndex: 6
  }), new _operators_js__WEBPACK_IMPORTED_MODULE_0__["operator"]({
    name: '>=',
    zIndex: 5
  }), new _operators_js__WEBPACK_IMPORTED_MODULE_0__["operator"]({
    name: '<=',
    zIndex: 5
  }), new _operators_js__WEBPACK_IMPORTED_MODULE_0__["operator"]({
    name: '!=',
    zIndex: 5
  }), new _operators_js__WEBPACK_IMPORTED_MODULE_0__["operator"]({
    name: '=',
    zIndex: 5
  }), new _operators_js__WEBPACK_IMPORTED_MODULE_0__["operator"]({
    name: '<',
    zIndex: 5
  }), new _operators_js__WEBPACK_IMPORTED_MODULE_0__["operator"]({
    name: '>',
    zIndex: 5
  }), new _operators_js__WEBPACK_IMPORTED_MODULE_0__["operator"]({
    name: '==',
    zIndex: 5
  }), new _operators_js__WEBPACK_IMPORTED_MODULE_0__["operator"]({
    name: '&',
    zIndex: 4
  }), new _operators_js__WEBPACK_IMPORTED_MODULE_0__["operator"]({
    name: 'band',
    zIndex: 4
  }), new _operators_js__WEBPACK_IMPORTED_MODULE_0__["operator"]({
    name: '|',
    zIndex: 4
  }), new _operators_js__WEBPACK_IMPORTED_MODULE_0__["operator"]({
    name: 'bor',
    zIndex: 4
  }), new _operators_js__WEBPACK_IMPORTED_MODULE_0__["operator"]({
    name: 'bxor',
    zIndex: 4
  }), new _operators_js__WEBPACK_IMPORTED_MODULE_0__["operator"]({
    name: 'constrain',
    zIndex: 4
  }), new _operators_js__WEBPACK_IMPORTED_MODULE_0__["operator"]({
    name: 'in',
    zIndex: 3
  }), new _operators_js__WEBPACK_IMPORTED_MODULE_0__["operator"]({
    name: 'out',
    zIndex: 3
  }), new _operators_js__WEBPACK_IMPORTED_MODULE_0__["operator"]({
    name: 'xnor',
    zIndex: 1
  }), new _operators_js__WEBPACK_IMPORTED_MODULE_0__["operator"]({
    name: 'xor',
    zIndex: 1
  }), new _operators_js__WEBPACK_IMPORTED_MODULE_0__["operator"]({
    name: 'nand',
    zIndex: 1
  }), new _operators_js__WEBPACK_IMPORTED_MODULE_0__["operator"]({
    name: 'nor',
    zIndex: 1
  }), new _operators_js__WEBPACK_IMPORTED_MODULE_0__["operator"]({
    name: 'or',
    zIndex: 1
  }), new _operators_js__WEBPACK_IMPORTED_MODULE_0__["operator"]({
    name: 'and',
    zIndex: 1
  }), new _operators_js__WEBPACK_IMPORTED_MODULE_0__["operator"]({
    name: '||',
    zIndex: 1
  }), new _operators_js__WEBPACK_IMPORTED_MODULE_0__["operator"]({
    name: '&&',
    zIndex: 1
  }), new _operators_js__WEBPACK_IMPORTED_MODULE_0__["operator"]({
    name: '=',
    zIndex: 0
  }) // the last operator to be applied
  ],
  separators: [new _operators_js__WEBPACK_IMPORTED_MODULE_0__["separator"]({
    name: ';'
  }), new _operators_js__WEBPACK_IMPORTED_MODULE_0__["separator"]({
    name: ','
  })],
  blocks: [new _blocks_js__WEBPACK_IMPORTED_MODULE_1__["default"]({
    openingChar: '{',
    closingChar: '}',
    num: 0,
    opened: false
  }), /// multiNodable used to know whether or not the bracket block can have multiNode seperated be something like comma ","
  new _blocks_js__WEBPACK_IMPORTED_MODULE_1__["default"]({
    openingChar: '[',
    closingChar: ']',
    num: 0,
    opened: false
  }), new _blocks_js__WEBPACK_IMPORTED_MODULE_1__["default"]({
    openingChar: '(',
    closingChar: ')',
    num: 0,
    opened: false
  }), new _blocks_js__WEBPACK_IMPORTED_MODULE_1__["default"]({
    openingChar: '"',
    closingChar: '"',
    num: 0,
    opened: false
  }), new _blocks_js__WEBPACK_IMPORTED_MODULE_1__["default"]({
    openingChar: "'",
    closingChar: "'",
    num: 0,
    opened: false
  })],
  forbiddenChars: []
}]]));

/***/ }),

/***/ "./src/errors.js":
/*!***********************!*\
  !*** ./src/errors.js ***!
  \***********************/
/*! exports provided: forbiddenSymbolsError, operatorsError, blocksError */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "forbiddenSymbolsError", function() { return forbiddenSymbolsError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "operatorsError", function() { return operatorsError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "blocksError", function() { return blocksError; });
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var forbiddenSymbolsError =
/*#__PURE__*/
function (_Error) {
  _inherits(forbiddenSymbolsError, _Error);

  function forbiddenSymbolsError(msg, pos) {
    var _this;

    _classCallCheck(this, forbiddenSymbolsError);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(forbiddenSymbolsError).call(this, msg));
    _this.position = pos;
    _this.messsege = msg;
    return _this;
  }

  return forbiddenSymbolsError;
}(_wrapNativeSuper(Error));
var operatorsError =
/*#__PURE__*/
function (_Error2) {
  _inherits(operatorsError, _Error2);

  function operatorsError(msg, pos) {
    var _this2;

    _classCallCheck(this, operatorsError);

    _this2 = _possibleConstructorReturn(this, _getPrototypeOf(operatorsError).call(this, msg));
    _this2.position = pos;
    _this2.messsege = msg;
    return _this2;
  }

  return operatorsError;
}(_wrapNativeSuper(Error));
var blocksError =
/*#__PURE__*/
function (_Error3) {
  _inherits(blocksError, _Error3);

  function blocksError(msg, pos) {
    var _this3;

    _classCallCheck(this, blocksError);

    _this3 = _possibleConstructorReturn(this, _getPrototypeOf(blocksError).call(this, msg));
    _this3.position = pos;
    _this3.messsege = msg;
    return _this3;
  }

  return blocksError;
}(_wrapNativeSuper(Error));

/***/ }),

/***/ "./src/global.js":
/*!***********************!*\
  !*** ./src/global.js ***!
  \***********************/
/*! exports provided: regSpecialChars, strTOreg, specialRegex, checker, sendError, prepareOptions, contains, getRandomName */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "regSpecialChars", function() { return regSpecialChars; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "strTOreg", function() { return strTOreg; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "specialRegex", function() { return specialRegex; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "checker", function() { return checker; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sendError", function() { return sendError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "prepareOptions", function() { return prepareOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "contains", function() { return contains; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRandomName", function() { return getRandomName; });
/* harmony import */ var _errors_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./errors.js */ "./src/errors.js");

function regSpecialChars(str) {
  return str.replace(/[+*/.$^(){|}[\]]/g, function (match) {
    return '\\' + match;
  });
}
function strTOreg(str) {
  return new RegExp(regSpecialChars(str));
}
var specialRegex = {
  regSpecialChars: /[+*/.$^(){}[\]]/,
  num: /(-?\d+\.?\d*)|(-?\d*\.?\d+)/ // var: // var is removed as you should care about other letters in other langs that I don't know how to check for using regex

};
var checker = {
  symbols: '!"#$%&()*+,-./:;<=>?@[\\]^_`{|}~€‚„…†‡ˆ‰‹‘’“”•–—˜™›¡¢£¤¥¦§¨©«¬®¯°±²³´¶·¸¹º»¼½¾¿×÷' + "'",
  isSymbol: function isSymbol(c) {
    return /(?:[$+<->^`|~\xA2-\xA6\xA8\xA9\xAC\xAE-\xB1\xB4\xB8\xD7\xF7\u02C2-\u02C5\u02D2-\u02DF\u02E5-\u02EB\u02ED\u02EF-\u02FF\u0375\u0384\u0385\u03F6\u0482\u058D-\u058F\u0606-\u0608\u060B\u060E\u060F\u06DE\u06E9\u06FD\u06FE\u07F6\u07FE\u07FF\u09F2\u09F3\u09FA\u09FB\u0AF1\u0B70\u0BF3-\u0BFA\u0C7F\u0D4F\u0D79\u0E3F\u0F01-\u0F03\u0F13\u0F15-\u0F17\u0F1A-\u0F1F\u0F34\u0F36\u0F38\u0FBE-\u0FC5\u0FC7-\u0FCC\u0FCE\u0FCF\u0FD5-\u0FD8\u109E\u109F\u1390-\u1399\u166D\u17DB\u1940\u19DE-\u19FF\u1B61-\u1B6A\u1B74-\u1B7C\u1FBD\u1FBF-\u1FC1\u1FCD-\u1FCF\u1FDD-\u1FDF\u1FED-\u1FEF\u1FFD\u1FFE\u2044\u2052\u207A-\u207C\u208A-\u208C\u20A0-\u20BF\u2100\u2101\u2103-\u2106\u2108\u2109\u2114\u2116-\u2118\u211E-\u2123\u2125\u2127\u2129\u212E\u213A\u213B\u2140-\u2144\u214A-\u214D\u214F\u218A\u218B\u2190-\u2307\u230C-\u2328\u232B-\u2426\u2440-\u244A\u249C-\u24E9\u2500-\u2767\u2794-\u27C4\u27C7-\u27E5\u27F0-\u2982\u2999-\u29D7\u29DC-\u29FB\u29FE-\u2B73\u2B76-\u2B95\u2B98-\u2BFF\u2CE5-\u2CEA\u2E80-\u2E99\u2E9B-\u2EF3\u2F00-\u2FD5\u2FF0-\u2FFB\u3004\u3012\u3013\u3020\u3036\u3037\u303E\u303F\u309B\u309C\u3190\u3191\u3196-\u319F\u31C0-\u31E3\u3200-\u321E\u322A-\u3247\u3250\u3260-\u327F\u328A-\u32B0\u32C0-\u33FF\u4DC0-\u4DFF\uA490-\uA4C6\uA700-\uA716\uA720\uA721\uA789\uA78A\uA828-\uA82B\uA836-\uA839\uAA77-\uAA79\uAB5B\uFB29\uFBB2-\uFBC1\uFDFC\uFDFD\uFE62\uFE64-\uFE66\uFE69\uFF04\uFF0B\uFF1C-\uFF1E\uFF3E\uFF40\uFF5C\uFF5E\uFFE0-\uFFE6\uFFE8-\uFFEE\uFFFC\uFFFD]|\uD800[\uDD37-\uDD3F\uDD79-\uDD89\uDD8C-\uDD8E\uDD90-\uDD9B\uDDA0\uDDD0-\uDDFC]|\uD802[\uDC77\uDC78\uDEC8]|\uD805\uDF3F|\uD807[\uDFD5-\uDFF1]|\uD81A[\uDF3C-\uDF3F\uDF45]|\uD82F\uDC9C|\uD834[\uDC00-\uDCF5\uDD00-\uDD26\uDD29-\uDD64\uDD6A-\uDD6C\uDD83\uDD84\uDD8C-\uDDA9\uDDAE-\uDDE8\uDE00-\uDE41\uDE45\uDF00-\uDF56]|\uD835[\uDEC1\uDEDB\uDEFB\uDF15\uDF35\uDF4F\uDF6F\uDF89\uDFA9\uDFC3]|\uD836[\uDC00-\uDDFF\uDE37-\uDE3A\uDE6D-\uDE74\uDE76-\uDE83\uDE85\uDE86]|\uD838[\uDD4F\uDEFF]|\uD83B[\uDCAC\uDCB0\uDD2E\uDEF0\uDEF1]|\uD83C[\uDC00-\uDC2B\uDC30-\uDC93\uDCA0-\uDCAE\uDCB1-\uDCBF\uDCC1-\uDCCF\uDCD1-\uDCF5\uDD10-\uDD6C\uDD70-\uDDAC\uDDE6-\uDE02\uDE10-\uDE3B\uDE40-\uDE48\uDE50\uDE51\uDE60-\uDE65\uDF00-\uDFFF]|\uD83D[\uDC00-\uDED5\uDEE0-\uDEEC\uDEF0-\uDEFA\uDF00-\uDF73\uDF80-\uDFD8\uDFE0-\uDFEB]|\uD83E[\uDC00-\uDC0B\uDC10-\uDC47\uDC50-\uDC59\uDC60-\uDC87\uDC90-\uDCAD\uDD00-\uDD0B\uDD0D-\uDD71\uDD73-\uDD76\uDD7A-\uDDA2\uDDA5-\uDDAA\uDDAE-\uDDCA\uDDCD-\uDE53\uDE60-\uDE6D\uDE70-\uDE73\uDE78-\uDE7A\uDE80-\uDE82\uDE90-\uDE95])/.test(c);
  },
  isEmoji: function isEmoji(c) {
    return /(?:[\u231A\u231B\u23E9-\u23EC\u23F0\u23F3\u25FD\u25FE\u2614\u2615\u2648-\u2653\u267F\u2693\u26A1\u26AA\u26AB\u26BD\u26BE\u26C4\u26C5\u26CE\u26D4\u26EA\u26F2\u26F3\u26F5\u26FA\u26FD\u2705\u270A\u270B\u2728\u274C\u274E\u2753-\u2755\u2757\u2795-\u2797\u27B0\u27BF\u2B1B\u2B1C\u2B50\u2B55]|\uD83C[\uDC04\uDCCF\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF7C\uDF7E-\uDF93\uDFA0-\uDFCA\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF4\uDFF8-\uDFFF]|\uD83D[\uDC00-\uDC3E\uDC40\uDC42-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDD7A\uDD95\uDD96\uDDA4\uDDFB-\uDE4F\uDE80-\uDEC5\uDECC\uDED0-\uDED2\uDED5\uDEEB\uDEEC\uDEF4-\uDEFA\uDFE0-\uDFEB]|\uD83E[\uDD0D-\uDD3A\uDD3C-\uDD45\uDD47-\uDD71\uDD73-\uDD76\uDD7A-\uDDA2\uDDA5-\uDDAA\uDDAE-\uDDCA\uDDCD-\uDDFF\uDE70-\uDE73\uDE78-\uDE7A\uDE80-\uDE82\uDE90-\uDE95])/.test(c);
  },
  isWhiteSpace: function isWhiteSpace(c) {
    return /[\t-\r \x85\xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000]/.test(c);
  },
  isNum: function isNum(c) {
    return !isNaN(c);
  },
  isAlpha: function isAlpha(c) {
    return !isNaN(c) && !checker.isSymbol(c);
  },
  spaced: function spaced(c) {
    return !checker.isSymbol(c);
  },
  isVarName: function isVarName(str) {
    var _this = this;

    var isvarname = true;
    str.replace(/^\s*(.*)\d*\s*$/, function (Math, g1) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = g1[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var c = _step.value;
          isvarname = _this.isAlpha(c) || c === '_';
          if (!isvarname) continue;
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    });
  },
  check: function check(str, test) {
    switch (test) {
      case 'name':
        return this.isVarName(str);

      case 'num':
        return !isNaN(str);

      case 'all':
        return true;

      default:
        if (test instanceof RegExp) {
          return test.test(str);
        } else {
          console.log("checking test \"".concat(test, "\" is not supported."));
          return true;
        }

    }
  }
};
function sendError(type, msg) {
  var str = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var pos = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : undefined;
  // (new Array(pos)).fill('_')     is the same as     '_'.repeat(pos)
  str = str || '';
  str = str === '' ? '' : '\n' + str + '\n';

  if (!isNaN(pos)) {
    pos = new Array(pos).fill('_').join('') + '^';
  } else if (pos) {
    // here the text in parsing process is multi line.
    pos = "position: ".concat(pos);
  } else {
    // pos is a falsy value
    pos = '';
  }

  msg = msg + str + pos;

  switch (type) {
    case 'forbiddenSymbols':
      throw new _errors_js__WEBPACK_IMPORTED_MODULE_0__["forbiddenSymbolsError"](msg);

    case 'operators':
      throw new _errors_js__WEBPACK_IMPORTED_MODULE_0__["operatorsError"](msg);

    case 'blocks':
      throw new _errors_js__WEBPACK_IMPORTED_MODULE_0__["blocksError"](msg);

    default:
      throw new Error(msg);
  }
}
function prepareOptions(options) {
  //#region all
  //#region string
  var all = {
    operators: ' ',
    prefixOperators: ' ',
    suffixOperators: ' '
  };

  var processArr = function processArr(arr) {
    if (arr && arr.length > 0) {
      var _all = ' ';

      var _loop = function _loop(i) {
        var op = arr[i];
        var repeated = false;

        _all.replace(new RegExp(" \\(@(".concat(op.regexStr, "),#(\\d*)\\) ")), function (match, opName, opIndex) {
          Object.assign(arr[i], arr[parseInt(opIndex)]); // merging the repeated operators

          arr.splice(parseInt(opIndex), 1); // removing the previous operator wiht the same name

          repeated = true;
          return " (@".concat(op.toString(), ",#").concat(i, ") ");
        });

        if (!repeated) _all += "(@".concat(op.toString(), ",#").concat(i, ") ");
      };

      for (var i = 0; i < arr.length; i++) {
        _loop(i);
      }

      return _all;
    }
  };

  all.operators = processArr(options.operators);
  all.prefixOperators = processArr(options.prefixOperators);
  all.suffixOperators = processArr(options.suffixOperators);
  options.all = all; //#endregion
  //#region regex

  all = {
    operators: '',
    prefixOperators: '',
    suffixOperators: ''
  };

  processArr = function processArr(arr) {
    if (arr.length == 0) return '';

    if (arr && arr.length > 0) {
      var _all = '';

      for (var i = 0; i < arr.length; i++) {
        var op = arr[i]; // let repeated = false; /// it is done in string

        _all += "".concat(op.regexStr, "|");
      }

      return _all.slice(0, -1);
    }
  };

  all.operators = processArr(options.operators);
  all.prefixOperators = processArr(options.prefixOperators);
  all.suffixOperators = processArr(options.suffixOperators);
  options.allRegex = all; //#endregion
  //#endregion
  //#region regex for search

  options.nameTestReg = new RegExp(options.nameTestReg);
  options.numTestReg = new RegExp(options.numTestReg);
  options.argTest = "".concat(options.nameTest, "|").concat(options.numTest, "|##").concat(options.nameTest, "##");
  options.argTestReg = new RegExp(options.argTestReg);
  options.operationTest = "##".concat(options.nameTest, "##");
  options.operationTestReg = new RegExp(options.operationTest);
  options.opTestReg = new RegExp("^\\s*(".concat(options.allRegex.suffixOperators, ")?\\s*(").concat(options.allRegex.operators, ")\\s*(").concat(options.allRegex.prefixOperators, ")?\\s*(").concat(options.argTest, ")\\s*"));
  options.opIntialTestReg = new RegExp("^\\s*(".concat(options.allRegex.prefixOperators, ")?\\s*(").concat(options.argTest, ")"));
  options.opFinalTestReg = new RegExp("^\\s*(".concat(options.allRegex.suffixOperators, ")\\s*$")); //#endregion
  //#region final steps
  // sort the array to be inversely according to zIndex property.

  if (options.operators) options.operators = options.operators.sort(function (a, b) {
    return -(a.zIndex - b.zIndex); // the negative sign is for reverse the array;
  });
  options.blocks = {
    values: options.blocks,
    openedBlock: null
  }; //#endregion
}
function contains(str, containedStr) {
  return str.indexOf(containedStr) > -1;
}
function getRandomName() {
  var num = 0; /// randomNameNum is here to avoid getting the same random name if the code is implemented so fast

  return "##" + (Date.now() + getRandomName.randomNameNum++).toString(36).replace(new RegExp(num++, 'g'), 'a') /// I am using Regex for global replacement.
  .replace(new RegExp(num++, 'g'), 'b').replace(new RegExp(num++, 'g'), 'c').replace(new RegExp(num++, 'g'), 'd').replace(new RegExp(num++, 'g'), 'e').replace(new RegExp(num++, 'g'), 'f').replace(new RegExp(num++, 'g'), 'g').replace(new RegExp(num++, 'g'), 'h').replace(new RegExp(num++, 'g'), 'i').replace(new RegExp(num++, 'g'), 'j') + '##';
}
getRandomName.randomNameNum = 0;

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Parser = __webpack_require__(/*! ./Parser */ "./src/Parser.js")["default"];

var CustomParsers = __webpack_require__(/*! ./customParsers/index */ "./src/customParsers/index.js")["default"];

var MagicalParser = {
  Parser: Parser,
  CustomParsers: CustomParsers
};
module.exports = MagicalParser;

/***/ }),

/***/ "./src/operators.js":
/*!**************************!*\
  !*** ./src/operators.js ***!
  \**************************/
/*! exports provided: commonOperator, operator, suffixOperator, prefixOperator, separator */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "commonOperator", function() { return commonOperator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "operator", function() { return operator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "suffixOperator", function() { return suffixOperator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "prefixOperator", function() { return prefixOperator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "separator", function() { return separator; });
/* harmony import */ var _global_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./global.js */ "./src/global.js");
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }


var commonOperator =
/*#__PURE__*/
function () {
  function commonOperator(options) {
    _classCallCheck(this, commonOperator);

    options = options || {};
    options = _objectSpread({
      zIndex: 0
    }, options); // overriding default options by the passed options (options argument)

    Object.assign(this, options);
  }

  _createClass(commonOperator, [{
    key: "toString",
    value: function toString() {
      return this.regexStr;
    }
  }, {
    key: "id",
    get: function get() {
      return this._id;
    },
    set: function set(val) {
      if (!val || val === '') throw new Error('operator id can not be void or empty');
      this._id = val; // preparing regex for parsing process

      if (val instanceof RegExp) {
        this.regexStr = val.toString().slice(1, -1); // replacing special chars         
      } else {
        this.regexStr = Object(_global_js__WEBPACK_IMPORTED_MODULE_0__["regSpecialChars"])(val.toString()); // replacing special chars         
      }

      this.regex = new RegExp(this.regexStr); // spaced property

      this.spaced = {
        right: _global_js__WEBPACK_IMPORTED_MODULE_0__["checker"].spaced(val[val.toString().length - 1]),
        left: _global_js__WEBPACK_IMPORTED_MODULE_0__["checker"].spaced(val[0])
      };
    }
  }, {
    key: "spaced",
    get: function get() {
      return this._spaced;
    },
    set: function set(val) {
      this._spaced = _typeof(val) === 'object' ? Object.assign({}, val) : {
        right: val,
        left: val
      };
    }
  }]);

  return commonOperator;
}();
var operator =
/*#__PURE__*/
function (_commonOperator) {
  _inherits(operator, _commonOperator);

  function operator(options) {
    _classCallCheck(this, operator);

    return _possibleConstructorReturn(this, _getPrototypeOf(operator).call(this, options));
  }

  return operator;
}(commonOperator);
var suffixOperator =
/*#__PURE__*/
function (_commonOperator2) {
  _inherits(suffixOperator, _commonOperator2);

  function suffixOperator(options) {
    _classCallCheck(this, suffixOperator);

    return _possibleConstructorReturn(this, _getPrototypeOf(suffixOperator).call(this, options));
  }

  return suffixOperator;
}(commonOperator);
var prefixOperator =
/*#__PURE__*/
function (_commonOperator3) {
  _inherits(prefixOperator, _commonOperator3);

  function prefixOperator(options) {
    _classCallCheck(this, prefixOperator);

    return _possibleConstructorReturn(this, _getPrototypeOf(prefixOperator).call(this, options));
  }

  return prefixOperator;
}(commonOperator);
var separator =
/*#__PURE__*/
function (_commonOperator4) {
  _inherits(separator, _commonOperator4);

  function separator(options) {
    _classCallCheck(this, separator);

    return _possibleConstructorReturn(this, _getPrototypeOf(separator).call(this, options));
  }

  return separator;
}(commonOperator);

/***/ })

/******/ });
});
//# sourceMappingURL=MagicalParser.js.map