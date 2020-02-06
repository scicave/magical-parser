import Rule from './Rule.js';
import Node from '../Node.js';
import { getGroupsNumInReg } from '../global.js';
export default class Repeat extends Rule {
   constructor(properties) {

      if (properties.opening && properties.closing) {
         properties.content = properties.content || 'all';

         properties.groupsNumInside = 0; /// if the content is regex, we should take care of the groups inside

         if (!(properties.content instanceof Rule)) {
            if (properties.content instanceof RegExp) {
               properties.content = properties.content.source;
            } else {
               properties.content = (properties.content === 'all') ? '(?:.*?|\\s)*?' : properties.content;
            }
            properties.groupsNumInside += getGroupsNumInReg(properties.content);
         }

         // properties.test = `${properties.opening}${properties.content}${properties.closing}`;
      } else if (!properties.test) {
         throw new Error('Error on defining your block, you should define the opening and closing properties as the regex or the text');
      }

      super('Block', 0, [], properties);

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
      let content;
      if (this.content instanceof Rule) {
         content = this.content.getRegex(groubIndex.increase());
      } else {
         groubIndex.increase(this.groupsNumInside + 1);
         content = '(' + this.content + ')';
      }
      let regex = `${this.opening}\\s*${content}\\s*${this.closing}`;
      this.regex = regex;
      return `(${regex})`;
   }

   parse(groups, useValue) {

      let value = useValue || groups[this.index + 1];
      let args = [];

      //#region getting args
      if (this.content instanceof Rule) {
         args = this.content.parse(groups);
      } else if (this.parser) {
         args = this.parser.parse(groups[this.index + 1]);
      }
      //#endregion

      return new Node(this.name, args, {
         match: value,
         content: groups[this.index + 2]
      });

   }


}