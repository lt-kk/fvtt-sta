import { CurrentValue, StaEquipment, StaLaunchbay, StaTalent, StaTrait, StaValue, StaWeapon } from "./StaTypes";
import { StaRule } from "./StaRule";

export class StaStarship {
  name: string = "";
  spaceframe: string = "";
  designation: string = "";
  servicedate: number | null = null;
  missionprofile: string = "";
  notes: string = "";

  systems: StaStarshipSystems = new StaStarshipSystems();
  departments: StaStarshipDepartments = new StaStarshipDepartments();
  launchbay: StaLaunchbay[] = [];
  refit: StaStarshipRefit[] = [];

  talents: StaTalent[] = [];
  traits: StaTrait[] = [];
  values: StaValue[] = [];
  equipment: StaEquipment[] = [];
  weapons: StaStarshipWeapon[] = [];

  status: StaStarshipStatus = new StaStarshipStatus();
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
  engineering: number = 1;
  medicine: number = 1;
  science: number = 1;
  security: number = 1;
}

export class StaStarshipRefit {
  name: string = "";
  description: string = "";
  rule: StaRule | null = null;
}

export class StaStarshipWeapon extends StaWeapon {
  qualities: StaStarshipWeaponQualities = new StaStarshipWeaponQualities();
}

export class StaStarshipWeaponQualities {
  area: boolean = false;
  spread: boolean = false;
  hiddenx: number = 0;
  piercingx: number = 0;
  viciousx: number = 0;

  dampening: boolean = false;
  calibration: boolean = false;
  devastating: boolean = false;
  highyield: boolean = false;
  persistentx: number = 0;
  versatilex: number = 0;
}

export class StaStarshipStatus {
  shields: CurrentValue = new CurrentValue(8);
  power: CurrentValue = new CurrentValue(8);
  crew: CurrentValue = new CurrentValue(1);
  breaches: StaBreaches = new StaBreaches();
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
