import Parser from "../../src/Parser.js";
import block from "../../src/blocks.js";

let p = new Parser('new', {
   blocks: [
      new block({
         openingChar: '(',
         closingChar: ')',
         handleContent: false,
      }),
   ],
});

let operations = [];
let a = p.__processBlocks('m-(a)', p.options, operations);
console.log(a);
console.log(operations);
