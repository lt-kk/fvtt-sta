import { sta } from "../../config";

export class ArmorSheet extends ItemSheet {
  get template() {
    return `systems/fvtt-sta/templates/sheets/item/armor-sheet.hbs`;
  }

  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["item-sheet", "armor-sheet"],
      width: 480,
      height: 400,
    });
  }

  override getData(options?: Partial<ItemSheet.Options>): Data {
    const data = super.getData(options) as Data;
    const sheetData = {
      ...data,
      settings: sta.settings,
      fields: Object.keys(data.data.system),
    };
    console.log(sheetData)
    return sheetData;
  }
}

type Data = ItemSheet.Data & {
  // known to be present
  data: {
    system: object;
  };
  // derived
  config: object;
  fields: string[];
};
