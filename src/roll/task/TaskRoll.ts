import { sta } from "../../config";
import { StaRoll, StaRollData, StaRollDice, StaRollResult } from "../StaRoll";
import { tplPath } from "../../template/TemplateHelpers";


export type TaskRollData = StaRollData<TaskRollResult> & {
  target: number;
  double: number;
  complication: number;
  determination: boolean;
}

export class TaskRollDice extends StaRollDice {
  complications: number;
  determination: boolean;

  constructor(
    faces: number,
    value: number,
    rerolled: boolean,
    successes: number,
    complications: number,
    determination = false,
  ) {
    super(faces, value, rerolled, successes);
    this.complications = complications;
    this.determination = determination;

    this.rerollable = this.rerollable && !this.determination;
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
      .map((d) => d.rerolled ? 0 : d.successes)
      .reduce((p, c) => p + c);
    this.complications = this.rolls
      .flatMap((r) => r)
      .map((d) => d.rerolled ? 0 : d.complications)
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

  init() {
    super.init();
    this.tpl.formula = tplPath("roll/task/TaskRollFormula.hbs");
    this.tpl.additionalData = tplPath("roll/task/TaskRollData.hbs");
    this.title = sta.game.i18n.localize("sta.roll.task");
  }

  evaluateSta(data: TaskRollData): TaskRollResult {
    let results = this.dice
      .map((t) => {
        return t.results.map((r => {
          return this.resultToDice(t.faces, r, data);
        }));
      });
    if (data.determination) {
      results.push([new TaskRollDice(20, 1, false, 2, 0, true)]);
    }
    return new TaskRollResult(results);
  }

  private resultToDice(faces: number, result: DiceTerm.Result, data: TaskRollData & {
    dicePool: number;
    target: number;
    double: number;
    complication: number;
    determination: boolean
  }) {
    const value = result.result;
    return new TaskRollDice(
      faces,
      value,
      result.rerolled || false,
      value <= data.double ? 2 : value <= data.target ? 1 : 0,
      value >= 20 - data.complication ? 1 : 0,
    );
  }

  getResultCSS(dice: TaskRollDice): (string | null)[] {
    return [
      dice.rerolled ? "rerolled" : null,
      dice.successes == 1 ? "success" : null,
      dice.successes == 2 ? "critical" : null,
      dice.complications > 0 ? "complication" : null,
      dice.determination ? "determination" : null,
    ];
  }
}

