import { CurrentValue, generatePills, ScalePill } from "../../model/StaTypes";
import { filterRefit, StaRefit } from "../../item/refit/StaRefit";
import { filterStarshipWeapon, StaStarshipWeapon } from "../../item/starshipweapon/StaStarshipWeapon";
import { filterThing, StaThing } from "../../item/thing/StaThing";
import { filterLaunchbay, StaLaunchbay } from "../../item/launchbay/StaLaunchbay";
import { filterTalent, StaTalent } from "../../item/talent/StaTalent";
import { filterTrait, StaTrait } from "../../item/trait/StaTrait";
import { filterValue, StaValue } from "../../item/value/StaValue";
import { actorItems, actorSystem } from "../../util/document";

export function createStarship(document: Actor): StaStarship {
  return new StaStarship(
    document.name!,
    document.img,
    actorSystem(document),
    actorItems(document),
  );
}


export class StaStarship {
  name: string;
  img: string | null;
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
      shields = 1,
      power = 1,
      taskRoll = {},
    } = {},
    items: Collection<Item>,
  ) {
    this.name = name;
    this.img = img;
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
    this.shields = new CurrentValue(shields, this.systems.structure.value + this.departments.security);
    this.power = new CurrentValue(power, this.systems.engines.value);

    this.launchbay = filterLaunchbay(items);
    this.refits = filterRefit(items);
    this.talents = filterTalent(items);
    this.things = filterThing(items);
    this.traits = filterTrait(items);
    this.values = filterValue(items);
    this.weapons = filterStarshipWeapon(items);

    this.taskRoll = new StaStarshipTaskRoll(taskRoll);

    this.derivedValues();
  }

  derivedValues() {
    this.applyRules();
    this.systemStatus();
  }

  applyRules() {

  }

  systemStatus() {
    Object.entries(this.systems).forEach(([_, system]) => {
      system.withScale(this.scale);
    });
  }
}


export class StaStarshipSystem {
  value: number;
  breaches: number;
  pills: ScalePill[] = [];

  constructor({
    value = 7,
    breaches = 0,
  } = {}) {
    this.value = value;
    this.breaches = breaches;
  }

  withScale(scale: number) {
    this.pills = generatePills(
      this.breaches,
      {
        begin: scale + 1,
        end: 0,
        fatal: scale + 1,
        error: scale,
        warn: Math.ceil(scale / 2),
        info: 1,
        success: 0,
        moreIsWorse: true,
      },
    );
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
