import {
  Operator,
  Separator,
  PrefixOperator,
  SuffixOperator
} from "../tokens/Operators.js";
import Block from "../tokens/Block.js";
import Node from "../Node.js";
import {
  prepareOptions,
  sendError,
  contains,
  getRandomName
} from "../global.js";

export default class CustomMathParser {
  constructor(options) {
    this._options = {
      autoMultSign: true,
      vars: [], /// to be used in this case ::: ' 1 + var(2-5)' which is the same as ' 1+ var*(2-5)'
      nameTest: "[a-zA-Z_]+\\d*",
      numTest: "\\d+\\.?\\d*|\\d*\\.?\\d+",

      prefixOperators: [
        new PrefixOperator({ id: "+" }),
        new PrefixOperator({ id: "-" })
      ],

      suffixOperators: [
        new SuffixOperator({ id: "!" }),
        new SuffixOperator({ id: "deg" }),
        new SuffixOperator({ id: "rad" })
      ],

      operators: [
        new Operator({ id: "^", zIndex: 10 }), // the first operator to process
        new Operator({ id: "*", zIndex: 9 }),
        new Operator({ id: "/", zIndex: 9 }),
        new Operator({ id: "mod", zIndex: 9 }),
        new Operator({ id: "+", zIndex: 7 }),
        new Operator({ id: "-", zIndex: 7 }),
        new Operator({ id: ">>", zIndex: 6 }),
        new Operator({ id: "<<", zIndex: 6 }),
        new Operator({ id: ">=", zIndex: 5 }),
        new Operator({ id: "<=", zIndex: 5 }),
        new Operator({ id: "!=", zIndex: 5 }),
        new Operator({ id: "<", zIndex: 5 }),
        new Operator({ id: ">", zIndex: 5 }),
        new Operator({ id: "==", zIndex: 5 }),
        new Operator({ id: "&", zIndex: 4 }),
        new Operator({ id: "band", zIndex: 4 }),
        new Operator({ id: "|", zIndex: 4 }),
        new Operator({ id: "bor", zIndex: 4 }),
        new Operator({ id: "bxor", zIndex: 4 }),
        new Operator({ id: "constrain", zIndex: 4 }),
        new Operator({ id: "in", zIndex: 3 }),
        new Operator({ id: "out", zIndex: 3 }),
        new Operator({ id: "xnor", zIndex: 1 }),
        new Operator({ id: "xor", zIndex: 1 }),
        new Operator({ id: "nand", zIndex: 1 }),
        new Operator({ id: "nor", zIndex: 1 }),
        new Operator({ id: "or", zIndex: 1 }),
        new Operator({ id: "and", zIndex: 1 }),
        new Operator({ id: "||", zIndex: 1 }),
        new Operator({ id: "&&", zIndex: 1 }),
        new Operator({ id: "=", zIndex: 0 }) // the last operator to be applied
      ],

      separators: [new Separator({ id: ";" }), new Separator({ id: "," })],

      blocks: [
        new Block({ id: { opening: "{", closing: "}" } }), /// multiNodable used to know whether or not the bracket block can have multiNode seperated be something like comma ","
        new Block({ id: { opening: "[", closing: "]" } }), // []
        new Block({ id: { opening: "(", closing: ")" } }), // ()
        new Block({ id: /"(.*?|\\")*"/ }), /// string: ""
        new Block({ id: /'(.*?|\\')*'/ }) /// string: ''
      ],

      forbiddenChars: []
    };
    this.options = {...this._options, ...(options || {})};
  }

  get options() {
    return this._options;
  }

  set options(options) {
    this._options = prepareOptions(options);
  }

  parse(str, operations = null) {
    var options = this.options;
    operations = operations instanceof Map ? operations : new Map();
    //#region pre codes
    for (let i = 0; i < options.forbiddenChars.length; i++) {
      if (contains(str, options.forbiddenChars[i]))
        sendError("forbiddenSymbol", "forbidden symbol.");
    }
    // // if empty
    // str = str.replace(/\s+/g, () => {
    //    return ' ';
    // });

    //#endregion
    return this.__parse(str, options, operations);
  }

  __parse(str, options, operations, subOptions = {}) {
    subOptions = { parseBlocks: true, parseOperators: true, ...subOptions }; /// or use Object.assign

    // if empty of characters
    let snode;
    str = str.replace(/^\s*$/, () => {
      snode = new Node("");
    });
    if (snode) return snode;

    if (subOptions.parseBlocks) {
      str = this.__parseBlocks(str, options, operations);
    }
    if (subOptions.parseOperators) {
      str = this.__parseOperators(str, options, operations);
    }

    return this.__parseArg(str, options, operations);
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
      let args = [];
      if (b.parser) {
        if(b.parser === 'inherit'){
          args = [this.__parse(content, options, operations)];
        }else{
          args = [b.parser(content)];
        }
      }
      let sn = new Node("block", args, {
        name: b.name,
        match,
        content
      });
      operations.set(name, sn);
      return name;
    };

    for (let i = 0; i < blocks.values.length; i++) {
      b = blocks.values[i];
      str = str.replace(b.regex, repBlock);
    }
    return str;
  }

  __parseOperators(str, options, operations) {
    /// RegExp: (arg)(suffix)(op)(prefix)(arg)
    /// ((?:[a-zA-Z_]+\d*)|(?:-?\d+\.?\d*)|(?:-?\d*\.?\d+))\s*((?:\+\+))?\s*((?:\+))\s*((?:\+\+|\+|\-))?\s*((?:[a-zA-Z_]+\d*)|(?:\d+\.?\d*)|(?:\d*\.?\d+))

    //#region separators
    for (let s of options.separators) {
      if (contains(str, s.id)) {
        let name = getRandomName();
        let args = [];
        let strs = str.split(s);
        for (let str_ of strs) {
          args.push(this.__parse(str_, options, operations));
        }
        operations.set(
          name,
          new Node("separator", args, { name: s.name, length: args.length })
         );
         return name;
      }
    }
    //#endregion

    //#region preparing for parsing process
    let _str = "",
      prevArg = null;
    //#endregion

    //#region searching for operators and parsing suffix and prefix
    /// intial replacement
    str = str.replace(options.opIntialTestReg, (match, prefix, arg) => {
      if (prefix) {
        let name = getRandomName();
        let sn = new Node("prefixOperator", this.__parseArg(arg, options, operations), {
          name: prefix,
          match: match,
        });
        operations.set(name, sn);
        prevArg = name;
      } else {
        prevArg = arg;
      }
      return "";
    });

    let end = false;
    // inner search for operators
    while (!end) {
      end = true;
      /// if replacement is not implemented, str will sstill the same and while loop will close
      str = str.replace(options.opTestReg, (match, suffix, op, prefix, arg) => {
        if (!op) {
          sendError("operators", "invalid operators", str, null);
        }

        if (suffix) {
          /// creating an operations with type of suffix operator,,, its arg is the prev arg
          let name = getRandomName();
          let sn = new Node("suffixOperator", this.__parseArg(prevArg, options, operations), {
            name: suffix,
          });
          operations.set(name, sn);
          prevArg = name;
        }

        _str += `${prevArg} ${op} `;

        if (prefix) {
          /// creating an operations with type of prefix operator,,, its arg is the prev arg
          let name = getRandomName();
          let sn = new Node("prefixOperator", this.__parseArg(arg, options, operations), {
            name: prefix
          });
          operations.set(name, sn);
          prevArg = name;
        } else {
          prevArg = arg;
        }

        end = false;
        return "";
      });
    }

    // final search
    if (str !== "") {
      str = str.replace(options.opFinalTestReg, (match, suffix) => {
        let name = getRandomName();
        let sn = new Node("suffixOperator", this.__parseArg(prevArg, options, operations), {
          name: suffix
        });
        operations.set(name, sn);
        _str += name;
        return "";
      });
      if (str !== "")
        sendError("operators", "invalid suffix operator at the end", "", null);
    } else {
      _str += prevArg;
    }
    //#endregion

    //#region parsing operators
    for (let i = 0; i < options.operators.length; i++) {
      end = false;
      while (!end) {
        end = true;
        if (contains(_str, options.operators[i].id)) {
          _str = _str.replace(
            new RegExp(
              `(${options.argTest})\\s*(${options.operators[i].regexStr})\\s*(${options.argTest})`
            ),
            (match, g1, op, g2) => {
              let arg1 = this.__parseArg(g1, options, operations),
               arg2 = this.__parseArg(g2, options, operations);
              let name = getRandomName();
              operations.set(
                name,
                new Node("operator", [arg1, arg2], { name: op })
              );
              end = false;
              return name;
            }
          );
        }
        /// if the operator is not found,,, end the while loop.
      }
    }
    //#endregion

    return _str;
  }

  __parseArg(str, options, operations) {
    //#region the last thing in str,,, number or name or operationName
    let snode;

    // if name of operation
    str = str.replace(/^\s*(.*)\s*$/, "$1");

    /// if number
    if (!isNaN(str)) {
      snode = new Node("number", [], {
        value: parseFloat(str)
      });
    }
    if (snode) return snode;

    // if operation name
    str = str.replace(
      options.operationTestGroupedReg,
      (match, funcName, opName) => {
        snode = operations.get(opName);
        if (funcName && snode.type === 'block' && snode.name === '()') {
          snode = new Node("functionCalling", snode.args, {name: funcName});
        }else if(funcName){
          throw new Error('you have inputted a name (identifier) then an invalid block after it.');
        }
      }
    );
    if (snode) return snode;

    // if literal (variable) or bool {true or false}, ...
    str = str.replace(options.nameTestReg, name => {
      snode = new Node("variable", [], { name });
    });
    if (snode) return snode;

    //#endregion

    // this shouldn't happen in ordinary cases, but this line of code is here for avoiding any flaw out of measurements
    throw new Error("invalid script.\n" + str);
  }
}
