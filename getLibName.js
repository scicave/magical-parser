var suggestions = [
   'magic-parser',
   'global-parser',
   'scicave-parser'
];

var counter = new Map([...suggestions.map(item => [item, 0])]);

for (let i = 0; i < 100; i++){
   var randIndex = Math.floor(Math.random()) * suggestions.length;
   randIndex = Math.min(randIndex, suggestions.length - 1);
   counter.set(suggestions[randIndex], counter.get(suggestions[randIndex]) + 1);
}

let libName = suggestions[0];
for (let [key, value] of counter){
   if (value > counter.get(libName)) libName = key;
}

console.log(libName);
