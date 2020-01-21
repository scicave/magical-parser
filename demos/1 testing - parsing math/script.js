import Parser from "../../src/Parser.js";
import block from "../../src/blocks.js";
import { specialRegex } from '../../src/global.js';


let p = new Parser('new', {
   blocks: [
      new block({
         openingChar: '**',
         closingChar: '*',
         handleContent: false,
         contentTest: /[^\s*]/,
         mustOpen: false,
         mustClose: true,
      }),
      new block({
         openingChar: '("',
         closingChar: '")',
         handleContent: false,
         mustOpen: false,
         mustClose: true,
      }),
      new block({
         openingChar: '"',
         closingChar: '"',
         handleContent: false,
         mustOpen: true,
         mustClose: false,
      }),
   ],
});


let operations = [];
let valueTOparse = `
m - ***a** 
("this is me")
mohammed"
{samir}
`;
console.log('logging from ./demos/1 .../script.js', 'color:red')
console.log('Parsing: "' + valueTOparse + '"');
console.time('parsing time');
p.__clonedStr = valueTOparse; p.__realpos = 0; // this is temp, no need for it
let a = p.__processBlocks(valueTOparse, p.options, operations);
console.timeEnd('parsing time');
console.log('afterParsing', a);
console.log('operations', operations);
