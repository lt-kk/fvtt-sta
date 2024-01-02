import { LooseObject } from "../util/util";
import { sta } from "../config";
import { StaRoll, StaRollData, StaRollDice, StaRollResult } from "./StaRoll";


export type ChallengeRollData = LooseObject<any> & StaRollData<ChallengeRollResult>


export class ChallengeRollDice implements StaRollDice {
  value: number;
  successes: number;
  effects: number;

  constructor(value: number, successes: number, effects: number) {
    this.value = value;
    this.successes = successes;
    this.effects = effects;
  }
}


export class ChallengeRollResult implements StaRollResult<ChallengeRollDice> {
  dice: ChallengeRollDice[] = [];

  get successes() {
    return this.dice
      .map((d) => d.successes)
      .reduce((p, c) => p + c);
  }

  get effects() {
    return this.dice
      .map((d) => d.effects)
      .reduce((p, c) => p + c);
  }
}


export class ChallengeRoll extends StaRoll<ChallengeRollData, ChallengeRollResult> {
  template = `${sta.templateBasePath}/roll/ChallengeRoll.hbs`

  constructor(
    _: string, data: ChallengeRollData, options?: Roll["options"],
  ) {
    const pool = Math.min(Math.max(data.dicePool, 1), sta.settings.maxD6);
    super(`${pool}d6`, {
      ...data,
      dicePool: pool,
    } as ChallengeRollData, options);
  }

  evaluateSta(data: ChallengeRollData): ChallengeRollResult {
    const result = new ChallengeRollResult();
    this.dice.forEach((term) => {
      term.results.forEach((d => {
        const value = d.result;
        result.dice.push(this.resultToDice(value));
      }));
    });
    return result;
  }


  private resultToDice(value: number) {
    return new ChallengeRollDice(
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


export function challengeRoll(dicePool: number) {
  return new ChallengeRoll("", {
    dicePool: dicePool,
  } as ChallengeRollData);
}
