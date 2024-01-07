import { mapItems } from "../../util/actor";
import { itemSystem } from "../../util/document";
import { StaItem } from "../StaItem";
import { HasRule, StaRule } from "../../model/StaRule";


export function createMilestone(document: Item): StaMilestone {
  return new StaMilestone(document.id!, document.name!, document.img, itemSystem(document));
}

export function filterMilestone(source: Actor | Collection<Item>) {
  return mapItems(source, StaMilestone.type, createMilestone);
}


export class StaMilestone extends StaItem implements HasRule {
  static type = "milestone";

  rule: StaRule | undefined;

  constructor(
    id: string,
    name = "",
    img: string | null,
    {
      description = "",
      rule = "",
    },
  ) {
    super(id, name, img, description);
    this.rule = rule ? new StaRule(`${name}[${id}]`, rule) : undefined;
  }
}
