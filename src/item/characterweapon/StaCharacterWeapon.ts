import { StaRange } from "../../model/StaTypes";
import { itemSystem } from "../../util/util";


export function createCharacterWeapon(document: Item): StaCharacterWeapon {
  return new StaCharacterWeapon(document.id!, document.name!, document.img, itemSystem(document));
}


export class StaCharacterWeapon {
  id: string;
  name: string;
  img: string | null;
  damage: number;
  range: StaRange;
  description: string;
  rule: string;
  qualities: StaCharacterWeaponQualities;

  constructor(
    id: string,
    name = "",
    img: string | null,
    {
      damage = 0,
      range = "near" as StaRange,
      description = "",
      rule = "",
      qualities = {},
    },
  ) {
    this.id = id;
    this.name = name;
    this.img = img;
    this.damage = damage;
    this.range = range;
    this.description = description;
    this.rule = rule;
    this.qualities = new StaCharacterWeaponQualities(qualities);
  }
}


export class StaCharacterWeaponQualities {
  area: boolean;
  spread: boolean;
  hiddenx: number;
  piercingx: number;
  viciousx: number;

  intense: boolean;
  knockdown: boolean;
  accurate: boolean;
  charge: boolean;
  cumbersome: boolean;
  deadly: boolean;
  debilitating: boolean;
  grenade: boolean;
  inaccurate: boolean;
  nonlethal: boolean;

  opportunity: number;
  escalation: number;

  constructor({
    area = false,
    spread = false,
    hiddenx = 0,
    piercingx = 0,
    viciousx = 0,

    intense = false,
    knockdown = false,
    accurate = false,
    charge = false,
    cumbersome = false,
    deadly = false,
    debilitating = false,
    grenade = false,
    inaccurate = false,
    nonlethal = false,

    opportunity = 0,
    escalation = 0,
  }) {
    this.area = area;
    this.spread = spread;
    this.hiddenx = hiddenx;
    this.piercingx = piercingx;
    this.viciousx = viciousx;

    this.intense = intense;
    this.knockdown = knockdown;
    this.accurate = accurate;
    this.charge = charge;
    this.cumbersome = cumbersome;
    this.deadly = deadly;
    this.debilitating = debilitating;
    this.grenade = grenade;
    this.inaccurate = inaccurate;
    this.nonlethal = nonlethal;

    this.opportunity = opportunity;
    this.escalation = escalation;
  }
}
