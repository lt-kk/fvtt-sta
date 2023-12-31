import { itemSystem } from "../../util/util";


export class StaTalent {
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


export function createTalent(document: Item): StaTalent {
  return new StaTalent(document.name!, document.img, itemSystem(document));
}