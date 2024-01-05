import { BaseItemSheet } from "../BaseItemSheet";
import { createTrait, StaTrait } from "./StaTrait";

export class TraitSheet extends BaseItemSheet<StaTrait> {
  static type = StaTrait.type;

  createSta(item: Item): StaTrait {
    return createTrait(item);
  }
}
