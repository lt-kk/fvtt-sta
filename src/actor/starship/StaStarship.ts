import { CurrentValue } from "../../model/StaTypes";
import { StaRefit } from "../../item/refit/StaRefit";
import { StaStarshipWeapon } from "../../item/starshipweapon/StaStarshipWeapon";
import { StaItem } from "../../item/item/StaItem";
import { StaLaunchbay } from "../../item/launchbay/StaLaunchbay";
import { StaTalent } from "../../item/talent/StaTalent";
import { StaTrait } from "../../item/trait/StaTrait";
import { StaValue } from "../../item/value/StaValue";

export class StaStarship {
  name: string = "";
  designation: string = "";
  spaceframe: string = "";
  servicedate: number | null = null;
  missionprofile: string = "";
  scale: CurrentValue = new CurrentValue(1);
  resistance: CurrentValue = new CurrentValue(1);
  notes: string = "";

  systems: StaStarshipSystems = new StaStarshipSystems();
  departments: StaStarshipDepartments = new StaStarshipDepartments();

  talents: StaTalent[] = [];
  values: StaValue[] = [];
  weapons: StaStarshipWeapon[] = [];
  launchbay: StaLaunchbay[] = [];
  cargo: StaItem[] = [];

  refits: StaRefit[] = [];
  traits: StaTrait[] = [];

  breaches: StaBreaches = new StaBreaches();
  crew: CurrentValue = new CurrentValue(1);
  shields: CurrentValue = new CurrentValue(8);
  power: CurrentValue = new CurrentValue(8);

  roll: StaStarshipRoll = new StaStarshipRoll("communications", "command");
}

export class StaStarshipSystems {
  communications: number = 7;
  computers: number = 7;
  engines: number = 7;
  sensors: number = 7;
  structure: number = 7;
  weapons: number = 7;
}

export class StaStarshipDepartments {
  command: number = 1;
  conn: number = 1;
  security: number = 1;
  engineering: number = 1;
  science: number = 1;
  medicine: number = 1;
}


export class StaBreaches {
  communications = new StaStarshipBreach("communications");
  computers = new StaStarshipBreach("computers");
  engines = new StaStarshipBreach("engines");
  sensors = new StaStarshipBreach("sensors");
  structure = new StaStarshipBreach("structure");
  weapons = new StaStarshipBreach("weapons");
}

export type StaBreach = "fine" | "impacted" | "disabled" | "destroyed";

export class StaStarshipBreach {
  system: keyof StaStarshipSystems;
  severity: number = 0;
  effect: StaBreach = "fine";

  constructor(system: keyof StaStarshipSystems) {
    this.system = system;
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
