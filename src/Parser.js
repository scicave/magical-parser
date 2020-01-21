/**
 * here is the flow chart of the algorithms::: {<https://www.lucidchart.com/invitations/accept/1c02df38-de1b-48da-8942-652652d373ea>}
 * 
 * options include:
 * functions:: if is is applied the expr " 1 + rg(2)" will be considered as " 1 + rg*(2)", thus rg is constants, here we sill consider the functions you insert in addtion to the common functions such as ['sin', 'cos', ...]
 *
 */

// import sNode from './sNode';
import environments from './environments.js';
import sNode from './sNode.js';
import { repRegSpecialChars, checker, sendError } from './global.js';
export default class Parser{

   constructor(env = 'math', options = {}){
      this.setEnvironment(env, options);
      this.reservedChars = [
         ''
      ];
      this.__randomNameNum = 0;
      this.__realPos = 0;
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
      this._options = environments.get(env);
      if (options) 
         this.options = options;
   }

   get options() {
      return this._options;
   }
   set options(options) {

      Object.assign(this._options, options);
      options = this._options; /// make this._options a reference for options
      
      //#region 

      //#region all

      let all = {
         operators: ' ',
         prefixOperators: ' ',
         suffixOperators: ' ',
      };

      let processArr = (arr) => {
         if (arr && arr.length > 0) {
            let _all = ' ';
            for (let i = 0; i < arr.length; i++) {
               let op = arr[i];
               _all.replace(new RegExp(` @_(${op.name})_@ #_(\\d*)_# `), (match, opName, opIndex) => {
                  Object.assign(arr[i], arr[parseInt(opIndex)]);
                  arr.splice(parseInt(opIndex), 1); // removing the previous operator wiht the same name
               });
               _all += '@_' + op.toString() + '_@ ' + '#_' + i + '_# ';
            }
            return _all;
         }
      };

      all.operators = processArr(options.operators);
      all.prefixOperators = processArr(options.prefixOperators);
      all.suffixOperators = processArr(options.suffixOperators);

      options.all = all;

      //#endregion
      
      // sort the array to be inversely according to zIndex property.
      if (options.operators)
         options.operators = options.operators.sort(function (a, b) {
            return -(a.zIndex - b.zIndex); // the negative sign is for reverse the array;
         });

      options.blocks = {
         values: options.blocks,
         openedBlock: null
      };
 
      //#endregion
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
      this.__clonedStr = str;
      //#region pre codes

      var operators = options.operators;
      operators = operators.reverse().flat(); // to use it in for loop, with a tricky algorithm will satisfy the process.
      var prefixOperators = options.prefixOperators;
      var suffixOperators = options.suffixOperators;
      var forbiddenSymbols = options.forbiddenSymbols;

      // checking errors
     
      if (!operations) {
         if (this.__contains(str, ...forbiddenSymbols)) this.sendError('forbidden symbol.');
      }
      operations = operations || []; /// if you put this line before the direct last if statement, if statement will be ignored, or the inside code won't be processed

      var snode;

      // if empty of characters
      str.replace(/^\s*$/, () => {
         snode = new sNode('');
      }); if (snode) return snode;

      str = this.__processBlocks(str, options, operators);
      str = this.__prepareOpertors(str, options, operators);
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
   __processBlocks(str, options, operations) {
      
      //#region brackets
      var that = this;
      var blocks = options.blocks;

      let __processBlock__ = function(index, str_) {
         //// checking error,,, this ill be done on handling bracket's content, so don't do for this. 
         let name = that.__getRandomName();
         
         // let str_ = str.slice(index.opening, index.closing); /// cut the text from the next sibiling of the opening char until the current closingChar index
         let b = blocks.openedBlock.ref;
         let searchingTxt = b.openingChar + str_ + b.closingChar;
         str = str.replace(new RegExp(repRegSpecialChars(searchingTxt), 'g'), name); // if the replacement is global or not, there will no be any problem.
         
         let snChild;
         if (b.handleContent) {                  
            snChild = that.parse(str_, options); /// here you are parsing new string with no operations yet. /// getting the sNode from the string inside this bracket block with the same procedures, there is no need to pass operations as argument
         } else {
            snChild = new sNode('undefined', [], {content: str_}); /// getting the sNode from the string inside this bracket block with the same procedures, there is no need to pass operations as argument
         }
         let sn = new sNode('block', [snChild], { openingChar: b.openingChar, closingChar: b.closingChar, name: b.name});
         operations.push({ name: name, sNode: sn });
         
         b.opened = false; blocks.openedBlock = null; // reset

         return index.closing + (name.length - searchingTxt.length); /// new_i /// setting the index, as the string may shrink or be taller, it depends on the length of the name
      };

      let __processBlocks__ = function(i_intial = 0) {
         let __incre = 0; // it is used when a openingChar is found to move the index to exceed the hole opening char, it is needed for opening char more than letter 
         for (let i = i_intial; i < str.length; i++) {
            i += __incre;
            __incre = 0;
            if (that.__realPos || that.__realPos === 0) that.__realPos += 1 + __incre; // dealing with the intial str be fore the parsing process
            for (let b of blocks.values) {
               /// if a block is opened, closing has the priority, unless, opening has the priority::: you can notice this in ***Mohammed***, if you check the opening char first the num will increase to 2, thus the block will not be closed,,, and an error will occur.
               if (str.slice(i, i + 1) == '"') {
                  let a = 1;
               }
               if (blocks.openedBlock) {
                  if (str.slice(i, i + b.closingChar.length) === b.closingChar) {
                     if (b !== options.blocks.openedBlock.ref) {

                        let iof = options.blocks.openedBlock.ref.openingChar.indexOf(b.closingChar);
                        if (iof > -1) {
                           // this.options.blocks.openedBlock.ref.openingChar  contains  b.closingChar::: for example *** contains **, you can use these blocks formatting typing, **Mohammed** will be bold.
                           options.blocks.openedBlock.mayCloseAt = { ref: b, index: i, iof };
                        } else {
                           b.num--;
                        }

                     } else {
                        b.num--;
                     }
                  } else if (str.slice(i, i + b.openingChar.length) === b.openingChar) {
                     b.num++;
                     __incre = b.openingChar.length - 1; // -1 here as for loop will add 1 to i, I want to set the index just after the opening char 
                  }
               } else {
                  if (str.slice(i, i + b.openingChar.length) === b.openingChar) {
                     b.num++;
                     __incre = b.openingChar.length - 1; // -1 here as for loop will add 1 to i, I want to set the index just after the opening char 
                     // if (!blocks.openedBlock) { /// if not open, then open
                     b.opened = true;
                     blocks.openedBlock = { ref: b, index: i };
                     // }
                  } else if (str.slice(i, i + b.closingChar.length) === b.closingChar) {
                     b.num--;
                  }
               }
            
               /// when a bracket is close, but not opened. e.g. ::: " 1+2-5) "
               if (b.num < 0) {
                  if (b.mustOpen) {
                     that.__sendError('closing a block not opened.');
                  } else {
                     b.num = 0;
                  }
               }

               /// if true, the bracket's block is defined.
               if (b.num === 0 && b.opened) { /// may other brackets' num be zero, as it does not exist or as it is closed but it closed inside the block that we are setting,,, e.g.::: " 1+2({1,2,3}^-1) "
                  let index = {
                     opening: blocks.openedBlock.index + blocks.openedBlock.ref.openingChar.length,
                     closing: i
                  };
                  let _str = str.slice(index.opening, index.closing);
                  if (checker.check(_str, b.contentTest)) {
                     i = __processBlock__(index, _str); /// __processBlock__ returns the new_i
                  } else {
                     b.num++; // the considered closingChar found is not compatible, so continue shearching for another closing char
                  }
               }
            }
         }
      };
      __processBlocks__(0);
      /// after finishing looping searching for brackets blocks, oooops, what is this?!!!, oh, the bracket is not closed. send an error
      if (blocks.openedBlock) {
         if(blocks.openedBlock.mayCloseAt){
            let index = {

               opening:
                  blocks.openedBlock.index +
                  // blocks.openedBlock.mayCloseAt.ref.openingChar.length +    this will be added later
                  blocks.openedBlock.mayCloseAt.iof,
               
               closing: blocks.openedBlock.mayCloseAt.index
               
            };
            /// the openingChar can be for another block e.g.::: (( and (,when we close with )) the blocks is ((content)), otherwise if we close with ) our block is (content) and the second "(" is the first char in the content 
            blocks.openedBlock.ref.opened = false; 
            blocks.openedBlock = { ref: blocks.openedBlock.mayCloseAt.ref, index: index.opening};
            index.opening += blocks.openedBlock.ref.openingChar.length;

            let _str = str.slice(index.opening, index.closing);
            let new_i;
            if (checker.check(_str, b.contentTest)) {
               new_i = __processBlock__(index, _str); /// __processBlock__ returns the new_i
               __processBlocks__(new_i);
            } else {
               if (blocks.openedBlock.ref.mustClose) { 
                  this.__sendError('block is not closed.', this.__realPos);
               }
               b.num++; // the considered closingChar found is not compatible, so continue shearching for another closing char
            }

         } else {
            if (blocks.openedBlock.ref.mustClose) {
               this.__sendError('block is not closed.', this.__realPos);
            } else {
               blocks.openedBlock.ref.opened = false;
               blocks.openedBlock = null;
            }
         }
      }

      //#endregion

      return str;

   }
   __prepareOpertors(str, options, operations) {
   }
   __getRandomName () {
      let num = 0;
      /// randomNameNum is here to avoid getting the same random name if the code is implemented so fast
      return "##" +
            (Date.now() + this.__randomNameNum++).toString(36)
               .replace(new RegExp(num++, 'g'), 'a') /// Ia ma using Regex for global replacement.
               .replace(new RegExp(num++, 'g'), 'b')
               .replace(new RegExp(num++, 'g'), 'c')
               .replace(new RegExp(num++, 'g'), 'd')
               .replace(new RegExp(num++, 'g'), 'e')
               .replace(new RegExp(num++, 'g'), 'f')
               .replace(new RegExp(num++, 'g'), 'g')
               .replace(new RegExp(num++, 'g'), 'h')
               .replace(new RegExp(num++, 'g'), 'i')
               .replace(new RegExp(num++, 'g'), 'j') + 
            '##';
   } 
   __sendError(msg, pos, str) {
      str = str || this.__clonedStr;
      pos = pos || this.__realPos;
      sendError(msg + ' realpos: ' + this.__realPos, str, pos);
   }
   //#endregion

}