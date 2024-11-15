import { BaseItemSheet } from "../BaseItemSheet";
import { StaRefit } from "./StaRefit";
import { LooseObject, propertiesOf } from "../../util/util";
import { StaStarshipSystems } from "../../actor/starship/StaStarship";

export class RefitSheet extends BaseItemSheet<StaRefit> {
  static type = StaRefit.type;

  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["sta-app", "item-sheet", `${this.type}-sheet`],
      width: 270,
      height: 250,
    });
  }

  additionalData(sta: StaRefit, data: ItemSheet.Data): LooseObject<any> {
    return {
      starshipSystems: propertiesOf(StaStarshipSystems),
    };
  }
}
