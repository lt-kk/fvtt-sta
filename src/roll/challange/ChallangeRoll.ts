import { sta } from "../../config";
import { StaRoll, StaRollData, StaRollDice, StaRollResult } from "../StaRoll";
import { StaEntity } from "../../model/StaSystemDocument";


export type ChallengeRollData = StaRollData<ChallengeRollResult>


export class ChallengeRollDice implements StaRollDice {
  faces: number;
  value: number;
  successes: number;
  effects: number;

  constructor(faces: number, value: number, successes: number, effects: number) {
    this.faces = faces;
    this.value = value;
    this.successes = successes;
    this.effects = effects;
  }
}


export class ChallengeRollResult implements StaRollResult<ChallengeRollDice> {
  rolls: ChallengeRollDice[][];
  successes: number;
  effects: number;


  constructor(rolls: ChallengeRollDice[][]) {
    this.rolls = rolls;
    this.successes = this.rolls
      .flatMap(r => r)
      .map((d) => d.successes)
      .reduce((p, c) => p + c);
    this.effects = this.rolls
      .flatMap(r => r)
      .map((d) => d.effects)
      .reduce((p, c) => p + c);
  }
}


export class ChallengeRoll<D extends ChallengeRollData> extends StaRoll<D, ChallengeRollResult> {

  constructor(
    _: string, data: D, options?: Roll["options"],
  ) {
    const pool = Math.min(Math.max(data.dicePool, 1), sta.settings.maxD6);
    const rollData: D = {
      ...data,
      dicePool: pool,
    };
    super(`${pool}d6`, rollData, options);
  }

  init() {
    super.init();
    this.title = sta.game.i18n.localize("sta.roll.challenge");
  }

  evaluateSta(data: ChallengeRollData): ChallengeRollResult {
    const results = this.dice.map((t) => {
      return t.results.map(r => {
        return this.resultToDice(t.faces, r.result);
      });
    });
    return new ChallengeRollResult(results);
  }


  private resultToDice(faces: number, value: number) {
    return new ChallengeRollDice(
      faces,
      value,
      value == 1 || value == 5 || value == 6 ? 1 : value == 2 ? 2 : 0,
      value == 5 || value == 6 ? 1 : 0,
    );
  }

  getResultCSS(dice: ChallengeRollDice): (string | null)[] {
    return [
      dice.successes > 0 ? "success" : null,
      dice.effects > 0 ? "effect" : null,
    ];
  }
}


export function challengeRoll(source: StaEntity, dicePool: number) {
  const rollData: ChallengeRollData = {
    result: undefined,
    actions: { simple: 0, task: 1 },
    source: source,
    dicePool: dicePool,
  };
  return new ChallengeRoll("", rollData);
}
