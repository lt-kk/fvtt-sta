import {sta} from "../../config";
import {HasStaEntity} from "../../model/StaTypes";
import {LooseObject} from "../../util/util";
import { createArmor, StaArmor } from "./StaArmor";

export class ArmorSheet extends ItemSheet {
  static templatePath = `${sta.templateBasePath}/item/armor/ArmorSheet.hbs`;
  sta: StaArmor | null = null;

  get template() {
    return ArmorSheet.templatePath;
  }

  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["sta-app", "item-sheet", "armor-sheet"],
      width: 480,
      height: 400,
    });
  }

  override getData(options?: Partial<ItemSheet.Options>): Data {
    const data = super.getData(options) as ItemSheet.Data;
    this.sta = createArmor(this.item)
    const sheetData: Data = {
      ...data,
      settings: sta.settings,
      sta: this.sta,
    };
    console.log(sheetData);
    return sheetData;
  }
}

type Data = ItemSheet.Data & {
  settings: object;
  sta: LooseObject<any>;
};
