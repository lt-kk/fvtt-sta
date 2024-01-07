import { LooseObject } from "../util/util";
import { sta } from "../config";
import { StaRoll, StaRollData, StaRollDice, StaRollResult } from "./StaRoll";
import { StaEntity } from "../model/StaSystemDocument";


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
  dice: ChallengeRollDice[];
  successes: number;
  effects: number;


  constructor(dice: ChallengeRollDice[]) {
    this.dice = dice;
    this.successes = this.dice
      .map((d) => d.successes)
      .reduce((p, c) => p + c);
    this.effects = this.dice
      .map((d) => d.effects)
      .reduce((p, c) => p + c);
  }
}


export class ChallengeRoll<D extends ChallengeRollData> extends StaRoll<D, ChallengeRollResult> {
  chatTemplate = `${sta.templateBasePath}/roll/ChallengeRollChat.hbs`;

  constructor(
    _: string, data: D, options?: Roll["options"],
  ) {
    const pool = Math.min(Math.max(data.dicePool, 1), sta.settings.maxD6);
    super(`${pool}d6`, {
      ...data,
      dicePool: pool,
    } as D, options);
  }

  evaluateSta(data: ChallengeRollData): ChallengeRollResult {
    const results = this.dice.flatMap((term) => term.results)
      .map((d => this.resultToDice(d.result)));
    return new ChallengeRollResult(results);
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


export function challengeRoll(source: StaEntity, dicePool: number) {
  return new ChallengeRoll("", {
    source: source,
    dicePool: dicePool,
  } as ChallengeRollData);
}
