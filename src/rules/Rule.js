export default class Rule {

   /**
    * @param {Array} childrenRules 
    */
   constructor(ruleDefualtName, childrenNum, childrenRules, properties = {}) {
      properties.name = properties.name || ruleDefualtName;
      // if (!properties.parser) throw new Error('Magical Parser Rule "' + properties.name + '" Must Contian Parser');
      Object.assign(this, Object.assign(properties, this)); /// setting properities with no ovrriding
      this.childrenNum = childrenNum;
      if (childrenRules.length !== childrenNum && childrenNum > -1) throw Error('rules num in ' + (this.name + ' ' || '') + 'must be ' + this.rulesNum);
      for (let rule of childrenRules) {
         rule.parentRule = this;
      }
      this.childrenRules = childrenRules;
   }


   getRegex(groubIndex) {
      return '';
   }

   parse(groups, useValue) {
      throw new Error("You mustn't call this function directly from the abstract class Rule.");
   }


}