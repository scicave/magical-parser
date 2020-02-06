import MagicalParser from '../../build/index.js';

const r = MagicalParser.Rules;
const t = MagicalParser.Tokens;

let operatorsParser = {};

operatorsParser.selector = new MagicalParser.OperatorsParser('new', {
   nameTest: /[A-Za-z-]/,
   operators: [
      new t.Operator({ id: '>' }),
      new t.Operator({ id: '+' }),
      new t.Operator({ id: '~' }),
   ],
   suffixOperators: [
      new t.SuffixOperator({ id: '#' }),
      new t.SuffixOperator({ id: '.' }),
   ]
});

operatorsParser.content = new MagicalParser.OperatorsParser('new', {
   nameTest: /[A-Za-z-]/,
   operators: [
      new t.Operator({ id: '>' }),
      new t.Operator({ id: '+' }),
      new t.Operator({ id: '~' }),
   ],
   spera
});

let grammer = getGrammer();

function getGrammer() {

   let declaration = new r.Sequence([
      new r.AnyThing({
         name: 'StyleSelector',
         // parser: operatorsParser.selector
      }),
      new r.Block({
         name: 'StyleDeclaration',
         opening: '{',
         closing: '}',
         content: 'all',
         // parser: operatorsParser.content,
      })
   ], { name: 'StyleRule' });

   return new r.Repeat(declaration, { name: 'StyleSheet' });
}

let cssParser = new MagicalParser.Parser(grammer);

let css = `
p {
   margin: 10px 0;
   padding: 20px;
   font-size: 1.5em;
   color: #323232;
   background: antiquewhite;
}

a {
   color: #838383;
}

a:visited {
   color: rgb(0, 224, 224);
}
`;

let parsed = cssParser.parse(css);

console.log(parsed);