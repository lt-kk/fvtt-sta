import { createInjury, StaInjury } from "./StaInjury";
import { BaseItemSheet } from "../BaseItemSheet";
import { StaFocus } from "../focus/StaFocus";

export class InjurySheet extends BaseItemSheet<StaFocus> {
  static type = StaInjury.type;

  createSta(item: Item): StaFocus {
    return createInjury(item);
  }

}
