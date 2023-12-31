import { itemSystem } from "../../util/util";


export function createRefit(document: Item): StaRefit {
  return new StaRefit(document.id!, document.name!, document.img, itemSystem(document));
}


export class StaRefit {
  id: string;
  name: string;
  img: string | null;
  description: string;
  rule: string;

  constructor(
    id: string,
    name = "",
    img: string | null,
    {
      description = "",
      rule = "",
    },
  ) {
    this.id = id;
    this.name = name;
    this.img = img;
    this.description = description;
    this.rule = rule;
  }
}
