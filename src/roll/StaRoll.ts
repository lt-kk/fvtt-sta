import { sta } from "../config";
import { ConfiguredDocumentClass } from "@league-of-foundry-developers/foundry-vtt-types/src/types/helperTypes";
import {
  ChatMessageDataConstructorData,
} from "@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/data.mjs/chatMessageData";
import { getActor, HasActivateListeners } from "../util/message";
import { StaEntity } from "../model/StaSystemDocument";
import { formData, LooseObject } from "../util/util";
import { tplPath } from "../template/TemplateHelpers";

export interface StaRollData<R extends StaRollResult<StaRollDice>> extends LooseObject<any> {
  dicePool: number;
  result: R | undefined;
  source: StaEntity | undefined;
  actions: Actions;
}

export type Actions = {
  simple: number,
  task: number,
}

export abstract class StaRollDice {
  faces: number;
  value: number;
  rerolled: boolean;
  successes: number;

  rerollable: boolean;

  constructor(
    faces: number,
    value: number,
    rerolled: boolean,
    successes: number,
  ) {
    this.faces = faces;
    this.rerolled = rerolled ?? false;
    this.value = value;
    this.successes = successes;
    this.rerollable = !this.rerolled;
  }
}

export interface StaRollResult<D extends StaRollDice> {
  rolls: D[][];
  successes: number;
}


export abstract class StaRoll<D extends StaRollData<R>, R extends StaRollResult<StaRollDice>>
  extends Roll<D> implements HasActivateListeners {

  tpl: StaRollTemplates = new StaRollTemplates();

  title: string | undefined;

  actions: StaRollAction[] = [];

  constructor(
    formula: string, data: D, options?: Roll["options"],
  ) {
    super(formula, data, options);
    this.init();
  }

  init() {
    this.actions.push(new StaRollAction("reroll"));
  }

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
    title = this.title,
    flavor = undefined as string | undefined,
    isPrivate = false,
  } = {}) {
    if (!this._evaluated) await this.evaluate({ async: true });

    const chatData = {
      type: this.constructor.name.toLowerCase(),
      title: title,
      formula: isPrivate ? "???" : this._formula,
      flavor: isPrivate ? null : flavor,
      user: sta.game.user?.id,
      tpl: this.tpl,
      actions: this.actions,
      staData: this.data,
      rolls: this.addCssClasses(this.data.result!),
    };
    return renderTemplate(this.tpl.chat, chatData);
  }

  private addCssClasses(result: R) {
    return result?.rolls.map(r => {
      return r.map(d => {
        return {
          ...d,
          classes: this.getResultCSS(d).filterJoin(" "),
        };
      });
    });
  }

  abstract getResultCSS(dice: StaRollDice): (string | null)[]

  async toMessage<T extends DeepPartial<ChatMessageDataConstructorData> = {}>(
    messageData: T,
    {
      rollMode = "roll" as keyof CONFIG.Dice.RollModes | "roll",
      title = undefined as string | undefined,
    } = {},
  ): Promise<InstanceType<ConfiguredDocumentClass<typeof ChatMessage>> | undefined> {
    if (messageData.content == null) {
      messageData.content = await this.render({
        title: title,
      });
    }
    return super.toMessage(messageData, { rollMode: rollMode, create: true });
  }

  activateListeners(html: JQuery, message: ChatMessage) {
    html.find(".message-action").on("click", this._handleAction.bind(this, message));
  }

  private _handleAction(message: ChatMessage, event: JQuery.ClickEvent) {
    const el = $(event.currentTarget);
    const action = el.data("action");
    const data = formData(el);
    this.handleAction(message, action, data);
  }

  /** messages are restored from storage, so no references in action possible */
  handleAction(message: ChatMessage, action: string, formData: LooseObject<any>) {
    if (action == "reroll") this.handleReroll(message, formData);
  }


  private handleReroll(message: ChatMessage, formData: LooseObject<any>) {
    const terms = deepClone(this.terms);
    const checked = this.facesToReroll(formData, terms);

    checked.forEach((dice, faces) => {
      terms.push(new Die({ number: dice, faces: faces }));
    });

    const reroll = this.clone();
    reroll.data.result = undefined;
    reroll.terms = terms;
    return reroll.toMessage({
      speaker: ChatMessage.getSpeaker({ actor: getActor(message) }),
    });
  }

  private facesToReroll(formData: LooseObject<any>, terms: RollTerm[]) {
    const checked = new Map<number, number>;
    Object.keys(formData).forEach((name) => {
      const [, a, b] = name.split("-");
      const rollTerm = terms[parseInt(a)] as DiceTerm;
      rollTerm.results[parseInt(b)].rerolled = true;
      const faces = rollTerm.faces;
      checked.set(faces, (checked.get(faces) || 0) + 1);
    });
    return checked;
  }
}


export class StaRollTemplates {
  chat: string;
  formula: string;
  data: string;
  dice: string;
  result: string;
  actions: string;
  additionalData: string;

  constructor({
    chat = tplPath("roll/RollChat.hbs"),
    formula = tplPath("roll/RollFormula.hbs"),
    data = tplPath("roll/RollData.hbs"),
    dice = tplPath("roll/RollDice.hbs"),
    result = tplPath("roll/RollResult.hbs"),
    actions = tplPath("roll/RollActions.hbs"),
    additionalData = tplPath("template/Empty.hbs"),
  } = {}) {
    this.chat = chat;
    this.formula = formula;
    this.data = data;
    this.dice = dice;
    this.result = result;
    this.actions = actions;
    this.additionalData = additionalData;
  }
}


export class StaRollAction {
  name: string;
  title: string;
  icon: string | undefined;

  constructor(
    name: string,
    {
      title = undefined as string | undefined,
      icon = undefined as string | undefined,
    } = {},
  ) {
    this.name = name;
    this.title = title || sta.game.i18n.localize(`sta.roll.${name}`);
    this.icon = icon;
  }
}