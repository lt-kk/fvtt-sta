import { LooseObject } from "../util/util";
import { sta } from "../config";
import { StaItem } from "./StaItem";

export abstract class BaseItemSheet<STA extends StaItem> extends ItemSheet {
  sta: STA | null = null;

  static type: string;

  abstract createSta(item: Item): STA

  get template() {
    const clazz = this.constructor.name;
    const type = clazz.replace("Sheet", "").toLowerCase();
    return `${sta.templateBasePath}/item/${type}/${clazz}.hbs`;
  }

  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["sta-app", "item-sheet", `${this.type}-sheet`],
      width: 280,
      height: 210,
    });
  }

  override getData(options?: Partial<ItemSheet.Options>): Data {
    const data = super.getData(options) as ItemSheet.Data;
    this.sta = this.createSta(this.item);
    return {
      ...data,
      ...this.additionalData(this.sta, data),
      settings: sta.settings,
      sta: this.sta,
      templatePath: sta.templateBasePath,
    };
  }

  additionalData(sta: STA, data: ItemSheet.Data): LooseObject<any> {
    return {};
  }
}

type Data = ItemSheet.Data & LooseObject<any> & {
  settings: object;
  sta: LooseObject<any>;
  templatePath: string;
};