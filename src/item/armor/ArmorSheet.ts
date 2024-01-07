import { StaArmor } from "./StaArmor";
import { BaseItemSheet } from "../BaseItemSheet";

export class ArmorSheet extends BaseItemSheet<StaArmor> {
  static type = StaArmor.type;

  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["sta-app", "item-sheet", `${this.type}-sheet`],
      width: 390,
      height: 370,
    });
  }

}
