import Rule from './Rule.js';

export default class SomeThing extends Rule {
   constructor(properties) {
      this.rulesNum = 0;
      if (!properties.test) throw new Error('the SomeThing rule must have test property');
      super('SomeThing', [], properties);
   }

   getRegex(groubIndex = 0, groubResult = true) {
      groubIndex = groubIndex || {
         num: 0,
         increase: function (step = 1) {
            this.num += step;
         }
      };
      this.index = { ...groubIndex };
      return `(${this.test})`;
   }

}