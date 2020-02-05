import MagicalParser from '../../build/index.js';

const r = MagicalParser.Rules;
const t = MagicalParser.Tokens;
let operatorsParser = {};
operatorsParser.selector = new MagicalParser.OperatorsParser({
   nameTest: /[A-Za-z-]/,
   operators: [
      new t.Operator({ id: '>' }),
      new t.Operator({ id: '+' }),
      new t.Operator({ id: '~' }),
      new t.Operator({ id: '>' }),
      new t.Operator({ id: '>' }),
   ],
});
operatorsParser.content = new MagicalParser.OperatorsParser({
   nameTest: /[A-Za-z-]/,
   operators: [
      new t.Operator({ id: '>' }),
      new t.Operator({ id: '+' }),
      new t.Operator({ id: '~' }),
      new t.Operator({ id: '>' }),
      new t.Operator({ id: '>' }),
   ],
});

let grammer = getGrammer();

function getGrammer() {
   let styleDeclaration = new r.Sequence([
      new r.AnyThing({ parser: operatorsParser.selector }),
      new r.Block({
         opening: '{',
         closing: '}',
         content: 'all',
         parser: operatorsParser.content
      })
   ]);

   let mediaDeclaration = new r.Sequence([
      new r.AnyThing({ parser: operatorsParser.selector }),
      new r.Block({
         opening: '{',
         closing: '}',
         content: 'all',
         parser: operatorsParser.content
      })
   ]);

   return new r.Repeat(
      new r.AnyOf([
         styleDeclaration,
         mediaDeclaration
      ])
   );
}