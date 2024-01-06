import { StaRange } from "../../model/StaTypes";
import { mapItems } from "../../util/actor";
import { itemSystem } from "../../util/document";
import { StaItem } from "../StaItem";


export function createStarshipWeapon(document: Item): StaStarshipWeapon {
  return new StaStarshipWeapon(document.id!, document.name!, document.img, itemSystem(document));
}

export function filterStarshipWeapon(source: Actor | Collection<Item>) {
  return mapItems(source, StaStarshipWeapon.type, createStarshipWeapon);
}


export class StaStarshipWeapon implements StaItem {
  static type = "starshipweapon";

  id: string;
  name: string;
  img: string | null;
  description: string;
  rule: string;
  opportunity: number;
  escalation: number;
  damage: number;
  range: StaRange;
  qualities: StaStarshipWeaponQualities;

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
      qualities = {},
    },
  ) {
    this.id = id;
    this.name = name;
    this.img = img;
    this.description = description;
    this.rule = rule;
    this.opportunity = opportunity;
    this.escalation = escalation;
    this.damage = damage;
    this.range = range;
    this.qualities = new StaStarshipWeaponQualities(qualities);
  }
}


export class StaStarshipWeaponQualities {
  area: boolean;
  spread: boolean;
  dampening: boolean;
  calibration: boolean;
  devastating: boolean;
  highyield: boolean;

  hiddenx: number;
  piercingx: number;
  viciousx: number;
  persistentx: number;
  versatilex: number;

  constructor({
    area = false,
    spread = false,
    dampening = false,
    calibration = false,
    devastating = false,
    highyield = false,
    hiddenx = 0,
    piercingx = 0,
    viciousx = 0,
    persistentx = 0,
    versatilex = 0,
  }) {
    this.area = area;
    this.spread = spread;
    this.hiddenx = hiddenx;
    this.piercingx = piercingx;
    this.viciousx = viciousx;

    this.dampening = dampening;
    this.calibration = calibration;
    this.devastating = devastating;
    this.highyield = highyield;
    this.persistentx = persistentx;
    this.versatilex = versatilex;
  }
}
