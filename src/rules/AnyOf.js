import Rule from './Rule.js';

export default class AnyOf extends Rule {
   constructor(childrenRules, properties) {
      this.rulesNum = -1;
      if (childrenRules.length == 0) throw new Error('Sequence musn\t be void.');
      super('AnyOf', [childrenRules], properties);
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
         regex += child.getRegex(groubIndex.increase()) + '|';
      });
      //#endregion

      return `(${regex})\\s*`;
   }

}