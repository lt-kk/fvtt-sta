import { StaInjury } from "./StaInjury";
import { BaseItemSheet } from "../BaseItemSheet";

export class InjurySheet extends BaseItemSheet<StaInjury> {
  static type = StaInjury.type;

  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["sta-app", "item-sheet", `${this.type}-sheet`],
      width: 300,
      height: 250,
    });
  }
}
