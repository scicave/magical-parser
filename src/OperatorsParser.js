/**
 * here is the flow chart of the algorithms::: {<https://www.lucidchart.com/invitations/accept/1c02df38-de1b-48da-8942-652652d373ea>}
 * 
 * options include:
 * functions:: if is is applied the expr " 1 + rg(2)" will be considered as " 1 + rg*(2)", thus rg is constants, here we sill consider the functions you insert in addtion to the common functions such as ['sin', 'cos', ...]
 *
 * operators search regex at regexr.com "https://regexr.com/4tbfe"

 */

// import sNode from './sNode';
import environments from './environments.js';
import Node from './Node.js';
import { checker, sendError, prepareOptions, getRandomName, contains } from './global.js';
import { Operator, Separator, PrefixOperator, SuffixOperator } from './tokens/Operators.js';

export default class OperatorsParser {

   constructor(options = {}) {
      this.options = options;
      prepareOptions(options);
   }

   /**
    * @param {string} str the string to be parsed 
    * @param {object} options if you want to override the aleardy existing options
    * @param {array} operations 
    */
   parse(str, operations = null) {

      var options = this.options;
      var forbiddenChars = options.forbiddenChars;
      var snode;

      operations = operations instanceof Map ? operations : new Map();
      this.__clonedStr = str; this.__realPos = 0;

      //#region pre codes

      // checking errors
      for (let i = 0; i < forbiddenChars.length; i++) {
         if (contains(str, forbiddenChars[i])) sendError('forbidden char ' + forbiddenChars[i]);
      }

      // if empty of characters
      str = str.replace(/^\s*$/, () => {
         snode = new Node('');
      }); if (snode) return snode;

      str = this.__parseBlocks(str, operations);

      for (let i = 0; i < options.rulesRegex.length; i++) {
         str = str.replace(options.rulesRegex[i], () => {
            return
         });
      }

      str = this.__parseOpertors(str, operations);

      //#endregion

      this.__parse(str, options, operations, { parseBlocks: false, parseOperators: false });

   }

   __parse(str, options, operations, subOptions = {}) {

      subOptions = { parseBlocks: true, parseOperators: true, ...subOptions }; /// or use Object.assign
      let snode;

      if (subOptions.parseBLocks) {
         str = this.__parseBlocks(str, operations);
      }
      if (subOptions.parseOperators) {
         str = this.__parseBlocks(str, operations);
      }

      //#region final codes

      // if empty of characters
      str = str.replace(/^\s*$/, () => {
         snode = new Node('');
      }); if (snode) return snode;


      // if name of operation
      str = str.replace(new RegExp(`^\\s*(##${options.nameTest}##)\\s*$`), (match, opName) => {
         snode = operations.get(opName).sNode;
      });
      if (snode) return snode;

      // something.abc.funcName(arg1, ...)
      str = str.replace(new RegExp(`^\\s*(${options.nameTest}\\s*\\.\\s*)+(?:(${options.nameTest})\\s*(##${options.nameTest}##))\\s*$`), (match, pathTOme, funcName, funcArgs) => {
         let args = operations.get(funcArgs);
         if (options.all.prefixOperators.search(new RegExp(` \\(@(${name}),#(\\d*)\\) `)) > -1) {
            let _arg = operations.get(args);
            let sn = new Node('prefixOperator', _arg, { name });
            operations.set(name, sn);
         }
         else if (args.sNode.calls('()')) {
            let func;
            let extension = this.parse(pathTOme, operations);
            func = new Node('implementFunction', args.sNode.args, { name: funcName }); // args.sNode.args the args of the bracket  it may be one or more;
            snode = new Node('.', [extension, func], { dotType: 'function', fullName: pathTOme + funcName });
         }
      });
      if (snode) return snode;

      //something.id
      str = str.replace(/^\s*(.*)\.(\$\$[_a-zA-z]+\d*\$\$)\s*$/, (match, pathTOme, id) => {
         if (match) {
            snode = new Node('.', [this.parse(first, operations), new Node('id', [], {
               name: id
            })], {
               dotType: 'id',
               extension: match
            });
         }
      });
      if (snode) return snode;

      // if literal, number or variable or bool {true or false}, ...

      str = str.replace(/^\s*(([_a-zA-z]+)\d*)\s*$/, (match, value, notNum) => {
         if (match) {
            snode = new Node(notNum ? 'id' : 'num', [], { value: value });
         }
      });
      if (snode) return snode;

      str = str.replace(/^(-?\d+\.?\d*)|(-?\d*\.?\d+)$/, (match, value, notNum) => {
         if (match) {
            snode = new Node(notNum ? 'id' : 'num', [], { value: value });
         }
      });
      if (snode) return snode;

      throw new Error('invalid script.\n' + str); // this shouldn't happen in ordinary cases, but this line of code is here for avoiding any flaw out of measurements

      //#endregion

   }

   __parseBlocks(str, options, operations) {

      //#region brackets

      var blocks = options.blocks;

      let b;

      let repBlock = (match, content) => {
         let name = getRandomName();
         let childArg = b.parser ? b.parser.parse(content) : this.__parse(content, options, operations);
         let sn = new Node('block', childArg, { id: b.id, tokenRef: b });
         operations.set(name, sn);
         return name;
      };

      for (let i = 0; i < blocks.length; i++) {
         b = blocks[i];
         str = str.replace(b.regex, repBlock);
      }

      //#endregion

      return str;
   }

   __parseOperators(str, options, operations) {
      /// RegExp: (var or num or block)(suffix)(op)(prefix)(var or num or block)
      /// ((?:[a-zA-Z_]+\d*)|(?:-?\d+\.?\d*)|(?:-?\d*\.?\d+))\s*((?:\+\+))?\s*((?:\+))\s*((?:\+\+|\+|\-))?\s*((?:[a-zA-Z_]+\d*)|(?:\d+\.?\d*)|(?:\d*\.?\d+))

      //#region separators
      //if (!_contains(str, ...operators)) str = str.replace(/\s/g, '');
      for (let s of options.separators) {
         if (new RegExp(s.regex).test(str)) {
            let name = this.__get;
            let args = [];
            let strs = str.split(s);
            for (let str_ of strs) {
               args.push(this.parse(str_, operations));
            }
            operations.set(name, new Node('separator', args, { name: s, length: args.length }));
         }
      }
      //#endregion

      //#region preparing ofr parsing process
      let argTest = `${options.nameTest}|${options.numTest}|##${options.nameTest}##`;
      let search = new RegExp(`^\\s*(${options.allRegex.suffixOperators})?\\s*(${options.allRegex.operators})\\s*(${options.allRegex.prefixOperators})?\\s*(${argTest})\\s*`),
         intialSearch = new RegExp(`^\\s*(${options.allRegex.prefixOperators})?\\s*(${argTest})`),
         finalSearch = new RegExp(`^\\s*(${options.allRegex.suffixOperators})\\s*$`);

      let _str = '',
         prevArg = {
            name: null,
            sn: null
         };
      //#endregion

      //#region searchong for operators and parsing process
      /// intial replacement
      str = str.replace(intialSearch, (match, prefix, arg) => {
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
               a.replace(`##${options.nameTest}##`, () => {
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
            arg.replace(`##${options.nameTest}##`, () => {
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
         str = str.replace(search, (match, suffix, op, prefix, arg) => {

            if (!op) {
               sendError('operators', 'invalid operators', str, null);
            }

            if (suffix) {
               for (let i = 0; i < options.suffixOperators.length; i++) {
                  if (options.suffixOperators[i].regex.test(suffix)) {
                     /// creating an operations with type of  prefix operator,,, its arg is the prev arg
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
                        a.replace(`##${options.nameTest}##`, () => {
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
                  let sn = new Node(
                     b,
                     new Node('number', [], { value: parseInt(a) }),
                     { name: c }
                  );
                  operations.set(name, sn);
                  prevArg = { name, sn };
               } else {
                  let found = false;
                  a.replace(`##${options.nameTest}##`, () => {
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
               arg.replace(`##${options.nameTest}##`, () => {
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
         str = str.replace(finalSearch, (match, suffix) => {

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
               a.replace(`##${options.nameTest}##`, () => {
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
      }
      //#endregion

      return _str;
   }

   //#region deprecated

   //// deprecated // deprecated // deprecated // deprecated // deprecated 
   //// deprecated // deprecated // deprecated // deprecated // deprecated 
   //// deprecated // deprecated // deprecated // deprecated // deprecated

   // __parseBlocks(str, options, operations) {

   //    //#region brackets
   //    var that = this;
   //    var blocks = options.blocks;

   //    let __parseBlock__ = (index, str_) => {
   //       //// checking error,,, this ill be done on handling bracket's content, so don't do for this. 
   //       let name = getRandomName();

   //       // let str_ = str.slice(index.opening, index.closing); /// cut the text from the next sibiling of the opening char until the current closingChar index
   //       let b = blocks.openedBlock.ref;
   //       let searchingTxt = b.openingChar + str_ + b.closingChar;
   //       str = str.replace(searchingTxt, name); // if the replacement is global or not, there will no be any problem unless the developer using this library set a block with the same features as the bolck of our operation name.

   //       let childArg;
   //       if (b.handleContent) {
   //          childArg = that.parse(str_); /// here you are parsing new string with no operations yet. /// getting the sNode from the string inside this bracket block with the same procedures, there is no need to pass operations as argument
   //       } else {
   //          childArg = new Node('undefined', [], { content: str_ }); /// getting the sNode from the string inside this bracket block with the same procedures, there is no need to pass operations as argument
   //       }
   //       let sn = new Node('block', [childArg], { openingChar: b.openingChar, closingChar: b.closingChar, name: b.name });
   //       operations.set(name, sn);

   //       b.opened = false; blocks.openedBlock = null; // reset

   //       return index.closing + (name.length - searchingTxt.length); /// new_i /// setting the index, as the string may shrink or be taller, it depends on the length of the name
   //    };

   //    let __parseBlocks__ = (i_intial = 0) => {
   //       for (let i = i_intial; i < str.length; i++) {
   //          if (this.__realPos || this.__realPos === 0) this.__realPos += 1; // dealing with the intial str be fore the parsing process
   //          for (let b of blocks) {
   //             /// if a block is opened, closing has the priority, unless, opening has the priority::: you can notice this in ***Mohammed***, if you check the opening char first the num will increase to 2, thus the block will not be closed,,, and an error will occur.
   //             if (blocks.openedBlock) {
   //                if (str.slice(i, i + b.closingChar.length) === b.closingChar) {
   //                   if (b !== options.blocks.openedBlock.ref) {

   //                      let iof = options.blocks.openedBlock.ref.openingChar.indexOf(b.openingChar);
   //                      if (iof > -1) {
   //                         // options.blocks.openedBlock.ref.openingChar  contains  b.closingChar::: for example *** contains **, you can use these blocks formatting typing, **Mohammed** will be bold.
   //                         options.blocks.openedBlock.mayCloseAt = { ref: b, index: i, iof };
   //                      } else {
   //                         b.num--;
   //                      }

   //                   } else {
   //                      b.num--;
   //                   }
   //                } else if (str.slice(i, i + b.openingChar.length) === b.openingChar) {
   //                   b.num++;
   //                   i += b.openingChar.length - 1; // -1 here as for loop will add 1 to i, I want to set the index just after the opening char 
   //                   this.__realPos += b.openingChar.length - 1;
   //                }
   //             } else {
   //                if (str.slice(i, i + b.openingChar.length) === b.openingChar) {
   //                   b.num++;
   //                   i += b.openingChar.length - 1; // -1 here as for loop will add 1 to i, I want to set the index just after the opening char 
   //                   this.__realPos += b.openingChar.length - 1;
   //                   // if (!blocks.openedBlock) { /// if not open, then open
   //                   b.opened = true;
   //                   blocks.openedBlock = { ref: b, index: i };
   //                   // }
   //                } else if (str.slice(i, i + b.closingChar.length) === b.closingChar) {
   //                   b.num--;
   //                }
   //             }

   //             /// when a bracket is close, but not opened. e.g. ::: " 1+2-5) "
   //             if (b.num < 0) {
   //                if (b.mustOpen) {
   //                   sendError('closing a block not opened.');
   //                } else {
   //                   b.num = 0;
   //                }
   //             }

   //             /// if true, the bracket's block is defined.
   //             if (b.num === 0 && b.opened) { /// may other brackets' num be zero, as it does not exist or as it is closed but it closed inside the block that we are setting,,, e.g.::: " 1+2({1,2,3}^-1) "
   //                let index = {
   //                   opening: blocks.openedBlock.index + blocks.openedBlock.ref.openingChar.length,
   //                   closing: i
   //                };
   //                let _str = str.slice(index.opening, index.closing);
   //                if (checker.check(_str, b.content)) {
   //                   i = __parseBlock__(index, _str); /// __parseBlock__ returns the new_i
   //                } else {
   //                   b.num++; // the considered closingChar found is not compatible, so continue shearching for another closing char
   //                }
   //             }
   //          }
   //       }
   //    };
   //    __parseBlocks__();
   //    /// after finishing looping searching for brackets blocks, oooops, what is this?!!!, oh, the bracket is not closed. send an error
   //    if (blocks.openedBlock) {
   //       if (blocks.openedBlock.mayCloseAt) {
   //          let index = {

   //             opening:
   //                blocks.openedBlock.index +
   //                // blocks.openedBlock.mayCloseAt.ref.openingChar.length +    this will be added later
   //                blocks.openedBlock.mayCloseAt.iof,

   //             closing: blocks.openedBlock.mayCloseAt.index

   //          };
   //          /// the openingChar can be for another block e.g.::: (( and (,when we close with )) the blocks is ((content)), otherwise if we close with ) our block is (content) and the second "(" is the first char in the content 
   //          blocks.openedBlock.ref.opened = false;
   //          blocks.openedBlock.ref.num = 0;
   //          blocks.openedBlock = { ref: blocks.openedBlock.mayCloseAt.ref, index: index.opening };
   //          index.opening += blocks.openedBlock.mayCloseAt.ref.openingChar.length;

   //          let _str = str.slice(index.opening, index.closing);
   //          this.__realPos = str.length - 1 - index.closing;
   //          let new_i;
   //          if (checker.check(_str, blocks.openedBlock.mayCloseAt.ref.content)) {
   //             new_i = __parseBlock__(index, _str); /// __parseBlock__ returns the new_i
   //             __parseBlocks__(new_i);
   //          } else {
   //             if (blocks.openedBlock.ref.mustClose) {
   //                sendError('block is not closed.', this.__realPos);
   //             }
   //             // the considered closingChar found is not compatible as content failed at the test, so continue shearching for another closing char
   //             // so start just after the openingChar of the openedBlock.ref,,, 
   //             // new_i = index.opening;
   //             this.__realPos -= _str.length;
   //             __parseBlocks__(index.opening);
   //          }

   //       } else {
   //          if (blocks.openedBlock.ref.mustClose) {
   //             sendError('block is not closed.', this.__realPos);
   //          } else {
   //             let new_i = blocks.openedBlock.index + blocks.openedBlock.ref.openingChar.length;
   //             this.__realPos -= (str.length - 1) - new_i;
   //             blocks.openedBlock.ref.opened = false;
   //             blocks.openedBlock = null;
   //             __parseBlocks__(new_i);
   //          }
   //       }
   //    }

   //    //#endregion

   //    return str;

   // }

   //#endregion
}