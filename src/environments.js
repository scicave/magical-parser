
import { operator, separator, prefixOperator, suffixOperator } from './operators'; 

export default new Map([
   /**
    * [key is mode, value is env]
    * env has {mode, options}
    */
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

         vars: [], /// to be used in this case ::: ' 1 + var(2-5)' which is the same as ' 1+ var*(2-5)'

         prefixOperators: [
            new prefixOperator('!'),
            new prefixOperator('not'),
            new prefixOperator('~'),
            new prefixOperator('++'),
            new prefixOperator('--'),
            new prefixOperator('+'),
            new prefixOperator('-'),
            new prefixOperator('bnot')
         ],
         suffixOperators: [
            new suffixOperator('!'),
            new suffixOperator('++'),
            new suffixOperator('--')
         ],
         operators: [

            new operator('^', 10), // the first operator to process

            new operator('*', 9),
            new operator('/', 9),

            new operator('mod', 8),

            new operator('+', 7),
            new operator('-', 7),

            new operator('>>', 6),
            new operator('<<', 6),

            new operator('>=', 5),
            new operator('<=', 5),
            new operator('!=', 5),
            new operator('=', 5),
            new operator('<', 5),
            new operator('>', 5),
            new operator('==', 5),

            new operator('&', 4),
            new operator('band', 4),
            new operator('|', 4),
            new operator('bor', 4),
            new operator('bxor', 4),
            new operator('constrain', 4),

            new operator('in', 3),
            new operator('out', 3),

            new operator('xnor', 1),
            new operator('xor', 1),
            new operator('nand', 1),
            new operator('nor', 1),
            new operator('or', 1),
            new operator('and', 1),
            new operator('||', 1),
            new operator('&&', 1),

            new operator('=', 0) // the last operator to be applied

         ],
         separators: [
            new separator(','),
            new separator(';')
         ],

         block: {
            values: [
               new block({ openingChar: '{', closingChar: '}', num: 0, opened: false }), /// multiNodable used to know whether or not the bracket block can have multiNode seperated be something like comma ","
               new block({ openingChar: '[', closingChar: ']', num: 0, opened: false }),
               new block({ openingChar: '(', closingChar: ')', num: 0, opened: false }),
               new block({ openingChar: '"', closingChar: '"', num: 0, opened: false }),
               new block({ openingChar: "'", closingChar: "'", num: 0, opened: false })
            ], /// we can deal with quotes with the same procedures as the brackets.
            openedBlock: { ref: null, index: null }
         },

         forbiddenSymbols: []
      }
   ]
]);
