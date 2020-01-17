/**
 * here is the flow chart of the algorithms::: {<https://www.lucidchart.com/invitations/accept/1c02df38-de1b-48da-8942-652652d373ea>}
 * 
 * options include:
 * functions:: if is is applied the expr " 1 + rg(2)" will be considered as " 1 + rg*(2)", thus rg is constants, here we sill consider the functions you insert in addtion to the common functions such as ['sin', 'cos', ...]
 *
 */

import sNode from './sNode';
import block from './blocks';
import environments from './environments';
import { NormalModuleReplacementPlugin } from 'webpack';

export default class Parser{

   constructor(env = 'math', options = {}){
      this.setEnvironment(env, options);
      this.__randomNameNum = 0;
   }

   //#region getter, setter
   get environment() {
      return this._environment;
   }
   set environment(env) {
      console.Error('You can not set environment property directly, use setEnvironment instead.');
   }
   setEnvironment(env, options) {
      this._environment = env;
      this.options = { ...environments.get(env), ...options }; /// options properties will override the default options of the environment
   }

   get options() {
      return this._options;
   }
   set options(options) {

      this._options = Object.assign({}, options);
      //#region 

      // sort the array to be progressively according to zIndex property.

      this._options.operators = options.operators.sort(function (a, b) {
         return -(a.zIndex - b.zIndex); // the negative sign is for reverse the array;
      });

      let allRegex = ' ';
      for (let op of options) {
         allRegex += op.toString() + ' ';
      }
      allRegex = new RegExp(allRegex);
      options.operators.allRegex = allRegex;

      let noRepetition = true;
      for (let op of options) {
         noRepetition = (allRegex.indexOf(' ' + op.toString() + ' ') === -1) && noRepetition;
         allRegex += op.toString() + ' ';
      }
      options.operators.noRepetition = noRepetition;
      //#endregion

      options.
      this._options = options;

   }
   //#endregion

   /**
    * 
    * @param {string} str the string to be parsed 
    * @param {object} options if you want to override the aleardy existing options
    * @param {array} operations 
    */
   parse(str, options = {}, operations = null) { 

      options = {} || options; /// for ensuring that options has a value for the next step.
      options = { ...this.options, ...options }; // you can use Object.assign(this.options, options);

      options = this.__processOptions(options);

      //#region pre codes

      var operators = options.operators;
      operators = operators.reverse().flat(); // to use it in for loop, with a tricky algorithm will satisfy the process.
      var prefixOperators = options.prefixOperators;
      var suffixOperators = options.suffixOperators;
      // checking errors
      var sendError = function (msg, pos) {
         // (new Array(pos)).fill('_')     is the same as     '_'.repeat(pos)
         throw new Error(msg + '\n' + str + '\n' + (new Array(pos)).fill('_').join('') + '^');
      };
      let forbiddenSymbols = options.forbiddenSymbols;
      if (!operations) {
         if (this.__contains(str, ...forbiddenSymbols)) sendError('forbidden symbol.');
      }

      operations = operations || []; /// if you put this line before the direct last if statement, if statement will be ignored, or the inside code won't be processed

      var snode;

      // if empty of characters

      str.replace(/^\s*$/, () => {
         snode = new sNode('');
      }); if (snode) return snode;

      let a = processBrackets(str);
      str = a.str; operations = a.operations;
      //#endregion

      //#region final codes

      // now We have our brackets stored in operations by their names and replaced their blocks with their names.

      for (let s of options.separators) {
         if (this.__contains(str, s.name)) {
            let args = [];
            let strs = str.split(s.name);
            for (let str_ of strs) {
               args.push(stringTOsnode(str_, options, operations));
            }
            return new sNode('separator', args, { name: s.name, length: args.length });
         }
      }

      // functions are declared here to avoid creating such a massive memory allocate for each loop inside for
      let _op = ''; // helper variable
      let _replace = (match, arg1, op, arg2) => {
         let name = this.__getRandomName();
         let sn = new sNode('operator', [stringTOsnode(arg1, options, operations), stringTOsnode(arg2, options, operations)], { name: _op.toString() });
         operations.push({ name: name, sNode: sn });
         return name;
      };
      

      for (let op of operators) {
         if (this.__contains(str, op.name)) {
            let regex = this.__getRegexExp(op, true);
            _op = op;
            str = str.replace(regex, _replace);
         }
      }

      if (!this.__contains(str, operators)) {

         // if function like sin#asd123, notice that #asd123 was the bracket (...)
         str.replace(/^\s*([_a-zA-z]+\d*)\s*(\$\$[_a-zA-z]+\d*\$\$)\s*$/, (match, funcName, funcArgs) => {
            if (match) {
               let args = this.__getOperation(funcArgs, operations);
               if (args.sNode.calls('()')) {
                  snode = new sNode('func', args.sNode.args, { name: funcName });
               }
            }
         });
         if (snode) return snode;

         // if name of operation
         str.replace(/^\s*(\$\$[_a-zA-z]+\d*\$\$)\s*$/, (match, opName) => {
            if (match) {
               snode = this.__getOperation(opName, operations).sNode;
            }
         });
         if (snode) return snode;

         // something.func
         str.replace(/^\s*(.*)\.(([_a-zA-z]+\d*)\s*(\$\$[_a-zA-z]+\d*\$\$))\s*$/, (match, first, a, funcName, funcArgs) => {
            if (match) {
               let args = this.__getOperation(funcArgs, operations);
               let func;
               if (args.sNode.calls('()')) {
                  func = new sNode('func', args.sNode.args, { name: funcName });
               }
               if (func) {
                  snode = new sNode('.', [stringTOsnode(first, options, operations), func], { dotType: 'func', extension: first + `.${funcName}` });
               }
            }
         })
         if (snode) return snode;

         //something.id
         str.replace(/^\s*(.*)\.(\$\$[_a-zA-z]+\d*\$\$)\s*$/, (match, first, id) => {
            if (match) {
               snode = new sNode('.', [stringTOsnode(first, options, operations), new sNode('id', [], { name: id })], { dotType: 'id', extension: match });
            }
         })
         if (snode) return snode;

         // if literal, number or variable or bool {true or false}, ...
         str.replace(/^\s*(([_a-zA-z]+)\d*)\s*$/, (match, value, notNum) => {
            if (match) {
               snode = new sNode(notNum ? 'id' : 'num', [], { value: value });
            }
         })
         if (snode) return snode;
         str.replace(/^(-?\d+\.?\d*)|(-?\d*\.?\d+)$/, (match, value, notNum) => {
            if (match) {
               snode = new sNode(notNum ? 'id' : 'num', [], { value: value });
            }
         })
         if (snode) return snode;

      }

      throw new Error('invalid script.\n' + str); // this shouldn't happen in ordinary cases, but this line of code is here for avoiding any flaw out of measurements

      //#endregion

   }

   //#region helper funcs
   __processOptions (options) {

   }
   __processBrackets(str, options, operations) {
      
      //#region brackets

      var blocks = this.options.blocks;

      for (let i = 0; i < str.length; i++) {

         for (let b of blocks.values) {
            let c = str[i];
            if (c === b.openingChar) {
               b.num++;
               if (!blocks.openedBlock.index) { /// if not open, then open
                  b.opened = true;
                  blocks.openedBracket.ref = b;
                  blocks.openedBracket.index = i;
               }
            } else if (c === b.closingChar) {
               b.num--;
            }
            /// when a bracket is close, but not opened. e.g. ::: " 1+2-5) "
            if (b.num < 0) {
               sendError('error on brackets.', i);
            }

            /// if true, the bracket's block is defined.
            if (b.num === 0 && b.opened) { /// may other brackets' num be zero, as it does not exist or as it is closed but it closed inside the block that we are setting,,, e.g.::: " 1+2({1,2,3}^-1) "
               //// checking error,,, this ill be done on handling for the bracket's content, so don't do for this. 
               // if (brkts['['].num > 0) { sendError('bracket ] is missed.', i - 1); }
               // if (brkts['('].num > 0) { sendError('bracket ) is missed.', i - 1); }
               let name = this.__getRandomName();
               let str_ = str.slice(brkts.index + 1, i); /// cut the text from the next sibiling of the opened bracket until the current closingChar index
               str = str.replace(new RegExp(b.openingChar + str_ + b.closingChar, 'g'), name); // if the replacement is global or not, there will no be any problem.
               i = str.search(name) + name.length; /// setting the index, as the string may shrink or be taller, it depends on the length of the name
               let snChild = stringTOsnode(str_, options); /// getting the sNode from the string inside this bracket block with the same procedures, there is no need to pass operations as argument
               let sn = new sNode(b.openingChar + b.closingChar, name, [snChild]);
               operations.push({ name: name, sNode: sn });
               b.opened = false; blocks.opendBlock = { ref: null, index: null }; // reset
            }
         }

      }
      /// after finishing looping searching for brackets blocks, oooops, what is this?!!!, oh, the bracket is not closed. send an error
      if (blocks.opendBracket) {
         sendError('block is not closed.', str.length);
      }

      //#endregion

      return { str, operations };

   }
   __getRandomName () {
      let num = 0;
      return (Date.now() + this.__randomNameNum++).toString(36)
         .replace(new RegExp(num++, 'g'), 'a') /// Ia ma using Regex for global replacement.
         .replace(new RegExp(num++, 'g'), 'b')
         .replace(new RegExp(num++, 'g'), 'c')
         .replace(new RegExp(num++, 'g'), 'd')
         .replace(new RegExp(num++, 'g'), 'e')
         .replace(new RegExp(num++, 'g'), 'f')
         .replace(new RegExp(num++, 'g'), 'g')
         .replace(new RegExp(num++, 'g'), 'h')
         .replace(new RegExp(num++, 'g'), 'i')
         .replace(new RegExp(num++, 'g'), 'j');
   }
   
   //#endregion

}
