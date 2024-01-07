import { StaRange } from "../../model/StaTypes";
import { mapItems } from "../../util/actor";
import { itemSystem } from "../../util/document";
import { StaItem } from "../StaItem";
import { HasRule, StaRule } from "../../model/StaRule";


export function createCharacterWeapon(document: Item): StaCharacterWeapon {
  return new StaCharacterWeapon(document.id!, document.name!, document.img, itemSystem(document));
}

export function filterCharacterWeapon(source: Actor | Collection<Item>) {
  return mapItems(source, StaCharacterWeapon.type, createCharacterWeapon);
}


export class StaCharacterWeapon extends StaItem implements HasRule {
  static type = "characterweapon";

  rule: StaRule | undefined;
  opportunity: number;
  escalation: number;
  damage: number;
  range: StaRange;
  hands: number;
  qualities: StaCharacterWeaponQualities;

  constructor(
    id: string,
    name = "",
    img: string | null,
    {
      description = "",
      rule = "",
      opportunity = 0,
      escalation = 0,
      damage = 0,
      range = "near" as StaRange,
      hands = 1,
      qualities = {},
    },
  ) {
    super(id, name, img, description);
    this.rule = rule ? new StaRule(`${name}[${id}]`, rule) : undefined;
    this.description = description;
    this.opportunity = opportunity;
    this.escalation = escalation;
    this.damage = damage;
    this.range = range;
    this.hands = hands;
    this.qualities = new StaCharacterWeaponQualities(qualities);
  }
}


export class StaCharacterWeaponQualities {
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

  hiddenx: number;
  piercingx: number;
  viciousx: number;

  constructor({
    area = false,
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
    hiddenx = 0,
    piercingx = 0,
    viciousx = 0,
  }) {
    this.area = area;
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

    this.hiddenx = hiddenx;
    this.piercingx = piercingx;
    this.viciousx = viciousx;
  }
}
