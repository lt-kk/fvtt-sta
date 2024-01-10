import { ChallengeRoll, ChallengeRollData } from "../../roll/challange/ChallangeRoll";
import { getActor, getRollData } from "../../util/message";
import { actorSystem, update } from "../../util/document";
import { filterArmor } from "../armor/StaArmor";
import { currentTargets } from "../../util/user";
import { StaSystemActor } from "../../actor/StaSystemActor";
import { StaCharacterWeapon } from "./StaCharacterWeapon";
import { StaCharacter } from "../../actor/character/StaCharacter";
import { tplPath } from "../../template/TemplateHelpers";
import { rollDataDialog } from "../../roll/RollDialog";
import { LooseObject } from "../../util/util";


export async function weaponRoll(source: StaCharacterWeapon, security: number, damage: number) {
  let rollData: ChallengeRollData = {
    result: undefined,
    actions: { simple: 0, task: 1 },
    dicePool: security + damage,
    source: source,
    security: security,
    damage: damage,
  };
  rollData = await rollDataDialog(rollData, "item/characterweapon/CharacterWeaponRollDialog.hbs");
  if (rollData.charged == "area") source.qualities.area = true;
  if (rollData.charged == "viciousx") source.qualities.viciousx = 1;
  if (rollData.charged == "piercingx") source.qualities.piercingx = 2;
  if (rollData.charged != "none") rollData.actions.simple++;
  return new CharacterWeaponRoll("", rollData);
}


export class CharacterWeaponRoll extends ChallengeRoll<ChallengeRollData> {


  handleAction(message: ChatMessage, action: string, formData: LooseObject<any>) {
    if(action == "applyDamage") this.handleDamage(message);
  }

  private handleDamage(message: ChatMessage) {
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