import {mapItems} from "../../util/actor";
import {itemSystem} from "../../util/document";


export function createFocus(document: Item): StaFocus {
  return new StaFocus(document.id!, document.name!, document.img, itemSystem(document));
}

export function filterFocus(source: Actor | Collection<Item>) {
  return mapItems(source, StaFocus.type, createFocus);
}


export class StaFocus {
  static type = "focus"

  id: string;
  name: string;
  img: string | null;
  description: string;

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
