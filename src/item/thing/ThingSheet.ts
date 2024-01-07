import { StaThing } from "./StaThing";
import { BaseItemSheet } from "../BaseItemSheet";

export class ThingSheet extends BaseItemSheet<StaThing> {
  static type = StaThing.type;

  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["sta-app", "item-sheet", `${this.type}-sheet`],
      width: 390,
      height: 320,
    });
  }
}
