import { BaseItemSheet } from "../BaseItemSheet";
import { StaLaunchbay } from "./StaLaunchbay";

export class LaunchbaySheet extends BaseItemSheet<StaLaunchbay> {
  static type = StaLaunchbay.type;

  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["sta-app", "item-sheet", `${this.type}-sheet`],
      width: 320,
      height: 270,
    });
  }
}
