import Rule from './Rule.js';

export default class Repeat extends Rule {
   constructor(childRules, properties) {
      properties = {
         spaced: true,
         ...properties
      };
      this.rulesNum = 1;
      super('Repeat', [childRules], properties);
   }

   getRegex(groubIndex) {
      groubIndex = groubIndex || {
         num: 0,
         increase: function (step = 1) {
            this.num += step;
         }
      };
      this.index = { ...groubIndex };
      let timesTOrepeat = !isNaN(properties.num) ? `{${properties.num}}` : `+`;
      let content = this.childrenRules[0].getRegex(groubIndex.increase());
      let regex;
      if (properties.spaced) {
         regex = `((?:${content}\\s*)${timesTOrepeat})\\s*`;
      } else {
         regex = `(${content}${timesTOrepeat})\\s*`;
      }
      return regex;
   }

}