import { Day } from '../day'

export default class Day05 extends Day {
  constructor () {
    super("05");
  }

  getUpdates(updatesString: string): number[][] {
    return updatesString.split("\n").map(update => update.split(",").map(value => parseInt(value)));
  }


  getRules(rulesString: string): number[][] {
    return rulesString.split("\n").map(pair => pair.split("|").map(value => parseInt(value)));
  }

  isUpdateValid(update: number[], printRules: Map<number, number[]>) {
    let rtnValue = true;
    update.forEach(value => {
      const successors = printRules.get(value);
      if (successors) {
        const successorsInUpdate = successors.filter(successor => update.includes(successor));
        const validSuccessorsInUpdate = successorsInUpdate.filter(successor => update.indexOf(successor) > update.indexOf(value));
        if (!(validSuccessorsInUpdate.length == successorsInUpdate.length)) {
          rtnValue = false;
        }
      }
    });
    return rtnValue;
  }

  createRulesMapping(rulePairs: number[][]) {
    let rules = new Map<number, number[]>();
    rulePairs.forEach(pair => {
      if (!(rules.has(pair[0]))) {
        rules.set(pair[0], []);
      }
      rules.get(pair[0])?.push(pair[1]);
    });
    return rules;

  }

  filterRules(update: number[], rules: number[][]): number[][] {
    return rules.filter(rule => {
      return ((update.includes(rule[0])) && (update.includes(rule[1])))
    });
  }

  partOne (input: string): string {
    const inputSections = input.split("\n\n");
    const rules = this.getRules(inputSections[0]);
    const updates = this.getUpdates(inputSections[1]);

    const validUpdates = updates.filter(update => {

      const ruleMapping = this.createRulesMapping(
        this.filterRules(update, rules)
      );

      return this.isUpdateValid(update, ruleMapping);
    });

    const centerValues = validUpdates.map(update => {
      return update[(update.length - 1) / 2];
    });

    return centerValues.reduce((value1, value2) => value1 + value2).toString();
  }

  partTwo (input: string): string {
    return "";
  }
}