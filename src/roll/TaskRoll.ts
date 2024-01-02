import { sta } from "../config";
import { LooseObject } from "../util/util";
import { StaRoll, StaRollData, StaRollDice, StaRollResult } from "./StaRoll";


export type TaskRollData = LooseObject<any> & StaRollData & {
  dicePool: number;
  target: number;
  double: number;
  complication: number;
  determination: boolean;
}

export class TaskRollDice implements StaRollDice {
  value: number;
  successes: number;
  complications: number;
  determination: boolean;

  constructor(value: number, successes: number, complications: number, determination = false) {
    this.value = value;
    this.successes = successes;
    this.complications = complications;
    this.determination = determination;
  }
}

export class TaskRollResult implements StaRollResult<TaskRollDice> {
  dice: TaskRollDice[] = [];

  get successes() {
    return this.dice
      .map((d) => d.successes)
      .reduce((p, c) => p + c);
  }

  get complications() {
    return this.dice
      .map((d) => d.complications)
      .reduce((p, c) => p + c);
  }
}

export class TaskRoll extends StaRoll<TaskRollData, TaskRollResult> {
  type = "task";

  constructor(
    formula: string, data: TaskRollData, options?: Roll["options"],
  ) {
    const maxPool = sta.settings.maxD20 - (data.determination ? -1 : 0);
    const pool = Math.min(Math.max(data.dicePool, 1), maxPool);
    super(`${pool}d20`, {
      ...data,
      dicePool: pool,
      target: Math.min(Math.max(data.target, 1), 20),
      double: Math.min(Math.max(data.double, 1), 20),
      complication: Math.min(Math.max(data.complication, 0), 5),
      determination: data.determination,
    } as TaskRollData, options);
  };

  evaluateSta(data: TaskRollData): TaskRollResult {
    const result = new TaskRollResult();
    this.dice.forEach((term) => {
      term.results.forEach((d => {
        const value = d.result;
        result.dice.push(this.resultToDice(value, data, term));
      }));
    });
    if (data.determination) result.dice.push(new TaskRollDice(1, 20, 0, true));
    return result;
  }

  private resultToDice(value: number, data: LooseObject<any> & StaRollData & {
    dicePool: number;
    target: number;
    double: number;
    complication: number;
    determination: boolean
  }, term: DiceTerm) {
    return new TaskRollDice(
      value,
      value <= data.double ? 2 : value <= data.target ? 1 : 0,
      value >= term.faces - data.complication ? 1 : 0,
    );
  }

  getResultCSS(dice: TaskRollDice): (string | null)[] {
    return [
      dice.successes > 0 ? "success": null,
      dice.complications > 0 ? "failure" : null,
      dice.determination ? "determination" : null,
    ];
  }
}
