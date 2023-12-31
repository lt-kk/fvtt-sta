import { itemSystem } from "../../util/util";


export class StaItem {
  name: string;
  img: string | null;
  description: string;
  quantity: number;
  uses: number;
  rule: string;
  opportunity: number;
  escalation: number;

  constructor(
    name = "",
    img: string | null,
    {
      description = "",
      quantity = 1,
      uses = -1,
      rule = "",
      opportunity = 0,
      escalation = 0,
    },
  ) {
    this.name = name;
    this.img = img;
    this.description = description;
    this.quantity = quantity;
    this.uses = uses;
    this.rule = rule;
    this.opportunity = opportunity;
    this.escalation = escalation;
  }
}


export function createItem(document: Item): StaItem {
  return new StaItem(document.name!, document.img, itemSystem(document));
}