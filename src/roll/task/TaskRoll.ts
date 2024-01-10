import { sta } from "../../config";
import { LooseObject } from "../../util/util";
import { StaRoll, StaRollData, StaRollDice, StaRollResult, StaRollTemplates } from "../StaRoll";
import { tplPath } from "../../template/TemplateHelpers";


export type TaskRollData = StaRollData<TaskRollResult> & {
  target: number;
  double: number;
  complication: number;
  determination: boolean;
}

export class TaskRollDice implements StaRollDice {
  faces: number;
  value: number;
  successes: number;
  complications: number;
  determination: boolean;

  constructor(
    faces: number,
    value: number,
    successes: number,
    complications: number,
    determination = false
  ) {
    this.faces = faces
    this.value = value;
    this.successes = successes;
    this.complications = complications;
    this.determination = determination;
  }
}

export class TaskRollResult implements StaRollResult<TaskRollDice> {
  rolls: TaskRollDice[][];
  successes: number;
  complications: number;

  constructor(rolls: TaskRollDice[][]) {
    this.rolls = rolls;
    this.successes = this.rolls
      .flatMap((r) => r)
      .map((d) => d.successes)
      .reduce((p, c) => p + c);
    this.complications = this.rolls
      .flatMap((r) => r)
      .map((d) => d.complications)
      .reduce((p, c) => p + c);
  }
}

export class TaskRoll extends StaRoll<TaskRollData, TaskRollResult> {

  constructor(
    _: string, data: TaskRollData, options?: Roll["options"],
  ) {
    const maxPool = sta.settings.maxD20 - (data.determination ? -1 : 0);
    const pool = Math.min(Math.max(data.dicePool, 1), maxPool);
    const rollData: TaskRollData = {
      ...data,
      dicePool: pool,
      target: Math.min(Math.max(data.target, 1), 20),
      double: Math.min(Math.max(data.double, 1), 20),
      complication: Math.min(Math.max(data.complication, 1), 5),
      determination: data.determination,
    };
    super(`${pool}d20`, rollData, options);
  };

  evaluateSta(data: TaskRollData): TaskRollResult {
    let results = this.dice
      .map((t) => {
        return t.results.map((r => {
          return this.resultToDice(t.faces, r.result, data);
        }))
      });
    if (data.determination) {
      results.push([new TaskRollDice(20, 1, 2, 0, true)]);
    }
    return new TaskRollResult(results);
  }

  private resultToDice(faces: number, value: number, data: LooseObject<any> & TaskRollData & {
    dicePool: number;
    target: number;
    double: number;
    complication: number;
    determination: boolean
  }) {
    return new TaskRollDice(
      faces,
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
