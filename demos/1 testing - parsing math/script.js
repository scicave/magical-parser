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
function PARSE(valueTOparse) {
   // console.log('logging from ./demos/1 .../script.js');
   let operations = new Map();
   console.log('Parsing: ' + valueTOparse);
   console.log('---------');
   console.time('parsing time');
   let a = p.parse(valueTOparse, p.options, operations);
   console.timeEnd('parsing time');
   console.log('---------');
   console.log('afterParsing: ');
   console.log(a);
   console.log('---------');
   console.log('operations');
   console.log(operations);
}

PARSE('m = sin(2*s) + num!');