import { sta } from "../../config";
import { HasStaEntity } from "../../model/StaTypes";
import { LooseObject } from "../../util/util";

export class ArmorSheet extends ItemSheet {
  static templatePath = `${sta.templateBasePath}/item/armor/ArmorSheet.hbs`;

  get template() {
    return ArmorSheet.templatePath;
  }

  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["item-sheet", "armor-sheet"],
      width: 480,
      height: 400,
    });
  }

  override getData(options?: Partial<ItemSheet.Options>): Data {
    const data = super.getData(options) as ItemSheet.Data;
    const sheetData: Data = {
      ...data,
      settings: sta.settings,
      sta: (data.item as unknown as HasStaEntity).staEntity,
    };
    console.log(sheetData);
    return sheetData;
  }
}

type Data = ItemSheet.Data & {
  settings: object;
  sta: LooseObject<any>;
};
