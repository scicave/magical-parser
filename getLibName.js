/**
 * after running this with node, I think I should choose magical-parser
 */

var suggestions = [
   'magical-parser',
   'global-parser',
   'scicave-parser'
];

var counter = new Map([...suggestions.map(item => [item, 0])]);

async function getRandom() {
   for (let i = 0; i < 10000000; i++) {
      var randIndex = Math.floor(Math.random() * suggestions.length);
      randIndex = Math.min(randIndex, suggestions.length - 1); // considering the case that Math.random() returns 1
      counter.set(suggestions[randIndex], counter.get(suggestions[randIndex]) + 1);
   }

   let libName = suggestions[0];
   for (let [key, value] of counter) {
      if (value > counter.get(libName)) libName = key;
   }
   return libName;
}

async function print() {
   console.time('getting random choice ...');
   let value = await getRandom();
   console.log(value);
   console.timeEnd('getting random choice ...');

}

print(); /// the most appearing name is "magical-parser"
