import {mapItems} from "../../util/actor";
import {itemSystem} from "../../util/document";


export function createMilestone(document: Item): StaMilestone {
  return new StaMilestone(document.id!, document.name!, document.img, itemSystem(document));
}

export function filterMilestone(source: Actor | Collection<Item>) {
  return mapItems(source, StaMilestone.type, createMilestone);
}


export class StaMilestone {
  static type = "milestone"

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
