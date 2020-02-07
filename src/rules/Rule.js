export default class Rule {


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
      /**
       * 
       * there is something called rootPaser, this value wil be set inside the constructor of Parser class.
       * 
       * 
       * 
       */
   }


   getRegex(groubIndex) {
      return '';
   }

   parse(groups, useValue) {
      /**
      * "useValue" is here to be used in the Repeat rule while parsing
      */
      throw new Error("You mustn't call this function directly from the abstract class Rule.");
   }


}