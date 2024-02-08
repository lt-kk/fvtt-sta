import { filterStarshipWeapon, StaStarshipWeapon } from "../../item/starshipweapon/StaStarshipWeapon";
import { filterThing, StaThing } from "../../item/thing/StaThing";
import { filterTalent, StaTalent } from "../../item/talent/StaTalent";
import { actorItems, actorSystem, update } from "../../util/document";
import { LooseObject, sumAttributes } from "../../util/util";
import { StaActor } from "../StaActor";
import { sta } from "../../config";
import { CurrentValue } from "../../model/CurrentValue";
import {
  StaStarshipDepartments,
  StaStarshipSystem,
  StaStarshipSystems,
  StaStarshipTaskRoll,
} from "../starship/StaStarship";

export function createSmallcraft(document: Actor): StaSmallcraft {
  return new StaSmallcraft(
    document.id!,
    document.name!,
    document.img,
    actorSystem(document),
    actorItems(document),
  );
}

export class StaSmallcraft extends StaActor {
  notes: string;
  spaceframe: string;
  scale: number;
  resistance: number;

  systems: StaStarshipSystems;
  departments: StaStarshipDepartments;

  shields: CurrentValue;
  power: CurrentValue;

  talents: StaTalent[] = [];
  things: StaThing[] = [];
  weapons: StaStarshipWeapon[] = [];

  taskRoll: StaStarshipTaskRoll;

  constructor(
    id: string,
    name: string,
    img: string | null,
    {
      notes = "",
      spaceframe = "",
      scale = 1,
      resistance = 1,
      systems = {},
      departments = {},
      shields = {
        "value": 8,
        "max": 8,
      },
      power = {
        "value": 7,
        "max": 7,
      },
      taskRoll = {},
    } = {},
    items: Collection<Item>,
  ) {
    super(id, name, img);
    this.spaceframe = spaceframe;
    this.scale = scale;
    this.resistance = resistance;
    this.notes = notes;
    this.systems = new StaStarshipSystems(systems);
    this.departments = new StaStarshipDepartments(departments);
    this.shields = new CurrentValue(shields.value, shields.max);
    this.power = new CurrentValue(power.value, power.max);

    this.talents = filterTalent(items);
    this.things = filterThing(items);
    this.weapons = filterStarshipWeapon(items);

    this.taskRoll = new StaStarshipTaskRoll(taskRoll);
  }

  derivedValues() {
    this.shields.max = this.systems.structure.effective + this.departments.security;
    this.power.max = this.systems.engines.effective;
    this.applyRules();
    this.systemStatus();
    return {};
  }

  allRules() {

  }

  _rulesApplied = false;

  applyRules() {
    if (this._rulesApplied) return;
    this.talents.forEach((i) => i.rule?.run(this));
    this.things.forEach((i) => i.rule?.run(this));
    this.weapons.forEach((i) => i.rule?.run(this));
    this._rulesApplied = true;
  }

  systemStatus() {
    Object.entries(this.systems).forEach(([_, system]) => {
      system.withScale(this.scale);
    });
  }

  get systemsSum(): number {
    return sumAttributes<StaStarshipSystem>(this.systems, (s) => s.value);
  }

  get departmentsSum(): number {
    return sumAttributes(this.departments, (v) => v as number);
  }

  resetStatus() {
    const actor = sta.game.actors!.get(this.id);
    const systems: LooseObject<{ breaches: number }> = {};
    Object.keys(this.systems).forEach((name) => {
      systems[name] = { breaches: 0 };
    });
    update(actor, {
      "shields.value": this.shields.max,
      "power.value": this.power.max,
      systems: systems,
    });
  }
}
