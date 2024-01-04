import { createFocus, StaFocus } from "./StaFocus";
import { BaseItemSheet } from "../BaseItemSheet";

export class FocusSheet extends BaseItemSheet<StaFocus> {
  static type = StaFocus.type;

  createSta(item: Item): StaFocus {
    return createFocus(item);
  }
}
