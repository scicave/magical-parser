import Rule from './Rule.js';

export default class AnyThing extends Rule {
   constructor(properties) {
      this.rulesNum = 0;
      super('Anything', [], properties);
   }

   getRegex(groubIndex = 0, groubResult = true) {
      groubIndex = groubIndex || {
         num: 0,
         increase: function (step = 1) {
            this.num += step;
         }
      };
      this.index = { ...groubIndex };
      return `(.*?)`;
   }

}