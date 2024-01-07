import { LooseObject, splitObject } from "../../util/util";
import { StaCharacterWeapon } from "./StaCharacterWeapon";
import { BaseItemSheet } from "../BaseItemSheet";

export class CharacterWeaponSheet extends BaseItemSheet<StaCharacterWeapon> {
  static type = StaCharacterWeapon.type;

  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["sta-app", "item-sheet", `${this.type}-sheet`],
      width: 300,
      height: 550,
    });
  }

  additionalData(sta: StaCharacterWeapon, data: ItemSheet.Data): LooseObject<any> {
    const qualities = splitObject(sta.qualities, (_, v) => typeof v == "boolean");
    return {
      qualityFlags: qualities[0],
      qualityQuantities: qualities[1],
    };
  }
}
