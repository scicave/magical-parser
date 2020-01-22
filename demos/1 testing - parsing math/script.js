import Parser from "../../src/Parser.js";
// import block from "../../src/blocks.js";
// import { specialRegex } from '../../src/global.js';

var p = new Parser('math', {
   autoMultSign: true,
});

let valueTOparse = `m*s^num++-3!(1+2)`;

function PARSE(valueTOparse) {
   // console.log('logging from ./demos/1 .../script.js');
   let operations = [];
   console.log('Parsing: \n---------\n' + valueTOparse);
   console.time('parsing time');
   let a = p.parse(valueTOparse, operations);
   console.timeEnd('parsing time');
   console.log('afterParsing', a);
   console.log('operations', operations);
   
}


PARSE(valueTOparse);