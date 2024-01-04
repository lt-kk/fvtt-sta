import { mapItems } from "../../util/actor";
import { itemSystem } from "../../util/document";
import { StaItem } from "../StaItem";


export function createBelonging(document: Item): StaBelonging {
  return new StaBelonging(document.id!, document.name!, document.img, itemSystem(document));
}

export function filterBelonging(source: Actor | Collection<Item>) {
  return mapItems(source, StaBelonging.type, createBelonging);
}


export class StaBelonging implements StaItem {
  static type = "item";

  id: string;
  name: string;
  img: string | null;
  description: string;
  rule: string;
  quantity: number;
  uses: number;
  opportunity: number;
  escalation: number;

  constructor(
    id: string,
    name = "",
    img: string | null,
    {
      description = "",
      rule = "",
      quantity = 1,
      uses = -1,
      opportunity = 0,
      escalation = 0,
    },
  ) {
    this.id = id;
    this.name = name;
    this.img = img;
    this.description = description;
    this.rule = rule;
    this.quantity = quantity;
    this.uses = uses;
    this.opportunity = opportunity;
    this.escalation = escalation;
  }
}
