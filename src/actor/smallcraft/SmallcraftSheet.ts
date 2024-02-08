import { StaSmallcraft } from "./StaSmallcraft";
import { challengeRoll } from "../../roll/challange/ChallangeRoll";
import { BaseActorSheet } from "../BaseActorSheet";
import { itemSystem } from "../../util/document";
import { StaSystemItem } from "../../item/StaSystemItem";
import { weaponRoll } from "../../item/starshipweapon/StarshipWeaponRoll";
import { tplPath } from "../../template/TemplateHelpers";
import { sta } from "../../config";
import { starshipTaskRoll } from "./SmallcraftTaskRoll";

export class SmallcraftSheet extends BaseActorSheet<StaSmallcraft> {
  static templatePath = tplPath("actor/smallcraft/SmallcraftSheet.hbs");

  get template() {
    return SmallcraftSheet.templatePath;
  }

  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["sta-app", "actor-sheet", "starship-sheet", "smallcraft-sheet"],
      width: 580,
      height: 660,
      dragDrop: [{
        dragSelector: ".item-list .item",
        dropSelector: null,
      }],
    });
  }

  async rollTask(dicePool: number) {
    const roll = await starshipTaskRoll(this.sta!, dicePool);
    return roll.toMessage({
      title: sta.game.i18n.localize("sta.roll.task"),
      speaker: ChatMessage.getSpeaker({ actor: this.actor }),
    });
  }

  async rollChallenge(dicePool: number) {
    const roll = challengeRoll(this.sta, dicePool);
    return roll.toMessage({
      title: sta.game.i18n.localize("sta.roll.challenge"),
      speaker: ChatMessage.getSpeaker({ actor: this.actor }),
    });
  }

  async rollWeapon(html: JQuery) {
    const itemId = html.closest(".item").data("itemId");
    const item = this.actor.items.get(itemId)! as StaSystemItem;
    const damage = Math.abs(itemSystem(item).damage);
    const scale = this.sta?.scale;
    const security = Math.abs(this.sta?.departments.security!);
    const roll = weaponRoll(item.sta!, damage + scale + security);
    return roll.toMessage({
      title: sta.game.i18n.localize("sta.roll.damage"),
      speaker: ChatMessage.getSpeaker({ actor: this.actor }),
    });
  }
}