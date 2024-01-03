import {ChallengeRoll, ChallengeRollData} from "../../roll/ChallangeRoll";
import {sta} from "../../config";
import {getActor, getRollResult} from "../../util/message";
import {actorSystem, update} from "../../util/document";
import {filterArmor} from "../armor/StaArmor";
import {currentTargets} from "../../util/user";


export function weaponRoll(dicePool: number) {
  return new CharacterWeaponRoll("", {
    dicePool: dicePool,
  } as ChallengeRollData);
}


export class CharacterWeaponRoll extends ChallengeRoll {
  chatTemplate = `${sta.templateBasePath}/item/characterweapon/CharacterWeaponRollChat.hbs`

  handleButton(event: JQuery.ClickEvent, message: ChatMessage) {
    const actor = getActor(message);
    switch ($(event.currentTarget).data("action")) {
      case "applyDamage":
        this.applyDamage(actor, message);
        break;
    }
  }

  private applyDamage(actor: Actor, message: ChatMessage) {
    const target = currentTargets()[0]
    const damage = getRollResult(message).successes;
    const protection = this.getArmorProtection(target);
    const change = damage - protection

    if (change <= 0) return;
    if (change >= 5) {
      // TODO add injury
    }
    update(target, {
      stress: actorSystem(target).stress - change
    });
  }

  getArmorProtection(target: Actor): number {
    return filterArmor(target)
      .filter((armor) => armor.equipped)
      .map((armor) => armor.protection)
      .reduce((a, b) => a + b);
  }
}