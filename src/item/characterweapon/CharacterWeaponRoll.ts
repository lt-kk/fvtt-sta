import {ChallengeRoll, ChallengeRollData} from "../../roll/ChallangeRoll";
import {sta} from "../../config";
import {getActor, getRollResult} from "../../util/message";
import {actorSystem, update} from "../../util/document";


export function weaponRoll(dicePool: number) {
  return new CharacterWeaponRoll("", {
    dicePool: dicePool,
  } as ChallengeRollData);
}


export class CharacterWeaponRoll extends ChallengeRoll {
  chatTemplate = `${sta.templateBasePath}/item/characterweapon/CharacterWeaponRoll.hbs`

  handleButton(event: JQuery.ClickEvent, message: ChatMessage) {
    const actor = getActor(message);
    switch ($(event.currentTarget).data("action")) {
      case "applyDamage":
        this.applyDamage(actor, message);
        break;
    }
  }

  private applyDamage(actor: Actor, message: ChatMessage) {
    const target = sta.game.user?.targets.first()!.actor!
    console.log(actor, target)

    const newStress =
      actorSystem(target).stress
      - Math.max(1, getRollResult(message).successes - this.getArmor(target))

    update(target, {stress: newStress});
  }

  getArmor(target: Actor): number {
    return 0;
  }
}