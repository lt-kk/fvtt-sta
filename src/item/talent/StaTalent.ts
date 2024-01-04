import { mapItems } from "../../util/actor";
import { itemSystem } from "../../util/document";
import { StaItem } from "../StaItem";


export function createTalent(document: Item): StaTalent {
  return new StaTalent(document.id!, document.name!, document.img, itemSystem(document));
}

export function filterTalent(source: Actor | Collection<Item>) {
  return mapItems(source, StaTalent.type, createTalent);
}


export class StaTalent implements StaItem {
  static type = "talent";

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
