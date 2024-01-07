import { mapItems } from "../../util/actor";
import { itemSystem } from "../../util/document";
import { StaItem } from "../StaItem";
import { HasRule, StaRule } from "../../model/StaRule";


export function createTalent(document: Item): StaTalent {
  return new StaTalent(document.id!, document.name!, document.img, itemSystem(document));
}

export function filterTalent(source: Actor | Collection<Item>) {
  return mapItems(source, StaTalent.type, createTalent);
}


export class StaTalent extends StaItem implements HasRule {
  static type = "talent";

  rule: StaRule | undefined;
  type: string;

  constructor(
    id: string,
    name = "",
    img: string | null,
    {
      description = "",
      rule = "",
      type = "",
    },
  ) {
    super(id, name, img, description);
    this.rule = rule ? new StaRule(`${name}[${id}]`, rule) : undefined;
    this.type = type;
  }
}
