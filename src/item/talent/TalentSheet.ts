import { BaseItemSheet } from "../BaseItemSheet";
import { StaTalent } from "./StaTalent";

export class TalentSheet extends BaseItemSheet<StaTalent> {
  static type = StaTalent.type;

  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["sta-app", "item-sheet", `${this.type}-sheet`],
      width: 250,
      height: 360,
    });
  }

}
