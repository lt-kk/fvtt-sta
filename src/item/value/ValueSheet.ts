import { BaseItemSheet } from "../BaseItemSheet";
import { createValue, StaValue } from "./StaValue";

export class ValueSheet extends BaseItemSheet<StaValue> {
  static type = StaValue.type;

  createSta(item: Item): StaValue {
    return createValue(item);
  }

  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["sta-app", "item-sheet", `${this.type}-sheet`],
      width: 340,
      height: 250,
    });
  }
}
