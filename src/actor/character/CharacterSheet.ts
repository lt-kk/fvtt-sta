import { sta } from "../../config";
import { StaCharacter } from "./StaCharacter";
import { characterTaskRoll } from "./CharacterTaskRoll";
import { challengeRoll } from "../../roll/ChallangeRoll";
import { weaponRoll } from "../../item/characterweapon/CharacterWeaponRoll";
import { itemSystem } from "../../util/document";

import { BaseActorSheet } from "../BaseActorSheet";
import { StaSystemItem } from "../../item/StaSystemItem";

export class CharacterSheet extends BaseActorSheet<StaCharacter> {
  static templatePath = `${sta.templateBasePath}/actor/character/CharacterSheet.hbs`;

  get template() {
    return CharacterSheet.templatePath;
  }

  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["sta-app", "actor-sheet", "character-sheet"],
      width: 710,
      height: 870,
      dragDrop: [{
        dragSelector: ".item-list .item",
        dropSelector: null,
      }],
    });
  }


  async rollTask(dicePool: number) {
    const roll = await characterTaskRoll(this.sta!, dicePool);
    roll.toMessage({
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
    const security = Math.abs(this.sta?.disciplines.security!);
    const roll = weaponRoll(item.sta!, damage + security);
    return roll.toMessage({
      speaker: ChatMessage.getSpeaker({ actor: this.actor }),
    });
  }

}

