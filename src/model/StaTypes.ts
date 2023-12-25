export class CurrentValue {
  value: number;
  max: number;

  constructor(value = 0, max = value) {
    this.value = value;
    this.max = max;
  }
}

export class StaTalent {
  name: string = "";
  img: string = "";
  description: string = "";
  rule: StaRule | null = null;
}

export class StaTrait {
  name: string = "";
  img: string = "";
  description: string = "";
}

export class StaValue {
  name: string = "";
  img: string = "";
  description: string = "";
  questioned: boolean = false;
}

export class StaEquipment {
  name: string = "";
  img: string = "";
  description: string = "";
  quantity: number = 1;
  uses: number = -1;
  rule: StaRule | null = null;
  opportunity: number = 0;
  escalation: number = 0;
}

export class StaLaunchbay {
  name: string = "";
  img: string = "";
  description: string = "";
  ship: string = "";
}

export type StaRange = "close" | "near" | "far" | "extreme";

export abstract class StaWeapon {
  name: string = "";
  damage: number = 0;
  range: StaRange = "near";
  description: string = "";
  rule: StaRule | null = null;
}
