import { sta } from "../../config";
import { StaStarship } from "./StaStarship";
import { starshipTaskRoll } from "./StarshipTaskRoll";
import { challengeRoll } from "../../roll/ChallangeRoll";
import { BaseActorSheet } from "../BaseActorSheet";
import { itemSystem } from "../../util/document";
import { StaSystemItem } from "../../item/StaSystemItem";
import { weaponRoll } from "../../item/starshipweapon/StarshipWeaponRoll";

export class StarshipSheet extends BaseActorSheet<StaStarship> {
  static templatePath = `${sta.templateBasePath}/actor/starship/StarshipSheet.hbs`;

  get template() {
    return StarshipSheet.templatePath;
  }

  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["sta-app", "actor-sheet", "starship-sheet"],
      width: 640,
      height: 870,
      dragDrop: [{
        dragSelector: ".item-list .item",
        dropSelector: null,
      }],
    });
  }

  async rollTask(dicePool: number) {
    const roll = starshipTaskRoll(this.sta!, dicePool);
    return roll.toMessage({
      speaker: ChatMessage.getSpeaker({ actor: this.actor }),
    });
  }

  async rollChallenge(dicePool: number) {
    const roll = challengeRoll(this.sta, dicePool);
    return roll.toMessage({
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
      speaker: ChatMessage.getSpeaker({ actor: this.actor }),
    });
  }
}