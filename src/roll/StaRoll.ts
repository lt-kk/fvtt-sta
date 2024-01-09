import { sta } from "../config";
import { ConfiguredDocumentClass } from "@league-of-foundry-developers/foundry-vtt-types/src/types/helperTypes";
import {
  ChatMessageDataConstructorData,
} from "@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/data.mjs/chatMessageData";
import { HasActivateListeners } from "../util/message";
import { StaEntity } from "../model/StaSystemDocument";
import { StaDialog } from "../app/StaDialog";
import { tplPath } from "../template/TemplateHelpers";
import { LooseObject } from "../util/util";

export interface StaRollData<R extends StaRollResult<StaRollDice>> extends LooseObject<any> {
  dicePool: number;
  result: R | undefined;
  source: StaEntity | undefined;
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
    console.log(chatData);
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
    html.find("button").on("click", ((event: JQuery.ClickEvent) => this.handleButton(event, message)));
  }

  handleButton(event: JQuery.ClickEvent, message: ChatMessage) {
    event.preventDefault();
  }
}


export async function rollDataDialog<D extends StaRollData<any>>(rollData: D, template: string): Promise<D> {
  const htmlContent = await renderTemplate(tplPath(template), {
    roll: rollData,
    settings: sta.settings,
  });
  return new Promise<D>((resolve) => {
    const dialog = new RollDialog(htmlContent, (values: LooseObject<any>) => {
      resolve(mergeObject(rollData, values) as D);
    });
    dialog.render(true);
  });
}

export class RollDialog extends StaDialog {
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      width: 200,
    });
  }

  constructor(htmlContent: string, callback: (values: LooseObject<any>) => void) {
    super({
      title: sta.game.i18n.localize("sta.task.roll.title"),
      content: htmlContent,
      buttons: {
        roll: {
          label: sta.game.i18n.localize("sta.task.roll.confirm"),
          callback: (html: HTMLElement | JQuery<HTMLElement>) => {
            let values: LooseObject<any> = {};
            $(html).find("form").serializeArray().forEach((entry) => {
              values[entry.name] = entry.value;
            });
            console.log(values);
            callback(values);
          },
        },
      },
    });
  }
}