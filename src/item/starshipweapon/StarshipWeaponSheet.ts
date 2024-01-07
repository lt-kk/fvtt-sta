import { LooseObject, splitObject } from "../../util/util";
import { BaseItemSheet } from "../BaseItemSheet";
import { StaStarshipWeapon } from "./StaStarshipWeapon";

export class StarshipWeaponSheet extends BaseItemSheet<StaStarshipWeapon> {
  static type = StaStarshipWeapon.type;

  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["sta-app", "item-sheet", `${this.type}-sheet`],
      width: 360,
      height: 540,
    });
  }

  additionalData(sta: StaStarshipWeapon, data: ItemSheet.Data): LooseObject<any> {
    const qualities = splitObject(sta.qualities, (_, v) => typeof v == "boolean");
    return {
      qualityFlags: qualities[0],
      qualityQuantities: qualities[1],
    };
  }
}
