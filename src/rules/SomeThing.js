import Rule from './Rule.js';
import Node from '../Node.js';
import { getGroupsNumInReg, strTOreg } from './../global.js';

export default class SomeThing extends Rule {
   /**
    * @param {Object} properties set proberties to the Rule:
    * name, "value" to search for
    * 
    */
   constructor(properties) {
      if (!properties.regex) throw new Error('the SomeThing rule must have test property');
      properties.regex = properties.value instanceof RegExp ? properties.value : strTOreg(properties.value);
      properties.groupsNumInside = getGroupsNumInReg(properties.regex);
      super('SomeThing', 0, [], properties);
   }

   getRegex(groubIndex = 0) {
      groubIndex = groubIndex || {
         num: 0,
         increase: function (step = 1) {
            this.num += step;
            return this;
         }
      };
      this.index = groubIndex.num;
      groubIndex.increase(this.groupsNumInside);

      return `(${this.regex})`;
   }

   parse(groups, useValue) {

      let value = useValue || groups[this.index + 1];
      let args = [];

      //#region getting args
      if (parser) {
         args.push(parser.parse(value));
      }
      //#endregion

      return new Node(this.name, args, {
         match: value,
      });

   }


}