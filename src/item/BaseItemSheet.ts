import { LooseObject } from "../util/util";
import { sta } from "../config";
import { StaItem } from "./StaItem";
import { StaSystemItem } from "./StaSystemItem";

export abstract class BaseItemSheet<STA extends StaItem> extends ItemSheet {
  get sta(): STA {
    return (this.item as StaSystemItem).sta as unknown as STA;
  }

  static type: string;

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
    return {
      ...data,
      ...this.additionalData(this.sta, data),
      settings: sta.settings,
      sta: this.sta,
    };
  }

  additionalData(sta: STA, data: ItemSheet.Data): LooseObject<any> {
    return {};
  }
}

type Data = ItemSheet.Data & LooseObject<any> & {
  settings: object;
  sta: LooseObject<any>;
};