import { filterRefit, StaRefit } from "../../item/refit/StaRefit";
import { filterStarshipWeapon, StaStarshipWeapon } from "../../item/starshipweapon/StaStarshipWeapon";
import { filterThing, StaThing } from "../../item/thing/StaThing";
import { filterLaunchbay, StaLaunchbay } from "../../item/launchbay/StaLaunchbay";
import { filterTalent, StaTalent } from "../../item/talent/StaTalent";
import { filterTrait, StaTrait } from "../../item/trait/StaTrait";
import { filterValue, StaValue } from "../../item/value/StaValue";
import { actorItems, actorSystem, update } from "../../util/document";
import { LooseObject, sumAttributes } from "../../util/util";
import { StaActor } from "../StaActor";
import { sta } from "../../config";
import { generatePills } from "../../model/ScalePill";
import { CurrentValue } from "../../model/CurrentValue";

export function createStarship(document: Actor): StaStarship {
  return new StaStarship(
    document.id!,
    document.name!,
    document.img,
    actorSystem(document),
    actorItems(document),
  );
}

export class StaStarship extends StaActor {
  notes: string;
  designation: string;
  spaceframe: string;
  servicedate: number | null;
  missionprofile: string;
  scale: number;
  resistance: number;

  systems: StaStarshipSystems;
  departments: StaStarshipDepartments;

  crew: CurrentValue;
  shields: CurrentValue;
  power: CurrentValue;

  launchbay: StaLaunchbay[] = [];
  refits: StaRefit[] = [];
  talents: StaTalent[] = [];
  things: StaThing[] = [];
  traits: StaTrait[] = [];
  values: StaValue[] = [];
  weapons: StaStarshipWeapon[] = [];

  taskRoll: StaStarshipTaskRoll;

  constructor(
    id: string,
    name: string,
    img: string | null,
    {
      notes = "",
      designation = "",
      spaceframe = "",
      servicedate = null as number | null,
      missionprofile = "",
      scale = 1,
      resistance = 1,
      systems = {},
      departments = {},
      crew = 1,
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
    this.designation = designation;
    this.spaceframe = spaceframe;
    this.servicedate = servicedate;
    this.missionprofile = missionprofile;
    this.scale = scale;
    this.resistance = resistance;
    this.notes = notes;
    this.systems = new StaStarshipSystems(systems);
    this.departments = new StaStarshipDepartments(departments);
    this.crew = new CurrentValue(crew, this.scale);
    this.shields = new CurrentValue(shields.value, shields.max);
    this.power = new CurrentValue(power.value, power.max);

    this.launchbay = filterLaunchbay(items);
    this.refits = filterRefit(items);
    this.talents = filterTalent(items);
    this.things = filterThing(items);
    this.traits = filterTrait(items);
    this.values = filterValue(items);
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
    this.refits.forEach((i) => {
      if (i.system) this.systems[i.system].refits++;
    });
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
      crew: this.crew.max,
      "shields.value": this.shields.max,
      "power.value": this.power.max,
      systems: systems,
    });
  }
}

export type Breach = {
  system: keyof StaStarshipSystems,
  value: number,
}


export class StaStarshipSystem {
  value: number;
  breaches: number;
  refits: number = 0;
  scale: number = 1;

  get effective() {
    return this.value + this.refits;
  }

  get pills() {
    return generatePills(
      this.breaches,
      {
        begin: this.scale + 1,
        end: 0,
        fatal: this.scale + 1,
        error: this.scale,
        warn: Math.ceil(this.scale / 2),
        info: 1,
        success: 0,
        moreIsWorse: true,
      },
    );
  };

  constructor({
    value = 7,
    breaches = 0,
  } = {}) {
    this.value = value;
    this.breaches = breaches;
  }

  withScale(scale: number) {
    this.scale = scale;
  }
}


export class StaStarshipSystems {
  communications: StaStarshipSystem;
  computers: StaStarshipSystem;
  engines: StaStarshipSystem;
  sensors: StaStarshipSystem;
  structure: StaStarshipSystem;
  weapons: StaStarshipSystem;

  constructor({
    communications = {},
    computers = {},
    engines = {},
    sensors = {},
    structure = {},
    weapons = {},
  } = {}) {
    this.communications = new StaStarshipSystem(communications);
    this.computers = new StaStarshipSystem(computers);
    this.engines = new StaStarshipSystem(engines);
    this.sensors = new StaStarshipSystem(sensors);
    this.structure = new StaStarshipSystem(structure);
    this.weapons = new StaStarshipSystem(weapons);
  }
}

export class StaStarshipDepartments {
  command: number;
  conn: number;
  security: number;
  engineering: number;
  science: number;
  medicine: number;

  constructor({
    command = 1,
    conn = 1,
    security = 1,
    engineering = 1,
    science = 1,
    medicine = 1,
  }) {
    this.command = command;
    this.conn = conn;
    this.security = security;
    this.engineering = engineering;
    this.science = science;
    this.medicine = medicine;
  }
}


export class StaStarshipTaskRoll {
  system: keyof StaStarshipSystems;
  department: keyof StaStarshipDepartments;

  constructor({
    system = "communications" as keyof StaStarshipSystems,
    department = "command" as keyof StaStarshipDepartments,
  } = {}) {
    this.system = system;
    this.department = department;
  }
}
