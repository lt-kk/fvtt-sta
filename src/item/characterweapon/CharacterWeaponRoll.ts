import { ChallengeRoll, ChallengeRollData } from "../../roll/ChallangeRoll";
import { sta } from "../../config";
import { getActor, getRollData } from "../../util/message";
import { actorSystem, update } from "../../util/document";
import { filterArmor } from "../armor/StaArmor";
import { currentTargets } from "../../util/user";
import { StaEntity } from "../../model/StaSystemDocument";
import { StaSystemActor } from "../../actor/StaSystemActor";
import { StaCharacterWeapon } from "./StaCharacterWeapon";
import { StaCharacter } from "../../actor/character/StaCharacter";
import { tplPath } from "../../template/TemplateHelpers";


export function weaponRoll(source: StaEntity, dicePool: number) {
  return new CharacterWeaponRoll("", {
    source: source,
    dicePool: dicePool,
  } as ChallengeRollData);
}


export class CharacterWeaponRoll extends ChallengeRoll<ChallengeRollData> {
  chatTemplate = tplPath("item/characterweapon/CharacterWeaponRollChat.hbs");

  handleButton(event: JQuery.ClickEvent, message: ChatMessage) {
    const actor = getActor(message);
    switch ($(event.currentTarget).data("action")) {
      case "applyDamage":
        this.handleDamage(actor, message);
        break;
    }
  }

  private handleDamage(actor: Actor, message: ChatMessage) {
    const targets = currentTargets();
    const rollData = getRollData<ChallengeRollData>(message);
    targets.forEach((target) => {
      if (target.sta instanceof StaCharacter) {
        this.applyDamage(getActor(message), rollData, target, target.sta);
      }
    });
  }

  private applyDamage(attacker: Actor, rollData: ChallengeRollData, target: StaSystemActor, sta: StaCharacter) {
    const weapon = rollData.source as StaCharacterWeapon;
    const qualities = weapon.qualities;
    const { successes, effects } = rollData.result!;

    const damage = successes + (qualities.viciousx * effects);
    const protection = Math.max(0, this.getArmorProtection(target) - (qualities.piercingx * effects));
    const change = Math.max(0, damage - protection);
    if (change == 0) return;

    const stress = Math.max(0, actorSystem(target).stress.value - change);

    if (change >= 5) {
      sta.addInjury(attacker.name!);
    }
    if (stress == 0) {
      sta.addInjury(attacker.name!);
    }
    update(target, {
      "stress.value": stress,
    });
  }

  getArmorProtection(target: Actor): number {
    return filterArmor(target)
      .filter((armor) => armor.equipped)
      .map((armor) => armor.protection)
      .reduce((a, b) => a + b, 0);
  }
}