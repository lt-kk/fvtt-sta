import { ChallengeRoll, ChallengeRollData } from "../../roll/challange/ChallangeRoll";
import { getActor, getRollData } from "../../util/message";
import { actorSystem, update } from "../../util/document";
import { currentTargets } from "../../util/user";
import { StaEntity } from "../../model/StaSystemDocument";
import { StaSystemActor } from "../../actor/StaSystemActor";
import { Breach, StaStarship, StaStarshipSystems } from "../../actor/starship/StaStarship";
import { StaStarshipWeapon } from "./StaStarshipWeapon";
import { LooseObject, randomIndex } from "../../util/util";
import { tplPath } from "../../template/TemplateHelpers";


export function weaponRoll(source: StaEntity, dicePool: number, targetSystem?: keyof StaStarshipSystems) {
  const rollData: StarshipWeaponRollData = {
    result: undefined,
    actions: { simple: 0, task: 1 },
    source: source,
    dicePool: dicePool,
    targetSystem: targetSystem,
  };
  return new StarshipWeaponRoll("", rollData);
}

export type StarshipWeaponRollData = ChallengeRollData & {
  targetSystem?: keyof StaStarshipSystems
}

export class StarshipWeaponRoll extends ChallengeRoll<StarshipWeaponRollData> {
  init() {
    super.init();
    this.tpl.additionalData = tplPath("item/starshipweapon/StarshipWeaponRollData.hbs")
  }

  handleAction(message: ChatMessage, action: string, formData: LooseObject<any>) {
    super.handleAction(message, action, formData);
    if (action == "applyDamage") this.handleDamage(message);
  }

  private handleDamage(message: ChatMessage) {
    const targets = currentTargets();
    const rollData = getRollData<StarshipWeaponRollData>(message);
    targets.forEach((target) => {
      if (target.sta instanceof StaStarship) {
        this.applyDamage(getActor(message), rollData, target, target.sta);
      }
    });
  }

  private applyDamage(attacker: Actor, rollData: StarshipWeaponRollData, target: StaSystemActor, sta: StaStarship) {
    const weapon = rollData.source as StaStarshipWeapon;
    const qualities = weapon.qualities;
    const { successes, effects } = rollData.result!;

    const damage = successes + (qualities.viciousx * effects);
    const protection = Math.max(0, sta.resistance - (qualities.piercingx * effects));
    const change = Math.max(0, damage - protection);
    if (change == 0) return;

    const shields = Math.max(0, actorSystem(target).shields.value - change);

    const breaches: Breach[] = [];
    if (change >= 5) {
      breaches.push({ system: this.determineSystem(sta.systems, rollData.targetSystem), value: 1 });
    }
    if (shields == 0) {
      breaches.push({ system: this.determineSystem(sta.systems, rollData.targetSystem), value: 1 });
    }
    if (qualities.highyield && breaches.length > 0) {
      const idx = randomIndex(breaches.length);
      breaches[idx].value++;
    }

    const changes: LooseObject<any> = {
      "shields.value": shields,
    };
    breaches.forEach((breach) => {
      const system = sta.systems[breach.system];
      changes[`systems.${breach.system}.breaches`] = Math.min(sta.scale + 1, system.breaches + breach.value);
    });
    update(target, changes);
  }

  private determineSystem(systems: StaStarshipSystems, targetSystem?: keyof StaStarshipSystems): keyof StaStarshipSystems {
    if (targetSystem) return targetSystem;
    const keys = Object.keys(systems);
    return keys[randomIndex(keys.length)] as keyof StaStarshipSystems;
  }

}