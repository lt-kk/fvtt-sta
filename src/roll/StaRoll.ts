import { sta } from "../config";
import { ConfiguredDocumentClass } from "@league-of-foundry-developers/foundry-vtt-types/src/types/helperTypes";
import {
  ChatMessageDataConstructorData,
} from "@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/data.mjs/chatMessageData";
import { HasActivateListeners } from "../util/message";

export interface StaRollData<R extends StaRollResult<StaRollDice>> {
  dicePool: number;
  result: R | null;
}

export interface StaRollDice {
  value: number;
  successes: number;
}

export interface StaRollResult<D extends StaRollDice> {
  dice: D[];
  successes: number;
}


export abstract class StaRoll<D extends StaRollData<R>, R extends StaRollResult<StaRollDice>>
  extends Roll<D> implements HasActivateListeners {

  toJSON() {
    const data = super.toJSON();
    return {
      ...data,
      data: this.data,
    };
  }

  _evaluateTotal() {
    if (this.data.result == null) {
      this.data.result = this.evaluateSta(this.data as D);
    }
    return this.data.result.successes;
  }

  abstract evaluateSta(data: D): R

  async render({
    flavor = null as string | null,
    template = Roll.CHAT_TEMPLATE,
    isPrivate = false,
  } = {}) {
    if (!this._evaluated) await this.evaluate({ async: true });
    const chatData = {
      formula: isPrivate ? "???" : this._formula,
      flavor: isPrivate ? null : flavor,
      user: sta.game.user?.id,
      tooltip: this.tooltipData(this.data as D),
      total: isPrivate ? "?" : Math.round((this.total || 0) * 100) / 100,
      staData: this.data,
    };
    return renderTemplate(template, chatData);
  }

  tooltipData(data: D) {
    return {
      ...data,
      rolls: data.result?.dice.map(d => {
        return {
          ...d,
          classes: this.getResultCSS(d).filterJoin(" "),
        };
      }),
    };
  }

  abstract getResultCSS(dice: StaRollDice): (string | null)[]

  abstract chatTemplate: string;

  async toMessage<T extends DeepPartial<ChatMessageDataConstructorData> = {}>(
    messageData: T,
    {
      rollMode = "roll" as keyof CONFIG.Dice.RollModes | "roll",
    } = {},
  ): Promise<InstanceType<ConfiguredDocumentClass<typeof ChatMessage>> | undefined> {
    if (messageData.content == null) {
      messageData.content = await this.render({ template: this.chatTemplate });
    }
    return super.toMessage(messageData, { rollMode: rollMode, create: true });
  }


  activateListeners(html: JQuery, message: ChatMessage) {
    html.find("button").on("click", (event) => {
      event.preventDefault();
      this.handleButton(event, message);
    });
  }

  handleButton(event: JQuery.ClickEvent, message: ChatMessage) {
  }
}