import { CurrentValue } from "../../model/StaTypes";
import { createRefit, StaRefit } from "../../item/refit/StaRefit";
import { createStarshipWeapon, StaStarshipWeapon } from "../../item/starshipweapon/StaStarshipWeapon";
import { createItem, StaItem } from "../../item/item/StaItem";
import { createLaunchbay, StaLaunchbay } from "../../item/launchbay/StaLaunchbay";
import { createTalent, StaTalent } from "../../item/talent/StaTalent";
import { createTrait, StaTrait } from "../../item/trait/StaTrait";
import { createValue, StaValue } from "../../item/value/StaValue";
import { actorItems, actorSystem, filterItemType } from "../../util/util";

export function createStarship(document: Actor): StaStarship {
  return new StaStarship(document.name!, document.img, actorSystem(document), actorItems(document));
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

  cargo: StaItem[] = [];
  launchbay: StaLaunchbay[] = [];
  refits: StaRefit[] = [];
  talents: StaTalent[] = [];
  traits: StaTrait[] = [];
  values: StaValue[] = [];
  weapons: StaStarshipWeapon[] = [];

  roll: StaStarshipRoll = new StaStarshipRoll("communications", "command");

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

    this.cargo = filterItemType(items, "item").map((item) => createItem(item));
    this.launchbay = filterItemType(items, "launchbay").map((item) => createLaunchbay(item));
    this.refits = filterItemType(items, "refit").map((item) => createRefit(item));
    this.talents = filterItemType(items, "talent").map((item) => createTalent(item));
    this.traits = filterItemType(items, "trait").map((item) => createTrait(item));
    this.values = filterItemType(items, "value").map((item) => createValue(item));
    this.weapons = filterItemType(items, "starshipweapon").map((item) => createStarshipWeapon(item));
  }
}


export type StaBreach = "fine" | "impacted" | "disabled" | "destroyed";


export class StaStarshipSystem {
  value: number;
  breaches: number;
  status: StaBreach;

  constructor({
    value = 7,
    breaches = 0,
    status = "fine" as StaBreach,
  } = {}) {
    this.value = value;
    this.breaches = breaches;
    this.status = status;
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


export class StaStarshipRoll {
  attribute: keyof StaStarshipSystems;
  discipline: keyof StaStarshipDepartments;

  constructor(attribute: keyof StaStarshipSystems, discipline: keyof StaStarshipDepartments) {
    this.attribute = attribute;
    this.discipline = discipline;
  }
}
