import {sta} from "../../config";
import {LooseObject} from "../../util/util";
import { createCharacterWeapon, StaCharacterWeapon } from "./StaCharacterWeapon";

export class CharacterWeaponSheet extends ItemSheet {
  static templatePath = `${sta.templateBasePath}/item/characterweapon/CharacterWeaponSheet.hbs`;
  sta: StaCharacterWeapon | null = null;

  get template() {
    return CharacterWeaponSheet.templatePath;
  }

  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["sta-app", "item-sheet", "characterweapon-sheet"],
      width: 300,
      height: 540,
    });
  }

  override getData(options?: Partial<ItemSheet.Options>): Data {
    const data = super.getData(options) as ItemSheet.Data;
    this.sta = createCharacterWeapon(this.item)
    const qualities = splitObject(this.sta.qualities, (_, v) => typeof v == "boolean")
    const sheetData: Data = {
      ...data,
      settings: sta.settings,
      sta: this.sta,
      qualityFlags: qualities[0],
      qualityQuantities: qualities[1],
    };
    return sheetData;
  }
}

function splitObject(obj: any, rule: (name: string, value: any) => boolean) {
  const a: LooseObject<any> = {}
  const b: LooseObject<any> = {}
  Object.entries(obj).forEach(([name, value]) => {
    if(rule(name, value)) a[name] = value;
    else b[name] = value;
  })
  return [a, b]
}

type Data = ItemSheet.Data & {
  settings: object;
  sta: LooseObject<any>;
  qualityFlags: LooseObject<any>;
  qualityQuantities: LooseObject<any>;
};
