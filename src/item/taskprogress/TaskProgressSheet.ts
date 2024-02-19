import { StaTaskProgress } from "./StaTaskProgress";
import { BaseItemSheet } from "../BaseItemSheet";

export class TaskProgressSheet extends BaseItemSheet<StaTaskProgress> {
  static type = StaTaskProgress.type;

  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["sta-app", "item-sheet", `${this.type}-sheet`],
      width: 300,
      height: 250,
    });
  }
}
