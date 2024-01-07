import { mapItems } from "../../util/actor";
import { itemSystem } from "../../util/document";
import { StaItem } from "../StaItem";


export function createTrait(document: Item): StaTrait {
  return new StaTrait(document.id!, document.name!, document.img, itemSystem(document));
}

export function filterTrait(source: Actor | Collection<Item>) {
  return mapItems(source, StaTrait.type, createTrait);
}


export class StaTrait extends StaItem {
  static type = "trait";

  constructor(
    id: string,
    name = "",
    img: string | null,
    {
      description = "",
    },
  ) {
    super(id, name, img, description);
  }
}
