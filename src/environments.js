
import { Operator, Separator, PrefixOperator, SuffixOperator } from './tokens/Operators.js';
import block from './tokens/Block.js/index.js';

export default new Map([
   /**
    * [key is env, value is options]
    */

   [
      'new',
      {
         nameTest: '[a-zA-Z_]+\\d*',
         numTest: '\\d+\\.?\\d*|\\d*\\.?\\d+',

         operators: [],
         suffixOperators: [],
         prefixOperators: [],
         blocks: [],
      }
   ],

   [
      "math",
      {
         nameTest: '[a-zA-Z_]+\\d*',
         numTest: '\\d+\\.?\\d*|\\d*\\.?\\d+',

         autoMultSign: true,
         vars: [], /// to be used in this case ::: ' 1 + var(2-5)' which is the same as ' 1+ var*(2-5)'
         prefixOperators: [
            new PrefixOperator({ name: '!' }),
            new PrefixOperator({ name: 'not' }),
            new PrefixOperator({ name: '~' }),
            new PrefixOperator({ name: '++' }),
            new PrefixOperator({ name: '--' }),
            new PrefixOperator({ name: '+' }),
            new PrefixOperator({ name: '-' }),
            new PrefixOperator({ name: 'bnot' })
         ],

         suffixOperators: [
            new SuffixOperator({ name: '!' }),
            new SuffixOperator({ name: '++' }),
            new SuffixOperator({ name: '--' }),
         ],

         operators: [

            new Operator({ name: '^', zIndex: 10 }), // the first operator to process
            new Operator({ name: '*', zIndex: 9 }),
            new Operator({ name: '/', zIndex: 9 }),
            new Operator({ name: 'mod', zIndex: 8 }),
            new Operator({ name: '+', zIndex: 7 }),
            new Operator({ name: '-', zIndex: 7 }),
            new Operator({ name: '>>', zIndex: 6 }),
            new Operator({ name: '<<', zIndex: 6 }),
            new Operator({ name: '>=', zIndex: 5 }),
            new Operator({ name: '<=', zIndex: 5 }),
            new Operator({ name: '!=', zIndex: 5 }),
            new Operator({ name: '=', zIndex: 5 }),
            new Operator({ name: '<', zIndex: 5 }),
            new Operator({ name: '>', zIndex: 5 }),
            new Operator({ name: '==', zIndex: 5 }),
            new Operator({ name: '&', zIndex: 4 }),
            new Operator({ name: 'band', zIndex: 4 }),
            new Operator({ name: '|', zIndex: 4 }),
            new Operator({ name: 'bor', zIndex: 4 }),
            new Operator({ name: 'bxor', zIndex: 4 }),
            new Operator({ name: 'constrain', zIndex: 4 }),
            new Operator({ name: 'in', zIndex: 3 }),
            new Operator({ name: 'out', zIndex: 3 }),
            new Operator({ name: 'xnor', zIndex: 1 }),
            new Operator({ name: 'xor', zIndex: 1 }),
            new Operator({ name: 'nand', zIndex: 1 }),
            new Operator({ name: 'nor', zIndex: 1 }),
            new Operator({ name: 'or', zIndex: 1 }),
            new Operator({ name: 'and', zIndex: 1 }),
            new Operator({ name: '||', zIndex: 1 }),
            new Operator({ name: '&&', zIndex: 1 }),
            new Operator({ name: '=', zIndex: 0 }) // the last operator to be applied

         ],

         separators: [
            new Separator({ name: ';' }),
            new Separator({ name: ',' }),
         ],

         blocks: [
            new block({ openingChar: '{', closingChar: '}', num: 0, opened: false }), /// multiNodable used to know whether or not the bracket block can have multiNode seperated be something like comma ","
            new block({ openingChar: '[', closingChar: ']', num: 0, opened: false }),
            new block({ openingChar: '(', closingChar: ')', num: 0, opened: false }),
            new block({ openingChar: '"', closingChar: '"', num: 0, opened: false }),
            new block({ openingChar: "'", closingChar: "'", num: 0, opened: false })
         ],

         forbiddenChars: []
      }
   ]

]);
