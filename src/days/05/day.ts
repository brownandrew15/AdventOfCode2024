import { Day } from '../day'

export default class Day05 extends Day {
  constructor () {
    super("05");
  }

  createRules(rulesString: string) {
    let rules = new Map<number, number[]>();
    const rulePairs = rulesString.split("\n").map(pair => pair.split("|").map(value => parseInt(value)));


    rulePairs.forEach(pair => {
      if (!(rules.has(pair[0]))) {
        rules.set(pair[0], []);
      }
      rules.get(pair[0])?.push(pair[1]);
    });

    return rules;

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

  partOne (input: string): string {
    const inputSections = input.split("\n\n");
    const printRules = this.createRules(inputSections[0]);

    const updates = inputSections[1].split("\n").map(update => update.split(",").map(value => parseInt(value)));
    const validUpdates = updates.filter(update => {
      const status = this.isUpdateValid(update, printRules);
      return status;
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