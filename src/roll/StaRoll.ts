import { sta } from "../config";
import { LooseObject } from "../util/util";
import { TaskRollData, TaskRollDice, TaskRollResult } from "./TaskRoll";

export interface StaRollData {
  dicePool: number;
}

export interface StaRollDice {
  value: number;
  successes: number;
}

export interface StaRollResult<D extends StaRollDice> {
  dice: D[];
  successes: number;
}



export abstract class StaRoll<D extends StaRollData, R extends StaRollResult<StaRollDice>> extends Roll {
  sta: R | null = null;

  toJSON() {
    const data = super.toJSON();
    return {
      ...data,
      data: this.data,
    };
  }

  _evaluateTotal() {
    if (this.sta == null) {
      this.sta = this.evaluateSta(this.data as D);
    }
    return this.sta.successes;
  }

  abstract evaluateSta(data: D): R

  abstract type: string;

  async render({
    flavor = null as string | null,
    template = Roll.CHAT_TEMPLATE,
    isPrivate = false,
  } = {}) {
    if (!this._evaluated) await this.evaluate({ async: true });
    const chatData = {
      type: this.type,
      formula: isPrivate ? "???" : this._formula,
      flavor: isPrivate ? null : flavor,
      user: sta.game.user?.id,
      tooltip: this.tooltipData(this.data as D, this.sta!),
      total: isPrivate ? "?" : Math.round((this.total || 0) * 100) / 100,
      staData: this.data,
      staResult: this.sta,
    };
    return renderTemplate(template, chatData);
  }

  tooltipData(data: D, result: R) {
    return {
      ...data,
      rolls: result.dice.map(d => {
        return {
          ...d,
          classes: this.getResultCSS(d).filterJoin(" ")
        }
      })
    };
  }

  abstract getResultCSS(dice: StaRollDice): (string | null)[]

}