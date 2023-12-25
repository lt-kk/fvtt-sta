import { CurrentValue, StaEquipment, StaTalent, StaTrait, StaValue, StaWeapon } from "./StaTypes";

export class StaCharacter {
  name: string = "";
  species: string = "";
  rank: string = "";
  assignment: string = "";
  environment: string = "";
  upbringing: string = "";
  notes: string = "";

  attributes: StaCharacterAttributes = new StaCharacterAttributes();
  disciplines: StaCharacterDisciplines = new StaCharacterDisciplines();
  milestones: StaCharacterMilestone[] = [];
  focuses: StaCharacterFocus[] = [];

  talents: StaTalent[] = [];
  traits: StaTrait[] = [];
  values: StaValue[] = [];
  equipment: StaEquipment[] = [];
  armor: StaCharacterArmor[] = [];
  weapons: StaCharacterWeapon[] = [];

  status: StaCharacterStatus = new StaCharacterStatus();
  roll: StaCharacterRoll = new StaCharacterRoll("control", "command");
}

export class StaCharacterAttributes {
  control: number = 7;
  daring: number = 7;
  fitness: number = 7;
  insight: number = 7;
  presence: number = 7;
  reason: number = 7;
}

export class StaCharacterDisciplines {
  command: number = 1;
  security: number = 1;
  science: number = 1;
  conn: number = 1;
  engineering: number = 1;
  medicine: number = 1;
}

export class StaCharacterFocus {
  name: string = "";
  img: string = "";
  description: string = "";
}

export class StaCharacterMilestone {
  name: string = "";
  img: string = "";
  description: string = "";
  rule: StaRule | null = null;
}

export class StaCharacterWeapon extends StaWeapon {
  qualities: StaCharacterWeaponQualities = new StaCharacterWeaponQualities();
}

export class StaCharacterWeaponQualities {
  area: boolean = false;
  spread: boolean = false;
  hiddenx: number = 0;
  piercingx: number = 0;
  viciousx: number = 0;

  intense: boolean = false;
  knockdown: boolean = false;
  accurate: boolean = false;
  charge: boolean = false;
  cumbersome: boolean = false;
  deadly: boolean = false;
  debilitating: boolean = false;
  grenade: boolean = false;
  inaccurate: boolean = false;
  nonlethal: boolean = false;

  opportunity: number = 0;
  escalation: number = 0;
}

export class StaCharacterArmor {
  name: string = "";
  protection: number = 1;
  description: string = "";
  equipped: boolean = true;
  rule: StaRule | null = null;

  opportunity: number = 0;
  escalation: number = 0;
}

export class StaCharacterStatus {
  stress: CurrentValue = new CurrentValue(8);
  determination: CurrentValue = new CurrentValue(3);
  injuries: StaInjury[] = [];
}

export class StaInjury {
  name: string = "";
  description: string = "";
}

export class StaCharacterRoll {
  attribute: keyof StaCharacterAttributes;
  discipline: keyof StaCharacterDisciplines;

  constructor(attribute: keyof StaCharacterAttributes, discipline: keyof StaCharacterDisciplines) {
    this.attribute = attribute;
    this.discipline = discipline;
  }
}
