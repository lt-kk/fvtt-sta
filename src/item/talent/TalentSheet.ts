import { BaseItemSheet } from "../BaseItemSheet";
import { createTalent, StaTalent } from "./StaTalent";

export class TalentSheet extends BaseItemSheet<StaTalent> {
  static type = StaTalent.type;

  createSta(item: Item): StaTalent {
    return createTalent(item);
  }

  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["sta-app", "item-sheet", `${this.type}-sheet`],
      width: 300,
      height: 370,
    });
  }

}
