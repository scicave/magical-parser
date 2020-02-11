import Rule from './Rule.js';
import Node from '../Node.js';

export default class AnyOf extends Rule {
   constructor(childrenRules, properties) {
      if (childrenRules.length == 0) throw new Error('Sequence musn\t be void.');
      super('AnyOf', -1, childrenRules, properties);
   }

   getRegex(groubIndex) {
      groubIndex = groubIndex || {
         num: 0,
         increase: function (step = 1) {
            this.num += step;
            return this;
         }
      };
      this.index = groubIndex.num;

      //#region getting regex
      let regex = '';
      this.childrenRules.forEach(child => {
         regex += child.getRegex(groubIndex.increase()) + '|';
      });
      //#endregion

      return `(${regex})`;
   }

   parse(groups, useValue) {

      let value = useValue || groups[this.index + 1];
      let args = [];

      if (this.blockState) {
         value = value.replace(this.rootParser.matchesTest, (match, id, index) => {
            return this.rootParser.matches[id][index].str;
         });
      }

      //#region getting args
      for (let child of this.childrenRules) {
         if (groups.values[child.index]) {
            // this is the child being found
            args.push(child.parse(groups));
            break;
         }
      }
      //#endregion

      return new Node(this.name, args, {
         match: value
      });

   }

}