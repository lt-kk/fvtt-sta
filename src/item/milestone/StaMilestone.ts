import { itemSystem } from "../../util/util";


export class StaMilestone {
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


export function createMilestone(document: Item): StaMilestone {
  return new StaMilestone(document.name!, document.img, itemSystem(document));
}