import { sta } from "../config";
import { LooseObject } from "../util/util";
import { StaRoll, StaRollData, StaRollDice, StaRollResult } from "./StaRoll";


export type TaskRollData = LooseObject<any> & StaRollData<TaskRollResult> & {
  target: number;
  double: number;
  complication: number;
  determination: boolean;
  result: TaskRollResult;
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
  successes: number;
  complications: number;

  constructor(dice: TaskRollDice[]) {
    this.dice = dice;
    this.successes = this.dice
      .map((d) => d.successes)
      .reduce((p, c) => p + c);
    this.complications = this.dice
      .map((d) => d.complications)
      .reduce((p, c) => p + c);
  }
}

export class TaskRoll extends StaRoll<TaskRollData, TaskRollResult> {
  chatTemplate = `${sta.templateBasePath}/roll/TaskRollChat.hbs`;

  constructor(
    _: string, data: TaskRollData, options?: Roll["options"],
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
    let results = this.dice.flatMap((term) => term.results)
      .map((d) => this.resultToDice(d.result, data));
    if (data.determination) results.push(new TaskRollDice(1, 20, 0, true));
    return new TaskRollResult(results);
  }

  private resultToDice(value: number, data: LooseObject<any> & TaskRollData & {
    dicePool: number;
    target: number;
    double: number;
    complication: number;
    determination: boolean
  }) {
    return new TaskRollDice(
      value,
      value <= data.double ? 2 : value <= data.target ? 1 : 0,
      value >= 20 - data.complication ? 1 : 0,
    );
  }

  getResultCSS(dice: TaskRollDice): (string | null)[] {
    return [
      dice.successes == 1 ? "success" : null,
      dice.successes == 2 ? "critical" : null,
      dice.complications > 0 ? "complication" : null,
      dice.determination ? "determination" : null,
    ];
  }
}
