import Rule from './Rule.js';

export default class Repeat extends Rule {
   constructor(properties) {

      if (properties.opening && properties.closing) {
         properties.content = properties.content || 'all';
         properties.content = properties.content === 'all' ? '.*?' : properties.content;
         properties.test = `${properties.opening}${properties.content}${properties.closing}`;
      } else if (!properties.test) {
         throw new Error('Error on defining your block');
      }

      this.rulesNum = 0;
      super('Block', [], properties);

   }

   getRegex(groubIndex) {
      groubIndex = groubIndex || {
         num: 0,
         increase: function (step = 1) {
            this.num += step;
         }
      };
      this.index = { ...groubIndex };
      let content = this.childrenRules[0].getRegex(groubIndex.increase());
      let regex = `(${this.test})\\s*`;
      return regex;
   }

}