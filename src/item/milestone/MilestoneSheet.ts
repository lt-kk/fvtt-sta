import { BaseItemSheet } from "../BaseItemSheet";
import { StaMilestone } from "./StaMilestone";

export class MilestoneSheet extends BaseItemSheet<StaMilestone> {
  static type = StaMilestone.type;

  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["sta-app", "item-sheet", `${this.type}-sheet`],
      width: 280,
      height: 290,
    });
  }

}
