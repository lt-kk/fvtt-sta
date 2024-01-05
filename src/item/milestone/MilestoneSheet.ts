import { BaseItemSheet } from "../BaseItemSheet";
import { createMilestone, StaMilestone } from "./StaMilestone";

export class MilestoneSheet extends BaseItemSheet<StaMilestone> {
  static type = StaMilestone.type;

  createSta(item: Item): StaMilestone {
    return createMilestone(item);
  }

  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["sta-app", "item-sheet", `${this.type}-sheet`],
      width: 280,
      height: 290,
    });
  }

}
