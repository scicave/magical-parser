
import { operator, separator, prefixOperator, suffixOperator } from './operators.js'; 
import block from './blocks.js';

export default new Map([
   /**
    * [key is env, value is options]
    */

   [
      'new',
      {
         operators: [],
         suffixOperators: [],
         prefixOperators:[],
         blocks: [],
      }
   ],

   [
      "math",
      {
         // functions: [
         //    'sin', 'cos', 'tan', 'sec', 'csc', 'cot', 'sinh', 'cosh',
         //    'tanh', 'sech', 'csch', 'coth', 'asin', 'acos', 'atan', 'asec', 'acsc',
         //    'acot', 'asinh', 'acosh', 'atanh', 'asech', 'acsch', 'acoth', 'exp',
         //    'ln', 'log', 'sinh', 'cosh', 'tanh', 'sech', 'csch', 'coth', 'exp', 'ln',
         //    'log', 'floor', 'ceil', 'abs', 'random', 'constrain', 'clamp', 'gcm',
         //    'hcm', 'gcf', 'hcf', 'gcd', 'hcd', 'lcm', 'lcd', 'max', 'min', 'root',
         //    'sqrt', 'sin', 'sum', 'integral', 'derivative', 'in'
         // ],

         autoMultSign: true,
         scope: [], /// to be used in this case ::: ' 1 + var(2-5)' which is the same as ' 1+ var*(2-5)'
         prefixOperators: [
            new prefixOperator({ name: '!' }),
            new prefixOperator({ name: 'not' }),
            new prefixOperator({ name: '~' }),
            new prefixOperator({ name: '++' }),
            new prefixOperator({ name: '--' }),
            new prefixOperator({ name: '+' }),
            new prefixOperator({ name: '-' }),
            new prefixOperator({ name: 'bnot' })
         ],

         suffixOperators: [
            new suffixOperator({ name: '!' }),
            new suffixOperator({ name: '++' }),
            new suffixOperator({ name: '--' }),
         ],

         operators: [

            new operator({ name: '^',          zIndex: 10 }), // the first operator to process
            new operator({ name: '*',          zIndex: 9}),
            new operator({ name: '/',          zIndex: 9}),
            new operator({ name: 'mod',        zIndex: 8}),
            new operator({ name: '+',          zIndex: 7}),
            new operator({ name: '-',          zIndex: 7}),
            new operator({ name: '>>',         zIndex: 6}),
            new operator({ name: '<<',         zIndex: 6}),
            new operator({ name: '>=',         zIndex: 5}),
            new operator({ name: '<=',         zIndex: 5}),
            new operator({ name: '!=',         zIndex: 5}),
            new operator({ name: '=',          zIndex: 5}),
            new operator({ name: '<',          zIndex: 5}),
            new operator({ name: '>',          zIndex: 5}),
            new operator({ name: '==',         zIndex: 5}),
            new operator({ name: '&',          zIndex: 4}),
            new operator({ name: 'band',       zIndex: 4}),
            new operator({ name: '|',          zIndex: 4}),
            new operator({ name: 'bor',        zIndex: 4}),
            new operator({ name: 'bxor',       zIndex: 4}),
            new operator({ name: 'constrain',  zIndex: 4}),
            new operator({ name: 'in',         zIndex: 3}),
            new operator({ name: 'out',        zIndex: 3}),
            new operator({ name: 'xnor',       zIndex: 1}),
            new operator({ name: 'xor',        zIndex: 1}),
            new operator({ name: 'nand',       zIndex: 1}),
            new operator({ name: 'nor',        zIndex: 1}),
            new operator({ name: 'or',         zIndex: 1}),
            new operator({ name: 'and',        zIndex: 1}),
            new operator({ name: '||',         zIndex: 1}),
            new operator({ name: '&&',         zIndex: 1}),
            new operator({ name: '=',          zIndex: 0}) // the last operator to be applied

         ],

         separators: [
            new separator({ name: ';' }),
            new separator({ name: ',' }),
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
