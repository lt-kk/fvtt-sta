import { mapItems } from "../../util/actor";
import { itemSystem } from "../../util/document";
import { StaItem } from "../StaItem";


export function createThing(document: Item): StaThing {
  return new StaThing(document.id!, document.name!, document.img, itemSystem(document));
}

export function filterThing(source: Actor | Collection<Item>) {
  return mapItems(source, StaThing.type, createThing);
}


export class StaThing implements StaItem {
  static type = "thing";

  id: string;
  name: string;
  img: string | null;
  description: string;
  rule: string;
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
    this.id = id;
    this.name = name;
    this.img = img;
    this.description = description;
    this.rule = rule;
    this.quantity = quantity;
    this.uses = uses;
    this.equipped = equipped;
    this.opportunity = opportunity;
    this.escalation = escalation;
  }
}
