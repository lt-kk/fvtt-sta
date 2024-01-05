import { createInjury, StaInjury } from "./StaInjury";
import { BaseItemSheet } from "../BaseItemSheet";

export class InjurySheet extends BaseItemSheet<StaInjury> {
  static type = StaInjury.type;

  createSta(item: Item): StaInjury {
    return createInjury(item);
  }

}
