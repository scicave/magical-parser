// import block from "./../../src/blocks.js";
import MagicalParser from "../../src/MagicalParser.js";

// import { operationBlockChar } from '../../src/global.js';
// const r = MagicalParser.Rules;
// const t = MagicalParser.Tokens;
// const Sequence = r.Sequence,
//    Optional = r.Optional,
//    Something = r.Something,
//    AnyOf = r.AnyOf;
// //#region getting the math parser using the new algorithm
// const operators = new AnyOf([
//    new Something('+'),
//    new Something('-'),
//    new Something('*'),
//    new Something('/'),
//    new Something('>'),
//    new Something('<'),
//    new Something('&&'),
//    new Something('&&'),
//    new Something('&&'),
// ]),
//    suffixes,
//    prefixes,
//    args;
// var p = new MagicalParser.CustomParsers.Math();

// var p = new MagicalParser.Parser(new Sequence([

//    new Sequence([
//       new Optional(prefixes),
//       args
//    ]),

//    new Sequence([
//       new Optional(prefixes),
//       operators,
//       new Optional(suffixes),
//       args
//    ]),

//    new Optional(suffixes),

// ]));

// //#endregion



var p = new MagicalParser.CustomParsers.Math();



var maxima = document.querySelector('#maxima');

function PARSE(valueTOparse) {
   // console.log('logging from ./demos/1/script.js');
   let operations = new Map();
   console.log('Parsing: ' + valueTOparse);
   console.log('---------');
   console.time('parsing time');
   let a = p.parse(valueTOparse, p.options, operations);
   let js = __generateJS(a);
   console.timeEnd('parsing time');
   console.log('---------');
   console.log('afterParsing: ');
   console.log(a);
   console.log('js: ', js);
   console.log('---------');
   console.log('operations:');
   console.log(operations);
}

// to generate a valid mathematical syntax for javaScript when the input is a normal mathematical expression 
function __generateJS(parsed) {
   if (parsed.type === 'number') {
      return parsed.value;
   } else if (parsed.type === 'variable') {
      return parsed.name;
   } else if (parsed.type === 'functionCalling') {
      switch (parsed.name) {
         case 'sum':
            if (!parsed.args[0].check({ type: 'separator', name: ',', length: 4 })) throw new Error('sum function has not valid arguments: "' + parsed.match + '"');
            let sumExpr = __generateJS(parsed.args[0].args[0]);
            let sumParam = __generateJS(parsed.args[0].args[1]);
            let start = __generateJS(parsed.args[0].args[2]);
            let end = __generateJS(parsed.args[0].args[3]);
            return `(()=>{
                  let sum = 0;
                  for(let ${sumParam} = ${start}; ${sumParam} <= ${end}; ${sumParam}++){
                     sum += ${sumExpr};
                  }
                  return sum; 
               })()`;
         default:
            return `Math.${parsed.name}(${__generateJS(parsed.args[0])})`;
      }
   } else if (parsed.type === 'block') {
      let opening, closing;
      switch (parsed.name) {
         case '()':
            opening = '(';
            closing = ')';
            break;
         case '[]':
            opening = '[';
            closing = ']';
            break;
         case '{}':
            opening = '{';
            closing = '}';
            break;
      }
      return opening + __generateJS(parsed.args[0]) + closing;
   } else if (parsed.type === 'operator') {
      switch (parsed.name) {
         case '^':
            return __generateJS(parsed.args[0]) + ' ** ' + __generateJS(parsed.args[1]);
         default:
            return __generateJS(parsed.args[0]) + ' ' + parsed.name + ' ' + __generateJS(parsed.args[1]);
      }
   } else if (parsed.type === 'suffixOperator') {
      switch (parsed.name) {
         case '!':
            return 'Math.fact(' + __generateJS(parsed.args[0]) + ')';
         default:
            return __generateJS(parsed.args[0]) + parsed.name;
      }
   } else if (parsed.type === 'prefixOperator') {
      return parsed.name + __generateJS(parsed.args[0]);
   } else if (parsed.type === 'separator') {
      let args = [];
      for (let arg of parsed.args) {
         args.push(__generateJS(arg));
      }
      return args.join(parsed.name + ' ');
   } else {
      return parsed.match;
   }
}

maxima.addEventListener('change', () => {
   PARSE(maxima.value);
});

PARSE(maxima.value);

