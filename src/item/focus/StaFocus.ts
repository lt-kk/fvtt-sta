import { mapItems } from "../../util/actor";
import { itemSystem } from "../../util/document";
import { StaItem } from "../StaItem";


export function createFocus(document: Item): StaFocus {
  return new StaFocus(document.id!, document.name!, document.img, itemSystem(document));
}

export function filterFocus(source: Actor | Collection<Item>) {
  return mapItems(source, StaFocus.type, createFocus);
}


export class StaFocus extends StaItem {
  static type = "focus";

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
