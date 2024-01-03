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
      width: 480,
      height: 400,
    });
  }

  override getData(options?: Partial<ItemSheet.Options>): Data {
    const data = super.getData(options) as ItemSheet.Data;
    this.sta = createCharacterWeapon(this.item)
    const qualities = Object.entries(this.sta.qualities)
      .partition(([_, v]) => typeof v == "boolean")
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

type Data = ItemSheet.Data & {
  settings: object;
  sta: LooseObject<any>;
  qualityFlags: [string, any][];
  qualityQuantities: [string, any][];
};
