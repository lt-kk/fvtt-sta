import { mapItems } from "../../util/actor";
import { itemSystem } from "../../util/document";
import { StaItem } from "../StaItem";


export function createTrait(document: Item): StaTrait {
  return new StaTrait(document.id!, document.name!, document.img, itemSystem(document));
}

export function filterTrait(source: Actor | Collection<Item>) {
  return mapItems(source, StaTrait.type, createTrait);
}


export class StaTrait implements StaItem {
  static type = "trait";

  id: string;
  name: string = "";
  img: string | null;
  description: string = "";

  constructor(
    id: string,
    name = "",
    img: string | null,
    {
      description = "",
    },
  ) {
    this.id = id;
    this.name = name;
    this.img = img;
    this.description = description;
  }
}
