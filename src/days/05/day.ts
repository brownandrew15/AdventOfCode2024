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

  createRulesMapping(rulePairs: number[][]) {
    let rules = new Map<number, number[]>();
    rulePairs.forEach(pair => {
      if (!(rules.has(pair[1]))) {
        rules.set(pair[1], []);
      }
      rules.get(pair[1])?.push(pair[0]);
    });
    return rules;

  }

  isUpdateValid(update: number[], printRules: Map<number, number[]>) {
    let rtnValue = true;
    update.forEach(value => {
      const predecessors = printRules.get(value);
      if (predecessors) {
        const predecessorsInUpdate = predecessors.filter(successor => update.includes(successor));
        const validPredecessorsInUpdate = predecessorsInUpdate.filter(successor => update.indexOf(successor) < update.indexOf(value));
        if (!(validPredecessorsInUpdate.length == predecessorsInUpdate.length)) {
          rtnValue = false;
        }
      }
    });
    return rtnValue;
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


  sortUpdate(update: number[], ruleMapping: Map<number, number[]>): number[] {
    const newUpdate = update.map(update => update);
    let changed = true;
    while (changed) {
      let changedOnPass = false;
      for (let i=1; i < newUpdate.length; i++) {
        if (ruleMapping.get(newUpdate[i-1])?.includes(newUpdate[i])) {
          const temp = newUpdate[i];
          newUpdate[i] = newUpdate[i-1];
          newUpdate[i-1] = temp;
          changedOnPass = true;
        }
      }
      changed = changedOnPass
    }
    return newUpdate;
  }

  partTwo (input: string): string {
    const inputSections = input.split("\n\n");
    const rules = this.getRules(inputSections[0]);
    const updates = this.getUpdates(inputSections[1]);

    const correctedUpdates = updates.map(update => {
      const ruleMapping = this.createRulesMapping(
        this.filterRules(update, rules)
      );
      if (this.isUpdateValid(update, ruleMapping)) return [];

      return this.sortUpdate(update, ruleMapping);

    }).filter(update => update.length > 0);

    const centerValues = correctedUpdates.map(update => {
      return update[(update.length - 1) / 2];
    });

    return centerValues.reduce((value1, value2) => value1 + value2).toString();
  }
}