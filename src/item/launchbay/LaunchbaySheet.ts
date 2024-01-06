import { BaseItemSheet } from "../BaseItemSheet";
import { createLaunchbay, StaLaunchbay } from "./StaLaunchbay";

export class LaunchbaySheet extends BaseItemSheet<StaLaunchbay> {
  static type = StaLaunchbay.type;

  createSta(item: Item): StaLaunchbay {
    return createLaunchbay(item);
  }

  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["sta-app", "item-sheet", `${this.type}-sheet`],
      width: 320,
      height: 270,
    });
  }
}
