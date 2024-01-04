import { createBelonging, StaBelonging } from "./StaBelonging";
import { BaseItemSheet } from "../BaseItemSheet";

export class BelongingSheet extends BaseItemSheet<StaBelonging> {
  static type = StaBelonging.type;

  createSta(item: Item): StaBelonging {
    return createBelonging(item);
  }

  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["sta-app", "item-sheet", `${this.type}-sheet`],
      width: 390,
      height: 320,
    });
  }
}
