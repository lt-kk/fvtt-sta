import {mapItems} from "../../util/actor";
import {itemSystem} from "../../util/document";


export function createInjury(document: Item): StaInjury {
  return new StaInjury(document.id!, document.name!, document.img, itemSystem(document));
}

export function filterInjury(source: Actor | Collection<Item>) {
  return mapItems(source, StaInjury.type, createInjury);
}


export class StaInjury {
  static type = "injury"

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
