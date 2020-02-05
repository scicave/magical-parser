import Rule from './Rule.js';

export default class Sequence extends Rule {
   constructor(childrenRules, properties) {
      properties = {
         spaced: true,
         ...properties
      };
      this.rulesNum = -1;
      if (childrenRules.length == 0) throw new Error('Sequence musn\t be void.');
      super('Sequence', [childrenRules], properties);
   }

   getRegex(groubIndex) {
      groubIndex = groubIndex || {
         num: 0,
         increase: function (step = 1) {
            this.num += step;
         }
      };
      this.index = { ...groubIndex };

      //#region getting regex
      let regex = '';
      this.childrenRules.forEach(child => {
         regex += child.getRegex(groubIndex.increase());
         if (properties.spaced) {
            regex += `\\s*`;
         }
      });
      if (properties.spaced) {
         regex = regex.slice(0, -('\\s*'.length));
      }
      //#endregion

      return `(${regex})\\s*`;
   }

}