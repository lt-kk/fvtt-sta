import { mapItems } from "../../util/actor";
import { itemSystem } from "../../util/document";
import { StaItem } from "../StaItem";
import { HasRule, StaRule } from "../../model/StaRule";


export function createThing(document: Item): StaThing {
  return new StaThing(document.id!, document.name!, document.img, itemSystem(document));
}

export function filterThing(source: Actor | Collection<Item>) {
  return mapItems(source, StaThing.type, createThing);
}


export class StaThing extends StaItem implements HasRule {
  static type = "thing";

  rule: StaRule | undefined;
  opportunity: number;
  escalation: number;
  equipped: boolean;
  quantity: number;
  uses: number;

  constructor(
    id: string,
    name = "",
    img: string | null,
    {
      description = "",
      rule = "",
      opportunity = 0,
      escalation = 0,
      equipped = true,
      quantity = 1,
      uses = -1,
    },
  ) {
    super(id, name, img, description);
    this.rule = rule ? new StaRule(`${name}[${id}]`, rule) : undefined;
    this.quantity = quantity;
    this.uses = uses;
    this.equipped = equipped;
    this.opportunity = opportunity;
    this.escalation = escalation;
  }
}
