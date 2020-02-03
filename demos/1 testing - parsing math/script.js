import CustomMathParser from "../../src/customParsers/math.js";
// import block from "../../src/blocks.js";
// import { specialRegex } from '../../src/global.js';

var p = new CustomMathParser('math', {
   autoMultSign: true,
});

let valueTOparse = `m = 2*s!^num!`;

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

PARSE(valueTOparse);