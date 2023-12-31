import { itemSystem } from "../../util/util";


export function createItem(document: Item): StaItem {
  return new StaItem(document.id!, document.name!, document.img, itemSystem(document));
}


export class StaItem {
  id: string;
  name: string;
  img: string | null;
  description: string;
  quantity: number;
  uses: number;
  rule: string;
  opportunity: number;
  escalation: number;

  constructor(
    id: string,
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
    this.id = id;
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
