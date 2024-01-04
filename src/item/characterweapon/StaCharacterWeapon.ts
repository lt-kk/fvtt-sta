import {StaRange} from "../../model/StaTypes";
import {mapItems} from "../../util/actor";
import {itemSystem} from "../../util/document";


export function createCharacterWeapon(document: Item): StaCharacterWeapon {
  return new StaCharacterWeapon(document.id!, document.name!, document.img, itemSystem(document));
}

export function filterCharacterWeapon(source: Actor | Collection<Item>) {
  return mapItems(source, StaCharacterWeapon.type, createCharacterWeapon);
}


export class StaCharacterWeapon {
  static type = "characterweapon"

  id: string;
  name: string;
  img: string | null;
  damage: number;
  range: StaRange;
  // TODO size
  opportunity: number;
  escalation: number;
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
      opportunity = 0,
      escalation = 0,
      description = "",
      rule = "",
      qualities = {},
    },
  ) {
    this.id = id;
    this.name = name;
    this.img = img;
    this.damage = damage;
    this.opportunity = opportunity;
    this.escalation = escalation;
    this.range = range;
    this.description = description;
    this.rule = rule;
    this.qualities = new StaCharacterWeaponQualities(qualities);
  }
}


export class StaCharacterWeaponQualities {
  hiddenx: number;
  piercingx: number;
  viciousx: number;

  charge: boolean;
  grenade: boolean;
  area: boolean;
  intense: boolean;
  knockdown: boolean;
  accurate: boolean;
  debilitating: boolean;
  cumbersome: boolean;
  inaccurate: boolean;
  deadly: boolean;
  nonlethal: boolean;

  constructor({
    area = false,
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
  }) {
    this.area = area;
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
  }
}
