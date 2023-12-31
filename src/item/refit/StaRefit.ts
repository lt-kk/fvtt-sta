import { itemSystem } from "../../util/util";


export class StaRefit {
  name: string;
  img: string | null;
  description: string;
  rule: string;

  constructor(
    name = "",
    img: string | null,
    {
      description = "",
      rule = "",
    },
  ) {
    this.name = name;
    this.img = img;
    this.description = description;
    this.rule = rule;
  }
}


export function createRefit(document: Item): StaRefit {
  return new StaRefit(document.name!, document.img, itemSystem(document));
}