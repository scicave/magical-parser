import { Operator, Separator, PrefixOperator, SuffixOperator } from '../tokens/Operators.js';
import block from '../tokens/Block.js';
import Node from '../Node.js';
import { prepareOptions, sendError, contains, getRandomName } from '../global.js';

export default class ProgMathParser {

   constructor(options) {
      this._options = {
         autoMultSign: true,
         vars: [], /// to be used in this case ::: ' 1 + var(2-5)' which is the same as ' 1+ var*(2-5)'
         nameTest: '[a-zA-Z_]+\\d*',
         numTest: '\\d+\\.?\\d*|\\d*\\.?\\d+',

         prefixOperators: [
            new PrefixOperator({ id: '+' }),
            new PrefixOperator({ id: '-' }),
         ],

         suffixOperators: [
            new SuffixOperator({ id: '!' }),
            new SuffixOperator({ id: 'deg' }),
            new SuffixOperator({ id: 'rad' }),
         ],

         operators: [

            new Operator({ id: '^', zIndex: 10 }), // the first operator to process
            new Operator({ id: '*', zIndex: 9 }),
            new Operator({ id: '/', zIndex: 9 }),
            new Operator({ id: 'mod', zIndex: 9 }),
            new Operator({ id: '+', zIndex: 7 }),
            new Operator({ id: '-', zIndex: 7 }),
            new Operator({ id: '>>', zIndex: 6 }),
            new Operator({ id: '<<', zIndex: 6 }),
            new Operator({ id: '>=', zIndex: 5 }),
            new Operator({ id: '<=', zIndex: 5 }),
            new Operator({ id: '!=', zIndex: 5 }),
            new Operator({ id: '<', zIndex: 5 }),
            new Operator({ id: '>', zIndex: 5 }),
            new Operator({ id: '==', zIndex: 5 }),
            new Operator({ id: '&', zIndex: 4 }),
            new Operator({ id: 'band', zIndex: 4 }),
            new Operator({ id: '|', zIndex: 4 }),
            new Operator({ id: 'bor', zIndex: 4 }),
            new Operator({ id: 'bxor', zIndex: 4 }),
            new Operator({ id: 'constrain', zIndex: 4 }),
            new Operator({ id: 'in', zIndex: 3 }),
            new Operator({ id: 'out', zIndex: 3 }),
            new Operator({ id: 'xnor', zIndex: 1 }),
            new Operator({ id: 'xor', zIndex: 1 }),
            new Operator({ id: 'nand', zIndex: 1 }),
            new Operator({ id: 'nor', zIndex: 1 }),
            new Operator({ id: 'or', zIndex: 1 }),
            new Operator({ id: 'and', zIndex: 1 }),
            new Operator({ id: '||', zIndex: 1 }),
            new Operator({ id: '&&', zIndex: 1 }),
            new Operator({ id: '=', zIndex: 0 }) // the last operator to be applied

         ],

         separators: [
            new Separator({ id: ';' }),
            new Separator({ id: ',' }),
         ],

         blocks: [
            new block({ id: { openingChar: '{', closingChar: '}' } }), /// multiNodable used to know whether or not the bracket block can have multiNode seperated be something like comma ","
            new block({ id: { openingChar: '[', closingChar: ']' } }),
            new block({ id: { openingChar: '(', closingChar: ')' } }),
            new block({ id: { openingChar: '"', closingChar: '"' } }),
            new block({ id: { openingChar: "'", closingChar: "'" } })
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
         snode = new Node('');
      }); if (snode) return snode;

      if (subOptions.parseBlocks) {
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
         snode = new Node('number', [], { value: parseFloat(str) });
      }

      // if operation name
      str = str.replace(options.operationTestReg, (opName) => {
         snode = operations.get(opName);
      }); if (snode) return snode;

      // if literal (variable) or bool {true or false}, ...
      str = str.replace(options.nameTestReg, (name) => {
         snode = new Node('variable', [], { name });
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

      let b;
      let repBlock = (match, content) => {
         let name = getRandomName();
         let sn = new Node('block', [this.__parse(content, options, operations)], { id: b.id });
         operations.set(name, sn);
         return name;
      };

      for (let i = 0; i < blocks.values.length; i++) {
         b = blocks.values[i];
         str = str.replace(b.regex, repBlock);
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
               args.push(this.__parse(str_, options, operations));
            }
            operations.set(name, new Node('separator', args, { name: s.id, length: args.length }));
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

      //#region searching for operators and parsing suffix and prefix

      /// intial replacement
      str = str.replace(options.opIntialTestReg, (match, prefix, arg) => {
         if (prefix) {
            let a = arg,
               b = 'prefixOperator',
               c = prefix;
            if (!isNaN(a)) {
               /// number
               let name = getRandomName();
               let sn = new Node(
                  b,
                  new Node('number', [], { value: parseInt(a) }),
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
                  let sn = new Node(
                     b,
                     operations.get(a), /// you can get it from operations but let's store it into prevArg.sn to speed our code a litte bit.
                     { name: c }
                  );
                  operations.set(a, sn);
                  prevArg.sn = { name: a, sn };
               } else {
                  /// varName
                  let name = getRandomName();
                  let sn = new Node(
                     b,
                     new Node('variable', [], { name: a }),
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

      let end = false;
      // inner search for operators
      while (!end) {
         end = true;
         /// if replacement is not implemented, str will sstill the same and while loop will close
         str = str.replace(options.opTestReg, (match, suffix, op, prefix, arg) => {

            if (!op) {
               sendError('operators', 'invalid operators', str, null);
            }

            if (suffix) {
               /// creating an operations with type of  prefix operator,,, its arg is the prev arg
               let a = prevArg,
                  b = 'suffixOperator',
                  c = suffix;
               if (!isNaN(a)) {
                  /// number
                  let name = getRandomName();
                  let sn = new Node(
                     b,
                     new Node('number', [], { value: parseInt(a) }),
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
                     let sn = new Node(
                        b,
                        prevArg.sn, /// you can get it from operations but let's store it into prevArg.sn to speed our code a litte bit.
                        { name: c }
                     );
                     operations.set(a, sn);
                     prevArg.sn = sn;
                  } else {
                     /// varName
                     let name = getRandomName();
                     let sn = new Node(
                        b,
                        new Node('variable', [], { name: a }),
                        { name: c }
                     );
                     operations.set(name, sn);
                     prevArg = { name, sn };
                  }
               }
            }

            _str += `${prevArg.name} ${op} `;

            if (prefix) {
               let a = arg,
                  b = 'prefixOperator',
                  c = prefix;
               if (!isNaN(a)) {
                  /// number
                  let name = getRandomName();
                  let sn = new Node(
                     b,
                     new Node('number', [], { value: parseInt(a) }),
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
                     let sn = new Node(
                        b,
                        operations.get(a), /// you can get it from operations but let's store it into prevArg.sn to speed our code a litte bit.
                        { name: c }
                     );
                     operations.set(a, sn);
                     prevArg.sn = { name: a, sn };
                  } else {
                     /// varName
                     let name = getRandomName();
                     let sn = new Node(
                        b,
                        new Node('variable', [], { name: a }),
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

            end = false;
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
               let sn = new Node(
                  b,
                  new Node('number', [], { value: parseInt(a) }),
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
                  let sn = new Node(
                     b,
                     prevArg.sn, /// you can get it from operations but let's store it into prevArg.sn to speed our code a litte bit.
                     { name: c }
                  );
                  operations.set(a, sn);
                  prevArg.sn = { name: a, sn };
               } else {
                  /// varName
                  let name = getRandomName();
                  let sn = new Node(
                     b,
                     new Node('variable', [], { name: a }),
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
         end = false;
         while (!end) {
            end = true;
            if (contains(_str, options.operators[i].id)) {
               _str = _str.replace(new RegExp(`(${options.argTest})\\s*(${options.operators[i].regexStr})\\s*(${options.argTest})`), (match, g1, op, g2) => {
                  //#region argument for the operator
                  let arg1, arg2;
                  if (!isNaN(g1)) {
                     /// number
                     arg1 = new Node('number', [], { value: parseInt(g1) });
                  } else {
                     let found = false;
                     g1.replace(options.operationTestReg, () => {
                        // operation
                        arg1 = operations.get(g1);
                        found = true;
                     });
                     if (!found) {
                        /// varName
                        arg1 = new Node('variable', [], { name: g1 });
                     }
                  }
                  if (!isNaN(g2)) {
                     /// number
                     arg2 = new Node('number', [], { value: parseInt(g2) });
                  } else {
                     let found = false;
                     g2.replace(options.operationTestReg, () => {
                        // operation
                        arg2 = operations.get(g2);
                        found = true;
                     });
                     if (!found) {
                        /// varName
                        arg2 = new Node('variable', [], { name: g2 });
                     }
                  }
                  //#endregion
                  let name = getRandomName();
                  operations.set(name, new Node('operator', [arg1, arg2], { name: op }));
                  end = false;
                  return name;
               });
            }
            /// if the operator is not found,,, end the while loop.
         }
      }

      //#endregion

      return _str;
   }

}