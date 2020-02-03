import { operator, separator, prefixOperator, suffixOperator } from './../operators.js';
import block from './../blocks.js';
import sNode from './../sNode.js';
import { prepareOptions, sendError, contains, getRandomName } from '../global.js';

export default class CustomMathParser {

   constructor(options) {
      this._options = {
         autoMultSign: true,
         vars: [], /// to be used in this case ::: ' 1 + var(2-5)' which is the same as ' 1+ var*(2-5)'
         nameTest: '[a-zA-Z_]+\\d*',
         numTest: '\\d+\\.?\\d*|\\d*\\.?\\d+',

         prefixOperators: [
            new prefixOperator({ id: '+' }),
            new prefixOperator({ id: '-' }),
         ],

         suffixOperators: [
            new suffixOperator({ id: '!' }),
         ],

         operators: [

            new operator({ id: '^', zIndex: 10 }), // the first operator to process
            new operator({ id: '*', zIndex: 9 }),
            new operator({ id: '/', zIndex: 9 }),
            new operator({ id: 'mod', zIndex: 8 }),
            new operator({ id: '+', zIndex: 7 }),
            new operator({ id: '-', zIndex: 7 }),
            new operator({ id: '>>', zIndex: 6 }),
            new operator({ id: '<<', zIndex: 6 }),
            new operator({ id: '>=', zIndex: 5 }),
            new operator({ id: '<=', zIndex: 5 }),
            new operator({ id: '!=', zIndex: 5 }),
            new operator({ id: '<', zIndex: 5 }),
            new operator({ id: '>', zIndex: 5 }),
            new operator({ id: '==', zIndex: 5 }),
            new operator({ id: '&', zIndex: 4 }),
            new operator({ id: 'band', zIndex: 4 }),
            new operator({ id: '|', zIndex: 4 }),
            new operator({ id: 'bor', zIndex: 4 }),
            new operator({ id: 'bxor', zIndex: 4 }),
            new operator({ id: 'constrain', zIndex: 4 }),
            new operator({ id: 'in', zIndex: 3 }),
            new operator({ id: 'out', zIndex: 3 }),
            new operator({ id: 'xnor', zIndex: 1 }),
            new operator({ id: 'xor', zIndex: 1 }),
            new operator({ id: 'nand', zIndex: 1 }),
            new operator({ id: 'nor', zIndex: 1 }),
            new operator({ id: 'or', zIndex: 1 }),
            new operator({ id: 'and', zIndex: 1 }),
            new operator({ id: '||', zIndex: 1 }),
            new operator({ id: '&&', zIndex: 1 }),
            new operator({ id: '=', zIndex: 0 }) // the last operator to be applied

         ],

         separators: [
            new separator({ id: ';' }),
            new separator({ id: ',' }),
         ],

         blocks: [
            new block({ openingChar: '{', closingChar: '}', num: 0, opened: false }), /// multiNodable used to know whether or not the bracket block can have multiNode seperated be something like comma ","
            new block({ openingChar: '[', closingChar: ']', num: 0, opened: false }),
            new block({ openingChar: '(', closingChar: ')', num: 0, opened: false }),
            new block({ openingChar: '"', closingChar: '"', num: 0, opened: false }),
            new block({ openingChar: "'", closingChar: "'", num: 0, opened: false })
         ],

         forbiddenChars: [],

      };
      this.options = options;
   }

   get options() {
      return this._options;
   }

   set options(options) {
      options = Object.assign(this._options, options);
      prepareOptions(options);
   }

   parse(str, operations = null) {
      var options = this.options;
      operations = operations instanceof Map ? operations : new Map();
      //#region pre codes
      for (let i = 0; i < options.forbiddenChars.length; i++) {
         if (contains(str, options.forbiddenChars[i])) sendError('forbiddenSymbol', 'forbidden symbol.');
      }
      // if empty
      str = str.replace(/\s+/g, () => {
         return ' ';
      });

      //#endregion
      return this.__parse(str, options, operations);
   }
   __parse(str, options, operations, subOptions = {}) {

      let snode;
      subOptions = { parseBlocks: true, parseOperators: true, ...subOptions }; /// or use Object.assign

      //#region parsing

      // if empty of characters
      str = str.replace(/^\s*$/, () => {
         snode = new sNode('');
      }); if (snode) return snode;

      if (subOptions.parseBLocks) {
         str = this.__parseBlocks(str, options, operations);
      }
      if (subOptions.parseOperators) {
         str = this.__parseOperators(str, options, operations);
      }

      //#endregion

      //#region the last thing in str,,, number or name or operationName 

      // if name of operation
      str = str.replace(/^\s*(.*)\s*$/, '$1');

      /// if number
      if (!isNaN(str)) {
         snode = new sNode('number', [], { value: parseFloat(str) });
      }

      // if operation name
      str = str.replace(options.operationTestReg, (opName) => {
         snode = operations.get(opName);
      }); if (snode) return snode;

      // if literal (variable) or bool {true or false}, ...
      str = str.replace(options.nameTestReg, (name) => {
         snode = new sNode('variable', [], { name });
      }); if (snode) return snode;

      //#endregion

      // this shouldn't happen in ordinary cases, but this line of code is here for avoiding any flaw out of measurements
      throw new Error('invalid script.\n' + str);

   }
   /**
    * this modified version of __parseBlocks is much better and faster,,, we have gotten rid of if statements and varaible and alot of code that are redundant
    */
   __parseBlocks(str, options, operations) {

      //#region brackets
      var blocks = options.blocks;

      let __parseBlock__ = (index, str_) => {
         //// checking error,,, this ill be done on handling bracket's content, so don't do for this. 
         let name = getRandomName();

         // let str_ = str.slice(index.opening, index.closing); /// cut the text from the next sibiling of the opening char until the current closingChar index
         let b = blocks.openedBlock.ref;
         let searchingTxt = b.openingChar + str_ + b.closingChar;
         str = str.replace(searchingTxt, name); // if the replacement is global or not, there will no be any problem unless the developer using this library set a block with the same features as the bolck of our operation name.

         let snChild = this.__parse(str_, options, operations); /// here you are parsing new string with no operations yet. /// getting the sNode from the string inside this bracket block with the same procedures, there is no need to pass operations as argument
         let sn = new sNode('block', [snChild], { openingChar: b.openingChar, closingChar: b.closingChar, name: b.name });
         operations.set(name, sn);

         b.opened = false; blocks.openedBlock = null; // reset

         return index.closing + (name.length - searchingTxt.length); /// new_i /// setting the index, as the string may shrink or be taller, it depends on the length of the name
      };

      for (let i = 0; i < str.length; i++) {
         if (this.__realPos || this.__realPos === 0) this.__realPos += 1; // dealing with the intial str be fore the parsing process
         for (let b of blocks.values) {
            if (str[i] === b.openingChar) {
               b.num++;
               // if (!blocks.openedBlock) { /// if not open, then open
               b.opened = true;
               blocks.openedBlock = { ref: b, index: i };
               // }
            } else if (str[i] === b.closingChar) {
               b.num--;
               /// when a bracket is close, but not opened. e.g. ::: " 1+2-5) "
               if (b.num < 0) {
                  sendError('blocks', 'closing a block not opened.');
               }
            }

            /// if true, the bracket's block is defined.
            if (b.num === 0 && b.opened) { /// may other brackets' num be zero, as it does not exist or as it is closed but it closed inside the block that we are setting,,, e.g.::: " 1+2({1,2,3}^-1) "
               let index = {
                  opening: blocks.openedBlock.index + 1,
                  closing: i
               };
               let _str = str.slice(index.opening, index.closing);
               i = __parseBlock__(index, _str); /// __parseBlock__ returns the new_i
            }
         }
      }

      if (blocks.openedBlock) {
         sendError('blocks', 'block is not closed.', this.__realPos);
      }
      //#endregion
      return str;
   }
   __parseOperators(str, options, operations) {
      /// RegExp: (var or num or block)(suffix)(op)(prefix)(var or num or block)
      /// ((?:[a-zA-Z_]+\d*)|(?:-?\d+\.?\d*)|(?:-?\d*\.?\d+))\s*((?:\+\+))?\s*((?:\+))\s*((?:\+\+|\+|\-))?\s*((?:[a-zA-Z_]+\d*)|(?:\d+\.?\d*)|(?:\d*\.?\d+))

      //#region separators
      for (let s of options.separators) {
         if (contains(str, s.id)) {
            let name = this.__get;
            let args = [];
            let strs = str.split(s);
            for (let str_ of strs) {
               args.push(this.parse(str_, operations));
            }
            operations.set(name, new sNode('separator', args, { name: s.id, length: args.length }));
         }
      }
      //#endregion

      //#region preparing for parsing process
      let _str = '',
         prevArg = {
            name: null,
            sn: null
         };
      //#endregion

      //#region searching for operators and parsing process for suffix and prefix
      /// intial replacement
      str = str.replace(options.opIntialTestReg, (match, prefix, arg) => {
         if (prefix) {
            let a = arg,
               b = 'prefixOperator',
               c = prefix;
            if (!isNaN(a)) {
               /// number
               let name = getRandomName();
               let sn = new sNode(
                  b,
                  new sNode('number', [], { value: parseInt(a) }),
                  { name: c }
               );
               operations.set(name, sn);
               prevArg = { name, sn };
            } else {
               let found = false;
               a.replace(options.operationTestReg, () => {
                  found = true;
               });
               if (found) {
                  /// operations
                  let sn = new sNode(
                     b,
                     operations.get(a), /// you can get it from operations but let's store it into prevArg.sn to speed our code a litte bit.
                     { name: c }
                  );
                  operations.set(a, sn);
                  prevArg.sn = { name: a, sn };
               } else {
                  /// varName
                  let name = getRandomName();
                  let sn = new sNode(
                     b,
                     new sNode('variable', [], { name: a }),
                     { name: c }
                  );
                  operations.set(name, sn);
                  prevArg = { name, sn };
               }
            }

         } else {
            let found = false;
            arg.replace(options.operationTestReg, () => {
               found = true;
            });
            if (found) {
               prevArg = { name: arg, sn: operations.get(arg) };
            } else {
               prevArg = { name: arg };
            }
         }

         return '';
      });
      let a;
      while (a !== str) {
         a = str;
         /// if replacement is not implemented, str will sstill the same and while loop will close
         str = str.replace(options.opTestReg, (match, suffix, op, prefix, arg) => {

            if (!op) {
               sendError('operators', 'invalid operators', str, null);
            }

            if (suffix) {
               for (let i = 0; i < options.suffixOperators.length; i++) {
                  /// creating an operations with type of  prefix operator,,, its arg is the prev arg
                  let a = prevArg.name,
                     b = 'suffixOperator',
                     c = suffix;
                  if (!isNaN(a)) {
                     /// number
                     let name = getRandomName();
                     let sn = new sNode(
                        b,
                        new sNode('number', [], { value: parseInt(a) }),
                        { name: c }
                     );
                     operations.set(name, sn);
                     prevArg = { name, sn };
                  } else {
                     let found = false;
                     a.replace(options.operationTestReg, () => {
                        found = true;
                     });
                     if (found) {
                        /// operations
                        let sn = new sNode(
                           b,
                           prevArg.sn, /// you can get it from operations but let's store it into prevArg.sn to speed our code a litte bit.
                           { name: c }
                        );
                        operations.set(a, sn);
                        prevArg.sn = sn;
                     } else {
                        /// varName
                        let name = getRandomName();
                        let sn = new sNode(
                           b,
                           new sNode('variable', [], { name: a }),
                           { name: c }
                        );
                        operations.set(name, sn);
                        prevArg = { name, sn };
                     }
                  }
               }
            }

            _str += prevArg.name + ' ' + op + ' ';

            if (prefix) {
               let a = arg,
                  b = 'prefixOperator',
                  c = prefix;
               if (!isNaN(a)) {
                  /// number
                  let name = getRandomName();
                  let sn = new sNode(
                     b,
                     new sNode('number', [], { value: parseInt(a) }),
                     { name: c }
                  );
                  operations.set(name, sn);
                  prevArg = { name, sn };
               } else {
                  let found = false;
                  a.replace(options.operationTestReg, () => {
                     found = true;
                  });
                  if (found) {
                     /// operations
                     let sn = new sNode(
                        b,
                        operations.get(a), /// you can get it from operations but let's store it into prevArg.sn to speed our code a litte bit.
                        { name: c }
                     );
                     operations.set(a, sn);
                     prevArg.sn = { name: a, sn };
                  } else {
                     /// varName
                     let name = getRandomName();
                     let sn = new sNode(
                        b,
                        new sNode('variable', [], { name: a }),
                        { name: c }
                     );
                     operations.set(name, sn);
                     prevArg = { name, sn };
                  }
               }
            } else {
               let found = false;
               arg.replace(options.operationTestReg, () => {
                  found = true;
               });
               if (found) {
                  prevArg = { name: arg, sn: operations.get(arg) };
               } else {
                  prevArg = { name: arg };
               }
            }

            return '';

         });
      }
      // final search
      if (str !== '') {
         str = str.replace(options.opFinalTestReg, (match, suffix) => {

            let a = prevArg.name,
               b = 'suffixOperator',
               c = suffix;
            if (!isNaN(a)) {
               /// number
               let name = getRandomName();
               let sn = new sNode(
                  b,
                  new sNode('number', [], { value: parseInt(a) }),
                  { name: c }
               );
               operations.set(name, sn);
               prevArg = { name, sn };
            } else {
               let found = false;
               a.replace(options.operationTestReg, () => {
                  found = true;
               });
               if (found) {
                  /// operations
                  let sn = new sNode(
                     b,
                     prevArg.sn, /// you can get it from operations but let's store it into prevArg.sn to speed our code a litte bit.
                     { name: c }
                  );
                  operations.set(a, sn);
                  prevArg.sn = { name: a, sn };
               } else {
                  /// varName
                  let name = getRandomName();
                  let sn = new sNode(
                     b,
                     new sNode('variable', [], { name: a }),
                     { name: c }
                  );
                  operations.set(name, sn);
                  prevArg = { name, sn };
               }
            }

            _str += prevArg.name;

            return '';

         });
         if (str !== '') sendError('operators', 'invalid suffix operator at the end', '', null);
      } else {
         _str += prevArg.name;
      }
      //#endregion

      //#region parsing operators

      for (let i = 0; i < options.operators.length; i++) {
         let end = false;
         while (!end) {
            end = true;
            _str = _str.replace(new RegExp(`(${options.argTest})\\s*(${options.operators[i].regexStr})\\s*(${options.argTest})`), (match, g1, op, g2) => {
               //#region argument for the operator
               let arg1, arg2;
               if (!isNaN(g1)) {
                  /// number
                  arg1 = new sNode('number', [], { value: parseInt(g1) });
               } else {
                  let found = false;
                  g1.replace(options.operationTestReg, () => {
                     // operation
                     arg1 = operations.get(g1);
                     found = true;
                  });
                  if (!found) {
                     /// varName
                     arg1 = new sNode('variable', [], { name: g1 });
                  }
               }
               if (!isNaN(g2)) {
                  /// number
                  arg2 = new sNode('number', [], { value: parseInt(g2) });
               } else {
                  let found = false;
                  g2.replace(options.operationTestReg, () => {
                     // operation
                     arg2 = operations.get(g2);
                     found = true;
                  });
                  if (!found) {
                     /// varName
                     arg2 = new sNode('variable', [], { name: g2 });
                  }
               }
               //#endregion
               let name = getRandomName();
               operations.set(name, new sNode('operator', [arg1, arg2], { name: op }));
               end = false;
               return name;
            });
            /// if the operator is not found,,, end the while loop.
         }
      }

      //#endregion

      return _str;
   }

}