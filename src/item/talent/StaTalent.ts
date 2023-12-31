import { itemSystem } from "../../util/util";


export function createTalent(document: Item): StaTalent {
  return new StaTalent(document.id!, document.name!, document.img, itemSystem(document));
}


export class StaTalent {
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
