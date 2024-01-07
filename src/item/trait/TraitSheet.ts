import { BaseItemSheet } from "../BaseItemSheet";
import { StaTrait } from "./StaTrait";

export class TraitSheet extends BaseItemSheet<StaTrait> {
  static type = StaTrait.type;
}
