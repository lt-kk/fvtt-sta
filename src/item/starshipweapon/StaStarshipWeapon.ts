import { StaRange } from "../../model/StaTypes";
import { itemSystem } from "../../util/util";


export function createStarshipWeapon(document: Item): StaStarshipWeapon {
  return new StaStarshipWeapon(document.id!, document.name!, document.img, itemSystem(document));
}


export class StaStarshipWeapon {
  id: string;
  name: string;
  img: string | null;
  damage: number;
  range: StaRange;
  description: string;
  rule: string;
  qualities: StaStarshipWeaponQualities;

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
    this.qualities = new StaStarshipWeaponQualities(qualities);
  }
}


export class StaStarshipWeaponQualities {
  area: boolean;
  spread: boolean;
  hiddenx: number;
  piercingx: number;
  viciousx: number;

  dampening: boolean;
  calibration: boolean;
  devastating: boolean;
  highyield: boolean;
  persistentx: number;
  versatilex: number;

  constructor({
    area = false,
    spread = false,
    hiddenx = 0,
    piercingx = 0,
    viciousx = 0,
    dampening = false,
    calibration = false,
    devastating = false,
    highyield = false,
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
