import { BaseItemSheet } from "../BaseItemSheet";
import { StaValue } from "./StaValue";

export class ValueSheet extends BaseItemSheet<StaValue> {
  static type = StaValue.type;

  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["sta-app", "item-sheet", `${this.type}-sheet`],
      width: 340,
      height: 250,
    });
  }
}
